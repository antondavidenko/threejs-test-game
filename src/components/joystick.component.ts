type MoveCallback = (event: {forward: number, turn: number}) => void

type Point2D = {
    x: number;
    y: number;
}

const maxRadius = 40;

export class JoyStick {

    private domElement: HTMLDivElement;
    private origin: {left: number, top: number};
    private offset: Point2D;

    private onTouchStartCallback: MoveCallback;
    private onTouchMoveCallback: MoveCallback;
    private onTouchEndCallback: MoveCallback;

    constructor() {
        const circle = document.createElement("div");
        circle.style.cssText = "position:absolute; bottom:35px; width:80px; height:80px; background:rgba(126, 126, 126, 0.5); border:#444 solid medium; border-radius:50%; left:10%; transform:translateX(-50%);";
        this.domElement = document.createElement("div");
        this.domElement.style.cssText = "position: absolute; left: 20px; top: 20px; width: 40px; height: 40px; border-radius: 50%; background: #fff;";
        circle.appendChild(this.domElement);
        document.body.appendChild(circle);
        this.origin = { left:this.domElement.offsetLeft, top:this.domElement.offsetTop };

        if (this.domElement!=undefined){
            if ('ontouchstart' in window){
                this.domElement.addEventListener('touchstart', this.tap.bind(this));
            } else {
                this.domElement.addEventListener('mousedown', this.tap.bind(this));
            }
        }
    }

    onTouchStart(callback: MoveCallback) {
        this.onTouchStartCallback = callback;
    };

    onTouchMove(callback: MoveCallback) {
        this.onTouchMoveCallback = callback;
    };

    onTouchEnd(callback: MoveCallback) {
        this.onTouchEndCallback = callback;
    };

    private getMousePosition(event: MouseEvent & TouchEvent): Point2D {
        let clientX = event.targetTouches ? event.targetTouches[0].pageX : event.clientX;
        let clientY = event.targetTouches ? event.targetTouches[0].pageY : event.clientY;
        return { x:clientX, y:clientY };
    }

    private tap(event: MouseEvent & TouchEvent): void {
        this.onTouchStartCallback({forward: 0, turn: 0});
        event.preventDefault();
        this.offset = this.getMousePosition(event);
        if ('ontouchstart' in window){
            document.ontouchmove = this.move.bind(this);
            document.ontouchend = this.up.bind(this);
        } else {
            document.onmousemove = this.move.bind(this);
            document.onmouseup = this.up.bind(this);
        }
    }

    private move(event: MouseEvent & TouchEvent): void {
        const mouse = this.getMousePosition(event);
        let left = mouse.x - this.offset.x;
        let top = mouse.y - this.offset.y;
        const sqMag = left*left + top*top;
        if (sqMag>(maxRadius * maxRadius)) {
            const magnitude = Math.sqrt(sqMag);
            left /= magnitude;
            top /= magnitude;
            left *= maxRadius;
            top *= maxRadius;
        }
        this.domElement.style.top = `${top + this.domElement.clientHeight/2}px`;
        this.domElement.style.left = `${left + this.domElement.clientWidth/2}px`;

        const forward = -(top - this.origin.top + this.domElement.clientHeight/2)/maxRadius;
        const turn = (left - this.origin.left + this.domElement.clientWidth/2)/maxRadius;
        this.onTouchMoveCallback({forward, turn});
    }

    private up(): void {
        this.onTouchEndCallback({forward: 0, turn: 0});
        if ('ontouchstart' in window){
            document.ontouchmove = null;
            (document as any).touchend = null;
        } else {
            document.onmousemove = null;
            document.onmouseup = null;
        }

        this.domElement.style.top = `${this.origin.top}px`;
        this.domElement.style.left = `${this.origin.left}px`;
    }

}
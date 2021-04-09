import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { updateShaderMaterial, updateFPS, getCamera, getRender, getControls, setLight } from '../utils/';
import { JoyStick, charactersCollection, WorldComponent } from '../components/';

type ControlType = 'joystic' | 'orbit';

export class MainScreen {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls | JoyStick;
    private stats: Stats;

    constructor(private controlType: ControlType) {
        this.prepareScene();
        this.addSceneObjects();
        this.animate();
    }

    private addSceneObjects() {
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        new WorldComponent(this.scene);
        charactersCollection.init(this.scene, () => {
            this.camera.lookAt(charactersCollection.selected().position);
        });
    }

    private prepareScene() {
        this.scene = new THREE.Scene();
        setLight(this.scene);
        this.camera = getCamera();
        this.renderer = getRender(this.scene, this.camera);
        if (this.controlType === 'orbit') {
            this.controls = getControls(this.camera, this.renderer);
        } else if (this.controlType === 'joystic') {
            this.controls = new JoyStick();
            this.controls.onTouchStart(() => {
                console.log('DOWN!');
            });
            this.controls.onTouchMove((forward: number, turn: number) => {
                charactersCollection.onTouchMove(forward, turn);
            });
            this.controls.onTouchEnd(() => {
                charactersCollection.onTouchMove(0, 0);
            });
        }

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderScreen();
    }

    private renderScreen() {
        this.renderer.render(this.scene, this.camera);
    }

    private animate() {
        updateFPS();
        requestAnimationFrame(this.animate.bind(this));
        if (this.controlType === 'orbit') {
            (this.controls as OrbitControls).update();
        } else {
            this.updateCamera();
        }
        charactersCollection.update();

        this.renderScreen();
        this.stats.update();
        updateShaderMaterial();
    }

    private updateCamera(): void {
        if (charactersCollection.selected().getIsReady()) {
            const pos = charactersCollection.selected().position.clone();
            const angle = charactersCollection.selected().rotation.y;
            pos.y += 2;
            pos.z -= 4 * Math.cos(angle);
            pos.x -= 4 * Math.sin(angle);
            this.camera.position.lerp(pos, 0.05);
            this.camera.lookAt(charactersCollection.selected().position);
        }
    }

}
import { Character, characterPresetsStorage } from '@antondavidenko/modular-character-threejs';
import { JoyStick } from './JoyStick';

const SPEED = 0.25;
const hulk = '{"baseFBX":"BaseNormal","hairFBX":"HairMale11","hatFBX":null,"headDecor1FBX":null,"headDecor2FBX":null,"hairColor":"#32261d","clothesTexture":"barbarian","skinColor":"#8b9826","eyesTexture":"eyes10","mouthTexture":"mouth05","clothesColor1":"#55861d","clothesColor2":"#221c12","leftHandSlot":"none","rightHandSlot":"none","backSlot":"none","bodyType":{"body":{"x":0.015,"y":0.018,"z":0.015},"head":{"x":0.5,"y":0.4,"z":0.6},"headOffset":24}}';
const dwarf = '{"baseFBX":"BaseRobe01","hairFBX":"HairMale04","hatFBX":"Helmet 06","headDecor1FBX":"Beard 02","headDecor2FBX":"Horn 02","hairColor":"#c0c0c0","clothesTexture":"casual","skinColor":"#e9ae78","eyesTexture":"eyes18","mouthTexture":"mouth01","clothesColor1":"#55861d","clothesColor2":"#55861d","leftHandSlot":"none","rightHandSlot":"Axe03","backSlot":"none","bodyType":{"body":{"x":0.01,"y":0.01,"z":0.01},"head":{"x":1,"y":1,"z":1},"headOffset":41}}';

class CharactersCollection {

    private default: Character;
    private hulk: Character;
    private dwarf: Character;
    private state = 'idle';
    private yRotation = 0;

    init(scene: THREE.Scene): void {
        const animationId = 'Base@Idle';
        this.default = new Character(scene, characterPresetsStorage.getDefaultCharacterConfig(), animationId, () => {});
        this.hulk = new Character(scene, JSON.parse(hulk), animationId, () => {
            this.hulk.position.x += 1.5;
        });
        this.dwarf = new Character(scene, JSON.parse(dwarf), animationId, () => {
            this.dwarf.position.x -= 1.5;
        });
    }

    update(joystic: JoyStick): void {
        this.default.update();
        this.hulk.update();
        this.dwarf.update();

        if (!joystic || this.selected() === undefined || !this.selected().getIsReady()) return;

        const { forward, turn } = joystic.getState();
        if (forward !== 0 && turn !== 0) {
            const angle =  this.yRotation;
            this.selected().position.z += (forward / 1 * Math.cos(angle)) * SPEED;
            this.selected().position.x += (forward / 1 * Math.sin(angle)) * SPEED;
            this.yRotation -= turn / 25;
        }
        if (forward > 0) {
            if (this.state !== 'run') {
                this.selected().resetAnimation('Base@Dash');
                this.state = 'run';
            }
        } else {
            if (this.state !== 'idle' ) {
                this.selected().resetAnimation('Base@Idle');
                this.state = 'idle';
            }
        }

        if (this.selected() && this.selected().getIsReady()) {
            this.selected().rotation.x = 0;
            this.selected().rotation.y = this.yRotation;
        }
        if (this.dwarf && this.dwarf.getIsReady()) this.dwarf.rotation.x = 0;
        if (this.hulk && this.hulk.getIsReady()) this.hulk.rotation.x = 0;
    }

    selected(): Character {
        return this.default;
    }

}

export const charactersCollection = new CharactersCollection();
import { MainScreen } from './screens/main.screen';
import { initStorage } from '@antondavidenko/modular-character-threejs';

export const CDN_ROOT = "/show/chr_cdn_v1/";
initStorage(CDN_ROOT, () => {
    new MainScreen('orbit'); // 'orbit' | 'joystic'
});

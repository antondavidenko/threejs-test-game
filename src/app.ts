import { initStorage } from '@antondavidenko/modular-character-threejs';
import { MainScreen } from './screens/main.screen';

export const CDN_ROOT = '/show/chr_cdn_v1/';
initStorage(CDN_ROOT, () => {
  new MainScreen('joystic'); // 'orbit' | 'joystic'
});

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function getControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.target.set(0, 1, 0);
  controls.minDistance = 3;
  controls.maxDistance = 400;
  controls.maxPolarAngle = Math.PI / 2;
  return controls;
}

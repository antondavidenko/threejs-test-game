export function getImageData(image: any, rotation = false): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = image.width as number;
  canvas.height = image.height as number;

  const context = canvas.getContext('2d');
  context.translate(canvas.width / 2, canvas.height / 2);
  if (rotation) {
    context.rotate(-Math.PI / 2);
  }
  context.drawImage(image, -image.width / 2, -image.width / 2);

  return context.getImageData(0, 0, image.width as number, image.height as number);
}

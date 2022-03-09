export function crop(
  imgBuffer,
  { top = 0, left = 0, height = imgBuffer.height, width = imgBuffer.width } = {}
) {
  const result = imgBuffer.new({ width, height });

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const originalPos = { x: left + x, y: top + y };
      const pixel = imgBuffer.getPixel(originalPos.x, originalPos.y).clone();
      result.setPixel(x, y, pixel);
    }
  }

  return result;
}

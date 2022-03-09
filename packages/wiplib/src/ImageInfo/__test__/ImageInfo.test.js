import RgbaImageBuffer from "../../RgbaImageBuffer";
import ImageInfo from "../index";

const rgbDimensionsInfo = [
  { name: "Red", index: 0 },
  { name: "Blue", index: 1 },
  { name: "Green", index: 2 }
];

describe("ImageInfo", () => {
  describe("For RgbaImageBuffer with transparent pixels", () => {
    let width;
    let height;
    let rgbaPixels;
    let imageBuffer;
    let uut;

    beforeEach(() => {
      width = 2;
      height = 2;
      rgbaPixels = [
        [0, 0, 0, 1],
        [255, 255, 255, 1],
        [100, 100, 100, 0],
        [123, 5, 200, 1]
      ];
      const rawRgbaPixels = new Uint8ClampedArray(rgbaPixels.flatMap(a => a));
      imageBuffer = new RgbaImageBuffer(width, height, rawRgbaPixels);
      uut = new ImageInfo(imageBuffer);
    });

    test("Should have valid pixel count", () => {
      expect(uut.pixelCount).toEqual(width * height);
    });

    rgbDimensionsInfo.forEach(({ name, index }) => {
      test(`Should have valid ${name} histogram `, () => {
        const expectedHistogram = Array(256).fill(0);
        rgbaPixels
          .map(pixel => pixel[index])
          .forEach(colorValue => (expectedHistogram[colorValue] += 1));
        expect(uut.histograms[index]).toEqual(expectedHistogram);
      });
    });

    rgbDimensionsInfo.forEach(({ name, index }) => {
      test(`Should have valid ${name} cumulative histogram`, () => {
        const colorValues = rgbaPixels.map(pixel => pixel[index]);
        let accumulatedCount = 0;
        const expectedHistogram = Array(256)
          .fill(0)
          .map((count, currValue) => {
            if (colorValues.includes(currValue)) {
              accumulatedCount += 1;
            }
            return count + accumulatedCount;
          });
        expect(uut.cumulativeHistograms[index]).toEqual(expectedHistogram);
      });
    });

    rgbDimensionsInfo.forEach(({ name, index }) => {
      test(`Should have valid ${name} brightness`, () => {
        const colorValueSum = rgbaPixels
          .map(pixel => pixel[index])
          .reduce((sum, currValue) => sum + currValue, 0);
        const colorValueMean = colorValueSum / (width * height);

        expect(uut.brightnesses[index]).toEqual(colorValueMean);
      });
    });

    rgbDimensionsInfo.forEach(({ name, index }) => {
      test(`Should have valid ${name} contrast`, () => {
        const colorValues = rgbaPixels.map(pixel => pixel[index]);
        const sum = colorValues.reduce((sum, currValue) => sum + currValue, 0);
        const mean = sum / colorValues.length;
        const squaredErrorSum = colorValues.reduce(
          (sum, currValue) => sum + (currValue - mean) ** 2,
          0
        );
        const stdDev = Math.sqrt(squaredErrorSum / colorValues.length);

        expect(uut.contrasts[index]).toEqual(stdDev);
      });
    });
  });
});

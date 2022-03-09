

/** 
 * Returns the light value of the closest pixel of the given coordinates.
 * It retrieves the third element of the pixel assuming that no matters what
 * RGB channel you choose for grayscale images and in case of operate with
 * colored images (HSL), the third channel corresponds with the Lightness.
 */
export const closestNeighbourInterpolation = (xCoord, yCoord, imgBuffer) =>
    imgBuffer.getPixel(Math.round(xCoord), Math.round(yCoord))[2];


/** 
 * Returns the light value of the given coordinates assuming that the light
 * values of the closest pixels vary linearly.
 * It retrieves the third elements of the pixels assuming that no matters what
 * RGB channel you choose for grayscale images and in case of operate with
 * colored images (HSL), the third channel corresponds with the Lightness.
 */
export const bilinearInterpolation = (xCoord, yCoord, imgBuffer) => {
    const A = imgBuffer.getPixel(Math.floor(xCoord), Math.ceil(yCoord))[2];
    const B = imgBuffer.getPixel(Math.ceil(xCoord), Math.ceil(yCoord))[2];
    const C = imgBuffer.getPixel(Math.floor(xCoord), Math.floor(yCoord))[2];
    const D = imgBuffer.getPixel(Math.ceil(xCoord), Math.floor(yCoord))[2];
    const p = Math.ceil(xCoord) - xCoord;
    const q = yCoord - Math.floor(yCoord);

    return C + ((D - C) * p) + ((A - C) * q) + ((B - A + C - D) * p * q);
};
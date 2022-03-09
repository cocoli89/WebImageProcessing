import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Coordinates from "../../lib/coordinates";
import Image from "../../lib/Image";

/**
 * Component that renders an image from the given promise passed
 * as prop. That promise needs to resolve to the Image instance
 * to render in this component. Or it can reject if there is any
 * error during the image load.
 *
 * This way the strategy used to load the image (for example: from
 * a file, from a portion of another image, from an URL, etc) can
 * be decided by the user of the component
 */
class ImageComponent extends Component {
  static propTypes = {
    /** Promise that resolves to the image to render */
    imagePromise: PropTypes.instanceOf(Promise).isRequired,
    /** Callback called with the mouse position relative to the
     * image and the pixel value at that position */
    onMouseMove: PropTypes.func
  };

  static defaultProps = {
    onMouseMove: null
  };

  /** Component state */
  state = {
    /** Image */
    image: null,
    /** Flag to know if the image is currently being loaded */
    isImageLoading: true,
    /** Error object that is not null if there is an error */
    error: null
  };

  /** Returns the image */
  getImage () {
    // TODO: check if loading and if error
    return this.state.image;
  }

  componentDidMount() {
    // Try to get the image and draw it to the canvas
    // If there is an error update the state.error
    this.props.imagePromise
      .then(image => {
        const canvas = this.refs.canvas;
        const context = canvas.getContext("2d");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        context.drawImage(image, 0, 0);

        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        const imageObject = new Image(imgData.width, imgData.height, imgData.data);

        this.setState({
          isImageLoading: false,
          image: imageObject
        });
      })
      .catch(error => {
        this.setState({
          isImageLoading: false,
          error: error
        });
      });
  }

  /** (Method bound to the class instances). Mouse move event
   * handler, gets the coordinates relative to the image where
   * the user mouse is pointing to and the pixel RGBA value there
   * and calls props.onMouseMove */
  onMouseMove = mouseEvent => {
    if (
      !this.props.onMouseMove ||
      this.state.isImageLoading ||
      this.state.error
    ) {
      return;
    }

    const coordinates = Coordinates.mapToCoordinatesRelativeToElement(
      mouseEvent,
      this.refs.canvas
    );
    const pixel = this.state.image.getPixel(coordinates);

    this.props.onMouseMove(coordinates, pixel);
  };

  render() {
    // TODO: check if loading and if error
    return (
      <canvas
        ref="canvas"
        style={{
          display: "block",
          backgroundColor: "#eee",
          maxHeight: "100%"
        }}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}

export default ImageComponent;

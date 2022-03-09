import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FileSubmenu from "./Submenus/FileSubmenu";
import ImageSubmenu from "./Submenus/ImageSubmenu";
import PointOperationsSubmenu from "./Submenus/PointOperationsSubmenu";
import GeometricOperationsSubmenu from "./Submenus/GeometricOperationsSubmenu";

const AppToolbar = props => (
  <AppBar position="static">
    <Toolbar>
      <FileSubmenu
        onFileInput={props.onFileInput}
        onDownload={props.onDownload}
      />
      <ImageSubmenu
        onShowHistogram={props.onShowHistogram}
        onCrop={props.onCrop}
      />
      <PointOperationsSubmenu
        selectedImageInfo={props.selectedImageInfo}
        activeImagesNames={props.activeImagesNames}
        onGrayscale={props.onGrayscale}
        histogramEqualization={props.histogramEqualization}
        linearTransformation={props.linearTransformation}
        brightnessAndContrastAdjustment={props.brightnessAndContrastAdjustment}
        gammaCorrection={props.gammaCorrection}
        imagesDifference={props.imagesDifference}
        histogramSpecification={props.histogramSpecification}
        changesDetection={props.changesDetection}
      />
      <GeometricOperationsSubmenu
        selectedImageInfo={props.selectedImageInfo}
        interpolationMethods={props.interpolationMethods}
        imageRotation={props.imageRotation}
        imageResizing={props.imageResizing}
        verticalMirror={props.verticalMirror}
      />
    </Toolbar>
  </AppBar>
);

AppToolbar.propTypes = {
  onFileInput: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onShowHistogram: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  onGrayscale: PropTypes.func.isRequired,
  histogramEqualization: PropTypes.func.isRequired,
  linearTransformation: PropTypes.func.isRequired,
  brightnessAndContrastAdjustment: PropTypes.func.isRequired,
  gammaCorrection: PropTypes.func.isRequired,
  imagesDifference: PropTypes.func.isRequired,
  histogramSpecification: PropTypes.func.isRequired,
  changesDetection: PropTypes.func.isRequired,
  interpolationMethods: PropTypes.array.isRequired,
  imageRotation: PropTypes.func.isRequired,
  activeImagesNames: PropTypes.array.isRequired,
  selectedImageInfo: PropTypes.object.isRequired,
  imageResizing: PropTypes.func.isRequired,
  verticalMirror: PropTypes.func.isRequired
};

export default AppToolbar;

//                 <a className="navbar-item" href="https://github.com/carlosdg/ImageProcessor.git">
//                     <img alt="logo" src="https://i.imgur.com/DckFstm.png" height="50"/>
//                 </a>

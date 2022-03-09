import React from "react";
import { withSnackbar } from "notistack";
import { observer, inject } from "mobx-react";
import MenuItem from "@material-ui/core/MenuItem";
import ImageDifferenceDialog from "./ImageDifferenceDialog";

@withSnackbar
@inject("appStore")
@observer
class ImageDifferenceMenuItem extends React.Component {
  state = {
    isDialogOpen: false
  };

  openDialog = () => this.setState({ isDialogOpen: true });
  closeDialog = () => this.setState({ isDialogOpen: false });

  render() {
    return (
      <React.Fragment>
        <MenuItem onClick={this.openDialog}>Image Difference</MenuItem>
        <ImageDifferenceDialog
          isOpen={this.state.isDialogOpen}
          onClose={this.closeDialog}
        />
      </React.Fragment>
    );
  }
}

export default ImageDifferenceMenuItem;

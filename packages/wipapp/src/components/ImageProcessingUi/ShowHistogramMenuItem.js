import React from "react";
import { withSnackbar } from "notistack";
import { observer, inject } from "mobx-react";
import MenuItem from "@material-ui/core/MenuItem";

class ShowHistogramMenuItem extends React.Component {
  onClick = () => {
    const { appStore, enqueueSnackbar } = this.props;
    const { type, index } = appStore.selectedGridItem;

    if (type !== "image" || index < 0) {
      enqueueSnackbar("You first need to select an image", {
        variant: "warning"
      });
      return;
    }

    this.props.appStore.openRightSideMenu();
  };

  render() {
    return (
      <React.Fragment>
        <MenuItem onClick={this.onClick}>Histogram</MenuItem>
      </React.Fragment>
    );
  }
}

export default withSnackbar(
  inject("appStore")(observer(ShowHistogramMenuItem))
);

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";

class AppToolbar extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={this.state.open ? "file-menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            File
          </Button>
          <Popper
            open={this.state.open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="file-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>
                        <label htmlFor="image-input">Open File</label>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <input
            hidden
            id="image-input"
            type="file"
            accept="image/*"
            name="image-input"
            onChange={this.props.onNewImage}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppToolbar;

//                 <a className="navbar-item" href="https://github.com/carlosdg/ImageProcessor.git">
//                     <img alt="logo" src="https://i.imgur.com/DckFstm.png" height="50"/>
//                 </a>

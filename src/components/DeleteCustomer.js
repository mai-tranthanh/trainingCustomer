import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };

    deleteCustomer = () => {
      this.props.deleteCustomerN(this.props.value);
      this.handleClose();
    }
    
      render() {
        return (
          <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              DELETE
            </Button>
            
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This customer information will be deleted completely. 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.deleteCustomer} color="primary" autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          
          </div>
        );
      }
}

export default DeleteCustomer;
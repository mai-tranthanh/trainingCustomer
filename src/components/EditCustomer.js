import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstname: "",
      lastname: "",
      city: "",
      postcode: "",
      email: ""
    };
  }

  // handle visible
  handleClickOpen = () => {
    this.setState({ 
        open: true,
        firstname: this.props.customer.firstname,
        lastname: this.props.customer.lastname,
        streetaddress: this.props.customer.streetaddress,
        postcode: this.props.customer.postcode,
        city: this.props.customer.city,
        email: this.props.customer.email,
        phone: this.props.customer.phone
    });
    console.log(this.props.link);
    console.log(this.props.customer);
  };
  // handle hidden
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateCustomer = () => {
      const newCustomer= {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        streetaddress: this.state.streetaddress,
        postcode: this.state.postcode,
        city: this.state.city,
        email: this.state.email,
        phone: this.state.phone,
      }
      this.props.updateCustomerN(this.props.link, newCustomer);
      this.handleClose();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>Change Customer Information Here</DialogContentText>
            <TextField
              onChange={this.handleChange}
              value={this.state.firstname}
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.lastname}
              margin="dense"
              name="lastname"
              label="Last Name"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.streetaddress}
              margin="dense"
              name="streetaddress"
              label="Street Address"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.postcode}
              margin="dense"
              name="postcode"
              label="Postcode"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.city}
              margin="dense"
              name="city"
              label="City"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.email}
              margin="dense"
              name="email"
              label="Email"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              value={this.state.phone}
              margin="dense"
              name="phone"
              label="Phone"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.updateCustomer} color="primary">
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant='contained' onClick={this.handleClickOpen}>EDIT</Button>
      </div>
    );
  }
}

export default EditCustomer;

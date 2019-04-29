import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      trainings: []
    };
  }

  // handle hidden
  handleClose = () => {
    this.setState({ open: false });
  };

   // handle visible
   handleClickOpen = () => {
    this.setState({ 
        open: true,
        trainings: this.props.trainings
    });

    console.log(this.props.link);
    console.log(this.props.customer);
  };

  loadTraining=() => {
     this.props.loadTrainingN(this.props.link);
   }
  
  render() {
    const columns = [
            {
               Header: "Date",
               accessor: "date"
             },
             {
               Header: "Duration",
               accessor: "duration"
             },
             {
               Header: "Activity",
               accessor: "activity"
             },
           ];

    return (
      <div>
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Customer ID Record</DialogTitle>
          <DialogContent>
            <DialogContentText>Here is the past training session of customer ID </DialogContentText>

           <ReactTable
               data={this.state.trainings}
               columns={columns}
               sortable={true}
               filterable={true}
               defaultPageSize={10}
             /> 
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CLOSE
            </Button>
      
          </DialogActions>
        </Dialog>

        <Button
        style={{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", color:'white'}} 
        variant='contained' 
        onClick={this.handleClickOpen}>TRAINING</Button>

      </div>
    );
  }
}


export default TrainingList;

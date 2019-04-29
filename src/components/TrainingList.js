import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddTraining from "./AddTraining"

class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      trainings: []
    };
  }

  componentDidMount(){
    this.loadTraining(this.props.link);
  }

  // handle hidden
  handleClose = () => {
    this.setState({ open: false });
  };

   // handle visible
   handleClickOpen = () => {
   this.loadTraining(this.props.link);
    this.setState({ 
        open: true,
    });
  };

  loadTraining = () => {
    fetch("https://customerrest.herokuapp.com/api/customers/1/trainings", {
      method: "GET",
      headers: {
      "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(jsondata => this.setState({ trainings: jsondata.content }))
    .catch(err => console.error(err));
  }

  updateTraining = (newTraining) => {
    fetch("https://customerrest.herokuapp.com/api/customers/1/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
      .then(res => this.loadTraining())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
  
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
             }
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
            <AddTraining updateTraining={this.updateTraining}/>

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

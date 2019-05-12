import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteTraining from "./DeleteTraining";
// import AddTraining from "./AddTraining";


//use rcc snippet to auto-create class
class TrainingListAll extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false, message:'' };
  }

  //Fetch trainings
  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata.content }))
      .catch(err => console.error(err));
  };

  saveTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(training)
    })
    .then(res => this.loadTrainings())
      .then(res => this.setState({ open: true, message: "New Training Added" }))
      .catch(err => console.error(err));
  };
  
  deleteTraining = trainingLink => {
    //To show/check the chosen training in console: console.log(trainingLink.original._links.self.href);
    fetch(trainingLink, { method: "DELETE" })
      .then(res => this.loadTrainings())
      .then(res => this.setSate({open: true, message: "Training Deleted"}))
      .catch(err => console.error(err));
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "Date",
        accessor: 'date',
      },
      {
        Header: "Duration",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: " ",
        accessor: "links[1].href",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({value}) => (
          // <Button variant='outlined' color="secondary" onClick={() => this.deleteTraining(value)}>
          //   DELETE
          // </Button>
          <DeleteTraining deleteTrainingN={this.deleteTraining} link={value}/>
        )
      },
    ];

    return (
      <div>
        {/* <AddTraining saveTraining={this.saveTraining} /> */}
        <ReactTable
          data={this.state.trainings}
          columns={columns}
          sortable={true}
          filterable={true}
          defaultPageSize= {10}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default TrainingListAll;

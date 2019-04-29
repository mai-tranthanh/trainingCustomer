import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import Button from "@material-ui/core/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Snackbar from "@material-ui/core/Snackbar";
import TrainingList from "./TrainingList";
import DeleteCustomer from "./DeleteCustomer";

//use rcc snippet to auto-create class
class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], trainings:[], open: false, message:'' };
  }

  //Fetch customers
  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(jsondata => this.setState({ customers: jsondata.content }))
      .catch(err => console.error(err));
  };

  deleteCustomer = customerLink => {
    //To show/check the chosen customer in console: console.log(customerLink.original._links.self.href);
    fetch(customerLink, { method: "DELETE" })
      .then(res => this.loadCustomers())
      .then(res => this.setSate({open: true, message: "Customer Deleted"}))
      .catch(err => console.error(err));
  };

 saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
      .then(res => this.setState({ open: true, message: "New Customer Added" }))
      .catch(err => console.error(err));
  };

  updateCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCustomer)
    })
      .then(res => this.loadCustomers())
      .then(res => this.setState({ open: true, message: "Customer Updated" }))
      .catch(err => console.error(err));
  };

  loadTraining = (trainingLink) => {
    fetch(trainingLink, {
      method: "GET",
      headers: {
      "Content-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(jsondata => this.setState({ trainings: jsondata.content }))
    .catch(err => console.error(err));
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "First Name",
        accessor: "firstname"
      },
      {
        Header: "Last Name",
        accessor: "lastname"
      },
      {
        Header: "Street Address",
        accessor: "streetaddress"
      },
      {
        Header: "Postcode",
        accessor: "postcode"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: " ",
        accessor: "links[0].href",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({value, row}) => (
          <EditCustomer updateCustomerN={this.updateCustomer} link={value} customer={row}/>
        )
      },
      {
        Header: " ",
        accessor: "links[1].href",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({value}) => (
          // <Button variant='outlined' color="secondary" onClick={() => this.deleteCustomer(value)}>
          //   DELETE
          // </Button>
          <DeleteCustomer deleteCustomerN={this.deleteCustomer} link={value} />
        )
      },
      {
        Header: " ",
        accessor: "links[2].href",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: ({value, row}) => (
          <TrainingList loadTrainingN={() => this.loadTraining(value)} customer={row}/> 
        )
      }
    ];

    return (
      <div>
        <AddCustomer saveCustomer={this.saveCustomer} />
        <ReactTable
          data={this.state.customers}
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

export default CustomerList;

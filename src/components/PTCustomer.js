import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";

class PTCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { allData: [],  };
  }

  //Fetch trainings
  componentDidMount() {
    this.loadAll();
  }

  loadAll = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(jsondata => this.setState({ allData: jsondata }))
      .catch(err => console.error(err));
  };

  //date is string 
  formatDate(date) {
    return moment(parseInt(date)).format('DD/MM/YYYY');
  }
  
  render() {
    const columns = [
      {
        id: 'customerId', // Required because our accessor is not a string
        Header: 'CustomerID',
        accessor: d => d.customer.id // Custom value accessors!
      },
      {
        id: 'firstName', 
        Header: 'Firstname',
        accessor: d => d.customer.firstname
      },
      {
        id: 'lastName', 
        Header: "Lastname",
        accessor: d => d.customer.lastname
      },
      {
        id: 'address', 
        Header: "Street Address",
        accessor: d => d.customer.streetaddress
      },
      {
        id: 'postcode', 
        Header: "Postcode",
        accessor: d => d.customer.postcode
      },
      {
        id: 'city', 
        Header: "City",
        accessor: d => d.customer.city
      },
      {
        id: 'cmail', 
        Header: "Email",
        accessor: d => d.customer.email
      },
      {
        id: 'phone', 
        Header: "Phone",
        accessor: d => d.customer.phone
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({value}) => ( 
          <div>
            {this.formatDate(value)}
          </div>
        )
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
        <ReactTable
          data={this.state.allData}
          columns={columns}
          sortable={true}
          filterable={true}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default PTCustomer;


// //How to use moment to format time
// var formatDate= 1399919400000;
// var responseDate = moment(formatDate).format('DD/MM/YYYY');
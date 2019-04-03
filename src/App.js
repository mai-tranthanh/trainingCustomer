import React, { Component } from 'react';
import CustomerList from './components/CustomerList';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
         <Toolbar>
           <Typography variant="h6" color="inherit">Training Customer</Typography>
           </Toolbar>
        </AppBar>
        <CustomerList />
      </div>
    );
  }
}

export default App;

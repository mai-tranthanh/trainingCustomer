import React, { Component } from "react";
import CustomerList from "./components/CustomerList";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TrainingListAll from "./components/TrainingListAll";
import PTCustomer from "./components/PTCustomer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar style={styles.navBar} position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              CUSTOMER LIST
            </Typography>
          </Toolbar>
        </AppBar>
        <CustomerList />
        <AppBar style={styles.navBar} position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              TRAINING LIST
            </Typography>
          </Toolbar>
        </AppBar>
        <TrainingListAll />
        <AppBar style={styles.navBar} position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              PERSONAL TRAINING CUSTOMER 
            </Typography>
          </Toolbar>
        </AppBar>
        <PTCustomer />
      </div>
    );
  }
}

const styles = {
  navBar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: 10,
    marginBottom: 10
  }
};
export default App;

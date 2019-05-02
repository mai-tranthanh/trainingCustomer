import React, { Component } from "react";
import CustomerList from "./components/CustomerList";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigator from './components/Navigator'
import Login from './components/Login';
import { firebaseAuth } from './config';
import TrainingListAll from "./components/TrainingListAll";
import PTCustomer from "./components/PTCustomer";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, isAuthenticated : false};
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });      
      } 
      else {
        this.setState({ user: null, isAuthenticated: false });      
      }
    });
  }

  render() {
    return (
      <div className="App">
        <AppBar style={styles.navBar} position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              PERSONAL TRAINING CUSTOMER APP
            </Typography>
          </Toolbar>
        </AppBar>

        <BrowserRouter>
          <Navigator isAuthenticated={this.state.isAuthenticated}/>
          <Switch>
            <Route exact path ="/" component={CustomerList} />
            <Route path ="/training" component={TrainingListAll} />
            <Route path ="/pt" component={PTCustomer} />
            <Route path ="/login" component={Login} />
            <PrivateRoute isAuthenticated={this.state.isAuthenticated} 
              path ="/calendar" render={() => <h1>Contact Address</h1>} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>

        </BrowserRouter>
        
      </div>
    );
  }
}

const styles = {
  navBar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: 10,
    marginBottom: 10,
    
  }
};
export default App;

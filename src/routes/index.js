import React, { Fragment } from 'react';
import { Route, HashRouter as Router, withRouter } from 'react-router-dom';
import Home from '../views/home'
import Signup from '../views/signup';

const app = ({ history }) => (
    <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
    </Fragment>
);

const AppWithRouter = withRouter(app);

const Routes = () => (
    <Router>
      <AppWithRouter />
    </Router>
  );
  
  export default Routes;
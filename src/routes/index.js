import React, { Fragment } from 'react';
import { Route, HashRouter as Router, withRouter } from 'react-router-dom';
import Home from '../views/home'

const app = ({ history }) => (
    <Fragment>
        <Route exact path="/" component={Home} />
    </Fragment>
);

const AppWithRouter = withRouter(app);

const Routes = () => (
    <Router>
      <AppWithRouter />
    </Router>
  );
  
  export default Routes;
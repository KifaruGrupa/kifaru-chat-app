import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, withRouter } from 'react-router-dom';
import Home from '../views/home'
import SignUp from '../views/signup';
import SignIn from '../views/signin';
import Chat from '../views/Chat';


const app = ({ history }) => (
    <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/chat" component={Chat} />
    </Fragment>
);

const AppWithRouter = withRouter(app);

const Routes = () => (
    <Router>
      <AppWithRouter />
    </Router>
  );

  export default Routes;
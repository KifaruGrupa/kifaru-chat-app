import React, { Fragment } from 'react';
import { Route, HashRouter as Router, withRouter } from 'react-router-dom';
import Home from '../views/home'
import Chat from '../views/Chat';
import {DataContext, DataProvider } from '../context/Appcontext'
import {UserContext, UserProvider } from '../context/UserContext'


const app = ({ history }) => (
    <Fragment>
        <Route exact path="/" component={Home} />
        <DataProvider>
          <UserProvider>
            <Route exact path="/chat" component={Chat} />
          </UserProvider>
        </DataProvider>
    </Fragment>
);

const AppWithRouter = withRouter(app);

const Routes = () => (
    <Router>
      <AppWithRouter />
    </Router>
  );

  export default Routes;
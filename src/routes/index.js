import React, { Fragment } from 'react';
import { Route, HashRouter as Router, withRouter } from 'react-router-dom';
import Home from '../views/home'
import Chat from '../views/Chat';
import {DataProvider } from '../context/Appcontext'
import { UserProvider } from '../context/UserContext'
import { ProfileProvider } from '../context/ProfileContext';


const app = ({ history }) => (
    <Fragment>
        <Route exact path="/" component={Home} />
        <DataProvider>
        <ProfileProvider>
          <UserProvider>
            <Route exact path="/chat" component={Chat} />
          </UserProvider>
          </ProfileProvider>
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
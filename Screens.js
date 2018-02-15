import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';
import { withRouter, Switch, Route } from 'react-router-native';
import { AuthRoute } from './utils/routing';
import { ErrorBoundary, Screen } from './utils/elements';
import AuthHeader from './screens/headers/AuthHeader';
import Nav from './screens/headers/Nav';
import Home from './screens/Home';
import Profile from './screens/Profile';

const { height } = Dimensions.get('window');

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const custom = StyleSheet.create({
  screenStyle: { backgroundColor: 'whitesmoke', height,
               justifyContent: 'center', alignItems: 'center' },
  paddingTop: {paddingTop: height * 0.05},
});

const Screens = ({ currentUser }) => [
  <View key='Padding' style={custom.paddingTop}></View>,

  currentUser ? null :
  <ErrorBoundary key='AuthHeader'>
    <AuthHeader />
  </ErrorBoundary>,

  <ErrorBoundary key='Screen'>
    <Screen style={custom.screenStyle}>
      <Switch>
        <AuthRoute exact path='/' component={Home}/>
        <Route exact path='/users/:id' component={Profile}/>
      </Switch>
    </Screen>
  </ErrorBoundary>,

  <ErrorBoundary key='Nav'>
    <Nav currentUser={currentUser}/>
  </ErrorBoundary>
];

export default withRouter(connect(mapStateToProps)(Screens));

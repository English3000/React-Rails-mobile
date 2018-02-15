import React from 'react';
import { SecureStore } from 'expo';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import createStore from './store';
import Screens from './Screens';
import { visitProfile } from './actions/visit';

export const CURRENT_USER_TOKEN = 'CURRENT_USER_TOKEN';
export const CURRENT_USER_ID = 'CURRENT_USER_ID';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentWillMount() {
    await SecureStore.getItemAsync(CURRENT_USER_TOKEN).then(
      session_token => SecureStore.getItemAsync(CURRENT_USER_ID).then(
        id => { this.state = {currentUser: {id, session_token}};
      })
    ).catch(err => { console.log(err); });
  }

  render() {
    return <Provider store={createStore(this.state)}>
      <NativeRouter>
        <Screens />
      </NativeRouter>
    </Provider>;
  }
}

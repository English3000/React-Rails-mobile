import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Font, SecureStore } from 'expo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { signOut } from '../../actions/auth';
import { CURRENT_USER_TOKEN, CURRENT_USER_ID } from '../../App';

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

const custom = StyleSheet.create({
  navStyle: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%',
              position: 'absolute', bottom: 25, right: 15 }
});

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {fontLoaded: false};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'FontAwesome': require('../../assets/fonts/FontAwesome.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  handleSignOut(SignOut) {
    SignOut();
    SecureStore.deleteItemAsync(CURRENT_USER_TOKEN).catch(err => { console.log(err); });
    SecureStore.deleteItemAsync(CURRENT_USER_ID).catch(err => { console.log(err); });
  }

  render() {
    const {currentUser, SignOut} = this.props;

    return this.state.fontLoaded ?
    <View style={custom.navStyle}>
      {currentUser ?
      <TouchableOpacity onPress={() => this.handleSignOut(SignOut)}>
        <FontAwesome style={{fontSize: 25}}>{Icons.signOut}</FontAwesome>
      </TouchableOpacity> : null}
    </View> : null;
  }
}

export default connect(null, mapDispatchToProps)(Nav);

import React from 'react';
import { View, Text } from 'react-native';
//not sure if `display: 'block'` is valid in React Native
export const Screen = props => <View style={{display: 'block'}} {...props}>
                                { props.children}
                               </View>;

export class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {error: null};
  }

  componentDidCatch(error) { this.setState({error}); }

  render() {
    return this.state.error ?
      <Text>{this.state.error.toString()}</Text> : this.props.children;
  }
}

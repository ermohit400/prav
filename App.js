import React from 'react';
import { Font, AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import App from "./src";

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Semibold': require('./assets/fonts/OpenSans-Semibold.ttf'),
    });
    this.setState({isReady: true});
  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <App/>
    );
  }
}

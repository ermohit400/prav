import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import dimensions from '../../constants/Layout';
export default class SignupScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
            source={require('../../../assets/images/splash_bg.jpg')} 
            style={ { width: dimensions.window.width, height: dimensions.window.height }}>
          <Text>I am Signup Screen</Text>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

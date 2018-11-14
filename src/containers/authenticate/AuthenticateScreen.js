import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import _ from 'lodash'; 
import dimensions from '../../constants/Layout';
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Spinner,
} from 'native-base';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/user";

import styles from './styles';
class AuthenticateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
    };
  }

  componentDidMount(){
      this.props.fetchCurrentUser()
      .then(res => {
        console.log('res: ', res);
        if(res.status == 200){
          this.props.navigation.navigate('homeStack')
        }
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( 'messages: ', messages);
       this.setState({
        isLoaded: true,
       })
      });
  }

  onLoginButtonPressHandler(){
    this.props.navigation.navigate('loginScreen')
  }

  onSignupButtonPressHandler(){
    this.props.navigation.navigate('signupScreen')
  }

  render(){
    return (
      <Container style={styles.container}>
        <ImageBackground 
            source={require('../../../assets/images/splash_bg.jpg')} 
            style={ { width: dimensions.window.width, height: dimensions.window.height }}>
          <Content scrollEnabled={false}>
            <View>
              <View
                style={styles.imageCont} >
                <Image 
                style={styles.icon} 
                source={ require('../../../assets/images/logo.png') } 
                resizeMode="contain"
                />
                <Text style={styles.midText}>Get started to start plan your rent / property</Text>
              </View>
              { this.state.isLoaded ? 
                <View style={styles.loginBox}>
                    <Button
                      full
                      rounded
                      style={styles.button}
                      onPress={() => this.onSignupButtonPressHandler()}
                    >
                      <Text>Sign Up with Email</Text>
                    </Button>
                    <Button
                      full
                      rounded
                      style={styles.buttonFb}
                      onPress={() => this.onLoginButtonPressHandler()}
                    >
                      <Text>Facebook Login</Text>
                    </Button>
                    <Button transparent dark full onPress={() => this.onLoginButtonPressHandler()}>
                      <Text>Already have an account? Login</Text>
                    </Button>
                </View> :
                <View> 
                  <Spinner color='white'/>
                </View>
              }
            </View>
          </Content>
         </ImageBackground>
      </Container>
    );
  }
}

export default connect(
    state => ({
        current_user: state.current_user
    }),
    dispatch => bindActionCreators(userActions, dispatch)
)(AuthenticateScreen);

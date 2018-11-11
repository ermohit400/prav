import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'; 
import dimensions from '../../constants/Layout';
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";

import styles from './styles';
class ForgottenPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
    };
  }

  onSubmit(){
    this.initiateForgotpassword();
  }
  onBackPressHandler(){
    this.props.navigation.goBack();
  }

  initiateForgotpassword(){
    this.setState({
      isLoading: true,
    })
    const user = {
      username: this.state.username,
    }

    this.props.initiateForgotpassword(user)
      .then(res => {
        if(res.status == 200){
          const message = _.get(res, 'data.message')
            if (message){
             this.setState({
               success: message,
               error: null,
               isLoading: false,
             })
            }
        }else{
          this.setState({
           isLoading: false,
          })
    }
      })
      .catch(error => {
        const message = _.get(error, 'response.data.message')
        if (message){
         this.setState({
           error: message,
           success: null,
           isLoading: false,
         })
       }
       console.log(`
          Error messages returned from server:`, error )
      });
  }

  render(){
    return (
      <Container style={styles.container}>
        <ImageBackground 
            source={require('../../../assets/images/splash_bg.jpg')} 
            style={ { width: dimensions.window.width, height: dimensions.window.height }}>
          <KeyboardAwareScrollView>
          
            <View>  
              
              <View
                style={styles.imageCont} >
                <Image 
                style={styles.icon} 
                source={ require('../../../assets/images/logo.png') } 
                resizeMode="contain"
                />
              </View>
              <View style={styles.loginBox}>
                <Form>
                    <Text style={styles.formMsg}>{this.state.error}</Text>
                    <Text style={styles.formSuccessMsg}>{this.state.success}</Text>
                    <Item floatingLabel >
                      <Label style={styles.labelStyle} >Enter Email</Label>
                      <Input
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={30}
                        numberOfLines={1}
                        onChangeText={ (username)=> this.setState({username}) }
                      />
                    </Item>
                  { this.state.isLoading ? 
                    <Spinner color='white' /> : 
                    <Button
                      full
                      rounded
                      primary
                      style={styles.button}
                      onPress={() => this.onSubmit()}
                    >
                    <Text>Send Reset Instructions</Text>
                  </Button>
                  }
                </Form>
                <Button
                  style={{ marginTop:30 }} 
                  primary 
                  full 
                  bordered
                  rounded
                  light
                  onPress={() => this.onBackPressHandler()}
                >
                  <Text > Back </Text>
                </Button>
              </View>

            </View>
          
          </KeyboardAwareScrollView>
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
)(ForgottenPassword);

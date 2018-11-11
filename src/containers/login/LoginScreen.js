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
  Form,
  Item,
  Label,
  Input,
  Spinner,
} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  onSubmit(){
    this.login();
  }
  onForgotpasswordPressHandler(){
    this.props.navigation.navigate('forgotpasswordScreen')
  }

  login(){
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    this.setState({
      isLoading: true,
    })
    this.props.authenticate(user)
      .then(res => {
        if(res.status == 200){
          this.props.navigation.navigate('homeStack')
        }else{
          this.setState({
            isLoading: false,
          })     
        }
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message){
         this.setState({
           error: message,
           isLoading: false,
         })
       }
       console.log(`
          Error messages returned from server:`, messages )
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
                  <Text transparent style={styles.formMsg}>{this.state.error}</Text>
                <Form>
                    <Item style={styles.itemStyle} floatingLabel >
                      <Label style={styles.labelStyle} >Enter Email</Label>
                      <Input
                        keyboardType={'email-address'}
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={100}
                        numberOfLines={1}
                        onChangeText={ (username)=> this.setState({username}) }
                        spellCheck={false}
                        autoCorrect={false}
                      />
                    </Item>
                    <Item style={styles.itemStyle} floatingLabel last>
                      <Label style={styles.labelStyle} >Enter Password</Label>
                      <Input
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={30}
                        numberOfLines={1}
                        secureTextEntry={true}
                        onChangeText={ (password)=> this.setState({password}) }
                        spellCheck={false}
                        autoCorrect={false}
                      />
                    </Item>
                    <View style={{ marginTop: 20 }}> 
                      { this.state.isLoading ? 
                         <Spinner color='white' /> : 
                          <Button
                            full
                            rounded
                            primary
                            style={styles.button}
                            onPress={() => this.onSubmit()}
                          >
                            <Text> Secure log in</Text>
                          </Button>
                      }
                    </View>

                </Form>
                <Button transparent dark full  
                  onPress={() => this.onForgotpasswordPressHandler()}
                >
                  <Text style={{color: "#fff"}} > Forgot Password </Text>
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
)(LoginScreen);

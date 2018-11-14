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
  DatePicker,
  Picker
} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype:'',
      firstname:'',
      lastname:'',
      username:'',
      password:'',
      //dob:'',
      //zipcode:'',
      //gender:'',
      error:'',
    };
  }

  onSubmit(){
    this.login();
  }

  onLoginButtonPressHandler(){
    this.props.navigation.navigate('loginScreen')
  }

  login(){
    const user = {
      usertype: this.state.usertype,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password,
      //dob: this.state.dob,
      //zipcode: this.state.zipcode,
      //gender: this.state.gender,
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

  onUserTypeChange(value: string) {
    this.setState({
      usertype: value
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
              <View style={styles.imageCont}>
                <Image style={styles.icon} 
                source={ require('../../../assets/images/logo.png') } 
                resizeMode="contain"/>
                {/*}<Text style={styles.midText}>Sign Up to Get Started!</Text>{*/}
              </View>
              <View style={styles.loginBox}>
                  <Text transparent style={styles.formMsg}>{this.state.error}</Text>
                <Form>
                    <Item style={styles.itemStyle} >
                      <Picker
                        mode="dropdown"
                        placeholder="User Type"
                        placeholderStyle={{ color: "#FFFFFF"}}
                        headerBackButtonText="<"
                        headerTitleStyle={{ color: "#fff" }}
                        textStyle={{ color: "#fff",fontSize: 17}}
                        selectedValue={this.state.usertype}
                        onValueChange={this.onUserTypeChange.bind(this)}>
                        <Picker.Item label="I’m a landlord" value="key0" />
                        <Picker.Item label="I’m a renter" value="key1" />
                      </Picker>
                    </Item>
                    <Item style={styles.itemStyle} >
                      <Input
                        placeholder="First Name"
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={100}
                        numberOfLines={1}
                        onChangeText={ (firstname)=> this.setState({firstname}) }
                        spellCheck={false}
                        autoCorrect={false}
                        placeholderTextColor="#FFFFFF"
                      />
                    </Item>
                    <Item style={styles.itemStyle}>
                      <Input
                        placeholder="Last Name"
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={100}
                        numberOfLines={1}
                        onChangeText={ (lastname)=> this.setState({lastname}) }
                        spellCheck={false}
                        autoCorrect={false}
                        placeholderTextColor="#FFFFFF"
                      />
                    </Item>
                    <Item style={styles.itemStyle}>
                      <Input
                        placeholder="Email Address"
                        keyboardType={'email-address'}
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={100}
                        numberOfLines={1}
                        onChangeText={ (username)=> this.setState({username}) }
                        spellCheck={false}
                        autoCorrect={false}
                        placeholderTextColor="#FFFFFF"
                      />
                    </Item>
                    <Item style={styles.itemStyle}>
                      <Input
                        placeholder="Password"
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={30}
                        numberOfLines={1}
                        secureTextEntry={true}
                        onChangeText={ (password)=> this.setState({password}) }
                        spellCheck={false}
                        autoCorrect={false}
                        placeholderTextColor="#FFFFFF"
                      />
                    </Item>
                    
                    {/*}
                    <Item style={styles.itemStyle}>
                      <DatePicker
                        placeholder="Date of Birth"
                        placeHolderTextStyle={{ color: "#FFFFFF" }}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        style={styles.textbox}
                        textStyle={{ color: "#FFFFFF" }}
                        onChangeText={ (dob)=> this.setState({dob}) }
                        spellCheck={false}
                        autoCorrect={false}
                      />
                    </Item>
                    <Item style={styles.itemStyle}>
                      <Input
                        placeholder="Zip Code"
                        autoCapitalize="none"
                        style={styles.textbox}
                        maxLength={30}
                        numberOfLines={1}
                        onChangeText={ (zipcode)=> this.setState({zipcode}) }
                        spellCheck={false}
                        autoCorrect={false}
                        placeholderTextColor="#FFFFFF"
                      />
                    </Item>
                    {*/}
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
                            <Text>Secure SignUp</Text>
                          </Button>
                      }
                    </View>
                </Form>
                <Button transparent dark full  
                  onPress={() => this.onLoginButtonPressHandler()}
                >
                  <Text style={{color: "#fff"}} > Login Instead </Text>
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
)(SignupScreen);

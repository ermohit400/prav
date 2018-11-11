import React, { Component } from "react";
import * as Expo from "expo";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Animated,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Right,
  Title,
  Thumbnail,
  Col,
  Row,
  Grid,
  Icon,
  Button,
  Spinner,
  Toast
} from "native-base";
import { Entypo as EntypoIcon } from '@expo/vector-icons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../../components/BackButton' 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImagePicker } from 'expo';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import styles from './styles';
import {changeProfilePicture , fetchCurrentUser } from "../../actions/user";
import MenuButton from "../../components/MenuButton"
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      scrollY: new Animated.Value(0), 
      user: props.current_user.info,
      profileImageLoading: false, 
    };
    const {dispatch} = props;
   
    this.actions = bindActionCreators(
      { changeProfilePicture, fetchCurrentUser} , dispatch
    ) 
  }

  componentWillMount() {
    
  }

  componentDidMount(){
    (async () => {
      this.actions.fetchCurrentUser()
      .then(res => {
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
      });
    })();
  }

  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    console.log(result, 'result');

    if (!result.cancelled) {
      this.setState({
      profileImageLoading: true,
    })
    this.actions.changeProfilePicture({ base64: `data:image/jpeg;base64,${result.base64}` })
      .then(res => {
        Toast.show({
          text: 'Profile picture updated successfully',
          type: 'success',
          position: 'bottom',
          buttonText: 'Okay',
          onClose: ()=> {
            console.log("Closed")
          }
        })
        this.setState({
            profileImageLoading: false,
        })
        console.log('Profile updated')
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message){
         this.setState({
           error: message,
           profileImageLoading: false,
         })
       }
       console.log(`
          Error messages returned from server:`, messages )
      });
    }
  };

  _keyExtractor = (item, index) => item.id;
  
  renderAddress(address){
    console.log('address',address)
    return(
      <View style={{marginTop: 15, marginLeft: 5, marginBottom: 300 }} >
        <TouchableOpacity 
          onPress={ ()=>  Toast.show({
          text: 'Please web interface to update this address, we require your address to process Payment',
          position: 'bottom',
          type: 'info',
          buttonText: 'OK',
          duration: 5000,
          buttonPress: ()=> {
            console.log("Closed")
          }})} >
          <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
              Address: { address.formatted_address || '(Address)'}
          </Text>
          <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
              City: { address.city || '(City)'} [{address.zip_code || '(Zip)'}] 
          </Text>
          <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
              State: { address.state_name || '(State)'}
          </Text>
        </TouchableOpacity>

      </View>
    )
  }

  render() {
    const {image_url} = this.props.current_user.info
    console.log('image_url', image_url)
    return (
      <Container>
        <Header >
          <Left>
             <MenuButton navigation={this.props.navigation} />
          </Left>
          <Body>
            <Title style={styles.title} > Profile </Title>
          </Body>
          <Right> 
            
          </Right>
        </Header>
        <Content>
          <View style={styles.profileImageWrap}>
            <View>
              <Thumbnail style={styles.profileImage} large source={{uri: image_url }}></Thumbnail>
              { this.state.profileImageLoading && <ActivityIndicator
                  color="#00ff00"
                  size='large'
                  style={styles.profileActivityIndicator}
                />}
              <Button onPress={this._pickImage} style={styles.profilePencilIconWrap}>
                <FaIcon   style={styles.profilePencilIcon} size={25} color="#006FAB" name={'pencil'}/>
              </Button>
            </View>
            <View>
              <Text style={styles.profileName}>{this.state.user.full_name}</Text> 
            </View>
          </View>
          <View style={{ backgroundColor: "white" , flex: 1}}>
            <View style={styles.header}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View  style={{flex: 8, 'flexWrap': 'wrap'}}>
                  
                  <Text style={ styles.userphoneText}>
                      Phone Number: { this.state.user.phone_number }
                  </Text>
                  <Text style={styles.usernameText}>{this.state.user.email}</Text>
                </View>
                <View style={{flex: 2, 'flexWrap': 'wrap'}}>
                  <Button 
                  rounded 
                  onPress={ ()=> this.props.navigation.navigate('settingsScreen') } 
                  bordered 
                  style={{ }}>
                  <Icon
                    name="settings"
                    style={{ color: "#4286f4"}}
                  />
                </Button>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}>
                <View style={{ flexDirection: "row"}}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", marginLeft: 0 }}
                  >
                    {this.state.user.total_earnings || 0 }
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
                    Earnings
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", marginLeft: 30 }}
                  >
                    {this.state.user.jobs_count || 0 }
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
                    Bookings
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 8 }}>
              {(
                <View
                  contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  { this.renderAddress(this.state.user.address) }
                </View>
              )}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}


export default connect(
    state => ({
        current_user: state.current_user,
    })
)(ProfileScreen);
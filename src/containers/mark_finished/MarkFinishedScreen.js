import React from 'react';
import {
  Tabs,
  Tab,
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Right,
  TabHeading,
  Segment,
  Icon,
  Item,
  Textarea,
  Label,
  Spinner,
  Form,
} from "native-base";
import { 
  Alert, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  View 
} from 'react-native'
import _ from 'lodash'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker } from 'expo';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";;
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import BackButton from '../../components/BackButton' 
import {fecthBookings, markFinishBooking } from "../../actions/bookings";
class MarkFinishedScreen extends React.Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      images: [null, null, null, null],
      isLoading: false,
      booking_id: params.booking_id,
      comment: ''
    };

    this.onSelectImageButtonPress = this.onSelectImageButtonPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    const {dispatch} = props;
    this.actions = bindActionCreators(
      { fecthBookings, markFinishBooking} , dispatch
    ) 
  }

  onSelectImageButtonPress = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });

    console.log(result, 'result');

    if (!result.cancelled) {
      this.setState({
        profileImageLoading: true,
      })
      let images = this.state.images;
      images[index] = { base64: `data:image/jpeg;base64,${result.base64}` , name: result.fileName || 'file' + index + '.jpg' };
      images = images.sort((a, b) => {
        if (a === null) {
          return 1;
        } else if (b === null) {
          return -1;
        } else {
          return 0;
        }
      });
      this.setState({ images });
   }
  }

  onSubmit(){
    if(this.state.images.filter(image => image ) < 1){
      return this.setState({
            error: 'Please add images from booking',
      })
    }

    if(this.state.comment.length < 1){
      return this.setState({
            error: 'Please add Your review about booking',
      })
    }

    

    (async () => {
        this.setState({
              isLoading: true,
              error: null
        })
        this.actions.markFinishBooking({ 
          params:{
            booking_id: this.state.booking_id
          },
          payloads: { 
            booking:{
              images_attributes: this.state.images.filter(image => image ), 
              provider_review_attributes: { 
                body: this.state.comment
              }
            }
          }
        }).then(res => {
          console.log(res);
          if(res.status == 200){
            this.setState({
              isLoading: false,
            })
            this.props.navigation.goBack()
          }else{
            this.setState({
              isLoading: false,
              error: 'Something is not right',
             })
          }       
        }).catch(error => {
           const messages = _.get(error, 'response.data.message') || 'Something is not right'
           console.log( messages);
           this.setState({
            isLoading: false,
            error: messages,
           })
        })
    })();
  }

  renderImagePlaceholder(image, index) {
    let component = (
      <View style={[ styles.placeholder, styles.image ]}>
        { index === this.state.images.length - 1 ? <Entypo name="plus" size={ 24 } color="#cccccc" /> : <Icon name="camera" size={ 24 } color="#cccccc" /> }
      </View>
    );

    if (image) {
      component = <Image source={{ uri: image.base64 }} style={ styles.image } />
    }

    return (
      <TouchableOpacity key={ index } onPress={ () => { this.onSelectImageButtonPress(index) } }>
        { component }
      </TouchableOpacity>
    );
  }

  render() {
    let { image } = this.state;
    return (
      <Container>
        <Header >
          <Left style={{flex: 0.2}}>
            <BackButton navigation={this.props.navigation} />
          </Left>
          <Body>
            <Title>
              Mark Finished
            </Title>
          </Body>
        </Header>
        <KeyboardAwareScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              { this.state.images.map((image, index) => this.renderImagePlaceholder(image, index) )}
            </View>
          </View>
          <View >
            <View stayle={{
              flex:1, 
              paddingRight: 10,  
              paddingRight: 10,
              paddingRight: 20
            }}>
              <Textarea
                style={{
                  fontSize: 18,
                }} 
                onChangeText={ (comment)=> this.setState({comment}) }
                placeholder='Comment' 
                rowSpan={8} />
            </View>
            <Text transparent style={{
                fontSize: 16,
                color: 'red',
                alignSelf: 'center',
                backgroundColor: "rgba(0,0,0,0)"
              }}>
               {this.state.error}
            </Text>
             { this.state.isLoading ? 
               <Spinner color='green' /> : 
                <Button
                  full
                  rounded
                  primary
                  style={{marginTop: 20,}}
                  onPress={() => this.onSubmit()}
                >
                  <Text> Mark Finished </Text>
                </Button>
            }
            
          </View> 
        </KeyboardAwareScrollView>
      </Container>
    );
  }

}


export default connect(
    state => ({
        current_user: state.current_user,
    })
)(MarkFinishedScreen);

import React from 'react';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  H3,
} from "native-base";
import _ from 'lodash';
import BackButton from '../../components/BackButton' 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 
import { View, Linking } from 'react-native';
import styles from './styles';
import cosmicConfig from '../../config/config';
class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };

  
  }

  componentDidMount(){

  }



  render() {
    return (
      <Container>
        <Header>
          <Left>
            <BackButton navigation={this.props.navigation} />
          </Left>
          <Body>
            <Title> About </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H3 style={styles.headline}> MyMobileApp </H3>
          <Text style={styles.discription}>
          <Text>{`MyMobileApp version ${cosmicConfig.versionCode}\n`}</Text>
          <Text>Support: 
            <Text  style={{color: '#64a6fe'}} onPress={() => Linking.openURL('http://google.com')}>
            {`MyMobileApp`}
            </Text>
          </Text>
          <Text> {"\n"}{"\n"} </Text>
          <Text style={{ flex: 1, marginTop: 20}} > 
            We are an Irish company set up and designed to
            help used car buyers buy with confidence.

            A high number of used cars sold in Ireland have hidden issues or have been
            “clocked”. By having our mechanics inspect the vehicle, customers can greatly lower the
            risk involved in buying a new car.
          </Text>
          <Text> {"\n"}{"\n"} </Text>
          <Text tyle={{fontStyle: 'bold'}} >
            By using this app you agreeing to our
             <Text  style={{color: '#64a6fe'}} onPress={() => Linking.openURL('http://MyMobileApp.com/pages/privacy_policy')}>
             {` Privcay Policy`}
          </Text>
            
          </Text>
          </Text>
        </Content>
      </Container>
    );
  }

}

export default connect(
    state => ({

    }),
    dispatch => bindActionCreators({}, dispatch)
)(SettingScreen);

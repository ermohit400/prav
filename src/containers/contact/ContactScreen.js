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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BackButton from '../../components/BackButton' 
import { View, Linking } from 'react-native';
import styles from './styles';
import cosmicConfig from '../../config/config';
class ContactScreen extends React.Component {
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
            <Title> Contact Us </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <H3 style={styles.headline}> Contact Us </H3>

          <Text style={styles.discription}>
          <Text>{`Autoguru Forms version ${cosmicConfig.versionCode}\n`}</Text>
          <Text>Support: 
            <Text  style={{color: '#64a6fe'}} onPress={() => Linking.openURL('http://autoguru.ie/contact_us')}>
             {` http://autoguru.ie/contact_us`}
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
)(ContactScreen);

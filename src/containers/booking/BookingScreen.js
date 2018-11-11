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
  Right
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import MenuButton from "../../components/MenuButton"

class BookingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
             <MenuButton navigation={this.props.navigation} />
          </Left>
          <Body>
            <Title> Notifications </Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text> No notifications available  </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }

}


export default connect(
    state => ({
        current_user: state.current_user
    }),
    dispatch => bindActionCreators(userActions, dispatch)
)(BookingScreen);

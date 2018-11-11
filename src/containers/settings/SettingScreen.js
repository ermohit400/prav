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
  ListItem,
  Switch,
  Spinner,
} from "native-base";
import _ from 'lodash'; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import * as cityActions from "../../actions/cities";
import { View, FlatList } from 'react-native';
import BackButton from '../../components/BackButton' 
import styles from './styles';
class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };

    this.removeCityFromState = this.removeCityFromState.bind(this);
    this.addCityToState = this.addCityToState.bind(this);
  }

  componentDidMount(){
    const {cities} = this.props.current_user.info
    this.setState({
      selectedItems:  _.map(cities || [] , function(city) {
                         return city.id
                      })
    })
    this.props.fetchCities()
    .then(res => {
      console.log(res);
      this.setState({
        isLoaded: true,
       })
    })
    .catch(error => {
     const messages = _.get(error, 'message')
     console.log( messages);
     this.setState({
      isLoaded: true,
     })
    });
  }


  componentWillUnmount(){
    
  }

  removeCityFromState(cityId){
    var {selectedItems} = this.state
     var index = selectedItems.indexOf(cityId);
     if (index > -1) {
        selectedItems.splice(index, 1);
     }
     this.setState({
        selectedItems: selectedItems
     })
  }

  addCityToState(cityId){
    var {selectedItems} = this.state
    selectedItems.push(cityId)
    this.setState({
      selectedItems: selectedItems
    })
  }

  removeCity(cityId){
     let _this = this
     _this.removeCityFromState(cityId);
    _this.props.removeCity(cityId).then( res => {
      if (res.status == 200) {
      }
    })
    .catch(error => {
       _this.addCityToState(cityId);
       _this.setState({
        isLoaded: true,
       })
    });
  }
  addCity(cityId){
    let _this = this
    _this.addCityToState(cityId);
    _this.props.addCity(cityId).then( res => {
      if (res.status == 200) {
      }
    })
    .catch(error => {
       _this.removeCityFromState(cityId);
       _this.setState({
        isLoaded: true,
       })
    });
  }
  renderItem = ({ item }) => {
    if( item.selected ){
      return (
      <ListItem style={{ marginLeft: 0 }}>
        <Body>
          <Text>{item.name}</Text>
        </Body>
        <Right>
          <Switch value={true} onValueChange={ ()=> this.removeCity(item.id)}/>
        </Right>
      </ListItem>
    );
    }else{
      return (
      <ListItem style={{ marginLeft: 0 }}>
        <Body>
          <Text>{item.name}</Text>
        </Body>
        <Right>
          <Switch value={false} onValueChange={ ()=> this.addCity(item.id)}/>
        </Right>
      </ListItem>
    );

    }
    
  };

  render() {
    const { selectedItems } = this.state;
    const cities = _.map(this.props.cities, function(city) {
      if( _.includes(selectedItems, city.id) ){ 
        city['selected'] = true
      }else{
        city['selected'] = false
      }
      return city;
    })
    return (
      <Container>
        <Header>
          <Left>
            <BackButton navigation={this.props.navigation} />
          </Left>
          <Body>
            <Title> Settings </Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <FlatList
            data={cities}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            extraData={this.state.selectedItems}
            ListEmptyComponent={<Spinner style={{}}/>}
          />
            
        </Content>
      </Container>
    );
  }

}

export default connect(
    state => ({
        current_user: state.current_user,
        cities: state.cities.all
    }),
    dispatch => bindActionCreators({...userActions, ...cityActions}, dispatch)
)(SettingScreen);

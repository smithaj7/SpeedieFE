import React, { useState } from "react";
import { DataTable, RadioButton, Searchbar } from "react-native-paper";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import navigation from "react-navigation";
import Dialog, {DialogTitle, DialogContent } from 'react-native-popup-dialog';
import Modal from 'react-native-modal';



//import {useRoute} from '@react-navigation/native'
//import Home from "./WelcomeScreen";

//import { render } from "react-dom";

//export default class App extends React.Component {
const rowsPerPage = 2;

// const { params } = this.props.navigation.state;
// var user = params.user;
// console.log(user);



export default class MoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      page: 0,
      searchText: "",
      orderStatus: "A",
      newName: "",
      newPhone: "",
      newDeliveryDate: "",
      newAddress: "",
      newQuantity: 0,
    };

    this.newOrderPressHandler = this.newOrderPressHandler.bind(this);
    this.inventoryPressHandler = this.inventoryPressHandler.bind(this);
    this.fillOrder = this.fillOrder.bind(this);
    this.refreshScreen = this.refreshScreen.bind(this);
    this.archivedPressHandler = this.archivedPressHandler.bind(this);
    this.addOrderPressHandler = this.addOrderPressHandler.bind(this);
    this._handleAccountPress = this._handleAccountPress.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getData();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  getData = async () => {
    return fetch("http://localhost:7071/api/HttpTrigger1", {
      method: "POST",
      body: JSON.stringify({
        location: this.props.navigation.state.params.location,
        //orderStatus: this.state.orderStatus,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: [responseJson],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onChangeSearch = async (text) => {
    await this.setState({ searchText: text });
    return fetch("http://localhost:7071/api/HttpTrigger1", {
      method: "POST",
      body: JSON.stringify({
        location: this.props.navigation.state.params.location,
        searchText: text,
        //orderStatus: this.state.orderStatus,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: [responseJson],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addOrderPressHandler() {
    return fetch("http://localhost:7071/api/AddOrder", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.newName,
        phone: this.state.newPhone,
        location: this.props.navigation.state.params.loc,
        deliveryDate: this.state.newDeliveryDate,
        address: this.state.newAddress,
        quantity: this.state.newQuantity,
      }),
    })
      .catch((error) => {
        console.log(error);
      })
      .then(this.refreshScreen);
  }
  newOrderPressHandler() {
    this.props.navigation.navigate("NewOrder");
  }

  archivedPressHandler = async () => {
    await this.setState({ orderStatus: "I" });
    return this.getData();
  };

  outstandingPressHandler = async () => {
    await this.setState({ orderStatus: "A" });
    return this.getData();
  };

  _handleAccountPress(){
    const { params } = this.props.navigation.state;
    var email = params.user;
    var loc = params.location;
    var employeeRole = params.role;
    this.props.navigation.navigate("AccountInfo", {user: email, location: loc, role: employeeRole});
  }

  inventoryPressHandler() {
    const { params } = this.props.navigation.state;
    var email = params.user;
    var loc = params.location;
    var employeeRole = params.role;
    this.props.navigation.navigate("Inventory", {user: email, location: loc, role: employeeRole});
  }

  refreshScreen = () => {
    this.getData();
  };


  fillOrder(i, orderStatus, qts, hgs) {
    const { params } = this.props.navigation.state;
    var user = params.user;
    return fetch("http://localhost:7071/api/FillOrder", {
      method: "POST",
      body: JSON.stringify({
        location: this.props.navigation.state.params.location,
        orderNumber: i + 1,
        newStatus: orderStatus,
        filledBy: user,
        bottlesReturned: 1,
        quarts: qts,
        halfGals: hgs,
      }),
    }).then(this.refreshScreen);
  };


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      var orders = [];
      var arrLength;
      this.state.dataSource.map((val, key) => {
        arrLength = val.phoneNumbers.length;
      });
      for (let i = 0; i < arrLength; i++) {
        
        orders.push(
          this.state.dataSource.map((val, index) => {

            var popupinfo = <div> <div> Customer: {val.names[i]}</div>
                 <div> Phone Number: {val.phoneNumbers[i]}</div>
                  <div> Location: {val.locations[i]}</div>
                 <div> Address: {val.addresses[i]}</div>
                 <div> Quarts: {val.quarts[i]}</div>
                <div> HGs: {val.halfGals[i]}</div> </div>
              
            return (  
                <View>
                    <div> Customer: {val.names[i]}</div>
                    <div> Phone Number: {val.phoneNumbers[i]}</div>
                    <div> Location: {val.locations[i]}</div>
                    <div> Address: {val.addresses[i]}</div>
                    <div> Quarts: {val.quarts[i]}</div>
                    <div> HGs: {val.halfGals[i]}</div>    
                </View>
                );
            }))
        }}

      var menu;
        if (this.props.navigation.state.params.role == "Associate"){
          menu = <View style={styles.menuView}>
          <TouchableOpacity style={styles.leftButton} onPress={this.ordersPressHandler}>
            <Text style={styles.menuText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightButton}>
          <Text style={styles.menuText} onPress={this._handleAccountPress}>Account</Text>
          </TouchableOpacity>
        </View>
        }
        else{
          menu = <View style={styles.menuView}>
          <TouchableOpacity style={styles.leftButton} onPress={this.ordersPressHandler}>
            <Text style={styles.menuText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.middleButton} onPress={this.inventoryPressHandler}>
          <Text style={styles.menuText}>Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightButton}>
          <Text style={styles.menuText} onPress={this._handleAccountPress}>Account</Text>
          </TouchableOpacity>
        </View>
        }

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>{this.props.navigation.state.params.location} More Information</Text>
          </View>

              
              {orders}

              
            {menu}
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: "10%",
    width: "100%",
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#093b15",
  },
  phoneText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
  },
  searchBar: {
    position: "relative",
    marginTop: "4%",
    width: "70%",
    left: "5%",
    alignSelf: "flex-start",
    //left: 70
  },
  // rowColor:{
  //   backgroundColor: "#D3D3D3",
  // },

  // rowColor:nth-of-type(even) {
  //   backgroundColor: "white",
  // },

  newOrderStyle: {
    width: 130,
    height: 35,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    position: "absolute",
    bottom: 5,
    left: 180,
  },
  unfulfilledText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    left: 32,
    top: 140,
  },
  fulfilledText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    left: 32,
    top: 175,
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "black",
    position: "absolute",
    fontSize: 15,
    fontWeight: "bold",
    right: 15,
    top: 7,
  },
  inputView: {
    backgroundColor: "#A9A9A9",
    alignSelf: "flex-start",
    paddingLeft: 10,
    height: "50%",
    width: "40%",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    width: "50%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  table: {
    width: "50%",
  },
  touch: {
    backgroundColor: "#9AC6A2",
    width: "7%",
    height: "55%",
    position: "absolute",
    top: 15,
    right: 30,
    borderRadius: 7,
  },
  touchNew: {
    backgroundColor: "#9AC6A2",
    width: "7%",
    height: "55%",
    position: "absolute",
    top: 15,
    right: 150,
    borderRadius: 7,
  },

  plusSign: {
    fontSize: 36,
    fontWeight: "bold",
    position: "absolute",
    bottom: 7,
    left: 13,
    color: "green",
  },

  archivedButton: {
    backgroundColor: "#9AC6A2",
    width: "7%",
    height: "55%",
    position: "absolute",
    top: 15,
    right: 300,
    borderRadius: 7,
  },
  AddOrderBtn: {
    color: "#093b15",
    textAlign: "center",
    position: "absolute",
    top: 5,
    right: 18,
    fontWeight: "bold",
  },
  InventoryBtn: {
    color: "#093b15",
    textAlign: "center",
    position: "absolute",
    top: 5,
    right: 18,
    fontWeight: "bold",
  },
  pic: {
    width: "100%",
    height: "100%",
  },
  nameHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"flex-start",
    flex: 1
  },
  orderIDHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"center",
    flex: 1
  },

  phoneHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"center",
    flex: 1
  },
  addressHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"flex-start",
    flex: 1
  },
  quantityHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"center",
    flex: 1
  },
  orderHeader: {
    position: "relative",
    marginTop: 5,
    alignSelf: "flex-start",
    left: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#093b15",
  },
  deliveryDateHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"flex-start",
    flex: .5
  },
  moreInfoHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"flex-start",
    flex: .2,
  },
  claimHeader: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"flex-start",
    flex: .3
  },
  editOrder: {
    backgroundColor: "#9AC6A2",
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 7,
  },
  infoButton: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 7,
  },

  reopenOrder: {
    backgroundColor: "#FF6961",
    width: "100%",
    height: "100%",
    position: "relative",
    //justifyContent: "center",
    //right: 30,
    borderRadius: 7,
  },
  editText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  menuView: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    height: "10%",
    width: "100%",
    backgroundColor: "#093b15"
  },
  leftButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"center",
    borderRightWidth: 1,
    borderRightColor: "white",
    //backgroundColor: "yellow",
    flex: 1,
    height: "100%",
    //width: "20%",
    //height: "100%", 
  },
  middleButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "white",
    //width: "20%",
    //height: "100%", 
    flex: 1,
    height: "100%",
  },
  rightButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "yellow",
    //width: "20%",
    //height: "100%", 
    flex: 1,
    height: "100%",

  },
  menuText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  }
});
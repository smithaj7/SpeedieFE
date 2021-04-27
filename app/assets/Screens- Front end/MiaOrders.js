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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DropDownPicker from "react-native-dropdown-picker";



//import {useRoute} from '@react-navigation/native'
//import Home from "./WelcomeScreen";

//import { render } from "react-dom";

//export default class App extends React.Component {
const rowsPerPage = 2;

// const { params } = this.props.navigation.state;
// var user = params.user;
// console.log(user);



export default class MiaOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      page: 0,
      searchText: "",
      orderStatus: "A",
      location: "",
      newName: "",
      newPhone: "",
      newDeliveryDate: "",
      newAddress: "",
      visible: false,
      newQuantity: 0,
      popupinfo: "",
      isVisible: false,
    };

    this.newOrderPressHandler = this.newOrderPressHandler.bind(this);
    this.inventoryPressHandler = this.inventoryPressHandler.bind(this);
    this.fillOrder = this.fillOrder.bind(this);
    this.refreshScreen = this.refreshScreen.bind(this);
    this.archivedPressHandler = this.archivedPressHandler.bind(this);
    //this.addOrderPressHandler = this.addOrderPressHandler.bind(this);
    this._handleAccountPress = this._handleAccountPress.bind(this);
    this.displayModal = this.displayModal.bind(this);
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
    var orderLocation;
    if(this.props.navigation.state.params.role == "Associate"){
      orderLocation = this.props.navigation.state.params.location;
    }
    else{
      orderLocation = this.state.location;
    }
    return fetch("https://speediebackend.azurewebsites.net/api/HttpTrigger1?", {
      method: "POST",
      body: JSON.stringify({
        location: orderLocation,
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
    var orderLocation;
    if(this.props.navigation.state.params.role == "Associate"){
      orderLocation = this.props.navigation.state.params.location;
    }
    else{
      orderLocation = this.state.location;
    }
    await this.setState({ searchText: text });
    return fetch("https://speediebackend.azurewebsites.net/api/HttpTrigger1?", {
      method: "POST",
      body: JSON.stringify({
        location: orderLocation,
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

  onChangeItem = async (item) => {
    await this.setState({ location: item });
    return fetch("https://speediebackend.azurewebsites.net/api/HttpTrigger1?", {
      method: "POST",
      body: JSON.stringify({
        location: this.state.location,
        //searchText: text,
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

  // addOrderPressHandler() {
  //   return fetch("http://localhost:7071/api/AddOrder", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: this.state.newName,
  //       phone: this.state.newPhone,
  //       location: this.props.navigation.state.params.loc,
  //       deliveryDate: this.state.newDeliveryDate,
  //       address: this.state.newAddress,
  //       quantity: this.state.newQuantity,
  //     }),
  //   })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .then(this.refreshScreen);
  // }
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
    var passwordLength = params.pLength;
    this.props.navigation.navigate("AccountInfo", {user: email, location: loc, role: employeeRole, pLength: passwordLength});
  }

  inventoryPressHandler() {
    const { params } = this.props.navigation.state;
    var email = params.user;
    var loc = params.location;
    var employeeRole = params.role;
    var passwordLength = params.pLength;
    this.props.navigation.navigate("Inventory", {user: email, location: loc, role: employeeRole, pLength: passwordLength});
  }

  refreshScreen = () => {
    this.getData();
  };

  popUps(i,val){
    if (this.state.visible){
      return(
        <Dialog
                          visible={this.state.visible}
                          dialogTitle={<DialogTitle title="More Information" />}
                          onTouchOutside={() => { this.setState({ visible: false });}} >
                          
                            
                          <DialogContent>
                            <div> Customer: {val.names[i]}</div>
                            <div> Phone Number: {val.phoneNumbers[i]}</div>
                            <div> Location: {val.locations[i]}</div>
                            <div> Address: {val.addresses[i]}</div>
                            <div> Quarts: {val.quarts[i]}</div>
                            <div> HGs: {val.halfGals[i]}</div>
                          </DialogContent>
                        </Dialog>


      )
    }
  }
 

  
  fillOrder(i, orderStatus, qts, hgs) {
    const { params } = this.props.navigation.state;
    var user = params.user;
    return fetch("https://speediebackend.azurewebsites.net/api/FillOrder?", {
      method: "POST",
      body: JSON.stringify({
        location: this.props.navigation.state.params.location,
        orderNumber: i + 1,
        newStatus: orderStatus,
        filledBy: user,
        //bottlesReturned: 1,
        quarts: qts,
        halfGals: hgs,
      }),
    }).then(this.refreshScreen);
  };

  displayModal(show){
    this.setState({isVisible: show})
  }

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

      
      var popups = [];

        for(let index = 0;index < arrLength;index++)
        popups.push(
        this.state.dataSource.map((val, index) => {
            
              return(
                
    
                          <DialogContent>
                            <div> Customer: {val.names[index]}</div>
                            <div> Phone Number: {val.phoneNumbers[index]}</div>
                            <div> Location: {val.locations[index]}</div>
                            <div> Address: {val.addresses[index]}</div>
                            <div> Quarts: {val.quarts[index]}</div>
                            <div> HGs: {val.halfGals[index]}</div>
                          </DialogContent> 
                        

             ) 
              }
        )
        )
            
      
      for (let i = 0; i < arrLength; i++) {
        
        orders.push(
          this.state.dataSource.map((val, index) => {
            console.log(i)
            var popupinfo = <div> <div> Customer: {val.names[i]}</div>
                 <div> Phone Number: {val.phoneNumbers[i]}</div>
                  <div> Location: {val.locations[i]}</div>
                 <div> Address: {val.addresses[i]}</div>
                 <div> Quarts: {val.quarts[i]}</div>
                <div> HGs: {val.halfGals[i]}</div> </div>
               if (val.orderStatuses[i] == "A") {
                return (
                  <DataTable.Row style={i % 2? { background : "#D3D3D3" }:{ background : "white" }} key={i}>
                    <DataTable.Cell style={{flex: .2}} >
                        <Popup trigger={<button>+</button>} position="right center">
                          <div> Customer: {val.names[i]}</div>
                          <div> Phone Number: {val.phoneNumbers[i]}</div>
                          <div> Location: {val.locations[i]}</div>
                          <div> Address: {val.addresses[i]}</div>
                          <div> Quarts: {val.quarts[i]}</div>
                          <div> Half Gallons: {val.halfGals[i]}</div>
                          <div> Delivery Date: {val.deliveryDates[i]}</div>
                        </Popup>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: .5}} >{val.deliveryDates[i]}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 1}}
                      onPress={() => window.open('https://www.google.com/maps/search/?api=1&query=' + JSON.stringify(val.addresses[i]) + '+' +  JSON.stringify(val.locations[i]))}>
                      {val.addresses[i]}</DataTable.Cell>
                    <DataTable.Cell style={{flex: .3}}>
                      <TouchableOpacity
                        style={styles.editOrder}
                        onPress={this.fillOrder.bind(this, i, "I",val.quarts[i],val.halfGals[i])}
                      >
                        <Text style={styles.editText}>Claim</Text>
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              } else {
                return (
                  <DataTable.Row style={i % 2? { background : "#D3D3D3" }:{ background : "white" }} key={i}>
                    <DataTable.Cell style={{flex: .2}} >
                        <Popup trigger={<button>+</button>} position="right center">
                          <div> Customer: {val.names[i]}</div>
                          <div> Phone Number: {val.phoneNumbers[i]}</div>
                          <div> Location: {val.locations[i]}</div>
                          <div> Address: {val.addresses[i]}</div>
                          <div> Quarts: {val.quarts[i]}</div>
                          <div> Half Gallons: {val.halfGals[i]}</div>
                          <div> Delivery Date: {val.deliveryDates[i]}</div>
                        </Popup>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: .5}} >{val.deliveryDates[i]}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 1}}
                      onPress={() => window.open('https://www.google.com/maps/search/?api=1&query=' + JSON.stringify(val.addresses[i]) + '+' +  JSON.stringify(val.locations[i]))}>
                      {val.addresses[i]}</DataTable.Cell>
                    <DataTable.Cell style={{flex: .3}}>
                      <TouchableOpacity
                        style={styles.reopenOrder}
                        onPress={this.fillOrder.bind(this, i, "C", val.quarts[i],val.halfGals[i])}
                      >
                        <Text style={styles.editText}>Close</Text>
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              }
          })
        );
      }

      var menu;
      //var locationDrop;
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
        var displayLocation;
        if(this.props.navigation.state.params.role == "Associate"){
          displayLocation = this.props.navigation.state.params.location;
        }
        else{
          displayLocation = "All";
        }

        //onChangeText={(text) => this.onChangeSearch(text)}

        


      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>{displayLocation} Orders</Text>
          </View>
          <Searchbar
            placeholder="Search"
            style={styles.searchBar}
            onChangeText={(text) => this.onChangeSearch(text)}
          ></Searchbar>
          {/* {locationDrop} */}
          <ScrollView
            style={{
              width: "95%",
              height: "70%",
              position: "relative",
              alignSelf: "center",
              marginTop: "10%"
              //top: 250,
              //right: 200,
            }}
          >
            <DataTable
              style={{
                width: "100%",
                position: "relative",
                alignSelf: "center",
                marginTop: 10,
                flex: 1,
                borderRadius: 10,
                borderColor: "black",
                borderWidth: 1,
              }}
            >
              <DataTable.Header style={{ backgroundColor: "#ABD7EB" }}>
                <View style={styles.headerView}>
                <DataTable.Title 
                  style={styles.infoHeader}>
                  Order Information
                </DataTable.Title>
                
                </View>
              </DataTable.Header>
              <ScrollView>{orders}</ScrollView>

              <DataTable.Pagination
                page={this.state.page}
                numberOfPages={1}
                onPageChange={(page) => {
                  this.setState({ page: page });
                }}
              ></DataTable.Pagination>
            </DataTable>
          </ScrollView>
          {menu}
        </View>
      );
    }
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

  dropDownPicker: {
    alignSelf: "flex-start",
    //flexDirection: "row",
    justifyContent: "space-between",
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
  orderHeader: {
    position: "relative",
    marginTop: 5,
    alignSelf: "flex-start",
    left: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#093b15",
  },
  infoHeader: {
    fontSize: 18,
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"flex-start",
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
    height: "55px",
    width: "100vw",
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
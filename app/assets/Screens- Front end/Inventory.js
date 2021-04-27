import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ActivityIndicator, Modal} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import DropDownPicker from "react-native-dropdown-picker";
import navigation from "react-navigation";

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          // isLoading: true,
          // dataSource: [],
          // page: 0,
          location: "",
          // driver: "",
          // items: [],
          dataSource: "",
          tableHead: ['Bottle Size', 'Quantity', 'Add Inventory'],
          tableData: [],
          data2: []
        };
    
        this.controller;
        this.displayModal = this.displayModal.bind(this);
        this._handleAccountPress = this._handleAccountPress.bind(this);
        this.ordersPressHandler = this.ordersPressHandler.bind(this);
        this.inventoryPressHandler = this.inventoryPressHandler.bind(this);

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
        await fetch("https://speediebackend.azurewebsites.net/api/getInventory?", {
          method: "POST",
          body: JSON.stringify({
            location: this.state.location,
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

          if(this.state.location != ""){
          var numQuarts = this.state.dataSource.map((val, key) => {
            return val.Quarts;
          });

          var numHalfGals = this.state.dataSource.map((val, key) => {
            return val.HalfGals;
          });

          
          this.setState({tableData: [['Quart', numQuarts, 'n/a'],
          ['HG', numHalfGals, 'n/a']],})
        }


      }

      itemChange = async (item) => {
        
        await fetch("https://speediebackend.azurewebsites.net/api/getInventory?", {
          method: "POST",
          body: JSON.stringify({
            location: item.value,
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

          var numQuarts = this.state.dataSource.map((val, key) => {
            return val.Quarts;
          });

          var numHalfGals = this.state.dataSource.map((val, key) => {
            return val.HalfGals;
          });

          
          this.setState({tableData: [['Quart', numQuarts, 'n/a'],
          ['HG', numHalfGals, 'n/a']],})

          this.setState({location: item.value})
      };

      addPress = async(index, amt) => {
        var size = "";
        if (index == 0){
          size = "Quarts"
        }
        else{
          size == "HalfGals"
        }
  
        await fetch("https://speediebackend.azurewebsites.net/api/AddInventory?", {
            method: "POST",
            body: JSON.stringify({
              size: size,
              amount: amt,
              location: this.state.location,
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
  
            var numQuarts = this.state.dataSource.map((val, key) => {
              return val.Quarts;
            });
  
            var numHalfGals = this.state.dataSource.map((val, key) => {
              return val.HalfGals;
            });

            this.setState({tableData: [['Quart', numQuarts, 'n/a'],
            ['HG', numHalfGals, 'n/a']],})
  
  
            return this.getData();
        
  
      } 
    
    _alertIndex(index) {
        alert(`This is row ${index + 1}`);
    }

    displayModal = () => {
      this.setState({isVisible: true})
    }

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

    ordersPressHandler(){
      const { params } = this.props.navigation.state;
      var email = params.user;
      var loc = params.location;
      var employeeRole = params.role;
      var passwordLength = params.pLength;
      this.props.navigation.navigate("MiaOrders", {user: email, location: loc, role: employeeRole, pLength: passwordLength});
    } 


    render() {
        const state = this.state;
        const element = (data, index) => (
          <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
          <TouchableOpacity style = {styles.addBtn} onPress={()  => {this.addPress(index, 1)}}>
              <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.subBtn} onPress={()  => {this.addPress(index, -1)}}>
              <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          </View>
        );
        
        
        
    
        return (
        <View style={styles.container}>
            <Image style = {styles.logo} source={require("../../../SpeediePNG.png")}></Image>
            <View style={styles.header}>
              <Text style={styles.headerText}>Inventory</Text>
            </View>
            <DropDownPicker
              items={[
                { label: "Miami", value: "Miami" },
                { label: "New Orleans", value: "New Orleans" },
                { label: "Chicago", value: "Chicago" },
                // { label: "Select a City", placeHolder: "Select a city"}
              ]}
              // defaultValue={this.state.data}
              placeholder="Select a City"
              style={{ 
                backgroundColor: "white", 
                width: "50%",
                alignSelf: "center",
                marginTop: "5%",
              }}
              itemStyle={{}}
              containerStyle={{height: "8%"}}
              dropDownStyle={{
                width: "50%",
                alignSelf: "center"
              }}
              onChangeItem={(item) => {this.itemChange(item)}}
            ></DropDownPicker>

            <View style={styles.container2}>
                <Table borderStyle={{borderColor: 'transparent'}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.headText}/>
                {
                    state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                        {
                        rowData.map((cellData, cellIndex) => (
                            <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                        ))
                        }
                    </TableWrapper>
                    ))
                }
                </Table>
            </View>
            <View style={styles.menuView}>
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
        </View>
        
        )
    }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff',
  },
  logo: {
    width: "25%",
    height: "8%",
    position: "absolute",
    marginTop: "5%",
    // alignItems: "flex-start",
  },
  header: {
    padding: "5%",
  },
  headerText: {
    textAlign: "center",
    color: "#113B08",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  container2: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff', 
  },
  head: { 
    flex: 1.5, 
    backgroundColor: '#113B08' 
  },
  headText: {
    color: 'white',
    margin: "5%" ,
    textAlign: "center",
    fontWeight: "bold"
  },
  text: { 
    margin: "8%" ,
    textAlign: "center"
  },
  row: { 
    flexDirection: 'row', 
    backgroundColor: '#C4A484' ,
    flex: 1,
    //height: "25%"
  },
  addBtn: { 
    width: "50%", 
    height: "80%", 
    paddingBottom: "5%",
    backgroundColor: '#C2E2C3',  
    borderRadius: 2,
    alignItems: "center"
    // alignItems: "center",
  },

  subBtn: { 
    width: "50%",
    height: "80%", 
    paddingBottom: "5%",
    backgroundColor: '#FF6961',  
    borderRadius: 2,
    alignItems: "center"
    // alignItems: "center",
  },
  btnText: { 
    textAlign: 'center', 
    color: 'black',
    fontWeight: "bold",
  },

  modalContainer: {
    height: "50%",
    width: "50%",
    backgroundColor: "black"
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

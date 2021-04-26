import React, { useState } from "react";
import { DataTable, RadioButton } from "react-native-paper";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import navigation from "react-navigation";
//import { render } from "react-dom";

//export default class App extends React.Component {

// const itemsPerPage = 1;

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };

    this.newOrderPressHandler = this.newOrderPressHandler.bind(this);
    this.inventoryPressHandler = this.inventoryPressHandler.bind(this);
  }

  componentDidMount() {
    return fetch("http://localhost:7071/api/HttpTrigger1", {
      method: "POST",
      body: JSON.stringify({
        location: "New Orleans",
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
  }
  newOrderPressHandler() {
    this.props.navigation.push("NewOrder");
  }

  inventoryPressHandler() {
    this.props.navigation.push("Inventory");
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      //var orderLength;
      // var orderTest;
      // orderTest = this.state.dataSource.map((val, key) => {
      //   return max(key);
      // });
      var orders = [];
      var arrLength;
      this.state.dataSource.map((val, key) => {
        arrLength = val.phoneNumbers.length;
      });
      for (let i = 0; i < arrLength; i++) {
        orders.push(
          this.state.dataSource.map((val, key) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>{i + 1}</DataTable.Cell>
                <DataTable.Cell>{val.phoneNumbers[i]}</DataTable.Cell>
                <DataTable.Cell>
                  <TouchableOpacity style={styles.editOrder}>
                    <Text style={styles.editText}>Fill</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            );
            //   <View key={key} style={styles.item}>
            //     <Text>{val.result[i]}</Text>
            //   </View>
          })
        );
      }
    }

    // const [page, setPage] = React.useState(0);
    // const from = page * itemsPerPage;
    // const to = (page + 1) * itemsPerPage;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Speedie Bean Associate Portal</Text>
          <TouchableOpacity
            style={styles.touch}
            onPress={this.newOrderPressHandler}
            activeOpacity={0.5}
          >
            <Text style={styles.AddOrderBtn}> Add Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchNew}
            onPress={this.inventoryPressHandler}
            activeOpacity={0.5}
          >
            <Text style={styles.InventoryBtn}>Inventory</Text>
          </TouchableOpacity>
        </View>
        <DataTable
          style={{
            width: "80%",
            position: "absolute",
            top: 100,
            right: 200,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <DataTable.Header style={{ backgroundColor: "#ABD7EB" }}>
            <DataTable.Title
              numeric
              sortDirection="descending"
              style={styles.orderIDHeader}
            >
              OrderID
            </DataTable.Title>
            <DataTable.Title numeric style={styles.phoneHeader}>
              Phone
            </DataTable.Title>
            <DataTable.Title numeric style={styles.phoneHeader}>
              Edit Order
            </DataTable.Title>
          </DataTable.Header>
          {orders}
          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-2 of 6"
          ></DataTable.Pagination>
        </DataTable>
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
    height: "7%",
    width: "100%",
    backgroundColor: "#093b15",
  },
  phoneText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    top: 16,
    left: 5,
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
    //borderWidth: 1,
    //padding: 8,
    //borderColor: "black",
    //backgroundColor: "green",

    width: "100%",
    height: "100%",
    //color: "white",
    //alignSelf: "flex-end",
    //position: "absolute",
    //top: 40,
    //right: 40,
  },
  orderIDHeader: {
    position: "absolute",
    left: 10,
  },

  phoneHeader: {
    position: "absolute",
    left: 753,
  },
  editOrder: {
    backgroundColor: "#9AC6A2",
    width: "17%",
    height: "85%",
    position: "absolute",
    top: 5,
    //right: 30,
    borderRadius: 7,
  },
  editText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    position: "absolute",
    top: 13,
    right: 20,
  },
});

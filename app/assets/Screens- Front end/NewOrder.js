import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { DataTable, RadioButton } from "react-native-paper";
import PhoneInput from "react-native-phone-input";
import Modal from "react-native-modal";
import NumberFormat from "react-number-format";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
//import TextInputMask from "react-native-text-input-mask";
//import Table from "react-native-data-table";
//import { black } from "react-native-paper/lib/typescript/src/styles/colors";

export default class NewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      location: "",
      deliveryDate: null,
      address: "",
      quantity: 0,
      isLoading: false,
      datasource: [],
      isModalVisible: false,
    };
    this.addPressHandler = this.addPressHandler.bind(this);
    this.pressHandler = this.pressHandler.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  // componentWillMount() {
  //   this.getData();
  // }

  getData = async () => {
    return await fetch("http://localhost:7071/api/AddOrder", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        location: this.state.location,
        deliveryDate: this.state.deliveryDate,
        address: this.state.address,
        quantity: this.state.quantity,
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

  onDateChange = async (date) => {
    await this.setState({
      deliveryDate: date,
    });

    console.log(this.state.deliveryDate);
  };

  pressHandler = () => {
    this.props.navigation.pop();
  };

  addPressHandler = async () => {
    await this.getData();
    console.log(this.state.name);
    console.log(this.state.deliveryDate);
    console.log(this.state.location);
    //this.props.navigation.navigate("MiaOrders");
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Text style={styles.phoneText}> Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder=" Name..."
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ name: text })}
          ></TextInput>
          <Text style={styles.phoneText}> Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder=" (xxx)-xxx-xxxx"
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ phone: text })}
          ></TextInput>

          <Text style={styles.phoneText}> Location</Text>
          <DropDownPicker
          
            items={[
              { label: "Miami", value: "Miami" },
              { label: "New Orleans", value: "New Orleans" },
              { label: "Chicago", value: "Chicago" },
            ]}
            
            style={styles.dropDown}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{
              width: "40%",
            }}
            onChangeItem={(item) => this.setState({ location: item.value })}
          ></DropDownPicker>
          {/* <Text style={styles.addressText}> Address</Text>

           <TextInput
            style={styles.addressInput}
            placeholder=" Address..."
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ address: text })}
          ></TextInput>
          <Text style={styles.qtyText}> Quantity</Text>
          <TextInput
            style={styles.qtyInput}
            placeholder=" Quantity..."
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ quantity: text })}
          ></TextInput>

          <Text style={styles.dateText}> Delivery Date</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="Date..."
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ deliveryDate: text })}
          ></TextInput> */}

          <View style={styles.rightView}>
            <Text style={styles.phoneText}> Address</Text>
            <TextInput
              style={styles.textInputNew}
              placeholder=" Address..."
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ address: text })}
            ></TextInput>
            <Text style={styles.phoneText}> Quantity</Text>
            <TextInput
              style={styles.textInputNew}
              placeholder=" Quantity..."
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ quantity: text })}
            ></TextInput>
            <Text style={styles.phoneText}> Delivery Date</Text>
            <TextInput
              style={styles.textInputNew}
              placeholder=" yyyy-mm-dd"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ deliveryDate: text })}
            ></TextInput>
            <TouchableOpacity
              style={{
                width: "10%",
                height: "8%",
                position: "absolute",
                top: 0,
                right: 50,
              }}
            >
              <Image
                style={{ flex: 1 }}
                source={require("../../../CalendarPic.jpg")}
              ></Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cancelOrder}
            onPress={this.pressHandler}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addOrder}
            onPress={this.addPressHandler}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.calStyle}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            scrollable="true"
            previousTitle="Previous"
            nextTitle="Next"
            scaleFactor={800}
          ></CalendarPicker>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addText: {
    color: "black",
    position: "absolute",
    fontSize: 15,
    right: 33,
    top: 12,
  },
  cancelText: {
    color: "black",
    position: "absolute",
    //fontStyle: 15,
    right: 26,
    top: 12,
  },
  calStyle: {
    position: "absolute",
    top: 225,
    right: 100,
    height: "40%",
    width: "40%",
    alignItems: "center",
  },
  phoneText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
  },

  addressText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    right: 200,
  },

  addressInput: {
    height: 40,
    width: "40%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    right: 10,
    top: 35,
  },

  qtyText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    right: 200,
    top: 70,
  },

  qtyInput: {
    height: 40,
    width: "40%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    right: 10,
    top: 105,
  },

  dateText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    position: "absolute",
    right: 200,
    top: 145,
  },

  dateInput: {
    height: 40,
    width: "40%",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    right: 10,
    top: 180,
  },

  rightText: {
    color: "black",
    fontSize: 14,
    paddingTop: 10,
    alignSelf: "flex-end",
  },
  inputView: {
    backgroundColor: "#A9A9A9",
    //justifyContent: "center",
    position: "absolute",
    right: 475,
    top: 225,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    height: "36%",
    width: "40%",

    borderRadius: 10,
  },

  formattedTextInput: {
    height: 40,
    width: "40%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "flex-start",
    //backgroundColor: "white",
    borderRadius: 10,
    top: 3,
  },

  textInput: {
    height: 40,
    width: "40%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    top: 3,
  },

  textInputNew: {
    height: 40,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    top: 3,
  },
  cancelOrder: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 10,
    right: 120,
    width: "15%",
    height: "14%",
    borderRadius: 10,
  },

  addOrder: {
    backgroundColor: "aqua",
    position: "absolute",
    bottom: 10,
    right: 20,
    width: "15%",
    height: "14%",
    borderRadius: 10,
  },
  rightView: {
    backgroundColor: "#A9A9A9",
    alignSelf: "flex-end",
    height: "100%",
    width: "50%",
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 10,
    paddingTop: 4,
  },
  dropDown: {
    backgroundColor: "white",
    width: "40%",
    top: 3,
  },
  calView: {
    backgroundColor: "#A9A9A9",
    //justifyContent: "center",
    position: "absolute",
    right: 50,
    top: 275,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    height: "50%",
    width: "50%",

    borderRadius: 10,
  },
  calButton: {
    height: "12%",
    width: "15%",
    position: "absolute",
    top: 170,
    right: 60,
    //alignSelf: "flex-start",
  },
  calImage: {
    height: "12%",
    width: "15%",
    position: "absolute",
    top: 170,
    right: 60,
  },
});

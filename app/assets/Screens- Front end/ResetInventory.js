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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
//import { black } from "react-native-paper/lib/typescript/src/styles/colors";

export default function NewOrder({ navigation }) {
  const pressHandler = () => {
    navigation.pop();
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
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
        ></DropDownPicker>

        <TouchableOpacity style={styles.cancelOrder} onPress={pressHandler}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addOrder} onPress={pressHandler}>
          <Text style={styles.addText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    right: 30,
    top: 16,
  },
  cancelText: {
    color: "black",
    position: "absolute",
    //fontStyle: 15,
    right: 26,
    top: 16,
  },
  phoneText: {
    color: "black",
    fontSize: 14,
    paddingTop: 3,
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
    right: 450,
    top: 275,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    height: "10%",
    width: "40%",
    borderRadius: 10,
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
    bottom: 15,
    right: 120,
    width: "15%",
    height: "60%",
    borderRadius: 10,
  },

  addOrder: {
    backgroundColor: "aqua",
    position: "absolute",
    bottom: 15,
    right: 20,
    width: "15%",
    height: "60%",
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
});

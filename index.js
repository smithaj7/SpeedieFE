/*
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "react-native";
import { render } from "react-dom";
//import { Table, Row, Rows } from "react-native-table-component";
//import axios from "axios";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app</Text>
      <StatusBar style="auto" />
      <Button
        title="Click Me"
        color="orange"
        onPress={() =>
          Alert.prompt("Warning", "Delete order?", (text) => console.log(text))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("./SpeedieBackground.jpg")}
        ></Image>
        <View style={styles.EmailInputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.PasswordInputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#68A678",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "50%",
    height: "100%",
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  EmailInputView: {
    width: "35%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    position: "absolute",
    top: 300,
    right: 60,
    //marginTop: 60,
    //justifyContent: "center",
    alignItems: "flex-start",

    alignSelf: "flex-end",
    padding: 20,
  },

  PasswordInputView: {
    width: "35%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    position: "absolute",
    top: 375,
    right: 60,
    //marginTop: 60,
    //justifyContent: "center",
    alignItems: "flex-start",

    alignSelf: "flex-end",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
    position: "absolute",
    //alignSelf: "flex-end",
    top: 530,
    right: 60,
  },
  loginBtn: {
    width: "35%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    //alignItems: "center",
    //justifyContent: "center",
    //alignSelf: "flex-end",
    position: "absolute",
    marginTop: 40,
    marginBottom: 10,
    right: 60,
    top: 440,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
});

/*
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: "hey",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:7071/api/HttpTrigger1")
      .then((response) => {
        this.setState({
          Data: response.data.OrderID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    componentDidMount();
    const { Data } = this.state;
    return <Text>{Data}</Text>;
  }
}

//     if (this.state.isLoading) {
//       return (
//         <View style={StyleSheet.container}>
//           <ActivityIndicator />
//         </View>
//       );
//     } else {
//       let orderID = this.state.dataSource.map((val, key) => {
//         return (
//           <View key={key} style={StyleSheet.item}>
//             <Text>val.result</Text>
//           </View>*/

//       // );
//     }

//     return <View style={styles.container}>{movies}</View>;
//   }
// }
// //}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backGroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   item: {
//     flex: 1,
//     alignSelf: "stretch",
//   },
// });*/
/*
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
//import { render } from "react-dom";
import Modal from "react-native-modal";

//export default class App extends React.Component {

//export default class App extends React.Component {
function ModalTest() {
  //render() {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Speedie Bean Associate Portal</Text>
        <TouchableOpacity
          style={styles.touch}
          onPress={toggleModal}
          activeOpacity={0.5}
        >
          <Text style={styles.AddOrderBtn}> Add Order</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hey!</Text>
            <Button title="Hide" onPress={toggleModal}></Button>
          </View>
        </Modal>
      </View>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
      <View style={styles.inputView}>
        <Text style={styles.phoneText}>Phone Number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="(xxx)-xxx-xxxx"
          placeholderTextColor="black"
        ></TextInput>
        <Text style={styles.phoneText}>Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Address..."
          placeholderTextColor="black"
        ></TextInput>
      </View>
    </View>
  );
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
  AddOrderBtn: {
    color: "#093b15",
    textAlign: "center",
    position: "absolute",
    top: 6,
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 10,
  },
});*/

import React from "react";
import Navigator from "./routes/homeStack";
import Home from "./app/assets/Screens- Front end/WelcomeScreen";
//import Next from "./app/assets/Screens/NextScreen";
export default function App() {
  return <Navigator />;
}

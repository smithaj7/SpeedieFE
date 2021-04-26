import React, { Children } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import navigation from "react-navigation";
import DropDownPicker from "react-native-dropdown-picker";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      temporaryPassword: "",
      phoneNumber: "",
      location: "",
      role : "",
      name: "",
      isLoading: true,
      dataSource: [],
      loggedIn: false,
    };

    this._handlePress = this._handlePress.bind(this);
    // this.setRole = this.setRole(this);
    // this.setLocation = this.setLocation(this);
  }

  // componentDidMount() {
  //   this.getData();
  // }

  getData = async () => {
    return await fetch("http://localhost:7071/api/AddEmployee", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.temporaryPassword,
        phone: this.state.phoneNumber,
        location: this.state.location,
        role: this.state.role,
        name: this.state.name
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

  _handlePress = async () => {
      if (this.state.role == "" || this.state.location == "" || 
        this.state.email == "" || this.state.temporaryPassword == ""
        || this.state.phoneNumber == ""){
          alert("Please fill in all fields.")
      }
      else{
        await this.getData();
        // // var li = this.state.dataSource.map((val, key) => {
        // //     return val.ResetStatus;
        // // });
        // // if (li == "invalid email"){
        // //     alert("Invalid email");
        // // }
        // else{
        const { params } = this.props.navigation.state;
        var email = params.email;
        var loc = params.loc;
        var employeeRole = params.role;
        this.props.navigation.navigate("AccountInfo", {user: email, location: loc, role: employeeRole});
        // }
      }
  };

    // setRole = async(item) => {
    //     this.state.role = item;
    // };


    // setLocation = async(item) => {
    //     this.state.location = item;
    // };

  render() {
    return (
      <View style={styles.container}>
        <Image style = {styles.logo} source={require("../../../SpeediePNG.png")}></Image>
        <View style = {styles.banner}>
        </View>
        <Text style={styles.loginHeader}>Create New Employee</Text>
        <View style={styles.NameInputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Employee Full Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ name: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>
        <View style={styles.EmailInputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>
        <View style={styles.PasswordInputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Temporary Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ temporaryPassword: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>

        <View style={styles.phoneNumber}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            onSubmitEditing={this._handlePress}
            maxLength="10"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.dropDownPicker}>
            <DropDownPicker
              items={[
                { label: "Administrator", value: "Administrator" },
                { label: "Delivery Driver", value: "Associate" },
              ]}
              placeholder="Employee Type"
              style={{ 
                backgroundColor: "white", 
                margin: "10px",
              }}
              dropDownStyle={{
              }}
              onChangeItem={(item) => this.setState({role: item.value})}
            ></DropDownPicker>
            <DropDownPicker
              items={[
                { label: "Miami", value: "Miami" },
                { label: "New Orleans", value: "New Orleans" },
                { label: "Chicago", value: "Chicago" },
              ]}
              placeholder="Location"
              style={{ 
                backgroundColor: "white", 
                margin: "10px",
              }}
              dropDownStyle={{
              }}
              onChangeItem={(item) => this.setState({location: item.value})}
            ></DropDownPicker>
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={this._handlePress}>
          <Text style={styles.createText}>Create Employee</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "30%",
    height: "10%",
    position: "relative",
    alignSelf: "flex-start",
    marginTop: "10%"
  },
  
  loginHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    position: "relative",
    alignSelf: "center",
  },
  NameInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "5%",
    alignSelf: "center",
    padding: "10px",
  },
  EmailInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "4%",
    alignSelf: "center",
    padding: "10px",
  },
  PasswordInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "5%",
    position: "relative",
    alignSelf: "center",
    padding: "10px",
  },
  phoneNumber: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "5%",
    position: "relative",
    alignSelf: "center",
    padding: "10px",
  },
  inputText: {
    height: "100%",
    fontSize: 18,
    width: "85%",
    color: "black",
  },
  dropDownPicker: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createBtn: {
    width: "40%%",
    backgroundColor: "#113B08",
    borderRadius: 10,
    height: "6%",
    alignSelf: "center",
    position: "relative",
    marginTop: "18%",
    marginBottom: "2%",
  },
  createText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    right: 0,
    top: "30%",
  },
});

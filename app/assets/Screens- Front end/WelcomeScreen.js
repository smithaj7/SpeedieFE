import React, { Children } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import {navigation, SafeAreaView} from "react-navigation";

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: true,
      dataSource: [],
      loggedIn: false,
    };

    this._handlePress = this._handlePress.bind(this);
    this._handleForgotPress = this._handleForgotPress.bind(this);

    //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  // this.state = {
  //   email: "",
  //   password: "",
  // };

  // pressHandler({ navigation }) {
  //   navigation.push("Next");
  // }

  componentDidMount() {
    // return fetch("http://localhost:7071/api/Login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     this.setState({
    //       isLoading: false,
    //       dataSource: [responseJson],
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.getData();
    //setInterval(this.getData, 30000);
  }

  getData = async () => {
    return await fetch("https://speediebackend.azurewebsites.net/api/Login?", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
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
    const result = await this.getData();
    //var li
    var li = this.state.dataSource.map((val, key) => {
      return val.LoggedIn;
    });

    var location = this.state.dataSource.map((val, key) => {
      return val.Location;
    });

    var employeeRole = this.state.dataSource.map((val, key) => {
      return val.Role;
    });

    var passwordLength = this.state.password.length;

    console.log(li[0]);
    console.log(this.state.email);
    console.log(this.state.password);

    if (li[0] == "Yes") {
      console.log("hey");
      this.setState(
        {
          loggedIn: true,
        },
        () => console.log(this.state.loggedIn)
      );
      if (location == "All") {
        this.props.navigation.navigate("LandingPage", { user: userName, loc: location, role: employeeRole, pLength: passwordLength });
      } else if (location == "Miami") {
        var userName = this.state.email;
        this.props.navigation.navigate("LandingPage", { user: userName, loc: location, role: employeeRole, pLength: passwordLength });
      } else if (location == "New Orleans") {
        this.props.navigation.navigate("LandingPage", { user: userName, loc: location, role: employeeRole, pLength: passwordLength });
      } else if (location == "Chicago") {
        this.props.navigation.navigate("LandingPage", { user: userName, loc: location, role: employeeRole, pLength: passwordLength });
      }
    } else {
      alert("Invalid username or password");
    }
  };

  _handleForgotPress(){
    this.props.navigation.navigate("ForgotPassword");
  }

  render() {
    // var li = [];
    // li = this.state.dataSource.map((val, key) => {
    //   return val.LoggedIn[0];
    // });
    // if (li) {
    //   this.setState({
    //     loggedIn: true,
    //   });
    // }

    return (
      <SafeAreaView style={styles.container}>
        {/* <View style = {styles.banner}>
          <Text style={styles.bannerText}>Speedie Login</Text>
        </View> */}
        <Image style = {styles.logo} source={{uri: 'https://cdn.shopify.com/s/files/1/0418/4483/4468/files/Hoodie_front_logo_with_grid_180x.png?v=1594074354'}}></Image>
        <Text style={styles.loginHeader}>Login to Speedie Bean below:</Text>
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
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>
        <TouchableOpacity style={styles.touchableText} onPress={this._handleForgotPress}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={this._handlePress}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  // },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    // justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  // banner:{
  //   width: "90%",
  //   height: "10%",
  //   //flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   alignSelf: "center",
  //   backgroundColor: "#113B08",

  // },
  // bannerText:{
  //   fontSize: 26,
  //   fontWeight: "bold",
  //   color: "white",
  //   //alignSelf: "flex-start",
  //   //alignItems: "center",
  // },
  logo: {
    width: "60%",
    height: "25%",
    position: "relative",
    alignSelf: "center",
    marginTop: "7%"
  },
  loginHeader: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "black",
    position: "relative",
    // alignSelf: "center",
    left: "7%",
    // paddingTop: 20,
  },
  EmailInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "10%",
    marginTop: "4%",
    alignSelf: "center",
    padding: "5%",
  },
  PasswordInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "10%",
    marginTop: "4%",
    position: "relative",
    alignSelf: "center",
    padding: "5%",
  },
  inputText: {
    height: "90%",
    fontSize: 18,
    width: "85%",
    color: "black",
  },
  forgotText: {
    color: "blue",
    fontSize: 17,
    alignSelf: "center",
  },
  touchableText: {
    backgroundColor: "white",
    height: "5%",
    width: "35%",
    left: "5%",
    position: "relative",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  loginBtn: {
    width: "35%",
    backgroundColor: "#113B08",
    borderRadius: 10,
    height: "8%",
    //left: 20,
    //alignItems: "center",
    //justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    marginTop: "8%",
    marginBottom: "1%",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    top: "35%",
  },
});

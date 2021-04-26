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

export default class LandingPage extends React.Component {
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
    this._handleAccountPress = this._handleAccountPress.bind(this);
    this.ordersPressHandler = this.ordersPressHandler.bind(this);
    this.inventoryPressHandler = this.inventoryPressHandler.bind(this);
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
    return await fetch("http://localhost:7071/api/Login", {
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
        this.props.navigation.navigate("MiaOrders", { user: userName, loc: location, role: employeeRole });
      } else if (location == "Miami") {
        var userName = this.state.email;
        this.props.navigation.navigate("MiaOrders", { user: userName, loc: location, role: employeeRole });
      } else if (location == "New Orleans") {
        this.props.navigation.navigate("MiaOrders", { user: userName, loc: location, role: employeeRole });
      } else if (location == "Chicago") {
        this.props.navigation.navigate("MiaOrders", { user: userName, loc: location, role: employeeRole });
      }
    } else {
      alert("Invalid username or password");
    }
  };

  _handleAccountPress(){
    const { params } = this.props.navigation.state;
    var email = params.user;
    var loc = params.loc;
    var employeeRole = params.role;
    this.props.navigation.navigate("AccountInfo", {user: email, location: loc, role: employeeRole});
  }

  inventoryPressHandler() {
    const { params } = this.props.navigation.state;
    var email = params.user;
    var loc = params.loc;
    var employeeRole = params.role;
    this.props.navigation.navigate("Inventory", {user: email, location: loc, role: employeeRole});
  }

  ordersPressHandler() {
    const { params } = this.props.navigation.state;
    var email = params.user;
    var loc = params.loc;
    var employeeRole = params.role;
    console.log("Email: ",email)
    console.log("Location: ",loc)
    this.props.navigation.navigate("MiaOrders", {user: email, location: loc, role: employeeRole});
  }

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

    var btns;
    if(this.props.navigation.state.params.role == "Associate"){
      btns = <View style = {styles.btnView}>
      <TouchableOpacity style={styles.menuButton} onPress={this.ordersPressHandler}>
          <Text style={styles.buttonText}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={this._handleAccountPress}>
          <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
      </View>
    }
    else{
      btns = <View style = {styles.btnView}>
      <TouchableOpacity style={styles.menuButton} onPress={this.ordersPressHandler}>
          <Text style={styles.buttonText}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={this.inventoryPressHandler}>
          <Text style={styles.buttonText}>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={this._handleAccountPress}>
          <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
      </View>
    }

    return (
      <SafeAreaView style={styles.container}>
        {/* <View style = {styles.banner}>
          <Text style={styles.bannerText}>Speedie Login</Text>
        </View> */}
    
        <Image style = {styles.logo} source={require("../../../Darker Green Logo.png")}></Image>
        {btns}
        
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  // },
  container: {
    backgroundColor: "#C2E2C3",
    //alignItems: "flex-start",
    // justifyContent: "center",
    flex: 1,
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
    height: "35%",
    position: "relative",
    alignSelf: "center",
    marginTop: "7%",
    
  },

  btnView: {
    position: "relative",
    height: "55%",
    width: "100%",
    marginTop: "5%",

  },

  menuButton: {
    position: "relative",
    alignSelf: "center",
    marginTop: "8%",
    backgroundColor: "#113B08",
    alignItems: "center",
    justifyContent: "center",
    height: "25%",
    width: "40%",
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
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
 
});

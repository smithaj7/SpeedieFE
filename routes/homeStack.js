import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
//import Login from "../app/assets/Screens/WelcomeScreen";
import Login from "../app/assets/Screens- Front end/WelcomeScreen";
import LandingPage from "../app/assets/Screens- Front end/LandingPage"
import ForgotPassword from "../app/assets/Screens- Front end/ForgotPassword";
import AllOrders from "../app/assets/Screens- Front end/AllOrders";
import NewOrder from "../app/assets/Screens- Front end/NewOrder";
import Inventory from "../app/assets/Screens- Front end/Inventory";
//import ResetInventory from "../app/assets/Screens- Front end/ResetInventory";
//import AddInventory from "../app/assets/Screens- Front end/AddInventory";
import MiaOrders from "../app/assets/Screens- Front end/MiaOrders";
import NolaOrders from "../app/assets/Screens- Front end/NolaOrders";
import ChiOrders from "../app/assets/Screens- Front end/ChiOrders";
import AccountInfo from "../app/assets/Screens- Front end/AccountInfo"
import CreateUser from "../app/assets/Screens- Front end/CreateUser"

const screens = {

  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
    
  },
  LandingPage: {
    screen: LandingPage,
    navigationOptions: {
      header: null,
    }
    
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null,
    }
    
  },
  AllOrders: {
    screen: AllOrders,
    navigationOptions: {
      header: null,
    }
  },
  MiaOrders: {
    screen: MiaOrders,
    navigationOptions: {
      header: null,
    }
  },
  NolaOrders: {
    screen: NolaOrders,
    navigationOptions: {
      header: null,
    }
  },
  ChiOrders: {
    screen: ChiOrders,
    navigationOptions: {
      header: null,
    }
  },
  NewOrder: {
    screen: NewOrder,
    navigationOptions: {
      header: null,
    }
  },
  MiaNewOrders: {
    screen: MiaOrders,
    navigationOptions: {
      header: null,
    }
  },
  Inventory: {
    screen: Inventory,
    navigationOptions: {
      header: null,
    }
  },

  AccountInfo: {
    screen: AccountInfo,
    navigationOptions: {
      header: null,
    }
  },

  CreateUser: {
    screen: CreateUser,
    navigationOptions: {
      header: null,
    }
  },

  
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

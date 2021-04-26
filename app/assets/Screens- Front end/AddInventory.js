import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
// import {
//   DataTable,
//   Cell,
//   EditableCell,
//   Header,
//   Row,
//   HeaderCell,
// } from "react-native-data-table";

//import { Item } from "react-native-paper/lib/typescript/src/components/List/List";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  //   render() {
  //     return (
  //       <DataTable>
  //         <Header>
  //           <HeaderCell>Name</HeaderCell>
  //         </Header>
  //       </DataTable>
  //     );
  //   }
  // }

  render() {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  orderIDHeader: {
    position: "absolute",
    left: 10,
  },

  phoneHeader: {
    position: "absolute",
    left: 753,
  },
});

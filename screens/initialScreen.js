import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  StyleSheet
} from "react-native";

export default class InitialScreen extends Component {
  componentDidMount = () => {
    AsyncStorage.getItem("expenses-app-user-token")
      .then(token => {
        if (token) {
          // go to home
          this.props.navigation.navigate("Home");
        } else {
          // go to auth
          this.props.navigation.navigate("Signin");
        }
      })
      .catch(e => {
        // go to auth
        this.props.navigation.navigate("Signin");
      });
  };

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

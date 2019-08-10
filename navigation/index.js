import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import React from "react";
import { Button, AsyncStorage } from "react-native";

import HomeScreen from "../screens/homeScreen";
import InitialScreen from "../screens/initialScreen";
import SignInScreen from "../screens/signInScreen";
import SignUpScreen from "../screens/signUpScreen";
import AddCategoryScreen from "../screens/addCategoryScreen";
import AddTransactionScreen from "../screens/addTransactionScreen";

const _defaultHeaderStyle = {
  title: "Home",
  headerStyle: {
    height: 60,
    backgroundColor: "#29323C"
  },
  headerTintColor: "#ddd",
  headerTitleStyle: {},
  headerTransparent: true
};

const AppScreensStack = createStackNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    Home: {
      screen: HomeScreen,
      headerBackTitleVisible: false,
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: " ",
        ..._defaultHeaderStyle,
        headerLeft: (
          <Button
            onPress={e => {
              AsyncStorage.setItem("expenses-app-user-token", "")
                .then(isTrue => {
                  // set token
                  navigation.navigate("Signin");
                })
                .catch(error => {
                  alert("Error");
                });
            }}
            title="Signout"
            color="#fff"
          />
        ),
        headerRight: (
          <Button
            onPress={e => navigation.navigate("AddCategory")}
            title="+ Cat"
            color="#fff"
          />
        )
      })
    },
    AddCategory: {
      screen: AddCategoryScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: " ",
        ..._defaultHeaderStyle,
        title: "Add Category",
        headerRight: (
          <Button
            onPress={e => navigation.navigate("AddTransaction")}
            title="+ transaction"
            color="#fff"
          />
        )
      })
    },
    AddTransaction: {
      screen: AddTransactionScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: " ",
        ..._defaultHeaderStyle,
        title: "Add Transaction"
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: AppScreensStack,
      Initial: InitialScreen,
      Signin: SignInScreen,
      Signup: SignUpScreen
    },
    {
      initialRouteName: "Initial"
    }
  )
);

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import React from "react";
import { Button } from "react-native";

import HomeScreen from "../screens/homeScreen";
import InitialScreen from "../screens/initialScreen";
import SignInScreen from "../screens/signInScreen";
import SignUpScreen from "../screens/signUpScreen";
import AddCategoryScreen from "../screens/addCategoryScreen";

const _defaultHeaderStyle = {
  title: "Home",
  headerStyle: {
    height: 40,
    backgroundColor: "#29323C"
  },
  headerTintColor: "#ddd",
  headerTitleStyle: {}
};

const AppScreensStack = createStackNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        ..._defaultHeaderStyle,
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
        ..._defaultHeaderStyle,
        title: "Add Category"
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

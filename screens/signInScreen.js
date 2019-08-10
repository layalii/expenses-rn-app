import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
import axios from "axios";

export default props => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  _signInForm = () => {
    if (!email || !password) {
      alert("fill all inputs!");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://172.20.10.2:8000/api/auth/signin", {
        email,
        password
      })
      .then(resp => {
        const _data = resp.data;
        if (_data.action && _data.data && _data.data.token) {
          const token = _data.data.token;
          AsyncStorage.setItem("expenses-app-user-token", token)
            .then(isTrue => {
              // set token
              props.navigation.navigate("Home");
            })
            .catch(error => {
              alert("Error");
            });
        } else {
          setPassword("");
          setIsLoading(false);
        }
      })
      .catch(error => {
        setPassword("");
        setIsLoading(false);
        alert("Something went wrong, please try again!");
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Login</Text>
        <View style={styles.welcomeContainer}>
          <TextInput
            style={styles.input}
            editable={true}
            autoCompleteType="email"
            placeholder="Email"
            onChangeText={email => setEmail(email)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            value={password}
          />
        </View>

        <Button
          disabled={isLoading}
          title={isLoading ? "Loading .." : "Sign in"}
          onPress={_signInForm}
        />
      </View>
      <View
        style={{
          marginTop: 24,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Text style={{ color: "white" }}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={e => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text style={{ color: "white" }}>SignUp!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29323C",
    position: "relative",
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "center"
  },
  wrapper: {
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    padding: 20
  },
  title: {
    fontWeight: "bold",
    marginVertical: 20,
    fontSize: 24,
    alignSelf: "center"
  },
  input: {
    height: 40,
    marginBottom: 20,
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    color: "gray"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  spacing: {
    marginBottom: 10
  }
});

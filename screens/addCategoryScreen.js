import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  Modal,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import * as EP from "../_endpoints";
import store from "../_store";

const DEFAULT_STATE = {
  title: "",
  description: "",
  style: {
    txt: "",
    bg: ""
  }
};

const COLORS = [
  { id: 1, bg: "green", txt: "white" },
  { id: 2, bg: "teal", txt: "white" },
  { id: 3, bg: "orange", txt: "white" },
  { id: 4, bg: "blue", txt: "white" },
  { id: 5, bg: "pink", txt: "white" },
  { id: 6, bg: "yellow", txt: "grey" },
  { id: 7, bg: "maroon", txt: "white" },
  { id: 9, bg: "grey", txt: "black" },
  { id: 10, bg: "purple", txt: "white" }
];

const AddCategoryScreen = () => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  _addCategory = () => {
    const { title, style, description } = state;
    if (!title || !style) {
      alert("please fill all the blanks");
    }
    setIsLoading(true);
    axios
      .post(
        EP.categories(),
        {
          title,
          description,
          style
        },
        {
          headers: { Authorization: `Bearer ${store.getState().token}` }
        }
      )
      .then(resp => {
        if (resp && resp.data) {
          const _data = resp.data;
          if (_data.action && _data.data) {
            store.dispatch({
              type: "ADD_CATEGORY",
              newCategory: _data.data
            });
            setIsLoading(false);
            navigation.navigate("Home");
          } else {
            alert("Something Went Wrong");
          }
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch(err => {
        alert(err);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScreenLoading isLoading={isLoading} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={title => {
            setState({ ...state, title });
          }}
        />
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={description => {
            setState({ ...state, description });
          }}
        />
        <Text style={styles.title}>Color</Text>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            setIsModalVisible(true);
          }}
          style={styles.touchable}
        >
          <Text>Choose color</Text>
        </TouchableHighlight>
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              marginTop: 180,
              marginHorizontal: 20,
              flexWrap: "wrap",
              shadowOpacity: 0.2,
              borderRadius: 4,
              shadowOffset: {
                width: 8,
                height: 8
              }
            }}
          >
            <Text
              style={{
                color: "#29323C",
                alignSelf: "flex-end",
                fontWeight: "bold"
              }}
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              CLOSE
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              {COLORS.map((item, i) => {
                return (
                  <TouchableHighlight
                    key={i}
                    underlayColor="transparent"
                    onPress={() => {
                      setState({
                        ...state,
                        style: {
                          txt: item.txt,
                          bg: item.bg
                        }
                      });
                      setIsModalVisible(false);
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: `${item.bg}`,
                        marginRight: 15,
                        marginBottom: 15,
                        borderRadius: 4,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ color: `${item.txt}` }}>{item.bg}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>
          </View>
        </Modal>
      </View>
      <TouchableHighlight
        underlayColor="transparent"
        style={{
          backgroundColor: "#0D03D7",
          paddingVertical: 20,
          alignItems: "center",
          borderRadius: 4,
          marginVertical: 20
        }}
        onPress={() => {
          _addCategory();
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          ADD NEW CATEGORY
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FC",
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 100
  },
  title: {
    marginVertical: 15,
    fontSize: 16,
    color: "gray"
  },
  input: {
    height: 40,
    marginBottom: 20,
    width: "100%",
    borderBottomColor: "#979797",
    borderBottomWidth: 0.4,
    color: "gray"
  },
  touchable: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 4,
    marginVertical: 20
  }
});

export const ScreenLoading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,.2)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { ScreenLoading } from "./addCategoryScreen";
import axios from "axios";
import * as EP from "../_endpoints";

const DEFAULT_STATE = {
  title: "",
  description: "",
  amount: "",
  date: "",
  category: ""
};

const AddTransactionScreen = ({ categories, dispatch, navigation, token }) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(DEFAULT_STATE);

  _addTransaction = () => {
    const { title, description, amount, date, category } = state;
    if (!title || !amount || !date || !category) {
      alert("please fill all the blanks");
    }
    setIsLoading(true);
    axios
      .post(
        EP.transactions(),
        {
          title,
          description,
          amount,
          date,
          category
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(resp => {
        if (resp && resp.data) {
          const _data = resp.data;
          if (_data.action && _data.data) {
            dispatch({
              type: "ADD_TRANSACTION",
              newTransa: _data.data
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
    <ScrollView style={styles.container}>
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
        <Text style={styles.title}>Amount</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={amount => {
            setState({ ...state, amount });
          }}
        />
        <Text style={styles.title}>Date</Text>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            setPickerVisible(true);
          }}
          style={styles.touchable}
        >
          <Text>
            {state.date ? state.date.toLocaleDateString() : "Choose Date"}
          </Text>
        </TouchableHighlight>
        <DateTimePicker
          isVisible={pickerVisible}
          onConfirm={date => {
            setState({ ...state, date });
            setPickerVisible(false);
          }}
          onCancel={() => {
            setPickerVisible(false);
          }}
        />
        <Text style={styles.title}>Category</Text>
        <RNPickerSelect
          onValueChange={category => {
            setState({ ...state, category });
          }}
          value={state.category}
          style={{
            inputIOS: {
              backgroundColor: "white",
              padding: 20,
              borderRadius: 4,
              marginBottom: 20,
              color: "black"
            }
          }}
          items={categories.map(cat => {
            return {
              label: cat.title,
              value: cat._id
            };
          })}
        />
        <TouchableHighlight
          underlayColor="transparent"
          style={{
            backgroundColor: "#0D03D7",
            paddingVertical: 20,
            alignItems: "center",
            borderRadius: 4,
            marginVertical: 20,
            marginBottom: 120
          }}
          onPress={() => {
            _addTransaction();
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            ADD NEW TRANSACTION
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    token: state.token
  };
};

export default connect(mapStateToProps)(AddTransactionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FC",
    position: "relative",
    paddingVertical: 100
  },
  formContainer: {
    paddingHorizontal: 20
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
    marginBottom: 20
  }
});

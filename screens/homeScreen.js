import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import * as EP from "../_endpoints";

const HomeSreen = ({ dispatch, data, token, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransa, setSelectedTransa] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const transactionsPromise = axios.get(EP.transactions(), { ...headers });
    const categoriesPromise = axios.get(EP.categories(), { ...headers });
    Promise.all([transactionsPromise, categoriesPromise])
      .then(responses => {
        const datas = responses.map(resp => {
          const _data = resp.data;
          if (_data.action && _data.data) {
            return _data.data;
          } else {
            return [];
          }
        });
        dispatch({
          type: "SET_TRANSACTIONS",
          transactions: datas[0]
        });
        dispatch({
          type: "SET_CATEGORIES",
          categories: datas[1]
        });
      })
      .catch(error => {
        alert("Something went wrong!");
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  _deleteTransa = id => {
    axios
      .delete(EP.deleteTransaction(id), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => {
        if (resp && resp.data && resp.data.action) {
          dispatch({
            type: "DELETE_TRANSACTION",
            transaToDelete: id
          });
        }
      })
      .catch(err => {
        alert("something went wrong");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.title}>Salary account</Text>
        <Text style={styles.BalanceText}>$ 665</Text>
      </View>
      {isLoading && (
        <Text
          style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
        >
          Loading ..
        </Text>
      )}
      {!isLoading && (
        <View style={styles.wrapperBottom}>
          <Text style={styles.smallTitle}>Last transactions</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <TransactionItem
                item={item}
                setCurrentTransa={setSelectedTransa}
                setIsModalVisible={setIsModalVisible}
              />
            )}
          />
          <TouchableHighlight
            style={styles.touchable}
            underlayColor="transparent"
            onPress={e => {
              navigation.navigate("AddTransaction");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              ADD TRANSACTION
            </Text>
          </TouchableHighlight>
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
                  shadowOpacity: 0.2,
                  borderRadius: 4,
                  shadowOffset: {
                    width: 8,
                    height: 8
                  }
                }}
              >
                <View style={styles.wrapper}>
                  <Text style={{ color: "#767676" }}>
                    {selectedTransa.title}
                  </Text>
                  <Text
                    onPress={() => {
                      setIsModalVisible(false);
                    }}
                    style={{ fontWeight: "bold" }}
                  >
                    close
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={{ color: "#767676" }}>
                    {selectedTransa.description}
                  </Text>
                  <Text>
                    {new Date(selectedTransa.date).toLocaleDateString()}
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", color: "red", fontSize: 24 }}
                  >
                    - {selectedTransa.amount}
                  </Text>
                </View>

                <Text>{selectedTransa.category}</Text>
                <Text
                  style={{ color: "red", fontWeight: "bold" }}
                  onPress={() => {
                    _deleteTransa(selectedTransa._id);
                    setIsModalVisible(false);
                  }}
                >
                  Delete
                </Text>

                {/* {state.selectedTransa.categories.map(ele => {
                  return <Text>{categories[ele].title}</Text>;
                })} */}
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
};

export default connect(
  state => {
    return {
      categories: state.categories,
      data: state.transactions,
      token: state.token
    };
  },
  null
)(HomeSreen);

const TransactionItem = ({ item, setCurrentTransa, setIsModalVisible }) => {
  const _dateInstance = new Date(item.date);
  const newDate = _dateInstance.toLocaleDateString();
  return (
    <TouchableOpacity
      style={styles.transaWrapper}
      onPress={() => {
        setCurrentTransa(item);
        setIsModalVisible(true);
      }}
    >
      <View style={styles.leftView}>
        <Text style={{ color: "#353A41", marginBottom: 10 }}>{item.title}</Text>
        <Text style={{ color: "#9FA7B3" }}>{newDate}</Text>
      </View>
      <Text
        style={{ alignSelf: "center", color: "#EE5A55", fontWeight: "bold" }}
      >
        - {item.amount}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29323C",
    position: "relative",
    marginTop: 60
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  wrapperTop: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 60
  },
  wrapperBottom: {
    flex: 1,
    backgroundColor: "#F6F9FC",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20
  },
  smallTitle: {
    color: "#9FA7B3",
    fontSize: 16,
    marginBottom: 24
  },
  BalanceText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  },
  transaWrapper: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  touchable: {
    backgroundColor: "#0D03D7",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 4
  }
});

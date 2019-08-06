import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, List } from "react-native";

const DATA = Array.from({ length: 30 }, (item, i) => ({
  id: `id_${i}`,
  created_at: new Date(),
  updated_at: new Date(),
  title: "H&M",
  description: "some beautiful description",
  amount: `$${++i}.99`,
  date: new Date(),
  categories: ["tag1"],
  type: "clothes"
}));

const AddCategoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add Category</Text>
    </View>
  );
};

export default AddCategoryScreen;

const TransactionItem = ({ item }) => {
  const _d = item.date;
  const newDate = _d.getDay() + "-" + _d.getMonth() + "-" + _d.getFullYear();
  return (
    <View style={styles.transaWrapper}>
      <View style={styles.leftView}>
        <Text style={{ color: "#353A41", marginBottom: 10 }}>{item.title}</Text>
        <Text style={{ color: "#9FA7B3" }}>{newDate}</Text>
      </View>
      <Text
        style={{ alignSelf: "center", color: "#EE5A55", fontWeight: "bold" }}
      >
        - {item.amount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29323C",
    position: "relative"
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
  }
});

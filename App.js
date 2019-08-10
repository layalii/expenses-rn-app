import React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import Navigator from "./navigation";
import { Provider } from "react-redux";
import store from "./_store";

export default () => (
  <Provider store={store}>
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <Navigator />
    </View>
  </Provider>
);

// const X = () => {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (false && !isLoadingComplete && !props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         // startAsync={loadResourcesAsync}
//         // onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//         <Navigator />
//       </View>
//     );
//   }
// };

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

import React, { useState } from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import Navigator from "./navigation";
// import { AppLoading } from "expo";

export default () => (
  <View style={styles.container}>
    {Platform.OS === "ios" && <StatusBar barStyle="default" />}
    <Navigator />
  </View>
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

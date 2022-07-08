import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default {
  //Will store the data in local storage
  storeUserData: async (value: any) => {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem("UserData", jsonValue);
  },
  //Will fetch the data from local storage
  getUserData: async () => {
    const jsonValue = await AsyncStorage.getItem("UserData");
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  },
  //Check if user exist or not
  isUser: async () => {
    const jsonValue = await AsyncStorage.getItem("UserData");
    if (jsonValue) {
      return true;
    } else {
      return false;
    }
  },
  //Show the toast message on the top
  showToast: (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
    });
  },
  storeIntroOpened: async () => {
    return await AsyncStorage.setItem("IntroOpened", "yes");
  },
  isIntoOpened: async () => {
    const isOpen = await AsyncStorage.getItem("IntroOpened");
    if (isOpen) {
      return true;
    } else {
      false;
    }
  },
};

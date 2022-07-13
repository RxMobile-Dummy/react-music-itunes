import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import styles from "./styles";
import { Props } from "./ISignIn";
import CutomButton from "../../components/button/CutomButton";
import { TextInputField } from "../../components/text_input/TextInputField";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";

import { getFirestore, getDoc, doc } from "firebase/firestore";
import { String } from "../../constants/String";
import Utils from "../../utils/Utils";
import Toast, { ErrorToast } from "react-native-toast-message";
import { Images } from "../../../assets/images";
import Header from "../../components/Header/Header";

//Sign In Screen, Which called from Intro and Sign Up Screen

const auth = getAuth();

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  //Will navigate to sign up screen on Sing Up press
  const clickOnRegister = () => {
    navigation.navigate("SignUp");
  };

  //Valiudate the input filed
  const validateInput = async (values: any) => {
    try {
      await validationSchema.validate(values);
      return true;
    } catch (err: any) {
      console.log(err.errors);
      Utils.showToast(err.errors[0]);
      return false;
    }
  };

  const toastConfig = {
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 13,
        }}
        text1NumberOfLines={3}
      />
    ),
  };

  //Handle the sign in after validating the input will get the success response
  const handleSignIn = async (values: any) => {
    const isValid = await validateInput(values);
    if (isValid) {
      setLoading(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user email :", user.email);
          console.log("user id :", user.uid);
          getUserDetails(user);
        })
        .catch((error) => {
          setLoading(false);
          var errorMessage = error.message;
          let message = String.SomethingWentWrong;
          if (errorMessage === "Firebase: Error (auth/wrong-password).") {
            message = String.IncorrectPassword;
          } else if (
            errorMessage === "Firebase: Error (auth/user-not-found)."
          ) {
            message = String.UserNotFound;
          }
          console.log(errorMessage);
          alert(message);
        });
    }
  };

  //After sign inwill get the user details from firestore
  async function getUserDetails(user: any) {
    try {
      const firestore = getFirestore();
      const userDetails = await getDoc(doc(firestore, "users", user.uid));
      console.log(
        "userDetails : ",
        JSON.stringify(userDetails._document.data.value.mapValue)
      );
      const userData = {
        firstName:
          userDetails._document.data.value.mapValue.fields.firstName
            .stringValue,
        lastName:
          userDetails._document.data.value.mapValue.fields.lastName.stringValue,
        email: user.email,
        userId: user.uid,
      };
      console.log("userData : ", userData);
      await Utils.storeUserData(userData);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(`There is something wrong!!!! ${error}`);
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  //Input validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(String.ErrorPassword)
      .min(6, String.ErrorMinPassword)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        String.InvalidPassword
      ),
    email: Yup.string().required(String.ErrorEmail).email(String.InvalidEmail),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title={String.SignIn} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Animated.View
              style={{
                opacity: fadeAnim,
              }}
            >
              <Image
                source={Images.appIcon}
                style={[styles.logo]}
                resizeMode={"contain"}
              />
            </Animated.View>
            <View style={{}}>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                  console.log(values);
                  handleSignIn(values);
                }}
                // validationSchema={validationSchema}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.formStyle}>
                    <TextInputField
                      onTextChange={handleChange("email")}
                      placeholder="Email"
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <TextInputField
                      onTextChange={handleChange("password")}
                      placeholder="Password"
                      onBlur={handleBlur("password")}
                      value={values.password}
                      isSecure={true}
                    />
                    <CutomButton
                      containerStyle={styles.btn}
                      onPress={handleSubmit}
                      text="Sign In"
                      disabled={isLoading}
                      showLoader={isLoading}
                    />
                  </View>
                )}
              </Formik>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.bottomText}>{String.DontHaveAccoount}</Text>
              <TouchableOpacity onPress={clickOnRegister}>
                <Text style={styles.regBtn}>{String.SignUp}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};
export default SignInScreen;

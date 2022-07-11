import { initializeApp } from "firebase/app";
import "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import styles from "./styles";
import { Props } from "./ISignUp";
import CutomButton from "../../components/button/CutomButton";
import { TextInputField } from "../../components/text_input/TextInputField";

import { Formik } from "formik";
import * as Yup from "yup";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";

import { getFirestore, setDoc, doc } from "firebase/firestore";
import Toast, { ErrorToast } from "react-native-toast-message";

import { String } from "../../constants/String";
import utils from "../../utils/Utils";
import Header from "../../components/Header/Header";
import { Images } from "../../../assets/images";

//Sign up screen, Which called from sign in screen,

const auth = getAuth();

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  //Will navigate to sign in screen on sign in Button press
  const onPressSignIn = () => {
    navigation.goBack();
  };

  //Validate the input field on submit press
  const validateInput = async (values: any) => {
    try {
      await validationSchema.validate(values);
      return true;
    } catch (err: any) {
      console.log(err.errors);
      utils.showToast(err.errors[0]);
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

  //Hanndle the sign up, If email is not used the will got success response
  const handleSignUp = async (values: any) => {
    const isValid = await validateInput(values);
    if (isValid) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user email :", user.email);
          console.log("user email :", user.uid);
          storeUserDetails(values, user);
        })
        .catch((error) => {
          console.log("error :", error);
          var errorMessage = error.message;
          let message = String.SomethingWentWrong;
          if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            message = String.EmailExist;
          }
          setLoading(false);
          alert(message);
        });
    }
  };

  //Will store the user details in firestore after success sign up
  async function storeUserDetails(values: any, user: any) {
    try {
      const firestore = getFirestore();
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: user.email,
        userId: user.uid,
      });
      await utils.storeUserData(values);
      setLoading(false);
      navigation.navigate("Home");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      alert(`There is something wrong!!!! ${err}`);
    }
  }

  //Input filed validation schema
  const validationSchema = Yup.object().shape({
    confirmPassword: Yup.string()
      .required(String.ErrorConfirmPassword)
      .oneOf([Yup.ref("password"), null], String.ErrorPasswordMatch),
    password: Yup.string()
      .required(String.ErrorPassword)
      .min(6, String.ErrorMinPassword)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        String.InvalidPassword
      ),
    email: Yup.string().required(String.ErrorEmail).email(String.InvalidEmail),
    lastName: Yup.string().required(String.ErrorLastName),
    firstName: Yup.string().required(String.ErrorFirstName),
  });

  // Initial value on screen render
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={String.SignUp} backButton={true} onPress={onPressSignIn} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
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
              <Formik
                initialValues={initialValue}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                  console.log(values);
                  handleSignUp(values);
                }}
                // validationSchema={validationSchema}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.formStyle}>
                    <TextInputField
                      placeholder="First Name"
                      onTextChange={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />
                    <TextInputField
                      onTextChange={handleChange("lastName")}
                      placeholder="Last Name"
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
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
                    <TextInputField
                      placeholder="Confirm Password"
                      onTextChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      isSecure={true}
                    />
                    <CutomButton
                      containerStyle={{ alignSelf: "center" }}
                      onPress={handleSubmit}
                      text="Register"
                      disabled={isLoading}
                      showLoader={isLoading}
                    />
                  </View>
                )}
              </Formik>
              <View style={styles.bottomView}>
                <Text style={styles.bottomText}>
                  {String.AlreadyRegistered}
                </Text>
                <TouchableOpacity onPress={onPressSignIn}>
                  <Text style={styles.signInBtn}>{String.SignIn}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};
export default SignUpScreen;

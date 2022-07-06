import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Animated
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';
import { Props } from './IHome';


const HomeScreen: React.FC<Props> = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
};
export default HomeScreen;

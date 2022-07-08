import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Animated,
  StatusBar
} from 'react-native';
import styles from './styles';
import { Props } from './IHome';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Music from '../Music';
import Settings from '../settings'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../../constants/Color';
import { String } from '../../constants/String';
import Podcast from '../Podcast';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const ThemeScreen = () => {
    const ref = useRef<any>(null);
    const [type, setType] = useState(String.Down);

    const animatedButtonScale = new Animated.Value(1);

    // When button is pressed in, animate the scale to 1.5
    const onPressIn = () => {
      Animated.spring(animatedButtonScale, {
        toValue: 1.5,
        useNativeDriver: true,
      }).start();
    };

    // When button is pressed out, animate the scale back to 1
    const onPressOut = () => {
      Animated.spring(animatedButtonScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const onClickButton = () => {
      if (type === String.Up) {
        setType(String.Down);
      } else {
        setType(String.Up);
      }
    };

    // Will render bototm tab icon

    const _renderIcon = (routeName: string, selectedTab: string) => {
      let icon = '';

      switch (routeName) {
        case '1':
          icon = 'md-musical-notes-outline';
          break;
        case '2':
          icon = 'md-radio-outline';
          break;
      }

      return (

        <Ionicons
          name={icon}
          size={26}
          color={routeName === selectedTab ? type === String.Down ? Colors.slide2Color : Colors.white : Colors.white}
        />
      );
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <CurvedBottomBar.Navigator
          ref={ref}
          type={type}
          height={60}
          circleWidth={55}
          bgColor={Colors.primary}
          borderTopLeftRight={true}
          strokeWidth={4}
          initialRouteName="0"
          renderCircle={() => (
            <TouchableOpacity
              style={[type === String.Down ? styles.btnCircle : styles.btnCircleUp]}
              onPress={() => onClickButton()}
            >
              <Ionicons name="settings-outline" size={26} color={type === String.Down ? Colors.white : Colors.primary} />
            </TouchableOpacity>
          )}
          tabBar={({ routeName, selectedTab, navigate }) => {
            return (
              <Animated.View style={routeName === selectedTab ? {
                transform: [{ scale: animatedButtonScale }]
              } : {}}>
                <TouchableWithoutFeedback
                  onPressIn={routeName === selectedTab ? onPressIn : () => { }}
                  onPressOut={routeName === selectedTab ? onPressOut : () => { }}
                  onPress={() => { navigate(routeName), setType(String.Down) }}
                  style={styles.centerBtn}
                >
                  {_renderIcon(routeName, selectedTab)}
                </TouchableWithoutFeedback>
              </Animated.View>
            );
          }}
        >
          <CurvedBottomBar.Screen
            options={{
              headerShown: false
            }}
            name="1"
            position={String.Left}
            component={() => (
              type === String.Down ?
                <Music navigation={navigation} /> :
                <Settings navigation={navigation} />
            )}
          />

          <CurvedBottomBar.Screen
            options={{
              headerShown: false
            }}
            name="2"
            component={() => (
              type === String.Down ?
                <Podcast navigation={navigation} /> :
                <Settings navigation={navigation} />
            )}
            position={String.Right}
          />
        </CurvedBottomBar.Navigator>
      </View >
    );
  };



  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer independent={true} >
        <ThemeScreen />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default HomeScreen;

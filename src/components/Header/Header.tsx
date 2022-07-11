import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

interface Props {
  title: string;
  onPress: any;
  backButton: boolean;
}
const Header: React.FC<Props> = ({ title, onPress, backButton }) => {
  return (
    <View style={styles.header}>
      {backButton ? <TouchableOpacity onPress={onPress} style={styles.backBtn}>
        <MaterialIcons name="arrow-back-ios" size={20} color={Colors.slide2Color} />
      </TouchableOpacity> : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>{_.truncate(
          title, {
          'length': 22
        })}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignSelf: 'center',
    width: "100%",
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.slide2Color
  },
  backBtn: {
    marginLeft: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Header;

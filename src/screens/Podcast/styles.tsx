import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constants/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  searchVw: {
    flexDirection: 'row',
    height: hp('5%'),
    borderRadius: 30,
    borderColor: Colors.slide2Color,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    width: wp('90%'),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Platform.OS === "ios" ? 10 : 40,
    paddingLeft: 20,
    paddingRight: 10,
  },
  srchInput: {
    width: "93%",
    color: Colors.white
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatVw: {
    paddingTop: 15,
    flex: 1,
    width: "90%",
    alignSelf: 'center'
  },
  flatCardVw: {
    borderColor: Colors.slide3Color,
    borderWidth: 3,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: Colors.black,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: Colors.slide2Color,
    overflow: 'hidden',
    width: "45%",
    borderRadius: 20,
    margin: 8
  },
  musicImage: {
    height: 125,
    width: "100%"
  },
  nameTxt: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 5,
    fontSize: hp('2.2%'),
    fontWeight: '600',
    color: Colors.black

  },
  detailTxt: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 15,
    fontSize: hp('1.5%'),
    color: Colors.primary
  },
  homeImage: {
    height: 100,
    width: 100,
    tintColor: Colors.grey
  },
  noDataVw: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDataTxt: {
    marginTop: 20,
    fontSize: hp('2%'),
    color: Colors.grey,
    padding: 10,
    textAlign: 'center'
  }
});
export default styles;

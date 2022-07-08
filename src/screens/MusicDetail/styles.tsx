import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from '../../constants/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  musicImage: {
    width: "100%",
    height: 350
  },
  mainBottomVw: {
    minHeight: '100%',
    backgroundColor: Colors.primary,
    width: "100%",
    borderTopRightRadius: 50,
    zIndex: 100,
    bottom: 40,
    borderColor: Colors.slide3Color,
    borderTopWidth: 3,
    borderRightWidth: 3,
    paddingBottom: 40,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: Colors.primary,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  backBtn: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    marginTop: Platform.OS === 'ios' ? 20 : 40,
    marginLeft: 10,
    paddingLeft: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rgbVw: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 8,
    borderRadius: 5
  },
  txtVw: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingLeft: 8
  },
  artstTxt: {
    color: Colors.white,
    fontSize: hp('3%'),
    fontWeight: 'bold'
  },
  collectionTxt: {
    color: Colors.white,
    marginBottom: 5,
    fontSize: hp('1.5%'),
  },
  mainTabVw: {
    margin: 10,
    flexDirection: 'row',
    padding: 10,
    marginTop: 40,
    borderBottomColor: Colors.slide2Color,
    borderBottomWidth: 1
  },
  dwnldBtn: {
    backgroundColor: Colors.slide3Color,
    paddingLeft: 5,
    height: 70,
    width: 70,
    top: -35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 55,
    borderRadius: 80
  },
  tabVw: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitleTxt: {
    color: Colors.white,
    fontWeight: '700',
    marginTop: 5,
    fontSize: hp('2%')
  },
  tabDetailTxt: {
    color: Colors.white,
    fontSize: hp('1.7%')
  },
  albumTxt: {
    color: Colors.slide2Color,
    fontWeight: '700',
    marginTop: 5,
    fontSize: hp('2%'),
    marginLeft: 15
  },
  artImg: {
    height: Dimensions.get("screen").width / 3,
    width: Dimensions.get("screen").width / 3,
    borderRadius: 10,
    alignSelf: 'center'
  },
  mainCardView: {
    flexDirection: 'row',
    backgroundColor: Colors.slide2Color,
    overflow: 'hidden',
    borderRadius: 10,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: Colors.slide2Color,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardTxtVw: {
    padding: 15,
    width: "64%"
  },
  cardTitleTxt: {
    color: Colors.primary,
    fontSize: hp('2%'),
    fontWeight: 'bold'
  },
  yrTxt: {
    color: Colors.primary,
    marginTop: 5,
    fontSize: hp('1.5%'),
  }
});

export default styles;

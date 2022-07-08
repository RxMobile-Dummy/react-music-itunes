import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Color";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.primary,
        flex: 1
    },
    container: {
        flex: 1
    },
    mainListVw: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: Colors.slide3Color,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listTxt: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600'
    }
});
export default styles;

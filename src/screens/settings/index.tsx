import { View, SafeAreaView, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "../../constants/Color";
import Header from "../../components/Header/Header";
import { String } from "../../constants/String";

interface Props {
    navigation?: any;
}

const Settings: React.FC<Props> = ({ navigation }) => {
    const DATA = [
        {
            id: 1,
            title: 'LOGOUT',
            iconName: "logout"
        }
    ];

    // will render settings pages view

    const renderItem = ({ item }) => (
        <View style={styles.mainListVw}>
            <Text style={styles.listTxt}>{item.title}</Text>
            <TouchableOpacity onPress={logOutAlert} >
                <AntDesign name={item.iconName} color={Colors.white} size={26} />
            </TouchableOpacity>
        </View>
    );

    // Will display warning alert when logout button pressed

    const logOutAlert = () =>
        Alert.alert(
            String.LogOut,
            String.LogOutText,
            [
                {
                    text: String.Cancel,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: String.Ok, onPress: () => console.log("OK Pressed") }
            ]
        );


    return (
        <SafeAreaView style={styles.mainContainer}>

            <Header title={String.Setting} />
            <View style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default Settings;

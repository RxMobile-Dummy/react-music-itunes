import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles";
import { Props } from "./IPodCast";
import { Colors } from "../../constants/Color";
import { String } from "../../constants/String";
import { MaterialIcons } from "@expo/vector-icons";
import { Images } from "../../../assets/images";
import { ApplicationState, onDataPodCast } from "../../redux";
import _ from "lodash";
import moment from "moment";

const Podcast: React.FC<Props> = ({ navigation }) => {
  const [srchTxt, setSrchTxt] = useState("");
  const [podCastData, setPodCastData] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  const { data, error } = useSelector(
    (state: ApplicationState) => state.podcastReducer
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    setPodCastData(data);
  }, [data]);

  // To render list card data

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}} style={styles.flatCardVw}>
      <Image
        style={styles.musicImage}
        source={{
          uri: item.artworkUrl160,
        }}
      />
      <Text style={styles.nameTxt}>{item.collectionName}</Text>
      <Text style={styles.detailTxt}>
        {moment(item.releaseDate).format("YYYY")}
      </Text>
    </TouchableOpacity>
  );

  // To render search bar

  function _searchBar() {
    return (
      <View style={styles.searchVw}>
        <TextInput
          placeholder={String.Search}
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          value={srchTxt}
          onChangeText={(text) => _setSearchData(text)}
          style={styles.srchInput}
        />
        <TouchableOpacity
          onPress={() => setSrchTxt("")}
          style={styles.closeBtn}
        >
          <MaterialIcons name="close" size={20} color={Colors.slide2Color} />
        </TouchableOpacity>
      </View>
    );
  }

  // Get data using search text

  function _setSearchData(text) {
    setSrchTxt(text);
    dispatch(onDataPodCast(text));
  }

  // When data will be empty, view will displayed

  function _renderNoDataView(image, text, srchTxt) {
    return (
      <View style={styles.noDataVw}>
        <Image style={styles.homeImage} source={image} />
        <Text style={styles.noDataTxt}>
          {srchTxt ? text.replace(/xyz/g, srchTxt) : text}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {_searchBar()}
      <View style={styles.flatVw}>
        {srchTxt ? (
          podCastData.length > 0 ? (
            <Animated.View
              style={{
                opacity: fadeAnim,
              }}
            >
              <FlatList
                data={podCastData}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
              />
            </Animated.View>
          ) : (
            _renderNoDataView(Images.NoMusic, String.pdSearchStr, srchTxt)
          )
        ) : (
          _renderNoDataView(Images.HomeMusic, String.pdHomeSrchTxt)
        )}
      </View>
    </SafeAreaView>
  );
};
export default Podcast;

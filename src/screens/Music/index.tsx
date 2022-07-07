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
import { Props } from './IMusic';
import { Colors } from '../../constants/Color';
import { String } from '../../constants/String';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Images } from '../../../assets/images';
import { ApplicationState, onData } from '../../redux';
import _ from 'lodash';
import moment from 'moment';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Music: React.FC<Props> = ({ navigation }) => {

  const [srchTxt, setSrchTxt] = useState('')
  const [filterOption, setFilterOption] = useState(-1)
  const [musicData, setMusicData] = useState([])
  const [fadeAnim] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  const { data, error } = useSelector(
    (state: ApplicationState) => state.musicReducer,
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 7000,
    }).start();
  }, []);

  useEffect(() => {
    setMusicData(data)
    setFilterOption(0)
    console.log("data:::", data)
    if (data) {
      _filterData(filterOption)
    }
  }, [data]);

  // For filter data with collection name and release date

  function _filterData(val) {
    if (val === 0) {
      let gfg = _.sortBy([...data],
        [function (o) { return o.collectionName; }]);
      setMusicData(gfg)
    } else if (val === 1) {
      let blogPosts = _.sortBy([...data], function (o) { return new moment(o.releaseDate); }).reverse();
      setMusicData(blogPosts)
    } else {
      return;
    }
  }
  // To render list card items

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { }} style={styles.flatCardVw}>
      <Image
        style={styles.musicImage}
        source={{
          uri: item.artworkUrl100,
        }}
      />
      <ShimmerPlaceholder visible={true}><Text style={styles.nameTxt}>{item.artistName}</Text></ShimmerPlaceholder >
    </TouchableOpacity>
  );

  // To render search view

  function _searchBar() {
    return (
      <View style={styles.searchVw}>
        <TextInput
          placeholder={String.Search}
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          value={srchTxt}
          onChangeText={text => _setSearchData(text)}
          style={styles.srchInput}
        />
        <TouchableOpacity onPress={() => setSrchTxt('')} style={styles.closeBtn}>
          <MaterialIcons name="close" size={20} color={Colors.slide2Color} />
        </TouchableOpacity>
      </View>
    )
  }
  // Get data using search

  function _setSearchData(text) {
    setSrchTxt(text)
    dispatch(onData(text));
  }
  // When data will be empty, view will displayed

  function _renderNoDataView(image, text, srchTxt) {
    return (
      <View style={styles.noDataVw}>
        <Image
          style={styles.homeImage}
          source={image}
        />
        <Text style={styles.noDataTxt}>{srchTxt ? text.replace(/xyz/g, srchTxt) : text}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {_searchBar()}
      {srchTxt && musicData.length > 0 ? <View style={styles.topTabVw}>
        <TouchableOpacity onPress={() => { setFilterOption(0), _filterData(0) }} style={styles.topTabBar}>
          <Text style={[styles.topBtnTxt, { color: filterOption === 0 ? Colors.slide2Color : Colors.white }]}>{String.ColName}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setFilterOption(1), _filterData(1) }} style={styles.topTabBar}>
          <Text style={[styles.topBtnTxt, { color: filterOption === 1 ? Colors.slide2Color : Colors.white }]}>{String.RelDate}</Text>
        </TouchableOpacity>
      </View> : null}
      <View style={styles.flatVw}>
        {srchTxt ? musicData.length > 0 ? <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        ><FlatList
            data={musicData}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          /></Animated.View> :
          _renderNoDataView(Images.NoMusic, String.SearchStr, srchTxt)
          :
          _renderNoDataView(Images.HomeMusic, String.homeSrchTxt)}
      </View>
    </SafeAreaView>
  );
};
export default Music;

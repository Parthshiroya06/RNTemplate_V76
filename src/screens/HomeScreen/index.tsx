// HomeScreen.js
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './style';
import {useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {
  CommonButton,
  CommonModal,
  FeedFooter,
  VideoComponent,
} from '@components';
import {performGetRequest} from '@actions';
import {images} from '@assets';
import {textStyle} from '@resources';

const HomeScreen = props => {
  const colors = useTheme().colors;
  const {height, width} = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const [horizontalIndexes, setHorizontalIndexes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customFoodOption, setCustomFoodOption] = useState([]);
  const [isSetItemName, setItemName] = useState('');
  const [isItemStore, setItemStore] = useState([]);
  const [isCount, setCount] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const refFlatList = useRef(null);
  const dispatch = useDispatch();
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    getFoodDataList();
  }, []);

  const getFoodDataList = async () => {
    try {
      const response = await dispatch(performGetRequest('general/product'));
      const fetchedData = response.data || [];
      setFoodList(fetchedData);

      const defaultIndexes = {};
      fetchedData.forEach(item => {
        defaultIndexes[item.id] = 0;
      });
      setHorizontalIndexes(defaultIndexes);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };

  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 80});

  const onViewableItemsChanged = useCallback(({changed}) => {
    if (changed.length > 0) {
      setScrollInfo({
        isViewable: changed[0].isViewable,
        index: changed[0].index,
      });
    }
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({length: height, offset: height * index, index}),
    [height],
  );

  const keyExtractor = useCallback((item, index) => `${item.id}-${index}`, []);

  const onScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
      useNativeDriver: true,
    }),
    [],
  );

  const renderItem = useCallback(
    ({item, index: verticalIndex}) => {
      const horizontalIndex = horizontalIndexes[item?.id] ?? 0;
      const currentVideo = item.videos[horizontalIndex];

      return (
        <View style={{height}}>
          <View style={styles.indicatorRow}>
            {item.videos.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, horizontalIndex === i && styles.activeDot]}
              />
            ))}
          </View>

          <FlatList
            data={item.videos}
            keyExtractor={(_, i) => `${item.id}-video-${i}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            extraData={horizontalIndexes}
            onMomentumScrollEnd={e => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / width,
              );
              setHorizontalIndexes(prev => ({...prev, [item.id]: newIndex}));
            }}
            renderItem={({item: videoItem, index: hIndex}) => (
              <View style={{width}}>
                <VideoComponent
                  data={videoItem}
                  isVisible={
                    scrollInfo.index === verticalIndex &&
                    horizontalIndexes[item.id] === hIndex
                  }
                  isMuted={isMuted}
                />
              </View>
            )}
          />

          <View style={styles.leftControls}>
            <Pressable
              style={[styles.controlButton]}
              onPress={() => setIsMuted(!isMuted)}>
              <Image
                source={isMuted ? images.ic_mute : images.ic_unmute}
                style={styles.icon}
              />
              <Text style={styles.iconLabel}>{isMuted ? 'Mute' : 'Sound'}</Text>
            </Pressable>
            <Pressable
              style={[styles.controlButton, {paddingBottom: 10}]}
              onPress={() => setIsFavorite(!isFavorite)}>
              <Image
                source={isFavorite ? images.ic_Like : images.ic_unLike}
                style={styles.icon}
              />
              <Text style={styles.iconLabel}>
                {isFavorite ? 'unLike' : 'Like'}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.controlButton, {paddingBottom: 10}]}
              onPress={() => setIsLike(!isLike)}>
              <Image
                source={isLike ? images.ic_save_fill : images.ic_save_outlook}
                style={styles.icon}
              />
              <Text style={styles.iconLabel}>
                {isLike ? 'unFavorite' : 'Favorite'}
              </Text>
            </Pressable>
          </View>

          <FeedFooter
            data={currentVideo}
            onPress={() => {
              setCustomFoodOption(currentVideo.ingredients_option);
              setItemName(currentVideo);
              setIsModalOpen(true);
            }}
          />
        </View>
      );
    },
    [horizontalIndexes, scrollInfo, isMuted, isLike, isFavorite],
  );

  const _renderCommonModel = () => (
    <CommonModal onClose={() => {}} isVisible={isModalOpen}>
      <View style={[styles.profileContaier, {backgroundColor: colors.card}]}>
        ...
        {/* Truncated modal body for brevity */}
      </View>
    </CommonModal>
  );

  return (
    <View style={styles.flexContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Animated.FlatList
        ref={refFlatList}
        data={foodList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        onScroll={onScroll}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={1}
        bounces={false}
      />
      {_renderCommonModel()}
    </View>
  );
};

export {HomeScreen};

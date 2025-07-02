import React, {useCallback, useRef, useState} from 'react';

import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {IRootReduxState} from '@types';
import {useTheme} from '@react-navigation/native';
import Video from 'react-native-video';
import {
  CommonButton,
  CommonModal,
  FeedFooter,
  VideoComponent,
} from '@components';
import {localize} from '@languages';
import {images} from '@assets';
import {responsiveWidth, textStyle} from '@resources';

type Props = {};

const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const {height} = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isItemSelected, setItemSelected] = useState<boolean>(false);
  const [isItemStore, setItemStore] = useState<any>([]);
  const [isSetItemName, setItemName] = useState<any>('');
  const [isCount, setCount] = useState<any>(1);
  const refFlatList = useRef(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 80,
  });

  const onViewableItemsChanged = useCallback(({changed}) => {
    if (changed.length > 0) {
      setScrollInfo({
        isViewable: changed[0].isViewable,
        index: changed[0].index,
      });
    }
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: height,
      offset: height * index,
      index,
    }),
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
    ({item, index}) => {
      const {index: scrollIndex} = scrollInfo;

      const isNext = Math.abs(index - scrollIndex) <= 1;

      let foodName = [
        {title: 'Stuff MeatBell', price: '$100', count: 1},
        {title: 'Ricotta agnolotti', price: '$50', count: 1},
        {title: 'Fusilli Giganti', price: '$90', count: 1},
      ];
      return (
        <View style={{height}}>
          <VideoComponent
            data={item}
            isNext={isNext}
            isVisible={scrollIndex === index}
          />
          <FeedFooter
            data={foodName[index]}
            onPress={() => {
              setItemName(foodName[index]);
              setIsModalOpen(true);
            }}
          />
        </View>
      );
    },
    [scrollInfo, height],
  );
  const _renderCommonModel = () => {
    return (
      <CommonModal onClose={() => {}} isVisible={isModalOpen}>
        <View style={[styles.profileContaier, {backgroundColor: colors.card}]}>
          <View style={styles.profileTitleView}>
            <Pressable
              style={styles.profileClosebtn}
              onPress={() => {
                setIsModalOpen(false);
              }}>
              <Image
                source={images.ic_close}
                style={[styles.profileCloseIcon, {tintColor: colors.icons}]}
              />
            </Pressable>
          </View>
          <View style={styles.profileViewModel}>
            <Text
              style={[
                textStyle(20, 'Roboto400', 'left'),
                {fontWeight: 'bold'},
              ]}>
              {isSetItemName?.title}
            </Text>

            <View
              style={{marginLeft: 10, marginTop: 10, flexDirection: 'column'}}>
              <Text style={[textStyle(18, 'Roboto200', 'left')]}>
                {'Special Request'}
              </Text>
              <Text
                style={[textStyle(12, 'Roboto400', 'left'), {color: 'gray'}]}>
                {'Option: choose up to 2'}
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              {[
                {id: 1, names: 'No Minced  Pock'},
                {id: 2, names: 'Sauce on the side'},
              ].map((item, inde) => {
                return (
                  <View
                    key={item.names}
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        setItemSelected(!isItemSelected);

                        const exists = isItemStore.some(
                          _item => _item.id === item.id,
                        );

                        if (exists) {
                          const updated = isItemStore.filter(
                            _item => _item.id !== item.id,
                          );
                          console.log('Removed:', updated);
                          setItemStore(updated);
                        } else {
                          // 🔺 Add
                          const updated = [...isItemStore, item];
                          console.log('Added:', updated);
                          setItemStore(updated);
                        }
                      }}>
                      <Image
                        source={
                          isItemStore.some((_item: any) => _item?.id == item.id)
                            ? images.ic_fillLine
                            : images.ic_outLine
                        }
                        style={{resizeMode: 'contain', width: 25, height: 25}}
                      />
                    </Pressable>
                    <Text style={[textStyle(15, 'Roboto400', 'left')]}>
                      {item.names}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: responsiveWidth(25),
              marginTop: 10,
            }}>
            <Pressable
              onPress={() => {
                if (isCount > 1) {
                  let minus_Count = isCount - 1;
                  setCount(minus_Count);
                }
              }}>
              <Image
                source={images.minus}
                style={{resizeMode: 'contain', width: 20, height: 20}}
                tintColor={'#ee7110'}
              />
            </Pressable>
            <Text>{isCount}</Text>
            <Pressable
              onPress={() => {
                let plus_Count = isCount + 1;
                setCount(plus_Count);
              }}>
              <Image
                source={images.plus}
                style={{resizeMode: 'contain', width: 20, height: 20}}
                tintColor={'#ee7110'}
              />
            </Pressable>
          </View>
          <CommonButton
            onPress={() => {
              setIsModalOpen(!isModalOpen);
              console.log('Sdfsdfsdf>>>', isSetItemName);
              isSetItemName.count = isCount;
              setItemName(isSetItemName);
              props.navigation.navigate('CartScreen', {
                param: isSetItemName,
                count: isCount,
              });
              setCount(1);
            }}
            title={'Add to Cart'}
          />
        </View>
      </CommonModal>
    );
  };

  return (
    <View style={styles.flexContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Animated.FlatList
        ref={refFlatList}
        data={[
          {
            id: '1',
            video:
              'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          },
          {
            id: '2',
            video:
              'https://videos.pexels.com/video-files/3195728/3195728-uhd_2560_1440_25fps.mp4',
          },
          {
            id: '3',
            video:
              'https://media.istockphoto.com/id/2193520234/video/the-special-ice-cream-spoon-is-scooping-a-delicious-fresh-strawberry-ice-cream.mp4?s=mp4-640x640-is&k=20&c=bCEjry_DyjQT7rb2PJpTvaMnblyJ6pLnQjOZH1QTces=',
          },
        ]}
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
        bounces={false}
      />
      {_renderCommonModel()}
      <SafeAreaView />
    </View>
  );
};

export {HomeScreen};

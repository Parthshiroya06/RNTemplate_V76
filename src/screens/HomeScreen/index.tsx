import React, {useCallback, useEffect, useRef, useState} from 'react';

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
import {useDispatch, useSelector} from 'react-redux';
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
import {performGetRequest} from '@actions';

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

  const [foodList, setFoodList] = useState<any>([]);
  const [customFoodOption, setCustomFoodOption] = useState<any>([]);
  const [isCount, setCount] = useState<any>(1);
  const refFlatList = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getFoodDataList();
  }, []);

  const getFoodDataList = async () => {
    try {
      const response = await dispatch(performGetRequest('general/product'));

      setFoodList(response.data);
    } catch (error) {
      console.log('someting want worng', error);
    }
  };
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

  const renderItem = ({item, index}) => {
    console.log('check item list>>>>>', item);
    const {index: scrollIndex} = scrollInfo;

    // const isNext = Math.abs(index - scrollIndex) <= 1;

    let foodName = [
      {title: 'Stuff MeatBell', price: '$100', count: 1},
      {title: 'Ricotta agnolotti', price: '$50', count: 1},
      {title: 'Fusilli Giganti', price: '$90', count: 1},
      {title: 'Fusilli Giganti', price: '$90', count: 1},
      {title: 'Fusilli Giganti', price: '$90', count: 1},
    ];
    return (
      <View style={{height}}>
        <VideoComponent data={item} isVisible={scrollIndex === index} />
        <FeedFooter
          data={item}
          onPress={() => {
            setCustomFoodOption(item.ingredients_option);
            setItemName(item);
            setIsModalOpen(true);
          }}
        />
      </View>
    );
  };

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
              {isSetItemName?.name}
            </Text>

            <View style={styles.spacialReqView}>
              <Text style={[textStyle(18, 'Roboto200', 'left')]}>
                {'Special Request'}
              </Text>
              <Text
                style={[textStyle(12, 'Roboto400', 'left'), {color: 'gray'}]}>
                {'Option: choose item'}
              </Text>
            </View>
            <View style={{marginLeft: 20}}>
              {customFoodOption.map((item, index) => {
                return (
                  <View
                    key={index}
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
                          _item => _item === item,
                        );

                        if (exists) {
                          const updated = isItemStore.filter(
                            _item => _item !== item,
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
                          isItemStore.some((_item: any) => _item == item)
                            ? images.ic_fillLine
                            : images.ic_outLine
                        }
                        style={styles.radiobtn}
                      />
                    </Pressable>
                    <Text style={[textStyle(15, 'Roboto400', 'left')]}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.itemListView}>
            <Pressable
              style={styles.btnSty}
              onPress={() => {
                if (isCount > 1) {
                  let minus_Count = isCount - 1;
                  setCount(minus_Count);
                }
              }}>
              <Image
                source={images.minus}
                style={styles.btnImageSty}
                tintColor={'#ee7110'}
              />
            </Pressable>
            <Text>{isCount}</Text>
            <Pressable
              onPress={() => {
                let plus_Count = isCount + 1;
                setCount(plus_Count);
              }}
              style={styles.btnSty}>
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
        bounces={false}
      />
      {_renderCommonModel()}
      <SafeAreaView />
    </View>
  );
};

export {HomeScreen};

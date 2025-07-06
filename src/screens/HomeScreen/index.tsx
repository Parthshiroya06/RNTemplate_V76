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
  const [isItemStore, setItemStore] = useState([]);
  const [isSetItemName, setItemName] = useState('');
  const [customFoodOption, setCustomFoodOption] = useState([]);
  const [isCount, setCount] = useState(1);
  const refFlatList = useRef(null);

  const dispatch = useDispatch();

  const [foodList, setFoodList] = useState([
    {
      id: '1',
      videos: [
        {
          id: '1-1',
          name: 'Stuff MeatBell',
          price: '20',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['No Onion', 'Sauce on the side', 'Buttermilk'],
        },
        {
          id: '1-2',
          name: 'Ricotta agnolotti',
          price: '10',
          uri: 'https://videos.pexels.com/video-files/3195728/3195728-uhd_2560_1440_25fps.mp4',
          ingredients_option: ['Extra Cheese', 'Gluten Free Base', 'Jalapenos'],
        },
        {
          id: '1-3',
          name: 'Fusilli Giganti',
          price: '25',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: [
            'No Sugar',
            'Double Cream',
            'Strawberry Topping',
          ],
        },
        {
          id: '1-4',
          name: 'BBQ Chicken Platter',
          price: '40',
          uri: 'https://videos.pexels.com/video-files/3195728/3195728-uhd_2560_1440_25fps.mp4',
          ingredients_option: ['BBQ Sauce', 'Corn on Side', 'No Garlic'],
        },
        {
          id: '1-5',
          name: 'Veggie Delight Pizza',
          price: '18',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Bell Peppers', 'Extra Olives', 'Thin Crust'],
        },
        {
          id: '1-6',
          name: 'Classic Cheeseburger',
          price: '15',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['No Tomato', 'Double Cheese', 'Brioche Bun'],
        },
        {
          id: '1-7',
          name: 'Tandoori Paneer',
          price: '22',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Extra Spices', 'Mint Chutney', 'No Onions'],
        },
        {
          id: '1-8',
          name: 'Spaghetti Bolognese',
          price: '26',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Extra Parmesan', 'No Beef', 'Garlic Bread'],
        },
        {
          id: '1-9',
          name: 'Spaghetti Bolognese',
          price: '26',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Extra Parmesan', 'No Beef', 'Garlic Bread'],
        },
        {
          id: '1-10',
          name: 'Spaghetti Bolognese',
          price: '26',
          uri: 'https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Extra Parmesan', 'No Beef', 'Garlic Bread'],
        },
      ],
    },
    {
      id: '2',
      videos: [
        {
          id: '2-1',
          name: '5 Wings (Sweet Chilli)',
          price: '32',
          uri: 'https://videos.pexels.com/video-files/854082/854082-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Spicy Mayo', 'Lettuce Only', 'Pickles'],
        },
        {
          id: '2-2',
          name: 'Crispy Roll Rise',
          price: '50',
          uri: 'https://videos.pexels.com/video-files/3198159/3198159-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Truffle Oil', 'Parmesan', 'Garlic Butter'],
        },
        {
          id: '2-3',
          name: 'Shrimp Tacos',
          price: '22',
          uri: 'https://videos.pexels.com/video-files/854082/854082-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Mango Salsa', 'Soft Shell', 'Avocado Cream'],
        },
        {
          id: '2-4',
          name: 'Butter Chicken',
          price: '29',
          uri: 'https://videos.pexels.com/video-files/856399/856399-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Creamy', 'No Cashew', 'Extra Gravy'],
        },
        {
          id: '2-5',
          name: 'Egg Fried Rice',
          price: '17',
          uri: 'https://videos.pexels.com/video-files/854082/854082-hd_1920_1080_25fps.mp4',
          ingredients_option: ['No Peas', 'Extra Egg', 'Less Oil'],
        },
        {
          id: '2-6',
          name: 'Teriyaki Chicken Bowl',
          price: '24',
          uri: 'https://videos.pexels.com/video-files/10628837/10628837-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Extra Sauce', 'Brown Rice', 'Toasted Sesame'],
        },
        {
          id: '2-7',
          name: 'Ramen Bowl',
          price: '21',
          uri: 'https://videos.pexels.com/video-files/7772971/7772971-hd_1920_1080_30fps.mp4',
          ingredients_option: ['No Pork', 'Extra Egg', 'Chili Oil'],
        },
        {
          id: '2-8',
          name: 'Thai Green Curry',
          price: '35',
          uri: 'https://videos.pexels.com/video-files/2053104/2053104-hd_1920_1080_24fps.mp4',
          ingredients_option: ['Jasmine Rice', 'Extra Basil', 'Mild Spice'],
        },
        {
          id: '2-9',
          name: 'Thai Green Curry',
          price: '35',
          uri: 'https://videos.pexels.com/video-files/2053104/2053104-hd_1920_1080_24fps.mp4',
          ingredients_option: ['Jasmine Rice', 'Extra Basil', 'Mild Spice'],
        },
        {
          id: '2-10',
          name: 'Thai Green Curry',
          price: '35',
          uri: 'https://videos.pexels.com/video-files/2053104/2053104-hd_1920_1080_24fps.mp4',
          ingredients_option: ['Jasmine Rice', 'Extra Basil', 'Mild Spice'],
        },
      ],
    },
    {
      id: '3',
      videos: [
        {
          id: '3-1',
          name: 'Pesto Pasta Bowl',
          price: '28',
          uri: 'https://videos.pexels.com/video-files/2894881/2894881-uhd_2560_1440_24fps.mp4',
          ingredients_option: ['Sun-Dried Tomato', 'Almond Pesto', 'Zucchini'],
        },
        {
          id: '3-2',
          name: 'Mac & Cheese',
          price: '16',
          uri: 'https://videos.pexels.com/video-files/10413967/10413967-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Bacon Bits', 'Breadcrumb Top', 'No Pepper'],
        },
        {
          id: '3-3',
          name: 'Grilled Salmon',
          price: '45',
          uri: 'https://videos.pexels.com/video-files/8021302/8021302-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Lemon Butter', 'Steamed Broccoli', 'No Garlic'],
        },
        {
          id: '3-4',
          name: 'Avocado Toast',
          price: '12',
          uri: 'https://videos.pexels.com/video-files/13076960/13076960-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Poached Egg', 'Chili Flakes', 'Sourdough'],
        },
        {
          id: '3-5',
          name: 'Chicken Tikka Wrap',
          price: '23',
          uri: 'https://videos.pexels.com/video-files/5370010/5370010-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Mint Sauce', 'Onion Rings', 'Less Spice'],
        },
        {
          id: '3-6',
          name: 'Ice Cream Sundae',
          price: '14',
          uri: 'https://videos.pexels.com/video-files/10721766/10721766-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Cherry Top', 'No Nuts', 'Double Scoop'],
        },
        {
          id: '3-7',
          name: 'Margherita Pizza',
          price: '20',
          uri: 'https://videos.pexels.com/video-files/4099231/4099231-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Fresh Basil', 'No Garlic', 'Thin Crust'],
        },
        {
          id: '3-8',
          name: 'Sushi Platter',
          price: '48',
          uri: 'https://videos.pexels.com/video-files/7677914/7677914-hd_1920_1080_25fps.mp4',
          ingredients_option: ['No Wasabi', 'Soy Sauce', 'Pickled Ginger'],
        },
        {
          id: '3-9',
          name: 'Sushi Platter',
          price: '48',
          uri: 'https://videos.pexels.com/video-files/7677914/7677914-hd_1920_1080_25fps.mp4',
          ingredients_option: ['No Wasabi', 'Soy Sauce', 'Pickled Ginger'],
        },
        {
          id: '3-10',
          name: 'Sushi Platter',
          price: '48',
          uri: 'https://videos.pexels.com/video-files/7677914/7677914-hd_1920_1080_25fps.mp4',
          ingredients_option: ['No Wasabi', 'Soy Sauce', 'Pickled Ginger'],
        },
      ],
    },
    {
      id: '4',
      videos: [
        {
          id: '4-1',
          name: 'Paneer Butter Masala',
          price: '27',
          uri: 'https://videos.pexels.com/video-files/3209214/3209214-uhd_2560_1440_25fps.mp4',
          ingredients_option: ['Less Butter', 'Extra Paneer', 'Mild Spice'],
        },
        {
          id: '4-2',
          name: 'Fish & Chips',
          price: '30',
          uri: 'https://videos.pexels.com/video-files/3198159/3198159-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Tartar Sauce', 'No Vinegar', 'Extra Crispy'],
        },
        {
          id: '4-3',
          name: 'Chocolate Lava Cake',
          price: '19',
          uri: 'https://videos.pexels.com/video-files/3211203/3211203-hd_1920_1080_30fps.mp4',
          ingredients_option: ['No Nuts', 'Extra Chocolate', 'With Ice Cream'],
        },
        {
          id: '4-4',
          name: 'Biryani Combo',
          price: '34',
          uri: 'https://videos.pexels.com/video-files/20854819/20854819-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Raita', 'No Egg', 'Spicy'],
        },
        {
          id: '4-5',
          name: 'Caesar Salad',
          price: '13',
          uri: 'https://videos.pexels.com/video-files/11231066/11231066-hd_1920_1080_25fps.mp4',
          ingredients_option: ['No Anchovy', 'Extra Croutons', 'More Dressing'],
        },
        {
          id: '4-6',
          name: 'Chicken Quesadilla',
          price: '29',
          uri: 'https://videos.pexels.com/video-files/856908/856908-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Sour Cream', 'No Jalapeno', 'Extra Cheese'],
        },
        {
          id: '4-7',
          name: 'Beef Stroganoff',
          price: '38',
          uri: 'https://videos.pexels.com/video-files/13814191/13814191-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Creamy Sauce', 'No Onion', 'Herbs'],
        },
        {
          id: '4-8',
          name: 'Greek Salad',
          price: '20',
          uri: 'https://videos.pexels.com/video-files/7047817/7047817-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Feta Cheese', 'No Cucumber', 'Olives'],
        },
        {
          id: '4-9',
          name: 'Chicken Shawarma',
          price: '24',
          uri: 'https://videos.pexels.com/video-files/13307239/13307239-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Tahini', 'Extra Pickle', 'Less Garlic'],
        },
        {
          id: '4-10',
          name: 'Pav Bhaji',
          price: '18',
          uri: 'https://videos.pexels.com/video-files/5483420/5483420-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Butter Toasted Bun', 'Spicy Mix', 'No Onion'],
        },
      ],
    },
    {
      id: '5',
      videos: [
        {
          id: '5-1',
          name: 'Falafel Wrap',
          price: '16',
          uri: 'https://videos.pexels.com/video-files/3196094/3196094-uhd_2560_1440_25fps.mp4',
          ingredients_option: ['Tahini Sauce', 'No Onions', 'Extra Lettuce'],
        },
        {
          id: '5-2',
          name: 'Tuna Sandwich',
          price: '19',
          uri: 'https://videos.pexels.com/video-files/3198159/3198159-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Brown Bread', 'Extra Mayo', 'No Tomato'],
        },
        {
          id: '5-3',
          name: 'French Toast',
          price: '14',
          uri: 'https://videos.pexels.com/video-files/20812726/20812726-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Maple Syrup', 'Whipped Cream', 'No Butter'],
        },
        {
          id: '5-4',
          name: 'Taco Trio',
          price: '22',
          uri: 'https://videos.pexels.com/video-files/4010043/4010043-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Salsa Verde', 'No Onions', 'Soft Shell'],
        },
        {
          id: '5-5',
          name: 'Mushroom Risotto',
          price: '26',
          uri: 'https://videos.pexels.com/video-files/2670688/2670688-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Truffle Oil', 'No Parmesan', 'More Cream'],
        },
        {
          id: '5-6',
          name: 'Kathi Roll',
          price: '18',
          uri: 'https://videos.pexels.com/video-files/2821267/2821267-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Mint Chutney', 'Less Oil', 'Eggless'],
        },
        {
          id: '5-7',
          name: 'Veg Club Sandwich',
          price: '20',
          uri: 'https://videos.pexels.com/video-files/6066827/6066827-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Cheese Slice', 'No Onion', 'Extra Tomato'],
        },
        {
          id: '5-8',
          name: 'Penne Arrabiata',
          price: '23',
          uri: 'https://videos.pexels.com/video-files/6273483/6273483-hd_1920_1080_30fps.mp4',
          ingredients_option: ['Spicy Sauce', 'No Basil', 'Extra Cheese'],
        },
        {
          id: '5-9',
          name: 'Chana Masala',
          price: '21',
          uri: 'https://videos.pexels.com/video-files/8535222/8535222-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Less Oil', 'No Chili', 'More Masala'],
        },
        {
          id: '5-10',
          name: 'Rava Dosa',
          price: '15',
          uri: 'https://videos.pexels.com/video-files/11312680/11312680-hd_1920_1080_25fps.mp4',
          ingredients_option: ['Extra Ghee', 'Coconut Chutney', 'No Sambar'],
        },
      ],
    },
  ]);

  useEffect(() => {
    getFoodDataList();
  }, []);

  const getFoodDataList = async () => {
    try {
      const response = await dispatch(performGetRequest('general/product'));

      // setFoodList(response.data);
    } catch (error) {
      console.log('Something went wrong', error);
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

  const renderItem = ({item, index: verticalIndex}) => {
    const horizontalIndex = horizontalIndexes[item.id] || 0;
    const currentVideo = item.videos[horizontalIndex];
    let nestedIndex = 0;
    return (
      <View style={{height}}>
        {/* Dots Indicator */}
        <View style={styles.indicatorRow}>
          {item.videos.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, horizontalIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* Horizontal FlatList */}
        <FlatList
          data={item.videos}
          keyExtractor={(_, i) => `${item.id}-video-${i}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          extraData={horizontalIndexes}
          onMomentumScrollEnd={e => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            nestedIndex = newIndex;

            setHorizontalIndexes(prev => ({...prev, [item.id]: newIndex}));
          }}
          renderItem={({item: videoItem, index: horizontalIndex}) => (
            <View style={{width}}>
              <VideoComponent
                data={videoItem}
                isVisible={
                  scrollInfo.index === verticalIndex &&
                  horizontalIndexes[item.id] === horizontalIndex
                }
              />
            </View>
          )}
        />

        {/* Footer */}
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
                        // setItemSelected(!isItemSelected);

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
              console.log('isSetItemName>>>>', isSetItemName);
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

      <SafeAreaView />
      {_renderCommonModel()}
    </View>
  );
};

export {HomeScreen};

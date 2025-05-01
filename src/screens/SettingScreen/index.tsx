import React, {useRef, useState} from 'react';

import {
  Alert,
  Animated,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  SectionList,
  Text,
  TextInput,
  UIManager,
  useColorScheme,
  View,
} from 'react-native';
import {styles} from './style';
import {CommonActions, useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, responsiveHeight, textStyle} from '@resources';
import {images} from '@assets';
import {FirebaseAuth} from '@services';
import {
  CommonButton,
  CommonModal,
  InputBox,
  Loader,
  SegmentedControl,
} from '@components';
import {currencySysmbol, IProfileDetails, IRootReduxState} from '@types';
import {
  currencySelection,
  languageSelection,
  profileDetails,
  storeThemeMode,
} from '@actions';
import {changeLanguage, localize} from '@languages';
import DeviceInfo from 'react-native-device-info';
type Props = {};
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const countries = [
  {
    name: 'US Dollar',
    symbol: 'US$',
    code: 'USD',
    locale: 'en_US',
    country: 'United States',
  },
  {
    name: 'Euro',
    symbol: '€',
    code: 'EUR',
    locale: 'pt_PT',
    country: 'Portugal',
  },
  {
    name: 'Brazilian Real',
    symbol: 'R$',
    code: 'BRL',
    locale: 'pt_BR',
    country: 'Brazil',
  },
  {
    name: 'Euro',
    symbol: '€',
    code: 'EUR',
    locale: 'fr_FR',
    country: 'France',
  },
];

const SettingScreen = (props: Props) => {
  const colors = useTheme().colors;
  const theme = useColorScheme();
  const inputRef = useRef<TextInput>(null);
  const {
    themeMode,
    profileDetails: profile_details,
    language_code,
    select_currency,
  } = useSelector((state: IRootReduxState) => state.userDetails);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const common_obj = {
    value: profile_details.name,
    isError: '',
  };

  let main_obj = {
    name: common_obj,
  };
  const sectionsData = [
    {
      title: localize('general'),
      data: [
        {name: 'profile', icon: 'ic_profile'},
        {
          name: 'Theme',
          icon: 'ic_darkMode',
        },
        {name: 'Language', icon: 'ic_translation'},
        {name: 'Currency', icon: 'ic_currency'},
        {name: 'SignOut', icon: 'ic_signout'},
      ],
    },
    {
      title: localize('about'),
      data: [
        {name: 'term_title', icon: 'ic_terms'},
        {name: 'policy_title', icon: 'ic_privacy'},
        {name: 'Version', icon: 'ic_version'},
      ],
    },
  ];
  const [openSections, setOpenSections] = useState<string[]>(['General']);
  const [isModalOpen, setIsModalOpen] = useState<string>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [input, setInputs] = useState(main_obj);
  const [tabIndex, setTabIndex] = useState(
    themeMode == 'Auto' ? 0 : themeMode == 'Light' ? 1 : 2,
  );
  const [selectedCurrency, setSelectedCurrency] =
    useState<currencySysmbol>(select_currency);
  const rotationValues = useRef<{[key: string]: Animated.Value}>({});

  const toggleSection = (sectionTitle: string) => {
    // Trigger the layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const isOpen = openSections.includes(sectionTitle);

    Animated.timing(getRotationValue(sectionTitle), {
      toValue: isOpen ? 0 : 1, // 1 for 180-degree, 0 for default
      duration: 400,
      useNativeDriver: true,
    }).start();
    if (isOpen) {
      // Remove section from openSections if it's already open
      setOpenSections(openSections.filter(title => title !== sectionTitle));
    } else {
      // Add section to openSections if it's closed
      setOpenSections([...openSections, sectionTitle]);
    }
  };

  const getRotationValue = (sectionTitle: string) => {
    if (!rotationValues.current[sectionTitle]) {
      const initialValue = openSections.includes(sectionTitle) ? 1 : 0;
      rotationValues.current[sectionTitle] = new Animated.Value(initialValue); // Initially not rotated
    }
    return rotationValues.current[sectionTitle];
  };

  const handleTabsChange = (index: number) => {
    let themeType = index == 0 ? 'Auto' : index == 1 ? 'Light' : 'Dark';
    dispatch(storeThemeMode(themeType));

    setTabIndex(index);
  };
  const renderSectionHeader = ({section}: {section: any}) => {
    const rotation = getRotationValue(section.title).interpolate({
      inputRange: [0, 1],
      outputRange: ['270deg', '90deg'], // Rotates between 0 and 180 degrees
    });

    return (
      <Pressable
        onPress={() => toggleSection(section.title)}
        style={[
          styles.sectionHeader,
          {backgroundColor: colors.darktertiary1},
          {
            ...(openSections.some(item => item === section.title)
              ? {
                  borderTopRightRadius: responsiveHeight(1),
                  borderTopLeftRadius: responsiveHeight(1),
                }
              : {borderRadius: responsiveHeight(1)}),
          },
        ]}>
        <Text style={[textStyle(18, 'Roboto200'), {color: colors.text}]}>
          {section.title}
        </Text>
        <Animated.Image
          source={images.back_arrow}
          style={[
            styles.imageStyle,
            {transform: [{rotate: rotation}], tintColor: colors.icons},
          ]}
        />
      </Pressable>
    );
  };

  const selectCurrency = () => {};
  const signOut = async () => {
    try {
      setIsLoad(true);
      FirebaseAuth.googleSignout();
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          }),
        );
        dispatch({type: 'RESET_DATA'});
        setIsLoad(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const profileUpdate = () => {
    if (input.name.value != '') {
      let details: IProfileDetails = {
        name: input.name.value,
        email: profile_details.email,
        uid: profile_details.uid,
        giro_coin: profile_details.giro_coin,
      };
      dispatch(profileDetails(details));
      setIsModalOpen('');
    } else {
      console.log('is Error is >>>>>>', input.name);
      inputRef.current?.focus();
      setInputs({
        ...input,
        name: {...input.name, isError: 'Please enter valid name'},
      });
    }
  };

  const onPressCloseBtn = () => {
    setInputs(main_obj);
    setIsModalOpen('');
  };
  const _renderItem = ({item}: {item: any}) => {
    let isThemeMode = themeMode;
    const language = languages.find(lang => lang.id === language_code)?.name;
    console.log('sdfsdfsDF>>>>>', language);
    if (themeMode === 'Auto') {
      let isAutoTheme = theme === 'dark' ? 'Dark' : 'Light';
      isThemeMode = isAutoTheme;
    } else {
      isThemeMode = themeMode;
    }
    switch (item.name) {
      case 'profile':
        return (
          <Pressable
            style={[
              styles.sectionView,
              {backgroundColor: colors.darktertiary1},
            ]}
            onPress={() => {
              setIsModalOpen('profile');
            }}>
            <Image
              source={images[item.icon]}
              style={[styles.generalImageSty, {tintColor: colors.icons}]}
            />
            <View style={styles.profileView}>
              <Text
                numberOfLines={1}
                style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
                {profile_details?.name}
              </Text>
              <Text
                numberOfLines={1}
                style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
                {profile_details?.email}
              </Text>
            </View>
            <Pressable
              style={styles.editProfileBtn}
              onPress={() => {
                setIsModalOpen('profile');
              }}>
              <Image
                source={images.ic_edit}
                style={[styles.editImage, {tintColor: colors.icons}]}
              />
            </Pressable>
          </Pressable>
        );
      // case 'Theme':
      //   return (
      //     <View
      //       style={[
      //         styles.containerTheme,
      //         {backgroundColor: colors.darktertiary1},
      //       ]}>
      //       <View style={styles.appearanceView}>
      //         <Image
      //           source={
      //             isThemeMode === 'Dark'
      //               ? images.ic_darkMode
      //               : images.ic_lightMode
      //           }
      //           style={[styles.generalImageSty, {tintColor: colors.icons}]}
      //         />
      //         <Text style={[styles.themeText, {color: colors.text}]}>
      //           {localize('appearance')}
      //         </Text>
      //       </View>
      //       <SegmentedControl
      //         tabs={[localize('auto'), localize('light'), localize('dark')]}
      //         currentIndex={tabIndex}
      //         onChange={handleTabsChange}
      //         segmentedControlBackgroundColor={Colors.grey}
      //         activeSegmentBackgroundColor={colors.DarkSlateBlue}
      //         activeTextColor="white"
      //         textColor="black"
      //         paddingVertical={18}
      //       />
      //     </View>
      //   );

      case 'SignOut':
        return (
          <Pressable
            style={[
              styles.sectionView,
              {backgroundColor: colors.darktertiary1},
            ]}
            onPress={() => {
              Alert.alert(localize('signout'), localize('sigOut_message'), [
                {
                  text: localize('cancel'),
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: localize('yes'),
                  onPress: () => signOut(),
                },
              ]);
              //
            }}>
            <Image
              source={images[item.icon]}
              style={[styles.generalImageSty, {tintColor: colors.icons}]}
            />
            <Text style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
              {localize('signout')}
            </Text>
          </Pressable>
        );

      case 'Version':
        let get_versoin = `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`;
        return (
          <View
            style={[
              styles.versionViewContainer,
              {backgroundColor: colors.darktertiary1},
            ]}>
            <View style={styles.versionViewTitle}>
              <Image
                source={images[item.icon]}
                style={[styles.generalImageSty, {tintColor: colors.icons}]}
              />
              <Text style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
                {localize('version')}
              </Text>
            </View>
            <View>
              <Text style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
                {get_versoin}
              </Text>
            </View>
          </View>
        );
      case 'Language':
        return (
          <Pressable
            style={[
              styles.sectionView,
              {backgroundColor: colors.darktertiary1},
            ]}
            onPress={() => {}}>
            <Image
              source={images[item.icon]}
              style={[styles.generalImageSty, {tintColor: colors.icons}]}
            />
            <View style={styles.languageView}>
              <Text style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
                {localize('language')}
              </Text>
              <Pressable
                onPress={() => {
                  setIsModalOpen('languages');
                }}
                style={[
                  styles.selectedLngView,
                  {backgroundColor: colors.lightGrey},
                ]}>
                <Text style={[textStyle(13, 'Roboto')]}>{language}</Text>
                {/* <Image
                    source={images[item.icon]}
                    style={[styles.generalImageSty, {tintColor: colors.icons}]}
                  /> */}
              </Pressable>
            </View>
          </Pressable>
        );
      case 'Currency':
        return (
          <Pressable
            style={[
              styles.sectionView,
              {backgroundColor: colors.darktertiary1},
            ]}
            onPress={selectCurrency}>
            <Image
              source={images[item.icon]}
              style={[styles.generalImageSty, {tintColor: colors.icons}]}
            />
            <View style={styles.languageView}>
              <Text style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
                {localize('currency')}
              </Text>
              <Pressable
                onPress={() => {
                  setIsModalOpen('currency');
                }}
                style={[
                  styles.selectedLngView,
                  {backgroundColor: colors.lightGrey},
                ]}>
                <Text style={[textStyle(13, 'Roboto')]}>
                  {`${selectedCurrency.code}(${selectedCurrency.symbol})`}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        );
      case 'term_title':
      case 'policy_title':
        return (
          <Pressable
            style={[
              styles.sectionView,
              {backgroundColor: colors.darktertiary1},
            ]}
            onPress={() => {
              navigation.navigate('WebViewScreen', {
                title: item.name,
                url: 'https://www.moshocart.com/',
              });
            }}>
            <Image
              source={images[item.icon]}
              style={[styles.generalImageSty, {tintColor: colors.icons}]}
            />
            <Text style={[textStyle(16, 'Roboto'), {color: colors.text}]}>
              {localize(item.name)}
            </Text>
          </Pressable>
        );
    }
  };
  const _renderCommonTextModel = (title: string, label: string | any = '') => {
    return (
      <View style={styles.ProfileContainerView}>
        <Text style={[textStyle(16, 'Roboto200'), {color: colors.text}]}>
          {title}
        </Text>
        <Text style={[textStyle(18, 'Roboto'), {color: colors.text}]}>
          {label}
        </Text>
      </View>
    );
  };
  const languages = [
    {id: 'en_US', name: 'English'},
    {id: 'pt_pi', name: 'Portuguese'},
    {id: 'fr_FR', name: 'French'},
    {id: 'es_ES', name: 'Spanish'},
  ];
  const _renderCommonModel = () => {
    switch (isModalOpen) {
      case 'profile':
        return (
          <CommonModal onClose={() => {}} isVisible={isModalOpen === 'profile'}>
            <View
              style={[styles.profileContaier, {backgroundColor: colors.card}]}>
              <View style={styles.profileTitleView}>
                <Text
                  style={[textStyle(20, 'Roboto200'), {color: colors.text}]}>
                  {localize('edit_profile')}
                </Text>
                <Pressable
                  style={styles.profileClosebtn}
                  onPress={() => {
                    onPressCloseBtn();
                  }}>
                  <Image
                    source={images.ic_close}
                    style={[styles.profileCloseIcon, {tintColor: colors.icons}]}
                  />
                </Pressable>
              </View>

              <View style={styles.profileViewModel}>
                {_renderCommonTextModel(
                  localize('email'),
                  profile_details?.email,
                )}

                <InputBox
                  label={localize('enter_name')}
                  blurOnSubmit={true}
                  refs={inputRef}
                  keyboardType="numeric"
                  value={input.name.value}
                  onChangeText={text => {
                    setInputs({
                      ...input,
                      name: {value: text, isError: ''},
                    });
                  }}
                  textinputStyle={styles.contactNameTextInput}
                  outlineStyle={{
                    borderColor: input.name.isError
                      ? colors.red
                      : colors.DarkSlateBlue,
                  }}
                  onSubmitEditing={() => {
                    console.log('on Submit Done');
                  }}
                  textColor={colors.text}
                  theme={{
                    colors: {
                      onSurfaceVariant: colors.DarkSlateBlue,
                      primary: input.name.isError
                        ? colors.red
                        : colors.DarkSlateBlue,
                    },
                  }}
                />
                {input.name.isError && (
                  <View style={styles.labelView}>
                    <Text
                      style={[
                        textStyle(12, 'Roboto', 'left'),
                        {color: Colors.red},
                      ]}>
                      {input.name.isError}
                    </Text>
                  </View>
                )}
              </View>
              <CommonButton
                buttonStyle={{
                  marginBottom: 20,
                }}
                title={localize('done')}
                onPress={() => {
                  profileUpdate();
                }}
              />
            </View>
          </CommonModal>
        );

      case 'languages':
        return (
          <CommonModal
            modeType="fade"
            onClose={() => {}}
            isVisible={isModalOpen === 'languages'}>
            <Pressable
              style={[styles.overlay]}
              activeOpacity={1}
              onPress={() => {
                setIsModalOpen('');
              }}>
              <View
                style={[styles.modalContainer, {backgroundColor: colors.card}]}>
                <Text style={[styles.title, {color: colors.primary}]}>
                  {'Select Language'}
                </Text>
                <FlatList
                  data={languages}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <Pressable
                      style={styles.languageItem}
                      onPress={() => {
                        changeLanguage(item.id);
                        dispatch(languageSelection(item.id));
                        setIsModalOpen('');
                      }}>
                      <Text
                        style={[
                          textStyle(
                            15,
                            language_code == item.id ? 'Roboto400' : 'Roboto',
                          ),
                          {
                            color: colors.text,
                            fontWeight:
                              language_code == item.id ? '800' : '400',
                          },
                        ]}>
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                />
                <Pressable
                  style={styles.closeButton}
                  onPress={() => {
                    setIsModalOpen('');
                  }}>
                  <Text style={styles.closeText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </CommonModal>
        );

      case 'currency':
        return (
          <CommonModal
            modeType="fade"
            onClose={() => {}}
            isVisible={isModalOpen === 'currency'}>
            <Pressable
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setIsModalOpen('')}>
              <View
                style={[
                  styles.modalCourrencyContainer,
                  {backgroundColor: colors.card},
                ]}>
                <Text style={[styles.title, {color: colors.primary}]}>
                  {localize('select_currency')}
                </Text>

                <FlatList
                  data={countries}
                  keyExtractor={item => item.locale}
                  renderItem={({item}) => {
                    return (
                      <Pressable
                        style={styles.item}
                        onPress={() => {
                          setSelectedCurrency(item);
                          setIsModalOpen('');
                          dispatch(currencySelection(item));
                        }}>
                        <View style={styles.currencyView}>
                          <Text
                            style={[
                              textStyle(
                                15,
                                selectedCurrency.locale === item.locale
                                  ? 'Roboto400'
                                  : 'Roboto',
                              ),
                              {
                                color: colors.text,
                                fontWeight:
                                  selectedCurrency.locale === item.locale
                                    ? '800'
                                    : '400',
                              },
                            ]}>
                            {`${item.country} `}
                          </Text>
                          <Text
                            style={[
                              textStyle(
                                15,
                                selectedCurrency.locale === item.locale
                                  ? 'Roboto400'
                                  : 'Roboto',
                              ),
                              {
                                color: colors.text,
                                fontWeight:
                                  selectedCurrency.locale === item.locale
                                    ? '800'
                                    : '400',
                              },
                            ]}>
                            {` ${item.code}(${item.symbol})`}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  }}
                />

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setIsModalOpen('')}>
                  <Text style={styles.closeText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          </CommonModal>
        );
    }
  };
  return (
    <>
      {isModalOpen && (
        <Pressable
          style={[
            styles.opacityView,
            {backgroundColor: colors.blackTransparency},
          ]}
          onPress={() => {}}
        />
      )}
      <View style={styles.container}>
        <SectionList
          sections={sectionsData}
          keyExtractor={(item, index) => `${item} +${index}`}
          renderItem={({item, section}) => {
            // Show items only if the section is open
            if (openSections.includes(section.title)) {
              return _renderItem({item});
            }
            return null;
          }}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
      <Loader isLoading={isLoad} />
      {_renderCommonModel()}
    </>
  );
};

export {SettingScreen};

import {
  Dimensions,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import Video from 'react-native-video';
import {LinearGradient} from 'react-native-svg';

const VideoComponent = ({data, isVisible}) => {
  const {height} = useWindowDimensions();
  const videoStyle = useMemo(
    () => [
      styles.videoBase,
      {height: Platform.OS === 'ios' ? height : height - 50},
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <Video
        source={{uri: data.video}}
        repeat
        resizeMode="cover"
        muted={true}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch="ignore"
        style={videoStyle}
      />
      <LinearGradient
        colors={[
          '#000000F0',
          '#000000D0',
          '#000000A0',
          '#00000070',
          '#00000040',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={styles.controlsContainer}
      />
    </View>
  );
};

export {VideoComponent};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoBase: {
    backgroundColor: 'black',
    width: '100%',
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

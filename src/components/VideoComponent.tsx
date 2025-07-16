import {Platform, StyleSheet, useWindowDimensions, View} from 'react-native';
import React, {useMemo} from 'react';
import Video from 'react-native-video';
import {LinearGradient} from 'react-native-svg';

const VideoComponent = ({data, isVisible, isMuted = false}) => {
  const {height} = useWindowDimensions();
  const videoStyle = useMemo(
    () => [
      styles.videoBase,
      {height: Platform.OS === 'ios' ? height : height - 50},
    ],
    [height],
  );

  console.log('sdfsdfsdf>>>>>>', data);
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: data.url,
          bufferConfig: {
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          },
        }}
        repeat
        resizeMode="cover"
        muted={isMuted}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch="ignore"
        style={videoStyle}
      />
    </View>
  );
};

export {VideoComponent};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  videoBase: {
    backgroundColor: 'black',
    width: '100%',
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

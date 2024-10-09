import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import ImageOne from '../../../../Assets/Images/image1.png';
import ImageTwo from '../../../../Assets/Images/image2.png';
import ImageThree from '../../../../Assets/Images/image3.png';
import {Box, Button, Card, Container, Heading, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {LocalStorage, RoutesName} from '../../../../Utils/Resource';
const {width, height} = Dimensions.get('window');

// Sample images for carousel
const images = [
  {
    image: ImageOne,
    heading: 'Welcome Book My Stylist',
    description:
      "Find the best grooming experience in your city with just one tap! Don't miss out on the haircut or treatment of your dreams. Let's start now!",
  },
  {
    image: ImageTwo,
    heading: 'Looking for  Stylist?',
    description:
      "Find the best grooming experience in your city with just one tap! Don't miss out on the haircut or treatment of your dreams. Let's start now!",
  },
  {
    image: ImageThree,
    heading: 'Everything in your hands',
    description:
      "Find the best grooming experience in your city with just one tap! Don't miss out on the haircut or treatment of your dreams. Let's start now!",
  },
];

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        bounces={false}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({item}) => (
          <Box justifyContent={'flex-end'}>
            <Image source={item?.image} style={styles.image} />

            <Card
              style={styles.bottomCard}
              backgroundColor={'gray.300'}
              paddingY={'10'}
              justifyContent={'space-between'}>
              <Heading size={'xl'}>{item?.heading}</Heading>
              <Text noOfLines={5} width={width * 0.8} marginY={'2.5'}>
                {item?.description}
              </Text>
              <View style={styles.indicatorContainer}>
                {images.map((_, i) => {
                  const scale = scrollX.interpolate({
                    inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp',
                  });

                  const opacity = scrollX.interpolate({
                    inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                  });

                  return (
                    <Animated.View
                      key={i}
                      style={[
                        styles.dot,
                        {
                          transform: [{scale}],
                          opacity,
                        },
                      ]}
                    />
                  );
                })}
              </View>
              <Button
                onPress={() => {
                  LocalStorage.setSkipOnBoarding(true);
                  navigation.replace(RoutesName.LOGIN);
                }}>
                Get Started
              </Button>
            </Card>
          </Box>
        )}
      />

      {/* Indicator dots */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height * 0.7,
    resizeMode: 'contain',
    right: -30,
    bottom: -30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginHorizontal: 8,
  },
  bottomCard: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});

export default Carousel;

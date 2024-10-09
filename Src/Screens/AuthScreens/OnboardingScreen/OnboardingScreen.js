import React from 'react';
import {ImageBackground} from 'react-native';
import bg from '../../../Assets/Images/bg.png';
import Carousel from './Components/Carousel';
import {LocalStorage, RoutesName} from '../../../Utils/Resource';
const OnboardingScreen = ({navigation}) => {
  // React.useLayoutEffect(() => {
  //   const init = async () => {
  //     const data = await LocalStorage.getSkipOnBoarding();
  //     if (data) {
  //       navigation.replace(RoutesName.LOGIN);
  //     }
  //   };
  //   init();
  // }, [navigation]);
  return (
    <ImageBackground source={bg} style={{flex: 1}} imageStyle={{opacity: 0.2}}>
      <Carousel />
    </ImageBackground>
  );
};

export default OnboardingScreen;

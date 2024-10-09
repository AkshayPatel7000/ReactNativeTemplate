import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './Src/Navigation';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {COLOR, LocalStorage} from './Src/Utils/Resource';
import {useAppDispatch, useTypedSelector} from './Src/Store/MainStore';
import {selectIsDarkTheme, setIsDarkMode} from './Src/Store/Slices/LoaderSlice';
import {COLOR_DARK} from './Src/Utils/Resource/theme';
import {StatusBar} from 'react-native';
import {extendTheme, NativeBaseProvider} from 'native-base';
const App = () => {
  const config = {
    useSystemColorMode: false,
    // initialColorMode: 'dark',
  };

  // extend the theme
  const customTheme = extendTheme({config});
  const isDark = useTypedSelector(selectIsDarkTheme);
  let theme = isDark ? COLOR_DARK : COLOR;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      const isDarkMode = await LocalStorage.getIsDarkTheme();

      dispatch(setIsDarkMode(isDarkMode));
    };
    init();
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={isDark ? 'dark-content' : 'light-content'}
      />
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer
          theme={{...DefaultTheme, colors: {...theme}, dark: isDark}}
          headerMode={false}
          animationEnabled={true}
          screenOptions={{
            headerShown: false,
          }}>
          <Navigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

export default App;

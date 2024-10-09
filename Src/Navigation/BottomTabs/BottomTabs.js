import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as SVG from '../../Assets/SVG';
import {BookingScreen, HomeScreen, ProfileScreen} from '../../Screens';
import routesName from '../../Utils/Resource/routesName';

const BottomTab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors, dark);
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const safeAreaInsets = useSafeAreaInsets();
  let fromBottom =
    Platform.OS == 'ios' ? safeAreaInsets.bottom : safeAreaInsets.bottom + 20;
  const [showTab, setShowTab] = React.useState(true);

  const _keyboardDidShow = () => {
    setShowTab(false);
    scrollY.setValue(-100);
  };
  const _keyboardDidHide = () => {
    setShowTab(true);
    scrollY.setValue(0);
  };
  useEffect(() => {
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.main,
        // GlobalStyles.shadow,
        {marginBottom: fromBottom, transform: [{translateY}]},
      ]}>
      {showTab && (
        <>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              navigation.navigate({name: route.name, merge: true});
            };
            return (
              <TouchableOpacity
                key={label}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={() => onPress()}
                style={styles.singleItem}>
                {isFocused ? options.iconInActive : options.icon}
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </Animated.View>
  );
}

const BottomTabs = () => {
  const {colors, dark} = useTheme();
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => <MyTabBar {...tabsProps} />}
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      options={{tabBarHideOnKeyboard: true}}
      initialRouteName="Dashboard">
      <BottomTab.Screen
        name={routesName.HOME}
        options={{
          tabBarHideOnKeyboard: true,
          icon: <SVG.HomeSVG />,
          iconInActive: <SVG.HomeActiveSVG />,
        }}
        component={HomeScreen}
      />
      <BottomTab.Screen
        name={routesName.CHAT}
        options={{
          icon: <SVG.ChatSVG />,
          iconInActive: <SVG.ChatActiveSVG />,
        }}
        component={BookingScreen}
      />
      <BottomTab.Screen
        name={routesName.MENU}
        options={{
          icon: <SVG.MenuSVG />,
          iconInActive: <SVG.MenuActiveSVG />,
        }}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};
export default BottomTabs;
const getStyles = (colors, dark) => {
  return StyleSheet.create({
    main: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      backgroundColor: dark ? '#19191980' : '#FFFFFFE6',
      marginHorizontal: 18,
      borderRadius: 20,
      height: 60,
      left: 0,
      right: 0,
    },
    singleItem: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
  });
};

import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ContainerComponent = ({
  contentContainerStyle = {},
  containerStyle = {},
  statusColor,
  statusContent,
  enablePadding = true,
  children,
}) => {
  const {colors, dark} = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const styles = getStyles(safeAreaInsets, colors);

  return (
    <View
      style={[
        styles.container,
        // enablePadding && {paddingTop: safeAreaInsets.top},
      ]}>
      <View
        style={{
          backgroundColor: statusColor,
          height: safeAreaInsets.top,
        }}
      />

      <SafeAreaView
        style={[styles.contentContainerStyle, contentContainerStyle]}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export default ContainerComponent;

const getStyles = (safeAreaInsets, colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: colors.BACKGROUND,
      // paddingTop: safeAreaInsets.top,
    },
    contentContainerStyle: {flex: 1},
  });
};

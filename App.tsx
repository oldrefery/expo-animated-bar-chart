import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BACKGROUND_COLOR, data } from './src/constants';
import { WeeklyBarChart } from './src/components/WeeklyBarChart';
import { useState } from 'react';
import { useFonts } from 'expo-font';

export default function App() {
  const [activeWeekIndex, setActiveWeekIndex] = useState<number>(0);
  const [loaded] = useFonts({
    'FiraCode-Regular': require('./assets/fonts/FiraCode-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <WeeklyBarChart
        weeks={data}
        activeWeekIndex={activeWeekIndex}
        onWeekChange={setActiveWeekIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

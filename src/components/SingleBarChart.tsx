import { StyleSheet, Text, View } from 'react-native';
import { MAX_BAR_HEIGHT } from '../constants';
import { Day } from './types';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { format } from 'date-fns';

interface SingleBarChartProps {
  width: number;
  day: Day;
  index: number;
}

export const SingleBarChart = ({ width, day, index }: SingleBarChartProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(MAX_BAR_HEIGHT * day.value),
      opacity: withTiming(day.value),
    };
  }, [day.value]);

  const wStyle = {
    width: width,
  };

  return (
    <View>
      <Animated.View style={[wStyle, styles.bar, rStyle]} />
      <Text style={[wStyle, styles.title]}>{format(day.day, 'eeeeee')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    marginTop: 10,
    fontFamily: 'FiraCode-Regular',
    textTransform: 'lowercase',
  },
  bar: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderCurve: 'continuous',
  },
});

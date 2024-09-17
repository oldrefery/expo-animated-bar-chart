import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Week } from './types';
import { format } from 'date-fns';
import {
  BAR_CHART_GAP,
  MAX_BAR_HEIGHT,
  SCROLL_VIEW_HEIGHT,
} from '../constants';
import { SingleBarChart } from './SingleBarChart';

interface WeeklyBarChartProps {
  weeks: Week[];
  activeWeekIndex: number;
  onWeekChange: (index: number) => void;
}

export const WeeklyBarChart = ({
  weeks,
  activeWeekIndex,
  onWeekChange,
}: WeeklyBarChartProps) => {
  const activeWeek = weeks[activeWeekIndex];
  const { width } = useWindowDimensions();
  const barChartWidth = width * 0.9;
  const barWidth =
    (barChartWidth - BAR_CHART_GAP * (activeWeek.length - 1)) /
    activeWeek.length;

  return (
    <View style={{ height: SCROLL_VIEW_HEIGHT + MAX_BAR_HEIGHT, width }}>
      <View
        style={{
          flexDirection: 'row',
          gap: BAR_CHART_GAP,
          width: barChartWidth,
          height: MAX_BAR_HEIGHT,
          alignItems: 'flex-end',
          marginHorizontal: (width - barChartWidth) / 2,
        }}
      >
        {activeWeek.map((day, index) => (
          <SingleBarChart
            day={day}
            index={index}
            width={barWidth}
            key={index}
          />
        ))}
      </View>
      <ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum
        scrollEventThrottle={16}
        style={{ height: SCROLL_VIEW_HEIGHT, width }}
        onScroll={({ nativeEvent }) => {
          const scrollOffset = nativeEvent.contentOffset.x;
          const activeIndex = Math.round(scrollOffset / width);
          onWeekChange(activeIndex);
        }}
      >
        {weeks.map((week, index) => (
          <View
            key={index}
            style={{
              height: SCROLL_VIEW_HEIGHT,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.weekTitle}>
              week of {format(week[0].day, 'd MMMM')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  weekTitle: {
    color: 'white',
    fontFamily: 'FiraCode-Regular',
  },
});

import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {VictoryPie} from 'victory-native';
import {category} from '../../store/selectors/StatisticSelectors';

const CategoryChart: FC = () => {
  const date = useSelector(category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category expenses</Text>
      <VictoryPie
        animate
        padAngle={3}
        padding={100}
        innerRadius={40}
        labelRadius={120}
        colorScale={['#240046', '#3c096c', '#7b2cbf', '#9d4edd', '#e0aaff']}
        style={{data: {width: '100%'}}}
        data={date.categories}
      />
      <View style={styles.listContainer}>
        {date.list.map(it => (
          <View key={it.category} style={styles.listItem}>
            <Text style={styles.category}>{it.category}</Text>
            <Text style={styles.percent}>{it.pro}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    marginBottom: -40,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
  },

  listContainer: {
    marginTop: -30,
    width: '100%',
    paddingHorizontal: 40,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },

  category: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },
  percent: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
});

export default CategoryChart;

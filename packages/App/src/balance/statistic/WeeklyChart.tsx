import React, {FC, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {allTransactionsArray} from '../../store/selectors/walletItems';
import {VictoryChart, VictoryBar, VictoryTheme} from 'victory-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {TransactionType} from '../../types/types';

enum DayOfWeek {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 0,
}

interface Props {
  month: number;
}

const WeeklyChart: FC<Props> = ({month}) => {
  const orientation = useDeviceOrientation();
  const allTransactions = useSelector(allTransactionsArray);
  const allTransactionsByMonth = useMemo(() => {
    return allTransactions.filter(it => new Date(it.date).getMonth() === month);
  }, [allTransactions, month]);

  const allTransactionExpenses = useMemo(() => {
    return allTransactionsByMonth
      .filter(it => it.type === TransactionType.expenses)
      .reverse()
      .map(it => ({
        x:
          `${DayOfWeek[new Date(it.date).getDay()]}` +
          ` ${new Date(it.date).getDate()}`,
        day: new Date(it.date).getDate(),
        DayOfWeek: DayOfWeek[new Date(it.date).getDay()],
        y: it.amountTransaction,
      }));
  }, [allTransactionsByMonth]);

  const firstChart = useMemo(() => {
    return allTransactionExpenses.filter(it => it.day <= 6);
  }, [allTransactionExpenses]);
  const secondChart = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.day > 6)
      .filter(it => it.day <= 12);
  }, [allTransactionExpenses]);
  const thirdChart = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.day > 12)
      .filter(it => it.day <= 18);
  }, [allTransactionExpenses]);
  const fourthChart = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.day > 18)
      .filter(it => it.day <= 24);
  }, [allTransactionExpenses]);
  const fifthChart = useMemo(() => {
    return allTransactionExpenses.filter(it => it.day > 24);
  }, [allTransactionExpenses]);

  const arrayOfCharts = [
    firstChart,
    secondChart,
    thirdChart,
    fourthChart,
    fifthChart,
    [],
  ];

  const next = () => {
    if (arrayOfCharts[chartIndex + 1].length !== 0) {
      setChartIndex(prev => prev + 1);
    }
  };

  const prev = () => {
    if (arrayOfCharts[chartIndex - 1]) {
      setChartIndex(prev => prev - 1);
    }
  };

  const [chartIndex, setChartIndex] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.btn} onPress={prev}>
          <Text style={styles.textBtn}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.titleWeekly}>Weekly expenses</Text>
        <TouchableOpacity style={styles.btn} onPress={next}>
          <Text style={styles.textBtn}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chart}>
        <VictoryChart
          height={orientation.landscape ? 250 : 300}
          width={orientation.landscape ? 500 : 400}
          domainPadding={{x: 20}}
          theme={VictoryTheme.material}>
          <VictoryBar
            width={100}
            cornerRadius={12}
            style={{data: {fill: '#212858', width: 30, borderRadius: 30}}}
            data={arrayOfCharts[chartIndex]}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  titleWeekly: {
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
  },

  textBtn: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: 'black',
    fontSize: 15,
  },

  chart: {
    alignItems: 'center',
  },

  title: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 40,
    backgroundColor: '#7CD0FF',
    borderRadius: 30,
  },
});

export default WeeklyChart;

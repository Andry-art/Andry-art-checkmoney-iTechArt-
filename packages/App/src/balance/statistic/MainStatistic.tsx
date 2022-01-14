import React, {FC, useState} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {Months} from '../../types/types';
import MoneyFlow from './MoneyFlow';
import WeeklyChart from './WeeklyChart';
import CategoryChart from './CategoryChart';
import {useSelector} from 'react-redux';
import {allTransactionsArray} from '../../store/selectors/walletItems';
import smileSource from '../../../Pics/smile.png';

const months = [
  Months.January,
  Months.February,
  Months.March,
  Months.April,
  Months.May,
  Months.June,
  Months.July,
  Months.August,
  Months.September,
  Months.October,
  Months.November,
  Months.December,
];

const MainStatistic: FC = () => {
  const [chosenMonth, setChosenMonth] = useState<number>(new Date().getMonth());

  const allTransactions = useSelector(allTransactionsArray);
  const allTransactionsByMonth = allTransactions.filter(
    it => new Date(it.date).getMonth() === chosenMonth,
  );

  const chooseMonth = (month: number) => {
    setChosenMonth(0);
    setChosenMonth(month);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.monthsScroll}>
        {months.map(it => (
          <TouchableOpacity
            key={it}
            onPress={() => chooseMonth(it)}
            style={
              chosenMonth === it
                ? styles.monthsContainerActive
                : styles.monthsContainer
            }>
            <Text
              style={
                chosenMonth === it ? styles.textMonthsActive : styles.textMonths
              }>
              {Months[it]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {allTransactionsByMonth.length === 0 ? (
        <View style={styles.noChart}>
          <Text style={styles.noChartText}>
            There is no statistics for {Months[chosenMonth]}
          </Text>
          <Image source={smileSource} />
        </View>
      ) : (
        <ScrollView style={styles.containerScroll}>
          <MoneyFlow month={chosenMonth} />
          <WeeklyChart month={chosenMonth} />
          <CategoryChart month={chosenMonth} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: 'white',
    marginBottom: 70,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  monthsScroll: {
    backgroundColor: 'white',
    height: 60,
  },

  monthsContainer: {
    padding: 10,
    marginHorizontal: 20,
    height: 55,
  },

  monthsContainerActive: {
    backgroundColor: '#EBEDF8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 30,
    height: 45,
  },

  textMonths: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },

  textMonthsActive: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  noChart: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 150,
  },

  noChartText: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 22,
    marginBottom: 20,
  },
});

export default MainStatistic;

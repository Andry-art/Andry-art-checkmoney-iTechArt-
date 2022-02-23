import React, {FC, useState} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import {Months} from '../../types/types';
import MoneyFlow from './MoneyFlow';
import WeeklyChart from './WeeklyChart';
import CategoryChart from './CategoryChart';
import {useDispatch, useSelector} from 'react-redux';
import {allTransactionsArray} from '../../store/selectors/WalletSelectors';
import smileSource from '../../../pictures/smile.png';
import {setMonth} from '../../store/actions/StatisticActions';
import {
  getMonthSelector,
  weekly,
} from '../../store/selectors/StatisticSelectors';

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
  const dispatch = useDispatch();
  const chosenMonth = useSelector(getMonthSelector);

  const allTransactions = useSelector(allTransactionsArray);
  const allTransactionsByMonth = allTransactions.filter(
    it => new Date(it.date).getMonth() === chosenMonth,
  );

  const chooseMonth = (month: number) => {
    dispatch(setMonth(month));
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
          <SafeAreaView style={styles.container}>
            <MoneyFlow />
            <WeeklyChart />
            <CategoryChart />
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  containerScroll: {
    backgroundColor: 'white',
    marginBottom: 60,
  },

  monthsScroll: {
    backgroundColor: '#F6F6F6',
    padding: 10,
    height: 60,
  },

  monthsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  monthsContainerActive: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    height: '100%',
    borderRadius: 10,
  },

  textMonths: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
  },

  textMonthsActive: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
  },

  noChart: {
    justifyContent: 'center',
    alignItems: 'center',
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

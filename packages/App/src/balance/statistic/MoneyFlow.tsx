import React, {FC, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {allTransactionsArray} from '../../store/selectors/walletItems';
import {TransactionType} from '../../types/types';

interface Props {
  month: number;
}

const MoneyFlow: FC<Props> = ({month}) => {
  const allTransactions = useSelector(allTransactionsArray);
  const allTransactionsByMonth = useMemo(() => {
    return allTransactions.filter(it => new Date(it.date).getMonth() === month);
  }, [allTransactions, month]);
  const allIncomeSum = useMemo(() => {
    return allTransactionsByMonth
      .filter(it => it.type === TransactionType.income)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionsByMonth]);

  const allExpensesSum = useMemo(() => {
    return allTransactionsByMonth
      .filter(it => it.type === TransactionType.expenses)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionsByMonth]);

  let left;
  let OverExpenses;
  let greenPercent;
  let redPercent;
  let styleGreen;
  let styleRed;

  if (allIncomeSum > allExpensesSum) {
    greenPercent = 100 - Math.round((allExpensesSum / allIncomeSum) * 100);
    left = allIncomeSum - allExpensesSum;
    styleGreen = {width: `${greenPercent}%`, opacity: 1};
    styleRed = {opacity: 0};
  }

  if (allIncomeSum < allExpensesSum) {
    redPercent = 100 - Math.round((allIncomeSum / allExpensesSum) * 100);
    OverExpenses = allExpensesSum - allIncomeSum;
    styleGreen = {opacity: 0};
    styleRed = {width: `${redPercent}%`, opacity: 1};
  }

  return (
    <View style={styles.container}>
      <View style={styles.diagram}>
        <View style={styles.scaleContainer}>
          <View style={styles.scaleLeftContainer}>
            <View style={[styles.scaleLeft, styleGreen]} />
          </View>
          <View style={styles.scaleRightContainer}>
            <View style={[styles.scaleRight, styleRed]} />
          </View>
        </View>
      </View>
      <View>
        <View style={styles.listLine}>
          <Text style={styles.title}>Income</Text>
          <Text style={styles.amount}>{allIncomeSum}</Text>
        </View>
        <View style={styles.listLine}>
          <Text style={styles.title}>Expenses</Text>
          <Text style={styles.amount}>{allExpensesSum}</Text>
        </View>
        <View style={styles.listLine}>
          <Text style={styles.title}>Left</Text>
          <Text style={styles.amountLeft}>{left ? left : 0}</Text>
        </View>
        <View style={styles.listLine}>
          <Text style={styles.title}>OverExpenses</Text>
          <Text style={styles.amountOverExpenses}>
            {OverExpenses ? -OverExpenses : 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#404CB2',
  },

  diagram: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scaleContainer: {
    justifyContent: 'flex-end',
    width: '60%',
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    flexDirection: 'row',
    marginVertical: 20,
  },

  scaleLeftContainer: {
    flexDirection: 'row-reverse',
    width: '50%',
    height: 50,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightColor: 'black',
    borderRightWidth: 2,
  },
  scaleLeft: {
    width: '30%',
    height: 50,
    backgroundColor: 'green',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  scaleRightContainer: {
    width: '50%',
    height: 50,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftColor: 'black',
    borderLeftWidth: 2,
  },

  scaleRight: {
    width: '50%',
    height: 50,
    backgroundColor: 'red',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },

  listLine: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },

  title: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 16,
  },

  amount: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  amountLeft: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'green',
    fontSize: 18,
  },

  amountOverExpenses: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'red',
    fontSize: 18,
  },
});

export default MoneyFlow;

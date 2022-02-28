import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {flow} from '../../store/selectors/StatisticSelectors';

const MoneyFlow: FC = () => {
  const data = useSelector(flow);

  return (
    <View style={styles.container}>
      <View style={styles.diagram}>
        <View style={styles.scaleContainer}>
          <View style={styles.scaleLeftContainer}>
            <View style={[styles.scaleLeft, data.styleGreen]} />
          </View>
          <View style={styles.scaleRightContainer}>
            <View style={[styles.scaleRight, data.styleRed]} />
          </View>
        </View>
      </View>
      <View>
        <View style={styles.listLine}>
          <Text style={styles.title}>Income</Text>
          <Text style={styles.amount}>{data.allIncomeSum}</Text>
        </View>
        <View style={styles.listLine}>
          <Text style={styles.title}>Expenses</Text>
          <Text style={styles.amount}>{data.allExpensesSum}</Text>
        </View>
        <View style={styles.listLine}>
          <Text style={styles.title}>Left</Text>
          <Text style={styles.amountLeft}>
            {data.left ? Math.round(data.left * 100) / 100 : 0}
          </Text>
        </View>
        <View style={styles.listLine}>
          <Text style={styles.title}>OverExpenses</Text>
          <Text style={styles.amountOverExpenses}>
            {data.overExpenses ? -Math.round(data.overExpenses * 100) / 100 : 0}
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

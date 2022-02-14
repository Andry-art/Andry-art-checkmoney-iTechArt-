import React, {FC, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {allTransactionsArray} from '../../store/selectors/walletItems';
import {VictoryPie} from 'victory-native';
import {TransactionType} from '../../types/types';

enum Category {
  Car = 'Car',
  Health = 'Health',
  Unknown = 'Unknown',
  Grocery = 'Grocery',
  Shopping = 'Shopping',
  Restaurant = 'Restaurant',
}

interface Props {
  month: number;
}

const CategoryChart: FC<Props> = ({month}) => {
  const allTransactions = useSelector(allTransactionsArray);
  const allTransactionsByMonth = useMemo(() => {
    return allTransactions.filter(it => new Date(it.date).getMonth() === month);
  }, [allTransactions, month]);
  const allTransactionExpenses = useMemo(() => {
    return allTransactionsByMonth.filter(
      it => it.type === TransactionType.expenses,
    );
  }, [allTransactionsByMonth]);
  const allTransactionExpensesSum = useMemo(() => {
    return allTransactionExpenses.reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);
  }, [allTransactionExpenses]);

  const categoryUnknownSum = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.category === Category.Unknown)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionExpenses]);

  const categoryGrocerySum = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.category === Category.Grocery)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionExpenses]);

  const categoryHealthSum = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.category === Category.Health)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionExpenses]);

  const categoryRestaurantSum = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.category === Category.Restaurant)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionExpenses]);

  const categoryShoppingSum = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.category === Category.Shopping)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionExpenses]);

  const categoryCarSum = useMemo(() => {
    return allTransactionExpenses
      .filter(it => it.category === Category.Car)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);
  }, [allTransactionExpenses]);

  const allCategoriesData = [
    {x: Category.Car, y: categoryCarSum},
    {x: Category.Grocery, y: categoryGrocerySum},
    {x: Category.Health, y: categoryHealthSum},
    {x: Category.Restaurant, y: categoryRestaurantSum},
    {x: Category.Unknown, y: categoryUnknownSum},
    {x: Category.Shopping, y: categoryShoppingSum},
  ];

  const CategoriesWasUsed = allCategoriesData.filter(it => it.y > 0);

  const list = CategoriesWasUsed.map(it => {
    return {
      category: it.x,
      pro: `${Math.round((it.y / allTransactionExpensesSum) * 100)}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category expenses</Text>
      <VictoryPie
        padAngle={3}
        padding={300}
        innerRadius={40}
        labelRadius={140}
        colorScale={['#240046', '#3c096c', '#7b2cbf', '#9d4edd', '#e0aaff']}
        style={{data: {width: '100%'}}}
        data={CategoriesWasUsed}
      />
      <View style={styles.listContainer}>
        {list.map(it => (
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
    marginBottom: -220,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
  },

  listContainer: {
    marginTop: -180,
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

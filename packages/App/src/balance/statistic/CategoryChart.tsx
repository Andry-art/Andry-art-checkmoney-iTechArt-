import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {walletItems} from '../../store/selectors/walletItems';
import {VictoryPie} from 'victory-native';

enum TransactionType {
  income = 'income',
  expenses = 'expenses',
}

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
  const trans = useSelector(walletItems);

  const allTransactions = trans.map(it => it.transactions).flat();
  const allTransactionsByMonth = allTransactions.filter(
    it => new Date(it.date).getMonth() === month,
  );
  const allTransactionExpenses = allTransactionsByMonth.filter(
    it => it.type === TransactionType.expenses,
  );

  const allTransactionExpensesSum = allTransactionExpenses.reduce(
    (sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    },
    0,
  );

  const categoryUnknownSum = allTransactionExpenses
    .filter(it => it.category === Category.Unknown)
    .reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);

  const categoryGrocerySum = allTransactionExpenses
    .filter(it => it.category === Category.Grocery)
    .reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);

  const categoryHealthSum = allTransactionExpenses
    .filter(it => it.category === Category.Health)
    .reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);

  const categoryRestaurantSum = allTransactionExpenses
    .filter(it => it.category === Category.Restaurant)
    .reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);

  const categoryShoppingSum = allTransactionExpenses
    .filter(it => it.category === Category.Shopping)
    .reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);

  const categoryCarSum = allTransactionExpenses
    .filter(it => it.category === Category.Car)
    .reduce((sum, cur) => {
      return (sum * 100 + cur.amountTransaction * 100) / 100;
    }, 0);

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

  console.log(allTransactionExpensesSum);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category expenses</Text>
      <VictoryPie
        padAngle={3}
        padding={100}
        innerRadius={40}
        labelRadius={120}
        categories={{x: ['Unknown', 'Grocery', 'car', '222']}}
        colorScale={['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8']}
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

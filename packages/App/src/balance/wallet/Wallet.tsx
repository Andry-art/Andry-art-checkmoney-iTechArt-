import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import WalletItem from './WalletItem';
import Button from './Button';
import incomeIconSource from '../../../Pics/balance/income.png';
import expensesIconSource from '../../../Pics/balance/expense.png';
import allCategoriesIconSource from '../../../Pics/balance/category.png';
import addNewIconSource from '../../../Pics/balance/add.png';
import Categories from './Categories';
import {ViewabilityConfig} from 'react-native';
import iconCarSource from '../../../Pics/categories/car.png';
import iconHealthSource from '../../../Pics/categories/heart-beat.png';
import iconGrocerySource from '../../../Pics/categories/food.png';
import iconUnknownSource from '../../../Pics/categories/question.png';
import iconShoppingSource from '../../../Pics/categories/shop-bag.png';
import iconRestaurantSource from '../../../Pics/categories/restaurant.png';
import iconSalarySource from '../../../Pics/categories/money.png';

const wallets = [
  {
    key: '01',
    color: '#74EA8E',
    walletTitle: 'cash',
    walletAmount: '450$',
    transactions: [
      {
        type: 'income',
        amount: 200,
        category: 'salary',
        date: '20.09.2020',
        icon: iconSalarySource,
      },
      {
        type: 'income',
        amount: 50,
        category: 'unknown',
        date: '20.09.2020',
        icon: iconUnknownSource,
      },
      {
        type: 'expenses',
        amount: 40,
        category: 'car',
        date: '24.09.2020',
        icon: iconCarSource,
      },
      {
        type: 'expenses',
        amount: 27,
        category: 'shopping',
        date: '26.09.2020',
        icon: iconShoppingSource,
      },
      {
        type: 'expenses',
        amount: 210,
        category: 'restaurant',
        date: '27.09.2020',
        icon: iconRestaurantSource,
      },
      {
        type: 'expenses',
        amount: 63,
        category: 'health',
        date: '27.09.2020',
        icon: iconHealthSource,
      },
    ],
  },

  {
    key: '02',
    color: '#8D45A7',
    walletTitle: 'card',
    walletAmount: '550$',
    transactions: [
      {
        type: 'expenses',
        amount: 40,
        category: 'grocery',
        date: '20.09.2020',
        icon: iconGrocerySource,
      },
      {
        type: 'expenses',
        amount: 200,
        category: 'car',
        date: '20.09.2020',
        icon: iconCarSource,
      },
      {
        type: 'expenses',
        amount: 50,
        category: 'unknown',
        date: '20.09.2020',
        icon: iconSalarySource,
      },
      {
        type: 'income',
        amount: 50,
        category: 'unknown',
        date: '20.09.2020',
        icon: iconUnknownSource,
      },
      {
        type: 'expenses',
        amount: 40,
        category: 'car',
        date: '24.09.2020',
        icon: iconCarSource,
      },
    ],
  },
];

const viewability: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

const Wallet = () => {
  const [itemVisible, setItemVisible] = useState<number>(0);
  const [inCome, setInCome] = useState(wallets[itemVisible].transactions);

  const filterInCome = () => {
    setInCome(
      wallets[itemVisible].transactions.filter(it => it.type === 'income'),
    );
  };

  const filterExpenses = () => {
    setInCome(
      wallets[itemVisible].transactions.filter(it => it.type === 'expenses'),
    );
  };

  const allCategories = () => {
    setInCome(wallets[itemVisible].transactions);
  };

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    setItemVisible(viewableItems[0].index);
  }, []);

  useEffect(() => {
    setInCome(wallets[itemVisible].transactions);
  }, [itemVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.wallet}>
        <Text style={styles.title}>Wallet</Text>
        <Text>
          {wallets.reduce((sum, cur) => {
            return (
              sum +
              Number(
                cur.walletAmount
                  .split('')
                  .filter(it => !isNaN(Number(it)))
                  .join(''),
              )
            );
          }, 0)}
          $
        </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={wallets}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <WalletItem
              title={item.walletTitle}
              amount={item.walletAmount}
              color={item.color}
            />
          )}
          centerContent={true}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
          viewabilityConfig={viewability}
          onViewableItemsChanged={viewableItemsChanged}
        />
      </View>
      <View style={styles.buttonArea}>
        <Button
          title="Incoming"
          picture={incomeIconSource}
          onPress={filterInCome}
        />
        <Button
          title="Expenses"
          picture={expensesIconSource}
          onPress={filterExpenses}
        />
        <Button
          title="All actions "
          picture={allCategoriesIconSource}
          onPress={allCategories}
        />
        <Button title="New card" picture={addNewIconSource} />
      </View>
      <View style={styles.categoriesList}>
        <View style={styles.categoriesListTitle}>
          <Text style={styles.categoriesListText}>All categories</Text>
        </View>
        <FlatList
          data={inCome}
          keyExtractor={(item, ind) => String(ind + item.amount)}
          renderItem={({item}) => (
            <Categories
              category={item.category}
              amount={item.amount}
              date={item.date}
              type={item.type}
              icon={item.icon}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EBF2F5',
  },

  list: {
    height: '30%',
  },

  wallet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    paddingHorizontal: 20,
    backgroundColor: '#CBE5F2',
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },

  buttonArea: {
    flexDirection: 'row',
    margin: 20,
    height: '10%',
  },
  categoriesList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  categoriesListTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoriesListText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Wallet;

import React, {useCallback, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import WalletItem from './WalletItem';
import Button from './Button';
import incomeIconSource from '../../../Pics/balance/income.png';
import expensesIconSource from '../../../Pics/balance/expense.png';
import allCategoriesIconSource from '../../../Pics/balance/category.png';
import addNewIconSource from '../../../Pics/balance/add.png';
import Categories from './Categories';
import {ViewabilityConfig} from 'react-native';
import {WalletItems} from '../../store/selectors/walletItems';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterInComeItems,
  filterExpensesItems,
  getAllItemWallet,
} from '../../store/actions/walletActions';

const viewability: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

const Wallet = () => {
  const dispatch = useDispatch();
  const receivedWalletItems = useSelector(WalletItems);

  const [itemVisible, setItemVisible] = useState<number>(0);

  const filterInCome = () => {
    dispatch(filterInComeItems(itemVisible));
  };

  const filterExpenses = () => {
    dispatch(filterExpensesItems(itemVisible));
  };

  const allCategories = () => {
    dispatch(getAllItemWallet());
  };

  const newCard = () => {};

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    setItemVisible(viewableItems[0].index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wallet}>
        <Text style={styles.title}>Wallet</Text>
        <Text>
          {receivedWalletItems.reduce((sum, cur) => {
            return (sum * 100 + cur.walletAmount * 100) / 100;
          }, 0)}
          $
        </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={receivedWalletItems}
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
        <Button title="New card" picture={addNewIconSource} onPress={newCard} />
      </View>
      <View style={styles.categoriesList}>
        <View style={styles.categoriesListTitle}>
          <Text style={styles.categoriesListText}>All categories</Text>
        </View>
        <FlatList
          data={receivedWalletItems[itemVisible].transactions}
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

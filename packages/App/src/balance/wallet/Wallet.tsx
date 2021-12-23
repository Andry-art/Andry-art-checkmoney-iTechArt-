import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import WalletItem from './WalletItem';
import Button from './Button';
import incomeIconSource from '../../../Pics/balance/income.png';
import expensesIconSource from '../../../Pics/balance/expense.png';
import allCategoriesIconSource from '../../../Pics/balance/category.png';
import addNewIconSource from '../../../Pics/balance/add.png';
import Categories from './Categories';

const cards = [
  {key: '1', balance: '200$'},
  {key: '2', balance: '400$'},
  {key: '3', balance: '600$'},
];

const categories = [
  {key: '1', balance: '200$'},
  {key: '2', balance: '400$'},
  {key: '3', balance: '600$'},
  {key: '4', balance: '200$'},
  {key: '5', balance: '400$'},
  {key: '6', balance: '600$'},
  {key: '7', balance: '200$'},
  {key: '8', balance: '400$'},
  {key: '9', balance: '600$'},
  {key: '10', balance: '200$'},
  {key: '11', balance: '400$'},
  {key: '13', balance: '600$'},
  {key: '14', balance: '200$'},
  {key: '22', balance: '400$'},
  {key: '33', balance: '600$'},
  {key: '16', balance: '200$'},
  {key: '21', balance: '400$'},
  {key: '35', balance: '600$'},
];

const Wallet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wallet}>
        <Text style={styles.title}>Wallet</Text>
        <Text>
          {cards.reduce((sum, cur) => {
            return (
              sum +
              Number(
                cur.balance
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
          data={cards}
          keyExtractor={item => item.key}
          renderItem={({item}) => <WalletItem item={item} />}
          centerContent={true}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
        />
      </View>
      <View style={styles.buttonArea}>
        <Button title="Incoming" picture={incomeIconSource} color="#119C1F" />
        <Button title="Expenses" picture={expensesIconSource} color="#FF0505" />
        <Button
          title="All actions "
          picture={allCategoriesIconSource}
          color="#A8F5FF"
        />
        <Button title="New card" picture={addNewIconSource} color="#7837E2" />
      </View>
      <View style={styles.categoriesList}>
        <View style={styles.categoriesListTitle}>
          <Text style={styles.categoriesListText}>All categories</Text>
        </View>
        <FlatList
          data={categories}
          keyExtractor={item => item.key}
          renderItem={({item}) => <Categories item={item} />}
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

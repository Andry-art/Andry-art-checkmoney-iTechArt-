import React, {useCallback, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import WalletItem from './WalletItem';
import Button from './Button';
import incomeIconSource from '../../../Pics/balance/income.png';
import expensesIconSource from '../../../Pics/balance/expense.png';
import allCategoriesIconSource from '../../../Pics/balance/category.png';
import addNewIconSource from '../../../Pics/balance/add.png';
import Transactions from './Transactions';
import {ViewabilityConfig} from 'react-native';
import {WalletItems, IsLoadingWallet} from '../../store/selectors/walletItems';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterInComeItems,
  filterExpensesItems,
  getAllItemWallet,
  deleteWalletCard,
  cardMonetaryMove,
  deleteTransactionAction,
  correctTransactionInfo,
} from '../../store/actions/walletActions';
import Loading from '../../components/Loading';
import {WalletInfo} from '../../types/types';
import CardModal from './CardModal';

const viewability: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

const Wallet = ({navigation}: any) => {
  const dispatch = useDispatch();

  const receivedWalletItems = useSelector(WalletItems);

  const isLoading = useSelector(IsLoadingWallet);

  const [itemVisible, setItemVisible] = useState<number>(0);
  const [modalCardVisible, setModalCardVisible] = useState<boolean>(false);
  const [modalTransactionVisible, setModalTransactionVisible] =
    useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);
  const [transactionKey, setTransactionKey] = useState<{
    keyTransaction: number;
    amount: number;
    type: string;
  }>({keyTransaction: 0, amount: 0, type: ''});
  const [refItem, setRefItem] = useState<FlatList<WalletInfo> | null>();

  const filterInCome = () => {
    dispatch(filterInComeItems(itemVisible));
  };

  const filterExpenses = () => {
    dispatch(filterExpensesItems(itemVisible));
  };

  const allCategories = () => {
    dispatch(getAllItemWallet());
  };

  const newCard = () => {
    navigation.navigate('NewCard');
  };

  const toAddMonetaryMovements = (
    key: number,
    amount: number,
    title: string,
  ) => {
    dispatch(cardMonetaryMove({key, amount, title}));
    navigation.navigate('addMonetaryMovements');
  };

  const showModal = (id: number) => {
    setCardId(id);
    setModalCardVisible(true);
  };

  const deleteCard = () => {
    dispatch(deleteWalletCard(cardId));
    setItemVisible(0);
    refItem?.scrollToIndex({animated: true, index: 0});
    setModalCardVisible(false);
  };

  const showModalTransaction = (
    keyTransaction: number,
    amount: number,
    type: string,
  ) => {
    setTransactionKey({keyTransaction, amount, type});
    setModalTransactionVisible(true);
  };

  const deleteTransaction = () => {
    const item = receivedWalletItems[itemVisible];
    dispatch(deleteTransactionAction({item, transactionKey}));
    setModalTransactionVisible(false);
  };

  const correctTransaction = (
    keyTransaction: number,
    category: string,
    date: string,
    amount: number,
    type: string,
    icon: string,
  ) => {
    const key = keyTransaction;
    const idCard = receivedWalletItems[itemVisible].key;
    dispatch(
      correctTransactionInfo({key, amount, category, date, type, icon, idCard}),
    );
    navigation.navigate('correctTransaction');
  };

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    setItemVisible(viewableItems[0].index);
  }, []);

  if (isLoading) {
    <Loading />;
  }

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

      <CardModal
        title=" Would you like to delete card?"
        visible={modalCardVisible}
        onPressDelete={deleteCard}
        onPressHide={setModalCardVisible}
      />

      <View style={styles.list}>
        <FlatList
          data={receivedWalletItems}
          keyExtractor={item => String(item.key)}
          renderItem={({item}) => (
            <WalletItem
              keyCard={item.key}
              title={item.walletTitle}
              amount={item.walletAmount}
              color={item.color}
              onLongPress={showModal}
              onPress={toAddMonetaryMovements}
            />
          )}
          centerContent={true}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
          viewabilityConfig={viewability}
          onViewableItemsChanged={viewableItemsChanged}
          ref={ref => setRefItem(ref)}
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

        <CardModal
          title="Would you like to delete transaction?"
          visible={modalTransactionVisible}
          onPressDelete={deleteTransaction}
          onPressHide={setModalTransactionVisible}
        />
        <FlatList
          data={receivedWalletItems[itemVisible].transactions}
          keyExtractor={item => String(item.keyTransaction)}
          renderItem={({item}) => (
            <Transactions
              category={item.category}
              amount={item.amountTransaction}
              date={item.date}
              type={item.type}
              icon={item.icon}
              keyTransaction={item.keyTransaction}
              onLongPress={showModalTransaction}
              onPress={correctTransaction}
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

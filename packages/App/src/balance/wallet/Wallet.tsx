import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, Alert} from 'react-native';
import WalletItem from './WalletItem';
import Button from './Button';
import incomeIconSource from '../../../Pics/balance/income.png';
import expensesIconSource from '../../../Pics/balance/expense.png';
import allCategoriesIconSource from '../../../Pics/balance/category.png';
import addNewIconSource from '../../../Pics/balance/add.png';
import Transactions from './Transactions';
import {ViewabilityConfig} from 'react-native';
import {
  walletItems,
  isLoadingWallet,
  walletsAmount,
  filtersError,
  deleteCardError,
  addNewCardError,
  filteredIncome,
  filteredExp,
  getError,
} from '../../store/selectors/walletItems';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterInComeRequest,
  filterExpensesRequest,
  deleteWalletCardRequest,
  cardMonetaryMove,
  deleteTransactionRequest,
  correctTransactionInfo,
  filterAllItemsRequest,
} from '../../store/actions/walletActions';
import Loading from '../../components/Loading';
import {
  WalletNavigatorList,
  WalletInfo,
  ITransactions,
} from '../../types/types';
import CardModal from '../../components/CardModal';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDeviceOrientation} from '@react-native-community/hooks/lib/useDeviceOrientation';

const viewability: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 10,
};

const keyExtractorForCards = (item: WalletInfo) => String(item.id);
const keyExtractorForTransactions = (item: ITransactions) =>
  String(item.keyTransaction);

interface Props {
  navigation: NativeStackNavigationProp<WalletNavigatorList>;
}

const Wallet: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const orientation = useDeviceOrientation();
  const receivedWalletItems = useSelector(walletItems);
  const filterIncome = useSelector(filteredIncome);
  const filteredExpenses = useSelector(filteredExp);
  const receivedSum = useSelector(walletsAmount);
  const isLoading = useSelector(isLoadingWallet);
  const errorFilters = useSelector(filtersError);
  const errorDeleteCard = useSelector(deleteCardError);
  const errorAddCard = useSelector(addNewCardError);
  const getErrorInfo = useSelector(getError);

  const [itemVisible, setItemVisible] = useState<number>(0);
  const [isModalCardVisible, setIsModalCardVisible] = useState<boolean>(false);
  const [isModalTransactionVisible, setIsModalTransactionVisible] =
    useState<boolean>(false);
  const [cardId, setCardId] = useState<number>(0);
  const [transactionKey, setTransactionKey] = useState<{
    keyTransaction: number;
    amount: number;
    type: string;
  }>({keyTransaction: 0, amount: 0, type: ''});
  const [refItem, setRefItem] = useState<FlatList<WalletInfo> | null>();
  const [chosenBtn, setChosenBtn] = useState<string>('All actions');

  const filterInCome = (title: string) => {
    setChosenBtn(title);
    dispatch(filterInComeRequest());
  };

  const filterExpenses = (title: string) => {
    setChosenBtn(title);
    dispatch(filterExpensesRequest());
  };

  const allCategories = (title: string) => {
    setChosenBtn(title);
    dispatch(filterAllItemsRequest());
  };

  const newCard = () => {
    navigation.navigate('New Card');
  };

  const toAddMonetaryMovements = (
    key: number,
    amount: number,
    title: string,
  ) => {
    dispatch(cardMonetaryMove({key, amount, title}));
    navigation.navigate('Add Transaction');
  };

  const showModal = (id: number) => {
    setCardId(id);
    setIsModalCardVisible(true);
  };

  const deleteCard = () => {
    dispatch(deleteWalletCardRequest(cardId));
    setItemVisible(0);
    refItem?.scrollToIndex({animated: true, index: 0});
    setIsModalCardVisible(false);
  };

  const showModalTransaction = (
    keyTransaction: number,
    amount: number,
    type: string,
  ) => {
    setTransactionKey({keyTransaction, amount, type});
    setIsModalTransactionVisible(true);
  };

  const deleteTransaction = () => {
    const item = receivedWalletItems[itemVisible];
    dispatch(deleteTransactionRequest({item, transactionKey}));
    setIsModalTransactionVisible(false);
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
    navigation.navigate('Correct Transaction');
  };

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    setItemVisible(viewableItems[0].index);
  }, []);

  if (errorFilters) {
    Alert.alert(errorFilters);
  }

  useEffect(() => {
    if (errorDeleteCard) {
      Alert.alert(errorDeleteCard);
    }
    if (errorAddCard) {
      Alert.alert(errorAddCard);
    }
    if (getErrorInfo) {
      Alert.alert(getErrorInfo);
    }
  }, [errorDeleteCard, errorAddCard, getErrorInfo]);

  if (isLoading) {
    <Loading />;
  }

  return (
    <View style={styles.container}>
      <CardModal
        title="Would you like to delete transaction?"
        isVisible={isModalTransactionVisible}
        onPressDelete={deleteTransaction}
        onPressHide={setIsModalTransactionVisible}
      />

      <CardModal
        title=" Would you like to delete card?"
        isVisible={isModalCardVisible}
        onPressDelete={deleteCard}
        onPressHide={setIsModalCardVisible}
      />

      <View
        style={orientation.landscape ? styles.walletLandscape : styles.wallet}>
        <Text style={styles.title}>TOTAL BALANCE</Text>
        <Text style={styles.titleAmount}>{receivedSum}$</Text>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.list}>
                <FlatList
                  data={receivedWalletItems}
                  keyExtractor={keyExtractorForCards}
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

              <View style={styles.categoriesListTitle}>
                <View style={styles.buttonArea}>
                  <Button
                    title="All actions"
                    picture={allCategoriesIconSource}
                    onPress={allCategories}
                    chosen={chosenBtn}
                  />
                  <Button
                    title="Incoming"
                    picture={incomeIconSource}
                    onPress={filterInCome}
                    chosen={chosenBtn}
                  />
                  <Button
                    title="Expenses"
                    picture={expensesIconSource}
                    onPress={filterExpenses}
                    chosen={chosenBtn}
                  />

                  <Button
                    title="New card"
                    picture={addNewIconSource}
                    onPress={newCard}
                    chosen={chosenBtn}
                  />
                </View>
                <Text style={styles.categoriesListText}>All categories</Text>
              </View>
            </>
          }
          data={
            chosenBtn === 'All actions'
              ? receivedWalletItems[itemVisible].transactions
              : chosenBtn === 'Incoming'
              ? filterIncome[itemVisible].transactions
              : filteredExpenses[itemVisible].transactions
          }
          keyExtractor={keyExtractorForTransactions}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  list: {
    height: 100,
  },

  wallet: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },

  walletLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#A8ADDD',
    fontSize: 14,
  },

  titleAmount: {
    fontWeight: '600',
    fontSize: 32,
    color: 'black',
  },

  buttonArea: {
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 3,
    borderRadius: 8,
    marginTop: 20,
  },
  categoriesList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  categoriesListTitle: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
  },

  categoriesListTitleBack: {
    backgroundColor: '#EDEFFE',
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

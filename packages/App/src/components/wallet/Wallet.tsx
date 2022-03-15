import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import WalletItem from './WalletItem';
import Button from './Button';
import incomeIconSource from '../../../pictures/balance/income.png';
import expensesIconSource from '../../../pictures/balance/expense.png';
import allCategoriesIconSource from '../../../pictures/balance/category.png';
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
} from '../../store/selectors/WalletSelectors';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteWalletCardRequest,
  cardMonetaryMove,
  deleteTransactionRequest,
  correctTransactionInfo,
} from '../../store/actions/WalletActions';
import Loading from '../Loading';
import {
  WalletNavigatorList,
  WalletInfo,
  ITransactions,
  DebitType,
  TransactionType,
} from '../../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDeviceOrientation} from '@react-native-community/hooks/lib/useDeviceOrientation';
import NetInfo from '@react-native-community/netinfo';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import {walletName} from '../../store/selectors/DebitSelectors';
import {addDebitInfo} from '../../store/actions/DebitsActions';

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
  let chosenWallet = useSelector(walletName);
  const [itemVisible, setItemVisible] = useState<number>(0);
  const [refItem, setRefItem] = useState<FlatList<WalletInfo> | null>();
  const [chosenBtn, setChosenBtn] = useState<string>('All actions');
  const [isConnection, setIsConnection] = useState<boolean>(true);
  const [lastTime, setLastTime] = useState<Date>();

  useEffect(() => {
    setIsConnection(true);
    return NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        setIsConnection(false);
      }
      if (state.isConnected === true) {
        setIsConnection(true);
        setLastTime(new Date());
      }
    });
  }, []);

  if (isConnection === false) {
    if (lastTime) {
      Alert.alert(
        'No internet',
        `Last time connection was ${dayjs(lastTime).format('DD MMM, hh:mm')}`,
      );
    }
    if (!lastTime) {
      Alert.alert('No internet connection');
    }
  }

  const filterInCome = (title: string) => {
    setChosenBtn(title);
  };

  const filterExpenses = (title: string) => {
    setChosenBtn(title);
  };

  const allCategories = (title: string) => {
    setChosenBtn(title);
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
    Alert.alert(' Would you like to delete card?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const indexCard = itemVisible - 1;
          dispatch(deleteWalletCardRequest(id));
          setItemVisible(0);
          refItem?.scrollToIndex({animated: true, index: indexCard});
        },
      },
    ]);
  };

  const showModalTransaction = (
    keyTransaction: number,
    amountTransaction: number,
    type: string,
  ) => {
    const transactionKey = {keyTransaction, amountTransaction, type};
    let item;

    Alert.alert('Would you like to delete transaction?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          if (chosenWallet) {
            if (type === DebitType.toYou) {
              chosenWallet = {
                ...chosenWallet,
                walletAmount: chosenWallet.walletAmount + amountTransaction,
              };
            }
            if (type === DebitType.yourDebit) {
              chosenWallet = {
                ...chosenWallet,
                walletAmount: chosenWallet.walletAmount - amountTransaction,
              };
            }

            if (chosenWallet?.walletAmount < 0) {
              Alert.alert('Going to be minus, delete?', '', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    if (chosenWallet) {
                      item = chosenWallet;
                    }
                    item = receivedWalletItems[itemVisible];
                    dispatch(deleteTransactionRequest({item, transactionKey}));
                  },
                },
              ]);
            }
            item = chosenWallet;
            dispatch(deleteTransactionRequest({item, transactionKey}));
          }
          if (
            type === TransactionType.expenses ||
            type === TransactionType.income
          ) {
            item = receivedWalletItems[itemVisible];
            dispatch(deleteTransactionRequest({item, transactionKey}));
          }
        },
      },
    ]);
  };

  const correctTransaction = (
    keyTransaction: number,
    category: string,
    date: string,
    amount: number,
    type: string,
    icon: string,
    keyOfWallet?: number,
    person?: string,
  ) => {
    const key = keyTransaction;
    const idCard = receivedWalletItems[itemVisible].key;
    if (type === TransactionType.expenses || type === TransactionType.income) {
      dispatch(
        correctTransactionInfo({
          key,
          amount,
          category,
          date,
          type,
          icon,
          idCard,
        }),
      );
      navigation.navigate('Correct Transaction');
    }
    if (keyOfWallet && person) {
      dispatch(
        addDebitInfo({
          type,
          keyOfWallet,
          keyTransaction,
          date,
          person,
          amountTransaction: amount,
        }),
      );
      navigation.navigate('Debit Info');
    }
  };

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length !== 0) {
      setItemVisible(viewableItems[0].index);
    }
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

  const {width} = useWindowDimensions();

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.cardContainer, {width}],
    [width],
  );

  return (
    <View style={styles.container}>
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
                      navigation={navigation}
                    />
                  )}
                  centerContent={true}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  pagingEnabled
                  viewabilityConfig={viewability}
                  onViewableItemsChanged={viewableItemsChanged}
                  ref={ref => setRefItem(ref)}
                  ListFooterComponent={
                    <View style={viewStyle}>
                      <TouchableOpacity onPress={newCard}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['#F6F6F6', '#D0D0D0']}
                          style={styles.newCard}>
                          <Text style={styles.plus}>+</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  }
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
            <SafeAreaView>
              <Transactions
                category={item.category}
                amount={item.amountTransaction}
                date={item.date}
                type={item.type}
                icon={item.icon}
                keyTransaction={item.keyTransaction}
                keyOfWallet={item.keyOfWallet || 0}
                person={item.person || ''}
                onLongPress={showModalTransaction}
                onPress={correctTransaction}
              />
            </SafeAreaView>
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
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    marginVertical: 10,
  },

  cardContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },

  newCard: {
    alignItems: 'center',
    backgroundColor: '#74EA8E',
    height: 200,
    borderRadius: 30,
    marginHorizontal: 35,
    padding: 24,
    elevation: 3,
  },

  plus: {
    fontSize: 60,
    color: 'white',
  },
});

export default Wallet;

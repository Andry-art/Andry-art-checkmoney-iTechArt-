import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {monetaryMove} from '../../store/selectors/WalletSelectors';
import CategoriesInAddMoneyMove from './CategoriesInAddMoneyMove';
import {walletItems} from '../../store/selectors/WalletSelectors';
import {addTransactionRequest} from '../../store/actions/RalletActions';
import {
  WalletNavigatorList,
  ChosenCategory,
  Expenses,
  Income,
  Locations,
} from '../../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {TransactionType} from '../../types/types';
import addTransactionSource from '../../../pictures/balance/income.png';
import MapView, {Marker} from 'react-native-maps';
import Input from '../Input';
import ButtonApp from '../ButtonApp';
import GetLocation from 'react-native-get-location';
import Switcher from '../Switcher';

const income: Income = ['iconUnknownSource', 'iconSalarySource'];
const expenses: Expenses = [
  'iconUnknownSource',
  'iconCarSource',
  'iconHealthSource',
  'iconGrocerySource',
  'iconShoppingSource',
  'iconRestaurantSource',
];

interface Props {
  navigation: NativeStackNavigationProp<WalletNavigatorList>;
}

const initialValues = {
  amount: '',
};

const transactionSchema = yup.object({
  amount: yup.string().required('Amount is required'),
});

const AddMonetaryMovements: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {key, amount, title} = useSelector(monetaryMove);
  const [moneyMoveType, setMoneyMoveType] = useState<string>(
    TransactionType.expenses,
  );
  const [categoryInfo, setCategoryInfo] = useState<ChosenCategory>({
    icon: 'iconUnknownSource',
    category: '',
  });

  const [chooseLocation, setChooseLocation] = useState<boolean>(false);

  const [markLocation, setMarkLocation] = useState<Locations>({
    latitude: 53.902287,
    longitude: 27.561824,
  });

  const receivedWalletItems = useSelector(walletItems);

  const {handleChange, handleSubmit, values, errors} = useFormik<{
    amount: string;
  }>({
    initialValues: initialValues,
    validationSchema: transactionSchema,
    onSubmit: values => {
      const amountTransaction =
        Math.round(
          Number(
            values.amount
              .replace(/\,/g, '.')
              .replace(/[^.\d]+/g, '')
              .replace(/^([^\.]*\.)|\./g, '$1'),
          ) * 100,
        ) / 100;
      const type = moneyMoveType;
      const icon = categoryInfo.icon ? categoryInfo.icon : 'iconUnknownSource';
      const category = categoryInfo.category
        ? categoryInfo.category
        : 'Unknown';
      const chosenWallet = receivedWalletItems.find(it => it.key === key);
      const coordinate = chooseLocation ? markLocation : {};
      if (chosenWallet !== undefined) {
        const keyTransaction =
          chosenWallet.transactions.length === 0
            ? 1
            : chosenWallet.transactions[0].keyTransaction + 1;

        const date = new Date(Date.now());

        if (
          type === 'expenses' &&
          chosenWallet.walletAmount - amountTransaction < 0
        ) {
          Alert.alert('Not enough money');
        }

        if (
          type === 'income' ||
          chosenWallet.walletAmount - amountTransaction >= 0
        ) {
          dispatch(
            addTransactionRequest({
              item: chosenWallet,
              transaction: {
                keyTransaction,
                type,
                amountTransaction,
                category,
                icon,
                date,
                coordinate,
              },
            }),
          );
          navigation.goBack();
        }
      }
    },
  });

  const getLocation = async () => {
    return await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 50000,
    }).then(res =>
      setMarkLocation({latitude: res.latitude, longitude: res.longitude}),
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>{title?.toUpperCase()}</Text>
        <Text style={styles.textAmount}>{Math.round(amount * 100) / 100}$</Text>
      </View>
      <Switcher
        choosenBtn={moneyMoveType}
        onPressFirst={() => setMoneyMoveType(TransactionType.expenses)}
        onPressSecond={() => setMoneyMoveType(TransactionType.income)}
        titleFirst={TransactionType.expenses}
        titleSecond={TransactionType.income}
      />
      <View style={styles.inputArea}>
        <Input
          onChangeText={handleChange('amount')}
          value={values.amount}
          keyboardType="number-pad"
          errors={errors.amount}
          placeholder="0"
          isPassword={false}
          contextMenuHidden={true}
        />
      </View>
      <View style={styles.categoriesList}>
        {moneyMoveType === TransactionType.income
          ? income.map(it => (
              <CategoriesInAddMoneyMove
                key={it}
                picture={it}
                onPress={setCategoryInfo}
                chosen={categoryInfo}
              />
            ))
          : expenses.map(it => (
              <CategoriesInAddMoneyMove
                key={it}
                picture={it}
                onPress={setCategoryInfo}
                chosen={categoryInfo}
              />
            ))}
      </View>

      <ButtonApp
        label={`Add ${moneyMoveType}`}
        onPress={handleSubmit}
        image={addTransactionSource}
      />
      {moneyMoveType !== TransactionType.income && !chooseLocation && (
        <ButtonApp
          label="Choose location"
          onPress={() => setChooseLocation(true)}
        />
      )}

      {moneyMoveType === TransactionType.expenses && chooseLocation && (
        <MapView
          style={{height: 400}}
          provider={null}
          region={{
            latitude: markLocation.latitude,
            longitude: markLocation.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            draggable
            coordinate={markLocation}
            onDragEnd={e => setMarkLocation(e.nativeEvent.coordinate)}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>{values.amount}</Text>
            </View>
          </Marker>
        </MapView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },

  title: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  textTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#A8ADDD',
    fontSize: 14,
  },

  textAmount: {
    fontWeight: '600',
    fontSize: 32,
    color: 'black',
  },

  inputArea: {
    height: 70,
    marginBottom: 20,
  },

  moneyMoves: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  validation: {
    marginLeft: 30,
    color: 'red',
  },

  categoriesList: {
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
    borderRadius: 8,
    marginBottom: 10,
  },

  marker: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#404CB2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  markerText: {
    color: 'white',
  },
});

export default AddMonetaryMovements;

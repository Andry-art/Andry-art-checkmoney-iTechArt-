import React, {FC, useMemo, useState} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  useWindowDimensions,
  ActionSheetIOS,
  Modal,
  Alert,
  ImageSourcePropType
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import slides from '../../../slides';
import {allTransactionsArray} from '../../store/selectors/walletItems';
import {ITransactions, Months, TransactionType} from '../../types/types';
import iconCarSource from '../../../Pics/categories/car.png';
import iconHealthSource from '../../../Pics/categories/heart-beat.png';
import iconGrocerySource from '../../../Pics/categories/food.png';
import iconUnknownSource from '../../../Pics/categories/question.png';
import iconShoppingSource from '../../../Pics/categories/shop-bag.png';
import iconRestaurantSource from '../../../Pics/categories/restaurant.png';
import iconSalarySource from '../../../Pics/categories/money.png';
import dayjs from 'dayjs';


const months = [
  Months.January,
  Months.February,
  Months.March,
  Months.April,
  Months.May,
  Months.June,
  Months.July,
  Months.August,
  Months.September,
  Months.October,
  Months.November,
  Months.December,
];

const imgSource: Record<string, ImageSourcePropType> = {
  iconCarSource: iconCarSource,
  iconHealthSource: iconHealthSource,
  iconUnknownSource: iconUnknownSource,
  iconGrocerySource: iconGrocerySource,
  iconShoppingSource: iconShoppingSource,
  iconRestaurantSource: iconRestaurantSource,
  iconSalarySource: iconSalarySource,
};

const Map: FC = () => {
  const {height} = useWindowDimensions();
  const [chosenMonth, setChosenMonth] = useState<number>(new Date().getMonth());
  const [chosenMark, setChosenMark] = useState<ITransactions>();
  const [showModal, setShowModal] = useState<boolean>(false)

  const img = imgSource[chosenMark?.icon];

  const chooseMonth = (month: number) => {
    setChosenMonth(0);
    setChosenMonth(month);
  };

  const allTransactions = useSelector(allTransactionsArray);

  const allTransactionsByMonth = useMemo(() => {
    return allTransactions.filter(
      it => new Date(it.date).getMonth() === chosenMonth,
    );
  }, [allTransactions, chosenMonth]);

  const allTransactionExpenses = allTransactionsByMonth.filter(
    it => it.type === TransactionType.expenses,
  );

  const showInfo = (transaction?: ITransactions) =>{  
    setChosenMark(transaction)
    setShowModal(prev => !prev)
  }
 
  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal style={styles.monthsScroll}>
        {months.map(it => (
          <TouchableOpacity
            key={it}
            onPress={() => chooseMonth(it)}
            style={
              chosenMonth === it
                ? styles.monthsContainerActive
                : styles.monthsContainer
            }>
            <Text
              style={
                chosenMonth === it ? styles.textMonthsActive : styles.textMonths
              }>
              {Months[it]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible ={showModal} presentationStyle = {"pageSheet"} animationType = "slide">
        <View style = {styles.modalContainer}>
          <View style = {styles.mainPic}>
          <Text>EXPENSES</Text>
          <View style = {styles.iconBGExpens}><Image source={img} style = {{width: 60, height: 60}}></Image></View>
          </View>
          <View> 
          <View style = {styles.list}> 
            <Text>Category</Text> 
            <Text>{chosenMark?.category}</Text>
            </View>
            <View style = {styles.list}>
            <Text>Amount</Text> 
            <Text>{chosenMark?.amountTransaction}</Text>
            </View>
            <View style = {styles.list}> 
            <Text>Date</Text> 
            <Text>{dayjs(chosenMark?.date).format('DD/MM/YY')}</Text>
            </View>
          </View>
        </View>

<TouchableOpacity onPress={() =>setShowModal(prev => !prev)}><Text>dddd</Text></TouchableOpacity>

      </Modal>
  
      <MapView
        style={{height}}
        provider={null}
        region={{
          latitude: 53.902287,
          longitude: 27.561824,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0121,
        }}>
        {allTransactionExpenses.map(
          it =>
            it.coordinate && (
              <Marker
              onPress={() => showInfo(it)}
                key={it.keyTransaction}
                coordinate={it.coordinate}
                title={it.category}
                description={`${String(it.amountTransaction)}$`}>
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{`${String(
                    it.amountTransaction,
                  )}$`}</Text>
                </View>
              </Marker>
            ),
        )}  
      </MapView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    height: '80%',
  },

  monthsScroll: {
    backgroundColor: '#F6F6F6',
    padding: 10,
    height: 60,
  },
  monthsContainerActive: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    height: '100%',
    borderRadius: 10,
  },

  monthsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  textMonthsActive: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
  },

  textMonths: {
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
  },

  listOfTransactions: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    bottom: 230,
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

  mainPic: {
    alignItems: 'center'
  },

  modalContainer: {
   marginVertical: 100,
justifyContent: 'center',

  },

  iconBGExpens: {
    backgroundColor: '#FFE9E6',
    padding: 15,
    borderRadius: 20,
    margin: 40,
    alignItems: 'center'
  },

  list: {
flexDirection: 'row',
justifyContent: 'space-between',
paddingHorizontal: 40,
marginBottom: 20,
  }
});

export default Map;

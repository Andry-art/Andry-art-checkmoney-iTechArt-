import React, {Dispatch, FC, SetStateAction} from 'react';
import {TouchableOpacity, Modal, View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {logOutAction} from '../store/actions/registration';

interface Props {
  isModalVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  logOutRequest: () => void;
}

const LogOutModal: FC<Props> = ({
  isModalVisible,
  setIsVisible,
  logOutRequest,
}) => {
  const dispatch = useDispatch();
  const logOut = async () => {
    setIsVisible(false);
    dispatch(logOutAction());
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <View style={styles.modal}>
        <View style={styles.modalTitle}>
          <Text style={styles.modalTextTitle}>Would you like to logOut?</Text>
        </View>
        <View style={styles.modalBtnArea}>
          <TouchableOpacity onPress={logOut} style={styles.modalBtnDelete}>
            <Text style={styles.modalBtnText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logOutRequest}
            style={styles.modalBtnCancel}>
            <Text style={styles.modalBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logOut: {
    paddingRight: 10,
  },

  modal: {
    borderRadius: 10,
    justifyContent: 'center',
    height: '25%',
    backgroundColor: '#C9EEF7',
    padding: 20,
    marginHorizontal: 40,
    marginVertical: 200,
  },

  modalTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBtnArea: {
    marginVertical: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },

  modalBtnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '40%',
    backgroundColor: 'red',
    borderRadius: 10,
  },

  modalBtnCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '40%',
    backgroundColor: '#74EA8E',
    borderRadius: 10,
  },

  modalBtnText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },

  modalTextTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
});

export default LogOutModal;

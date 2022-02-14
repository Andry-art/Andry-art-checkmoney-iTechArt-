import {useDeviceOrientation} from '@react-native-community/hooks/lib/useDeviceOrientation';
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
  const orientation = useDeviceOrientation();
  const dispatch = useDispatch();
  const logOut = async () => {
    setIsVisible(false);
    dispatch(logOutAction());
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <View style={styles.backGroundModal}>
        <View
          style={orientation.landscape ? styles.modalLandscape : styles.modal}>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backGroundModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  logOut: {
    paddingRight: 10,
  },

  modal: {
    borderRadius: 10,
    justifyContent: 'center',
    height: '25%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 40,
    marginVertical: 200,
  },

  modalLandscape: {
    borderRadius: 10,
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 40,
    marginVertical: 100,
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
    backgroundColor: '#404CB2',
    borderRadius: 10,
  },

  modalBtnText: {
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'white',
    fontSize: 16,
  },

  modalTextTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
});

export default LogOutModal;

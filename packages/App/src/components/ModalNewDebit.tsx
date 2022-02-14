import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  isVisible: boolean;
  onPressHide: Dispatch<SetStateAction<boolean>>;
}

const ModalNewDebit: FC<Props> = ({title, isVisible, onPressHide}) => {
  const hide = useCallback(() => {
    onPressHide(false);
  }, [onPressHide]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.backGroundModal}>
        <View style={styles.modal}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTextTitle}>{title}</Text>
          </View>
          <View style={styles.modalBtnArea}>
            <TouchableOpacity onPress={hide} style={styles.modalBtnCancel}>
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

  modal: {
    borderRadius: 10,
    justifyContent: 'center',
    height: '25%',
    backgroundColor: '#FFFFFF',
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
    width: '60%',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
});

export default ModalNewDebit;

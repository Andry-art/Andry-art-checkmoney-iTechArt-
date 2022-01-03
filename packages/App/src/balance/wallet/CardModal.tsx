import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  title: string;
  isVisible: boolean;
  onPressDelete: () => void;
  onPressHide: Dispatch<SetStateAction<boolean>>;
}

const CardModal: FC<Props> = ({
  title,
  isVisible,
  onPressDelete,
  onPressHide,
}) => {
  const hide = useCallback(() => {
    onPressHide(false);
  }, [onPressHide]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modal}>
        <View style={styles.modalTitle}>
          <Text style={styles.modalTextTitle}>{title}</Text>
        </View>
        <View style={styles.modalBtnArea}>
          <TouchableOpacity
            onPress={onPressDelete}
            style={styles.modalBtnDelete}>
            <Text style={styles.modalBtnText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hide} style={styles.modalBtnCancel}>
            <Text style={styles.modalBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CardModal;

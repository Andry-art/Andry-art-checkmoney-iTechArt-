import {useDeviceOrientation} from '@react-native-community/hooks/lib/useDeviceOrientation';
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
  const orientation = useDeviceOrientation();
  const hide = useCallback(() => {
    onPressHide(false);
  }, [onPressHide]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.backGroundModal}>
        <View
          style={orientation.landscape ? styles.modalLandscape : styles.modal}>
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
    height: 200,
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
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'white',
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

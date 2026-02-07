import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, useTheme } from 'react-native-paper';

interface UiModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
  testID?: string;
  showCloseButton?: boolean;
  closeLabel?: string;
  closeTestID?: string;
  closeAccessibilityLabel?: string;
}

const UiModal = ({
  visible,
  onDismiss,
  children,
  testID,
  showCloseButton = false,
  closeLabel = 'Close',
  closeTestID,
  closeAccessibilityLabel
}: UiModalProps) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        dismissable
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.surface }]}
        testID={testID}
      >
        {showCloseButton ? (
          <View style={styles.closeRow}>
            <Button
              onPress={onDismiss}
              accessibilityLabel={closeAccessibilityLabel ?? closeLabel}
              testID={closeTestID}
              compact
            >
              {closeLabel}
            </Button>
          </View>
        ) : null}
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16
  },
  closeRow: {
    alignItems: 'flex-end'
  }
});

export default UiModal;

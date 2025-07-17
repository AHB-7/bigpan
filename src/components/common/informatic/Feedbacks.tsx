import React from 'react'
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Text } from './Text'
import { Button } from '@/components/common/buttons/Button'
import { theme } from '@/styles/theme'

interface ModalAction {
  text: string
  onPress?: () => void
  style?: 'default' | 'cancel' | 'destructive' | 'primary'
  variant?: 'filled' | 'outlined' | 'text'
}

interface CustomModalProps {
  visible: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'error' | 'warning' | 'info' | 'success'
  actions?: ModalAction[]
  icon?: string
  closeOnBackdrop?: boolean
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  message,
  type = 'error',
  actions = [{ text: 'OK', style: 'primary' }],
  icon,
  closeOnBackdrop = true,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          iconColor: '#FF6B6B',
          borderColor: '#FF6B6B',
          backgroundColor: '#FFF5F5',
          defaultIcon: '❌',
        }
      case 'warning':
        return {
          iconColor: '#FFB946',
          borderColor: '#FFB946',
          backgroundColor: '#FFFBF0',
          defaultIcon: '⚠️',
        }
      case 'success':
        return {
          iconColor: '#4CAF50',
          borderColor: '#4CAF50',
          backgroundColor: '#F0FFF4',
          defaultIcon: '✅',
        }
      case 'info':
        return {
          iconColor: '#2196F3',
          borderColor: '#2196F3',
          backgroundColor: '#F0F8FF',
          defaultIcon: 'ℹ️',
        }
      default:
        return {
          iconColor: '#666',
          borderColor: '#DDD',
          backgroundColor: '#FAFAFA',
          defaultIcon: '💬',
        }
    }
  }

  const typeStyles = getTypeStyles()

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose()
    }
  }

  const getButtonVariant = (style?: string) => {
    switch (style) {
      case 'primary':
        return 'filled'
      case 'destructive':
        return 'filled'
    }
  }

  const getButtonColor = (style?: string) => {
    switch (style) {
      case 'destructive':
        return '#FF6B6B'
      case 'primary':
        return theme.colors.primary
      default:
        return theme.colors.onSurface
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.container,
                { borderTopColor: typeStyles.borderColor },
              ]}
            >
              {/* Header with Icon */}
              <View
                style={[
                  styles.header,
                  { backgroundColor: typeStyles.backgroundColor },
                ]}
              >
                <Text style={{ ...styles.icon, color: typeStyles.iconColor }}>
                  {icon || typeStyles.defaultIcon}
                </Text>
                <Text variant="heading2" weight="bold" style={styles.title}>
                  {title}
                </Text>
              </View>

              {/* Message */}
              <View style={styles.content}>
                <Text variant="body" style={styles.message}>
                  {message}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    onPress={() => {
                      action.onPress?.()
                      onClose()
                    }}
                    variant={getButtonVariant(action.style)}
                    backgroundColor={
                      action.style === 'primary' ||
                      action.style === 'destructive'
                        ? getButtonColor(action.style)
                        : 'transparent'
                    }
                    textColor={
                      action.style === 'primary' ||
                      action.style === 'destructive'
                        ? 'white'
                        : getButtonColor(action.style)
                    }
                    style={StyleSheet.flatten([
                      styles.actionButton,
                      ...(index < actions.length - 1
                        ? [styles.actionButtonMargin]
                        : []),
                    ])}
                  >
                    {action.text}
                  </Button>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderTopWidth: 4,
    maxWidth: 340,
    width: '100%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    color: '#1a1a1a',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonMargin: {
    marginRight: 8,
  },
})

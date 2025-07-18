import { Ionicons } from '@expo/vector-icons'

export interface NavButtonConfig {
  onPress: () => void
  iconName: React.ComponentProps<typeof Ionicons>['name']
  text?: string
  shouldShow?: boolean
  inputMode?: boolean
  inputValue?: string
  onInputChange?: (text: string) => void
  inputPlaceholder?: string
  textColor?: string
  iconColor?: string
  backgroundColor?: string
  activeTextColor?: string
  activeIconColor?: string
  activeBackgroundColor?: string
}

export interface UnderNavConfig {
  leftButton: NavButtonConfig
  middleButton: NavButtonConfig
  rightButton: NavButtonConfig
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  middleComponent?: React.ReactNode
}

// components/navigation/UnderNav.tsx - Updated with hybrid support
import { View } from 'react-native'
import { styles } from './styles'
import { LeftMenu } from './buttons/LeftIcon'
import { RightIcon } from './buttons/RightIcon'
import { MiddleIcon } from './buttons/MiddleButton'
import { useState } from 'react'

interface UnderNavProps {
  config: UnderNavConfig
}

export function NavBar({ config }: UnderNavProps) {
  const [leftModalVisible, setLeftModalVisible] = useState(false)
  const [rightModalVisible, setRightModalVisible] = useState(false)
  const [middleModalVisible, setMiddleModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <LeftMenu
        onPress={() => {
          config.leftButton.onPress()
          setLeftModalVisible(!leftModalVisible)
        }}
        iconName={config.leftButton.iconName}
        shouldShow={config.leftButton.shouldShow}
      />
      {leftModalVisible && config.leftComponent}

      {(config.middleButton.text || config.middleButton.inputMode) && (
        <MiddleIcon
          onPress={() => {
            config.middleButton.onPress()
            // Only toggle modal if NOT in input mode
            if (!config.middleButton.inputMode) {
              setMiddleModalVisible(!middleModalVisible)
            }
          }}
          iconName={config.middleButton.iconName}
          text={config.middleButton.text}
          shouldShow={config.middleButton.shouldShow}
          inputMode={config.middleButton.inputMode}
          inputValue={config.middleButton.inputValue}
          onInputChange={config.middleButton.onInputChange}
          inputPlaceholder={config.middleButton.inputPlaceholder}
          textColor={config.middleButton.textColor}
          iconColor={config.middleButton.iconColor}
          backgroundColor={config.middleButton.backgroundColor}
          activeTextColor={config.middleButton.activeTextColor}
          activeIconColor={config.middleButton.activeIconColor}
          activeBackgroundColor={config.middleButton.activeBackgroundColor}
        />
      )}

      <RightIcon
        onPress={() => {
          config.rightButton.onPress()
          setRightModalVisible(!rightModalVisible)
        }}
        iconName={config.rightButton.iconName}
        shouldShow={config.rightButton.shouldShow}
      />

      {rightModalVisible && config.rightComponent}
      {middleModalVisible &&
        !config.middleButton.inputMode &&
        config.middleComponent}
    </View>
  )
}

import { Button, Text } from '@/components/common'
import { styles } from './styles'

interface OptionCardProps {
  option: { id: string; label: string; icon: string }
  isSelected: boolean
  onToggle: () => void
}

export function OptionCard({ option, isSelected, onToggle }: OptionCardProps) {
  return (
    <Button
      variant={isSelected ? 'filled' : 'outlined'}
      onPress={onToggle}
      style={
        isSelected
          ? { ...styles.optionCard, ...styles.selectedCard }
          : styles.optionCard
      }
    >
      <Text style={styles.optionIcon}>{option.icon}</Text>
      <Text
        variant="bodySmall"
        weight="medium"
        style={
          isSelected
            ? { ...styles.optionLabel, ...styles.selectedLabel }
            : styles.optionLabel
        }
      >
        {option.label}
      </Text>
    </Button>
  )
}

interface LevelCardProps {
  level: { id: string; label: string; icon: string; description: string }
  isSelected: boolean
  onSelect: () => void
}

export function LevelCard({ level, isSelected, onSelect }: LevelCardProps) {
  return (
    <Button
      variant={isSelected ? 'filled' : 'outlined'}
      onPress={onSelect}
      style={
        isSelected
          ? { ...styles.levelCard, ...styles.selectedCard }
          : styles.levelCard
      }
    >
      <Text style={styles.levelIcon}>{level.icon}</Text>
      <Text
        variant="body"
        weight="semiBold"
        style={{
          ...styles.levelLabel,
          ...(isSelected ? styles.selectedLabel : {}),
        }}
      >
        {level.label}
      </Text>
      <Text
        variant="caption"
        style={{
          ...styles.levelDescription,
          ...(isSelected ? styles.selectedDescription : {}),
        }}
      >
        {level.description}
      </Text>
    </Button>
  )
}

interface TimeCardProps {
  time: { id: string; label: string; description: string }
  isSelected: boolean
  onSelect: () => void
}

export function TimeCard({ time, isSelected, onSelect }: TimeCardProps) {
  return (
    <Button
      variant={isSelected ? 'filled' : 'outlined'}
      onPress={onSelect}
      style={
        isSelected
          ? { ...styles.timeCard, ...styles.selectedCard }
          : styles.timeCard
      }
    >
      <Text
        variant="heading2"
        weight="bold"
        style={{
          ...styles.timeLabel,
          ...(isSelected ? styles.selectedLabel : {}),
        }}
      >
        {time.label}
      </Text>
      <Text
        variant="caption"
        style={{
          ...styles.timeDescription,
          ...(isSelected ? styles.selectedDescription : {}),
        }}
      >
        {time.description}
      </Text>
    </Button>
  )
}

interface ServingCardProps {
  size: { id: number; label: string; icon: string }
  isSelected: boolean
  onSelect: () => void
}

export function ServingCard({ size, isSelected, onSelect }: ServingCardProps) {
  return (
    <Button
      variant={isSelected ? 'filled' : 'outlined'}
      onPress={onSelect}
      style={
        isSelected
          ? { ...styles.servingCard, ...styles.selectedCard }
          : styles.servingCard
      }
    >
      <Text style={styles.servingIcon}>{size.icon}</Text>
      <Text
        variant="body"
        weight="medium"
        style={
          isSelected
            ? { ...styles.servingLabel, ...styles.selectedLabel }
            : styles.servingLabel
        }
      >
        {size.label}
      </Text>
    </Button>
  )
}

import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { Text } from '@/components/common'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuth } from '@/hooks/useAuth'
import { TouchableOpacity, View, ScrollView } from 'react-native'
import { AntDesign, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

interface SettingsItemProps {
  icon: React.ReactNode
  title: string
  subtitle?: string
  onPress: () => void
  showChevron?: boolean
  badge?: number
  isDestructive?: boolean
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  badge,
  isDestructive = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.linkContainer, isDestructive && styles.logoutContainer]}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.linkIconContainer,
          isDestructive && styles.logoutIconContainer,
        ]}
      >
        {icon}
        {badge && badge > 0 && (
          <View style={styles.badge}>
            <Text variant="tiny" weight="medium" style={styles.badgeText}>
              {badge > 99 ? '99+' : badge.toString()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.linkContent}>
        <View style={styles.linkTextContainer}>
          <Text
            variant="body"
            weight="medium"
            style={{
              ...styles.linkText,
              ...(isDestructive && styles.logoutText),
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodySmall" weight="light">
              {subtitle}
            </Text>
          )}
        </View>

        {showChevron && (
          <Ionicons name="chevron-forward" style={styles.chevronIcon} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export function Settings() {
  const { t } = useTranslation()
  const { user, signOut } = useAuth()

  // Get user initials for avatar
  const getUserInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      // Navigation will be handled by auth state change
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text variant="heading2" weight="medium">
          {t('settings.title')}
        </Text>
      </View>

      <ScrollView
        style={styles.linkssection}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Settings Group */}
        <View style={styles.settingsGroup}>
          <SettingsItem
            icon={<AntDesign name="user" style={styles.linkIcon} />}
            title={t('settings.profile')}
            subtitle={t('settings.profile.subtitle')}
            onPress={() => {
              router.push('/(modals)/settings/account')
            }}
          />

          <SettingsItem
            icon={
              <MaterialIcons name="restaurant-menu" style={styles.linkIcon} />
            }
            title={t('settings.preferences')}
            subtitle={t('settings.preferences.subtitle')}
            onPress={() => {
              // Navigate to cooking preferences
            }}
          />
        </View>

        {/* App Settings Group */}
        <View style={styles.settingsGroup}>
          <Text variant="caption" weight="medium" style={styles.groupTitle}>
            {t('settings.app')}
          </Text>

          <SettingsItem
            icon={
              <Ionicons name="notifications-outline" style={styles.linkIcon} />
            }
            title={t('settings.notifications')}
            subtitle={t('settings.notifications.subtitle')}
            badge={3} // Example: show unread notification settings
            onPress={() => {
              // Navigate to notification settings
            }}
          />

          <SettingsItem
            icon={<Ionicons name="language-outline" style={styles.linkIcon} />}
            title={t('settings.language')}
            subtitle={t('settings.language.current')}
            onPress={() => {
              // Navigate to language settings
            }}
          />

          <SettingsItem
            icon={<Feather name="moon" style={styles.linkIcon} />}
            title={t('settings.theme')}
            subtitle={t('settings.theme.light')}
            onPress={() => {
              // Navigate to theme settings
            }}
          />
        </View>

        {/* Support Group */}
        <View style={styles.settingsGroup}>
          <Text variant="caption" weight="medium" style={styles.groupTitle}>
            {t('settings.support')}
          </Text>

          <SettingsItem
            icon={<AntDesign name="infocirlceo" style={styles.linkIcon} />}
            title={t('settings.about')}
            subtitle={t('settings.about.version')}
            onPress={() => {
              // Navigate to about page
            }}
          />

          <SettingsItem
            icon={<AntDesign name="questioncircleo" style={styles.linkIcon} />}
            title={t('settings.help')}
            subtitle={t('settings.help.subtitle')}
            onPress={() => {
              // Navigate to help center
            }}
          />

          <SettingsItem
            icon={<MaterialIcons name="feedback" style={styles.linkIcon} />}
            title={t('settings.feedback')}
            subtitle={t('settings.feedback.subtitle')}
            onPress={() => {
              // Open feedback form
            }}
          />
        </View>

        {/* Logout */}
        <SettingsItem
          icon={
            <MaterialIcons
              name="logout"
              style={[styles.linkIcon, styles.logoutIcon]}
            />
          }
          title={t('settings.logout')}
          onPress={handleSignOut}
          showChevron={false}
          isDestructive={true}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

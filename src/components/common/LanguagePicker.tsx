// src/components/common/LanguagePicker.tsx
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from './informatic/Text'
import { useLanguageStore, Language } from '@/stores/languageStore'
import { theme } from '@/styles/theme'

interface LanguagePickerProps {
  style?: any
  showLabel?: boolean
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  style,
  showLabel = true,
}) => {
  const { currentLanguage, setLanguage } = useLanguageStore()

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'no', label: 'Norsk', flag: '🇳🇴' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ]

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      {showLabel && (
        <Text variant="caption" style={{ marginBottom: theme.spacing.xs }}>
          Language
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.xs,
          borderWidth: 1,
          borderColor: theme.colors.onSurfaceVariant + '20',
        }}
      >
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => setLanguage(lang.code)}
            style={{
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.md,
              backgroundColor:
                currentLanguage === lang.code
                  ? theme.colors.primary
                  : 'transparent',
              marginHorizontal: theme.spacing.xs,
            }}
            activeOpacity={0.7}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.xs,
              }}
            >
              <Text style={{ fontSize: 16 }}>{lang.flag}</Text>
              <Text
                variant="bodySmall"
                weight="medium"
                style={{
                  color:
                    currentLanguage === lang.code
                      ? theme.colors.surface
                      : theme.colors.onSurface,
                }}
              >
                {lang.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

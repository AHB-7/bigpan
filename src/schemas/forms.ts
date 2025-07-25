// src/schemas/profile.ts - Improved with resolver and form state
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useTranslation } from '@/hooks/useTranslation'
import { UserPreferences } from '@/types'

export const useProfileSchema = () => {
  const { t } = useTranslation()

  return yup.object({
    display_name: yup
      .string()
      .required(t('settings.profile.form.display_name')),
    bio: yup.string().max(500, t('settings.profile.form.bio')).default(''),
    cooking_level: yup
      .string()
      .oneOf(['beginner', 'intermediate', 'advanced'] as const)
      .default('beginner'),
    location: yup
      .string()
      .max(100, t('settings.profile.form.location'))
      .default(''),
  })
}

export type ProfileFormData = yup.InferType<ReturnType<typeof useProfileSchema>>

export const useProfileForm = () => {
  const schema = useProfileSchema()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit', // ✅ Only validate on submit, not on change
    defaultValues: {
      display_name: '',
      bio: '',
      cooking_level: 'beginner',
      location: '',
    },
  })

  return {
    control,
    handleSubmit,
    reset,
    errors,
    isDirty,
  }
}

export const usePreferencesSchema = () => {
  const { t } = useTranslation()

  return yup.object({
    cooking_time_preference: yup
      .number()
      .oneOf([15, 30, 45, 60, 90], 'Invalid cooking time')
      .default(60)
      .required('Cooking time is required'),
    serving_size_preference: yup
      .number()
      .oneOf([1, 2, 4, 6, 8], 'Invalid serving size')
      .default(2)
      .required('Serving size is required'),
    budget_preference: yup
      .string()
      .oneOf(['low', 'medium', 'high'] as const, 'Invalid budget preference')
      .default('medium'),
  })
}

export interface PreferencesFormData {
  cooking_time_preference: NonNullable<
    UserPreferences['cooking_time_preference']
  >
  serving_size_preference: NonNullable<
    UserPreferences['serving_size_preference']
  >
  budget_preference: 'low' | 'medium' | 'high'
}

export const usePreferencesForm = () => {
  const schema = usePreferencesSchema()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PreferencesFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      cooking_time_preference: 60,
      serving_size_preference: 2,
      budget_preference: 'medium',
    },
  })

  return {
    control,
    handleSubmit,
    reset,
    errors,
    isDirty,
  }
}

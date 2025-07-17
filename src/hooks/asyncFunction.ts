import { useState } from 'react'
import { Alert, Keyboard } from 'react-native'

/**
 * Supported display methods for error and success messages
 */
type DisplayMethod = 'alert' | 'toast' | 'modal' | 'custom' | 'inline' | 'none'

/**
 * Configuration options for async operations
 * @template T - The expected return data type
 */
interface AsyncOperationOptions<T = any> {
  /** Message to display on successful operation */
  successMessage?: string
  /** Default error message if operation fails */
  errorMessage?: string
  /** Whether to dismiss keyboard before operation (default: true) */
  dismissKeyboard?: boolean
  /** How to display errors (default: 'modal') */
  showErrorMethod?: DisplayMethod
  /** How to display success messages (default: 'toast') */
  showSuccessMethod?: DisplayMethod

  // Modal specific options
  /** Title for modal error display */
  modalTitle?: string
  /** Type of modal to show */
  modalType?: 'error' | 'warning' | 'info'
  /** Action buttons for modal */
  modalActions?: Array<{
    text: string
    onPress?: () => void
    style?: 'default' | 'cancel' | 'destructive'
  }>

  // Toast options
  /** Position of toast notification ('top' | 'bottom') */
  toastPosition?: 'top' | 'bottom'
  /** Duration of toast in milliseconds */
  toastDuration?: number

  // Callbacks
  /** Called when operation succeeds */
  onSuccess?: (data?: T) => void
  /** Called when operation fails */
  onError?: (error: any) => void
  /** Called when showing error message (for custom/inline methods) */
  onShowError?: (message: string) => void
  /** Called when showing success message (for custom methods) */
  onShowSuccess?: (message: string) => void
}

/**
 * Result returned from async operations
 * @template T - The data type returned on success
 */
interface AsyncOperationResult<T = any> {
  /** Whether the operation succeeded */
  success: boolean
  /** Data returned on success */
  data?: T
  /** Error object if operation failed */
  error?: any
  /** Human-readable error message */
  errorMessage?: string
}

// Global handlers for toast and modal display
let globalToastError: ((message: string, options?: any) => void) | null = null
let globalToastSuccess: ((message: string, options?: any) => void) | null = null
let globalModalError:
  | ((title: string, message: string, actions?: any[]) => void)
  | null = null

/**
 * Configure global handlers for toast and modal display methods
 * Call this once in your app's root component (_layout.tsx)
 *
 * @example
 * ```typescript
 * // In _layout.tsx
 * import Toast from 'react-native-toast-message'
 *
 * configureAsyncHandlers({
 *   toastError: (message, options) =>
 *     Toast.show({ type: 'error', text1: 'Error', text2: message }),
 *   toastSuccess: (message, options) =>
 *     Toast.show({ type: 'success', text1: 'Success', text2: message }),
 *   modalError: (title, message, actions) =>
 *     showCustomModal({ title, message, actions })
 * })
 * ```
 */
export const configureAsyncHandlers = (handlers: {
  /** Handler for displaying error toasts */
  toastError?: (message: string, options?: any) => void
  /** Handler for displaying success toasts */
  toastSuccess?: (message: string, options?: any) => void
  /** Handler for displaying error modals */
  modalError?: (title: string, message: string, actions?: any[]) => void
}) => {
  globalToastError = handlers.toastError || null
  globalToastSuccess = handlers.toastSuccess || null
  globalModalError = handlers.modalError || null
}

/**
 * Hook for handling async operations with unified loading, error, and success handling
 *
 * Provides multiple display methods for errors and success messages:
 * - **alert**: Native platform alerts (blocking)
 * - **toast**: Non-intrusive notifications (requires global config)
 * - **modal**: Custom modal dialogs (requires global config)
 * - **inline**: Display within component (requires onShowError callback)
 * - **custom**: Custom handling via callbacks
 * - **none**: Silent (handle manually via return value)
 *
 * @example Basic usage
 * ```typescript
 * const { executeSupabase, isLoading } = useAsyncFunction()
 *
 * const handleLogin = async (credentials) => {
 *   await executeSupabase(
 *     () => signIn(credentials.email, credentials.password),
 *     {
 *       showErrorMethod: 'toast',
 *       successMessage: 'Welcome back!',
 *       onSuccess: () => router.push('/dashboard')
 *     }
 *   )
 * }
 * ```
 *
 * @example Inline error handling
 * ```typescript
 * const [error, setError] = useState('')
 *
 * await executeSupabase(operation, {
 *   showErrorMethod: 'inline',
 *   onShowError: (message) => setError(message)
 * })
 *
 * // In JSX: {error && <ErrorMessage text={error} />}
 * ```
 *
 * @example Modal with custom actions
 * ```typescript
 * await executeSupabase(operation, {
 *   showErrorMethod: 'modal',
 *   modalTitle: 'Upload Failed',
 *   modalActions: [
 *     { text: 'Retry', style: 'default', onPress: () => retry() },
 *     { text: 'Cancel', style: 'cancel' }
 *   ]
 * })
 * ```
 *
 * @returns Object containing execution functions and loading state
 */
export const useAsyncFunction = () => {
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Internal function to display error messages based on the chosen method
   * @private
   */
  const displayError = (
    message: string,
    method: DisplayMethod,
    options: AsyncOperationOptions,
    customHandler?: (message: string) => void
  ) => {
    switch (method) {
      case 'alert':
        Alert.alert('Error', message)
        break

      case 'modal':
        const title = options.modalTitle || 'Error'
        const actions = options.modalActions || [
          { text: 'OK', style: 'default' as const },
        ]

        if (globalModalError) {
          globalModalError(title, message, actions)
        } else {
          // Fallback to Alert if modal not configured
          Alert.alert(title, message, actions)
        }
        break

      case 'toast':
        if (globalToastError) {
          globalToastError(message, {
            position: options.toastPosition || 'top',
            duration: options.toastDuration || 3000,
          })
        } else {
          console.warn(
            'Toast error handler not configured, falling back to alert'
          )
          Alert.alert('Error', message)
        }
        break

      case 'custom':
        if (customHandler) {
          customHandler(message)
        } else {
          console.warn(
            'Custom error handler not provided, falling back to alert'
          )
          Alert.alert('Error', message)
        }
        break

      case 'inline':
        // For inline errors, just call the custom handler or do nothing
        customHandler?.(message)
        break

      case 'none':
        // Silent - do nothing
        break
    }
  }

  /**
   * Internal function to display success messages based on the chosen method
   * @private
   */
  const displaySuccess = (
    message: string,
    method: DisplayMethod,
    options: AsyncOperationOptions,
    customHandler?: (message: string) => void
  ) => {
    switch (method) {
      case 'alert':
        Alert.alert('Success', message)
        break

      case 'toast':
        if (globalToastSuccess) {
          globalToastSuccess(message, {
            position: options.toastPosition || 'bottom',
            duration: options.toastDuration || 2000,
          })
        } else {
          Alert.alert('Success', message)
        }
        break

      case 'custom':
        customHandler?.(message)
        break

      case 'none':
        // Silent - do nothing
        break
    }
  }

  /**
   * Execute Supabase operations that return { data, error } format
   *
   * Use this for Supabase database operations, authentication, and storage.
   * Automatically handles the { data, error } response pattern.
   *
   * @template T - Expected data type returned by the operation
   * @param operation - Function that returns a Promise with { data?, error? }
   * @param options - Configuration options for error/success handling
   * @returns Promise resolving to operation result with success flag
   *
   * @example Authentication
   * ```typescript
   * await executeSupabase(
   *   () => supabase.auth.signInWithPassword({ email, password }),
   *   {
   *     showErrorMethod: 'inline',
   *     onShowError: (msg) => setLoginError(msg),
   *     onSuccess: () => router.push('/dashboard'),
   *     errorMessage: 'Invalid credentials'
   *   }
   * )
   * ```
   *
   * @example Database query
   * ```typescript
   * const result = await executeSupabase(
   *   () => supabase.from('recipes').select('*'),
   *   {
   *     showErrorMethod: 'toast',
   *     onSuccess: (recipes) => setRecipes(recipes)
   *   }
   * )
   * ```
   */
  const executeSupabase = async <T>(
    operation: () => Promise<{ data?: T; error?: any }>,
    options: AsyncOperationOptions<T> = {}
  ): Promise<AsyncOperationResult<T>> => {
    const {
      successMessage,
      errorMessage = 'Something went wrong',
      dismissKeyboard = true,
      showErrorMethod = 'modal', // Default to modal for errors
      showSuccessMethod = 'toast', // Default to toast for success
      onSuccess,
      onError,
      onShowError,
      onShowSuccess,
    } = options

    try {
      setIsLoading(true)
      if (dismissKeyboard) Keyboard.dismiss()

      const result = await operation()

      if (result.error) {
        const finalErrorMessage = result.error.message || errorMessage

        displayError(finalErrorMessage, showErrorMethod, options, onShowError)
        onError?.(result.error)

        return {
          success: false,
          error: result.error,
          errorMessage: finalErrorMessage,
        }
      }

      if (successMessage) {
        displaySuccess(
          successMessage,
          showSuccessMethod,
          options,
          onShowSuccess
        )
      }
      onSuccess?.(result.data)
      return { success: true, data: result.data }
    } catch (error: any) {
      const finalErrorMessage = error?.message || errorMessage

      displayError(finalErrorMessage, showErrorMethod, options, onShowError)
      onError?.(error)

      return {
        success: false,
        error,
        errorMessage: finalErrorMessage,
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Execute regular async operations that throw errors on failure
   *
   * Use this for standard Promise-based operations, API calls, and functions
   * that throw errors instead of returning { data, error } format.
   *
   * @template T - Expected data type returned by the operation
   * @param operation - Function that returns a Promise resolving to data
   * @param options - Configuration options for error/success handling
   * @returns Promise resolving to operation result with success flag
   *
   * @example API call
   * ```typescript
   * await execute(
   *   () => fetch('/api/users').then(res => res.json()),
   *   {
   *     successMessage: 'Users loaded!',
   *     showErrorMethod: 'toast',
   *     onSuccess: (users) => setUsers(users)
   *   }
   * )
   * ```
   *
   * @example File upload with progress
   * ```typescript
   * await execute(
   *   () => uploadFile(file, { onProgress: setProgress }),
   *   {
   *     successMessage: 'File uploaded successfully!',
   *     showErrorMethod: 'modal',
   *     modalTitle: 'Upload Failed',
   *     onSuccess: () => setProgress(0)
   *   }
   * )
   * ```
   */
  const execute = async <T>(
    operation: () => Promise<T>,
    options: AsyncOperationOptions<T> = {}
  ): Promise<AsyncOperationResult<T>> => {
    const {
      successMessage,
      errorMessage = 'Something went wrong',
      dismissKeyboard = true,
      showErrorMethod = 'modal',
      showSuccessMethod = 'toast',
      onSuccess,
      onError,
      onShowError,
      onShowSuccess,
    } = options

    try {
      setIsLoading(true)
      if (dismissKeyboard) Keyboard.dismiss()

      const data = await operation()

      if (successMessage) {
        displaySuccess(
          successMessage,
          showSuccessMethod,
          options,
          onShowSuccess
        )
      }
      onSuccess?.(data)
      return { success: true, data }
    } catch (error: any) {
      const finalErrorMessage = error?.message || errorMessage

      displayError(finalErrorMessage, showErrorMethod, options, onShowError)
      onError?.(error)

      return {
        success: false,
        error,
        errorMessage: finalErrorMessage,
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    /** Execute Supabase operations (returns { data, error }) */
    executeSupabase,
    /** Execute regular async operations (throws on error) */
    execute,
    /** Current loading state of async operations */
    isLoading,
  }
}

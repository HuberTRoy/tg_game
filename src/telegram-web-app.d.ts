interface TelegramWebAppUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
}

interface TelegramWebAppThemeParams {
  bg_color?: string
  text_color?: string
  button_color?: string
  button_text_color?: string
}

interface TelegramMainButton {
  setParams: (params: {
    text?: string
    color?: string
    text_color?: string
    is_visible?: boolean
  }) => void
  show: () => void
  hide: () => void
  onClick: (callback: () => void) => void
  offClick: (callback: () => void) => void
}

interface TelegramWebApp {
  initDataUnsafe?: {
    user?: TelegramWebAppUser
  }
  themeParams: TelegramWebAppThemeParams
  ready: () => void
  expand: () => void
  sendData: (data: string) => void
  MainButton: TelegramMainButton
  HapticFeedback?: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
  }
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp
  }
}

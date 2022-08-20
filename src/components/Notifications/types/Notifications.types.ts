export type Type = 'info' | 'success' | 'warning' | 'error'
export type Callback = (notifications: NotificationProps[]) => void

export interface NotificationProps {
  id?: string
  type: Type
  title: string
  subtitle: string
  message: string
  timeout?: number
}

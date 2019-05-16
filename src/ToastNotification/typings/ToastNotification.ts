export enum ToastNotificationPosition {
  TopLeft = 'tl',
  TopRight = 'tr',
  BottomLeft = 'bl',
  BottomRight = 'br'
}

export enum ToastNotificationType {
  ALERT = 'alert',
  INFO = 'info',
  WARNING = 'warning'
}

export type IToastNotifications = IToastNotification[];
export interface IToastNotification {
  id: number;
  message: string;
  position: ToastNotificationPosition;
  type: ToastNotificationType;
  removeNotification: (id: number, position: ToastNotificationPosition) => void
  timeout: number;
}
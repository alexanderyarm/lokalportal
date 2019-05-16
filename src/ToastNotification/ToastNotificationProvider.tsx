import * as React from "react";
import ToastNotification from './ToastNotification';
import { TransitionGroup } from 'react-transition-group';
import { IToastNotifications, ToastNotificationPosition, ToastNotificationType, IToastNotification } from "./typings/ToastNotification";
import './styles/ToastNotificationProvider.scss'

interface ToastNotificationProviderProps {
  bindAddNotification: (fn: Function) => void;
  timeout: number;
}

type ToastNotificationProviderState = {
  tl: IToastNotifications;
  tr: IToastNotifications;
  bl: IToastNotifications;
  br: IToastNotifications;
};

const DEFAULT_TIMEOUT = 3000;

export default class ToastNotificationProvider extends React.Component<ToastNotificationProviderProps, ToastNotificationProviderState> {
  idCounter = 0;
  state: ToastNotificationProviderState = {
    tl: [],
    tr: [],
    bl: [],
    br: []
  };

  constructor(props: ToastNotificationProviderProps) {
    super(props);
    props.bindAddNotification(this.addNotification);
  }

  addNotification = (
    message: string, 
    position: ToastNotificationPosition = ToastNotificationPosition.TopLeft, 
    type: ToastNotificationType = ToastNotificationType.INFO
  ) => {
    if (!message) {
      console.warn('"message" argument wasn\'t defined');
      return null;
    }

    const addNotificationBelow = position.includes("t");
    const toast: IToastNotification = {
      id: ++this.idCounter,
      message,
      position,
      type,
      removeNotification: this.removeNotification,
      timeout: this.props.timeout || DEFAULT_TIMEOUT
    };

    if (!Object.keys(this.state).includes(position)) {
      console.warn('Please use following values for the position argument: "tl", "tr", "bl", "br"');
      return null;
    }

    if (!ToastNotificationType[type.toUpperCase() as any]) {
      console.warn('Please use following values for the type argument: "info", "warning", "alert"');
      return null;
    }

    this.setState(prevState => {
      return {
        ...prevState,
        [position]: addNotificationBelow ? [...prevState[position], toast] : [toast, ...prevState[position]]
      };
    });
  };

  removeNotification = (id: number, position: ToastNotificationPosition) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [position]: prevState[position].filter((notification: IToastNotification) => notification.id !== id)
      };
    });
  };

  render() {
    return Object.keys(this.state).map(position => {
      const notifications = this.state[position as keyof ToastNotificationProviderState];
      return (
        <div className={"ToastNotificationContainer ToastNotificationContainer--" + position} key={position}>
          <TransitionGroup>
          {
            notifications.map((notification: IToastNotification) => {
              return (
                <ToastNotification key={notification.id} notification={notification} />
              )
            })
          }
          </TransitionGroup>
        </div>
      );
    })
  }
}

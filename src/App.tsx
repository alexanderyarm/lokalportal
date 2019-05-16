import React from 'react';
import './App.css';
import ToastNotificationContainer from './ToastNotification/ToastNotificationContainer';

interface IWindowWithNotificationWidget extends Window {
  NotificationsWidget: {
    show: Function
  }
}

const w = window as IWindowWithNotificationWidget;

const App: React.FC = () => {
  const bindAddNotification = (fn: Function) => {
    w.NotificationsWidget = {
      show: fn
    }
  }

  return (
    <ToastNotificationContainer bindAddNotification={bindAddNotification}></ToastNotificationContainer>
  );
}

export default App;

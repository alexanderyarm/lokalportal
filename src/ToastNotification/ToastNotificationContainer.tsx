import React from "react";
import ReactDOM from "react-dom";
import ToastNotificationProvider from "./ToastNotificationProvider";

type ToastNotificationContainerProps = {
  bindAddNotification: (fn: Function) => void;
}

const ToastNotificationContainer: React.FC<ToastNotificationContainerProps> = (props) => {
  const toastNotificationPortal = document.getElementById('toastNotificationPortal') as Element;

  if (!toastNotificationPortal) {
    console.error('Please add <div id="toastNotificationPortal"></div> to your HTML markup');
    return null;
  }

  return ReactDOM.createPortal(
    <ToastNotificationProvider 
      timeout={3000}
      bindAddNotification={props.bindAddNotification}
    >
    </ToastNotificationProvider>,
    toastNotificationPortal
  )
} 

export default ToastNotificationContainer;
import React, {useEffect, useState} from 'react';
import './styles/ToastNotification.scss';
import { IToastNotification } from './typings/ToastNotification';
import { CSSTransition } from 'react-transition-group';

type ToastNotificationProps = {
  notification: IToastNotification;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({notification}) => {
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisibility(false)
    }, notification.timeout);
  });

  return (
    <CSSTransition 
      in={visibility} 
      unmountOnExit={true}
      timeout={300} 
      onExited={() => notification.removeNotification(notification.id, notification.position)}
      classNames="animation"
    >
      <div className={`ToastNotification ToastNotification--${notification.type} ToastNotification--${notification.position}`}>
        {notification.message}
      </div>
    </CSSTransition>
  )
}

export default ToastNotification;
import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { Portal } from '../../Portal';

import { NotificationProps } from '../types/Notifications.types';
import styles from '../styles/Notifications.module.less';

import NotificationManager from './NotificationManager';
import Notification from './Notification';

/**
 * @description Display a notification message globally
 *
 * @component
 * @example
 * ```jsx
 * <Notifications />
 * ```
 */
const Notifications = React.memo(() => {
  const cx = useStyles(styles);
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([]);

  React.useEffect(() => {
    NotificationManager.addChangeListener(handleStoreChange);

    return () => {
      NotificationManager.removeChangeListener(handleStoreChange);
    };
  }, []);

  React.useEffect(() => {
    setNotifications(NotificationManager.notifications);
  }, []);

  const handleClose = React.useCallback(id => {
    NotificationManager.remove(id);
  }, []);

  const items = React.useMemo(() => {
    return notifications.map(notification => {
      return <Notification key={notification.id} {...notification} onClose={handleClose} />;
    });
  }, [notifications]);

  const handleStoreChange = (items: NotificationProps[]) => {
    setNotifications(items);
  };

  return (
    <Portal>
      <div data-qa="Notifications" className={cx('container')}>
        <AnimatePresence>{items}</AnimatePresence>
      </div>
    </Portal>
  );
});

export default Notifications;

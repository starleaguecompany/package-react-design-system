import { EventEmitter } from 'events';
import { getUuid } from '@starleaguecompany/package-react-utils';

import { NotificationProps, Type, Callback } from '../types/Notifications.types';

const STATUSES: Record<string, Type> = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

const TIMEOUT = 15000;

class NotificationManager extends EventEmitter {
  public notifications: NotificationProps[] = [];

  constructor() {
    super();
  }

  create({ type = 'info', title, subtitle, message, timeout }: NotificationProps) {
    const opts = {
      id: getUuid(),
      type,
      title,
      subtitle,
      message,
    };

    this.notifications.unshift(opts);
    this.emitChange();

    setTimeout(() => {
      this.remove(opts.id);
    }, timeout);
  }

  // info(title: string, subtitle: string, message: string) {
  //   this.create({
  //     type: STATUSES.INFO,
  //     title,
  //     subtitle,
  //     message,
  //   })
  // }
  //
  // success(title: string, subtitle: string, message: string) {
  //   this.create({
  //     type: STATUSES.SUCCESS,
  //     title,
  //     subtitle,
  //     message,
  //   })
  // }
  //
  // warning(title: string, subtitle: string, message: string) {
  //   this.create({
  //     type: STATUSES.WARNING,
  //     title,
  //     subtitle,
  //     message,
  //   })
  // }
  //
  // error(title: string, subtitle: string, message: string) {
  //   this.create({
  //     type: STATUSES.ERROR,
  //     title,
  //     subtitle,
  //     message,
  //   })
  // }

  show(title: string, subtitle: string, message: string, timeout = TIMEOUT) {
    this.create({
      type: STATUSES.INFO,
      title,
      subtitle,
      message,
      timeout,
    });
  }

  remove(id: NotificationProps['id']) {
    this.notifications = this.notifications.filter(n => id !== n.id);
    this.emitChange();
  }

  emitChange() {
    this.emit('change', [...this.notifications]);
  }

  addChangeListener(callback: Callback) {
    this.addListener('change', callback);
  }

  removeChangeListener(callback: Callback) {
    this.removeListener('change', callback);
  }
}

export default new NotificationManager();

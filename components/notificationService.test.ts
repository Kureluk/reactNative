import * as Notifications from 'expo-notifications';
import { scheduleNotification, cancelNotification, registerForPushNotificationsAsync } from './notifications';

jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  setNotificationCategoryAsync: jest.fn(),
  AndroidImportance: {
    MAX: 4,
  },
}));

jest.mock('expo-device', () => ({
  isDevice: true,
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
  },
  Alert: {
    alert: jest.fn(),
  },
}));

describe('Notification Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('scheduleNotification', () => {
    it('should schedule a notification with correct parameters', async () => {
      const mockNotificationId = 'test-notification-id';
      (Notifications.scheduleNotificationAsync as jest.Mock).mockResolvedValue(mockNotificationId);

      const todoTitle = 'Test Task';
      const deadline = new Date('2023-12-31T23:59:59');
      
      const notificationId = await scheduleNotification(todoTitle, deadline);

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
        content: {
          title: 'Task Deadline!',
          body: `Your task "${todoTitle}" is due.`,
          data: { todoTitle },
          categoryIdentifier: 'taskActions',
        },
        trigger: {
          date: deadline,
        },
      });

      expect(notificationId).toBe(mockNotificationId);
    });

    it('should handle scheduling errors', async () => {
      const error = new Error('Failed to schedule');
      (Notifications.scheduleNotificationAsync as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await expect(scheduleNotification('Test Task', new Date()))
        .rejects
        .toThrow('Failed to schedule');

      expect(consoleSpy).toHaveBeenCalledWith('Error scheduling notification:', error);
      consoleSpy.mockRestore();
    });
  });

  describe('cancelNotification', () => {
    it('should cancel a scheduled notification', async () => {
      const notificationId = 'test-notification-id';
      await cancelNotification(notificationId);

      expect(Notifications.cancelScheduledNotificationAsync)
        .toHaveBeenCalledWith(notificationId);
    });

    it('should handle cancellation errors gracefully', async () => {
      const error = new Error('Failed to cancel');
      (Notifications.cancelScheduledNotificationAsync as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await cancelNotification('test-notification-id');

      expect(consoleSpy).toHaveBeenCalledWith('Error cancelling notification:', error);
      consoleSpy.mockRestore();
    });
  });

  describe('registerForPushNotificationsAsync', () => {
    it('should register for notifications on a real device', async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });

      await registerForPushNotificationsAsync();

      expect(Notifications.getPermissionsAsync).toHaveBeenCalled();
      expect(Notifications.setNotificationChannelAsync).toHaveBeenCalledWith('default', {
        name: 'default',
        importance: 4, 
      });
      expect(Notifications.setNotificationCategoryAsync).toHaveBeenCalledWith('taskActions', [
        {
          identifier: 'show',
          buttonTitle: 'Show',
          options: { opensAppToForeground: true },
        },
        {
          identifier: 'delete',
          buttonTitle: 'Delete',
          options: { opensAppToForeground: false },
        },
      ]);
    });

    it('should request permissions if not granted', async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });
      (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });

      await registerForPushNotificationsAsync();

      expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
    });

    it('should show alert if permissions not granted', async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });
      (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });

      const alertSpy = jest.spyOn(require('react-native').Alert, 'alert');

      await registerForPushNotificationsAsync();

      expect(alertSpy).toHaveBeenCalledWith('Failed to get push token for notifications!');
      alertSpy.mockRestore();
    });
  });
});
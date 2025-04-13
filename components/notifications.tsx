import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function scheduleNotification(todoTitle: string, deadline: Date) {
  const trigger = {
    date: deadline
  };

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Task Deadline!',
      body: `Your task "${todoTitle}" is due.`,
      data: { todoTitle },
      categoryIdentifier: 'taskActions',
    },
    trigger,
  });

  return notificationId;
}


export async function cancelNotification(notificationId: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error("Error cancelling notification:", error);
  }
}

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for notifications!');
      return;
    }
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });

    await Notifications.setNotificationCategoryAsync('taskActions', [
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
  }
}
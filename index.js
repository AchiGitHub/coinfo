/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification, { Importance } from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios'
});

PushNotification.createChannel(
    {
        channelId: "xxx1", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    },
);

var today = new Date();
today.setDate(today.getDate() + 1)
today.setHours(20)
today.setMinutes(0)
today.setMilliseconds(0)

PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    id: 5,
    channelId: "xxx1",
    message: "Have you checked the prices today?🤔 ", // (required)
    date: new Date(today), // in 60 secs
    repeatType: 'day'
});

AppRegistry.registerComponent(appName, () => App);

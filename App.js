/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Switch, Platform, PushNotificationIOS } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import thunk from 'redux-thunk';
import { AdMobBanner, PublisherBanner } from 'react-native-admob';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import reducers from './src/reducers';

import List from './src/container/List';
import WishList from './src/container/WishList';
import PushNotification, { Importance } from 'react-native-push-notification';

// Middlewares: applyMiddleware() tells createStore() how to handle middleware
const middleware = applyMiddleware(thunk);

// Create store
let store = createStore(reducers, middleware);

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

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
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

var today = new Date();
let now = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0);

PushNotification.localNotificationSchedule({
  //... You can use all the options from localNotifications
  channelId: "xxx1",
  message: "Have you checked the prices today?🤔 ", // (required)
  date: new Date(now), // in 60 secs
  allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  repeatType: "day",
});


const App = (props) => {

  const [isDark, setIsDark] = useState(false);
  const toggleSwitch = () => setIsDark(previousState => !previousState);

  const Tab = createBottomTabNavigator();

  const homeView = () => {
    return (
      <SafeAreaView style={!isDark ? styles.container : styles.containerLight}>
        <View style={styles.header}>
          <Text style={!isDark ? styles.headerText : styles.headerTextLight}>Coins</Text>
          {/* <View style={styles.themeToggle}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDark ? "#f4f3f4" : "#5E6172"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isDark}
            />
          </View> */}
        </View>
        <List theme={isDark} />
        <View style={styles.adSlot}>
          <AdMobBanner
            adSize="mediumBanner"
            // adUnitID="ca-app-pub-3940256099942544/6300978111" //test ad id
            adUnitID="ca-app-pub-8167817804987450/7911429163"  //production id
            testDeviceID={[PublisherBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
            onAppEvent={event => console.log(event.name, event.info)}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {Platform.OS === "ios" && <StatusBar barStyle={!isDark ? "light-content" : "dark-content"} />}
        <Tab.Navigator tabBarOptions={{
          activeBackgroundColor: '#191721',
          inactiveBackgroundColor: '#191721',
          activeTintColor: '#fff'
        }}>
          <Tab.Screen name="Home" component={homeView} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            )
          }}
          />
          <Tab.Screen name="Wish list" component={WishList} options={{
            tabBarLabel: 'Wish List',
            tabBarIcon: ({ color, size }) => (
              <FontistoIcon name="favorite" color={color} size={size} />
            )
          }}
          />
        </Tab.Navigator>
      </NavigationContainer >
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191721',
    flex: 1
  },
  header: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    // fontFamily: 'Roboto'
  },
  themeToggle: {
    position: 'absolute',
    top: 0,
    right: 15
  },
  headerTextLight: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    // fontFamily: 'Roboto'
  },
  containerLight: {
    backgroundColor: '#fff',
    flex: 1
  },
  adSlot: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  }
});

export default App;

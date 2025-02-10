import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
SplashScreen.hide();
  return (
    <>
      <GestureHandlerRootView style={{flex: 1, position: 'relative'}}>
        <Provider store={store}>
          <NavigationContainer>
            <Navigation />
            {/* <Toast /> */}
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;

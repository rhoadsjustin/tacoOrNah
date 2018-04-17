/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native'

import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'

import PredictScreen from './screens/PredictScreen'

const App = StackNavigator({
  Home: { screen: HomeScreen },

  Prediction: { screen: PredictScreen }

})

export default App 
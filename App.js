import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export default class App extends Component {
  render() {

    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me',
      null,
      this._responseInfoCallback,
    )

    return (
      <View style={styles.container}>
        <LoginButton
          readPermissions={['public_profile', 'email', 'user_location']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                window.alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                window.alert("Login was cancelled");
              } else {
                window.alert("Login was successful with permissions: " + result.grantedPermissions)
                new GraphRequestManager().addRequest(this.infoRequest).start();
              }
            }
          }
          onLogoutFinished={() => window.alert("User logged out")} />
      </View>
    );
  }

  //Create response callback.
  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error fetching data: ' + JSON.stringify(error));
    } else {
      alert('Success fetching data: ' + JSON.stringify(result));
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

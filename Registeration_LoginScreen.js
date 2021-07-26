import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import db from '../config.js';
import firebase from 'firebase';
require('firebase/auth')
import LottieAnimation from '../components/Lottie.js';
import LottieRegiAnimation from "../components/Lottie_Registeration"

export default class Registeration_LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      confirmPassword: '',
      isModalVisible: 'false',
      name: '',
      parent_contact: '',
      age: '',
    };
  }
  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            name: this.state.name,
            mobile_number: this.state.parent_contact,
            email_id: this.state.emailId,
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        // return Alert.alert('Successful Login');
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>

        <View style={styles.modalContainer}>

        <ScrollView style={{ width: '100%' }}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text  style={styles.modalTitle}>Registration</Text>
            {/* <LottieRegiAnimation/> */}

            <TextInput
             style={styles.formTextInput}
              placeholder={'Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  name: text,
                });
              }}
            />
            <TextInput
             style={styles.formTextInput}
              placeholder={'Contact'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  parent_contact: text,
                });
              }}
            />
            <TextInput
             style={styles.formTextInput}
              placeholder={'Email'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
            <TextInput
             style={styles.formTextInput}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TextInput
             style={styles.formTextInput}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }>
                <Text style ={styles.registerButtonText} >Register</Text>
              </TouchableOpacity>
            </View>
            <View  style={styles.modalBackButton}>
              <TouchableOpacity
              style={styles.cancelButton}
                onPress={() => this.setState({ isModalVisible: false })}>
                <Text style={{ color: '#ff5722' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (

      <View style={styles.container}>
      
        {this.showModal()}

           <View style={{ justifyContent: "center", alignItems: "center" }}>

             <Text style={styles.title}> Cyber Kavach </Text>

             </View>

             {/* <LottieAnimation /> */}

               <View>
            <TextInput
              style={styles.loginBox}
              placeholder="abc@example.com"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              placeholder="Enter Password"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          

          
            <TouchableOpacity
               style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
              onPress={() => {
                this.userLogin(this.state.emailId, this.state.password);
                }}>
              <Text style={styles.buttonText} >Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={styles.button}
              onPress={() => this.setState({ isModalVisible: true })}>
              <Text style={styles.buttonText} >Register</Text>
            </TouchableOpacity>
          </View>
        
   </View>
    );
  }
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#00E5F7",
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "white"
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#7384E7",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "white",
    margin: 50
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor : "white"
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  registerButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "blue",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    borderColor : "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "200",
    fontSize: 20
  },
})


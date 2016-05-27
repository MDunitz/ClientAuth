//reduxThunk allows action creators to return functions (instead of objects)-dont need to import it b/c set it as middleware
//this allows them to return multiple actions and add logic as well
//this wont be sync, can wait to dispatch an action?
import axios from 'axios';
//can use browserHistory to communicate info about the url to the react-router, or to make changes to the url
import { browserHistory } from 'react-router'

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';


const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}){
  //this functions gives us direct access to the dispatch object
  //call dispatch and pass in an action === calling that actions's action creator and returning a plain object as an action
  return function(dispatch){
    //submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password} )
      //if request is good
      .then(response => {
        // update state to indicate user is authenticated
        dispatch( { type: AUTH_USER } );
        //save JWT token to local storage-local storage is an object that is always avialable on window scope, use setItem method to save it to local storage and pass it a name and a value
        localStorage.setItem('token', response.data.token);
        //redirect to the route '/feature' -push a new route onto the stack
        browserHistory.push('/feature');
      })
      //if request is bad...
      .catch((err)=>{
        //show an error to user
        //console.log(err);
        dispatch(authError('bad login info'));
      });
    
  
  }
  
}

export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(response => dispatch(authError(response.data.error)))
  }
} 

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}


export function signoutUser(){

  //get rid of JWT token
  localStorage.removeItem('token');
  //return unauth_user action (Which will set the state.authenticated to false-in auth_reducer)
  return {type: UNAUTH_USER}
}


export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, { //second argument for axios is the options object, can pass in headers
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}













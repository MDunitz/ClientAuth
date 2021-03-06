import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions'; //all actions on this.props


class Signup extends Component {
  handleFormSubmit(formProps){
    //****Call action creator to sign up the user****
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render(){
      const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props 
      //TODO refactor for dryness
    return(
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};
  //TODO -refadctor validation logic with forEach or map
  if(!formProps.email){
    errors.email = 'Please enter an email';
  }

  if(!formProps.password){
    errors.password = 'please enter a password';
  }

  if(!formProps.passwordConfirm){
    errors.passwordConfirm = 'please confirm password';
  }

  if(formProps.password!==formProps.passwordConfirm){
    errors.passwordConfirm = 'Passwords must match';
  }
  //whenever we return the errors object the properties on it will be assigned as errors on the equivelent fields object (ie errors.password gets passed to password.error)
  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup); //pass in actions to be able to access it from props











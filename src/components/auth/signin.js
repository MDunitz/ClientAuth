import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


class Signin extends Component {
  handleFormSubmit({ email, password }){
    //TODO something to log user in
    this.props.signinUser({email, password})
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
        <strong>Oops!</strong>{this.props.errorMessage}
        </div>
      );
    }
  }

//redux form gives us access to this.props.fields.email/password and this.props.handleSubmit 
  render() {
    
    const { handleSubmit, fields: {email, password }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}


//using redux form, wrap component with redux form helper when exporting it. Inside the helper is where we define the fields

//pass reduxForm configuration (an object containing the options for the form itself. First item in object is the name of the form-where redux-form will put property names in applications state, fields are the property names we want produced)
//then call it with the component we are wrapping
//redux form is identical to connect with just one added argument of the object with the form name/fields
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)

//to use it we also have to hook up redux-form  reducer in the reducer/index.js file
//fieldset element is a way to semantically group input/label elements
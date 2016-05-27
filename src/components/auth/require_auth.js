import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent){
  class Authentication extends Component {
    //context is like props, but allows you to skip levels in component heirarchy, to prevent abuse react forces you to define contextTypes properties ahead of time
    //the line below adds router to this.context
    //static-defines a class level property, anything can access Authentication.contextTypes. Defining a property on the actual class-not just an instance (this is what static is doing)
    static contextTypes={
      router: React.PropTypes.object
    }
    //when this component is about to render
    componentWillMount(){
      if(!this.props.authenticated)
      this.context.router.push('/');
    }
    //gets called whenever the component is about to be handed a new set of props/be rerendered-this function will kick the user out of the authenticated routes if they sign out
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated){
        this.context.router.push('/');
      }

    }
    render() {
      //pass it any props it was called with
      return <ComposedComponent {...this.props} />
    }
  }
  function mapStateToProps(state){
    return {authenticated: state.auth.authenticated}
  }

  return connect(mapStateToProps)(Authentication);
}



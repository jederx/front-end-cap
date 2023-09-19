import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          fields: {},
          errors: {},
        };
      }
    
      handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
     //Email
     if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      }
      if (typeof fields["email"] !== "undefined") {
          let lastAtPos = fields["email"].lastIndexOf("@");
          let lastDotPos = fields["email"].lastIndexOf(".");
    
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              fields["email"].indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              fields["email"].length - lastDotPos > 2
            )
          ) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
          }
        }

        //Password
        if (!fields["password"]) {
          formIsValid = false;
          errors["phone"] = "Cannot be empty";
        }
        if (typeof fields["password"] !== "undefined") {
          if (fields["password"].length < 4) {
              formIsValid = false;
              errors["password"] ="Your password needs a minimum of four characters";
            } else if (fields["password"].search(/[a-z]/) < 0) {
              formIsValid = false;
              errors["password"] ="Your password needs a lower case letter";
            } else if(fields["password"].search(/[A-Z]/) < 0) {
              formIsValid = false;
              errors["password"] ="Your password needs an uppser case letter";
            } else  if (fields["password"].search(/[0-9]/) < 0) {
              formIsValid = false;
              errors["password"] ="Your password needs a number";
            } else {
                // Pass is OK
            }
        }
    
        this.setState({ errors: errors });
        return formIsValid;
      }

      contactSubmit(e) {
        e.preventDefault();
    
        if (this.handleValidation()) {
          alert("Form submitted");
        } else {
          alert("Form has errors.");
        }
      }
    
      handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
      }

      cancelCourse = () => { 
        this.setState({
            fields: {},
            errors: {},
          });
        }

   
    render() {
  
    return (
        <div>
          <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? <span><Link to="../Sign_Up" style={{color: '#2190FF'}}> Sign Up Here</Link></span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={this.contactSubmit.bind(this)}>
              <div className="form-group">
                        <label for="email">Email</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control" 
                        placeholder="Enter your email" 
                        aria-describedby="helpId"
                        onChange={this.handleChange.bind(this, "email")}
                        value={this.state.fields["email"]} />
                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    </div>
              <div className="form-group">
                <label for="password" >Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  onChange={this.handleChange.bind(this, "password")}
                  value={this.state.fields["password"]} />
                  <span style={{ color: "red" }}>{this.state.errors["password"]}</span>

              </div>


              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={this.cancelCourse}>Reset</button>
              </div>
              <br />
              <div className="login-text">
                Forgot Password?
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
        );
    }
}

export default Login;
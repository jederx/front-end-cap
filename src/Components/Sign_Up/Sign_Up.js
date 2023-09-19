import React from 'react';
import { Link } from "react-router-dom";
import './Sign_Up.css';

class Sign_Up extends React.Component {
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
    
        //Name
        if (!fields["name"]) {
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }
    
        if (typeof fields["name"] !== "undefined") {
          if (!fields["name"].match(/^[a-zA-Z\s\.\,]+$/)) {
            formIsValid = false;
            errors["name"] = "Only letters";
          }
        }
        
        //Phone
        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "Cannot be empty";
        }
        if (typeof fields["phone"] !== "undefined") {
          const digits_only = string => [...string].every(c => '0123456789'.includes(c));
          if (!digits_only(fields["phone"])) {
            formIsValid = false;
            errors["phone"] = "Only numbers";
          } else if (fields["phone"].length !== 10) {
            formIsValid = false;
            errors["phone"] ="Phone number must be 10 digits long";
          } else {
            // Pass is OK
          }
        }

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
          <div className="container" style={{marginTop: '5%'}}>
          <div className="signup-grid">
            <div className="signup-text">
                <h1>Sign Up</h1>

            </div>
            <div className="signup-text1" style={{textAlign: 'left'}}>
                Already a member? <span><Link to="../Login" style={{color: '#2190FF'}}> Login</Link></span>
            </div>
            <div className="signup-form">
                <form onSubmit={this.contactSubmit.bind(this)}>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        required className="form-control" 
                        placeholder="Enter your name" 
                        aria-describedby="helpId" 
                        onChange={this.handleChange.bind(this, "name")}
                        value={this.state.fields["name"]}/>
                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                    </div>
                    <div className="form-group">
                        <label for="phone">Phone</label>
                        <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        required className="form-control" 
                        placeholder="Enter your phone number" 
                        aria-describedby="helpId" 
                        onChange={this.handleChange.bind(this, "phone")}
                        value={this.state.fields["phone"]}/>
                        <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required className="form-control" 
                        placeholder="Enter your email" 
                        aria-describedby="helpId"
                        onChange={this.handleChange.bind(this, "email")}
                        value={this.state.fields["email"]} />
                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input 
                        name="password" 
                        id="password" 
                        required className="form-control" 
                        placeholder="Enter your password" 
                        aria-describedby="helpId" 
                        onChange={this.handleChange.bind(this, "password")}
                        value={this.state.fields["password"]} />
                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>


                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={this.cancelCourse}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
        </div>
        );
    }
}

export default Sign_Up;
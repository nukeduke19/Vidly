import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        toast.error(ex.response.data);
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div style={styles.containerStyles}>
        <h1>Please Sign in</h1>
        <form
          style={styles.formStyles}
          onSubmit={this.handleSubmit}
          className="shadow-lg p-3 mb-5 bg-white rounded"
        >
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

const styles = {
  containerStyles: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  formStyles: {
    maxWidth: 500,
    width: "100%",
    marginTop: 10,
    padding: 40,
  },
};

export default LoginForm;

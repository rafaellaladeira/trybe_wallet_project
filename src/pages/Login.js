import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailForm } from '../actions';

const MIN_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      inputValid: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.inputValid();
    });
  }

  inputValid = () => {
    const { email, password } = this.state;
    const passwordOk = password.length >= MIN_LENGTH;
    const emailOk = email.match(/[\w.-]+@[\w.-]+\.[A-Z]/gmi); // dados antes @ e pós e pós .
    this.setState({
      inputValid: passwordOk && emailOk,
    });
  }

  handleButton = (e) => {
    e.preventDefault();
    const { user, history } = this.props;
    const { email } = this.state;
    user(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, inputValid } = this.state;
    return (
      <form onSubmit={ this.handleButton }>
        <div>Login: </div>
        <input
          data-testid="email-input"
          name="email"
          type="email"
          required
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          minLength="6"
          required
          value={ password }
          placeholder="Senha"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          label="Entrar"
          onClick={ this.handleButton }
          disabled={ !inputValid }
        >
          Entrar
        </button>
      </form>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(emailForm(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  user: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

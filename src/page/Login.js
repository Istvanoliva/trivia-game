import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginName, loginEmail, tokenThunk } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.validateButton);
  }

  handleClick() {
    const { history,
      setTokenDispatch, loginEmailDispatch, loginNameDispatch } = this.props;
    const { nome, email } = this.state;
    setTokenDispatch();
    loginEmailDispatch(email);
    loginNameDispatch(nome);
    history.push('/jogo');
  }

  handleSettingsClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  validateButton() {
    const { nome, email } = this.state;
    if (nome && email) this.setState({ disabled: false });
  }

  render() {
    const { nome, email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="nome">
          <input
            type="text"
            name="nome"
            value={ nome }
            id="nome"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
          Nome
        </label>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          Email
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ disabled }
        >
          Play
        </button>
        <button
          onClick={ this.handleSettingsClick }
          data-testid="btn-settings"
          type="button"
        >
          Configuração
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  setTokenDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginNameDispatch: (nome) => dispatch(loginName(nome)),
  loginEmailDispatch: (email) => dispatch(loginEmail(email)),
  setTokenDispatch: () => dispatch(tokenThunk()),
});
export default connect(null, mapDispatchToProps)(Login);

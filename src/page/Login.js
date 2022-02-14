import React from 'react';
import { connect } from 'react-redux';
import { loginName, loginEmail } from '../redux/actions';

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
  }

  validateButton() {
    const { nome, email } = this.state;
    if (nome && email) this.setState({ disabled: false });
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, this.validateButton);
  }

  handleClick() {
    console.log('clicou');
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
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginNameDispatch: (nome) => dispatch(loginName(nome)),
  loginEmailDispatch: (email) => dispatch(loginEmail(email)),
});
export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timeCountDown } from '../redux/actions';

class Header extends React.Component {
  render() {
    const { userEmailGravatar, userName, scoreUser } = this.props;
    const hash = md5(userEmailGravatar).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt="userImage"
        />
        <h2 data-testid="header-player-name">{ userName }</h2>
        <h3 data-testid="header-score">{ scoreUser }</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginRedux: { email, nome } } = state;
  const { player: { score } } = state;
  return {
    userEmailGravatar: email,
    userName: nome,
    scoreUser: score,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchTimer: (timeOver, isDisabled) => dispatch(timeCountDown(timeOver, isDisabled)),
});

Header.propTypes = {
  userEmailGravatar: PropTypes.string,
  userName: PropTypes.string,
  scoreUser: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);

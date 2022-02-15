import React from 'react';
import md5 from "crypto-js/md5";
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {
    const { userEmailGravatar, userName, scoreUser } = this.props;
    const hash = md5(userEmailGravatar).toString();
    return (
      <header>
        <img
          src={`https://www.gravatar.com/avatar/${hash}`}
          data-testid="header-profile-picture"
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
  }
}

export default connect(mapStateToProps)(Header);

{/* <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />

// md5(emailDoUsuário).toString(); */}
import React from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../service/fetchAPI';
import Header from '../components/Header';

class Jogo extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     token: '',
  //     player: {},
  //   };
  // }

  componentDidMount = () => {
    fetchAPI();
  }

  render() {
    const { history } = this.props;
    return (
      <Header history={ history } />
    );
  }
}

Jogo.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
}.isRequired;

export default Jogo;

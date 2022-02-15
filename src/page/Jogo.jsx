import React from 'react';
import fetchAPI from '../service/fetchAPI';

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
    return (
      <header />
    );
  }
}

export default Jogo;

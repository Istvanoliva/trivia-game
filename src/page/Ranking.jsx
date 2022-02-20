import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  onclick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <button
            type="button"
            onClick={ this.onclick }
            data-testid="btn-go-home"
          >
            Go Home
          </button>
        </div>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
}.isRequired;

export default Ranking;

/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, fetchAPItest, fetchAsks } from '../service/fetchAPI';
import { newTokenRedux } from '../redux/actions';
import Header from '../components/Header';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  async componentDidMount() {
    await this.validateToken();
  }

  validateToken = async () => {
    const { tokenRandom, dispatchToken } = this.props;
    await fetchAPItest();
    const results = await fetchAsks(localStorage.getItem('token'));
    const three = 3;
    if (results.response_code === three) {
      console.log('entrei2');
     const resquestToken = await fetchAPI();
      const newToken = localStorage.getItem('token');
      await dispatchToken(resquestToken.token);
      const newResults = await fetchAsks(resquestToken.token);
      return this.setState({
        results: newResults.results,
      });
    }
    console.log('entrei1');
    this.setState({
      results: results.results,
    });
  }

  render() {
    const { results } = this.state;
    console.log(results);
    const resultsLength = results.length !== 0;
    return (
      <>
        <Header />
        <main>
          { resultsLength && results.map((result) => (
            <div key={ Math.random() }>
              <h4 data-testid="question-category">
                {result.category}
              </h4>
              <h3
                key={ result.question }
                data-testid="question-text"
              >
                {result.question}

              </h3>
              <button
                data-testid="correct_answer"
                type="button"
              >
                {result.correct_answer}

              </button>
              <div>
                {result.incorrect_answers.map((answer, index) => (
                  <section key={ index } data-testid="answer-options">
                    <button
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {answer}
                    </button>
                  </section>
                )).sort()}
              </div>
            </div>

          ))}
        </main>

      </>
    );
  }
}

Jogo.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
}.isRequired;

const mapStateToProps = (state) => {
  const { token } = state;
  return {
    tokenRandom: token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: () => dispatch(newTokenRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);

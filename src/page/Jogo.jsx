/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPItest, fetchAsks } from '../service/fetchAPI';
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
    const token = await fetchAPItest();
    const results = await fetchAsks(token.token);
    const three = 3;
    if (results.response_code === three) {
      const newToken = localStorage.getItem('token');
      const newResults = await fetchAsks(newToken);
      return this.setState({
        results: newResults.results,
      });
    }
    this.setState({
      results: results.results,
    });
  }

  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
     asksRandom = (resultsCorrect, incorrectResults) => {
    const answer = [...incorrectResults, resultsCorrect];

  for (let i = answer.length - 1; i > 0; i -= 1) {
          // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [answer[i], answer[j]] = [answer[j], answer[i]];
  }
  // Retornando array com aleatoriedade
  return answer;
}

   verificaCorreta(correctAnswer, answer, incorrectAnswers) {
     console.log(incorrectAnswers, answer);
    if (correctAnswer === answer) {
     return 'correct-answer';
    }
    const index = incorrectAnswers.findIndex((incAnswe) => incAnswe === answer);
    console.log(index);
      return `wrong-answer-${index}`;
   }

  render() {
    const { results } = this.state;
    const resultsLength = results.length !== 0;
    return (
      <>
        <Header />
        <main>
          { resultsLength && (
            <div key={ Math.random() }>
              <h4 data-testid="question-category">
                {results[0].category}
              </h4>
              <h3
                key={ results[0].question }
                data-testid="question-text"
              >
                {results[0].question}

              </h3>
              <div>
                {this.asksRandom(results[0].correct_answer,
                results[0].incorrect_answers).map((answer, index) => (
                  <section key={ index } data-testid="answer-options">
                    <button
                      type="button"
                      data-testid={ this.verificaCorreta(results[0].correct_answer,
                        answer,
                        results[0].incorrect_answers) }
                    >
                      {answer}
                    </button>
                  </section>
                 ))}

              </div>
            </div>

          )}
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPItest, fetchAsks } from '../service/fetchAPI';
import { newTokenRedux } from '../redux/actions';
import Header from '../components/Header';

const HARD = 3;
const MEDIUM = 2;
const EASY = 1;

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      correta: '',
      incorreta: '',
      timer: 30,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.validateToken();
    this.timer();
    localStorage.setItem('player', [0]);
  }

  // componentDidUpdate() {
  //   this.stop();
  // }

  timer = () => {
    const ONE_SECOND = 1000;
    console.log(setInterval(() => {
      console.log('interval');
      const { timer } = this.state;
      if (timer > 0) {
        this.setState((prev) => ({ timer: prev.timer - 1 }));
      } else {
        this.setState({ isDisabled: timer === 0 });
        // const setIntervalID = 5;
        // if (timer === 0);
        // clearInterval(setIntervalID);
      }
    }, ONE_SECOND));
  }

  // stop = () => {
  //   const { timer } = this.state;
  //   const setIntervalID = 6;
  //   if (timer === 0);
  //   clearInterval(setIntervalID);
  // }

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
  };

  difficultLevel = () => {
    const { results } = this.state;
    const selectLevel = results[0].difficulty;
    if (selectLevel === 'hard') return HARD;
    if (selectLevel === 'medium') return MEDIUM;
    if (selectLevel === 'easy') return EASY;
  }

  upDateScore = ({ target }) => {
    this.setState({
      incorreta: 'red',
      correta: 'green',
    });

    const DEZ = 10;
    const { timer } = this.state;
    const selectAnswer = target.getAttribute('data-testid').includes('correct');
    if (selectAnswer) {
      const newScore = (DEZ + (timer * this.difficultLevel()));
      const get = localStorage.getItem('player');
      const newPoints = [...get, newScore];
      // console.log(newPoints);
      // const set = localStorage.setItem('player', JSON.stringify(newScore));
      const sum = newPoints.reduce((acc, curr) => Number(acc) + Number(curr));
      localStorage.setItem('player', sum);
      console.log(sum);
      // return set ? sum : get;
      // return addPoints;
    }
  };

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
  };

  verificaCorreta(correctAnswer, answer, incorrectAnswers) {
    if (correctAnswer === answer) {
      return 'correct-answer';
    }
    const index = incorrectAnswers.findIndex((incAnswe) => incAnswe === answer);
    return `wrong-answer-${index}`;
  }

  render() {
    const { results, correta, incorreta, timer, isDisabled } = this.state;
    const resultsLength = results.length !== 0;
    return (
      <>
        <Header />
        <h2>{ timer }</h2>
        <main>
          {resultsLength && (
            <div key={ Math.random() }>
              <h4 data-testid="question-category">{results[0].category}</h4>
              <h3 key={ results[0].question } data-testid="question-text">
                {results[0].question}
              </h3>
              <div>
                {this.asksRandom(
                  results[0].correct_answer,
                  results[0].incorrect_answers,
                ).map((answer, index) => (
                  <section key={ index } data-testid="answer-options">
                    <button
                      name={ results[0].difficulty }
                      onClick={ this.upDateScore }
                      className={
                        answer === results[0].correct_answer
                          ? `${correta}`
                          : `${incorreta}`
                      }
                      disabled={ isDisabled }
                      type="button"
                      data-testid={ this.verificaCorreta(
                        results[0].correct_answer,
                        answer,
                        results[0].incorrect_answers,
                      ) }
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
    // timerInfos: isDisabled,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: () => dispatch(newTokenRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);

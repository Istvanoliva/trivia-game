import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPItest, fetchAsks } from '../service/fetchAPI';
import { newTokenRedux, userInfos } from '../redux/actions';
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
    localStorage.setItem('score', 0);
  }

  timer = () => {
    const ONE_SECOND = 1000;
    console.log(setInterval(() => {
      console.log('interval');
      const { timer } = this.state;
      if (timer > 0) {
        this.setState((prev) => ({ timer: prev.timer - 1 }));
      } else {
        this.setState({ isDisabled: timer === 0 });
      }
    }, ONE_SECOND));
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
      const get = localStorage.getItem('score');
      const novosPontos = Number(get) + Number(newScore);
      localStorage.setItem('score', novosPontos);
      const getScore = localStorage.getItem('score');
      console.log(getScore);
      const { dispatchScore } = this.props;
      dispatchScore(null, null, getScore, null);
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

  onclick = () => {
    const { history } = this.props;
    history.push('/');
  }

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
        <div>
          {incorreta !== '' && correta !== ''
            ? <button type="button" data-testid="btn-next">Next</button>
            : null}
        </div>
        <div>
          <button
            type="button"
            onClick={ this.onclick }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </div>
      </>
    );
  }
}

Jogo.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
}.isRequired;

const mapStateToProps = (state) => {
  const { token } = state;
  console.log(state);
  return {
    tokenRandom: token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: () => dispatch(newTokenRedux()),
  dispatchScore: (name, assertions,
    score, gravatarEmail) => dispatch(userInfos(name, assertions, score, gravatarEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);

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
      counter: 0,
      answerss: [],
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

   counterAsks = () => {
   const { results } = this.state;
   const answers = results.map((answer) => ([
   answer.correct_answer, ...answer.incorrect_answers,
   ]));
   this.setState({
     answerss: answers,
   });
   }

  render() {
    const { results, answerss, counter } = this.state;
    console.log(answerss);
    const resultsLength = results.length !== 0;
    return (
      <>
        <Header />
        <main>
          { resultsLength && results[counter].map((result) => (
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
              {/* <button
                data-testid="correct_answer"
                type="button"
              >
                {result.correct_answer}

              </button> */}
              <div>
                {/* {answerss[counter].map((answer, index) => (
                  <section key={ index } data-testid="answer-options">
                    <button
                      onClick={ this.counterAsks }
                      type="button"
                      data-testid={ `wrong-answer-${index}` }
                    >
                      {answer}
                    </button>
                  </section>
                )).sort()} */}
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

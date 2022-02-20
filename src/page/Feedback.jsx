import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  feedBackMessagem() {
    const { aksAssertions } = this.props;
    const THREE = 3;
    if (aksAssertions < THREE) {
      return (<span data-testid="feedback-text">Could be better...</span>);
    }
    return (<span data-testid="feedback-text">Well Done!</span>);
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.feedBackMessagem()}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { assertions } } = state;
  return {
    aksAssertions: assertions,
  };
};

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  aksAssertions: PropTypes.number.isRequired,
};

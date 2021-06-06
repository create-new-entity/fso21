import React from 'react';

import Statistic from './Statistic';

const Statistics = ({ good, neutral, bad }) => {
  if(good + neutral + bad <= 0) {
    return (
      <>
        No feedback given
      </>
    );
  }
  return (
    <>
      <table>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={good + neutral + bad}/>
        <Statistic text="average" value={(good - bad) / (good + neutral + bad)}/>
        <Statistic text="positive" value={(good / (good + neutral + bad)) * 100}/>
      </table>
    </>
  );
}

export default Statistics;
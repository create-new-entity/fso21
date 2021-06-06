import React from 'react';

const Statistic = ({ text, value }) => {
  return (
    <>
      <p>{text} {value}</p>
    </>
  );
};

export default Statistic;
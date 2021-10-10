import React from 'react';

interface Header {
  header: string
}

const Header = ({ header }: Header) => {
  return <h1>{header}</h1>
};

export default Header;
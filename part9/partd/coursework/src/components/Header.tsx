import React from 'react';

interface Header {
  header: string
}

const Header = ({ header }: Header) => {
  return <strong><h1>{header}</h1></strong>
};

export default Header;
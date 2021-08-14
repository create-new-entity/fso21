import React, { useState, useImperativeHandle  } from 'react';

const Togglable = React.forwardRef(
  (props, ref) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };

    const toggleVisibility = () => {
      setVisible(!visible);
      props.resetFn();
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility
      };
    });

    return (
      <React.Fragment>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.showContentButtonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>{props.hideContentButtonLabel}</button>
        </div>
      </React.Fragment>
    );
  }
);

Togglable.displayName = 'Togglable';

export default Togglable;
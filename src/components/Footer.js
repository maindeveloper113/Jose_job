import React, { Component } from 'react';

export default class Footer extends Component {

  render() {
    const footerStyle = {
      height: '600px',
      backgroundColor: '#333',
      width: '100%',
      clear: 'both'
    }
    return (
      <div id="footer" style={footerStyle}></div>
    );
  }
}

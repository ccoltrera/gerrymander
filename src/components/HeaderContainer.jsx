'use strict';
var React = require('react');

var HeaderContainer = React.createClass({
  render: function() {
    // check back here for better transitions and mask http://callmenick.com/post/slide-and-push-menus-with-css3-transitions
    return (
      <header>
        <h1>Gerrymander</h1>
      </header>
    );
  }
});

module.exports = HeaderContainer;

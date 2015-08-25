'use strict';
var React = require('react');

var SideNavContainer = React.createClass({
  render: function() {
    return (
      <nav id="nav">
        <h3>Nav header</h3>
        <ul>
          <li>test nav</li>
          <li>test nav</li>
          <li>test nav</li>
          <li>test nav</li>
          <li>test nav</li>
          <li>test nav</li>
          <li>test nav</li>
        </ul>
      </nav>
    );
  }
});

module.exports = SideNavContainer;

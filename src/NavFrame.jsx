'use strict';
var React = require('react');

var NavFrame = React.createClass({
  render: function() {
    return (
      <footer>
        <ul id="mainMenue" role="navigation">
          <li>
            <a><span className="text">PEOPE</span>
            <span className="icon"></span></a>
          </li>
          <li>
            <a><span className="text">JOBS</span>
            <span className="icon"></span></a>
          </li>
          <li>
            <a><span className="text">HOUSING</span>
            <span className="icon"></span></a>
          </li>
          <li>
            <a><span className="text">ECONOMIC</span>
            <span className="icon"></span></a></li>
          <li>
            <a><span className="text">EDUCATION</span>
            <span className="icon"></span></a>
          </li>
        </ul>
      </footer>
    );
  }
});

module.exports = NavFrame;

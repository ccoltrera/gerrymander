'use strict';
var React = require('react');

var InfoDisplay = React.createClass({
  render: function() {
    return (
      <aside className="right-side-info">
        <p>This pannel shows up when a district is clicked</p>
        <p>Add close button</p>
        <button>PEOPLE</button><br />
        <button>JOBS</button><br />
        <button>HOUSING</button><br />
        <button>ECONOMIC</button><br />
        <button>EDUCATION</button><br />
      </aside>
    );
  }
});

module.exports = InfoDisplay;

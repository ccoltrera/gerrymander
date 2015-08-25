'use strict';
var React = require('react');

var FooterContainer = React.createClass({

  render: function() {
    return (
      <footer>
        <ul id="mainMenue" role="navigation">
          <li>
            <a onclick={this.props.selectInfo(str)}><span className="text">PEOPE</span>
            <span className="icon"></span></a>
          </li>
          <li>
            <a onclick={this.openModal}><span className="text">JOBS</span>
            <span className="icon"></span></a>
          </li>
          <li>
            <a onclick={this.openModal}><span className="text">HOUSING</span>
            <span className="icon"></span></a>
          </li>
          <li>
            <a onclick={this.openModal}><span className="text">ECONOMIC</span>
            <span className="icon"></span></a></li>
          <li>
            <a onclick={this.openModal}><span className="text">EDUCATION</span>
            <span className="icon"></span></a>
          </li>
        </ul>
      </footer>
    );
  }
});

module.exports = FooterContainer;

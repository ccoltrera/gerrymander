'use strict';
var React = require('react');

var NavFrame = React.createClass({
  buttons: ['INFO', 'MONEY', 'EDUCATION', 'PEOPLE', 'ELECTIONS'],
  clickHandle: function(i) {
    this.props.selectInfoType(this.buttons[i]);
  },

  render: function() {
    return (
      <footer>
        <ul id="mainMenue" role="navigation">
          {this.buttons.map(function(button, i) {
            return (
              <li id={button} onClick={this.clickHandle.bind(this, i)} key={i} >
                <span className="text">{button}</span>
                <span className={"icon " + button}></span>
              </li>
            );
          }, this)}
        </ul>
      </footer>
    );
  }
});

module.exports = NavFrame;

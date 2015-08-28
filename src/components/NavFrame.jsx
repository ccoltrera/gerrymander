'use strict';
var React = require('react');

var NavFrame = React.createClass({
  buttons: ['INFO', 'MONEY', 'EDUCATION', 'RACE', 'ELECTIONS'],
  icons: ['info-circle', 'usd', 'graduation-cap', 'users', 'check-square-o'],
  clickHandle: function(i) {
    this.props.selectInfoType(this.buttons[i]);
  },

  render: function() {
    var buttonDisplay = this.buttons.map(function(button, i) {
      var className = (this.props.infoType === button) ? "active" : "";
      return (
        <li id={button} onClick={this.clickHandle.bind(this, i)} key={i} className={className}>
          <span className="text">{button}</span>
          <span className={"icon " + button}><i className={"animated fadeIn fa fa-" + this.icons[i]}></i></span>
        </li>
      );
    }, this);

    return (
      <footer>
        <ul id="mainMenue" role="navigation">
          {buttonDisplay}
        </ul>
      </footer>
    );
  }
});

module.exports = NavFrame;

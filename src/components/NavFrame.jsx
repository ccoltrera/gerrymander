'use strict';
var React = require('react');
function addClass(id,new_class){
  var i,n=0;
  var navEls = document.getElementsByTagName('li');
  console.log(navEls);
  //var cur = navEls.querySelector('li.active');
  //if (cur) cur.classList.remove('active');
  new_class=new_class.split(",");
  for(i=0;i<new_class.length;i++){
    if((" "+document.getElementById(id).className+" ").indexOf(" "+new_class[i]+" ")==-1){
      document.getElementById(id).className+=new_class[i];
      n++;
    }
  }
  return n;
}
var NavFrame = React.createClass({
  buttons: ['INFO', 'MONEY', 'EDUCATION', 'PEOPLE', 'ELECTIONS'],
  clickHandle: function(i) {
    this.props.selectInfoType(this.buttons[i]);
    addClass('info-frame','active');
    addClass(this.buttons[i], 'active');
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

var React = require('react');

function formatTable(array) {
  var html = [];
  var headRow = array.shift();
  html.push(
    <thead>
      <th>{headRow[0]}</th>
      <th>{headRow[1]}</th>
      <th>{headRow[2]}</th>
    </thead>
  );
  array.forEach(function(row) {
    var output;
    if (row.length === 3) {
      output = (
        <tr>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
        </tr>
      );
    } else if (row.length === 1) {
      output = (
        <tr>
          <th colspan='3'>{row[0]}</th>
        </tr>
      );
    }
    html.push(output);
  });
  return html;
}

module.exports = formatTable;

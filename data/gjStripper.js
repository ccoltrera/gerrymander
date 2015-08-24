'use strict';

var jsonfile = require('jsonfile');

function gjStripper() {
  jsonfile.readFile(process.argv[2], function(err, obj) {
    for (var i = 0; i < obj.features.length; i++) {
      delete obj.features[i].properties.description;
      delete obj.features[i].properties.styleUrl;
      delete obj.features[i].properties.styleHash;
      delete obj.features[i].properties.id;


    }

  jsonfile.writeFileSync(process.argv[2] + '.jsonfile', obj);

  });
}

gjStripper();

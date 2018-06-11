var request = require('request');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_TOKEN = require("./secrets.js");
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(err) {
    throw err;
  })
  .on('response', function(response) {
    console.log("Response status code: " + response.statuscode);
    console.log("Response status message: " + response.statusMessage);
    console.log("Content-type: " + response.headers['content-type']);
    console.log('Download complete.');
  })
  .pipe(fs.createWriteStream(filePath))
}

getRepoContributors("nodejs", "node", function(err, result) {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
  }
});
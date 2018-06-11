var request = require('request');
var fs = require('fs');
repoOwnerArg = process.argv[2];
repoNameArg = process.argv[3];


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var tokens = require("./secrets.js");
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + tokens.GITHUB_TOKEN
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

  })
  .pipe(fs.createWriteStream(filePath))
}
//"nodejs", "node"
getRepoContributors(repoOwnerArg, repoNameArg, function(err, result) {
  console.log("Errors:", err);
  if (!repoOwnerArg || !repoNameArg) {
    console.log("Argument missing.")
  }
  for (var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, "/vagrant/w2d1/GitHub-Avatar-Downloader/avatars/" + result[i].login + ".jpg")
  }
});


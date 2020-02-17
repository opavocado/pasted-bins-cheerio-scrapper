const rp = require('request-promise');
const $ = require('cheerio');

const binParse = function(baseUrl, binUrl) {
  return rp(baseUrl + binUrl)
    .then(function(html) {
      return {
        baseUrl: baseUrl,
        binUrl: binUrl,
        bin: html,
      };
    })
    .catch(function(err) {
      //handle error
      console.log('Error downloading: ' + baseUrl + binUrl);
    });
};

module.exports = binParse;
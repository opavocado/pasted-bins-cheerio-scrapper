
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const binParse = require('./binParse');
const url = 'https://pastebin.com/archive';
const downloadUrl = 'https://pastebin.com/raw';

rp(url)
  .then(function(html){
    //success!
    var binsUrls = [];
    const scrapped = $('td > a', html);

    for (let i = 0; i < scrapped.length; i++) {
        binsUrls.push(scrapped[i].attribs.href);
    }

    // Remove /archive/* links from the list (e.g.: /archive/python, /archive/json, etc)
    binsUrls = binsUrls.filter(function (str) { return !str.includes('/archive/'); });

    //console.log(scrapped.length);
    //console.log(binsUrls);

    // Download all bins
    const downloadedBinsPromise = Promise.all(
      binsUrls.map(function(binUrl) {
        return binParse(downloadUrl, binUrl);
      })
    );

    downloadedBinsPromise.then(function(binsMap) {
      //console.log(binsMap);
      let currentBin;
      for(let i = 0; i < binsMap.length; i++) {
        currentBin = binsMap[i];
        fs.writeFile('./downloads' + currentBin.binUrl, currentBin.bin, function(error) {
          if (error) {
              console.log('Error:- ' + error);
              throw error;
          }
          console.log("Finished writing: " + currentBin.binUrl);
        });
      }
    });

  })
  .catch(function(err){
    //handle error
    console.log(err);
  });
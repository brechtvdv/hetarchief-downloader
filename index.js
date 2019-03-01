let ldfetch = require('ldfetch');
let fetch = new ldfetch({}); //options: allow to add more headers if needed
const N3 = require('n3');

var url = 'https://hetarchief.be/nl/media/gazet-van-brussel-nieuwsblad-voor-het-vlaamsche-volk/A157MbRehXO7ISSJVLwBGV5g';

init();

async function init () {
	while (url) {
		try {
			//console.log(url)
			let response = await fetchPage(url);
			let writer = new N3.Writer(process.stdout, {end: false});

			// Get next page
			for (let i = 0; i < response.triples.length; i ++) {
			  let quad = response.triples[i];
			  writer.addQuad(quad);

			  if (quad.predicate.value === 'http://www.w3.org/ns/hydra/core#next') {
			    //console.error('The next page is: ', triple.object.value);
			    url = quad.object.value; // next page
			  }
			}

	  	  	await sleep(100);
		} catch (e) {
			console.error(e)
		  	await sleep(1000);
		}
	}
}

async function fetchPage(_url) {
    let res = await fetch.get(_url);
    return res;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//dependencies

const puppeteer = require('puppeteer');

const cheerio = require('cheerio');

//empty list to store our data

scraped_quotes = [];

//main function for our scraper

(async () => {

   //launching and opening our page

   const browser = await puppeteer.launch();

   const page = await browser.newPage();

   //navigating to a URL

   await page.goto('https://quotes.toscrape.com/');

  

   //getting access to the raw HTML

   const pageData = await page.evaluate(() => {

       return {

           html: document.documentElement.innerHTML,

       };

   });

   //parsing the HTML and picking our elements

   const $ = cheerio.load(pageData.html);

   let quote_cards = $('div.quote');

   quote_cards.each((index, element) => {

       quote = $(element).find('span.text').text();

       author = $(element).find('.author').text();

       //pushing our data into a formatted list

       scraped_quotes.push({

           'Quote': quote,

           'By': author,

       })

   });

   //console logging the results

   console.log(scraped_quotes);

   //closing the browser

   await browser.close();

})();
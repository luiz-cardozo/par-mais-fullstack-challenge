const axios = require("axios");

axios.defaults.baseURL = "https://api.chucknorris.io";

/**
 * TODO: This service should proxy the request to the Chuck Norris API (https://api.chucknorris.io)
 * Refer to the API definitions in the provided swagger file for response and request compliance.
 **/

/**
 * Retrieve a list of available categories.
 *
 * returns List
 **/
function listCategories() {
  return axios.get("/jokes/categories");
}

/**
 * Retrieve a random Chuck Norris joke in JSON format.
 * You may set the category parameter in order to filter the facts by it
 *
 * category String  (optional)
 * returns Fact
 **/
function randomFact(category) {
  if (category) {
    return axios.get(`/jokes/random?category=${category}`);
  }
  return axios.get("/jokes/random");
}

/**
 * Free text search.
 * You may set the category parameter in order to filter the facts by it
 *
 * query String
 * returns SearchResult
 **/
function search(query) {
  return axios.get(`/jokes/search?query=${query}`);
}

module.exports = { listCategories, randomFact, search };

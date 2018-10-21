/*
 * Name: Min-Hsuan (Sam) Lee
 * TA: Nicole Riley
 * Section: CSE 154 AG
 * Date: 05.23.18
 *
 * This is the bestreads.js for "Bestreads" webpage. It serves as a JavaScript
 * file for bestreads.html. It includes information of the behaviors of the
 * website. It populates the all-book view with book titles and covers from the
 * API and single-book view with a chosen book title, cover image, author,
 * rating, description, reviews.
 */

/* global fetch */

"use strict";

(function() {
   /** Base url of the bestreads book api */
   const BASEURL = "bestreads.php";

   /**
    * Initializes the page when the onload event happens, populates the 
    * page with all the books, and enables the Home button.
    */
   window.onload = function() {
      populateBooks();
      $("back").onclick = populateBooks;
   };

   /**
    * Populates the page with all the books from the API.
    */
   function populateBooks() {
      $("error-message").classList.add("hidden");
      let url = BASEURL + "?mode=books";
      fetch(url, {credentials: 'include'})
         .then(checkStatus)
			.then(JSON.parse)
			.then(populate)
			.catch(handleError);
   }
    
   /**
    * Populates the page with all the books from the API with book titles and
    * cover images.
    * @param {Array} responseText from the api with information of all the
    * books.
    */
   function populate(responseText) {
      let books = responseText["books"];
      for (let i = 0; i < books.length; i++) {
         let book = document.createElement("div");
        	let title = books[i]["title"];
        	let titleTag = document.createElement("p");
        	titleTag.innerText = title;
        	let cover = document.createElement("img");
        	let folder = books[i]["folder"];
        	cover.src = "books/" + folder + "/cover.jpg";
        	cover.alt = title;
        	book.id = folder;
        	book.addEventListener("click", showBook);
        	book.appendChild(titleTag);
        	book.appendChild(cover);
        	$("allbooks").appendChild(book);
      }
      $("singlebook").classList.add("hidden");
   }

   /**
    * Shows a single-book view for a chosen book with its title, author, 
    * rating, cover image, description, and reviews.
    */
   function showBook() {
   	$("allbooks").innerText = "";
   	$("singlebook").classList.remove("hidden");
   	let title = this.id;
   	$("cover").src = this.childNodes[1].src;
   	showInfo(title);
   	showDescription(title);
   	showReviews(title);
   }
 
   /**
    * Shows a single-book view for a chosen book with its title, author, and
    * star rating, based on the given title.
    * @param {String} title of the chosen book.
    */
   function showInfo(title) {
      let url = BASEURL + "?mode=info&title=" + title;
      fetch(url, {credentials: 'include'})
			.then(checkStatus)
			.then(JSON.parse)
			.then(populateInfo)
			.catch(handleError);
   }

   /**
    * Populates the single-book view with chosen book's title, author, and 
    * star rating.
    * @param {Array} responseText from the api with the information of the
    * chosen book.
    */
   function populateInfo(responseText) {
      $("title").innerText = responseText["title"];
    	$("author").innerText = responseText["author"];
    	$("stars").innerText = responseText["stars"];
   }
 
   /**
    * Shows a single-book view for a chosen book with its description, based
    * on the given title.
    * @param {String} title of the chosen book.
    */
   function showDescription(title) {
      let url = BASEURL + "?mode=description&title=" + title;
      fetch(url, {credentials: 'include'})
			.then(checkStatus)
			.then(populateDescription)
			.catch(handleError);
   }
 
   /**
    * Populates the single-book view with chosen book's description.
    * @param {Plain Text} responseText from the api with the description of 
    * the chosen book.
    */
   function populateDescription(responseText) {
   	$("description").innerText = responseText;
   }
 
   /**
    * Shows a single-book view for a chosen book with its review(s), including
    * reviewer(s), score rating(s), and review text(s).
    * @param {String} title of the chosen book.
    */
   function showReviews(title) {
   	let url = BASEURL + "?mode=reviews&title=" + title;
      fetch(url, {credentials: 'include'})
			.then(checkStatus)
			.then(JSON.parse)
			.then(populateReviews)
			.catch(handleError);
   }
 
   /**
    * Populates the single-book view with chosen book's review(s).
    * @param {Array} responseText from the api with the review(s) of 
    * the chosen book.
    */
   function populateReviews(responseText) {
   	$("reviews").innerText = "";
   	for (let i = 0; i < responseText.length; i++) {
         let score = document.createElement("span");
    		score.innerText = responseText[i]["score"];
    		let title = document.createElement("h3");
    		title.innerText = responseText[i]["name"] + " ";
    		title.appendChild(score);
    		let review = document.createElement("p");
    		review.innerText = responseText[i]["text"];
    		$("reviews").appendChild(title);
    		$("reviews").appendChild(review);
    	}
   }

   /**
	 * Checks the status of the website.
	 * @param {Promise} response that came back from the web server.
	 */
   function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		} else {
			return Promise.reject(new Error(response.status + ": " + 
			        response.statusText));
		}
	}
	
   /**
	 * Handles the error that occurs during fetching by altering with the 
	 * message.
	 * @param {String} error message.
	 */
   function handleError(errorMsg) {
      $("error-message").classList.remove("hidden");
      $("error-text").innerText = errorMsg;
   }
    
   /**
    * Returns document.getElementById(id).
    * @param {String} tag id.
	 * @return {element} the element that has the ID attribute with the 
	 *                   specified value.
	 */
   function $(id) {
  		return document.getElementById(id);
	}
    
})();
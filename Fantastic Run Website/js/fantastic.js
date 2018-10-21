/* global fetch */

"use strict";

(function() {
   /** Base url of the bestreads Google Maps Platform api */
   const BASEURL = "https://maps.googleapis.com/maps/api/";
   const DIST_MATRIX = "distancematrix/json?units=imperial";
   const KEY = "&key=AIzaSyBFzjw02fb0JGC8aaks2kKqENiwtftQJS8";

   window.onload = function() {
      request();
   };

   function request() {
      let origins = "&origins=Seattle+City,WA";
      let destinations = "&destinations=Seattle+City,WA"; 
      let url = BASEURL + DIST_MATRIX + origins + destinations + KEY;
      fetch(url)
         .then(checkStatus)
			.then(JSON.parse)
			.then(populate)
			.catch(handleError);
   }

   function populate(responseText) {
      let destAddrArry = responseText["destination_addresses"];
      let originAddrArry = responseText["origin_addresses"];
      let elements = Object.values(responseText["rows"][0])[0][0];
      let distance = Object.values(elements["distance"]);
      let duration = Object.values(elements["duration"]);
      $("test").innerText = destAddrArry.toString() + "\n" + originAddrArry.toString() + "\n" + 
          distance + "\n" + duration;
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
      alert(errorMsg);
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
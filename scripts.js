/* ==================================================
 *  Table of Contents - Settings
 *
 *  1.0 Number of Entries in jacksNovel
 *  2.0 Number of sentences in each paragraph
 * 
 *  ================================================== */

window.onload = function () {
  button = document.querySelectorAll(".btn");
  button.forEach(button => button.addEventListener('click', handleClick));

  (function() {
    document.querySelector(".cr_year").innerHTML = new Date().getFullYear();
    
  })();

  // Generate a random number for the number of sentences in each paragraph.
  function numberOfSentences(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  // Generate  number to randomize the sentences in each pargraph.
  function randomData(max) {
    return Math.floor(Math.random() * (max - 1) + 1);
  }

  // Generates and inserts Jack's Novel output text into DOM
  function jacksNovel() {
    const num = document.getElementsByTagName("input")[0].value,
          outputElement = document.querySelector(".output"),
          // 1.0 Number of entries in jacksNovel (data.json["jacksNovel"])
          max = 22,
          array = [];

    // Retrieve data from data.json
    fetch('data.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (myData) {
        // Recursively builds each paragraph with random selections from data
        function buildParagraph(num) {
          if (num > 0) {
            array.push(myData["jacksNovel"][randomData(22)]);
            return (buildParagraph(num - 1));
          } else {
            return;
          }
        }
        // Recursively generates complete output from generated paragraphs
        function jacksOutput(num) {
          if (num > 0) {
            // 2.0 Number of sentences in each paragraph (min, max)
            buildParagraph(numberOfSentences(6, 10));
            array.push("<br><br>");
            jacksOutput(num - 1);
          }
        }
        jacksOutput(num);
        outputElement.innerHTML = array.join("");
      });
    }

    // Handles what happens when the user clicks a button
    function handleClick(e) {
      // Gets the value typed into the text field
      const inputValue = parseInt(document.getElementsByTagName("input")[0].value);
      // Gets class of clicked button
      button = e.currentTarget.classList.item(1);
      // Looks for an entry in the text field
      isNaN(inputValue) ? alert("Please enter a number into the text field") : jacksNovel(button)
    }
}
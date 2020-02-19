
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.Runtime);
    });


// search button captures the input you type in
// takes that string and sends it as an API call to the Open Weather API
// Open Weather returns a JSON form
// Go through the JSON form and pull data from the Objects
// send that to each respective <div> elements


// Password checker for private work
var chosenWord = "art";


function checkPass() {
    var promptInput = prompt("Please enter the password to see more work");
    if (promptInput === chosenWord) {
        window.location.replace("http://linkedin.waltrib.com");
    } else if (promptInput != chosenWord) {
        alert("Incorrect password")
    } else {

    }
};



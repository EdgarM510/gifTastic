

$(document.body).on("click", ".toggle-gif", function() {
  console.log("Togglin'");
  let state = $(this).attr("data-state");
  
  if (state == "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    state = $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    state = $(this).attr("data-state", "still");
  }

});


let topics = ["rat", "wolf", "bat"];

$("#addButton").on("click", function(){
  let newName = $("#textBox").val().trim();
topics.push(newName);

  let newButton = $("<button>");
  newButton.attr({
    "data-term": newName,
    "class": "makeGif"
  });
  newButton.append(newName);
  $("#buttons").append(newButton);
});

$(document.body).on("click", ".makeGif", function() {
  let term = $(this).attr("data-term");
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

  let results = response.data;

    for (let i = 0; i < results.length; i++) {
      let gifStill = "https://media1.giphy.com/media/" + results[i].id + "/200_s.gif";
      let gifAnimate = "https://media1.giphy.com/media/" + results[i].id + "/200.gif";
      let btnDiv = $('<div>');
      let p = $('<p>');
      p.text(`Rating: ${results[i].rating}`);
      let btnImage = $('<img>');
      btnImage.attr({
          src: gifStill,
          "data-still": gifStill,
          "data-animate": gifAnimate,
          "data-state": "still",
          class: "toggle-gif"
      });
      btnDiv.append(p);
      btnDiv.append(btnImage);
      $('#gifs-appear-here').prepend(btnDiv);
    }

  });
});

$(function() {
  console.log("DOCUMENT READY! PEW PEW!");
});

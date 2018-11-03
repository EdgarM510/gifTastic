$(function() {
  let topics = ["rat", "cat", "dog", "wolf", "bat", "dragon", "stag", "eagle", "horse", "turtle"];
  printBtns();

  $("#addButton").on("click", function(){
    let newName = $("#textBox").val().trim();
    topics.push(newName);
    console.log(topics);
    printBtns();
  });

  $("#clear").on("click", function(){
    $('#gifs-appear-here').html("");
  });


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


  function printBtns (){
    let newUl = $('<ul class="list-unstyled components">');
    for (let i=0; i<topics.length; i++){
      let newLi = $("<li>");
      let newButton = $('<a href="#">');
      newButton.attr({
        "data-term": topics[i],
        "class": "makeGif"
      });
      newButton.append(topics[i]);
      newLi.append(newButton);
      newUl.append(newLi);
    }
    $("#sidebar").html(newUl);
  }


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
        btnDiv.attr("style", "margin: 5px; padding: 5px; border: 1px solid; border-radius: 3px;");
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
        $('#gifs-appear-here').attr("style", "display: flex; flex-wrap: wrap;");
      }

    });
  });
  console.log("ready to roll")
});

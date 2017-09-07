// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < 5; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>"
      +"<button class = 'save' article-data-id = '"+data[i]._id +"' article-title = "+data[i].title+" article-link = "+data[i].link+">"+'Save'+"</button>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", ".note", function() {
        console.log ("hello")
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      console.log(data._id)
      //console.log(data.notes[0]._id)
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

for (var i = 0; i < data.notes.length; i++) {
    // Display the apropos information on the page

    //console.log (data.notes[i].title)
    $("#notes").append("<h2>"+ data.notes[i].title +"</h2>" + "<h3>"+data.notes[i].body+
      "</h3>"+"<button class = 'delete' article-data-id = '"+data._id +"' note-data-id = '"
      +data.notes[i]._id +"'>"+'Delete'+"</button>");
  }


    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//when you click to delete a note, it has to delete that note

  $(document).on("click", ".delete", function(){

    console.log ("you clicked delete")
    //here make it clear what the article id is
    // var thisArticleId = $(this).attr("article-data-id")
    // //here make it clear which note in the big array it is
    //   var thisNoteId = $(this).attr("note-data-id");
    //   var location = thisArticleId.thisNoteId
    //   console.log ("NoteID"+thisNoteId)
    //   console.log("ArticleID"+thisArticleId)

    var commentId = $(this).attr("note-data-id");
    console.log(commentId)
    $.ajax({
      method: "GET",
      url: "/delete/" + commentId
    })
    .done(function(data){
      console.log(data)
    })

   // var thisNote = $(this).attr("")
  })

  $(document).on("click", ".save", function()
  {
var thisId = $(this).attr("article-data-id");
var title = $(this).attr("article-title");
// var title = $(this).attr("data.title")  this shows up as undefined btw
var link = $(this).attr("article-link");
console.log(title)
console.log("youmadeit"+thisId)
$("#savedarticles").append("<p2 data-id='" + thisId + "'>"+title+"</p2>"+"</br>"
  +"<button class = 'note' data-id = '"+thisId +"'>"+'Comment'+"</button>"
  +"<p2>"+link+"</p2>"+"</br>")

  })
// // apikey = "ycelO22ya42OKBPVjtZDJUC9BUBEIfp0"

var topics = ["Chargers", "Dogs", "Fortnite", "Pizza", "Computers", "Nike", "Adidas", "Supreme", "Bape", "Lebron James"];


function renderButtons() {
    $("#viewButton").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic btn btn-info");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#viewButton").append(a);
    }
}
function displayGiphy() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ycelO22ya42OKBPVjtZDJUC9BUBEIfp0&q=" + topic + "&limit=10&offset=0&lang=en";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#viewGif").html("");
        for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("giphy-pic");
            newDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
            newDiv.append("<div><img class='gif' src='" + response.data[i].images.fixed_height_still.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' data-state='still'></div>");
            $("#viewGif").append(newDiv);
        }
        var newDiv = $("<div>");
        newDiv.css("clear", "both");
        $("#viewGif").append(newDiv);
    });
}

$(document).on("click", ".gif", function () {
    event.preventDefault();
    var state = $(this).attr("data-state");
    var src, newState;
    if (state === "still") {
        src = $(this).attr("data-animate");
        newState = "animate";
    } else {
        src = $(this).attr("data-still");
        newState = "still";
    }
    $(this).attr("src", src);
    $(this).attr("data-state", newState);
});

$("#addGif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#inputGif").val().trim();
    if (topic === "") {
        return
    }
    if (!topics.includes(topic)) {
        topics.push(topic);
    }
    renderButtons();
});

$(document).on("click", ".topic", displayGiphy);


renderButtons();

// function createButtons() {
//     $('#btn-view').empty();
//     for (var i = 0, i <topics)


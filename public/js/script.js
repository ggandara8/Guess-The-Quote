const queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random";
let Quizcount = 0;
let options = [{}];

const array = [1, 2, 3];

let shuffled = array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

$(".submit").hide();

$(".start").on("click", () => {
  document.getElementById("after_start").style.visibility = "visible"
  quotes();
  randomNames();
  randomNames2();
  $(".start").hide();
  console.log(options);
});

function quotes() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(res => {
    let quote = res.quote.quoteText; // Quotes
    let CorrectAuthor = res.quote.quoteAuthor; // Author, correct answer

    options.push({ author: CorrectAuthor, answer: true });

    $(".quote").html(quote);
    $(".author" + shuffled[0]).html(CorrectAuthor);
  });
}

$(".next").on("click", () => {
  options = [{}];
  Quizcount++;
  shuffled = array.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
  quotes();
  randomNames();
  randomNames2();
  if (Quizcount === 5) {
    $(".next").hide();
    $(".submit").show();
  };
  reset();
  gif();
});

function randomNames() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(res => {
    let names = res.quote.quoteAuthor; // incorrect answer
    options.push({ author: names, answer: false });
    $(".author" + shuffled[1]).html(names);
  });
}

function randomNames2() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(res => {
    let names2 = res.quote.quoteAuthor; // incorrect answer
    options.push({ author: names2, answer: false });
    $(".author" + shuffled[2]).html(names2);
  });
}

const GIFqueryURL = "https://api.giphy.com/v1/gifs/random?api_key=jDph2wCrpEWe3xZB3eIDrwmwI8EcicfZ&tag=who%20said%20that&rating=g"

function gif() {
  $.ajax({
    url: GIFqueryURL,
    method: "GET"
  }).then(res => {
    let imageUrl = res.data.image_original_url;
    let image = $("<img>");

    image.attr("src", imageUrl);
    $("#images").html(image);
  });
}

$(".help").on("click", () => {
  document.getElementById("exampleRadios3").style.visibility = "hidden"
});

function reset() {
  document.getElementById("exampleRadios3").style.visibility = "visible"
}
// testing submit function, won't use alert
function submit() {
  alert("Your score is: ")
}
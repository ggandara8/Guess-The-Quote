const queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random";
let Quizcount = 0;
let options = [{}];

const array = [1, 2, 3];

let shuffled = array.map((a) => [Math.random(), a]).sort((a, b) => a[0]-b[0]).map((a) => a[1]);

$(".submit").hide();

$(".start").on("click", () => {
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

    options.push({author: CorrectAuthor, answer: true});

    $(".quote").html(quote);
    $(".author" + shuffled[0]).html(CorrectAuthor);
  });
}

$(".next").on("click", () => {
  options = [{}];
  Quizcount++;
  shuffled = array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
  quotes();
  randomNames();
  randomNames2();
  if (Quizcount === 5) {
    $(".next").hide();
    $(".submit").show();
  }
});

function randomNames(){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(res => {
    let names = res.quote.quoteAuthor; // incorrect answer
    options.push({author: names, answer: false});
    $(".author" + shuffled[1]).html(names);
  });
}

function randomNames2(){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(res => {
    let names2 = res.quote.quoteAuthor; // incorrect answer
    options.push({author: names2, answer: false});
    $(".author" + shuffled[2]).html(names2);
  });
}
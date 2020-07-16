$(document).ready(() => {
  $(".hs").on("click", () => {
    $.get("/api/score").then(data => {
      // console.log(data);
      let AllScores;
      let AllUserId;
      let arr = [];
      let arr2 = [];
      for (i in data){
        AllScores = data[i].score;
        AllUserId = data[i].UserId;
        // console.log(AllUserId);
        arr2.push(AllUserId);
        // console.log(test);
        arr.push(data[i].score);
      }
      // console.log(arr2);
      let max = Math.max(...arr); //highest score of all the users
      console.log(max);
      $(".highScore").text(`Guess The Quote Highest Score is: ${max}pts`);
      let index = arr.indexOf(max); //index of highest score from all users
      // console.log(index);
      // console.log("Id of highest score: " + arr2[index]); // id of highest score
      let HSuserid = arr2[index];

      $.get(`/api/alluser_data/${HSuserid}`).then(data => {
        let userHighScorer = data[0].email;
        $(".email").text(`From User: ${userHighScorer}`);
      });
    });
  });
});

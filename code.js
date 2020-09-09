$(document).ready(function () {
  $.ajax({
    url: "prolog.txt",
    success: function (data) {
      sentMsg(data);
    },
  });
  $("#a").click(function () {
    valClick(this);
  });
  $("#b").click(function () {
    valClick(this);
  });
  $("#c").click(function () {
    valClick(this);
  });
});

function sentMsg(str) {
  let chatArray = [],
    i = 0;
  chatArray = str.split("\n");

  //En timer för att skicka ut varje meddelande separat
  let timer = setInterval(() => {
    //läggs ut före en tom p-tag som är efter chat-time
    $("#start").before(chatArray[i]);

    //automatisk scroll
    scrollBot();
    if (i == chatArray.length) {
      checkOB();
      clearInterval(timer);
    }
    i++;
  }, 2000);
}

function scrollBot() {
  $(".iphone-chat").animate(
    { scrollTop: $(".iphone-chat").prop("scrollHeight") },
    2000
  );
}
//Realtid
const timeP = document.querySelector("#realTime");

// skapar interval med uppdatering av tiden
// varje minut
function updateTime() {
  nIntervId = setInterval(realTime, 1000 * 1);
}

//kollar tiden och sätter den i statusbaren
function realTime() {
  var nD = new Date();
  var h = nD.getHours();
  var m = nD.getMinutes();
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  var time = h + ":" + m;
  timeP.textContent = time;
}

//Väntar till ett element har "end" class och isåfall visas valmöjligheterna
//och storleken på smsrutan ändras
function checkOB() {
  var optionPick = document.querySelector(".option-picker");
  var cp = document.querySelector("#cp");
  if (optionPick.style.display == "none" && cp.style.display != "none") {
    addOB();
    clearInterval(aIntervId);
  } else {
    removeOB();
  }
}

//Visar valen
function addOB() {
  clearInterval();
  var optionPick = document.querySelector(".option-picker");
  var chatbox = document.querySelector(".iphone-chat");
  optionPick.style.display = "block";
  chatbox.style.height = "75%";
  scrollBot();
}

//Tar bort valen
function removeOB() {
  var optionPick = document.querySelector(".option-picker");
  var chatbox = document.querySelector(".iphone-chat");
  optionPick.style.display = "none";
  chatbox.style.height = "97%";
}

//Tar bort checkpoint
function removeCheckPoint() {
  document.querySelector("#cp").removeAttribute("id");
  removeOB();
}

//Fortsätter utifrån vilket val spelaren gjorde
function playerChoice(val) {
  let choice = parseInt(val.replace("val", ""));
  switch (choice) {
    case 1:
      document.querySelector("#a").value = "val4";
      document.querySelector("#a").innerHTML = "Val 4";

      document.querySelector("#b").value = "val5";
      document.querySelector("#b").innerHTML = "Val 5";

      document.querySelector("#c").value = "val6";
      document.querySelector("#c").innerHTML = "Val 6";
      break;
    case 2:
      document.querySelector("#a").value = "val4";
      document.querySelector("#a").innerHTML = "Val 4";

      document.querySelector("#b").value = "val5";
      document.querySelector("#b").innerHTML = "Val 5";

      document.querySelector("#c").value = "val6";
      document.querySelector("#c").innerHTML = "Val 6";
  }
}

var aIntervId;
//Interval för att kolla efter checkpoint
function cpInterval() {
  aIntervId = setInterval(checkOB, 1000 * 1);
}

//Stoppar intervallet
function cpStopInterval() {
  clearInterval(aIntervId);
}

function valClick(button) {
  let urlText = $(button).val();
  $.ajax({
    url: urlText + ".txt",
    success: function (data) {
      //skickar ut de nya smsen från textfilen
      $("#cp").after(data);

      //kollar vilka de nya valen är beroende på föregående val
      playerChoice(urlText);

      //tar bort gamla checkpoint
      removeCheckPoint();

      //Skapar nytt intervall för checkpoint sökaren
      cpInterval();

      //Tar "selected" tillbaka till default (inget)
      $(".option-picker").val($(".option-picker").data("default-value"));
    },
  });
}

realTime();
updateTime();

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

function sendChosen(str) {
  str = `<p class="me chatAni">${str}</p>`;
  $("#start").before(str);
}

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
  }, 250);
}

function scrollBot() {
  $(".iphone-chat").animate(
    { scrollTop: $(".iphone-chat").prop("scrollHeight") },
    250
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
  chatbox.style.height = "73%";
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
  let choice = val.replace("val", "");
  choice = parseInt(choice);
  switch (choice) {
    //Om det är val 1
    case 1:
      document.querySelector("#a").value = "val11";
      document.querySelector("#a").innerHTML = "Ropa hallå!";

      document.querySelector("#b").value = "val12";
      document.querySelector("#b").innerHTML = "Låtsas att du inte är hemma";

      document.querySelector("#c").value = "val13";
      document.querySelector("#c").innerHTML = "Gå till dörren och titta";
      break;

    //Om det är val 2
    case 2:
      document.querySelector("#a").value = "val21";
      document.querySelector("#a").innerHTML = "Spring och lås ytterdörren";

      document.querySelector("#b").value = "val22";
      document.querySelector("#b").innerHTML = "Fort! Lås sovrumsdörren";

      document.querySelector("#c").value = "val23";
      document.querySelector("#c").innerHTML = "Hämta kniv i köket!";
      break;

    //Val 1:1
    case 11:
      break;

    //Val 1:2
    case 12:
      break;

    //Val 1:3
    case 13:
      break;

    //Val 2:1
    case 21:
      break;

    //Val 2:2
    case 22:
      break;

    //Val 2:3
    case 23:
      break;

    //Val 2:1:1
    case 211:
      break;
    
    //Val 2:1:2
    case 212:
      break;

    //Val 2:1:3
    case 213:
      break;
    
    //Val 2:2:1
    case 221:
      break;

    //Val 2:3:1
    case 231:
      break;

    //Val 2:1:3:1
    case 2131:
      break;
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
  let chosenMsg = $(button).text();
  sendChosen(chosenMsg);
  $.ajax({
    url: urlText + ".txt",
    success: function (data) {
      //skickar ut de nya smsen från textfilen
      sentMsg(data);

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

$(document).ready(function () {
  $("#a").click(function () {
    $.ajax({
      url: "val1.txt",
      success: function (data) {
        $("#cp").after(data);
        playerChoice(1);
      },
    });
  });
  $("#b").click(function () {
    $.ajax({
      url: "val2.txt",
      success: function (data) {
        $("#cp").after(data);
        playerChoice(2);
      },
    });
  });
  $("#c").click(function () {
    $.ajax({
      url: "val3.txt",
      success: function (data) {
        $("#cp").after(data);
        playerChoice(3);
      },
    });
  });
});

//Realtid
const timeP = document.querySelector("#realTime");
const chatT = document.querySelector("#chatTime");

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
function onStartOB() {
  var optionPick = document.querySelector(".option-picker");
  var cp = document.querySelector("#cp");
  if (optionPick.style.display == "none" && cp.style.display != "none") {
    addOB();
  } else {
    removeOB();
  }
}

//Visar valen
function addOB() {
  var optionPick = document.querySelector(".option-picker");
  var chatbox = document.querySelector(".iphone-chat");
  optionPick.style.display = "block";
  chatbox.style.height = "75%";
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
  removeCheckPoint();
  if (val == 1) {
  } else if (val == 2) {
  } else if (val == 3) {
  }
}

realTime();
updateTime();
onStartOB();

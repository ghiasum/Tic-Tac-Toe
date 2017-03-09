var pick = "X"; 
var turnNumber = 1;
var myTurn = Math.random() < 0.5 ? true : false;
var startGame = false;
var emptyBox = ["1","2","3","4","5","6","7","8","9"];
var trackX = [];
var trackO = [];
var winConditions = [["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];
  
function resetGame(){
    turnNumber = 1;
    printTurn();
    emptyBox = ["1","2","3","4","5","6","7","8","9"];
    trackX = [];
    trackO = [];
    $(".box").find("h1").text("");
    startGame = true;
    if(!myTurn){
       setTimeout(compTurn, 2000);
     } 
}
  
function printTurn(){
  if (myTurn) {
    $("#turn").text("(Turn:" + turnNumber + ")  Your Turn");
  }  
  else {
      $("#turn").text("(Turn:" + turnNumber + ")  Computer's Turn");
  }
}
  
function showGrid(){
  $("#pick").hide();
  $("#game").show();
  startGame = true;
  if(startGame && !myTurn){
    setTimeout(compTurn, 2000);
  } 
}
  
function checkWin(){
	var winArr = winConditions.filter(function(e){
		if(trackX.includes(e[0]) && trackX.includes(e[1]) && trackX.includes(e[2])){
		console.log("returning true");
		return true;
		}  
		if(trackO.includes(e[0]) && trackO.includes(e[1]) && trackO.includes(e[2])){
		console.log("returning true");
		return true;
		}  
		return false;
	});
	
   if(winArr.length > 0){
       startGame = false;
      if(!myTurn){
        $("#turn").text("You Win!");
      }
      else{
        $("#turn").text("Uh Oh, You Lost...");
      }
       setTimeout(resetGame, 5000);
       return true;
   }
    return false;
}
  
function incrementTurn(){
    turnNumber++;
    console.log("turnNumber = " + turnNumber);
    myTurn = !myTurn;
    console.log("Turn", myTurn);
    if(turnNumber >= 5 && turnNumber <= 10){
      if(checkWin()){
        return;
      }
      else if(turnNumber === 10){
         $("#turn").text("It's a Draw...");
         startGame = false;
        setTimeout(resetGame, 2000);
      }
      else{
        printTurn();
      }
    }
    else{
      printTurn();
    }
}
  
function compareNumbers(a, b) {
    return a - b;
}

function checkPlay(arr){
    console.log("arr = " + arr);
    var id = []; 
    var resultArr = [];
    var count = 0;
	var rid;
	
  
	for(var i = 0; i<winConditions.length; i++){
		count = 0;
		for(var j = 0; j<winConditions[i].length; j++){
			if(!(arr.includes(winConditions[i][j]))){
				rid = winConditions[i][j];
				count++;
				console.log("count = " + count + ", rid = " + rid);
			}
		}
		
		if(count === 1 && emptyBox.includes(rid)){
			console.log("rid = " + rid);
			resultArr.push(rid);
		}
		
	}	
	
    console.log("resultArr = " + resultArr);
	
	if(resultArr.length > 0){
		return resultArr[0];
	}	
    return undefined;
}
  
function compTurn(){
   if(!myTurn && startGame){
      var compPick = (pick === "X") ? "O":"X";
      var trackComp = (compPick === "X") ? trackX: trackO;
      var trackMe =  (pick === "X") ? trackX: trackO;
      var id = "5";
      var winid = checkPlay(trackComp);
      var blockid = checkPlay(trackMe);
      console.log("winid = ", winid);
      console.log("blockid = ", blockid);
      if(winid !== undefined){
        id = winid;
      }
      else if(blockid !== undefined){
        id = blockid;
      }
      else if(!emptyBox.includes("5")){
       id = emptyBox[Math.floor(Math.random() * emptyBox.length)];  
      }
      console.log("compPick=" + compPick, "id=", id, "emptyBox=", emptyBox); 
      $("#box" + id).find("h1").text(compPick);
      emptyBox.splice(emptyBox.indexOf(id),1);
      trackComp.push(id);
      console.log("trackComp", trackComp);
      incrementTurn();
    }
}
  
$(document).ready(function(){

  $("#pickX").on('click', function(){
    pick = "X";
    showGrid();
  }); 
  
  $("#pickO").on('click', function(){
    pick = "O";
    showGrid();
  }); 
  
$(".box").on('click', function(){
    if(myTurn && startGame){
		var track = (pick === "X") ? trackX: trackO;
		var id = this.id.match(/\d/g)[0];
		if(emptyBox.includes(id)){
			$("#" + this.id).find("h1").text(pick);
			emptyBox.splice(emptyBox.indexOf(id), 1);
			track.push(id);
			console.log("track", track);
			incrementTurn();
			setTimeout(compTurn, 2000);
		}
    }
});
  
  console.log(myTurn);
  printTurn();
});
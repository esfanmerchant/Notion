let boxes = window.document.querySelectorAll(".box");
let reset_btn = window.document.querySelector("#reset_btn");
let turn_btn = window.document.querySelector(".turn");
let winner_btn = window.document.querySelector(".winner");
turn_btn.innerText = "Turn: Player 1"
let turnX = true;

const winning_patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function hideboxes(){
    let b = winning_patterns[1];
    boxes[b[0]].style.display = "none";
    boxes[b[1]].style.display = "none";
    boxes[b[2]].style.display = "none";
}
function disableboxes(){
    for(let box of boxes){
        box.disabled = true;
    }
}
function enableboxes(){
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        winner_btn.innerText = " ";
        turnX = true;
        turn_btn.innerText = "Turn: Player 1";
    }
}
function resetgame(){
    turnX = true;
    turn_btn.style.color = "red";
    enableboxes();
}

function checkwinner(){
    for(let pattern of winning_patterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                if(pos1val==="X" && pos2val === "X" && pos3val === "X"){
                    console.log("Player 1 wins");
                    winner_btn.innerText = "Winner: Player 1";
                    winner_btn.style.color = "red";
                    disableboxes();
                }
                else{
                    console.log("Player 2 wins");
                    winner_btn.innerText = "Winner: Player 2";
                    winner_btn.style.color = "blue";
                    disableboxes();
                }
            }
        }
    }       

}
turn_btn.style.color = "red";
boxes.forEach((a)=>{
    a.addEventListener("click",()=>{
        if(turnX){
            a.innerText = "X";
            a.style.color = "red"; 
            turnX=false;
            turn_btn.innerText = "Turn: Player 2";
            turn_btn.style.color = "blue";
        }
        else{
        a.innerText = "O";
        turnX=true;
        a.style.color = "blue";
        turn_btn.innerText = "Turn: Player 1";
        turn_btn.style.color = "red";
        }
        a.disabled = true;
        checkwinner();  
    })

}) 

reset_btn.addEventListener("click", resetgame);

let click_btn = window.document.querySelector(".click_btn");
let side_bar= window.document.querySelector(".side_bar");
let turn1 = window.document.querySelector(".turn");

let turnOn = true;
click_btn.addEventListener("click",()=>{
    if(turnOn){
    side_bar.style.visibility = "visible";
    turn1.setAttribute("class","turn");
    turnOn = false;
    }
    else{
        side_bar.style.visibility = "hidden";
        turn1.setAttribute("class","turn");
        turnOn = true;
    }
});
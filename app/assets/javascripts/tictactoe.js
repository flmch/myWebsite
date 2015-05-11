var tictactoe = function(){

    function board(dim){

        this.createBoard = function(){
            var $newBoard = $(document.createElement("div"));
            $newBoard.attr("id","mainBoardTTT");
            $newBoard.css({
                "width" : dim+6,
                "height" : dim+6,
                "margin-left" : -dim/2 + "px"
            });

            for(var i=0;i<9;i++){
                var $newCell = $("<div></div>");
                $newCell.addClass("cellElementTTT");
                $newCell.attr("id","cell"+i);
                $newCell.attr("row",Math.floor(i/3));
                $newCell.attr("col",i%3);
                $newCell.css({
                    "width" : dim/3,
                    "height" : dim/3
                });
                $newBoard.append($newCell);
            }
            
            $("#TTTcontainer").append($newBoard);
        }

        this.checkWin = function(selectedItem){          
            var col = selectedItem.attr("col"),
                row = selectedItem.attr("row"),
                currentSymbol = selectedItem.html(),
                checkRow = 0,
                checkCol = 0,
                checkDia = 0;

            $("[row="+row+"]").each(function(){
                if($(this).html() === currentSymbol){
                    checkRow++;
                }
            });

            $("[col="+col+"]").each(function(){
                if($(this).html() === currentSymbol){
                    checkCol++;
                }                
            });
           
            if(  
                (  $("#cell0").html() === $("#cell4").html()
                && $("#cell4").html() === $("#cell8").html() 
                && $("#cell4").html() !== "" ) 
                ||
                (  $("#cell2").html() === $("#cell4").html()
                && $("#cell4").html() === $("#cell6").html() 
                && $("#cell4").html() !== "" ) 
              ){
              checkDia = 3;
            }
            return checkRow == 3 || checkCol ==3 || checkDia == 3;
        }

        this.resetBoard = function(){
            currentPlayer = 1;
            $(".cellElementTTT").each(function(){
                $(this).html("");
            });
        }

        this.checkFilled = function(){
            var result = true;
            $(".cellElementTTT").each(function(){
                if($(this).html()==""){
                    result = false;
                }
            });
            return result;
        }

    }

    var currentPlayer = 1;
    var b = new board(300);
    b.createBoard();

    $(".cellElementTTT").on("click",function(){
        var _self = $(this);
        if(_self.html()=="" && currentPlayer != 3){  
            var content="";
            if(currentPlayer===1){
                content = "O";
            }else if(currentPlayer===2){
                content = "X";
            }
            $(this).html(content).promise().done(function(){
                if(b.checkWin(_self)){
                    alert("Player "+currentPlayer+" Win!");
                    currentPlayer = 3;
                }else if(b.checkFilled()){
                    alert("Game tied, start a new game.");
                }else{
                    currentPlayer = currentPlayer===1?2:1;
                }
            }); 
        }
    });

    $(".resetBtnTTT").on("click",function(){
        b.resetBoard();
    });

}

$(document).ready(tictactoe);
$(document).on('page:load',tictactoe);  
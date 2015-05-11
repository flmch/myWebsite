var snakeGame = function(){
    //define board object and create a new board at same time
    function Board(){
        //create board
        var $boardContainer = $("#mainBoardSNK"),
            sizeOfBoard = 30;
        for(var i=0;i<sizeOfBoard;i++){
            var $currentRow = $(document.createElement("div"));
            $currentRow.addClass("rowElementSNK");
            for(var j=0;j<sizeOfBoard;j++){
                var $currentCell = $(document.createElement("div"));
                $currentCell.attr({
                    "class" : "cellElementSNK",
                    "row" : "row" + i,
                    "col" : "col" + j
                });                   
                $currentRow.append($currentCell);
            }
            $boardContainer.append($currentRow);
        }
    }

    Board.prototype.resetBoard = function(){
        for(var i=0;i<30;i++){
            for(var j=0;j<30;j++){
                $("[row=row"+i+"][col=col"+j+"]").removeClass("snakeBodySNK");
                $("[row=row"+i+"][col=col"+j+"]").removeClass("foodSNK");
            }
        }
    }

    //generate food function for board
    Board.prototype.generateFood = function(s){
        var rowCoord = Math.floor(Math.random()*30);
        var colCoord = Math.floor(Math.random()*30);
        var foodPosition = [rowCoord,colCoord];

        while(s.objectArrayIndexOf(foodPosition) != -1 ){
            rowCoord = Math.floor(Math.random()*30);
            colCoord = Math.floor(Math.random()*30);
            foodPosition = [rowCoord,colCoord];            
        }

        $("[row=row"+rowCoord+"][col=col"+colCoord+"]").addClass("foodSNK");
    }

    //define snake object
    function Snake(){
        this.snakeBodySNK = [[14,14]];
        this.direction = 39;
        this.ifValidKeyInput = false;
        this.timeInterval = 150;
        this.score = 0 ;
        $("[row=row14][col=col14]").addClass("snakeBodySNK")
    }

    Snake.prototype.moveOneStep = function(b){
        var direct = this.direction,
            slength = this.snakeBodySNK.length,
            nextHead=[];
            nextHead[0] = this.snakeBodySNK[0][0];
            nextHead[1] = this.snakeBodySNK[0][1];
        if(direct === 37){
            nextHead[1]--;
        }else if(direct === 38){
            nextHead[0]--;
        }else if(direct === 39){
            nextHead[1]++;
        }else if(direct === 40){
            nextHead[0]++;
        }

        var $nextCell = $("[row=row"+nextHead[0]+"][col=col"+nextHead[1]+"]");
        if(   nextHead[0] < 0 || nextHead[1] < 0
           || nextHead[0] > 29 || nextHead[1] > 29
           ||  this.objectArrayIndexOf(nextHead) != -1 ){    
            clearInterval(gameControl);
            alert("Game Over");
            if(this.score>record){
                $("#scoreBoardSNK .recordSNK").html(this.score);
                $("#scoreBoardSNK .dynScoreSNK").html(0);
            }
            $(document.documentElement).off("keydown");
        }else{
            $nextCell.addClass("snakeBodySNK");
            if($nextCell.hasClass("foodSNK")){
                $nextCell.removeClass("foodSNK");
                b.generateFood(this);
                if(this.timeInterval>50){
                    //this.timeInterval = this.timeInterval-2;
                }
                $("#scoreBoardSNK .dynScoreSNK").html(++this.score);
            }else{
                $("[row=row"+this.snakeBodySNK[slength-1][0]+
                    "][col=col"+this.snakeBodySNK[slength-1][1]+"]").removeClass("snakeBodySNK");
                this.snakeBodySNK.splice(slength-1,1);                
            }
            this.snakeBodySNK.unshift(nextHead);
        }
        this.ifValidKeyInput = false;
    };

    Snake.prototype.objectArrayIndexOf = function(arr){
        var result = -1,
            curBody = this.snakeBodySNK;
        for(var i=0;i<curBody.length;i++){
            if(arr[0] == curBody[i][0] && arr[1] == curBody[i][1]){
                return i;
            }
        }
        return result;
    }

    var b = new Board();  //define and create new board;
    var s;                //define snake object
    var gameControl;      //define setInvertal control object  
    var record = 0;       //best score
     
    //define game trigger function
    //game start once "new game" button clicked 
    $(".startBtnSNK").on("click",function(){
        startNewGame();
    });

    function startNewGame(){
        b.resetBoard();    //reset Board
        s = new Snake();   //define a new snake for each new game     
        b.generateFood(s);  //generate first food
        $(document.documentElement).on("keydown",function(event){
            triggerKeydown(event);
        });
        gameControl = setInterval(function(){
            s.moveOneStep(b);
        },s.timeInterval);      
    };      

    //keypress control when "up down left right" is pressed
    
    function triggerKeydown(event){
        var curCode = event.which || event.keyCode;
        if (event.preventDefault){
            event.preventDefault();
        }else{
            preventDefault(event);
        }
        if( (curCode === 37 || curCode === 38 || curCode === 39 || curCode === 40) && 
            (curCode%2 != s.direction%2) && !s.ifValidKeyInput){
            s.direction = curCode;
            s.ifValidKeyInput = true;
        }
    };
    

}

$(document).ready(snakeGame);
$(document).on('page:load',snakeGame);  
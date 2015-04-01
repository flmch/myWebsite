window.onload = function(){
	var table = document.getElementById("caltable");
	var cells = table.getElementsByTagName("th");

	var current = 0,last = 0, sign = "", toBeDisplayed, flag = true; 
	document.getElementById("dis").innerHTML = current;

	for(var i=0;i<cells.length;i++){
		cells[i].onclick = function(){
			var input = this.innerHTML.trim();
			if(input == 'AC'){
				current = 0;
				flag = true;
			}else if(input == "+/-"){
				if(current[0] == '-'){
					current = current.substr(1);
				}else{
					current = "-" + current ;
				}
			}else if(input == "%"){
				if(current[current.length-1] == "%"){
					current = current.slice(0,-1);
					current = current/100;
				}else{
					current = current*100;
					current += "%" ;
				}
			}else if(input == "x" || input == "/" || input == "+" || input == "-" ){
				if(flag == true){
					last = current;
					flag = false;
				}else{
					last = getResult(sign,current,last);
				}
				sign = input;
				current = 0;
			}else if(input == "="){
				current = getResult(sign,current,last);
				last = 0;
				flag = true;
			}else{
				current = current == 0 ? input: current+input;
			}

			document.getElementById("dis").innerHTML = current;


			//document.getElementById("demo").innerHTML = this.innerHTML;
		}
	}

	function getResult(s, cur, la){
		if(s == "+"){
			return la + parseInt(cur);
		}else if( s == "-" ){
			return la - cur
		}else if( s == "x" ){
			return la * cur;
		}else if( s == "/" ){
			return la/cur;
		}
	}
}
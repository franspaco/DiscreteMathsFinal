

function main(s){
  //Main function, called by the buttons, takes as argument the operation
  console.log(s);
  var errP = document.getElementById("error");                          //Para imprimir errores
  var un = document.getElementById("universo").value.split(",");       //Regresa U como arreglo
  var ca = document.getElementById("conjuntoa").value;      //Regresa A como arreglo
  var cb = document.getElementById("conjuntob").value;      //Regresa B como arreglo

  if(ca != ""){
    ca = ca.split(",");
  }
  if(cb != ""){
    cb = cb.split(",");
  }

  console.log("A: " + ca + " length: " + ca.length);
  console.log("B: " + cb + " length: " + cb.length);

  var uOut = document.getElementById("uni");
  var aOut = document.getElementById("cona");
  var bOut = document.getElementById("conb");
  var oper = document.getElementById("operation");
  var res  = document.getElementById("res");

  uOut.innerHTML = "{ " + un + "}";
  aOut.innerHTML = "{ " + ca + "}";
  bOut.innerHTML = "{ " + cb + "}";
  oper.innerHTML = s + ":";

  var valid =unvalindInput(un, ca, cb);
  if(valid != "true"){
    errP.innerHTML = valid;
    res.innerHTML = "";
    return 0;
  }else{
    errP.innerHTML = "";
  }

  var tmp;
  switch(s){
    case "Unión":
      tmp = union(ca,cb);
      break;
    case "Intersección":
      tmp = intersection(ca, cb);
      break;
    case "Diferencia A-B":
      tmp = difference(ca, cb);
      break;
    case "Diferencia B-A":
      tmp = difference(cb, ca);
      break;
    case "Complemento A":
      tmp = difference(un, ca);
      break;
    case "Complemento B":
      tmp = difference(un, cb);
      break;
    case "Potencia A":
      tmp = potencia(ca);
      break;
    case "Potencia B":
      tmp = potencia(cb);
      break;
    case "Potencia A U B":
      tmp = potencia(union(ca,cb));
      break;
  }
  res.innerHTML = "{ " + tmp + " } ";
}

// MISCELLANEOUS FUNCTIONS *****************************************************
function isSubArray(a, b){
  //returns TRUE if a is a sub-set of b, returns FALSE otherwise
  if(a[0] == ""){
    return true;
  }
  if(a.length > b.length){
    return false;
  }
  var state = true;
  for(var i = 0; i < a.length; i++){
    var subState = false;
    for(var j = 0; j < b.length; j++){
      if(b[j] == a[i]){
        subState = true;
        break;
      }
    }
    state = state && subState;
  }
  return state;
}

function unvalindInput(un, ca, cb){
  //returns string "true" if input arrays are valid, otherwise returns string with errors
  var errors = "";
  if(!isSubArray(ca,un)){
    errors += "A ∉ U<br>";
  }
  if(!isSubArray(cb,un)){
    errors += "B ∉ U<br>";
  }
  if(errors == ""){
    return "true";
  }else{
    return errors;
  }
}

function isInArray(inp, arr){
  var tmp = false;
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == inp){
      return true;
    }
  }
  return false;
}

function sortN(a){
  return a.sort(function(a, b){return a-b});
}

function getBits(a, size){
  var tmp = "";
  for(var i = size; i >= 1; i /= 2){
    tmp += a&i?'1':'0';
  }
  tmp = tmp.split("").reverse();
  console.log(tmp);
  return tmp;
}

// SET OPERATIONS FUNCTIONS ****************************************************
function union(a, b){
  var newA = [];
  for(var i = 0; i < a.length; i++){
    if(!isInArray(a[i], newA) && a[i] != ""){
      newA.push(a[i]);
    }
  }

  for(var i = 0; i < b.length; i++){
    if(!isInArray(b[i], newA) && b[i] != ""){
      newA.push(b[i]);
    }
  }
  console.log(sortN(newA));
  return sortN(newA);
}

function intersection(a, b){
  var newA = [];
  for(var i = 0; i < a.length; i++){
    if(isInArray(a[i], b) && ( !isInArray(a[i], newA) ) ){
      newA.push(a[i]);
    }
  }
  return sortN(newA);
}

function difference(a,b){
  // A - B
  var newA = [];

  for(var i = 0; i < a.length; i++){
    if(!isInArray(a[i], b)){
      newA.push(a[i]);
    }
  }
  return sortN(newA);
}

function potencia(a){
  var newA = [];
  var size = a.length;
  var potc = Math.pow(2, size);
  console.log("size of " + a + " is: " + size + ", conjunto potencia " + potc);

  for(var i = 0; i < potc; i++){
    var sub = [];
    var flags = getBits(i, potc);
    for(var j = 0; j < size; j++){
      if(flags[j] == "1"){
        sub.push(a[j]);
      }
    }
    newA.push("{ " + sub + " }<br>");
  }

  return "<br>" + newA;
}

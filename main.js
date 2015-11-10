

function main(s){
  //Main function, called by the buttons, takes as argument the operation
  console.log(s);
  var errP = document.getElementById("error");                          //Para imprimir errores
  var un = document.getElementById("universo").value.split(",");       //Regresa U como arreglo
  var ca = document.getElementById("conjuntoa").value.split(",");      //Regresa A como arreglo
  var cb = document.getElementById("conjuntob").value.split(",");      //Regresa B como arreglo

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
  }
  res.innerHTML = tmp;
}

// MISCELLANEOUS FUNCTIONS *****************************************************
function isSubArray(a, b){
  //returns TRUE if a is a sub-array of b, returns FALSE otherwise
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
    errors += "A no pertenece a U<br>";
  }
  if(!isSubArray(cb,un)){
    errors += "B no pertenece a U<br>";
  }
  if(errors == ""){
    return "true";
  }else{
    //return errors;
    return "true";
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

// SET OPERATIONS FUNCTIONS ****************************************************
function union(a, b){
  var newA = [];
  for(var i = 0; i < a.length; i++){
    if(!isInArray(a[i], newA)){
      newA.push(a[i]);
    }
  }

  for(var i = 0; i < b.length; i++){
    if(!isInArray(b[i], newA)){
      newA.push(b[i]);
    }
  }
  return "{ " + sortN(newA)  + "}";
}

function intersection(a, b){
  var newA = [];
  for(var i = 0; i < a.length; i++){
    if(isInArray(a[i], b) && ( !isInArray(a[i], newA) ) ){
      newA.push(a[i]);
    }
  }
  return "{ " + sortN(newA)  + "}";
}

function difference(a,b){
  // A - B
  var newA = [];

  for(var i = 0; i < a.length; i++){
    if(!isInArray(a[i], b)){
      newA.push(a[i]);
    }
  }
  return "{ " + sortN(newA)  + "}";
}

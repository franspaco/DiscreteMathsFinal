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
    return errors;
  }
}

function main(s){
  console.log(s);
  var errP = document.getElementById("error");                          //Para imprimir errores
  var un = document.getElementById("universo").value.split(",");       //Regresa U como arreglo
  var ca = document.getElementById("conjuntoa").value.split(",");      //Regresa A como arreglo
  var cb = document.getElementById("conjuntob").value.split(",");      //Regresa B como arreglo

  var uOut = document.getElementById("uni");
  var aOut = document.getElementById("cona");
  var bOut = document.getElementById("conb");
  var oper = document.getElementById("operation");
  var res = document.getElementById("res");

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

}

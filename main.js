

function main(s){
  //Función principal, recibe un string de cada botón que la llama.
  console.log(s);
  var errP = document.getElementById("error");                          //Para imprimir errores
  var un = document.getElementById("universo").value;       //Regresa U
  var ca = document.getElementById("conjuntoa").value;      //Regresa A
  var cb = document.getElementById("conjuntob").value;      //Regresa B

  //Dividir el texto en un arreglo solo si no está vació
  if(un != ""){
    un = un.split(",");
  }
  if(ca != ""){
    ca = ca.split(",");
  }
  if(cb != ""){
    cb = cb.split(",");
  }

  //Imprimir a la consola los arreglos de entrada y sus cardinalidades con propósitos de pruebas
  console.log("A: " + ca + " length: " + ca.length);
  console.log("B: " + cb + " length: " + cb.length);
  for(var i = 0; i < ca.length; i++){
    console.log(ca[i]);
  }

  //regresar los objetos de las salidas
  var uOut = document.getElementById("uni");
  var aOut = document.getElementById("cona");
  var bOut = document.getElementById("conb");
  var oper = document.getElementById("operation");
  var res  = document.getElementById("res");

  //Buscar elementos vacíos convierte "" en ∅
  replaceInArray(un, "", "∅");
  replaceInArray(ca, "", "∅");
  replaceInArray(cb, "", "∅");

  //Unión a sí mismos para eliminar elementos duplicados
  un = union(un,[]);
  ca = union(ca,[]);
  cb = union(cb,[]);

  //Imprimir las entradas
  uOut.innerHTML = "{ " + un + " }";
  aOut.innerHTML = "{ " + ca + " }";
  bOut.innerHTML = "{ " + cb + " }";

  //Imprimir la operación que se solicitó
  oper.innerHTML = s + ":";

  //Comprobación de que la entrada sea válida
  var valid =unvalindInput(un, ca, cb);
  if(valid != "true"){
    //Si la entrada no es válida desplegar el error y terminar la función
    errP.innerHTML = valid;
    res.innerHTML = "";
    errP.classList.remove("closed");
    return 0;
  }else{
    //Si la entrada es válida quitar el mensaje de error
    errP.classList.add("closed");
    //errP.innerHTML = "";
  }

  var tmp; //variable para guardar la salida

  //Switch para realizar la operación que se solicitó
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

  //Imprimir salida
  res.innerHTML = "{ " + tmp + " } ";
}

// FUNCTIONES VARIAS ***********************************************************

function replaceInArray(arr, oldValue, newValue){
  //Reemplaza en un arreglo cualquien instancia de [oldValue] con [newValue]
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == oldValue){
      arr[i] = newValue;
    }
  }
}

function isSubArray(a, b){
  //regresa TRUE si a es subconjunto de b, de lo contrario regresa FALSO

  if(a == []){
    //Si es conjunto vacío => regresar TRUE
    console.log("Conjunto Vacío");
    return true;
  }

  if(a.length > b.length){
    //Si la cardinalidad de a es mayor a la de b => regresar FALSE
    console.log("Error de cardinalidad");
    return false;
  }

  for(var i = 0; i < a.length; i++){
    //Para todo elemento de a

    if(!isInArray(a[i],b)){
      //Si a[i] NO esta en b => FALSO
      console.log(a[i] + " no esta en " + b);
      return false;
    }
  }
  //El programa llega aqui si para toda n a[n] pertenece a b, es decir, a es subconjunto de b
  return true;
}

function unvalindInput(un, ca, cb){
  //Regresa string "true" si los conjuntos cumplen las condiciones de ser subconjuntos de U, de lo contrario regresa un string con el error en cuestión
  var errors = ""; //variable vacía para almacenar el error
  if(!isSubArray(ca,un)){
    //Si a no es subconjunto de universo anexar el error a la variable
    errors += "A no es subconjunto de U<br>";
  }
  if(!isSubArray(cb,un)){
    //Si b no es subconjunto de universo anexar el error a la variable
    errors += "B no es subconjunto de U<br>";
  }
  if(errors == ""){
    //Si no hay errores regresar "true"
    return "true";
  }else{
    //Si hay un error regresar el error
    return errors;
  }
}

function isInArray(inp, arr){
  //Regresa TRUE si la entrada "inp" pertenece a un arreglo "arr"
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == inp){
      //Si se encontró el valor en el arreglo regresar TRUE
      return true;
    }
  }
  //Si no se encontró regresar FALSE
  return false;
}

function sortN(a){
  //Función para ordenar arreglos de números, no funciona con caracteres
  return a.sort(function(a, b){return a-b});
}

function getBits(a, size){
  //Regresa un arreglo de caracteres 1's o 0's que representan en binario a la entrada 'a'
  //la entrada 'size' determina el tamaño máximo que puede tener la entrada, debe ser potencia de 2
  //la salida se invierte eg 0101 => 1010
  //Ejemplos:
  // getBits(10, 2^4) regresa =>  ["0", "1", "0", "1"]
  // getBits( 1, 2^4) regresa =>  ["1", "0", "0", "0"]

  var tmp = "";
  for(var i = size/2; i >= 1; i /= 2){
    tmp += a&i?'1':'0';
  }
  tmp = tmp.split("").reverse();
  console.log(tmp);
  return tmp;
}

// FUNCIONES DE OPERACIONES DE CONJUNTOS ***************************************
function union(a, b){
  //Regresa el conjunto unión
  var newA = []; //Variable para guardar el conjunto de salida
  for(var i = 0; i < a.length; i++){
    //Para cada elemento de a
    if(!isInArray(a[i], newA)){
      //Si a[i] no está en el conjunto de salida => agregar al conjunto de salida
      newA.push(a[i]);
    }
  }

  for(var i = 0; i < b.length; i++){
    //Para cada elemento de a
    if(!isInArray(b[i], newA)){
      //Si b[i] no está en el conjunto de salida => agregar al conjunto de salida
      newA.push(b[i]);
    }
  }
  return sortN(newA); //Regresar el conjunto de salida ordenado
}

function intersection(a, b){
  //Regresa el conjunto intersección
  var newA = [];
  for(var i = 0; i < a.length; i++){
    //Para todo elemento de a
    if(isInArray(a[i], b) && ( !isInArray(a[i], newA) ) ){
      //Si a[i] esta en b y NO está en el arreglo de salida => agregar al conjunto de salida
      newA.push(a[i]);
    }
  }
  return sortN(newA);
}

function difference(a,b){
  // Regresa el conjunto resultado de a - b
  var newA = [];

  for(var i = 0; i < a.length; i++){
    //Para todo elemento de a
    if(!isInArray(a[i], b)){
      //Si s[i] no esta en b agregar al => conjunto de salida
      newA.push(a[i]);
    }
  }
  return sortN(newA); //Regresar el conjunto de salida ordenado
}

function potencia(a){
  var newA = [];                //Crear arreglo para guardar la salida
  var size = a.length;          //regresar cardinalidad de a
  var potc = Math.pow(2, size); //Calcular cardinalidad del conjunto potencia
  console.log("size of " + a + " is: " + size + ", conjunto potencia " + potc);

  for(var i = 0; i < potc; i++){
    //desde 0 hasta la cardinalidad del conjunto potencia
    var sub = []; //Arreglo para guardar los elementos de cada subarreglo

    //Transformar i en binario de tamaño suficiente para almacenar hasta la cardinalidad del conjunto potencia
    //Básicamente convierte a i a su equivalente en binario y este a un arreglo de bits, asi se puede garantizar que existen todas las combinaciones
    //Nota: la cardinalidad de 'flags' es igual a la de 'a'
    var flags = getBits(i, potc);

    for(var j = 0; j < size; j++){
      //para cada elemento de a
      if(flags[j] == "1"){
        //Si flags[j] es "1" (o un valor verdadero) agregar a[j] al subarreglo
        sub.push(a[j]);
      }
    }
    //Agregar el subarreglo al arreglo de salida
    newA.push("{ " + sub + " }<br>");
  }
  //Regresar el arreglo de salida
  return "<br>" + newA;
}

var cesar = cesar || (function(){
    var proceso = function(txt, desp, action){
        var replace = (function(){
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z'];
        var l = abc.length

        return function(c){
            //Necesitamos saber la posicion del abecedario de acuerdo al desplazamiento
            var i=abc.indexOf(c.toLowerCase());
            /*Necesitamos saber donde estamos dentro d e la matriz abc y como la vamos a recorrer
            para el momento del cifrado*/
            if(i !=- 1){
                //Primero obtenemos la posicion para el desplazamiento
                var pos=i;
                //Necesito saber la operación a realizar
                if(action){
                    //Cifrar hacia adelante
                    pos+=desp;
                    //Definir como es que se va a mover
                    pos-=(pos>=l)?1:0;
                }else{
                    //Descrifra para atrás
                    pos-=desp;
                    //Movimiento
                    pos+=(pos<0)?1:0
                }
                return abc[pos];
            }
            return c;
        };
    })(); 
    /*Se usa un CALLBACK para volver a llamar a la funcion, 
    por lo cual tenemos que saber que el texto esté de acorde a abc*/

    var re=(/([a-z])/ig)

    /*Necesitamos una funcion que se encargue del intercambio de las posiciones
    acorde a si coincide el texto a cifrar con la expresión regular*/

    return String(txt).replace(re, function(match){
        return replace(match);
    });
    
    };

    return {
        encode:function(txt,desp){
            return proceso(txt,desp,true);
        },
        decode:function(txt,desp){
            return proceso(txt,desp,false);
        }
    };
})();

function cifrarC(){
    document.getElementById('resultadoC').innerHTML= 
    cesar.encode(document.getElementById('cadena').value, parseInt(document.getElementById("desp").value));   
}

function descifrarC(){
    document.getElementById("resultadoC").innerHTML=
    cesar.decode(document.getElementById("cadena").value, parseInt(document.getElementById("desp").value));
}
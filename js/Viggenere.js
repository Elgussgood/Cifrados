const abc  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z']

//llave
let key = ""
let mess = ""

//Bienvenidos a interpretar el código
$(document).ready(function(){
    //Hacer función para poder cifrar con viggenere
    $('#ci').click(function() {
        //para cifrar vamos a utilizar una función de módulo la cuál es: y = (x+z)mod27
        key = document.getElementById('llave').value
        //verificar llave
        key = key.toLowerCase().replace(/ /g, "")

        //traemos el mensaje y verificamos
        mess = document.getElementById('mess').value
        mess = mess.toLowerCase().replace(/ /, "")

        let newMess = ""
        let keyCompleta = ""

        //para aplicar el algoritmo debemos crear una funcion que se encargue de revisar las condiciones del mismo

        if(revision(key, mess)){

            //aplicar emparejamientio de mensaje/key

            for(let i = 0; i<mess.length;i++){
                //emperejoamos conforme  a la posicion de cada caracter
                keyCompleta+=key.charAt(i%key.length)

            }

            //tengo que volver a recorrer el mensaje para obtener caracteres y posiciones

            for (let i = 0; i < mess.length; i++) {
                let char = mess.charAt(i)
                //debemos crear una funcion para obtener la pos de ese caracter
                let posMess = getPosicion(char)

                //tambien aplicarlo a la llave
                char = keyCompleta.charAt(i)

                let posKey = getPosicion(char)

                //tenemos que ejecutar el cifrado
                let newValores = cifrado(posMess, posKey)

                newMess+=abc[newValores]
            }

            document.getElementById("resultadoV").innerHTML = `keyCompleta: ${keyCompleta}<br> Cifrado: ${newMess}`

        }else{
            alert("No sirve cifrar")
        }
    })

    $('#di').click(function() {
        //para cifrar vamos a utilizar una función de módulo la cuál es: y = (x+z)mod27
        key = document.getElementById('llave').value
        //verificar llave
        key = key.replace(/ /g, "")

        //traemos el mensaje y verificamos
        mess = document.getElementById('mess').value
        mess = mess.replace(/ /, "")

        let newMess = ""
        let keyCompleta = ""

        //para aplicar el algoritmo debemos crear una funcion que se encargue de revisar las condiciones del mismo

        if(revision(key, mess)){

            //aplicar emparejamientio de mensaje/key

            for(let i = 0; i<mess.length;i++){
                //emperejoamos conforme  a la posicion de cada caracter
                keyCompleta+=key.charAt(i%key.length)

            }

            //tengo que volver a recorrer el mensaje para obtener caracteres y posiciones

            for (let i = 0; i < mess.length; i++) {
                let char = mess.charAt(i)
                //debemos crear una funcion para obtener la pos de ese caracter
                let posMess = getPosicion(char)

                //tambien aplicarlo a la llave
                char = keyCompleta.charAt(i)

                let posKey = getPosicion(char)

                //tenemos que ejecutar el cifrado
                let newValores = descifrar(posMess, posKey)

                newMess+=abc[newValores]
            }

            document.getElementById("resultadoV").innerHTML = `keyCompleta: ${keyCompleta}<br> Descifrado: ${newMess}`

        }else{
            alert("No sirve descifrar")
        }
    })

})

//empezar con la funcion de cambio o de cifrado

function cifrado(posM, posK){
    let y = (posM+posK)%abc.length
    return y
}

function descifrar(posM, posK){
    let y = 0
    if((posM-posK)>=0){
        y = (posM-posK)%abc.length
    }else{
        y = (posM-posK+abc.length)%abc.length
    }
    return y
}

function getPosicion(char){
    let pos = abc.indexOf(char)
    return pos
}

function revision(key, mens){

    var regex = /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/g
    var aceptado = true

    if(!regex.test(mens)){
        alert("El texto que ingreso es incorrecto")
        aceptado = false
    }
    if(regex.test(key)){
        alert("La llave ingresada es incorrecta")
        aceptado = false
    }
    if(key.length>mens.length){
        alert("La clave no puede ser mayor que el mensaje")
        aceptado = false
    }

    return aceptado
}
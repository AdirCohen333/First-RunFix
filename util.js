'use strict'






function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and 
}




function playsound(){
    var sound = new Audio('bombDefuse.mp3')
    sound.play()
    }
    function playsoundBoom(){
        var sound = new Audio('Counter Strike Explosion sounds.mp3')
        sound.play()
        }

        function playsoundSecret(){
            var sound = new Audio('eastereggStav2.mp3')
            sound.play()
            }
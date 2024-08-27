import { test } from './functions/test.js';
import heroes from '../data/heroes.json';

$(document).ready(function(){

    // jQuery methods go here...
    console.log("Ready!");

    //console.log(heroes);

    $.state = {
        cards: {
            heroes
        },
        generationState: {
            foundHeroes: [],
            availableHeroes: heroes
        }
    };
    
    $("#test-button").click(function(){
        $.state.generationState.foundHeroes = [];
        shuffleArray($.state.cards.heroes)
        $.state.generationState.foundHeroes.push($.state.cards.heroes[0]);
        //remove hero from array
        while ($.state.generationState.foundHeroes.length < 5){
            shuffleArray($.state.cards.heroes)
            $.state.generationState.foundHeroes.push($.state.cards.heroes[0]);
        }
        var resultText = $.state.generationState.foundHeroes.reduce((a, c, i) => `${a}${i == 0 ? "" : ", "}${c.name}`, "");
        $("#results").text(resultText);
        //test();
    })
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
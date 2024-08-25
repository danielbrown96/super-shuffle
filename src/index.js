import { test } from './functions/test.js';
import heroes from '../data/heroes.json';

$(document).ready(function(){

    // jQuery methods go here...
    console.log("Ready!");

    console.log(heroes);

    $("#test-button").click(function(){
        test();
    })
});
import { test } from './functions/test.js';

$(document).ready(function(){

    // jQuery methods go here...
    console.log("Ready!");

    $("#blarp-button").click(function(){
        console.log("Button clicked");
        test();
        $("#blarp-button").hide();
    })
  });
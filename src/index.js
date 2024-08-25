import { test } from './functions/test.js';

$(document).ready(function(){

    // jQuery methods go here...
    console.log("Ready!");

    $("#load-button").click(function(){
        //test();
        readFiles();
    })
});


var readFiles = async () => {
    var data = {
        heroes: []
    }

    await fetch('https://api.github.com/repos/danielbrown96/super-shuffle/contents/data/heroes').then(response => response.json())
    .then(async json => {
        await Promise.all(
        json.map(e => {
            if (e.name != 'template.json'){
                var fullPath = `https://danielbrown96.github.io/super-shuffle/${e.path}`;
                return fetch(fullPath).then(response => response.json()).then(json => {
                    data.heroes.push(json);
                })
            }
        }))
    })

    console.log(data);
}
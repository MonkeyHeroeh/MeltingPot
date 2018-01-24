// Pong by:     Ilja Plutschouw
// Created for: CMD-GD Hanze University of Applied Sciences
// Date:        10 december 2017
// Version:     1.1
//
// Change log:
// v1.1
// - added card images with spritesheet
// 
// Template for showing the basics for a card game
//

var player1Cards;
var player2Cards;
var deck;
var table;
var currentCard = {
    country: "",
    season: ""
}
var firstCard = true;

function preload() {
    game.load.json('card_data', './js/card_data.json');
    game.load.spritesheet("cards", "./images/gamecards.jpg", 89, 125, 40);
}


//What layoutgroup does
function layoutGroup(group, x, y, spread, delay = 10) {
    var startX = x - group.children.length * spread * 0.5;
    for (var i = 0; i < group.children.length; i++) {
        var child = group.children[i];
        game.add.tween(child).to({ x: startX + i * spread, y: y }, 500, Phaser.Easing.Quadratic.Out).delay(i*delay).start();
    }
}

function create() {
    var deckValues = game.cache.getJSON('card_data');
    console.log(deckValues);
    
    // create card groups
    player1Cards = game.add.group();
    player2Cards = game.add.group();
    deck = game.add.group();
    table = game.add.group();

    // create the cards on the deck
    for (var i = 0; i < deckValues.length; i++) {
        var card = deck.create(80 + 0.05 * i, 360, "cards");
        card.country = deckValues[i].country;
        card.season = deckValues[i].season;
        card.frame = i; /*game.rnd.integerInRange(0, 40);*/
        card.anchor.set(0.5, 0.5);
        card.name = 'card_' + i;
    }

    // enable input for all children
    player1Cards.inputEnableChildren = true;
    player2Cards.inputEnableChildren = true;
    deck.inputEnableChildren = true;

    //  And now we'll listen to the Group events
    player1Cards.onChildInputDown.add(onDown, this);
    player2Cards.onChildInputDown.add(onDown, this);

    // distribute 6 cards to each player
    for (var playerID = 0; playerID < 2; playerID++) {
        for (var i = 0; i < 6; i++) {
            var card = deck.removeChildAt(0);
            if (playerID == 0) {
                player1Cards.add(card);
            }
            else {
                player2Cards.add(card);
            }
       }
    }
    layoutGroup(player1Cards, 640, 120, 95, 100);
    layoutGroup(player2Cards, 640, 600, 95, 100);
}

function onDown (card) {
    console.log(card.country, card.season);
    if (firstCard){
            firstCard = false;
            currentCard.country = card.country;
            currentCard.season = card.season;
            table.add(card);
            layoutGroup(table, 640, 360, 3);
    }
    
    if (card.parrent == player1Cards) {
        if (card.country === currentCard.country){
            player1Cards.remove(card);
            currentCard.country = card.country;
            currentCard.season = card.season;
            table.add(card);
            layoutGroup(table, 640, 360, 3);
        }
        else if(card.season === currentCard.season){
            player1Cards.remove(card);
            currentCard.country = card.country;
            currentCard.season = card.season;
            table.add(card);
            layoutGroup(table, 640, 360, 3);
        }
        else{
            console.log("This card doesn't match")
            window.alert("This card doesn't match")
        }
    }
    else {
        if (card.country === currentCard.country){
            currentCard.country = card.country;
            currentCard.season = card.season;
            table.add(card);
            layoutGroup(table, 640, 360, 3);
        }
        else if(card.season === currentCard.season){
            currentCard.country = card.country;
            currentCard.season = card.season;
            table.add(card);
            layoutGroup(table, 640, 360, 3);
        }
        else{
            console.log("This card doesn't match")
            window.alert("This card doesn't match")
        }
    }
}

function update() {

}

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });
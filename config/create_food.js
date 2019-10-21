var conf = require("config");
var mongoose = require('mongoose');
const winston = require("winston");
winston.level = conf.get("app.logging.level");

const conn = mongoose.createConnection('mongodb://' + conf.get('database.food.url') + conf.get('database.food.name'));
var food_schema = mongoose.Schema(conf.get("schema.food"));
const food_model = conn.model('food', food_schema);

all_food = [];

//Entrees
//allows us to store all the information on the food items
var food1 = new food_model ({
  name: "Caeser salad",
  enabled: true,
  type: "entree_menu",
  description: "A Caesar Salad: freshly chopped lettuce, mozzarella cheese topping, croutons. Dressed with our own secret sauce!",
  picture: "/img/CaesarSalad.jpg",
  specialOfDay: "0",
  price: 12.5
});

//if saved correctly success if not console.error();
food1.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food2 = new food_model ({
  name: "Classic Sirloin",
  enabled: true,
  type: "entree_menu",
  description: "Fresh off the cow, slathered with butter. Only can order it Rare",
  picture: "/img/Sirloin.jpg",
  specialOfDay: "6",
  price: 16.99
});

//if saved correctly success if not console.error();
food2.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food3 = new food_model ({
  name: "Chicken Fajitas",
  enabled: true,
  type: "entree_menu",
  description: "2 Chicken Fajita, wrapped in flour tortilla with pico de gallo inside and outside of the Fajitas!",
  picture: "/img/chickenFajitas.jpg",
  specialOfDay: "1",
  price: 14.79
});

//if saved correctly success if not console.error();
food3.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food4 = new food_model ({
  name: "Bacon Burger",
  enabled: true,
  type: "entree_menu",
  description: "Burger containing BACON, tomatoes, lettuce, pickles, cheese, and secret sauce!",
  picture: "/img/Bacon_Cheeseburger.jpg",
  specialOfDay: "2",
  price: 10.29
});

//if saved correctly success if not console.error();
food4.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//Appetizers
//allows us to store all the information on the food items
var food5 = new food_model ({
  name: "Boneless Wings",
  enabled: true,
  type: "appetizer_menu",
  description: "6 Boneless Chiken wings, seasoned and drench in our secret sauce!",
  picture: "/img/Boneless.jpg",
  specialOfDay: "3",
  price: 9.99
});

//if saved correctly success if not console.error();
food5.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food6 = new food_model ({
  name: "Bone-in wings",
  enabled: true,
  type: "appetizer_menu",
  description: "6 Bone Chiken wings, seasoned and drench in our secret sauce!",
  picture: "/img/boned_wings.jpg",
  specialOfDay: "4",
  price: 9.99
});

//if saved correctly success if not console.error();
food6.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food7 = new food_model ({
  name: "Classic Nachos",
  enabled: true,
  type: "appetizer_menu",
  description: "Chips covered with cheese, jalapeno, and black olives!",
  picture: "/img/Nachos-cheese.jpg",
  specialOfDay: "-1",
  price: 9.99
});

//if saved correctly success if not console.error();
food7.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food8 = new food_model ({
  name: "Fries",
  enabled: true,
  type: "appetizer_menu",
  description: "Freshed baked fries, covered in 2 of our secret sauces!",
  picture: "/img/Fries.jpg",
  specialOfDay: "5",
  price: 9.99
});

//if saved correctly success if not console.error();
food8.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//drinks
//allows us to store all the information on the food items
var food9 = new food_model ({
  name: "Dr. Pepper",
  enabled: true,
  type: "drink_menu",
  description: "Texas Drink of Choice, probably!",
  picture: "/img/pepper.jpg",
  specialOfDay: "-1",
  price: 2.69
});

//if saved correctly success if not console.error();
food9.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food10 = new food_model ({
  name: "Water",
  enabled: true,
  type: "drink_menu",
  description: "Water, healthier but wheres the flavor!",
  picture: "/img/water.jpg",
  specialOfDay: "-1",
  price: 2.29
});

//if saved correctly success if not console.error();
food10.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food11 = new food_model ({
  name: "Lemonade",
  enabled: true,
  type: "drink_menu",
  description: "Refreshing Minute Maid Lemonade!",
  picture: "/img/lemonade.jpg",
  specialOfDay: "-1",
  price: 3.09
});

//if saved correctly success if not console.error();
food11.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food12 = new food_model ({
  name: "Sprite",
  enabled: true,
  type: "drink_menu",
  description: "Old German remedies; Sprite helps with headaches!",
  picture: "/img/Sprite.jpg",
  specialOfDay: "-1",
  price: 2.69
});

//if saved correctly success if not console.error();
food12.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//kids menu
//allows us to store all the information on the food items
var food13 = new food_model ({
  name: "Mini Pizza",
  enabled: true,
  type: "kids_menu",
  description: "A Pepperon Pizza, but mini!",
  picture: "/img/pizza_mini.jpg",
  specialOfDay: "-1",
  price: 5.51
});

//if saved correctly success if not console.error();
food13.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food14 = new food_model ({
  name: "Macaroni Cheese",
  enabled: true,
  type: "kids_menu",
  description: "Noddles covered in cheddar cheese with special secret seasoning!",
  picture: "/img/Maccheese.jpg",
  specialOfDay: "-1",
  price: 5.21
});

//if saved correctly success if not console.error();
food14.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food15 = new food_model ({
  name: "Grilled Cheese",
  enabled: true,
  type: "kids_menu",
  description: "Grilled Buttered bread, with cheddar cheese!",
  picture: "/img/grilled_cheese.jpg",
  specialOfDay: "-1",
  price: 5.21
});

//if saved correctly success if not console.error();
food15.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food16 = new food_model ({
  name: "Beef Sliders",
  enabled: true,
  type: "kids_menu",
  description: "Burger bites made with all-natural beef!",
  picture: "/img/sliders.jpg",
  specialOfDay: "-1",
  price: 5.51
});

//if saved correctly success if not console.error();
food16.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

// Deserts
//allows us to store all the information on the food items
var food17 = new food_model ({
  name: "Skillet Chocolate Cookie",
  enabled: true,
  type: "dessert_menu",
  description: "Giant cookie, topped with icecream!",
  picture: "/img/cookie_skillet.jpg",
  specialOfDay: "-1",
  price: 9.99
});

//if saved correctly success if not console.error();
food17.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food18 = new food_model ({
  name: "Cheesecake",
  enabled: true,
  type: "dessert_menu",
  description: "Cheesecake, enough said!",
  picture: "/img/cheesecake.jpg",
  specialOfDay: "-1",
  price: 9.99
});

//if saved correctly success if not console.error();
food18.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food19 = new food_model ({
  name: "Paradise Pie",
  enabled: true,
  type: "dessert_menu",
  description: "Chocolate chip; topped wth vanulla ice cream!",
  picture: "/img/Paradise_pie.jpg",
  specialOfDay: "-1",
  price: 9.99
});

//if saved correctly success if not console.error();
food19.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

//allows us to store all the information on the food items
var food20 = new food_model ({
  name: "Molten Chocolate Volcano",
  enabled: true,
  type: "dessert_menu",
  description: "Chocolate Cake that is shaped like a volcano with ice cream on top!",
  picture: "/img/volcano.jpg",
  specialOfDay: "-1",
  price: 9.99
});

//if saved correctly success if not console.error();
food20.save(function(err) {
    if (err){
        console.log(err);
      }
    else {
      console.log("success");
    }
});

// all_food.push(food1);
// for (var food in all_food) {
//   food.save(function(err) {
//       if (err){
//           console.log(err);
//         }
//       else {
//         console.log("success");
//       }
//   });
// }

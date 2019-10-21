// https://notifyjs.jpillora.com/

/* Set rates + misc */
var taxRate = 0.0825;
var fadeTime = 300;
var total_quantity = 0;


function calculate_tip() {
    var val = document.getElementById("tipRange").value;
    let data = JSON.parse(document.getElementById("current_order").value);

		calc_tip = (data[0].invoice.total * val).toFixed(2);
    tip = document.getElementById("calculated_tip");
    tip.value = calc_tip;
    tip.innerHTML = `Tip: ${(val * 100).toFixed(0)}% | Amount: $${calc_tip}`;
}

function add_to_payment(guest_type, amount){
  var input = document.getElementById(`${guest_type}`);
  console.log(`input: ${input}\nguest_type: ${guest_type}\namount ${amount}`);
  console.log(`${typeof(input.value)} ${input.value}`);
  if (input.value === "") {
    input.value = (parseFloat(amount));
  }
  else {
    input.value = (parseFloat(input.value) + parseFloat(amount)).toFixed(2);
  }
}

// var cart = {
//   "caeser salad": {
//       price: "12.50",
//       qty: 2
//     },
//     "dr. pepper": {
//       price: "3.50",
//       qty: 3
//     }
// };
// var jsonStr = JSON.stringify( cart );
// sessionStorage.setItem( "cart", jsonStr );
//
// var cartValue = sessionStorage.getItem( "cart" );
// var cartObj = JSON.parse( cartValue );
// original object

function cart_expand() {
  //     <label><input type="checkbox" name="takeout" value="">Takeout</label>

  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse( cartValue );
  var subcart = document.getElementById("subcart");
  while (subcart.firstChild) {
      subcart.removeChild(subcart.firstChild);
  }
  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "/order");
  form.setAttribute("name", "order");
  total_quantity = 0;
  for (var key in cartObj) {

    console.log(key);
    console.log(cartObj[key]);
    var row_div = document.createElement("div");
    row_div.setAttribute("class", "row");
    var product_div = document.createElement("div");
    product_div.setAttribute("class", "col-3");
    var cost_div = document.createElement("div");
    cost_div.setAttribute("class", "col-3");
    var amount_div = document.createElement("div");
    amount_div.setAttribute("class", "col-2");
    var subtotal_div = document.createElement("div");
    subtotal_div.setAttribute("class", "col-2");
    var remove_div = document.createElement("div");
    remove_div.setAttribute("class", "col-2");

    var product = document.createTextNode(key);
    product.innerHTML = key;
    var hidden_product = document.createElement("input");
    hidden_product.setAttribute("type", "hidden");
    hidden_product.setAttribute("name", "product");
    hidden_product.setAttribute("value", key);
    product_div.appendChild(product);
    product_div.appendChild(hidden_product);

    var input_quantity = document.createElement("input");
    input_quantity.setAttribute("class", "form-control");
    input_quantity.setAttribute("type", "number");
    input_quantity.setAttribute("class", "form-control input-sm");
    input_quantity.setAttribute("value", cartObj[key].qty);
    input_quantity.setAttribute("name", "quantity");
    input_quantity.setAttribute("readonly", "");
    amount_div.appendChild(input_quantity);
    var cost = document.createTextNode(cartObj[key].price);
    cost_div.appendChild(cost);
    var subtotal = document.createTextNode((cartObj[key].price * cartObj[key].qty).toFixed(2));
    subtotal_div.appendChild(subtotal);
    total_quantity = total_quantity + parseFloat(cartObj[key].qty);

    var remove_item = document.createElement("button");
    remove_item.setAttribute("type", "button");
    remove_item.setAttribute("onclick", `remove_item("${key}")`);
    remove_item.setAttribute("class", "btn btn-danger btn-block responsive-width");
    remove_item.innerHTML = "Remove";
    remove_div.appendChild(remove_item);
    form.appendChild(row_div);
    row_div.appendChild(product_div);
    row_div.appendChild(cost_div);
    row_div.appendChild(amount_div);
    row_div.appendChild(subtotal_div);
    row_div.appendChild(remove_div);
  }
  var submit = document.createElement("button");
  submit.setAttribute("type", "button");
  submit.setAttribute("class", "btn btn-info btn-block");
  submit.setAttribute("onclick", "order_submit()");
  // submit.setAttribute("onclick", "order_items()");
  submit.setAttribute("name", "tableid");
  submit.setAttribute("value", document.getElementById("tableid").value);
  submit.innerHTML = "Submit Order";
  var instruction = document.createElement("input");
  instruction.setAttribute("name", "instruction");
  instruction.setAttribute("type", "text");
  instruction.setAttribute("class", "form-control");
  instruction.setAttribute("placeholder", "Enter an instruction for your items");

  var table_takeout = document.createElement("input");
  table_takeout.setAttribute("type", "checkbox");
  table_takeout.setAttribute("name", "takeout");
  table_takeout.setAttribute("id", "takeout");
  table_takeout.setAttribute("class", "form-check-input");
  var table_takeout_label = document.createElement("label");
  table_takeout_label.setAttribute("type", "checkbox");
  table_takeout_label.setAttribute("name", "takeout");
  table_takeout_label.setAttribute("id", "takeout");
  table_takeout_label.setAttribute("class", "form-check-label");
  table_takeout_label.innerHTML = `Is this a takeout? `;
  var takeout_div = document.createElement("div");
  takeout_div.setAttribute("class", "form-check");
  takeout_div.appendChild(table_takeout);
  takeout_div.appendChild(table_takeout_label);

  // table_takeout.setAttribute("value", "");

  var table_input = document.createElement("input");
  table_input.setAttribute("type", "hidden");
  table_input.setAttribute("name", "tableid");
  table_input.setAttribute("value", `${document.getElementById("tableid").value}`);

  form.appendChild(table_input);
  form.appendChild(instruction);
  form.appendChild(takeout_div);
  form.appendChild(submit);
  subcart.appendChild(form);
}

function order_submit() {
  if (total_quantity <= 20) {
    document.order.submit();
  }
  else {
    $.notify(`You have too many items in your cart, max is 20 you have ${total_quantity}`, "warning");
    sessionStorage.clear();
    cart_expand();
  }
}


function order_expand() {
  var order_obj = sessionStorage.getItem( "order" ) === null ? {} : JSON.parse(sessionStorage.getItem( "order" ));
  console.log(`order: ${order_obj}`);
  for (var key in order_obj) {
    console.log(key);
  }
  // check if the order exists LOL
  if (order_obj != {}) {
    var order_el = document.getElementById("damage");
    var wrap_div = document.createElement("div");

    for (let key in order_obj) {
      console.log(key);
      console.log(order_obj[key]);
      var row_div = document.createElement("div");
      row_div.setAttribute("class", "row");
      var product_div = document.createElement("div");
      product_div.setAttribute("class", "col-3");
      var cost_div = document.createElement("div");
      cost_div.setAttribute("class", "col-3");
      var amount_div = document.createElement("div");
      amount_div.setAttribute("class", "col-2");
      var subtotal_div = document.createElement("div");
      subtotal_div.setAttribute("class", "col-2");
      var remove_div = document.createElement("div");
      remove_div.setAttribute("class", "col-2");

      var product = document.createTextNode(key);
      product_div.appendChild(product);

      var input_quantity = document.createTextNode(order_obj[key].qty);
      amount_div.appendChild(input_quantity);

      var cost = document.createTextNode(order_obj[key].price);
      cost_div.appendChild(cost);

      var subtotal = document.createTextNode(order_obj[key].price * order_obj[key].qty);
      subtotal_div.appendChild(subtotal);


      wrap_div.appendChild(row_div);
      row_div.appendChild(product_div);
      row_div.appendChild(cost_div);
      row_div.appendChild(amount_div);
      row_div.appendChild(subtotal_div);
    }
    var header = document.createElement("h1");
    header.setAttribute("style", "color:white;");
    header.innerHTML = "The Damage";
    var sep = document.createElement("hr");
    var pay_btn = document.createElement("button");
    pay_btn.setAttribute("type", "button");
    pay_btn.setAttribute("class", "btn btn-info btn-block");
    pay_btn.setAttribute("onclick", "pay()");
    pay_btn.setAttribute("name", "tableid");
    pay_btn.setAttribute("value", document.getElementById("tableid").value);
    pay_btn.innerHTML = "Pay Bill";
    order_el.appendChild(header);
    order_el.appendChild(sep);
    order_el.appendChild(wrap_div);
    order_el.appendChild(pay_btn);
  }

}

function order_items() {
    var cartObj = sessionStorage.getItem( "cart" ) === null ? {} : JSON.parse(sessionStorage.getItem( "cart" ));
    var order_obj = sessionStorage.getItem( "order" ) === null ? {} : JSON.parse(sessionStorage.getItem( "order" ));

    var jsonStr = JSON.stringify( cartObj );
    sessionStorage.setItem( "order", jsonStr );
    cart = {};
    jsonStr = JSON.stringify( cart );
    sessionStorage.setItem( "cart", jsonStr );
    order_expand();
}

//
var isFloat = function(n) { return parseFloat(n) === n };

// doesn't currently work
function pay() {
  var food_items  = ["Classic Sirloin",
                    "Caeser salad",
                    "Chicken Fajitas",
                    "Bacon Burger",
                    "Boneless Wings",
                    "Bone-in Wings",
                    "Classic Nachos",
                    "Fries",
                    "Skillet Chocolate Cookie",
                    "Cheesecake",
                    "Paradise Pie",
                    "Molten Chocolate Volcano",
                    "Lemonade",
                    "Sprite",
                    "Dr. Pepper",
                    "Water",
                    "Mini Pizza",
                    "Macaroni Cheese",
                    "Grilled Cheese",
                    "Beef Sliders"],
      length = food_items.length;
  let data = JSON.parse(document.getElementById("current_order").value);
  var form = document.bill;
  console.log(form);
  data[0].paid = true;
  console.log(`data: ${isFloat(parseFloat())}`);
  data[0].invoice.cash = []
  data[0].invoice.credit_card_amount = []
  data[0].invoice.credit_card_number = []
  data[0].invoice.discount = []
  if (isFloat(parseFloat(form.guest01_cash.value))) {
    data[0].invoice.cash.push(form.guest01_cash.value);
  }
  if (isFloat(parseFloat(form.guest01_credit.value))) {
    if (form.guest01_credit_number.value.length == 16) {
      data[0].invoice.credit_card_amount.push(form.guest01_credit.value)
      data[0].invoice.credit_card_number.push(form.guest01_credit_number.value)
    }
  }
  if (isFloat(parseFloat(form.guest02_cash.value))) {
    data[0].invoice.cash.push(form.guest02_cash.value)
  }
  if (isFloat(parseFloat(form.guest02_credit.value))) {
    if (form.guest02_credit_number.value.length == 16) {
      data[0].invoice.credit_card_amount.push(form.guest02_credit.value)
      data[0].invoice.credit_card_number.push(form.guest02_credit_number.value)
    }

  }
  if (isFloat(parseFloat(form.guest03_cash.value))) {
    data[0].invoice.cash.push(form.guest03_cash.value)
  }
  if (isFloat(parseFloat(form.guest03_credit.value))) {
    if (form.guest03_credit_number.value.length == 16) {
      data[0].invoice.credit_card_amount.push(form.guest03_credit.value)
      data[0].invoice.credit_card_number.push(form.guest03_credit_number.value)
    }
  }
  if (isFloat(parseFloat(form.guest04_cash.value))) {
    data[0].invoice.cash.push(form.guest04_cash.value)
  }
  if (isFloat(parseFloat(form.guest04_credit.value))) {
    if (form.guest04_credit_number.value.length == 16) {
      data[0].invoice.credit_card_amount.push(form.guest04_credit.value)
      data[0].invoice.credit_card_number.push(form.guest04_credit_number.value)
    }
  }

  // data[0].invoice.cash.push(form.guest02_cash.value)
  // data[0].invoice.cash.push(form.guest03_cash.value)
  // data[0].invoice.cash.push(form.guest04_cash.value)
  console.log(`cash: ${data[0].invoice.cash}`);


  // data[0].invoice.credit_card_amount.push(form.guest02_credit.value)
  // data[0].invoice.credit_card_amount.push(form.guest03_credit.value)
  // data[0].invoice.credit_card_amount.push(form.guest04_credit.value)
  console.log(`card amount: ${data[0].invoice.credit_card_amount}`);

  // data[0].invoice.credit_card_number.push(form.guest01_credit_number.value)
  // data[0].invoice.credit_card_number.push(form.guest02_credit_number.value)
  // data[0].invoice.credit_card_number.push(form.guest03_credit_number.value)
  // data[0].invoice.credit_card_number.push(form.guest04_credit_number.value)
  console.log(`card number: ${data[0].invoice.credit_card_number}`);
  var total_paid = (data[0].invoice.credit_card_amount.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) + (data[0].invoice.cash.reduce((a, b) => parseFloat(a) + parseFloat(b), 0));
  console.log(`total paid: ${total_paid}`);
  if (/remove/.test(form.coupon_code.value) ) {
    while(length--) {
     if (form.coupon_code.value.indexOf(food_items[length])!=-1) {
         // one of the substrings is in yourstring
         data[0].invoice.discount.push(food_items[length]);
         data[0].invoice.discount.push(parseFloat(form.coupon_code.value));
     }
   }
  }

  if (total_paid < parseFloat(data[0].invoice.total)) {
     $.notify(`Pay amount is not enough ${total_paid} < ${data[0].invoice.total}`, "error");
  }
  else {
    data[0].invoice.tip = (total_paid - parseFloat(data[0].invoice.total)).toFixed(2);
    console.log(`${data[0].invoice.discount}`);
    var game = getRandomIntInclusive(1, 5);
    console.log(game);
    if (3 == game) {
      alert("You win!"+ '\n' + "Code is: 'OneFreeAppXorDesert'  "+ '\n' + "Give to the waiter to redeem!")
    }
    $.post("/pay-damage",
  		data[0],
  		function(data, status){
        $.notify(`Payment: success.`, "success");
        sessionStorage.clear();
        location.reload();
  		});
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function add_item(form_element){
  var cartObj = sessionStorage.getItem( "cart" ) === null ? {} : JSON.parse(sessionStorage.getItem( "cart" ));
  console.log(`Adding ${form_element.qty.value} ${form_element.item.value} to cart`);
  if (cartObj) {
    if (cartObj.hasOwnProperty(form_element.item.value)) {
      // increase by quantity
      cartObj[form_element.item.value].qty = parseFloat(cartObj[form_element.item.value].qty) + parseFloat(form_element.qty.value);
    }
    else {
      //add item + quantity
      cartObj[form_element.item.value] = {
          price: form_element.price.value,
          qty: form_element.qty.value
        };
    }
  }
  else {
    //add item + quantity
    product = form_element.item.value;
    // cartObj = {product}
    cartObj[product] = {
        price: form_element.price.value,
        qty: form_element.qty.value
      };
  }
  var jsonStr = JSON.stringify( cartObj );
  sessionStorage.setItem( "cart", jsonStr );
  cart_expand();
  $.notify(`Added ${form_element.qty.value} ${form_element.item.value}(s)!`, "success");
}


function remove_item(form_element){
  var cartObj = sessionStorage.getItem( "cart" ) === null ? {} : JSON.parse(sessionStorage.getItem( "cart" ));
  console.log(`removing ${form_element} from cart`);
  delete cartObj[form_element];

  var jsonStr = JSON.stringify( cartObj );
  sessionStorage.setItem( "cart", jsonStr );
  cart_expand();
  $.notify(`Removed ${form_element}(s)!`, "error");
}


function display_split2(){
  console.log("display_split2");
}

$.notify.defaults({
	// whether to hide the notification on click
	clickToHide: true,
	// whether to auto-hide the notification
	autoHide: true,
	// if autoHide, hide after milliseconds
	autoHideDelay: 5000,
	// show the arrow pointing at the element
	arrowShow: true,
	// arrow size in pixels
	arrowSize: 5,
	// position defines the notification position though uses the defaults below
	position: "top right",
	// default positions
	elementPosition: "bottom left",
	globalPosition: "top right",
	// default style
	style: "bootstrap",
	// default class (string or [string])
	className: "error",
	// show animation
	showAnimation: "slideDown",
	// show animation duration
	showDuration: 400,
	// hide animation
	hideAnimation: "slideUp",
	// hide animation duration
	hideDuration: 200,
	// padding between element and notification
	gap: 2
});


cart_expand();

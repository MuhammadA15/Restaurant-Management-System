// https://notifyjs.jpillora.com/
var notes = 0;
var cook_orders = 0;

var table_owner = {
	"waiter01": ["table01", "table02", "table03", "table04",
               "table05", "table06", "table07", "table08", "takeout"],
	"waiter02": ["table09", "table10", "table11", "table12",
               "table13", "table14", "table15", "table16"],
  "waiter03": ["table17", "table18", "table19", "table20",
               "table21", "table22", "table23", "table24"],
	"cook01": ["table01", "table02", "table03", "table04",
             "table05", "table06", "table07", "table08",
             "table09", "table10", "table11", "table12",
             "table13", "table14", "table15", "table16",
             "table17", "table18", "table19", "table20",
             "table21", "table22", "table23", "table24", "takeout"]
};

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

var waiter = {
	// whether to hide the notification on click
	clickToHide: true,
	// whether to auto-hide the notification
	autoHide: true,
	// if autoHide, hide after milliseconds
	autoHideDelay: 5000,
	// show the arrow pointing at the element
	arrowShow: false,
	// arrow size in pixels
	arrowSize: 5,
	// position defines the notification position though uses the defaults below
	position: "right",
	// default positions
	elementPosition: "right",
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
};

// $.notify.addStyle('notify_waiter', {
//   html: "<div>☺<span data-notify-text/>☺</div>",
//     classes: {
//     base: {
//       "position": "-webkit-sticky",
//       "position": "sticky",
//       "top": "0",
//       "padding": "10px",
//       "margin-left": "10%",
//       "margin-right": "40%",
//       "background-color": "lightblue"
//       }
//     }
// });


function require_io(args, script) {
	$.ajax({
		url: script,
		dataType: "script",
		success: function() {
			var socket = io("https://restaurant.mineabot.xyz");

			socket.on("assistance", function(data) {
        if (table_owner[document.getElementById("username").value].includes(data)) {
  				$.notify(`Hey I NEED HELP: ${data}`, "success", waiter);
          var notify_div = document.getElementById("notify");
          var notify_btn = document.createElement("button");
          notify_btn.setAttribute("type", "button");
          notify_btn.setAttribute("onclick", "remove_elem(this.id)");
          notify_btn.setAttribute("class", "btn btn-warning btn-block responsive-width");
          notify_btn.setAttribute("id", `note${notes++}`);
          notify_btn.innerHTML = `Hey I NEED HELP: <b>${data}</b>`;
          notify_div.appendChild(notify_btn);

  				console.log("assistance: " + data);
        }
			});

      socket.on("paid", function(data) {
  				$.notify(`Paid: ${data}`, "success", waiter);
  				console.log("paid: " + data);
			});

      socket.on("refill", function(data) {
				if (table_owner[document.getElementById("username").value].includes(data)) {
					$.notify(`Hey I NEED refill: ${data}`, "success", waiter);
	        var notify_div = document.getElementById("notify");
	        var notify_btn = document.createElement("button");
	        notify_btn.setAttribute("type", "button");
	        notify_btn.setAttribute("onclick", "remove_elem(this.id)");
	        notify_btn.setAttribute("class", "btn btn-primary btn-block responsive-width");
	        notify_btn.setAttribute("id", `note${notes++}`);
	        notify_btn.innerHTML = `Hey I NEED refill: <b>${data}</b>`;
	        notify_div.appendChild(notify_btn);
					console.log("refill: " + data);
				}
			});

      socket.on("compensate", function(data) {
					$.notify(`Compensation Needed`, "success", waiter);
	        var notify_div = document.getElementById("notify");
	        var notify_btn = document.createElement("button");
	        notify_btn.setAttribute("type", "button");
	        notify_btn.setAttribute("onclick", "remove_elem(this.id)");
	        notify_btn.setAttribute("class", "btn btn-primary btn-block responsive-width");
	        notify_btn.setAttribute("id", `note${notes++}`);
	        notify_btn.innerHTML = `Compensation Needed`;
	        notify_div.appendChild(notify_btn);
					console.log("compensation need: " + data);
			});
      socket.on("progress", function(data) {
        console.log(`progress ${data}`);

				if (table_owner[document.getElementById("username").value].includes(data.tableid)) {
					$.notify(`Order in Progress: ${data.tableid}`, "success", waiter);
	        var notify_div = document.getElementById("notify");
	        var notify_btn = document.createElement("button");
	        notify_btn.setAttribute("type", "button");
	        notify_btn.setAttribute("onclick", "remove_elem(this.id)");
	        notify_btn.setAttribute("class", "btn btn-success btn-block responsive-width");
	        notify_btn.setAttribute("id", `note${notes++}`);
	        notify_btn.innerHTML = `Order in Progress: ${data.tableid}`;
        notify_div.appendChild(notify_btn);
			}
			});

			socket.on("ready", function(data) {
        console.log(`ready ${data}`);
				if (table_owner[document.getElementById("username").value].includes(data.tableid)) {
					$.notify(`Order Ready: ${data.tableid}`, "success", waiter);
	        var notify_div = document.getElementById("notify");
	        var notify_btn = document.createElement("button");
	        notify_btn.setAttribute("type", "button");
	        notify_btn.setAttribute("onclick", "remove_elem(this.id)");
	        notify_btn.setAttribute("class", "btn btn-light btn-block responsive-width");
	        notify_btn.setAttribute("id", `note${notes++}`);
	        notify_btn.innerHTML = `Order Ready: ${data.tableid}`;
	        notify_div.appendChild(notify_btn);
        }
			});

			// This sends the "new order" notification to the waiter
			socket.on("order1", function(data) {
				$.notify(`New Order!`, "success");
        var kitchen_div = document.getElementById("kitchen");
        var parent_div = document.createElement("div");
        parent_div.setAttribute("class", "row border rounded-bottom border-info");
				var string_data = JSON.stringify( data );

        for (var key in data) {
          console.log(`${key}: ${data[key]}`);
        }
        if (Array.isArray(data.quantity) ) {
          console.log("if");
          for (var i = 0; i < data.quantity.length; i++) {
            var row_div = document.createElement("div");
            row_div.setAttribute("class", "row");
            var product_div = document.createElement("div");
            product_div.setAttribute("class", "col-4");
            var amount_div = document.createElement("div");
            amount_div.setAttribute("class", "col-4");
            var table_div = document.createElement("div");
            table_div.setAttribute("class", "col-4");
            product_div.innerHTML = data.product[i];
            amount_div.innerHTML = data.quantity[i];
            table_div.innerHTML = data.tableid;
            row_div.appendChild(product_div);
            row_div.appendChild(amount_div);
            row_div.appendChild(table_div);
            parent_div.appendChild(row_div);
          }
        }
        else {
          console.log("else");
          let row_div = document.createElement("div");
          row_div.setAttribute("class", "row");
          let product_div = document.createElement("div");
          product_div.setAttribute("class", "col-4");
          let amount_div = document.createElement("div");
          amount_div.setAttribute("class", "col-4");
          let table_div = document.createElement("div");
          table_div.setAttribute("class", "col-4");
          product_div.innerHTML = data.product;
          amount_div.innerHTML = data.quantity;
          table_div.innerHTML = data.tableid;
          row_div.appendChild(product_div);
          row_div.appendChild(amount_div);
          row_div.appendChild(table_div);
          parent_div.appendChild(row_div);
        }
        var instruction = document.createElement("div");
        instruction.setAttribute("class", "row");
        var instruction_12 = document.createElement("div");
        instruction_12.setAttribute("class", "col-12");
        instruction_12.innerHTML = `Instruction: ${data.instruction}`;
        instruction.appendChild(instruction_12);
        parent_div.appendChild(instruction);
        kitchen_div.appendChild(parent_div);

			});

			//when an order is placed the kitchen is notified
      socket.on("order", function(data) {
				$.notify(`New Order!`, "success");
        var kitchen_div = document.getElementById("kitchen");
        var parent_div = document.createElement("div");
        parent_div.setAttribute("id", `cook${cook_orders++}`);
        parent_div.setAttribute("class", "row border rounded-bottom border-info");
        var order_9_div = document.createElement("div");
        order_9_div.setAttribute("class", "col-9");
        var order_3_div = document.createElement("div");
        order_3_div.setAttribute("class", "col-3");
				var string_data = JSON.stringify( data );
				// var string_data = data;

				//buttons supplied to say working on or finished
        var order_remove = document.createElement("button");
        order_remove.setAttribute("type", "button");
        order_remove.setAttribute("onclick", `remove_elem(this.parentNode.parentNode.id, ${string_data})`);
        order_remove.setAttribute("class", "btn btn-warning btn-block responsive-width");
        order_remove.innerHTML = `Order Ready`;
				var order_in_progress = document.createElement("button");
        order_in_progress.setAttribute("type", "button");
        order_in_progress.setAttribute("onclick", `in_progress(${string_data})`);
        order_in_progress.setAttribute("class", "btn btn-warning btn-block responsive-width");
        order_in_progress.innerHTML = `Working On`;
        for (var key in data) {
          console.log(`${key}: ${data[key]}`);
        }
        if (Array.isArray(data.quantity) ) {
          console.log("if");
          for (var i = 0; i < data.quantity.length; i++) {
            var row_div = document.createElement("div");
            row_div.setAttribute("class", "row");
            var product_div = document.createElement("div");
            product_div.setAttribute("class", "col-4");
            var amount_div = document.createElement("div");
            amount_div.setAttribute("class", "col-4");
            var table_div = document.createElement("div");
            table_div.setAttribute("class", "col-4");
            product_div.innerHTML = data.product[i];
            amount_div.innerHTML = data.quantity[i];
            table_div.innerHTML = data.tableid;
            row_div.appendChild(product_div);
            row_div.appendChild(amount_div);
            row_div.appendChild(table_div);
            order_9_div.appendChild(row_div);
          }
        }
        else {
          console.log("else");
          let row_div = document.createElement("div");
          row_div.setAttribute("class", "row");
          let product_div = document.createElement("div");
          product_div.setAttribute("class", "col-4");
          let amount_div = document.createElement("div");
          amount_div.setAttribute("class", "col-4");
          let table_div = document.createElement("div");
          table_div.setAttribute("class", "col-4");
          product_div.innerHTML = data.product;
          amount_div.innerHTML = data.quantity;
          table_div.innerHTML = data.tableid;
          row_div.appendChild(product_div);
          row_div.appendChild(amount_div);
          row_div.appendChild(table_div);
          order_9_div.appendChild(row_div);
        }

				//if there is a special instruction it will be diplayed here
				order_3_div.appendChild(order_in_progress);
        order_3_div.appendChild(order_remove);
        parent_div.appendChild(order_9_div);
        parent_div.appendChild(order_3_div);
        var instruction = document.createElement("div");
        instruction.setAttribute("class", "row");
        var instruction_6 = document.createElement("div");
        instruction_6.setAttribute("class", "col-6");
        instruction_6.innerHTML = `Instruction: ${data.instruction}`;
        if (data.takeout) {
          var takeout = document.createElement("div");
          takeout.setAttribute("class", "col-6");
          takeout.innerHTML = `Takeout`;
          instruction.appendChild(takeout);
        }
        instruction.appendChild(instruction_6);
        parent_div.appendChild(instruction);
        kitchen_div.appendChild(parent_div);
        console.log(`data ${data.takeout}`);
			});

			socket.emit("location", {
				path: args
			});
			console.log(args);

		},
		error: function() {
			throw new Error("Could not load script " + script);
		}
	});
}

function remove_elem(id, data = null){
  var elem = document.getElementById(id);
	if (data) {
		order_ready(data);
	}
	return elem.parentNode.removeChild(elem);

}

function order_ready(data) {
	console.log(`order_ready: ${data}`);
	$.post("/ready",
		data,
		function(data, status){
      $.notify(`Order Ready sent: ${status}.`, "success");
		});
}

function in_progress(data) {
	console.log(`in_progress ${data}`);
	$.post("/progress",
		data,
		function(data, status){
      $.notify(`In Progess sent: ${status}.`, "success");
		});
}

var MYLIBRARY =
	MYLIBRARY ||
	(function() {
		var _args = {}; // private

		return {
			init: function(Args) {
				_args = Args;
				// some other initialising
			},
			connectSocketInit: function() {
				require_io(_args[0], "/js/vendor/socket.io.js");
			}
		};
	})();

function toggle_item(id, status) {
  var data = {
    "id": id,
    "enabled": status
    };
   $.post("/disable",
		data,
		function(data, status){
      $.notify(`disable: success.`, "success");
      location.reload();
		});

  console.log(`id: ${id}`);
}

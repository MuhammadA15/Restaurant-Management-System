## Wire Frames
[waitstaff login](https://wireframe.cc/1X0GKk)
[waitstaff interface](https://wireframe.cc/Fn3Awg)
## Class Diagram
```puml

"Login Menu" --o "Manager"
"Login Menu" --o "Wait Staff"
"Login Menu" --o "Kitchen Staff"
"Login Menu" --* "Customer"
"Manager" --* "Sales Analysis"
"Customer" o-- "2" "Games"
"Customer" --* "5" "Item Menu"
"Customer" --* "many" "Order"
"Order" --* "Payment"

"Manager" --|> "Interface"
"Wait Staff" --|> "Interface"
"Kitchen Staff" --|> "Interface"

"Login Menu" : ID
"Login Menu" : Password
"Login Menu" : login()

"Interface" : id
"Interface" : name
"Interface" : change_password()

"Manager" : remove_menu_item()
"Manager" : table_status()
"Manager" : food_status()
"Manager" : compensate_item()
"Wait Staff" : food_status()
"Kitchen Staff" : food_status()
"Kitchen Staff" : item_id
"Kitchen Staff" : order_id


"Sales Analysis" : sales_total
"Sales Analysis" : day
"Sales Analysis" : item_id
"Sales Analysis" : add()
"Sales Analysis" : delete()
"Sales Analysis" : print()

"Wait Staff" : table_status()

"Item Menu" : item_id
"Item Menu" : item_name
"Item Menu" : item_price
"Item Menu" : item_picture
"Item Menu" : add_item()
"Item Menu" : remove_item()
"Item Menu" : edit_item()

"Customer" : play_game()
"Customer" : order_food()
"Customer" : request_assistance()
"Customer" : request_refill()

"Order" : order_id
"Order" : order_items
"Order" : order_place()
"Order" : order_update()
"Order" : order_status()

"Games" : high_score
"Games" : Name
"Games" : play()

"Payment" : subtotal
"Payment" : tip_amount
"Payment" : tax
"Payment" : total
"Payment" : submit()
"Payment" : add_tip()
"Payment" : split_bill()
"Payment" : chance_game()
```
---
---
## Use Cases
Name: **Place Order**
Participating actor: Customer
Entry Condition: Customer is hungry at device
Exit Condition: Customer is notified order is placed
Event Flow:
1. Customer chooses food
1. Customer adds food to cart
1. Customer places Order
```puml
actor Customer
left to right direction
:Customer: -- (Place Order)
```
---
Name: **Pay Cash**
Participating actor: Customer, Wait_Staff
Entry Condition: Customer has cash and wants to pay
Exit Condition: Wait staff accepts payment
Event Flow:
1. Customer requests to pay Bill
1. Customer selects the cash option
1. Wait Staff arrives for payment
```puml
actor Customer
actor wait_staff
left to right direction
:Customer: -- (request_pay_cash)
:wait_staff: -- (request_pay_cash)
:wait_staff: -- (accept_cash)
```
---
Name: **Pay Credit**
Participating actor: Customer
Entry Condition: Customer has credit card and wants to pay
Exit Condition: System accepts credit payment
Event Flow:
1. Customer requests to pay Bill
1. Customer selects the credit option
1. Customer inputs credit card information
```puml
actor Customer
left to right direction
:Customer: -- (request_pay_credit)
```
---
Name: **Pay Bill**
Participating actor: Customer
Entry Condition: Customer has money and wants to pay bill
Exit Condition: Money is received
Event Flow:
1. Customer requests to pay Bill
1. Customer selects the payment options
1. Customer gives money
```puml
actor Customer
left to right direction
:Customer: -- (request_pay_bill)
```


---
---
---
master use case diagram
```puml
actor Customer
actor wait_staff
actor manager
left to right direction
:Customer: -- (Place Order)
:Customer: -- (request_pay_bill)
:Customer: -- (request_pay_cash)
:wait_staff: -- (request_pay_cash)
:wait_staff: -- (accept_cash)
:Customer: -- (request_pay_credit)
:Customer: -- (split bill)
:Customer: -- (pay cash %)
:Customer: -- (pay credit %)
:Customer: -- (play game 1)
:Customer: -- (play game 2)
:Customer: -- (request assistance)
:Customer: -- (add to order)
:Customer: -- (play chance game)
:manager: -- (ping manager)
(order status) -> (order complete)

:manager: -- (fulfill assistance request)
:manager: -- (sales Analysis)
:manager: -- (edit menu)
:manager: -- (login)
:manager: -- (comp item)
:wait_staff: -- (fulfill assistance request)
:wait_staff: -- (fulfill refill request)
:wait_staff: -- (notify payment)
:wait_staff: -- (notify order place)
:wait_staff: -- (server order)
:wait_staff: -- (order status)a
:wait_staff: -- (ping manager)

:kitchen_staff: -- (order status)
:kitchen_staff: -- (notify order place)
(order status) -> (order in progress)
```

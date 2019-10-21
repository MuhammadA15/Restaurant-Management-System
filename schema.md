### orders
```json
{
  "uid": "string",
  "total": "float",
  "invoice": {
    "split": "integer",
    "amount": "float",
    "credit_card": "integer",
    "cash": "float",
    "discount": "float",
    "tip": "float"
  },
  "paid": "boolean",
  "table": "String",
  "waiter": "username",
  "items": {
    "[food name]": "integer amount"
  }
}
```

### food
```json
{
  "uid": "string",
  "name": "string",
  "enabled": "boolean",
  "description": "string",
  "picture": "HREF string",
  "price": "float"
}
```

### login-js
```json
{
  "uid": "string",
  "username": "string",
  "password": "encrypted string",
  "group": "string"
}
```

### games
```json
{
  "uid": "string",
  "game01": {
    "highscore": "int"
  },
  "game02": {
    "highscore": "int"
  }
}
```

# Summary
old technical assessment for a Node dev role; completing for practice!

## Requirements
- accept an `order` request which includes an address and list of items. 
- calculate + return the subtotal + total based on the provided state and items. 
  - FL has a 7% tax, GA has 10%, all others should default to 0%. 
  - load item prices from the database
- follow [JSend specification](https://github.com/omniti-labs/jsend) for responses.
- utilize Express, Sequelize, Node, and any SQL Database
- gracefully reject requests which do not conform to the example request format


## Request Format
```javascript
// example input: 
{
    "address": {
        "street": "7835 Bayberry Rd",
        "city": "Jacksonville",
        "state": "AK",
        "zip": "32256"
    },
    "items": [
        {
            "id": 1,
            "quantity": 10
        },
        {
            "id": 2,
            "quantity": 5
        }
    ]
}
```

## Optional
- Unit Testing via Jest
- Ensure valid US State
- Ensure valid US Address
- Documentation via Swagger
- Host on AWS/alternative cloud provider

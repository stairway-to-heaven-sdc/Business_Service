# Business Service CRUD APIs

# GET - Retrieve Business Info
  ## /biz/:bId
  Get business details with business id. 
  ##
  ```
  /biz/7
  
  {
    "category": [
        "Korean",
        "Cupcakes"
    ],
    "photos": [
        1,
        2,
        3
    ],
    "_id": "5d2e778526f7db6d9e6e0bee",
    "bId": 7,
    "bizname": "Bucket Pioneer Castle",
    "reviewCount": 6493,
    "rating": 1.5,
    "price": "$",
    "location": {
        "address1": "14737 Rose Vista",
        "address2": "Apt. 907",
        "city": "Schinnerstad",
        "state": "MN",
        "zipcode": "71313",
        "neighborhood": "South Main",
        "latitude": -34.2028,
        "longitude": -135.7931
    },
    "phone": "(748) 989-1874",
    "url": "https://christian.net",
    "__v": 0
  }
  ```
# POST - Create new Business 
  ## /biz/:bId  
  Create a new business with business id and include biz object. 
  *Must include 'biz' object within the body.
  ##
  ```
  
  ```
# PUT - Update Business Info
  ## /biz/:bId
  Update business details with business id. 
  *Must include 'biz' object within the body.
  ##
  ```
  
  ```
# DELETE Business Info
  ## /biz/:bId
  Delete business details with business id.
  ##
  ```
  
  ```

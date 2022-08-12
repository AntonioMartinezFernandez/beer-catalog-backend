# beer-catalog-backend

Beer Catalog App (backend).

## Authentication Endpoints

### GET /auth/status

Returns authentication service status.

### POST /auth/signup

Register a new user. Returns id, email and rol of the user.

_Request Body Example:_
{
"email": "user@email.com",
"password": "User_Password"
}

### POST /auth/login

User login. Returns authorization token.

_Request Body Example:_
{
"email": "user@email.com",
"password": "User_Password"
}

### GET /auth/private

Returns user info. Only accesible with valid authorization token sended as Bearer Token on the request header.

## Beer Endpoints

### GET /api/v1/beer/status

Returns beer service status.

### GET /api/v1/beer

Returns all beers. Only accesible with valid authorization token sended as Bearer Token on the request header.

### GET /api/v1/beer/id/{:id}

Returns beer with specific id. Only accesible with valid authorization token sended as Bearer Token on the request header.

### GET /api/v1/beer/autocomplete?term={search_term}

Returns a list of beer names and ingredients that match the search term.

### GET /api/v1/beer/top_ten_ingredients

Returns the top 10 most repeated ingredients.

### GET /api/v1/beer/search?term={search_term}

Returns beers with the search term included in their name or ingredients. Only accesible with valid authorization token sended as Bearer Token on the request header.

### GET /api/v1/beer/searches

Returns searches. Only accesible with valid authorization token sended as Bearer Token on the request header.

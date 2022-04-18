# wild-auth-zn
Authentication API developed using Nodejs.

## Run locally:

    npm start

## API:




##### `api/ping`: 
* **GET** Check if the service is alive and running: 
     
        $ curl -H 'Authorization: Bearer <token got from login> localhost:3000/api/ping 


##### `api/login`:

* **POST** login: 

        $ curl -X POST \ 
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer <token got from login>' \
        -d '{"username":"cafone", "password":"password"}' \
        localhost:3000/api/login


##### `api/user`:
* **GET** all users: 

        $ curl -H 'Authorization: Bearer <token got from login>' localhost:3000/api/user 

* **POST** a new user: 

        $ curl -X POST \ 
        -H "Content-Type: application/json" \
        -H 'Authorization: Bearer <token got from login>' \
        -d '{"username":"cafone", "firstName":"Hans", "lastName":"Von Hammein",  "password":"password", "role":"User"}' \
        localhost:3000/api/user`

##### `api/user/:id`:
* **GET** user by id:
    
        $ curl -H 'Authorization: Bearer <token got from login>' localhost:3000/api/user/1 


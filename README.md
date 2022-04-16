# wild-auth-zn
Authentication API developed using Nodejs.

## Run locally:

    npm start

## API:

##### `api/login`:

* **POST** login: 

        $ curl -X POST \ 
        -H "Content-Type: application/json" \
        -d '{"username":"cafone", "password":"password"}' \
        localhost:3000/api/user


##### `api/ping`: 
* **GET** Check if the service is alive and running: 
     
        $ curl localhost:3000/api/ping 

##### `api/user`:
* **GET** all users: 

        $ curl localhost:3000/api/user 

* **POST** a new user: 

        $ curl -X POST \ 
        -H "Content-Type:
        application/json" \
        -d '{"username":"cafone", "firstName":"Hans", "lastName":"Von Hammein",  "password":"password", "role":"User"}' \
        localhost:3000/api/user`

##### `api/user/:id`:
* **GET** user by id:
    
        $ curl localhost:3000/api/user/1 


# wild-auth-zn
Authentication API developed using Nodejs.



## Run locally:

To deploy the application locally just run:

```bash
$ npm start
```

check if the application is running:

```bash
$ curl localhost:3000/api/ping 
```

run tests:

```bash
$ npm test
```



## API:


##### `api/ping`: 

* **GET** Check if the service is alive and running: 
  
    ```bash
    $ curl localhost:3000/api/ping 
    ```


##### `api/login`:

* **POST** login: 

    ```bash
    $ curl -X POST \ 
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <token got from login>' \
    -d '{"username":"cafone", "password":"password"}' \
    localhost:3000/api/login
    ```


##### `api/user`:

* **GET** all users: 

    ```bash
    $ curl -H 'Authorization: Bearer <token got from login>' localhost:3000/api/user 
    ```

* **POST** a new user: 

    ```bash
    $ curl -X POST \ 
    -H "Content-Type: application/json" \
    -H 'Authorization: Bearer <token got from login>' \
    -d '{"username":"cafone", "firstName":"Hans", "lastName":"Von Hammein",  "password":"password", "role":"User"}' \
    localhost:3000/api/user`
    ```

##### `api/user/:id`:

* **GET** user by id:
  
    ```bash
    $ curl -H 'Authorization: Bearer <token got from login>' localhost:3000/api/user/1 
    ```


##### `api/user/:id/updaterole/:role`:

* **PATCH**: update role on a user. Possible roles are Superadmin, Admin, User:
  
      $ curl -X PATCH \ 
        -H 'Authorization: Bearer <token got from login>' \
        localhost:3000/api/user/1/updaterole/Admin



### Ease debugging with postman

1. Create a new environment with a variable called 'Token'

2. Make sure all your requests are under that environment

3. Add login request and under the 'test' tab paste the following:

        postman.setEnvironmentVariable("Token", JSON.parse(responseBody).Bearer)

4. For the requests that requires authorization, under the 'authorization' tab, chose Type: bearer token add write '{{Token}}'.

5. For now on, when the login requested completes, the token is already stored for the other requests.




## Implementation

Implement a simple authentication module, which implements a basic [Role-Based Access Control](https://en.wikipedia.org/wiki/Role-based_access_control).



### Packages

This projects implementation follows the [hexagonal architecture architectural pattern](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).

* *core*: where the BL resides.
* *adapter*: handling of the logic to communicate with the outside.
	* *controller*: handling incoming requests
	* *database*: dao + repo to handle the comunication to the DB


### Access control

Super simple schema:
 * 3 Roles: Superadmin -> Admin -> User.
 * User can only read its own businesses.
 * Admin can read anybody businesses.
 * Superadmin can read and update whatever he likes.

Implemented using [npm - accesscontrol](https://www.npmjs.com/package/accesscontrol).




# TODO

- [ ] Change password procedure.
- [ ] Logout.
- [ ] Remove all permission at once.
- [ ] Add real db.
- [ ] Implements inbound adapters.
- [ ] Validation layer.
- [ ] Dockerize. 





# References and bibliography

* [ Jwt.io ](https://jwt.io/)
* [ Using middleware - Express ](https://expressjs.com/en/guide/using-middleware.html)
* [ Node tap ](https://node-tap.org/docs/api/asserts/)
* [ Implementing Role-Based Access Control in a Node.js application - Godson Obielum ](https://soshace.com/implementing-role-based-access-control-in-a-node-js-application/)
* [ Node.js - Role Based Authorization Tutorial with Example API - Jason Watmore ](https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api#role-js)
* [ Building a REST API with Node and Express - David Landup](https://stackabuse.com/building-a-rest-api-with-node-and-express/)
* [ Random useful answer - Stackoverflow ](https://stackoverflow.com/a/66337284/9917664)
* [ Paper I started reading but never finished ](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=905425)
* [ I did ask myself the same question ](https://github.com/tapjs/node-tap/issues/216)

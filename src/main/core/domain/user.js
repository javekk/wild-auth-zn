class User{
    constructor(id, username, password, firstName, lastName, role) {
        this.id = id;
        this.username = username;
        this.password = password
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role
    }
}

module.exports = {
    User
}
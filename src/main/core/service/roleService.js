const AccessControl = require("accesscontrol");
const ac = new AccessControl();


const getAccessControl = () => {
    ac.grant("User")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("Admin")
        .extend("User")
        .readAny("profile")

    ac.grant("Superadmin")
        .extend("User")
        .extend("Admin")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
};

module.exports = {
    getAccessControl
};
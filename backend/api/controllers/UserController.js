/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function (req, res) {
        console.log("About to respond with the world hello!");
        res.send('Hello!!!');
        console.log("Done responding!!");
    }
};


//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/profile");
  });

<<<<<<< HEAD
  app.post("/api/signup", function (req, res) {
=======




app.post("/api/signup", function(req, res) {
>>>>>>> f66b33f4b6a3b2ec7f477970d9fcd4a80fc2226e
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }).then(function () {
      console.log("redirect");
<<<<<<< HEAD
      res.redirect(307, "/profile");
    }).catch(function (err) {
=======
      res.json("/login");
    }).catch(function(err) {
>>>>>>> f66b33f4b6a3b2ec7f477970d9fcd4a80fc2226e
      console.log(err);
      res.json(err);

    });
  });

<<<<<<< HEAD
  app.get("/api/user", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log('fail')
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log('pass')
      res.json({
        email: req.user.email,
      });
    }
  });
=======

  app.get("/api/user", function(req,res){
    if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
var user = req.user
    res.json({
      email: user.email,
      name: user.firstName + " " + user.lastName,
      address: user.address + " " + user.city + " " + user.state + " " + user.zip
    });
  }});







>>>>>>> f66b33f4b6a3b2ec7f477970d9fcd4a80fc2226e

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // apiRoute to handle search
  app.get("/search/:id", function (req, res) {

    db.Book.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { authors: { [db.Sequelize.Op.like]: '%' + req.params.id + '%' } },
          { title: { [db.Sequelize.Op.like]: '%' + req.params.id + '%' } },
        ]
      }
    }).then(function (dbBook) {
      res.json(dbBook);
      //console.log(dbBook);
    }).catch(function (err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // update qty in book table
<<<<<<< HEAD
  app.put("/updateQty/:book_id", function (req, res) {
=======
  app.put("/updateQty/:book_id", function(req, res) {
>>>>>>> f66b33f4b6a3b2ec7f477970d9fcd4a80fc2226e

    db.Book.update({
      qty_on_hand: req.body.new_qty_on_hand,
      qty_checked_out: req.body.new_qty_checkedout
    }, {
      where: {
        book_id: req.body.book_id
      }
    }).then(function (dbBook) {
      res.json(dbBook);
     // console.log(dbBook);
    }).catch(function (err) {
      res.json(err);
    });
  });

  app.post("/api/checkout", function (req, res) {
    db.Checkout.create({
      userId: req.body.userId,
      bookId: req.body.bookId,
      checkout_on: req.body.checkout_on,
      return_by_date: req.body.return_by_date,
      return_on: null
    }).then(function (dbCheckout) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbCheckout);
    }).catch(function (err) {
      res.json(err);
    });
  });

<<<<<<< HEAD
  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
=======
  app.delete("/api/user/delete/:email", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.User.destroy({
      where: {
        email: req.params.email
      }
    }).then(function(dbUser) {
      res.json("/");
>>>>>>> f66b33f4b6a3b2ec7f477970d9fcd4a80fc2226e
    });
  });
}

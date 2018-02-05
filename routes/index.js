var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");



var nameSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});

var User = mongoose.model('User', nameSchema);

/* GET home page. */
router.get('/', function(req, res ,next) {
  res.render('index', { title: 'Express' });
});

router.post('/',function(req,res,next){




   var person = new User({ firstName: req.body.firstname, lastName: req.body.lastname});

 person.save();

    res.render('formsubmit', { title: 'Express' });


});

router.get('/showusers',function(req,res,next) {

    User.find({}, function (err, users) {
        console.log(err, users)
        res.render("list", {users: users})


    });

})


router.post("/delete", function(req,res,next) {

    User.remove({_id: req.body._id}, function (err) {
        if (err) {
            console.log(err)
            res.redirect("/showusers")
        }
    })

});


module.exports = router;

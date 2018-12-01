const express = require('express');
const router = express.Router();

let Linkup = require('../models/linkup');

// User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res) {
  res.render('add_linkup', {
    title: 'Add Linkup'
  });
});

router.post('/add', (req,res)=>{
  req.checkBody('title','Title is required').notEmpty();
  // req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
      res.render('add_linkup', {
        title: 'Add Linkup',
        errors:errors
      });
  } else {

    let linkup = new Linkup();
    linkup.title = req.body.title;
    linkup.author = req.user._id;
    linkup.body = req.body.body;

    linkup.save(function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash('success','Linkup Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Linkup.findById(req.params.id, function(err, linkup){
    if(linkup.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_linkup', {
      title:'Edit Linkup',
      linkup:linkup
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res) {
  let linkup = {};
  linkup.title = req.body.title;
  linkup.author = req.body.author;
  linkup.body = req.body.body;

  let query = {_id:req.params.id}

  Linkup.update(query, linkup, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash('success','Linkup Updated');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Linkup.findById(req.params.id, function(err, linkup){
    if(linkup.author != req.user._id){
      res.status(500).send();
    } else {
      Linkup.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});


// Get Single Article
router.get('/:id', function(req, res){
  Linkup.findById(req.params.id, function(err, linkup){
    User.findById(linkup.author, function(err, user){
      res.render('linkup', {
        linkup: linkup,
        author: user.name
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;

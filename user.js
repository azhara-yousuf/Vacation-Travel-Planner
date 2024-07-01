const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Admin = require('../models/Admin');

router.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        contactno: req.body.contactno,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (user) {
                res.status(200).json('login successful.');
            } else {
                res.status(400).json('Invalid email or password.');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/alogin', (req, res) => {
    Admin.findOne({ aid: req.body.aid, password: req.body.password })
        .then(user => {
            if (user) {
                res.status(200).json('login successful.');
            } else {
                res.status(400).json('Invalid email or password.');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getUserDetails', (req, res) => {
    const email = req.query.email;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json('User not found.');
            }
        })
        .catch(err => res.status(500).json('Error retrieving user profile.'));
});



router.put('/updateProfile/:email', (req, res) => {
    const { name, contactno } = req.body;
    const email = req.params.email;
    User.findOneAndUpdate({ email: email }, { name: name, contactno: contactno }, { new: true })
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json('User not found.');
            }
        })
        .catch(err => res.status(500).json('Error updating user profile.'));
});

router.delete('/deleteAccount/:email', (req, res) => {
    const email = req.params.email;
    User.findOneAndDelete({ email: email })
        .then(deletedUser => {
            console.log("DDDDD"+deletedUser);
            if (deletedUser) {
                res.status(200).json('User deleted successfully.');
            } else {
                res.status(404).json('User not found.');
            }
        })
        .catch(err => res.status(500).json('Error deleting user account.'));
});


router.get('/hotel', (req, res) => {
    const hotelId = req.params.id;

    Hotel.findById(hotelId)
        .then(hotel => {
            if (hotel) {
                res.status(200).json(hotel);
            } else {
                res.status(404).json('Hotel not found.');
            }
        })
        .catch(err => res.status(500).json('Error retrieving hotel details.'));
});

router.get('/getHotelDetails', (req, res) => {
    const hotelId = req.params.id;

    Hotel.findById(hotelId)
        .then(hotel => {
            if (hotel) {
                res.status(200).json(hotel);
            } else {
                res.status(404).json('Hotel not found.');
            }
        })
        .catch(err => res.status(500).json('Error retrieving hotel details.'));
});



module.exports = router;
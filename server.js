const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv').config();
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
const multer = require('multer');

mongoose.connect('mongodb://localhost:27017/VacationPlanner');

const User = mongoose.model('User', {
  name: String,
  contactno: String,
  email: String,
  password: String
});

const Hotel = require('./models/Hotel');
const Admin = require('./models/Admin'); 
const Package = require('./models/Package');
const Train = require('./models/Train');
const HotelB = require('./models/HotelB');
const Flight = require('./models/Flight');

app.get('/hotel', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving hotel details.');
  }
});

app.get('/checkEmailAvailability', async (req, res) => {
  const email = req.query.email;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.json({ available: false }); 
    } else {
      res.json({ available: true }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error checking email availability.');
  }
});

app.post('/register', async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      contactno: req.body.contactno,
      email: req.body.email,
      password: req.body.password });

      const { name, contactno, email, password } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).send('Email is already registered.');
      }   
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('User not found.');
  }
  if (password!=user.password) {
    
    return res.status(401).send('Invalid password.');
  }
  res.json('Login successful.');
});

app.post('/alogin', async (req, res) => {
  const { aid, password } = req.body;
  const user = await Admin.findOne({ aid });
  if (!user) {
    return res.status(404).send('User not found.');
  }
  if (password!=user.password) {
    
    return res.status(401).send('Invalid password.');
  }
  res.json('Login successful.');
});

app.get('/getUserDetails', async (req, res) => {
  const email = req.query.email;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user profile.');
  }
});

app.put('/updateHotelDetails/:_id', async (req, res) => {
  const { name,features,desc,location,rating,price,roomcount,img,img1,img2,img3 } = req.body;
  const _id = req.params._id;
  try {
    const updatedUser = await Hotel.findOneAndUpdate({ _id: _id }, { 
      name: name, 
      features: features, 
      desc: desc, 
      location: location, 
      rating: rating, 
      price: price, 
      roomcount: roomcount, 
      img: {
        data: img.data,
        contentType: img.contentType
      },
      img1: {
        data: img1.data,
        contentType: img1.contentType
      },
      img2: {
        data: img2.data,
        contentType: img2.contentType
      },
      img3: {
        data: img3.data,
        contentType: img3.contentType
      }
    }, { new: true });
    if (!updatedUser) {
      return res.status(404).send('Hotel not found.');
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating hotel details.');
  }
});

app.put('/updateProfile/:email', async (req, res) => {
  const { name, contactno } = req.body;
  const email = req.params.email;

  try {
    const updatedUser = await User.findOneAndUpdate({ email: email }, { name: name, contactno: contactno }, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found.');
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user profile.');
  }
});

app.delete('/deleteAccount/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      return res.status(404).send('User not found.');
    }
    res.json('User deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user account.');
  }
});

app.get('/hotel/:id', async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).send('Hotel not found.');
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving hotel details.');
  }
});


app.get('/getHotelDetails', async (req, res) => {
  const hid = req.query.id;

  try {
    const hotel = await Hotel.findOne({ _id: hid });
    if (!hotel) {
      return res.status(404).send('User not found.');
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user profile.');
  }
});

app.put('/addHotelDetails', async (req, res) => {
  const { name, features, desc, location, rating, price, roomcount, img, img1, img2, img3 } = req.body;

  try {
    const newHotel = new Hotel({
      name: name,
      features: features,
      desc: desc,
      location: location,
      rating: rating,
      price: price,
      roomcount: roomcount,
      img: {
        data: img.data,
        contentType: img.contentType
      },
      img1: {
        data: img1.data,
        contentType: img1.contentType
      },
      img2: {
        data: img2.data,
        contentType: img2.contentType
      },
      img3: {
        data: img3.data,
        contentType: img3.contentType
      }
    });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding hotel details.');
  }
});

app.delete('/deleteHotel/:hname', async (req, res) => {
  const hname = req.params.hname;
  try {
    const deletedHotel = await Hotel.findOneAndDelete({ name: hname });
    if (!deletedHotel) {
      return res.status(404).send('Hotel not found.');
    }
    res.json('Hotel deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting hotel details.');
  }
});

app.put('/bookRoom', (req, res) => {
  const { hname, roomsBooked } = req.body;
  Hotel.findOneAndUpdate({ name: hname }, { $inc: { roomcount: -roomsBooked } }, { new: true })
    .then(updatedHotel => {
      if (!updatedHotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      res.status(200).json({ message: 'Room booked successfully' });
    })
    .catch(err => {
      console.error('Error updating room count:', err);
      res.status(500).json({ error: 'Failed to book room' });
    });
});


app.put('/addPackageDetails', async (req, res) => {
  const { name, from, to, days, nights, limit, highlights, desc, start, rating, price,dayplans , inc, exc, img, img1, img2, img3, img4, img5, img6, img7, img8 } = req.body;
  
  try {
    const newPackage = new Package({
      name: name,
      from: from,
      to:to,
      days:days,
      nights:nights,
      limit:limit,
      highlights: highlights,
      desc: desc,
      start:start,
      rating: rating,
      price: price,
      dayplans:dayplans,
      inc:inc,
      exc:exc,
      img: {
        data: img.data,
        contentType: img.contentType
      },
      img1: {
        data: img1.data,
        contentType: img1.contentType
      },
      img2: {
        data: img2.data,
        contentType: img2.contentType
      },
      img3: {
        data: img3.data,
        contentType: img3.contentType
      },
      img4: {
        data: img4.data,
        contentType: img4.contentType
      },
      img5: {
        data: img5.data,
        contentType: img5.contentType
      },
      img6: {
        data: img6.data,
        contentType: img6.contentType
      },
      img7: {
        data: img7.data,
        contentType: img7.contentType
      },
      img8: {
        data: img8.data,
        contentType: img8.contentType
      }
    });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding package details.');
  }
});

app.get('/package', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving Package details.');
  }
});


app.put('/updatePackageDetails/:_id', async (req, res) => {
  const { name, from, to, days, nights, limit, highlights, desc, start, rating, price,dayplans , inc, exc, img, img1, img2, img3, img4, img5, img6, img7, img8 } = req.body;
  const id = req.params._id;
  try {
    const updatedPackage = await Package.findOneAndUpdate({ _id: id }, {
      name: name,
      from: from,
      to:to,
      days:days,
      nights:nights,
      limit:limit,
      highlights: highlights,
      desc: desc,
      start:start,
      rating: rating,
      price: price,
      dayplans:dayplans,
      inc:inc,
      exc:exc,
      img: {
        data: img.data,
        contentType: img.contentType
      },
      img1: {
        data: img1.data,
        contentType: img1.contentType
      },
      img2: {
        data: img2.data,
        contentType: img2.contentType
      },
      img3: {
        data: img3.data,
        contentType: img3.contentType
      },
      img4: {
        data: img4.data,
        contentType: img4.contentType
      },
      img5: {
        data: img5.data,
        contentType: img5.contentType
      },
      img6: {
        data: img6.data,
        contentType: img6.contentType
      },
      img7: {
        data: img7.data,
        contentType: img7.contentType
      },
      img8: {
        data: img8.data,
        contentType: img8.contentType
      }
    }, { new: true });
    if (!updatedPackage) {
      return res.status(404).send('Package not found.');
    }
    res.json(updatedPackage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating package details.');
  }
});

app.delete('/deletePackage/:pname', async (req, res) => {
  const pname = req.params.pname;
  try {
    const deletedPackage = await Package.findOneAndDelete({ name: pname });
    if (!deletedPackage) {
      return res.status(404).send('Package not found.');
    }
    res.json('Package deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting package details.');
  }
});


app.put('/addTrainDetails', async (req, res) => {
  const { tnum, name,seats, dept, arr, hour, price } = req.body;

  try {
    const newTrain = new Train({
      tnum : tnum,
      name: name,
      seats : seats,
      dept: dept,
      arr: arr,
      hour: hour,
      price: price
    });
    await newTrain.save();
    res.status(201).json(newTrain);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding train details.');
  }
});

app.get('/train', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving train details.');
  }
});

app.put('/updateTrainDetails/:_id', async (req, res) => {
  const { tnum, name,seats, dept, arr, hour, price } = req.body;
  const id = req.params._id;
  try {
    const updatedTrain = await Train.findOneAndUpdate({ _id: id },{
      tnum : tnum,
      name: name,
      seats : seats,
      dept: dept,
      arr: arr,
      hour: hour,
      price: price
    },{ new: true });
    if (!updatedTrain) {
      return res.status(404).send('Train not found.');
    }
    res.json(updatedTrain);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating train details.');
  }
});


app.delete('/deleteTrain/:_id', async (req, res) => {
  const id = req.params._id;
  try {
    const deletedTrain = await Train.findOneAndDelete({ _id: id});
    if (!deletedTrain) {
      return res.status(404).send('Train not found.');
    }
    res.json('Train deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deletingtrain details.');
  }
});


app.get('/hotelb', async (req, res) => {
  try {
    const hotelbs = await HotelB.find();
    res.json(hotelbs); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving hotel booking details.');
  }
});

app.put('/addbookRooms', async (req, res) => {
  const { mail,rb,cin,cout,name,price,location } = req.body;
  try {
    const newHotelb = new HotelB({
      mail : mail,
      name: name,
      rb : rb,
      cin : cin,
      cout : cout,
      location:location,
      price: price
    });
    await newHotelb.save();
    res.status(201).json(newHotelb);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding train details.');
  }
});

app.get('/getTrainDetails', async (req, res) => {
  const tid = req.query.id;

  try {
    const train = await Train.findOne({ _id: tid });
    if (!train) {
      return res.status(404).send('User not found.');
    }
    res.json(train);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving train details.');
  }
});

app.put('/addFlightDetails', async (req, res) => {
  const { num, name, code,dept,arr,hour,price,seats,img } = req.body;

  try {
    const newFlight = new Flight({
      num : num,
      name: name,
      code: code,
      dept:dept,
      arr:arr,
      seats : seats,
      hour: hour,
      price: price,
      img:img
    });
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding flight details.');
  }
});

app.get('/flight', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving flight details.');
  }
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
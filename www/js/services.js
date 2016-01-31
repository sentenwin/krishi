'use strict';
angular.module('starter.services', [])

.factory('AuthService', function(DataService) {
  // Might use a resource here that returns a JSON array

  var offers = [
    { title: 'BigBazzer', id: 1, img: 'bigbazzer.jpg'},
    { title: 'PizzaHut', id: 2, img: 'pizza-hut.jpg' },
    { title: 'MakeMyTrip', id: 3, img: 'make_my_trip.jpg' },
    { title: 'FoodPanda', id: 4, img: 'foodpanda.jpg' },
    { title: 'Coffee Day', id: 5, img: 'cafe-coffee.jpg' },
    { title: 'Redbus', id: 6, img: 'redbus.jpg' }
  ];
  

  return {
    loginAuth: function(authData) {
      var userObj = {};
      console.log("Hi i am in loginAuth");
      console.log(authData);
      console.log(DataService.getAllUsers());
      userObj = DataService.getUserByPhone(authData.phone);
      console.log(userObj);
      if (userObj != null) {
        if (userObj.password === authData.password) {
            console.log("valid user");
            console.log(userObj);
            return userObj;
        }
      } else {
        console.log("Invalid login");
        return null;
      }    
      
    },  
    signupAuth: function(authData) {
      console.log("Hi i am in signupAuth");
      console.log(authData);
      DataService.createUsers(authData);
      return true;
    },    
    forgotPassword: function(authData) {
      console.log("Hi i am in forgotPassword");
      console.log(authData);
      var userObj = {};
      userObj = DataService.getUserByPhone(authData.phone);
      console.log(userObj);
      if (userObj != null) {
            console.log(userObj);
            return userObj;
      } else {
        console.log("Invalid Mobile");
        return null;
      }       
    }
  };
})


.factory('DataService', function() {
  // Might use a resource here that returns a JSON array

  var userData = [
    { username: 'aaa@gmail.com', id: 1, phone: '9876543210', name: 'Senthil-alpha', password: 'asdfghjkl', img: 'avatar.png'},
    { username: 'bbb@gmail.com', id: 2, phone: '9876543210', name: 'Senthil-beta', password: 'asdfghjkl', img: 'avatar.png' },
    { username: 'ccc@gmail.com', id: 3, phone: '9876543210', name: 'Senthil-gamma', password: 'asdfghjkl', img: 'avatar.png' },
    { username: 'ddd@gmail.com', id: 4, phone: '9876543210', name: 'Senthil-theta', password: 'asdfghjkl', img: 'avatar.png' },
    { username: 'eee@gmail.com', id: 5, phone: '9876543210', name: 'Senthil-omega', password: 'asdfghjkl',img: 'avatar.png' },
    { username: 'fff@gmail.com', id: 6, phone: '9876543210', name: 'Senthil-pi', password: 'asdfghjkl', img: 'avatar.png' }
  ];
      var CityInfo = {
          city:       'Bangalore',
          latitude:   53.0905,
          longitude:  -8.2337 ,
          current: "cloudy",
          temperature: "26.4",
          forecast: "Mostly cloudy no rain for next few days"};
     var scheme = {
          title:       'Farmswiss',
          description: 'High reliable insurence scheme for farmer',
          img:   'img/Farmer_02.jpg',
          premium: "Rs. 950 per month"};

var cropDetails = [
    { title: 'Rice', id: 1, img:'img/Rice.jpg', description:'Rice is the most important food crop of India covering about one-fourth of the total cropped area and providing food to about half of the Indian population.', condition: 'Rice is grown under varying conditions in India from 8° to 25° N latitude and from sea level to about 2,500 metre altitude. It is a tropical plant and requires high heat and high humidity for its successful growth. The temperature should be fairly high at mean monthly of 24°C. It should be 20°- 22°C at the time of sowing, 23°-25°C during growth and 25°-30°C at the harvesting time. The average annual rainfall required by rice is 150 cm.' },
    { title: 'Maize', id: 2, img:'img/Maize.jpg', description:'Maize is one of the most versatile emerging crops having wider adaptability under varied agro-climatic conditions. Globally, maize is known as queen of cereals because it has the highest genetic yield potential among the cereals. It is cultivated on nearly 150 m ha in about 160 countries having wider diversity of soil, climate, biodiversity and management practices that contributes 36 % (782 m t) in the global grain production. The United States of America (USA) is the largest producer of maize contributes nearly 35 % of the total production in the world and maize is the driver of the US economy. The USA has the highest productivity (> 9.6 t ha-1 ) which is double than the global average (4.92 t ha-1). Whereas, the average productivity in India is 2.43 t ha-1', condition: 'Maize can be grown successfully in variety of soils ranging from loamy sand to clay loam. However, soils with good organic matter content having high water holding capacity with neutral pH are considered good for higher productivity. Being a sensitive crop to moisture stress particularly excess soil moisture and salinity stresses; it is desirable to avoid low lying fields having poor drainage and also the field having higher salinity. Therefore, the fields having provision of proper drainage should be selected for cultivation of maize.'  },
    { title: 'Soybean', id: 3, img:'img/Soybean.jpg' , description:'Soybean as the golden bean or the miracle bean, the western world provided a massive push to its growth during the early part of the century. The crop, in fact, has revolutionized the agricultural economy of the USA, with its immense potential for food, feed and numerous industrial products. At present, the USA, Brazil and China are the Big-3 in soybean production, with the USA enjoying hegemony. The USA now has over 50 percent of total soybean area in the world, producing over 50 percent of the worlds soybeans', condition: 'It usually takes 15 - 18 months to grow and mature. In addition, it requires ideal temparature and moisture levels for steady growth and maturity.'  },
    { title: 'SugarCane', id: 4, img:'img/SugarCane.jpg' , description:'Sugarcane belongs to bamboo family of plants and is indigenous to India. It is the main source of sugar, gur and khandsari. About two-thirds of the total sugarcane produced in India is consumed for making gur and khandsari and only one third of it goes to sugar factories. It also provides raw material for manufacturing alcohol.', condition: 'It is a long duration crop and requires 10 to 15 and even 18 months to mature, depending upon the geographical conditions. It requires hot and humid climate with average temperature of 21°-27°C and 75-150 cm rainfall.'  },
    { title: 'Tea', id: 5, img:'img/Tea.jpg' , description:'Tea is the dried leaf of a bush. It contains theine and when added to boiling water along with sugar and milk, it gives a very cheap and stimulating drink. Thus it is the most important beverage crop of India.', condition: 'Tea bush is a tropical and sub-tropical plant and thrives well in hot and humid climate. There is a very close relation between climate, the yield and the quality of tea. The ideal temperature for its growth is 20°-30°C and temperatures above 35°C and below 10°C are harmful for the bush.' },
    { title: 'wheat', id: 6, img:'img/wheat_1.jpg', description:'Wheat is the main cereal crop in India. The total area under the crop is about 29.8 million hectares in the country. The production of wheat in the country has increased significantly from 75.81 million MT in 2006-07 to an all time record high of 94.88 million MT in 2011-12. The productivity of wheat which was 2602 kg/hectare in 2004-05 has increased to 3140 kg/hectare in 2011-12. The major increase in the productivity of wheat has been observed in the states of Haryana, Punjab and Uttar Pradesh. Higher area coverage is reported from MP in recent years.', condition: 'Wheat crop has wide adaptability. It can be grown not only in the tropical and sub-tropical zones, but also in the temperate zone and the cold tracts of the far north ,beyond even the 60 degree north altitude . Wheat can tolerate severe cold and snow and resume growth with the setting in of warm weather in spring .It can be cultivated from sea level to as high as 3300 meters.'  }
  ];

  // Private Functions
    function getUsersDB() {
        console.log("connecting to DB:Get");
        if(!localStorage.getItem('usersDB')){
            //window.localStorage['usersDB', JSON.stringify([])];
            localStorage.setItem('usersDB', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('usersDB'));
        //return JSON.parse(window.localStorage['usersDB']);
    }

    function setUsersDB(users) {
         console.log("connecting to DB:Set");

         localStorage.setItem('usersDB', JSON.stringify(users));
         //window.localStorage['usersDB', JSON.stringify(users)];
    }
  // Private Functions
    function getPaymentDB() {
        console.log("connecting to PaymentDB:Get");
        if(!localStorage.getItem('paymentDB')){
            //window.localStorage['usersDB', JSON.stringify([])];
            localStorage.setItem('paymentDB', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('paymentDB'));
        //return JSON.parse(window.localStorage['usersDB']);
    }

    function setPaymentDB(payment) {
         console.log("connecting to PaymentDB:Set");

         localStorage.setItem('paymentDB', JSON.stringify(payment));
         //window.localStorage['usersDB', JSON.stringify(users)];
    }
  return {
    all: function() {
      return chats;
    },
    getAllUsers: function() {
      return getUsersDB();
    }, 
    getUserByUsername: function(username) {
      var userData = getUsersDB();
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].username == username) {
          return userData[i];
        }
      }
      return null;
    }, 
    getUserByPhone: function(phone) {
      var userData = getUsersDB();
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].phone == phone) {
          return userData[i];
        }
      }
      return null;
    },     
    createUsers: function(user) {
      var users = getUsersDB();
      if (users == null || users == undefined) {
        user.id = 0;
      } else {
        user.id = users.length;
      }
       
      users.push(user);
      setUsersDB(users);
      console.log("Testing localstorage");
      console.log(getUsersDB());
    },  
    updateUsers: function(user) {
      var users = getUsersDB();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(user.id)) {
          users[i].username = user.username;
          users[i].phone = user.phone;
          users[i].name = user.name;
          users[i].password = user.password;
          users[i].img = user.img;
          setUsersDB(users);
          console.log(users[i]);
        }
      }           
      console.log("Update function");
      console.log(getUsersDB());
    },  

    getCity: function() {
      return CityInfo;
    },

    getCropDetails: function() {
      return cropDetails;
    },
    getSchemeDetails:function() {
      return scheme;
    },

    getCropById: function(id) {
      console.log("Inside cropbyid received ", id, cropDetails.length );
      for (var i = 0; i < cropDetails.length; i++) {
        if (cropDetails[i].id === parseInt(id.cropId)) {
          console.log(cropDetails[i]);
          return cropDetails[i];
        }
      } 
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
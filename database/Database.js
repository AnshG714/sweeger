var firebase = require('firebase')

// Hashing function from: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

var default_prefs = {
	"content": "none",
	"notifications": "weekly"
};

const app = firebase.initializeApp({
    apiKey: "AIzaSyAI7gfqvFEDAYBDa8mIiDR73eVFoe8cmsg",
    authDomain: "sweeger.firebaseapp.com",
    databaseURL: "https://sweeger.firebaseio.com",
    projectId: "sweeger",
    storageBucket: "sweeger.appspot.com",
    messagingSenderId: "223663699687",
    appId: "1:223663699687:web:f3324c2b8d1a232c24d442",
    measurementId: "G-GGX6QKC1BL"
  
});

var database = app.database();

function add_new_user(email, prefs=default_prefs) {
	var hash = email.hashCode();
	// Add to list of users
	database.ref('/users/').update({
		[hash]: email
	});
	
	// Create entry in prefs
	database.ref('/prefs/' + hash).set(prefs)
}
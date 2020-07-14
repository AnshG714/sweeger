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
	"notifs": "weekly"
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

function update_prefs(email, new_prefs) {
	var hash = email.hashCode();
	
	// Update prefs
	database.ref('/prefs/' + hash).update(new_prefs);
}

// Returns a Promise
// The return value of the promise is a dictionary with the prefs
function get_prefs(email) {
	var hash = email.hashCode();
	
	return database.ref('/prefs/' + hash).once('value').then(function(snapshot) {
		return {
			"content": (snapshot.val() && snapshot.val().content) || 'none',
			"notifs": (snapshot.val() && snapshot.val().notifs) || 'none'
		}
	});
}

/*
new_prefs = {
	"content": "C++",
	"notifs": "monthly"
}

add_new_user("random@random.com")
get_prefs("random@random.com").then(function(prefs) {
	console.log("Your content: " + prefs['content']);
	console.log("Your notifs: " + prefs['notifs']);
});
update_prefs("random@random.com", new_prefs)
get_prefs("random@random.com").then(function(prefs) {
	console.log("Your content: " + prefs['content']);
	console.log("Your notifs: " + prefs['notifs']);
});*/
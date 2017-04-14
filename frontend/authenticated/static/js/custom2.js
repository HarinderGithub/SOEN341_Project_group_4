/*function showCloudilly() {
    window.cloudilly= new Cloudilly();
    cloudilly.initialize("SOEN341", "73ef8dcf-26c6-4b98-b130-3b5976b3128e", function() {
        cloudilly.connect();	
    });

    cloudilly.socketConnected(function(err, res) {
        
        console.log("@@@@@@ CONNECTED");
        console.log(res); 
    });

    cloudilly.socketDisconnected(function() {
        console.log("@@@@@@ CLOSED");
    });

    cloudilly.socketReceivedDevice(function(res) {
        console.log("@@@@@@ RECEIVED DEVICE");
        console.log(res);
    });

    cloudilly.socketReceivedPost(function(res) {
        console.log("@@@@@@ RECEIVED POST");
        console.log(res);
    });
};
*/
var app= "E-learning Website";
var access= "3ea26fef-2c4c-4340-b87e-3dfaea21dc58";

window.onload= function() {
	window.cloudilly= new Cloudilly();
	var chatbox= document.getElementById("chatbox");

	cloudilly.initialize(app, access, function() {
		chatbox.innerHTML= chatbox.innerHTML + "CONNECTING...<br/>";
		chatbox.scrollTop= chatbox.scrollHeight;
		cloudilly.connect();
	});

	cloudilly.socketConnected(function(err, res) {
		if(err) { console.log("ERROR: " + res.msg); return; }
		console.log("@@@@@@ CONNECTED");
		console.log(res);

		chatbox.innerHTML= chatbox.innerHTML + "CONNECTED AS " + res.device.toUpperCase() + "<br/>";
		chatbox.scrollTop= chatbox.scrollHeight;
		cloudilly.join("public", function(err, res) {
			if(err) { console.log("ERROR: " + res.msg); return; }
			console.log("@@@@@@ JOIN");
			console.log(res);
			
			chatbox.innerHTML= chatbox.innerHTML + "DEVICES PRESENT IN PUBLIC: " + res.total_devices + "<br/>";
			chatbox.scrollTop= chatbox.scrollHeight;
		});
	});

	cloudilly.socketDisconnected(function() {
		console.log("@@@@@@ CLOSED");
		chatbox.innerHTML= "DISCONNECTED<br/>";
		chatbox.scrollTop= chatbox.scrollHeight;
	});

	cloudilly.socketReceivedDevice(function(res) {
		console.log("@@@@@@ RECEIVED DEVICE");
		console.log(res);

		var other= res.device.toUpperCase();
		chatbox.innerHTML= res.timestamp== 0 ? chatbox.innerHTML + other + " JOINED PUBLIC<br/>" : chatbox.innerHTML + other + " LEFT PUBLIC<br/>";
		chatbox.scrollTop= chatbox.scrollHeight;
	});

	cloudilly.socketReceivedPost(function(res) {
		console.log("@@@@@@ RECEIVED POST");
		console.log(res);

		var other= res.device.toUpperCase();
		chatbox.innerHTML= chatbox.innerHTML + other + ": " + res.payload.msg + "<br/>";
		chatbox.scrollTop= chatbox.scrollHeight;
	});
};

function send() {
	var input= document.getElementById("input").value; if(input== "") { return; }
	document.getElementById("input").value= ""; document.getElementById("input").focus();
	var payload= {}; payload.msg= input;
	cloudilly.post("public", payload, function(err, res) {
		if(err) { console.log("ERROR: " + res.msg); return; }
		console.log("@@@@@@ POST");
		console.log(res);
	});
}

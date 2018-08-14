var config = {
    apiKey: "AIzaSyAC-uQXkyWeu4-nc_taxIQNYdTJVD1dtrM",
    authDomain: "testfinal-1ac99.firebaseapp.com",
    databaseURL: "https://testfinal-1ac99.firebaseio.com",
    projectId: "testfinal-1ac99",
    storageBucket: "",
    messagingSenderId: "230070012170"
};

firebase.initializeApp(config);
database = firebase.database();

database.ref('trains').orderByChild("destination").on("child_added", function(snapshot) {
	console.log(snapshot.val());
	start_time = moment(snapshot.val().time, "HH:mm");
	console.log(start_time);
	let minutes_since = moment().diff(start_time, 'minutes');
	let time_left = snapshot.val().freq - (minutes_since % snapshot.val().freq);
	$("table tbody").append('\
		<tr>\
			<td>'+snapshot.val().name+'</td>\
			<td>'+snapshot.val().destination+'</td>\
			<td>'+snapshot.val().time+'</td>\
			<td>'+snapshot.val().freq+'</td>\
			<td>'+ time_left +'</td>\
		</tr>');
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function addTrain(name, destination, time, freq){
	database.ref('trains').push({
      name: name,
      destination: destination,
      time: time,
      freq: freq,
    });
}//addTrain


$(document).ready(function(){
	date1 = moment('20/7/2018', 'DDMMYYYY');
	date2 = moment('24/7/2018', 'DDMMYYYY');
	console.log(date1.diff(date2, 'days'));


    $(".addFormWrap button.add").click(function(e){
    	e.preventDefault();
    	var name = $("input[name=train_name]", $(this).parent()).val();
    	var destination = $("input[name=destination]", $(this).parent()).val();
    	var time = $("input[name=first_train]", $(this).parent()).val();
		var frequency = $("input[name=frequency]", $(this).parent()).val();
    	if(name !== "" && destination !== "" && time !== "" && parseInt(frequency) > 0){
    		addTrain(name, destination, time, frequency);
    	}else{
    		alert("Please fill in the required fields");
    	}
    	$("#addFormToggle").fadeToggle();
    	$(".addFormWrap form").fadeToggle();
    });

    $("#addFormToggle").click(function(){
    	$("form", $(this).parent()).fadeToggle();
    	$(this).fadeToggle();
    })
});
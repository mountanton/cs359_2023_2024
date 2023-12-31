const zodiacs=["Αιγόκερως",
"Υδροχόος",
"Ιχθύες",
"Κριός",
"Ταύρος",
"Δίδυμοι",
"Καρκίνος",
"Λέων <br>(Ίδιο ζώδιο με Τσιτσιπά)",
"Παρθένος",
"Ζυγός",
"Σκορπιός",
"Τοξότης",
]

const zodiacEnglish=[
"capricorn",
"aquarius",
"pisces",
"aries",
"taurus",
"gemini",
"cancer",
"leo",
"virgo",
"libra",
"scorpio",
"sagittarius"
]

const tweets=["I wasted half of my life telling people how to pronounce my name.",
"I  never realised how short an actual month is until I started paying rent.",
"No kids today will ever have to face the awkwardness of calling a girl at home and having her dad pick up the phone.",
"The future generations studying history will likely have to study tweets.",
"Mastiha is the hidden gem of Mediterranean culture",
"Cities and municipalities should plant fruit trees in public to help feed the homeless on the streets",
"Someone needs to build a Harrods in Greece. It’s about time.",
"Your salary is the bribe they give you to forget your aspirations.",
"Someone needs to invent a new type of salad. Caesar salad is way too overrated!",
"Κουτσομπολεύω άρα υπάρχω.",
"Is it normal when you listen to the same song 12 times in a row?",
"The difference between pizza and your opinion is that I only asked for pizza."
]

function submit(){
	 var dateEntered = new Date($('#birthdate').val());
	 var month=dateEntered.getMonth()+1;
	 var day=dateEntered.getDate();
     var zodiacSign = zodiac(day, month); 
	 
	$('#message').html("<h2>Ζώδιο: "+zodiacs[zodiacSign]+"</h2><h2>Tweet</h2><p>'"+tweets[zodiacSign]+"'</p>");
	rapidFacts(month,day);//zodiacEnglish[zodiacSign]);
}

function rapidFacts(month,day){
	const data = null;
	$('#rapid').html("<h2> Info about your Date of Birth</h2>");
	
	$.ajax({
	 success: function(response) {
	  $('#rapid').append("<br>"+response.text+"<br>");
	 },
	 error: function(jqXHR) {
	 $('#rapid').append("Error");
	 },
	 async: true,
	 crossDomain: true,
	 method: 'GET',
	 headers: {
		'X-RapidAPI-Key': '690fb272f6mshd0dbcbba113b2f7p13605bjsn09f783f233c1',
		'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
	 },
	 url:'https://numbersapi.p.rapidapi.esresrwecom/'+month+'/'+day+'/date?json=true'
	});

	
}





function zodiac(day, month){
 if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
    return 0;
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return 1;
  } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return 2;
  } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return 3;
  } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return 4;
  } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return 5;
  } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return 6;
  } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return 7;
  } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return 8;
  } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return 9;
  } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return 10;
  } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return 11;
  }
 
 
}


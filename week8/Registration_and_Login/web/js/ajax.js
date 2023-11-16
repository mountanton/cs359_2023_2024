const dogs = ["Labrador Retriever"
            , "Chihuahua"
            , "Golden Retriever"
            , "German Shepherd"
            , "Yorkshire Terrier"
            , "Shih Tzu"
            , "Dachshund"
            , "Boxer"
            , "Goldendoodle"
            , "Poodle"
            , "Beagle"
            , "Australian Shepherd"
            , "Siberian Husky"
            , "Maltese"
            , "Bulldog"
            , "Pomeranian"
            , "Border Collie"];
//$("#loginForm").hide();
function sendAjaxGET() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('ajaxContent')
                    .innerHTML = xhr.responseText;
            // $("#myForm").hide();
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    var params = "";
    for (let [name, value] of formData) {
        params += name + "=" + value + "&";
    }
    params = params.substring(0, params.length - 1);
    xhr.open('GET', 'Echo?' + params);
    xhr.send();
}

function setChoicesForLoggedUser() {
    $("#choices").html("");
    $("#choices").append("<h1>choices</h1>");
    $("#choices").append("<button onclick='getDataRequest()' class='button' >See Your Data</button><br>");
    var dogsList = "<input list='dogs' id='dog'> <datalist id='dogs'>";
    for (var x in dogs) {
        dogsList += "<option value='" + dogs[x] + "'>";
    }
    dogsList += "</datalist>";
    $("#choices").append("Favourite Dog:" + dogsList + "<br>" +
            "<button onclick='getDogInformation()'  class='button'>Information</button><br>");
    $("#choices").append("<button onclick=getDog('Tsitsipas')  class='button'>See Tsitsipas Dog</button><br>");
        $("#choices").append("<button onclick=getDog('Giannis')  class='button'>See Antetokounmpo Dog</button><br>");
    $("#choices").append("<button onclick='statistics()'  class='button'>Visualization of Active Users</button><br>");
    
    $("#choices").append("<button onclick='statisticsCountries()'  class='button'>Visualization of User Countries</button><br>");

    $("#choices").append("<button onclick='logout()'  class='button'>Logout</button><br>");
}




function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        if (value.endsWith('jpg') || value.endsWith("png")) {
            value = "<img height=300 src='" + value + "'/>";
        }
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}





function statisticsCountries(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h1>Countries of Users</h1>");
            createBarGraphics(responseData);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };
    xhr.open('GET', 'GetStatistics?type=countries');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(); 
}


function statistics(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h1>Active and Inactive Users</h1>");
            createPieGraphics(responseData);
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };
    xhr.open('GET', 'GetStatistics?type=users');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(); 
}


function getDataRequest() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h1>Your Data</h1>");
            $('#ajaxContent').append(createTableFromJSON(responseData));
            // $("#myForm").hide();
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('GET', 'Register');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}


function getDog(player) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h1>"+player+" Dog</h1>");
            $('#ajaxContent').append(createTableFromJSON(responseData));
            // $("#myForm").hide();
        } else if (xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br> Skylos Not Exists");
        }
    };

    xhr.open('GET', 'Dog_Servlet?player='+player);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function RegisterPOST() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("Successful Registration. Now please log in!<br> Your Data");
            $('#ajaxContent').append(createTableFromJSON(responseData));
        } else if (xhr.status !== 200) {
            $('#ajaxContent').append('Request failed. Returned status of ' + xhr.status + "<br>");
           const responseData = JSON.parse(xhr.responseText);
            for (const x in responseData) {
                $('#ajaxContent').append("<p style='color:red'>" + x + "=" + responseData[x] + "</p>");
            }
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Register');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

function getDogInformation() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE && this.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html(createTableFromJSON(responseData));
        } else if (this.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br> Skylos Not Exists");
        }
    });
    var dog = $('#dog').val().toLowerCase().replace(" ", "_");
    xhr.open("GET", "https://wikiapi.p.rapidapi.com/api/v1/wiki/animals/dog/info/" + dog + "?lan=en");
    xhr.setRequestHeader("x-rapidapi-host", "wikiapi.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "YOUR KEY");
    xhr.send(data);

}

function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            setChoicesForLoggedUser();
            $("#ajaxContent").html("Welcome again "+xhr.responseText);
        } else if (xhr.status !== 200) {
            $("#choices").load("buttons.html");
            //alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'Login');
    xhr.send();
}

function getTheme() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if(xhr.response==="dark"){
                document.body.style.backgroundColor = "darkblue";
            }
        } else if (xhr.status !== 200) {
            //$("#choices").load("buttons.html");
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'ColorPreference');
    xhr.send();
}

$(document).ready(function () {
    isLoggedIn();
    getTheme();
});

function loginPOST() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            setChoicesForLoggedUser();
            $("#ajaxContent").html("Successful Login");
        } else if (xhr.status !== 200) {
             $("#error").html("Wrong Credentials");
            //('Request failed. Returned status of ' + xhr.status);
        }
    };
    var data = $('#loginForm').serialize();
    xhr.open('POST', 'Login');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(data);
}

function showLogin() {
    $("#ajaxContent").load("login.html");
}


function showRegistrationForm() {
    $("#ajaxContent").load("registration.html");
}

function logout(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#choices').load("buttons.html");
            $("#ajaxContent").html("Successful Logout");
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function changeColorAJAX(opt){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
         
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('POST', 'ColorPreference');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send("color="+opt);
}


function changeTheme(opt){
    if (opt==="light" && document.body.style.backgroundColor !== "white"){
        document.body.style.backgroundColor = "white";
        changeColorAJAX(opt);
    }
    else if(opt==="dark" && document.body.style.backgroundColor !== "darkblue"){
        document.body.style.backgroundColor = "darkblue";
        changeColorAJAX(opt);
    }
}




function createPieGraphics(jsonData) {
   $('#ajaxContent').append("<div  id='piechart_3d'></div>");
   google.charts.load("current", {packages: ["corechart"]});
    const labels = new Array();
    const values = new Array();
     for (const x in jsonData) {
         labels.push(x);
         values.push(parseInt(jsonData[x]));        
     }

  google.charts.setOnLoadCallback(function () {
       drawPieChart(labels, values);
   });
}


function drawPieChart(column1, column2) { 
    var dataVis = new google.visualization.DataTable();
    dataVis.addColumn('string', 'category');
    dataVis.addColumn('number', 'value');
    for (let i = 0; i < column1.length; i++) {
        dataVis.addRow([column1[i], column2[i]]);
    }

    var options = {
        title: 'Users',
        'height': 200,
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(dataVis, options);
}


function createBarGraphics(jsonData) {
    $('#ajaxContent').append("<div  id='piechart_3d'></div>");
   google.charts.load("current", {packages: ['corechart', 'bar']});
    const labels = new Array();
    const values = new Array();
     for (const x in jsonData) {
         labels.push(x);
         values.push(parseInt(jsonData[x]));        
     }
   
    google.charts.setOnLoadCallback(function () {
        drawBarChart(labels, values);
    });   
}




function drawBarChart(column1,column2) {
    var dataVis = new google.visualization.DataTable();
    dataVis.addColumn('string', 'category');
    dataVis.addColumn('number', 'value');
    for (let i = 0; i < column1.length; i++) {
        dataVis.addRow([column1[i], column2[i]]);
    }
    var options = {
        title: 'User Countries',
        'width': 500, 'height': 200,
        hAxis: {
            title: 'Users',
            minValue: 0,
            textStyle: {
                bold: true,
                fontSize: 12,
                color: '#000000'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 18,
                color: '#000000'
            }
        },
        vAxis: {
            title: 'Country',
            textStyle: {
                fontSize: 12,
                bold: false,
                color: '#000000'
            },
            titleTextStyle: {
                fontSize: 18,
                bold: true,
                color: '#000000'
            }
        },
        isStacked: 'true',
        bar: {groupWidth: '35%'}
    };
    var chart = new google.visualization.BarChart(document.getElementById('piechart_3d'));
    chart.draw(dataVis, options);
}
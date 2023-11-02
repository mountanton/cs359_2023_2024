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




function setChoicesForRegisteredUser() {
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
    $("#choices").append("<button onclick='getTsitsipasDog()'  class='button'>See Tsitsipas Dog</button><br>");
    $("#choices").append("<button onclick='deleteData()'  class='button'>Delete My Data</button><br>");
    $("#choices").append("<button onclick='updateData()'  class='button'>Update My Favourite Player</button><br>Set Favourite Player: <input type='text'  id='player'><br> ");
}

function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {

        var category = x;
        var value = data[x];

        if (value.toString().endsWith('jpg') || value.toString().endsWith("png")) {
            value = "<img src='" + value + "'/>";
        }
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}

function getDataRequest() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h1>Your Data</h1>");
            $('#ajaxContent').append(createTableFromJSON(responseData));
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'UserAdditionAndGet');
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
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.open('GET', 'UserAdditionAndGet');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function deleteData() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#ajaxContent').html("My Data Deleted");
           
            // $("#myForm").hide();
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };
    xhr.open('DELETE', 'UserPutAndDelete');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function updateData() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $('#ajaxContent').html("Your Favorite Player Updated");
           
            // $("#myForm").hide();
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br>");
        }
    };
    var player=$('#player').val();
    xhr.open('PUT', 'UserPutAndDelete');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(player);
}




function getTsitsipasDog() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h1>Tsitsipas Dog</h1>");
            $('#ajaxContent').append(createTableFromJSON(responseData));
            // $("#myForm").hide();
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br> Skylos Not Exists");
        }
    };
    xhr.open('GET', 'TsitsipasDog_Servlet');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function sendAjaxPOST() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    if ($("#country").val() === "Monaco") {
        alert("Banned due to Many Requests");
        return;
    }

    var jsonData = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $('#ajaxContent').html(createTableFromJSON(responseData));
            setChoicesForRegisteredUser();


        } else if (xhr.status !== 200) {
            document.getElementById('ajaxContent')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";
            const responseData = JSON.parse(xhr.responseText);
            for (const x in responseData) {
                document.getElementById('ajaxContent').innerHTML += "<p style='color:red'>" + x + "=" + responseData[x] + "</p>";
            }
        }
    };
    //alert(jsonData);
    xhr.open('POST', 'UserAdditionAndGet');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}

function getDogInformation() {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE && this.status === 200) {

            if (xhr.responseText === "[]") {
                $('#ajaxContent').html('Request failed. <br> Skylos Not Exists');
            } else {
                const responseData = JSON.parse(xhr.responseText.replace("[", "").replace("]", ""));
                $('#ajaxContent').html(createTableFromJSON(responseData));
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            $('#ajaxContent').html('Request failed. Returned status of ' + xhr.status + "<br> Skylos Not Exists");
        }
    });
    var dog = $('#dog').val().toLowerCase();//.replace(" ","_");
    xhr.open('GET', 'https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?name=' + dog);
    xhr.setRequestHeader('X-RapidAPI-Host', 'dogs-by-api-ninjas.p.rapidapi.com');
    var key = "690fb272f6mshd0dbcbba113b2f7p13605bjsn09f783f233c1";
    xhr.setRequestHeader("x-rapidapi-key", key);
    xhr.send(data);
}

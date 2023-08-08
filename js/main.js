var webSiteName = document.getElementById("bookmarkName");
var webSiteURL = document.getElementById("websiteURL");
var btn = document.getElementById("btn");
var validMessage = document.getElementById("validation");

var webSitesList = [];

if (localStorage.getItem("sites") != null)
{
    webSitesList = JSON.parse(localStorage.getItem("sites"));
    displayWebSite();
}

function addWebSite() {
    for (var i = 0; i < webSitesList.length; i++)
    {
        if (webSitesList[i].siteName.toLowerCase() == webSiteName.value.toLowerCase())
        {
            window.alert("the web site already exists")
            return;
        }
    }

    if (isValidUrl(webSiteURL.value))
    {
        var webSite = {siteName: webSiteName.value,
        siteURL: webSiteURL.value};
        webSitesList.push(webSite);
        localStorage.setItem("sites", JSON.stringify(webSitesList));
        displayWebSite();
        clear();
        validMessage.innerHTML = ""
    }
    else
    {
        validMessage.innerHTML = "Invalid URL";
        sweetAlert();
        // window.alert(`Site Name or Url is not valid, Please follow the rules below :

        // Site name must start with http:// or https://
        // Site name must contain at least 3 characters
        // Site URL must be a valid one`);
    }
}

function displayWebSite() {
    data = '';
    for (var i = 0; i < webSitesList.length; i++) {
        data += `
        <tr>
            <td>${i + 1}</td>
            <td>${webSitesList[i].siteName}</td>
            <td><button class="btn btn-warning" onclick="openWebSite(${i});"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td><button class="btn btn-danger" onclick="deleteWebsite(${i});"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = data;
}

function clear() {
    webSiteName.value = "";
    webSiteURL.value = "";
}

function deleteWebsite(index){
    webSitesList.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(webSitesList));
    displayWebSite();
}

function openWebSite(index) {
    window.open(webSitesList[index].siteURL);
}


function isValidUrl(url) {
    // Regular expression to match a URL
    var urlRegex = new RegExp(
      "^(https?:\\/\\/)?"+ // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+ // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return urlRegex.test(url);
}

function sweetAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
        })
}
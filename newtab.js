
let backgroundImage = "";
let photoData = [];
let allPhotos = "";
let photographerData = [];
let photographerID = "";
let photographerName = "";
let manifest = chrome.runtime.getManifest();
let key = manifest.API_KEY

// let twitter = "";
// let instagram = "";
// let facebook = "";
// let link = "";

window.onload = function() {
    $.get("https://api.airtable.com/v0/appQWmCbvBOseboyN/photos?api_key="+key+"&fields%5B%5D=photoID&sort%5B0%5D%5Bfield%5D=photoID&sort%5B0%5D%5Bdirection%5D=desc", function(data, status){
        allPhotos = data.records[0].fields.photoID
        mountNewImage(Math.floor(Math.random() * allPhotos) + 1);
    })    
    $.get("https://api.airtable.com/v0/appQWmCbvBOseboyN/photographers?api_key="+key, function(data, status){
        allPhotographers = data.records
    })   
};

mountNewImage = function(randNumber) {
    //get a photo
    $.when($.get("https://api.airtable.com/v0/appQWmCbvBOseboyN/tbl7DdxPFYrU2nW1v?api_key="+key+"&filterByFormula=%7BphotoID%7D+%3D+"+randNumber, function(data, status){
        photoData = data.records[0].fields
    })
    ).then(function () {
        //Background
        document.getElementById("bg").src = photoData.photo;

        //Photo Info Block
        document.getElementById("photographerName").innerHTML = photoData.name;
        document.getElementById("description").innerHTML = photoData.company + " - " + photoData.description;
        document.getElementById("twitter").href = "https://twitter.com/"+photoData.twitter;
        document.getElementById("instagram").href = "https://instagram.com/"+photoData.instagram;
        document.getElementById("facebook").href = "https://facebook.com/"+photoData.facebook;
        document.getElementById("link").href = photoData.website;

        if(photoData.patreon){
            document.getElementById("patreon").innerHTML = `<a id="patreonLink" href="https://www.patreon.com/${photoData.patreon}"><img id="patreonImg" src="/img/patreon.png" alt=""></a>`
        }

    });
};




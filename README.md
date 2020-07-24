# google drive client api
is a very small library to upload / download / delete or modify files on goole drive.

__IMPORTATNT__: Currently only works for application-appdata folder, because it was such a mess to get here that I didn't wanted to continue. But feel free to PR, should be an easy fix

## installation
```js
npm install google-drive-client-api
```

## usage
```js
import drive from 'google-drive-client-api'

function load() {
    // CLIENT_ID is an id you will need to get through the google developer console
    // DISCOVERY_DOCS is an array [], can be empty in most cases
    // SCOPES list of scopes seperated by spaces, propably one of those: https://www.googleapis.com/auth/drive.appdata or https://www.googleapis.com/auth/drive.appdata or https://www.googleapis.com/auth/drive.file
    drive.load("CLIENT_ID", DISCOVERY_DOCS, "SCOPES").then(() => {
        console.log("google client loaded");
    });
}

function isLoggedIn() {
    if(drive.isLoggedIn()) {
        console.log("user is logged in");
    } else {
        console.log("user is NOT logged in");
    }
}

function login() {
    drive.login().then(() => {
        console.log("login successfull");
    })
}

function create() {
    drive.create("test-file.json").then((data) => {
        // file created

        // the id of the file is in fileId
        let fileId = data.result.id;
        
        // push some content into the file
        drive.update(fileId, "Test-Content")
    });
}

function list() {
    drive.list().then((data) => {
        // all files where you have access to
        let files = data.result.files;
        
        // download the content of each file
        files.forEach(file => {
            drive.download(file.id).then((data) => {
                file.content = data.body;
            })
        });
    });
}

function deleteFile(id) {
    drive.delete(id).then(() => {
        // deletet file with given id
    });
}
```

## example
go here https://google-drive-client-api.serret.dev/
or
- clone this repo
- `cd example`
- `npm install`
- `npm run dev`

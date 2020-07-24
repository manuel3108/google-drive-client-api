let gapi = require('google-client-api')
let api;

module.exports.load = (client_id, discovery_docs, scopes) => {
    return new Promise((resolve) => {
        gapi((google_api) => {
            api = google_api;
            api.load('client:auth2', () => {
                api.client.init({
                    clientId: client_id,
                    discoveryDocs: discovery_docs,
                    scope: scopes
                }).then(() => {
                    api.client.load('drive', 'v3', () => {
						resolve();
					});                  
                });
            });
        })
    });
}

module.exports.login = () => {
    return new Promise((resolve) => {
        api.auth2.getAuthInstance().signIn().then(() => {
            resolve();
        });
    });
}

module.exports.isLoggedIn = () => {
    return api.auth2.getAuthInstance().isSignedIn.get();
};

module.exports.list = () => {
    return api.client.drive.files.list({
        spaces: 'appDataFolder'
    })
}

module.exports.create = (name) => {
    return api.client.drive.files.create({
      resource: {
        name: name,
        parents: ['appDataFolder']
      },
      fields: 'id'
    });
}

module.exports.update = (fileId, content) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
      if (xhr.readyState != XMLHttpRequest.DONE) {
        return;
      }
      console.log(xhr.response);
    };
    xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId + '?uploadType=media');
    xhr.setRequestHeader('Authorization', 'Bearer ' + api.auth.getToken().access_token);
    xhr.send(content);
  }

module.exports.download = (id) => {
    return api.client.drive.files.get({
        fileId: id,
        alt: 'media',
    })
}

module.exports.delete = (id) => {
    return api.client.drive.files.delete({
        'fileId': id
    });
  }
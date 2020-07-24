<script>
	import drive from 'google-drive-client-api'

	let apiLoadedText = "Load api";
	let isLoggedInText = "Check login"
	let loginText = "log in"
	let createText = "Upload me"
	let listText = "list all files"
	let files = [];

	function load() {
		drive.load("1004447507607-hc0eguhn4cnupcdmpptutifvi1g6g5pn.apps.googleusercontent.com", [], "https://www.googleapis.com/auth/drive.appdata").then(() => {
			apiLoadedText = "Success!"
		});
    }

	function isLoggedIn() {
		if(drive.isLoggedIn()) {
			isLoggedInText = "You are logged in"
			loginText = "Success!"
		} else {
			isLoggedInText = "not logged in"
		}
	}

    function login() {
        drive.login().then(() => {
			loginText = "Success!"
		})
	}
	
	function create() {
		createText = "Creating file..."
		drive.create("test-file.json").then((data) => {
			let fileId = data.result.id;
			createText = "Created file with id " + fileId;
			drive.update(fileId, "Test-Content")
		});
	}

	function list() {
		drive.list().then((data) => {
			files = data.result.files;
			listText = files.length + " file(s) shown below"

			files.forEach(file => {
				drive.download(file.id).then((data) => {
					file.content = data.body;
					files = files;
				})
			});
		});
	}

	function deleteFile(id) {
		drive.delete(id).then(() => {
			console.log("file deleted")
			list();
		});
	}
</script>

1. Load the drive api: <button on:click={load}>{apiLoadedText}</button><br>
2. Check login status: <button on:click={isLoggedIn}>{isLoggedInText}</button><br>
3. if not logged in: login: <button on:click={login}>{loginText}</button><br>
4. upload file: <button on:click={create}>{createText}</button><br>
5. list files: <button on:click={list}>{listText}</button><br>
{#each files as file,i}
	File {i}: id: {file.id} name: {file.name}
	<button on:click={() => deleteFile(file.id)}>Delete</button>
	Content: {file.content}
	<br>
{/each}

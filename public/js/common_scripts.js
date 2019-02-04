'use strict';
let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');
let hideAction = false;

navBarToggle.addEventListener('click', function () {
	mainNav.classList.toggle('active');
});
var itemData = {};
// Menu will appear according to the user logged in

let menuArray = [
	{name:'Parties and offices',href:'parties.html',css_class:'nav-links'},//for users to view political offices and candidates he has voted
	{name:'Politician',href:'politician.html',css_class:'nav-links'}, // for both admin and users
	{name:'Profile',href:'profile.html',css_class:'nav-links'}, //for admin and politian
	/* LInks that will be available when not logged in 
	{name:'Login',href:'signin.html',css_class:'nav-links'},
	{name:'Sign up',href:'signup.html',css_class:'nav-links'},
	{name:'Reset password',href:'recoverpwd.html',css_class:'nav-links'},
*/
	{name:'Log Out',href:'#',css_class:'nav-links'},
];

for(let i=0; i<menuArray.length; i++){
//Create <li> and <a> element
	let liNode = document.createElement('li');
	let aNode = document.createElement('a');
	aNode.setAttribute('href', menuArray[i].href);
	aNode.setAttribute('class', menuArray[i].css_class);
	aNode.textContent = menuArray[i].name;
	liNode.appendChild(aNode);

	//append <li> to <lu>
	mainNav.appendChild(liNode);
}
// Get the modal
// var modal = document.getElementById('myModal');

function openModal(modalToOpen,action,modalData){
	var modal = document.getElementById(modalToOpen);
	let modalTitle = document.getElementById('modalTitle');
	modal.style.display = 'block';
	console.log('Data:'+(modalData))
	if(action=='addParty'){
		modalTitle.textContent='Add new party';
	}
	if(action=='addOffice'){
		modalTitle.textContent='Add new office';
	}
	if(action=='editParty'){
		modalTitle.innerHTML='Edit party <strong>'+'AJA'+'</strong>';
	}
	if(action=='editOffice'){
		modalTitle.innerHTML='Edit office <strong>'+'AJA'+'</strong>';
	}
}
// When the user clicks on <span> (x), close the modal
function closeModal(modalToClose) {
	var modal = document.getElementById(modalToClose);
	modal.style.display = 'none';
}
/*
App functions and methods
*/
function httpGet(url, displayDiv, divDesign){
	let request = new HttpRequest();
	request.method = "GET";
	// request.data = JSON.stringify(params);
	request.url = url;

	//create callback for success containing the response
	request.success = function(res) {
		let response = JSON.parse(res);
		let partiesList = response.data;
		for(let i = 0; i < partiesList.length; i++){
			var partyInfo = JSON.stringify(partiesList[i]);
			displayDiv.innerHTML += divDesign(partiesList[i],hideAction);
			console.log('HTML CODE::::'+divDesign(partyInfo,hideAction)+'::::')
		}
	};

	//and a fail callback containing the error
	request.fail = function(error) {
		var error = JSON.parse(error)
		Notifier('',error.error);
		displayDiv.innerHTML = '<h3 class="text-center">Nothing to display</h3>';
	};
	//and finally send it away
	request.send();
}
function httpPost(url, dataToSend, displayDiv, divDesign, idModal){
	let request = new HttpRequest();
	request.method = "POST";
	request.data = dataToSend;
	request.url = url;

	//create callback for success containing the response
	request.success = function(res) {
		let response = JSON.parse(res);
		displayDiv.innerHTML += divDesign(response.data[0],hideAction);
		closeModal(idModal);
	};

	//and a fail callback containing the error
	request.fail = function(error) {
		var error = JSON.parse(error)
		console.log('Error:'+JSON.stringify(error))
		Notifier('',error.error);
	};
	//and finally send it away
	request.send();
}
function httpPatch(url, dataToSend, displayDiv){
	let request = new HttpRequest();
	request.method = "PATCH";
	request.data = dataToSend;
	request.url = url;

	//create callback for success containing the response
	request.success = function(res) {
		let response = JSON.parse(res);
		let partiesList = response.data;
		displayDiv.innerHTML += partyDesign(partiesList[0],hideAction);
	};

	//and a fail callback containing the error
	request.fail = function(error) {
		var error = JSON.parse(error)
		Notifier('',error.error);
	};
	//and finally send it away
	request.send();
}
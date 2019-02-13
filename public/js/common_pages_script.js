let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');
navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
});
let theDate = new Date();
document.getElementById('year').textContent = theDate.getFullYear() + '. All right reserved';

// Menu will appear according to the user logged in
let menuArray = [];
switch (userType) {
	case 'admin':
		menuArray = [
			{name:'Parties and offices',href:'parties.html',css_class:'nav-links'},//for users to view political offices and candidates he has voted
			{name:'Politician Dashbord',href:'politician.html',css_class:'nav-links'}, // for both admin and users
			{name:'User dashboard',href:'profile.html',css_class:'nav-links'}, //for admin and politian
			{name:'Admin dashboard',href:'user_list.html',css_class:'nav-links'}, //for admin only
			{name:'Politician panel',href:'politician.html',css_class:'nav-links'},
			{name:'Log Out',href:'index.html',css_class:'nav-links'},
		];
		break;
	case 'politician':
		menuArray = [
			{name:'Politician dashboard',href:'politician.html',css_class:'nav-links'},//for users to view political offices and candidates he has voted
			{name:'User panel',href:'user-parties.html',css_class:'nav-links'},
			{name:'Admin panel',href:'parties.html',css_class:'nav-links'},
			{name:'Log Out',href:'index.html',css_class:'nav-links'},
		];
		break;
	case 'user':
		menuArray = [
			{name:'Parties and offices',href:'user-parties.html',css_class:'nav-links'},//for users to view political offices and candidates he has voted
			{name:'User dashboard',href:'profile.html',css_class:'nav-links'}, 
			{name:'Politician panel',href:'politician.html',css_class:'nav-links'},
			{name:'Admin panel',href:'parties.html',css_class:'nav-links'},
			{name:'Log Out',href:'index.html',css_class:'nav-links'},
		];
		break;
	default:
		break;
}
for(let i=0; i<menuArray.length; i++){
	//Create <li> and <a> element
	let liNode = document.createElement('li');
	let aNode = document.createElement('a');
	aNode.setAttribute('href', menuArray[i].href);
	aNode.setAttribute('class', menuArray[i].css_class);
	aNode.textContent = menuArray[i].name;
	liNode.appendChild(aNode);
	//
	mainNav.appendChild(liNode);
}
// Get the modal
// var modal = document.getElementById('myModal');

function openModal(modalToOpen,action){
	var modal = document.getElementById(modalToOpen);
	modal.style.display = "block";
	if(action=='addParty'){
		let modalTitle = document.getElementById('partyModalTitle');
		modalTitle.textContent="Add new party"
	}
	if(action=='addOffice'){
		let modalTitle = document.getElementById('officeModalTitle');
		modalTitle.textContent="Add new office"
	}
	if(action=='editParty'){
		let modalTitle = document.getElementById('partyModalTitle');
		modalTitle.textContent="Edit party"
	}
	if(action=='editOffice'){
		let modalTitle = document.getElementById('officeModalTitle');
		modalTitle.textContent="Edit office"
	}
}
// When the user clicks on <span> (x), close the modal
function closeModal(modalToClose) {
  	var modal = document.getElementById(modalToClose);
	modal.style.display = "none";
}
/*
	App functions and methods
*/
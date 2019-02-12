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
			{name:'Politician',href:'politician.html',css_class:'nav-links'}, // for both admin and users
			{name:'Profile',href:'profile.html',css_class:'nav-links'}, //for admin and politian
			{name:'Users',href:'user_list.html',css_class:'nav-links'}, //for admin only
			{name:'Log Out',href:'index.html',css_class:'nav-links'},
		];
		break;
	case 'politician':
		menuArray = [
			{name:'Offices',href:'politician.html',css_class:'nav-links'},//for users to view political offices and candidates he has voted
			{name:'Log Out',href:'index.html',css_class:'nav-links'},
		];
		break;
	case 'user':
		menuArray = [
			{name:'Parties and offices',href:'user-parties.html',css_class:'nav-links'},//for users to view political offices and candidates he has voted
			{name:'Profile',href:'profile.html',css_class:'nav-links'}, 
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
		let modalTitle = document.getElementById('modalTitle');
		modalTitle.textContent="Add new party"
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
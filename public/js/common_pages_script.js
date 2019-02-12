let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
});
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

/**
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
*/
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
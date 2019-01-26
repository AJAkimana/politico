let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
});
// Menu will appear according to the user logged in

let menuArray = [
	{name:'Dashboard',href:'#',css_class:'nav-links'},//for users to view political offices and candidates he has voted
	{name:'Parties',href:'parties.html',css_class:'nav-links'}, // for both admin and users
	{name:'Ofices',href:'offices.html',css_class:'nav-links'}, //for admin and politian
	{name:'User Names',href:'#',css_class:'nav-links'},
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
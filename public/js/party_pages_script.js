'use strict';
let partiesDiv = document.getElementById('parties-list');
let partyTitle = document.getElementById('party-title');
let officesDiv = document.getElementById('offices-list');
let officeTitle = document.getElementById('office-title');
function partyDesign(designData, hideAction){
	var panelDivCss = hideAction?'hide':'show';
	return '<div class="col-smt-12 col-tab-4 col-lap-3 col-dsk-3">' +
				'<div class="panel">' +
					'<div class="panel-heading">'+ designData.name +'</div>' +
					'<div class="panel-body">'+
						'<img src="/img/default.png" width="50%" height="50%"/>'+
					'</div>'+
					'<div class="panel-footer '+ panelDivCss +'">' +
						'<button class="btn btn-edit" onclick="openModal(\'partyModal\',\'editParty('+ designData +')\')">Edit</button>' +
						'<button class="btn btn-delete" onclick="openModal(\'deleteModal\')">Delete</button>'+
					'</div>'+
				'</div>'+
			'</div>';
}
function officeDesign(designData, hideAction){
	var panelDivCss = hideAction?'hide':'show';
	return '<div class="col-smt-12">' +
				'<div class="panel">' +
					'<div class="panel-heading">'+ 
						'<h3 class="panel-title">' + designData.name + '</h3>' +
					'</div>' +
					'<div class="panel-body">'+ 
						'<h4 class="panel-title">' + designData.type + '</h4>' +
					'</div>' +
					'<div class="panel-footer '+ panelDivCss +'">' +
						'<button class="btn btn-edit" onclick="openModal(\'officeModal\',\'editOffice('+ designData +')\')">Edit</button>' +
						'<button class="btn btn-delete" onclick="openModal(\'deleteModal\')">Delete</button>'+
					'</div>'+
				'</div>'+
			'</div>';
}

// Load parties
httpGet('/v1/parties',partiesDiv, partyDesign);
httpGet('/v1/offices',officesDiv, officeDesign);
function saveParty(){
	var name, address, logo, params;
	name = document.getElementById('partyName');
	address = document.getElementById('partyAddress');
	logo = document.getElementById('partyLogo');
	if(!name.value){
		Notifier('','Please enter party name');
		name.focus();
		return;
	}
	if(!address.value){
		Notifier('','Please enter party address');
		address.focus();
		return;
	}
	if(!logo.value){
		Notifier('','Please enter party logo');
		logo.focus();
		return;
	}
	params = {name: name.value, hqAddress: address.value, logoUrl: logo.value};
	httpPost('/v1/parties', JSON.stringify(params), partiesDiv, partyDesign, 'partyModal');
}
function saveOffice(){
	var name, type, params;
	name = document.getElementById('officeName');
	type = document.getElementById('officeType');
	if(!name.value){
		Notifier('','Please enter party name');
		name.focus();
		return;
	}
	if(!type.value){
		Notifier('','Please enter party address');
		type.focus();
		return;
	}
	params = {name: name.value, type: type.value};
	httpPost('/v1/offices', JSON.stringify(params), officesDiv, officeDesign, 'officeModal');
}
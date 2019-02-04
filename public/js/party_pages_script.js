'use strict';
let partiesDiv = document.getElementById('parties-list');
let partyTitle = document.getElementById('party-title');
let officesDiv = document.getElementById('offices-list');
let officeTitle = document.getElementById('office-title');
let deleteBtn = document.getElementById('delete-btn');
function partyDesign(designData, hideAction){
	var panelDivCss = hideAction?'hide':'show';
	return '<div class="col-smt-12 col-tab-4 col-lap-3 col-dsk-3">' +
				'<div class="panel">' +
					'<div class="panel-heading">'+ designData.name +'</div>' +
					'<div class="panel-body">'+
						'<img src="/img/default.png" width="50%" height="50%"/>'+
					'</div>'+
					'<div class="panel-footer '+ panelDivCss +'">' +
						'<button class="btn btn-edit" onclick="openModal(\'partyModal\',\'editParty\','+ designData +')">'+
							'Edit'+
						'</button>' +
						'<button class="btn btn-delete" onclick="openModal(\'deleteModal\',\'deleteParty\','+designData+')">Delete</button>'+
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
	var params;
	partyName = document.getElementById('partyName');
	partyAddress = document.getElementById('partyAddress');
	partyLogo = document.getElementById('partyLogo');
	if(!partyName.value){
		Notifier('','Please enter party name');
		partyName.focus();
		return;
	}
	if(!partyAddress.value){
		Notifier('','Please enter party address');
		partyAddress.focus();
		return;
	}
	if(!partyLogo.value){
		Notifier('','Please enter party logo');
		partyLogo.focus();
		return;
	}
	params = {name: partyName.value, hqAddress: partyAddress.value, logoUrl: partyLogo.value};
	httpPost('/v1/parties', JSON.stringify(params), partiesDiv, partyDesign, 'partyModal');
}
function saveOffice(){
	var name, type, params;
	officeName = document.getElementById('officeName');
	officeType = document.getElementById('officeType');
	if(!officeName.value){
		Notifier('','Please enter party name');
		officeName.focus();
		return;
	}
	if(!officeType.value){
		Notifier('','Please enter party address');
		officeType.focus();
		return;
	}
	params = {name: officeName.value, type: officeType.value};
	httpPost('/v1/offices', JSON.stringify(params), officesDiv, officeDesign, 'officeModal');
}
deleteBtn.onclick = function (item){

}
let app = new function() {
	this.partiesEl = document.getElementById('parties-list');
	this.partyTitle = document.getElementById('party-title');
	this.officesEl = document.getElementById('offices-list');
	this.officeTitle = document.getElementById('office-title');
	this.deleteBtn = document.getElementById('delete-btn');

	this.partyName = document.getElementById('partyName');
	this.partyAddress = document.getElementById('partyAddress');
	this.partyLogo = document.getElementById('partyLogo');

	this.officeName = document.getElementById('officeName');
	this.officeType = document.getElementById('officeType');

	this.partyModal = document.getElementById('partyModal');
	this.officeModal = document.getElementById('officeModal');
	this.deleteModal = document.getElementById('deleteModal');

	this.delItemModalTitle = document.getElementById('delete-item-modal-title');

	this.partyFormBtn = document.getElementById('party-form-btn');
	this.editPartyBtn = document.getElementById('edit-party');
	this.officeFormBtn = document.getElementById('office-form-btn');
	this.editOfficeBtn = document.getElementById('edit-office');

	this.officesUrl = '/v1/offices';
	this.partiesUrl = '/v1/parties';

	this.hideAction = false;

	this.fetchParties = ()=>{
		let request = new HttpRequest();
		request.method = 'GET';
		request.url = this.partiesUrl;
		request.success = (res) => {
			let response = JSON.parse(res);
			this.partiesList = response.data;
			for(let i = 0; i < this.partiesList.length; i++){
				this.partiesEl.innerHTML += this.partyDesign(this.partiesList[i],this.hideAction);
			}
		};
		request.fail = (error) => {
			var _error = JSON.parse(error);
			Notifier('',_error.error);
			this.partiesEl.innerHTML = '<h3 class="text-center">Nothing to display</h3>';
		};
		request.send();
	};
	this.fetchOffices = () =>{
		let request = new HttpRequest();
		request.method = 'GET';
		request.url = this.officesUrl;
		request.success = (res) => {
			let response = JSON.parse(res);
			this.officesList = response.data;
			for(let i = 0; i < this.officesList.length; i++){
				this.officesEl.innerHTML += this.officeDesign(this.officesList[i],this.hideAction);
			}
		};
		request.fail = (error) => {
			var _error = JSON.parse(error);
			Notifier('',_error.error);
			this.officesEl.innerHTML = '<h3 class="text-center">Nothing to display</h3>';
		};
		request.send();
	};
	this.fetchOne = (url)=>{
		let request = new HttpRequest();
		request.method = 'GET';
		request.url = url;
		request.success = (res) => {
			let response = JSON.parse(res);
			this.itemInfo = response.data[0];
		};
		request.fail = (error) => {
			var _error = JSON.parse(error);
			Notifier('',_error.error);
		};
		request.send();
	};

	this.saveNewPary = () => {
		if(!this.partyName.value){
			Notifier('','Please enter party name');
			this.partyName.focus();
			return;
		}
		if(!this.partyAddress.value){
			Notifier('','Please enter party address');
			this.partyAddress.focus();
			return;
		}
		if(!this.partyLogo.value){
			Notifier('','Please enter party logo');
			this.partyLogo.focus();
			return;
		}
		this.params = {name: this.partyName.value, hqAddress: this.partyAddress.value, logoUrl: this.partyLogo.value};
		this.params = JSON.stringify(this.params);
		this.addItem(this.partiesUrl, this.params, this.partiesEl, this.partyDesign);
	};
	this.editParty = (partyId, partyName) => {
		if(!this.partyName.value){
			Notifier('','Please enter party name');
			this.partyName.focus();
			return;
		}
		if(!this.partyAddress.value){
			Notifier('','Please enter party address');
			this.partyAddress.focus();
			return;
		}
		if(!this.partyLogo.value){
			Notifier('','Please enter party logo');
			this.partyLogo.focus();
			return;
		}
		this.params = {name: this.partyName.value, hqAddress: this.partyAddress.value, logoUrl: this.partyLogo.value};
		this.params = JSON.stringify(this.params);
		this.editItem(this.partiesUrl+'/'+partyId+'/'+partyName, this.params, this.partiesEl);
	};
	this.saveNewOffice = () => {
		if(!this.officeName.value){
			Notifier('','Please enter party name');
			this.officeName.focus();
			return;
		}
		if(!this.officeType.value){
			Notifier('','Please enter party address');
			this.officeType.focus();
			return;
		}
		this.params = {name: this.officeName.value, type: this.officeType.value};
		this.params = JSON.stringify(this.params);
		this.addItem(this.officesUrl, this.params, this.officesEl, this.officeDesign);
	};
	this.editOffice = (officeId, officeName) => {
		if(!this.officeName.value){
			Notifier('','Please enter party name');
			this.officeName.focus();
			return;
		}
		if(!this.officeType.value){
			Notifier('','Please enter party address');
			this.officeType.focus();
			return;
		}
		this.params = {name: this.officeName.value, type: this.officeType.value};
		this.params = JSON.stringify(this.params);
		this.editItem(this.officesUrl+'/'+officeId+'/'+officeName, this.params, this.officesEl);
	};
	this.setPartyFormData = (party) => {
		this.partyName.value = party.name;
		this.partyAddress.value = party.hqAddress;
		this.partyLogo.value = party.logoUrl;
	};
	this.setOfficeFormData = (office) => {
		this.officeName.value = office.name;
		this.officeType.value = office.type;
	};
	// Html design
	this.partyDesign = (designData, hideAction)=>{
		let panelDivCss = hideAction?'hide':'show';
		let party = '';
		party += '<div class="col-smt-12 col-tab-4 col-lap-3 col-dsk-3 img-bg" id="id_'+ designData.id +'">';
		party += '<div class="panel">';
		party += '<div class="panel-heading">'+ designData.name +'</div>';
		party += '<div class="panel-body">';
		party += '<img src="/img/default.png" width="50%" height="50%"/>';
		party += '</div>';
		party += '<div class="panel-footer '+ panelDivCss +'">';
		party += '<button class="btn btn-edit" onclick="app.openModal(\'partyModal\',\'editParty\','+ designData.id +')">';
		party += 'Edit';
		party += '</button>';
		party += '<button class="btn btn-delete" onclick="app.openModal(\'deleteModal\',\'deleteParty\','+designData.id+')">Delete</button>';
		party += '</div>';
		party += '</div>';
		party += '</div>';
		return party;
	};

	this.officeDesign = (designData, hideAction) => {
		let panelDivCss = hideAction?'hide':'show';
		let office ='';


		office += '<tr id="id_'+ designData.id +'">';
		office += '<td>' + designData.name + '</td>';
		office += '<td>' + designData.type + '</td>';
		office += '<td>';
		office += '<button class="btn btn-edit" onclick="app.openModal(\'officeModal\',\'editOffice\','+ designData.id +')">Edit</button>';
		office += '<button class="btn btn-delete" onclick="app.openModal(\'deleteModal\',\'deleteOffice\','+ designData.id +')">&times;</button>';
		office += '</td>';
		office += '</tr>';
		return office;
	};
	// this.officeDesign = (designData, hideAction) => {
	// 	let panelDivCss = hideAction?'hide':'show';
	// 	let office ='';
	// 	office += '<div class="col-smt-12" id="id_'+ designData.id +'">';
	// 	office += '<div class="panel">';
	// 	office += '<div class="panel-heading">';
	// 	office += '<h3 class="panel-title">' + designData.name + '</h3>';
	// 	office += '</div>';
	// 	office += '<div class="panel-body">';
	// 	office += '<h4 class="panel-title">' + designData.type + '</h4>';
	// 	office += '</div>';
	// 	office += '<div class="panel-footer '+ panelDivCss +'">';
	// 	office += '<button class="btn btn-edit" onclick="app.openModal(\'officeModal\',\'editOffice\','+ designData.id +')">Edit</button>';
	// 	office += '<button class="btn btn-delete" onclick="app.openModal(\'deleteModal\',\'deleteOffice\','+ designData.id +')">Delete</button>';
	// 	office += '</div>';
	// 	office += '</div>';
	// 	office += '</div>';
	// 	return office;
	// };
	this.openModal = (modalToOpen,action,modalData) => {
		var modal = document.getElementById(modalToOpen);
		let officeModTitle = document.getElementById('office-modal-title');
		let partyModTitle = document.getElementById('party-modal-title');
		modal.style.display = 'block';
		if(action=='addParty'){
			partyModTitle.textContent='Add new party';
			this.editPartyBtn.style.visibility = 'hidden';
			this.partyFormBtn.style.visibility = 'visible';
			this.setPartyFormData({name:'',hqAddress:'',logoUrl:''});
			this.partyFormBtn.onclick = () => {
				this.saveNewPary();
			};
		}
		if(action=='addOffice'){
			officeModTitle.textContent='Add new office';
			this.editOfficeBtn.style.visibility = 'hidden';
			this.officeFormBtn.style.visibility = 'visible';
			this.setOfficeFormData({name:'',type:''});
			this.officeFormBtn.onclick = () => {
				this.saveNewOffice();
			};
		}
		if(action=='editParty'){
			var party = this.itemDetail(this.partiesList, modalData);
			this.currentParty = party;
			partyModTitle.innerHTML='Edit party <strong>'+party.name+'</strong>';
			this.editPartyBtn.style.visibility = 'visible';
			this.partyFormBtn.style.visibility = 'hidden';
			
			this.setPartyFormData(party);

			this.editPartyBtn.textContent = 'Edit '+party.name;
			this.editPartyBtn.onclick = () => {
				this.editParty(party.id,party.name);
			};
		}
		if(action=='editOffice'){
			var office = this.itemDetail(this.officesList, modalData);
			this.currentOffice = office;
			officeModTitle.innerHTML='Edit office <strong>'+office.name+'</strong>';
			this.setOfficeFormData(office);
			this.editOfficeBtn.style.visibility = 'visible';
			this.officeFormBtn.style.visibility = 'hidden';
			this.officeName.value = office.name;
			this.officeType.value = office.type;
			this.editOfficeBtn.textContent = 'Edit '+office.name;
			this.editOfficeBtn.onclick = () => {
				this.editOffice(office.id,office.name);
			};
		}
		if(action=='deleteParty'){
			var _party = this.itemDetail(this.partiesList, modalData);
			this.currentParty = _party;
			this.delItemModalTitle.innerHTML='Delete party <strong>'+_party.name+'</strong>';
			this.deleteBtn.onclick = () => {
				this.deleteItem(this.partiesUrl+'/'+_party.id, _party.id,'parties-list');
			};
		}
		if(action=='deleteOffice'){
			var _office = this.itemDetail(this.officesList, modalData);
			this.currentOffice = _office;
			this.delItemModalTitle.innerHTML='Delete office <strong>'+_office.name+'</strong>';
			this.deleteBtn.onclick = () => {
				this.deleteItem(this.officesUrl+'/'+_office.id, _office.id,'offices-list');
			};
		}
	};
	// When the user clicks on <span> (x), close the modal
	this.closeModal = (modalToClose) => {
		var modal = document.getElementById(modalToClose);
		modal.style.display = 'none';
	};
	this.addItem = (url, dataToSend, displayEl, designEl) => {
		let request = new HttpRequest();
		request.method = 'POST';url;
		request.data = dataToSend;
		request.url = url;
		request.success = (res)=> {
			let response = JSON.parse(res);
			displayEl.innerHTML += designEl(response.data[0],this.hideAction);
			this.closeModal('partyModal');
			this.closeModal('officeModal');
		};
		request.fail = (error)=> {
			var _error = JSON.parse(error);
			Notifier('',_error.error);
		};
		request.send();
	};
	this.deleteItem = (url, id ,contentEl) => {
		let request = new HttpRequest();
		request.method = 'DELETE';
		request.url = url;
		request.success = (res) => {
			let response = JSON.parse(res);
			Notifier('',response.message);
			this.removeElement(contentEl, 'id_'+id);
			this.closeModal('deleteModal');
		};
		request.fail = (error) => {
			var _error = JSON.parse(error);
			Notifier('',_error.error);
		};
		request.send();
	};
	this.editItem = (url, dataToSend, displayEl) => {
		let request = new HttpRequest();
		request.method = 'PATCH';
		request.data = dataToSend;
		request.url = url;
		request.success = () => {
			// let response = JSON.parse(res);
			if(displayEl == this.officesEl){
				this.officesEl.innerHTML = '';
				this.fetchOffices();
				this.closeModal('officeModal');
			}else{
				this.partiesEl.innerHTML = '';
				this.fetchParties();
				this.closeModal('partyModal');
			}
		};
		request.fail = (error) => {
			var _error = JSON.parse(error);
			Notifier('',_error.error);
		};
		request.send();
	};
	this.itemDetail = (items, itemId) => {
		let detail = {};
		for(let i = 0; i <= items.length; i++){
			if(items[i].id == itemId) {
				detail = items[i];
				break;
			}
		}
		return detail;
	};
	this.removeElement = (parentDiv, childDiv) => {
		if (childDiv == parentDiv) {
			Notifier('','Item cannot be removed.');
		}
		else if (document.getElementById(childDiv)) {     
			var child = document.getElementById(childDiv);
			var parent = document.getElementById(parentDiv);
			parent.removeChild(child);
		}
		else {
			Notifier('Item has already been removed or does not exist.');
			return false;
		}
	};
};
app.fetchOffices();
app.fetchParties();
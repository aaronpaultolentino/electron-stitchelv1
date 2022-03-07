$(document).ready(function(){
	GlobalSearch.init();
});

GlobalSearch = {
	searchContainer: $('#global-search-container'),
	searchInput: $('#search'),
	navBarSearchActiveClassName: 'navbar-search-active',
	searchResultContainer: $('#global-search-result'),
	init: function(){
		this.startSearchEvent();
		this.searchingEvent();
		this.stopSearchingEvents();
		this.searchItemRedirect();
		this.cancelSearching();
		this.overrideClick();
	},

	startSearchEvent: function(){
		let self = this;
		self.searchInput.click(function(){
			self.searchContainer.addClass(self.navBarSearchActiveClassName)
		});
	},

	searchingEvent: function(){
		let self = this;
		self.searchInput.keyup(function(e){
			let token = localStorage.getItem('access_token')
			let val = $(this).val().trim();
			let url = base_url();
			if(val != ''){
				$('#global-search-cancel').removeClass('d-none');
		  		$.ajax({
			        type: 'GET',
			        url: url + '/api/v1/mobilesearch/'+ val,
			        headers: {
			            Authorization: 'Bearer ' + token
			        },
			        contentType: "application/json",
			    })
		        .done(function(data){
		        	self.searchContainer.addClass('navbar-search-searching');
					self.searchResultContainer.removeClass('d-none');
					self.searchResultContainer.find('#search-list-body').html('');
					if(data.length == 0){
						self.searchResultContainer.find('#search-list-body').append(self.searchResultElementTemplate({'body': 'No results found.', 'class': 'no-record'}));
					}else{
						for(let i in data){
							self.searchResultContainer.find('#search-list-body').append(self.searchResultElementTemplate(data[i]));
						}
					}
		        })
			}else{
				self.stopSearchingFunction();
				$('#global-search-cancel').addClass('d-none');
			}
		});
	},

	cancelSearching: function(){
		let self = this;

		$('#global-search-cancel').click(function(){
			self.stopSearchingFunction();
			$('#global-search-cancel').addClass('d-none');
			self.searchInput.val('');
		});
	},

	stopSearchingEvents: function(){
		let self = this;

		self.searchInput.keydown(function(e){
			if(e.keyCode == 9){
				self.stopSearchingFunction();
			}
		});

		$(document).click(function(event){
			var $target = $(event.target);

		  	if(!$target.closest('#global-search-container').length && !$target.closest('#global-search-result').length &&
		  	self.searchContainer.hasClass(self.navBarSearchActiveClassName)) {
		  		self.stopSearchingFunction();
		  	}
		});
	},

	stopSearchingFunction: function(){
		let self = this;

		self.searchContainer.removeClass(self.navBarSearchActiveClassName);
		self.searchContainer.removeClass('navbar-search-searching');
		self.searchResultContainer.addClass('d-none');

	},

	searchResultElementTemplate: function(data){
		let resultItemClass = 'global-search-result-item';
		if(!data.id){
			resultItemClass = '';
			resultItemClass.filter(x => x != null)
		}
		let template = '<div class="'+ resultItemClass +'" data=\''+ JSON.stringify(data) +'\'>'+
			        '<div scope="row" class="list-rows">'+
			          '<a href="'+ data['url'] +'" class="'+ data['class'] +'" style="color: #565665;" target="_blank"><div class="media align-items-center">';
			          if(data['type'] == 'gmail'){
			          	template += '<div class="icon icon-shape bg-danger text-white rounded-circle shadow">'+
					              '<i class="fa fa-google" aria-hidden="true"></i>'+
					            '</div>';
			          }else if(data['type'] == 'slack'){
			          	template += '<div class="icon icon-shape bg-info text-white rounded-circle shadow">'+
					              '<i class="fa fa-slack" aria-hidden="true"></i>'+
					            '</div>';
			          }else if(data['type'] == 'jira'){
			          	template += '<div class="icon icon-shape bg-orange text-white rounded-circle shadow">'+
					              '<i class="fas fa-diamond" aria-hidden="true"></i>'+
					            '</div>';
			          }

			            template += '<div class="media-body ml-3">'+
			              '<span class="name mb-0 text-sm">'+ data['body'] +'</span>'+
			            '</div>'+
			          '</div>'+
			          '</a>'+
			        '</div>'+
		      	'</div>';

		return template;

	},

	searchItemRedirect: function(){
		$('body').on('click', '#global-search-result table tr.global-search-result-item', function(){
			let data = JSON.parse($(this).attr('data'));
			if(data['type'] == 'registrant'){
				window.location = url('admin/clients/'+ data['client_id'] +'/events/'+ data['event_id'] +'/registrations/'+ data['id'] +'/edit');
			}else if(data['type'] == 'event'){
				window.location = url('admin/clients/'+ data['client_id'] +'/events/'+ data['event_id'] +'/edit');
			}
		})
	},

	overrideClick: function(){
		$('body').on('click', '.no-record', function(e){
			e.preventDefault();
		})
	}
}

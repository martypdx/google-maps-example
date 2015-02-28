var mapping = new Mapping()

function Mapping(){
	var self = this
	 ,	map, element, current

	this.loadMap = function(){
        var el = document.getElementById('map-canvas')
        self.initialize(el, function(){
            setTimeout(self.addMarkers, 1000)
        })
    }

	this.initialize = function(el, cb) {
		element = el

		if(window.forge){
			forge.geolocation.getCurrentPosition(function(position) {
				createMap(position.coords)
				cb()			
			})
		}else{
			createMap({ latitude: 45.51925, longitude: -122.331383})
			cb()			
		}

		


		// navigator.geolocation.getCurrentPosition(function(position){
		// 	createMap(position)
		// 	cb()
		// }, error)
	}

	function error(err){
		console.log('err', err)
	}

	function createMap(coords){
		current = coords
		var options = {
			center: new google.maps.LatLng(coords.latitude, coords.longitude)
		 ,	zoom: 15
		}
		map = new google.maps.Map(element, options);

		addMarker({ 
			location: options.center 
		 ,	image: 'http://www.google.com/mapfiles/arrow.png'
		})
	}

	var icons = {
		red: 'images/red-heart.png',
		orange: 'images/orange-heart.png',
		yellow: 'images/yellow-heart.png',
		black: 'images/black-heart.png'
	}

	function addMarker(options) {
		var marker = new google.maps.Marker({
			map: map
		 ,	position: options.location
		 ,	animation: options.animation || google.maps.Animation.DROP
		 ,	icon: options.image
		})       
	}

	this.addMarkers = function() {

		for (var i = 0; i < 10; i++) {
		  setTimeout(getAddFn(i), i * 75);
		}

		function offset(){
			var rnd = Math.floor(Math.random()*101)
			return -.005 + (rnd * .0001)
		}

		function icon(){
			var rnd = Math.floor(Math.random()*4)
			return icons[Object.keys(icons)[rnd]]
		}

		function getAddFn(i){
		  return function() {
			  addMarker({ 
				  location: new google.maps.LatLng(current.latitude + offset(), current.longitude + offset()), 
				  image: icon()
			  })
		  }
		}
	}
}

		
		








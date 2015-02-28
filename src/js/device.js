var device = getDevice()



function getDevice(){
	
	var icons = {
		back: 'images/buttons/back.png'
	 ,	info: 'images/buttons/info.png'
	 ,	refresh: 'images/buttons/refresh.png'
	 ,	share: 'images/buttons/share.png'
	 ,	impact: 'images/buttons/impact.png'
	}

	var isNative = ((typeof(forge)!=='undefined'&& forge.topbar)?true:false )
	console.log('device is Native', isNative)	
	return isNative ? new ForgeDevice() : new NoopDevice();



	function NoopDevice(){
		this.splash = { hide: function(){} }
		this.topbar = new NoopTopbar()
		this.tabbar = new NoopTabbar()
		this.icon = icons
		//this.get = $.getJSON
		
		this.geolocation = {
			current: navigator.geolocation.getCurrentPosition
		}
	}

	function ForgeDevice(){
		// this.splash = {
		// 	hide: forge.launchimage.hide
	 // 	}

	 	this.topbar = forge.topbar ? new Topbar(forge.topbar) : new NoopTopbar()
	 	this.tabbar = forge.tabbar

	 	this.get = function(f, cb) {
            forge.file.getLocal(f, function(uri){
                forge.file.string(uri, function(s){
                    cb(JSON.parse(s))
                })
            })
        }
        this.geolocation = function(cb) {
        	forge.geolocation.getCurrentPosition(
        		{ enableHighAccuracy: true }, cb)
        }

		this.icon = icons
	}

	function Topbar(topbar){
		var self = this

		this.hide = function(){
	 		topbar.hide()
	 		return this
	 	}
		
		this.show = function(){
	 		topbar.show()
	 		return this
	 	}

		this.current = {}
		var saved;

		this.setTitle = function(title){
			self.current.title = title
			forge.topbar.setTitle(title)
			return this
		}

		this.position = {
			right: 'right'
		 ,	left: 'left'
		}

		var tint = (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i) !== null)
			    ? [255,255,255,255] : [0,0,0,255];

		this.set = function(options) {
			self.current = options

			forge.topbar.removeButtons()
	 		forge.topbar.setStatusBarStyle("light_content")
	 		forge.topbar.setTint([5,5,5,255])
			
			self.setTitle(options.title)

			if(options.left) {
				setButton(options.left, 'left')
			}
			if(options.right) {
				setButton(options.right, 'right')
			}
			return this
	 	}

	 	function setButton(button, position){
			forge.topbar.addButton({
				icon: button.icon
			 ,	position: position
			 ,	tint: tint
			}, button.cb);	 		
	 	}

	 	function getButtonTint() {
			return (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i) !== null)
				    ? [255,255,255,255]
				    : [0,0,0,255]
			 	;
		}	

	 	this.save = function(){
		 	saved = self.current
		 	return this
		}
		this.restore = function(){
			if(saved) { this.set(saved) }
		 	return this
		}
	}

	function NoopTopbar(){
		var noop = function(){ 
			console.log('topbar', 
				arguments.callee.name, 
				arguments[0])
			return this; 
		}
		this.current = {}
		this.hide = noop
		this.show = noop
		this.setTitle = noop
		this.set = noop
	 	this.save = noop
		this.restore = noop
		return this
	}
	function NoopTabbar(){
		var noop = function(){ 
			console.log('tabbar', 
				arguments.callee.name, 
				arguments[0])
			return this; 
		}
		this.setTint = noop
		this.setActiveTint = noop
		this.addButton = function(options, cb){
			options.onPressed = { addListener: noop }
			options.setActive = noop
			cb(options)
		}
		return this
	}
}
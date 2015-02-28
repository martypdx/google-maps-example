function Tabs(tabbar){

	var self = this
	 ,	tabs = {}

	// tabbar.setTint([248, 44, 207,80])
	tabbar.setActiveTint([248, 44, 207,255])

	init()

	function init(cb) {
		add({
			text: 'My Impact'
		 ,	icon: device.icon.impact
		 ,	index: 0
		}, event('impact'))
		add({
			text: 'Find'
		 ,	icon: device.icon.info
		 ,	index: 1
		}, event('find'))
		add({
			text: 'Search'
		 ,	icon: device.icon.refresh
		 ,	index: 2
		}, event('search'))
	}

	function event(name){
		return function(button){
			self[name] = button
			button.name = name
  			button.onPressed.addListener(function () {
    			self.trigger(name)
    		})
    		self.trigger('add', button)
		}
	}
	function add(options, cb) {
		tabbar.addButton({
  			text: options.text
  		 ,	icon: options.icon
  		 ,	index: options.index
		}, cb)
	}
}
MicroEvent.mixin(Tabs)

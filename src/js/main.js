
function initialize(){

    // device.topbar.set({
    //     title: "Project Equality"
    //  ,  right: { 
    //         icon: device.icon.info
    //      ,  cb: function(){ alert('info!')}
    //     }
    // })
	device.topbar.hide()
 	var navigation = new Tabs(device.tabbar)
 	navigation.on('add', function(button){
 		if(button.name==='find') { button.setActive() }
 	})

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?' +
            'key=AIzaSyCOvbwKfuTbDN5d4YMRltTOaK5RH30VYa8&sensor=false&' +
            'callback=mapping.loadMap';
        document.body.appendChild(script);
    }

    window.onload = loadScript




	   
	
	
}
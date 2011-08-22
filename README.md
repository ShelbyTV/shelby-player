# Shelby Universal Player

One player to rule the all

## Usage
You need to include jquery and the uniplayer in your client-side code.

``` js
	<!-- Include jQuery -->
	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'></script>
	<!-- Include the Shelby Player -->
	<script type='text/javascript' src='shelby-player.js'></script>
```

Create a DOM element in which to house your uniplayer.

``` js
	<!-- Here's where your shelby player will be -->
	<div id="player-div" style="position:relavitve;float:left;width:1000px;height:500px"></div>
```

Now instantiate a uniplayer, passing an options object (specifying the id of your DOM container), and an onStateChange callback. The onStateChange callback gets called every time something changes in the player.

``` js
	var options = {
	      container:'player-div',
	      sidebar:false
	};
	
	var myStateChangeFunc = function(data, player){      
		if (data.state.playerLoaded){
			
		}
		if (data.state.buffering){
			
		}
		if (data.state.playing){
			
		}
		if (data.state.videoEnded){
		}
		if (data.state.muted){
			
		}
	};

	var player = new ShelbyPlayer(options, myStateChangeFunc);
```

Play broadcasts by passing in the channel id and broadcast id

``` js
	player.playBroadcast('4d9390098ebcf62f7e000009', '4d9390138ebcf670c00006ca');
```

You can also programmatically control playback 

``` js
	player.togglePlay(); // play/pause video
	player.toggleMute(); // mute/unmute video
```

#### Authors: [Myles Recny](http://www.github.com/mkrecny), [Henry Sztul](http://www.github.com/hsztul)
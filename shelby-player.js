/*
 * Shelby Player API 
 * authors : ['@mkrecny', '@henrysztul', '@spinosa']
 */

/*
 * ShelbyPlayer constructor
 * @param containerDiv : string : the jQuery selector string of the player's containing div
 * @param onStateChange : function : (optional) the function to execute when any player state changes 
 * @param renderOptions : object : (optional) a map of rendering options for the player 
 */

var ShelbyPlayer = function(options, onStateChange){
  this.options = options;
  this.validOptions = ['container', 'sidebar', 'shade'];
  this.rootUri = 'http://localhost:3000/';
  this.iframe = $('<iframe id="'+options.container+'-iframe" style="width:100%;height:100%"></iframe>')[0];
  jQuery('#'+options.container).append(this.iframe);
  window.addEventListener("message", function(event){
    data = JSON.parse(event.data);
    if (data.id === options.container){
      if(data.playerLoaded){
        this.playerLoaded = data.msg.playerLoaded;
      }
      onStateChange(data);
    }
  }, false);
};

ShelbyPlayer.prototype.isPlayerLoaded = function(){
  return this.playerLoaded;
}

ShelbyPlayer.prototype._postMessage = function(message){
//  message = JSON.stringify({id:this.containerDiv, msg:message});
  return this.iframe.contentWindow.postMessage(message, this.rootUri);
};

/*
 * Play a Broadcast
 * @param channelId : string : the channel id of the broadcast to play
 * @param broadcastId : string : the broadcast id of the broadcast to play
 * returns : string : the new url of the iframes src
 */

ShelbyPlayer.prototype.playBroadcast = function(channelId, broadcastId){
  var self = this;
  var newSrc = this.rootUri+'#!/channels/'+channelId+'/broadcasts/'+broadcastId+'/iframe/';
  if (this.options){
    Object.keys(this.options).forEach(function(k){
      if (self.validOptions.indexOf(k)===-1){
        delete this.options[k]
      }
    });
    newSrc+=escape(JSON.stringify(this.options));
  }
  return this.iframe.src = newSrc;
};

ShelbyPlayer.prototype.togglePlay = function(){
 this._postMessage('iframe:toggleplay'); 
};

ShelbyPlayer.prototype.toggleMute = function(){
 this._postMessage('iframe:togglemute'); 
};


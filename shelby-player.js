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

var ShelbyPlayer = function(containerDiv, onReady, onStateChange, renderOptions){
  this.validRenderOptions = ['sidebar', 'shade'];
  this.rootUri = 'http://localhost:3000/';
  this.iframe = $('<iframe id="shelby-iframe" style="width:100%;height:100%"></iframe>')[0];
  window.addEventListener("message", function(event){
    data = JSON.parse(event.data);
    if (data.loaded) {
      onReady();
    }
    onStateChange(event.data);
  }, false);
  this.renderOptions = renderOptions;
  jQuery(containerDiv).append(this.iframe);
};

ShelbyPlayer.prototype._postMessage = function(message){
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
  var newSrc = this.rootUri+'#!/channels/'+channelId+'/broadcasts/'+broadcastId+'?iframe=1';
  if (this.renderOptions){
    Object.keys(this.renderOptions).forEach(function(k){
      if (self.validRenderOptions.indexOf(k)!==-1){
        newSrc+='&'+k+'='+escape(self.renderOptions[k]);
      }
    });
  }
  return this.iframe.src = newSrc;
};

ShelbyPlayer.prototype.togglePlayback = function(state){
  var newState = state ? state : (!playerState);
  postMessage('property', newState);
};

ShelbyPlayer.prototype.toggleMute = function(){
};


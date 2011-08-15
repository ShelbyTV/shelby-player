/*
 * Shelby Player API 
 * authors : ['@mkrecny', '@henrysztul', '@spinosa']
 */

/*
 * ShelbyPlayer constructor
 * @param containerDiv : string : the jQuery selector string of the player's containing div
 * @param rootUri : string : the root URI of the shely app to iFrame, e.g. 'http://alpha.shelby.tv'
 * @param channelId : string : the channel id of the broadcast to begin playing with
 * @param broadcastId : string : the broadcast id of the broadcast to begin playing with
 */

var ShelbyPlayer = function(containerDiv, rootUri, channelId, broadcastId){
  this.rootUri = rootUri;
  this.iframe = $('<iframe id="shelby-iframe" style="width:100%;height:100%"></iframe>')[0];
  jQuery(containerDiv).append(this.iframe);
  if (channelId && broadcastId) {
    this.playBroadcast(channelId, broadcastId);
  }
};

/*
 * Play a Broadcast
 * @param channelId : string : the channel id of the broadcast to play
 * @param broadcastId : string : the broadcast id of the broadcast to play
 * returns : string : the new url of the iframes src
 */

ShelbyPlayer.prototype.playBroadcast = function(channelId, broadcastId){
  return this.iframe.src = this.rootUri+'/#!/channels/'+channelId+'/broadcasts/'+broadcastId;
};

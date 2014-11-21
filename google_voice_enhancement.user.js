// ==UserScript==
// @name         Google Voice Enhancement
// @namespace    http://www.ryangittins.com/
// @author       Ryan Gittins
// @version      1.0.0
// @description  Adds enhancements to Google Voice including elastic textboxes and improved message navigation.
// @include      htt*://*.google.*/voice*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/watch/2.0.3/jquery.watch.min.js
// @copyright    2014
// @grant        none
// ==/UserScript==

$('#gc-view-loading.gc-loading-area.gc-blue-rnd').watch('display', main);

function main()
{
  addElasticReplyBox();
  addFetchLastCollapsedText();
}

function addElasticReplyBox()
{
  $('div.goog-inline-block.goog-flat-button.gc-control.gc-message-sms').click( function() {
  
    var textBtn = $(this);
    var replyBox = textBtn.closest('tr').find('.gc-message-sms-reply div.goog-inline-block textarea');
	
	replyBox.css('overflow', 'hidden');
	
	replyBox.keyup( function() {

	  var box = $(this);
	  var boxScrollHeight = parseInt(box.scrollTop());

	  if(boxScrollHeight > 0) {
  	    box.css('height', (box.height() + boxScrollHeight + 10) + 'px');
	  }
	  
	});
  });
}

function addFetchLastCollapsedText()
{
  if($('a.pop-btn').length) return;

  $('div.gc-message-sms-more').each( function() {

    var moreLink = $(this);
	moreLink.prepend('<a class="pop-btn">+</a>');
  });

  $('a.pop-btn').css({
    'display'				:'inline-block',
    'width'					:'1em',
    'height'				:'1em',
    'line-height'			:'1em',
    'border'				:'1px solid #f5f5f5',
    'border-radius'			:'50%',
    'color'					:'#f5f5f5',
    'text-align'			:'center',
    'text-decoration'		:'none',
    'background'			:'#4387fd',
    'box-shadow'			:'0 0 3px gray',
    'font-size'				:'1em',
    'font-weight'			:'bold',
	'cursor'				:'pointer',
	'-webkit-user-select'	:'none',
	'-khtml-user-select'	:'none',
	'-moz-user-select'		:'none',
	'-o-user-select'		:'none',
	'user-select'			:'none'
  });

  $('a.pop-btn').click( function() {
    
	var popBtn = $(this);
	var messages = popBtn.closest('div.gc-message-message-display');
	var collapsedMessages = messages.find('.gc-message-sms-old');
	var mostRecentCollapsedMessage = collapsedMessages.children().last();
	
	var moreMessagesLink = messages.find('a.gc-message-sms-show');
	var moreMessagesCount = parseInt(moreMessagesLink.text().split(' ')[0]) - 1;
	
	mostRecentCollapsedMessage.insertAfter(collapsedMessages);
	
	if(!moreMessagesCount) {
	  messages.find('.gc-message-sms-more').remove();
	}
	else {
	  moreMessagesLink.text(moreMessagesCount + ' more message' + (moreMessagesCount == 1 ? '' : 's'));
	}
	
  });
}
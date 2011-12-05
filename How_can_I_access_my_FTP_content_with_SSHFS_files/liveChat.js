function launchChatWindow(IS_DID) {

	var IS_apitoken = jQuery.ajax({url: "/includes/instantservice/postrequest.php?IS_DID="+IS_DID,async:false}).responseText;

	window.open("/includes/instantservice/chatwindow.php?IS_DID="+IS_DID+"&apitoken="+IS_apitoken,'custclient','width=500,height=320');
}
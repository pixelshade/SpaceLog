/**
 * Created by pixelshade on 9.12.2014.
 */
Templates = {};

Templates.contactEntry = [
    "<h1> {{fullName}} </h1>",
    "<ul>",
    "<li> Email: {{email}} </li>",
    "<li> Phone: {{tel}} </li>",
    "</ul>"
].join("\n");


Templates.storyEntry = [
//"<ul class="nav nav-tabs" role="tablist" id="myTab">
//        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
//<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
//<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
//<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
//</ul>
//
//<div class="tab-content">
//    <div role="tabpanel" class="tab-pane active" id="home">...</div>
//    <div role="tabpanel" class="tab-pane" id="profile">...</div>
//    <div role="tabpanel" class="tab-pane" id="messages">...</div>
//    <div role="tabpanel" class="tab-pane" id="settings">...</div>
//</div>
//
//<script>
//$(function () {
//    $('#myTab a:last').tab('show')
//})
//</script>"
].join("\n");
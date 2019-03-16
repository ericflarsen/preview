// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}
// Send a message to the parent
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(msg, '*');
};


// Listen to messages from parent window
bindEvent(window, 'message', function (e) {
    consolelog("laterpay");
    console.log(e.data);
    lp_startHighlighting();
});
// Send random message data on every button click
//bindEvent(messageButton, 'click', function (e) {
//    var random = Math.random();
//    sendMessage('' + random);
//});

var ele;
var lp_highlighting;

function lp_startHighlighting(
    console.log("highlighting"); lp_highlighting = setInterval(function () {

        var element = $(':hover');
        if (element != ele) {
            $(".lp-highlight").removeClass("lp-highlight");
            $("#lp-label").remove()
            ele = element;
            if (element.length) {
                var done = false;
                var count = element.length;
                do {
                    var domElement = element[--count];

                    var tagName = domElement.tagName;
                    var id = domElement.id ? ' id="' + domElement.id + '"' : "";
                    var classname = domElement.className ? ' classname="' + domElement.className + '"' : "";



                    if (classname || id)
                        done = true;
                } while (!done && count > 0);
                domElement.classList.add("lp-highlight");
                //document.getElementById('test').innerHTML = "hover: &lt;" + tagName.toLowerCase() + id + classname + "&gt;";

                var g = document.createElement('span');
                g.setAttribute("id", "lp-label");
                g.innerHTML = id + classname;
                domElement.insertAdjacentElement('afterbegin', g);
            }
        }
    }, 100);
);

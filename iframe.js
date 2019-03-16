// addEventListener support for IE8
console.log("start");

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
    console.log("laterpay");
    console.log(e.data);
    try {
        var data = JSON.parse(e.data);
        if (data.laterpay == "highlight")
            lp_startHighlighting();
    } catch (e) {}

});

// Send message to parent window
bindEvent(window, 'mousedown', function (e) {
    sendMessage('{laterpay=' + lp_data + '}')
});
// Send random message data on every button click
//bindEvent(messageButton, 'click', function (e) {
//    var random = Math.random();
//    sendMessage('' + random);
//});

var lp_ele;
var lp_highlighting;
var lp_data;

function lp_startHighlighting() {
    console.log("highlighting");
    lp_highlighting = setInterval(function () {

        var element = $(':hover');
        if (element != lp_ele) {
            $(".lp-highlight").removeClass("lp-highlight");
            $("#lp-label").remove();
            lp_ele = element;
            if (element.length) {
                var done = false;
                var count = element.length;
                do {
                    var domElement = element[--count];

                    var tagName = domElement.tagName;
                    if (domElement.id)
                        lp_data["id"] = domElement.id;
                    if (domElement.className)
                        lp_data["className"] = domElement.className;

                    if (lp_data)
                        done = true;
                } while (!done && count > 0);
                domElement.classList.add("lp-highlight");
                //document.getElementById('test').innerHTML = "hover: &lt;" + tagName.toLowerCase() + id + classname + "&gt;";
                lp_data = id + classname;
                var g = document.createElement('span');
                g.setAttribute("id", "lp-label");
                g.innerHTML = lp_data;
                domElement.insertAdjacentElement('afterbegin', g);
            }
        }
    }, 100);
}

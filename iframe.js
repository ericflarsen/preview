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
    console.log("laterpay - checking message");
    try {
        var data = JSON.parse(e.data);
        if (data.laterpay == "highlight")
            lp_startHighlighting();
    } catch (e) {}

});

// Send message to parent window
bindEvent(window, 'mousedown', function (e) {
    console.log("prep sending data");
    if (!isEmpty(lp_data)) {
        var s = {};
        s.laterpay = "highlight";
        s.element = lp_data;
        sendMessage(JSON.stringify(s));
    }
});
// Send random message data on every button click
//bindEvent(messageButton, 'click', function (e) {
//    var random = Math.random();
//    sendMessage('' + random);
//});

var lp_ele;
var lp_highlighting;
var lp_data = {};

function lp_startHighlighting() {
    console.log("highlighting");
    lp_highlighting = setInterval(function () {
        lp_data = {};
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
                    if (domElement.id) {
                        lp_data.id = domElement.id;
                        done = true;
                    }
                    if (domElement.className) {
                        lp_data.className = domElement.className;
                        done = true;
                    }


                } while (!done && count > 0);
                domElement.classList.add("lp-highlight");

                var g = document.createElement('span');
                g.setAttribute("id", "lp-label");
                g.innerHTML = JSON.stringify(lp_data);
                domElement.insertAdjacentElement('afterbegin', g);
            }
        }
    }, 100);
}

$(function () {
    $('#browser-form').submit(function (event) {
        console.log(event);
        event.preventDefault();

        const url = new URL($('#url').val());
        console.log(url);

        $('#preview-frame').attr('src', url);
    });





    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }

    var iframeEl = document.getElementById('preview-frame'),
        messageButton = document.getElementById('message_button'),
        results = document.getElementById('results');

    // Send a message to the child iframe
    var sendMessage = function (msg) {
        // Make sure you are sending a string, and to stringify JSON
        iframeEl.contentWindow.postMessage(msg, '*');
    };
    // Send random messge data on every button click
    bindEvent(messageButton, 'click', function (e) {
        var random = Math.random();
        sendMessage('' + random);
    });
    // Listen to message from child window
    bindEvent(window, 'message', function (e) {
        results.innerHTML = e.data;
    });
});

var ele;
setInterval(function () {

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
            document.getElementById('test').innerHTML = "hover: &lt;" + tagName.toLowerCase() + id + classname + "&gt;";

            var g = document.createElement('span');
            g.setAttribute("id", "lp-label");
            g.innerHTML = id + classname;
            domElement.insertAdjacentElement('afterbegin', g);
        }
    }
}, 100);

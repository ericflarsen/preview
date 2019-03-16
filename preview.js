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
        sendMessage('{laterpay:"highlight"}');
    });
    // Listen to message from child window
    bindEvent(window, 'message', function (e) {
        console.log(e.data);
        try {
            var data = JSON.parse(e.data);
            if (data.laterpay == "highlight")
                results.innerHTML = e.data;
        } catch (e) {}

    });
});

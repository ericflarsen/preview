/*TODO: 
    - pull into a class
    - make messaging reusable and not hard coded for the single button
    - Make steps / settings configurable and not hard coded
    - URL typed in by merchant
        - convert to subdomain
        - add CNAME to CF
        - add route to workers
        - add subdomain to sandbox merchant account
    - Save settings so they can be loaded into page (by anyone with link, so not local storage)
    
*/

$(function () {
    $('#browser-form').submit(function (event) {
        console.log(event);
        event.preventDefault();

        const url = new URL($('#url').val());
        console.log(url);

        $('#preview-frame').attr('src', url);
        $('#check-url').prop("checked", true);
    });





    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }

    var iframeEl = document.getElementById('preview-frame'),
        messageButton = document.getElementById('content-button'),
        results = document.getElementById('content');

    // Send a message to the child iframe
    var sendMessage = function (msg) {
        // Make sure you are sending a string, and to stringify JSON
        iframeEl.contentWindow.postMessage(msg, '*');
    };
    // Send messge data on every button click
    bindEvent(messageButton, 'click', function (e) {
        sendMessage('{"laterpay":"highlight"}');
    });
    // Listen to message from child window
    bindEvent(window, 'message', function (e) {
        console.log(e.data);
        try {
            var data = JSON.parse(e.data);
            console.log("parsed");
            console.log(data);
            if (data.laterpay == "highlight") {
                var r;
                if (data.element.className)
                    r = "." + data.element.className
                if (data.element.id)
                    r = "#" + data.element.id
                results.innerHTML = r;
                $('#check-content').prop("checked", true);
            }
        } catch (e) {}

    });
});

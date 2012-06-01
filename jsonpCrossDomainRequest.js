/**
 * Enable javascript request done to another domain (using a <script> html tag).
 * @name XDomReq
 * @author Sebastien Mignot
 * @namespace
 */
var XDomReq = (function () {
    
    var prefix = "XDomReq.callbacks";
    var counter = 0;
    var callbacks = {};
    
    var send = function (url, callback) {
        var i = (counter++);
        var cbName = prefix + "[" + i + "]";
        var request;
        callbacks[i] = function (data) {
            //we do the actual callback
            if (typeof callback !== 'undefined') {
                callback(data);
            }
            //then we clear the memory
            delete(callbacks[i]);
        };
        request = document.createElement("script");
        request.src = url + "&callback=" + cbName;
        document.body.appendChild(request);
    };
    
    return {
        send: send,
        callbacks: callbacks //this is to make the callbacks accessible when the browser executes the response
    };
    
})();


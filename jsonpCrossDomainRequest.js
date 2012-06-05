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
    
    var addParams = function (url, params) {
        if (url.indexOf("?") === -1) {
            url += "?";
        }
        if (typeof params !== 'undefined') {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    url += "&" + key + "=" + encodeURIComponent(params[key]);
                }
            }
        }
        return url;
    };
    
    return {
        send: send,
        addParams: addParams,
        callbacks: callbacks //this is to make the callbacks accessible, it must not be used
    };
    
})();

/**
 * jQuery plugging to do jsonp request with additional param encoded
 * as a json object.
 * @param params GET params, optional
 * @name jqueryJsonp
 * @author Sebastien Mignot
 */
$.getJsonp = function (url, params, callback) {
    var settings;
    if (typeof callback === 'undefined') { //params param was not used
        settings = {
                url: url,
                dataType: 'json',
                success: params
        };
    } else {
        settings = {
                url: url,
                dataType: 'json',
                data: params,
                success: callback
        }
    }
    $ajax(settings);
};

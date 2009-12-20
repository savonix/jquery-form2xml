/*	This work is licensed under Creative Commons GNU LGPL License. <!--
    License: http://creativecommons.org/licenses/LGPL/2.1/
    Version: 0.9
    Author:  Stefan Goessner/2006
    Web:     http://goessner.net/

    Modified for use specifically with form data for use with NODOWS.
    Modifications also licensed under Creative Commons GNU LGPL License.

    Author:   Albert Lash, 2009
    Web:      http://www.nodows.com/
    Original: http://goessner.net/download/prj/jsonxml/json2xml.js

--> */
function form2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (typeof(v) == "object") {
         var hasChild = false;
         for (var m in v) {
            if (m.charAt(0) == "@")
                xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         if (hasChild) {
            for (var m in v) {
               if (m=="name") {
                 xml += "<" + v[m] + ">" + v['value'] + "</" + v[m] + ">";
               }
            }
         }
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
    return "<conf>"+xml+"</conf>";
}

function _ajax_request(url, data, callback, type, method) {
    if (jQuery.isFunction(data)) {
        callback = data;
        data = {};
    }
    return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
        });
}

jQuery.extend({
    put: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'PUT');
    },
    delete_: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'DELETE');
    }
});


function put_form(action,tfile) {
    var formjson = $('form#myform').serializeArray();
    var formxml = form2xml(formjson);

    $.put(action, formxml,
    function (data){
        $('#mystatus').text('OK');
        $('#mystatus').css('display','inline');
    }
    );
}


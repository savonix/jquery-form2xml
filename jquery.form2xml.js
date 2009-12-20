(function($){

  $.fn.form2xml = function()
  {
      var formname = this.name || 'form';
      var xml = '';
      var a = this.serializeArray();
      $.each(a, function() {
          var elt = this.name.replace(/\[\]/g,'')
          var node = this.value || '';
          xml += "<" + elt + ">" + encodeURIComponent(node) +  "</" + elt + ">";
      });
      return "<" + formname + ">" + xml + "</" + formname + ">";
  };

})(jQuery);

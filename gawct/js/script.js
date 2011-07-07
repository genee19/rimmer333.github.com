(function() {
  var cache, extrapolate, template;
  cache = {};
  extrapolate = function(str, data) {
    var fn, tpl_string_to_js;
    tpl_string_to_js = function(str) {
      var chunk, i;
      return ((function() {
        var _ref, _results;
        _ref = str.split(/<%\s*|\s*%>/);
        _results = [];
        for (i in _ref) {
          chunk = _ref[i];
          _results.push(i % 2 ? chunk.charAt(0) === '=' ? "print(" + chunk.slice(1) + ")" : chunk : "print('" + (chunk.replace(/[\r\n]$/, '').replace(/([\\\'])/g, '\\$1').replace(/([\r\n])/g, '\\r\\n\\$1')) + "')");
        }
        return _results;
      })()).join('\r\n');
    };
    fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).textContent) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){" + (tpl_string_to_js(str)) + "}return p.join('');");
    return (data ? fn(data) : void 0) || fn;
  };
  template = "div.ecwid-productBrowser-OrderConfirmationPage div.ecwid-Invoice {\n    background-image: url(<%=url%>);\n    background-repeat: no-repeat;\n}";
  return (function($) {
    return $('#in').change(function() {
      return $("#out").text(extrapolate(template, {
        url: $($($(this).val()).filter('noscript').text()).attr('src')
      }));
    });
  })(window.jQuery);
})();
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
  template = "<script type=\"text/javascript\">\nEcwid.OnPageLoaded.add(function(page) {\n  if (page.type === 'ORDER_CONFIRMATION') {\n    window.google_conversion_id = <%=google_conversion_id %>;\n    window.google_conversion_language = \"<%=google_conversion_language %>\";\n    window.google_conversion_format = \"<%=google_conversion_format %>\";\n    window.google_conversion_color = \"<%=google_conversion_color %>\";\n    window.google_conversion_label = \"<%=google_conversion_label %>\";\n    window.google_conversion_value = <%=google_conversion_value %>;\n    (function() {\n      var script;\n      script = window.document.createElement('script');\n      script.src = \"http://www.googleadservices.com/pagead/conversion.js\";\n      window.document.body.appendChild(script);\n    })();\n  }\n});\n</script>";
  (function($) {
    return $('#in').change(function() {
      var extract_google_vars;
      extract_google_vars = function(script) {
        return (new Function('nope', "var result = {}\ntry {\n  " + (script.toString()) + "\n  result['google_conversion_id'] = google_conversion_id;\n  result['google_conversion_language'] = google_conversion_language;\n  result['google_conversion_format'] = google_conversion_format;\n  result['google_conversion_color'] = google_conversion_color;\n  result['google_conversion_label'] = google_conversion_label;\n  result['google_conversion_value'] = google_conversion_value;\n} catch (e) {}\n\n\nreturn result;"))();
      };
      return $("#out").text(extrapolate(template, extract_google_vars($($(this).val()).filter('script').text())));
    });
  })(window.jQuery);
}).call(this);

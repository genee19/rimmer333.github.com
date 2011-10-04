cache = {}
extrapolate = (str, data) ->
  tpl_string_to_js = (str) ->
    (for i, chunk of str.split(/<%\s*|\s*%>/)
      if i % 2
        if chunk.charAt(0) is '='
          "print(#{chunk[1..]})"
        else
          chunk
      else
        "print('#{
          chunk
            .replace(/[\r\n]$/, '')
            .replace(/([\\\'])/g, '\\$1')
            .replace(/([\r\n])/g, '\\r\\n\\$1')
        }')").join('\r\n')
      
  fn = 
    if not /\W/.test(str)
      cache[str] = cache[str] or tmpl(document.getElementById(str).textContent)
    else 
      new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){#{tpl_string_to_js(str)}}return p.join('');")
  (fn data if data) or fn
  
template = """
<script type="text/javascript">
Ecwid.OnPageLoaded.add(function(page) {
  if (page.type === 'ORDER_CONFIRMATION') {
    window.google_conversion_id = <%=google_conversion_id %>;
    window.google_conversion_language = "<%=google_conversion_language %>";
    window.google_conversion_format = "<%=google_conversion_format %>";
    window.google_conversion_color = "<%=google_conversion_color %>";
    window.google_conversion_label = "<%=google_conversion_label %>";
    window.google_conversion_value = <%=google_conversion_value %>;
    (function() {
      var script;
      script = window.document.createElement('script');
      script.src = "http://www.googleadservices.com/pagead/conversion.js";
      window.document.body.appendChild(script);
    })();
  }
});
</script>
"""
(($) ->
  $('#in').change ()->
    extract_google_vars = (script) ->
      # todo get the script
      (new Function 'nope', """
var result = {}
try {
  #{script.toString()}
  result['google_conversion_id'] = google_conversion_id;
  result['google_conversion_language'] = google_conversion_language;
  result['google_conversion_format'] = google_conversion_format;
  result['google_conversion_color'] = google_conversion_color;
  result['google_conversion_label'] = google_conversion_label;
  result['google_conversion_value'] = google_conversion_value;
} catch (e) {}


return result;
""" )()      

    $("#out").text extrapolate template, extract_google_vars $($(this).val()).filter('script').text()
)(window.jQuery)
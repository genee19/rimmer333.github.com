(->
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
    div.ecwid-productBrowser-OrderConfirmationPage div.ecwid-Invoice {
        background-image: url(<%=url%>);
        background-repeat: no-repeat;
    }
  """
  (($) ->
    $('#in').change ()->
      $("#out").text extrapolate template, (url:$($($(this).val()).filter('noscript').text()).attr('src'))
      
  )(window.jQuery)
)()
// Generated by CoffeeScript 1.3.2
(function() {

  $(function() {
    var $filter, $in, $out, filterRE, parseCSS;
    $in = $('#input');
    $filter = $('#search');
    $out = $('#output');
    parseCSS = function(text) {
      return (new CSSParser()).parse(text);
    };
    filterRE = function() {
      return new RegExp($filter.val(), 'i');
    };
    return $('#go').click(function() {
      var css, each, filterRule, filteredCSS, re, rule, _i, _len, _ref;
      css = parseCSS($in.val());
      re = filterRE();
      filterRule = function(rule) {
        var filterByDeclarations, text;
        filterByDeclarations = function() {
          var decl, out, _i, _len, _ref;
          out = new jscsspStyleRule;
          out.mSelectorText = rule.mSelectorText;
          _ref = rule.declarations;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            decl = _ref[_i];
            if (re.test(decl.parsedCssText)) {
              out.declarations.push(decl);
            }
          }
          return ((out.declarations.length > 0) && out.cssText()) || '';
        };
        text = (rule != null) && ('parsedCssText' in rule) && rule.parsedCssText;
        if (re.test(rule.mSelectorText)) {
          return rule.cssText();
        } else {
          return filterByDeclarations();
        }
      };
      filteredCSS = [];
      _ref = css.cssRules;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        each = _ref[_i];
        if ((rule = filterRule(each)) > "") {
          filteredCSS.push(rule);
        }
      }
      return $out.val(filteredCSS.join('\r\n'));
    });
  });

}).call(this);

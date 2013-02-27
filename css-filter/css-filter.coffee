$ ()->
	$in = $ '#input'
	$filter = $ '#search'
	$out = $ '#output'

	parseCSS = (text)->
		(new CSSParser()).parse text

	filterRE = ()->
		new RegExp $filter.val(), 'i'


	$('#go').click ()->
		
		css = parseCSS $in.val()

		re = filterRE()
		filterRule = (rule)->
			filterByDeclarations = ->
				out = new jscsspStyleRule
				out.mSelectorText = rule.mSelectorText

				for decl in rule.declarations
					if re.test decl.parsedCssText
						out.declarations.push(decl)

				((out.declarations.length > 0) and out.cssText())	or ''	

			text = rule? and ('parsedCssText' of rule) and rule.parsedCssText
			if re.test rule.mSelectorText
				rule.cssText()
			else
				filterByDeclarations()


		filteredCSS = []
		for each in css.cssRules
			if (rule = filterRule each) > ""
				filteredCSS.push rule

		$out.val filteredCSS.join '\r\n'

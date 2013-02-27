pathFormat = /(?:([0-9]+)(?:\+([0-9]+))?)(?:\:(.*))/

$ = window.jQuery

add = ()->
	# show dialog
  alert 'Adding!'

help = ()->
	alert 'Here is the help'


#embed = ()->
#	alert 'Here will go the embed code'

main = (path)->
  parse = (path) ->
    path = path.match pathFormat 

    { 
      startDate: new Date(path[1]*1000)
      description: path[3]
    }
	

  path = parse path
  
  $('#t').text path.startDate.toLocaleString()
  $('#d').text path.description 

reroute = ()->
  path = window.location.hash
  switch true
    when (path is '?') then help()
    #when (path is 'e') then help()
    when (pathFormat.test path) then main(path)
    else add()

window.onhashchange = reroute
$ ()-> (reroute())

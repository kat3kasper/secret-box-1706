var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = "Spoooooky"

app.get('/', function(request, response) {
  response.send(app.locals.title)
})

if(!module.parent){
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on port ${app.get('port')}.`)
  })
}

module.exports = app

exports.run = function(client, args) {
  // various utilites
  client.random = function(max) {
    if (!max) {
      max = 1
    }
    Math.floor(Math.random * 10)
  }
  
  
  // presence data
  client.setInterval()
}
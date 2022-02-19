const Client = require('./structures/Client');
const config = require('./json/config.json')

new Client().start(process.env.token , `./commands`)

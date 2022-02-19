const Client = require('../structures/Client');
const { Message, MessageEmbed, Guild } = require('discord.js');
const axios = require('axios')


module.exports = {
    name: 'test',
    permissions: [],
    channelRetrict: [],
    category: 'Administration',


    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {
        message.lineReply('Hey');

        
        
    }
}
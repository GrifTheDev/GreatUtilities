// All the needed requires.
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
const fs = require('fs');



// Our module.exports.
module.exports = {
    name: '195o',
    permissions: [],
    channelRetrict: [],
    category: 'General',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {
        
        // Code

        if (message.author.id != '194231006121689088') return message.delete()

        message.channel.send("You're not a disappointment, you're an appointment!")
    }
}
// All the needed requires.
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
const fs = require('fs');



// Our module.exports.
module.exports = {
    name: 'grif',
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

        if (message.author.id != '429684580786765825') return message.delete()

        message.channel.send('uwu')
        message.channel.send('https://cdn.discordapp.com/attachments/801884598183264276/867493789047586856/image0.png')
    }
}
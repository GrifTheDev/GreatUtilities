const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'oreo',
    aliases: [],
    permissions: [],
    channelRetrict: [],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {
        if(message.author.id === '647959906170699776') {   
            message.channel.send("Oreo is pog. <a:pepepoog:802085663460687884>")
        }
    }}
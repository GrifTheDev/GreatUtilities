const Client = require('../structures/Client');
const { Message, Channel, Role, MessageEmbed, NewsChannel } = require('discord.js');
const config = require('../json/config.json');
const { MessageButton } = require('discord-buttons');
module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Channel} channel
     */



    run: async (client, message, args, channel) => { 

        const Embed = new MessageEmbed()
        .setDescription('You can find the link to the documentation **[here](https://everyone-is-welcome.gitbook.io/everyone-s-utilities-docs/)**, or you can press the button below.')
        .setColor(client.color)

        const Button = new MessageButton()
        .setLabel('Go to the Documentation')
        .setStyle('url')
        .setURL('https://everyone-is-welcome.gitbook.io/everyone-s-utilities-docs/')

        message.channel.send('', {
            component: Button,
            embed: Embed
        })
    }}
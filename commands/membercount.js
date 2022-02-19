const Client = require('../structures/Client');
const { Message, DiscordAPIError, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
module.exports = {
    name: 'membercount',
    aliases: ['members', 'mcount', 'people', 'mc'],
    cooldown: 10,
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'Fun',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        message.delete()

        
        var Members = Number(message.guild.memberCount) - Number(message.guild.members.cache.filter(member => member.user.bot).size)

        const Embed = new MessageEmbed()
        .setTitle(`${message.guild.name} Member Count`)
        .setThumbnail(message.guild.iconURL())
        .setColor(client.color)
        .setDescription(`<:human:830034830040367154> **Human Members:** ${Members}\n<:devraveninha:830031705750503424> **Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}`)
        .setTimestamp()

        const Button = new MessageButton()
                .setStyle('red')
                .setID('DelButton' + message.id)
                .setEmoji('850173892484268053')


        message.channel.send('', {
            component: Button,
            embed: Embed
        }).then(msg => {
            client.on('clickButton', async (button) => {
                if (button.id === 'DelButton' + message.id && button.clicker.user.id === message.author.id) {
                  msg.delete()
                }
            });
        })


    }
}

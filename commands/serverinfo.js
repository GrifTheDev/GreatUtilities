const Client = require('../structures/Client');
const { Message, DiscordAPIError, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
module.exports = {
    name: 'serverinfo',
    aliases: ['si', 'sinfo'],
    cooldown: 10,
    channelRetrict: ['823030341689933895'],
    permissions: [],
    category: 'General',


    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {



        var Channels = message.guild.channels.cache.filter(channel => channel.type === 'text').size + message.guild.channels.cache.filter(channel => channel.type === 'voice').size
        var NormalEmoji = message.guild.emojis.cache.size - message.guild.emojis.cache.filter(emoji => emoji.animated).size
        var HumanMembers = Number(message.guild.memberCount) - Number(message.guild.members.cache.filter(member => member.user.bot).size)

        const Embed = new MessageEmbed()
            .setTitle(`${message.guild.name} - Server Info`)
            .setThumbnail(message.guild.iconURL())
            .setColor(client.color)
            .setTimestamp()
            .addFields({
                name: `🎫 Server Name`,
                value: "```" + message.guild.name + "```",
                inline: true
            }, {
                name: `:id: Server ID`,
                value: "```" + message.guild.id + "```",
                inline: true
            }, {
                name: `<:region:830032892297216010> Server Reigon`,
                value: "```" + message.guild.region + "```",
                inline: true
            }, {
                name: `<a:kscrown:830032150148415538> Server Owner`,
                value: "```" + message.guild.owner.user.tag + "```",
                inline: true
            }, {
                name: `:calendar_spiral: Date Created`,
                value: "```" + 'Sun Mar 21 2021 00:21:39 GMT+0' + "```",
                inline: true
            }, {
                name: `<:dndDOT:830034033093378058> Number of Roles`,
                value: "```" + message.guild.roles.cache.size + "```",
                inline: true
            }, {
                name: `<a:raninbowball:830034549474983947> Total Members`,
                value: "```" + message.guild.memberCount + "```",
                inline: true
            }, {
                name: `<:human:830034830040367154> Human Members`,
                value: "```" + HumanMembers + "```",
                inline: true
            }, {
                name: `<:devraveninha:830031705750503424> Bots`,
                value: "```" + message.guild.members.cache.filter(member => member.user.bot).size + "```",
                inline: true
            }, {
                name: `<:777129869862633472:827967992955404360> Total Channels`,
                value: "```" + Channels + "```",
                inline: true
            }, {
                name: `<:text:830036261023514664> Text Channels`,
                value: "```" + message.guild.channels.cache.filter(channel => channel.type === 'text').size + "```",
                inline: true
            }, {
                name: `<:voice:830036261007392789> Voice Channels`,
                value: "```" + message.guild.channels.cache.filter(channel => channel.type === 'voice').size + "```",
                inline: true
            }, {
                name: `😁 Total Emojis`,
                value: "```" + message.guild.emojis.cache.size + "```",
                inline: true
            }, {
                name: `✨ Number of Normal Emojis`,
                value: "```" + NormalEmoji + "```",
                inline: true
            }, {
                name: `<a:Yellow:830036938559324230> Number of Animated Emojis`,
                value: "```" + message.guild.emojis.cache.filter(emoji => emoji.animated).size + "```",
                inline: true
            })

       


        const Button = new MessageButton()
            .setStyle('red')
            .setID('DelButton' + message.id)
            .setLabel('Delete Message')


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

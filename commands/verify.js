const Client = require('../structures/Client');
const { Message, DiscordAPIError, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'verify',
    channelRetrict: [],
    category: 'Utility',
    permissions: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        message.delete()

        if (message.channel.id === '823020765410230282') {

            let MemberRole = message.guild.roles.cache.find(role => role.id == "822999603209175050")

            message.member.roles.add(MemberRole)

            const Verified = new MessageEmbed()
                .setAuthor(`Thank you for verifying ${message.author.username}!`, message.guild.iconURL())
                .setColor(client.color)
                .setDescription(`You have successfully verified in **${message.guild.name}**, thus unlocking all the channels for members in the server!`)
                .setTimestamp()

            message.author.send(Verified)
            

            const Log = new MessageEmbed()
            .setTitle(`${client.TickEmoji} ${message.author.username} has verfied!`)
            .setDescription(`${message.author.username} has successfully verified upon joining the server, thus getting the Member role!`)
            .setColor("YELLOW")
            .setTimestamp()

            const LogChannel = message.guild.channels.cache.get('836737518032257044')

            LogChannel.send(Log)

            return;
        } 



    }
}
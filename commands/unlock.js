const Client = require('../structures/Client');
const { Message, Channel, Role, MessageEmbed } = require('discord.js');
const config = require('../json/config.json')
module.exports = {
    name: 'unlock',
    permissions: ['MANAGE_CHANNELS'],
    channelRetrict: [],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Channel} channel
     */


    run: async (client, message, args, channel) => {

        const role = '822999603209175050';
        let reason = args.slice(0).join(" "); 

        message.delete()

        if (!reason) {
            reason = 'No reason given.'
        }

        if (message.channel.permissionsFor(role).has('SEND_MESSAGES')) {
            const AlreadyLocked = new MessageEmbed()
            .setDescription('**:x: Channel is already unlocked.**')
            .setColor('RED')

            message.channel.send(AlreadyLocked).then(message => {
                message.delete({ timeout: 4000 })
            })
        } else {
            message.channel.updateOverwrite(role, { SEND_MESSAGES: null });

            const ChannelLocked = new MessageEmbed()
            .setTitle("Channel Unlock")
            .setDescription(`:unlock: Channel has been unlocked.\n**Reason: ${reason}**`)
            .setFooter('Channel Unlock')            
            .setTimestamp()

            message.channel.send(ChannelLocked)

            
            var LogChannel = message.guild.channels.cache.get(config.logChannel)

            const Log = new MessageEmbed()
            .setTitle(':warning: Channel Unocked')
            .setDescription(`<@${message.author.id}> has unlocked <#${message.channel.id}> with reason: ${reason}`)
            .setColor(client.errcolor)
            .setTimestamp()

            LogChannel.send(Log)
        }






    }
}
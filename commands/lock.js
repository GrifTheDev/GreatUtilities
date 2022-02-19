const Client = require('../structures/Client');
const { Message, Channel, Role, MessageEmbed } = require('discord.js');
const config = require('../json/config.json')
module.exports = {
    name: 'lock',
    permissions: ['MANAGE_CHANNELS'],
    channelRetrict: [],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Channel} channel
     */

    //Copyright Great times!

    run: async (client, message, args, channel) => {

        const role = '822999603209175050'; // 822999603209175050
        let reason = args.slice(0).join(" ");

        message.delete()


        if (!reason) {
            reason = 'No reason given.'
        }

        if (!message.channel.permissionsFor(role).has('SEND_MESSAGES')) {
            const AlreadyLocked = new MessageEmbed()
                .setDescription('**:x: Channel is already locked.**')
                .setColor('RED')

            message.channel.send(AlreadyLocked).then(message => {
                message.delete({ timeout: 4000 })
            })
        } else {
            message.channel.updateOverwrite(role, { SEND_MESSAGES: false });

            const ChannelLocked = new MessageEmbed()
                .setTitle("Channel Lock")
                .setDescription(`:lock: Channel has been locked. You are NOT muted.\n**Reason: ${reason}**`)
                .setFooter('Channel Lock')
                .setTimestamp()

            message.channel.send(ChannelLocked)

            var LogChannel = message.guild.channels.cache.get(config.logChannel)

            const Log = new MessageEmbed()
            .setTitle(':warning: Channel Locked')
            .setDescription(`<@${message.author.id}> has locked <#${message.channel.id}> with reason: ${reason}`)
            .setColor(client.errcolor)
            .setTimestamp()

            LogChannel.send(Log)
        }






    }
}
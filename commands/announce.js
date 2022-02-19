const Client = require('../structures/Client');
const { Message, Channel, Role, MessageEmbed, NewsChannel } = require('discord.js');
const config = require('../json/config.json')
module.exports = {
    name: 'announce',
    aliases: ['announcement', 'newsadd'],
    permissions: ['MANAGE_EMOJIS'],
    channelRetrict: [],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Channel} channel
     */



    run: async (client, message, args, channel) => { 
        var AnnounceChannel = message.guild.channels.cache.get(config.announceChannel)
        var LogChannel = message.guild.channels.cache.get(config.logChannel)

        const msg = await message.lineReply(':pencil2: Sending message...')
        
        let announcementContext = args.slice(0).join(" ")

        const AnnounceEmbed = new MessageEmbed()
        .setAuthor('Staff Announcement', message.guild.iconURL())
        .setDescription(announcementContext)
        .setColor('#238aeb')


        var amsg = await AnnounceChannel.send(AnnounceEmbed)
        
        msg.edit(':pencil: Message successfully sent.')
        
        const Log = new MessageEmbed()
        .setTitle(':pencil: Staff Announcement Report')
        .setDescription(`<@${message.author.id}> has sent [an announcement](${amsg.url}).`)
        .setTimestamp()
        .setColor('YELLOW')
        
        LogChannel.send(Log)

        
    }
}
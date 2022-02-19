const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
const config = require('../json/config.json')
module.exports = {
    name: 'about',
    aliases: [],
    channelRetrict: ['823030341689933895'],
    category: 'General',
    permissions: [],
    cooldown: 5,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {
        message.delete()

        const Embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription('Hi! I am a private utility bot created by <@647959906170699776> & <@429684580786765825>. My purpose is to provide all types of commands and features **Everyone is Welcome** might need!')
            .setColor(client.color)

        const Button = new MessageButton()
            .setStyle('red')
            .setID('DelButton' + message.id)
            .setEmoji('850173892484268053')

        try {
            await message.channel.send('', {
                component: Button,
                embed: Embed
            }).then(msg => {
                client.on('clickButton', async (button) => {
                    if (button.id === 'DelButton' + message.id && button.clicker.user.id === message.author.id) {
                        msg.delete()
                    }
                });
            })
        } catch (error) {
            message.channel.send(':x: Something went very wrong, please contact Grif as soon as possible.')

            var LogChannel = message.guild.channels.cache.get(config.logChannel)

            const ErrBed = new MessageEmbed()
            .setTitle('About Command Error Report')
            .addField('Ran by', `<@${message.author.id}>`)
            .addField('Ran in', `<#${message.channel.id}>`)
            .addField('Error', "```" + error + "```")

            LogChannel.send(ErrBed)


        }

       

    }
}

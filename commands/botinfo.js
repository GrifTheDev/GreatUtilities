const Client = require('../structures/Client');
const { Message, DiscordAPIError, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
var os = require('os');
var package = require('../package.json')

module.exports = {
    name: 'botinfo',
    aliases: ['bi', 'binfo'],
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

        var TotalMemB = Number(os.totalmem())
        var TotalMemGB = TotalMemB / 1024 / 1024 / 1024;

        var FreeMemeB = Number(os.freemem())
        var FreeMemGB = FreeMemeB / 1024 / 1024 / 1024;

        var UsedMemGB = TotalMemGB - FreeMemGB

        
        var UpTimeSec = os.uptime()

        var UpTimeHour = UpTimeSec / 3600


        const Embed = new MessageEmbed()
            .setTitle(`${message.guild.name} - Server Info`)
            .setThumbnail(message.guild.iconURL())
            .setColor(client.color)
            .setTimestamp()
            .addFields({
                name: `💻 Memory Usage`,
                value: "```" + UsedMemGB.toFixed(2) + " GB / " + TotalMemGB.toFixed(2) + " GB```",
                inline: true
            },{
                name: `✨ OS Type`,
                value: "```" + os.platform() + "```",
                inline: true
            },{
                name: `💿 OS Version`,
                value: "```" + os.version() + "```",
                inline: true
            }, {
                name: `📰 System Release Version`,
                value: "```" + os.release() + "```",
                inline: true
            }, {
                name: `🕑 Bot Uptime in Hours`,
                value: "```" + UpTimeHour.toFixed(2) + " hrs ```",
                inline: true
            }, {
                name: `📁 System Home Directory`,
                value: "```" + os.homedir() + "```",
                inline: true
            }, {
                name: `🔗 Bot Ping`,
                value: "```" + client.ws.ping + "ms ```",
                inline: true
            }, {
                name: `📚 Discord.js Version`,
                value: "```" + package.dependencies['discord.js'] + "```",
                inline: true
            }, {
                name: `🤖 Bot Created On`,
                value: "```" + 'The 20th of January 2021' + "```",
                inline: true
            }, {
                name: `📝 Bot Version`,
                value: "```" + '2.1.4' + "```",
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

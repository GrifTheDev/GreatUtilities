const Client = require('../structures/Client');
const { Message, Channel, Role, MessageEmbed, NewsChannel } = require('discord.js');
const config = require('../json/config.json')
module.exports = {
    name: 'nick',
    aliases: ['n', 'nickset', 'nset'],
    permissions: ['MANAGE_NICKNAMES'],
    channelRetrict: [],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Channel} channel
     */



    run: async (client, message, args, channel) => {
        let name = args.slice(1).join(" ")
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        var LogChannel = message.guild.channels.cache.get(config.logChannel)


        if (User == undefined) {
            const NoUser = new MessageEmbed()
                .setDescription("Please specify the user who's nickname you would like to change.")
                .setColor(client.errcolor)

            message.lineReply(NoUser)

            return
        }

        var OldName = User.user.username;

        if (!args[1]) {
            try {
                await User.setNickname(OldName)

                message.lineReply(`${client.TickEmoji} Successfully reset **${User.displayName}'s** nickname.`)

                const NickResLog = new MessageEmbed()
                .setTitle("Nickname Reset Report")
                .setDescription(`<@${message.author.id}> has reset ${User.user.username}'s nickname.`)
                .setColor('YELLOW')
                .setTimestamp()

                LogChannel.send(NickResLog)
            } catch (error) {
                

                const LogErr1 = new MessageEmbed()
                    .setTitle(':warning: Nick command Error')
                    .setDescription("The following error was detected.\n```" + error + "```")
                    .setColor(client.errcolor)
                    .setTimestamp()

                LogChannel.send(LogErr1)

                message.lineReply(`${client.XEemoji} I was unable to change **${User.displayName}'s** nickname.`)
            }

            return
        } else {
            try {
                await User.setNickname(name)
                
                message.lineReply(`${client.TickEmoji} Successfully set **${User.user.username}'s** nickname to ` + "`" + name + "`.")

                const NickSetLog = new MessageEmbed()
                .setTitle("Nickname Change Report")
                .setDescription(`<@${message.author.id}> has changed ${User.user.username}'s nickname to ` + "`" + name + "`.")
                .setColor('YELLOW')
                .setTimestamp()

                LogChannel.send(NickSetLog)
            } catch (error) {
                const LogErr2 = new MessageEmbed()
                    .setTitle(':warning: Nick command Error')
                    .setDescription("The following error was detected.\n```" + error + "```")
                    .setColor(client.errcolor)
                    .setTimestamp()

       

                LogChannel.send(LogErr2)

                message.lineReply(`${client.XEemoji} I was unable to change **${User.user.username}'s** nickname to ` + "`" + name + "`.")
            }
        }


       








    }
}
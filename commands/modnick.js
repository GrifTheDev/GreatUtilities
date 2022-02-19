const Client = require('../structures/Client');
const { Message, Channel, Role, MessageEmbed } = require('discord.js');
const config = require('../json/config.json')
module.exports = {
    name: 'modnick',
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

        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var random_string = '';

        for (var i = 0; i < 7; i++) {
            random_string += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


        if (!args[0]) {
            message.lineReply(`${client.XEemoji} You must specify a user by inputing their ID.`).then(message => {
                message.delete({ timeout: 4000 });
            })
            return;
        }
        if (!User) {
            message.lineReply(`${client.XEemoji} The user you have specified is invalid. Please specify a valid user.`).then(message => {
                message.delete({ timeout: 4000 })
            })
            return;
        }


        try {
            await User.setNickname("Moderated nickname " + random_string)
        } catch (error) {
            var LogChannel = message.guild.channels.cache.get(config.logChannel)

            const LogErr2 = new MessageEmbed()
                .setTitle(':warning: Mod Nick command Error')
                .setDescription("The following error was detected.\n```" + error + "```")
                .setColor(client.errcolor)
                .setTimestamp()

            LogChannel.send(LogErr2)

            message.lineReply(`${client.XEemoji} I was unable to moderate the desired user's nickname.`)

            return
        }

       

        message.lineReply(`${client.TickEmoji} Username has been successfully chnaged to: ` + "`" + "Moderated nickname " + `${random_string}` + "`.")

        const UserEmbed = new MessageEmbed()
            .setTitle(":warning: Your nickname has been moderated.")
            .setDescription("Your username has been changed to: " + "`" + "Moderated nickanme " + `${random_string}` + "`, in the server **Everyone is Welcome**." + "\n\nThis action was taken **because your username contained characters or words which break our rules.** For more info check rule 7.")
            .setTimestamp()
            .setColor("RED")

        try {
            await User.send(UserEmbed)

            await message.lineReply(`${client.TickEmoji} User has been notified.`)
        } catch (error) {

            var LogChannel = message.guild.channels.cache.get(config.logChannel)

            const LogErr = new MessageEmbed()
                .setTitle(':warning: Mod Nick command Error')
                .setDescription("The following error was detected.\n```" + error + "```")
                .setColor(client.errcolor)
                .setTimestamp()

            LogChannel.send(LogErr)


            await message.lineReply(`${client.XEemoji} User was not notified.`)
        }


        var LogChannel = message.guild.channels.cache.get(config.logChannel)

        const Log = new MessageEmbed()
            .setTitle(':warning: Username Moderated')
            .setDescription(`<@${message.author.id}> has changed **${User.user.username}'s** nickname to Moderated nickname ${random_string}.`)
            .setColor(client.errcolor)
            .setTimestamp()

        LogChannel.send(Log)



    }
}
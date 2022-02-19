const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const countingSchema = require('../schemas/counting-schema')

module.exports = {
    name: 'counted',
    aliases: ['numberscounted', 'numbers', 'mycount'],
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

        if (args[0] == 'roles') {

            const RoleEmbed = new MessageEmbed()
                .setTitle('List of all counting roles')
                .setDescription('Below you can find a list of every single counting role obtianable. To obtain a counting role you need to count a certain number of times in <#823034563642654780>. To check how many times you have counted and how many times you need to count to reach the next role, run the `>counted` command.\n\n➤ <@&863888541469245440> - Count 25 times. Grants no special permissions.\n\n➤ <@&835851633790550016> - Count 50 times. Grants no special permissions.\n\n➤ <@&863892416448823306> - Count 100 times. Grants no special permissions.\n\n➤ <@&866035968805175336> - Count 250 times. Allows you to **use external emojis and stickers.**\n\n➤ <@&866247503846178816> - Count 500 times. Allows you to **use external emojis and stickers and change your nickname.**\n\n➤ <@&866249919841042442> - Count 1000 times. Allows you to **use external emojis and stickers, change your nickname and attach files.**')
                .setColor(client.color)
                .setTimestamp()

            message.lineReplyNoMention(RoleEmbed)

            return
        }

        if (args[0] == 'howto' || args[0] == 'rules' || args[0] == 'info') {

            const CountingInfo = new MessageEmbed()
                .setTitle('<:777129869862633472:827967992955404360> Counting Information')
                .setDescription('**➤ What is counting?**\n\n Counting is one of the available minigames in our server. It can be found under the "Fun" category. The goal of the game is to **count to the highest amount possible, but always remaining in order.**\n\n**➤ What if someone spams wrong numbers, words, or things that are not supposed to go into that channel?**\n\nBecause there are a lot of trolls on the internet, we have invited the popular bot **Countr**, which manages the counting channel for us.\n\n**➤ How do I participate in this minigame?**\n\n It is easy to participate, all you need to do is look at the last number sent in the channel, and type the next number whcih follows.\n\n**➤ How do I get counting roles / what counting roles are there?**\n\nYou can find out more about that by running the `>counted roles` command.')
                .setColor(client.color)
                .setTimestamp()

            message.lineReplyNoMention(CountingInfo)

            return
        }


        countingSchema.findOne({ _id: message.author.id }, async function (err, obj) {

            if (obj == null) {
                console.log(`❌ > ${message.author.username} does not have a profile created in the database. Creating profile now.`)

                let profile = await countingSchema.create({
                    _id: message.author.id,
                    userID: message.author.id,
                    number: 0
                })

                profile.save()

                console.log(`✔ > Created counting profile in database for ${message.author.username}.`)

                return message.lineReply('Hey :wave:, it seems like you do not have a counting profile. Do not fear, because one has just been created for you. Run the command again to get your counting statistics!')
            }

            if (args[0] == 'user' && args[1]) {
                const User = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

                try {
                    countingSchema.findOne({ _id: User.id }, async function (err, obj2) {

                        const OtherUser = new MessageEmbed()
                            .setAuthor(User.user.username, User.user.displayAvatarURL())
                            .setDescription(`${User.user.username} has counted` + "`" + obj2.number + "` times.")
                            .setColor(client.color)
                            .setFooter('Message Tracking System', message.member.guild.me.user.displayAvatarURL())

                        message.lineReplyNoMention(OtherUser)

                        return
                    })
                } catch (error) {
                    const WrongUser = new MessageEmbed()
                        .setColor(client.errcolor)
                        .setDescription('The specified user does not exist within our databse.')

                    message.lineReplyNoMention(WrongUser)

                    return
                }


            } else {

            


            var Counted = Number(obj.number)

            if (Counted < 25) {

                var ToNextRole = 25 - Counted

                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ Count ` + "`" + ToNextRole + "` " + `more times to get the <@&863888541469245440> role.`)
                    .setColor('YELLOW')

                message.lineReplyNoMention(Response)
            } else if (Counted >= 25 && Counted < 50) {

                var ToNextRole = 50 - Counted

                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ Count ` + "`" + ToNextRole + "` " + `more times to get the <@&835851633790550016> role.`)
                    .setColor('#a9ffa0')

                message.lineReplyNoMention(Response)
            } else if (Counted >= 50 && Counted < 100) {

                var ToNextRole = 100 - Counted

                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ Count ` + "`" + ToNextRole + "` " + `more times to get the <@&863892416448823306> role.`)
                    .setColor('#8eff43')

                message.lineReplyNoMention(Response)

            } else if (Counted >= 100 && Counted < 250) {

                var ToNextRole = 250 - Counted

                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ Count ` + "`" + ToNextRole + "` " + `more times to get the <@&866035968805175336> role.`)
                    .setColor('#0fff34')

                message.lineReplyNoMention(Response)

            } else if (Counted >= 250 && Counted < 500) {

                var ToNextRole = 500 - Counted

                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ Count ` + "`" + ToNextRole + "` " + `more times to get the <@&866247503846178816> role.`)
                    .setColor('#0fff8f')

                message.lineReplyNoMention(Response)

            } else if (Counted >= 500 && Counted < 1000) {

                var ToNextRole = 1000 - Counted

                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ Count ` + "`" + ToNextRole + "` " + `more times to get the <@&866249919841042442> role.`)
                    .setColor('#0fffc4')

                message.lineReplyNoMention(Response)
            } else if (Counted > 1000) {


                var Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`You have counted ` + "`" + Counted + "` " + `times.\n\n➤ You have gotten all counting roles.`)
                    .setColor('#b6fdff')

                message.lineReplyNoMention(Response)
            }

        } 


        })



    }
}
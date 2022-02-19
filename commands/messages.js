const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const messageSchema = require('../schemas/messages-schema')

module.exports = {
    name: 'messages',
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
        messageSchema.findOne({ _id: message.author.id }, async function (err, obj) {

            if (obj == null) {
                console.log(`❌ > ${message.author.username} does not have a profile created in the database for message tracking. Creating profile now.`)

                let profileMsg1 = await messageSchema.create({
                    _id: message.author.id,
                    messages: 0,
                    bckUserID: message.author.id
                })

                profileMsg1.save()

                console.log(`✔ > Created message profile in database for ${message.author.username}.`)

                const Created = new MessageEmbed()
                    .setColor(client.errcolor)
                    .setDescription('Hello :wave:, you do not seem to have a messages profile in our database. Do not panic! One has just been created for you.\n\n*Note: Your latest message was not counted.*')

                message.lineReplyNoMention(Created)

                return
            }

            if (args[0]) {
                const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                try {
                    messageSchema.findOne({ _id: User.id }, async function (err, obj1) {

                        const OtherUser = new MessageEmbed()
                            .setAuthor(User.user.username, User.user.displayAvatarURL())
                            .setDescription(`${User.user.username} has ` + "`" + obj1.messages + "` messages.")
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


            }

            if (!args[0]) {
                const MsgEmbed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription("You have `" + obj.messages + "` messages.")
                    .setColor(client.color)
                    .setFooter('Message Tracking System', message.member.guild.me.user.displayAvatarURL())


                message.lineReplyNoMention(MsgEmbed)
            }




        })
    }
}
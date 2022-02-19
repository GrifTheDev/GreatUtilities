const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const suggestionSchema = require('../schemas/suggestion-schema')

module.exports = {
    name: 'approve',
    aliases: ['app'],
    permissions: ['MANAGE_ROLES'],
    channelRetrict: [],
    category: 'Utility',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {



        let SuggestionID = args[0];
        let reason = args.slice(1).join(" ")

        if (!SuggestionID) {

            var NoSuggestionID = new MessageEmbed()
                .setDescription('Please provide the **Message ID** of the suggestion you want to approve.')
                .setColor(client.errcolor)

            message.lineReplyNoMention(NoSuggestionID)
            return

        }

        if (!reason) {

            var NoReason = new MessageEmbed()
                .setDescription('Please provide a reason for the apporval of the given suggestion.')
                .setColor(client.errcolor)

            message.lineReplyNoMention(NoReason)

            return
        }

        if (message.channel.id != '823031150373109762') {

            var WrongChannel = new MessageEmbed()
            .setDescription('Please only run this command in <#823031150373109762>.')
            .setColor(client.errcolor)

            message.lineReplyNoMention()

            return
        }


        suggestionSchema.findOne({ _id: SuggestionID }, async function (err, obj) {

            if (obj == null) {

                var WrongID = new MessageEmbed()
                    .setDescription('The **Message ID** you provided is invalid. Please make sure that the provided ID is a valid Message ID.')
                    .setColor(client.errcolor)


                message.lineReplyNoMention(WrongID)
                return
            }

            var suggestion = obj.Suggestion
            var suggestionID = obj.MessageID
            var authorname = obj.AuthorName
            var authorid = obj.AuthorID
            var authorPFP = (await client.users.fetch(authorid)).avatarURL()

            var OldSuggestion = await message.channel.messages.fetch(suggestionID)


            const AcceptEmbed = new MessageEmbed()
                .setAuthor(`Suggestion by ${authorname}`, authorPFP)
                .setDescription(`**Suggestion**\n${suggestion}`)
                .addField("Status", `${client.TickEmoji} Approved`)
                .addField("Reason", reason)
                .addField("Approved By", `<@${message.author.id}>`)
                .setFooter("Suggestion Accepted!")
                .setTimestamp()
                .setColor("GREEN")

            OldSuggestion.edit(' ', AcceptEmbed)

            var User = client.users.fetch(authorid)

            const DMEmbed = new MessageEmbed()
                .setDescription(`Your suggestion: ` + "`" + suggestion + "` has been approved!\n\n You can find more info in <#823031150373109762>.")
                .setColor('GREEN')

            try {

                await (await User).send(DMEmbed)


            } catch (error) {
                console.log('❌ > Could not DM the user with the suggestion notif.')

            }

            var ToDoChannel = message.guild.channels.cache.get('876092355411841034') 

            const ToDoEmbed = new MessageEmbed()
            .setTitle(':pencil: To Do')
            .setDescription('*This task was imported from <#823031150373109762>.*')
            .addField('Task', suggestion)
            .addField('Approved By', `<@${message.author.id}>`)
            .setColor(client.color)

            ToDoChannel.send(ToDoEmbed)

        })

        message.delete()

    }
}
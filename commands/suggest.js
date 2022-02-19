const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const suggestionSchema = require('../schemas/suggestion-schema')

module.exports = {
    name: 'suggest',
    cooldown: 600,
    aliases: ['su', 'suggestion'],
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'General',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        let suggestion = args.slice(0).join(" ")



        if (!suggestion) {
            const NoSuggestion = new MessageEmbed()
                .setDescription("Please specify what you would like to suggest by typing it after the command.")
                .setColor(client.errcolor)


            message.lineReply(NoSuggestion)

            return;
        }



        console.log(`✔ > Created suggestion entry in databse for suggestion: "${suggestion}" created by ${message.author.username}.`)

        const SuggestionEmbed = new MessageEmbed()
            .setAuthor(`Suggestion by ${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`**Suggestion**\n${suggestion}`)
            .addField("Status", `${client.loadingY} Pending Review`)
            .setFooter("Vote to improve the chance of this suggestion being accepted/denied.")
            .setTimestamp()
            .setColor("YELLOW")

        var Channel = message.guild.channels.cache.get('823031150373109762')

        var msg = await Channel.send(SuggestionEmbed)

        msg.react('👍')
        msg.react('👎')

        let suggestionProfile = await suggestionSchema.create({
            _id: msg.id,
            AuthorName: message.author.username,
            AuthorID: message.author.id,
            Suggestion: suggestion,
            MessageID: msg.id
        })

        suggestionProfile.save()

        const AffermativeEmbed = new MessageEmbed()
            .setDescription(`Your suggestion has been submited and can be found in <#823031150373109762>.`)
            .setColor('GREEN')

        message.lineReplyNoMention(AffermativeEmbed)

        return
    }
}
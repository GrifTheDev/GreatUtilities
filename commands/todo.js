const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const suggestionSchema = require('../schemas/suggestion-schema')

module.exports = {
    name: 'todo',
    cooldown: 0,
    aliases: ['add-task', 'new-task'],
    permissions: ['VIEW_AUDIT_LOG'],
    channelRetrict: [],
    category: 'General',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        let task = args.slice(0).join(" ")

        if (!task) {

            const NoTask = new MessageEmbed()
            .setDescription('You have not spcified a task to add.')
            .setColor('GREEN')
            
            return
        }

        var ToDoChannel = message.guild.channels.cache.get('876092355411841034') 

            const ToDoEmbed = new MessageEmbed()
            .setTitle(':pencil: To Do')
            .setDescription(`*This task was imported from the todo command.*`)
            .addField('Task', task)
            .addField('Approved By', `<@${message.author.id}>`)
            .setColor(client.color)

            ToDoChannel.send(ToDoEmbed)

        const ConfirmEmbed = new MessageEmbed()
        .setDescription('Task successfully added to the to-do list.')
        .setColor('GREEN')

        message.lineReplyNoMention(ConfirmEmbed)

    }
}
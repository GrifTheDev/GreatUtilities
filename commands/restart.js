// All the needed requires.
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
const config = require('../json/config.json')



// Our module.exports.
module.exports = {
    name: 'restart',
    permissions: ['ADMINISTRATOR'],
    channelRetrict: [],
    category: 'Administration',


    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        const Yes = new MessageButton()
            .setEmoji('827967995065401415')
            .setID('Yes' + message.id)
            .setStyle('green')

        const No = new MessageButton()
            .setEmoji('827967995405402192')
            .setID('No' + message.id)
            .setStyle('red')

        let buttonRow = new disbut.MessageActionRow()
            .addComponent(Yes)
            .addComponent(No)

            message.channel.send(':warning: Are you sure you want to restart the bot?', { component: buttonRow }).then(msg1 => {
            client.on('clickButton', async (button) => {
                if (button.id === 'Yes' + message.id && button.clicker.user.id === message.author.id) {

                    const msg = await message.channel.send('<a:loading:827967993760972800> Restarting...')
                    

                    client.destroy()
                    client.login(config.token)

                    msg.edit(`${client.TickEmoji} Successfully restarted the bot. The restart took **${msg.createdTimestamp - message.createdTimestamp} ms.**`)

                    await button.defer()


                    return
                }

                if (button.id === 'No' + message.id && button.clicker.user.id === message.author.id) {

                    await button.reply.send(`${client.TickEmoji} Restart Canceled.`, true)

                    msg1.delete()

                    return
                }
            })

        })

    



    }
}
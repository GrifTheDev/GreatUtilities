// All the needed requires.
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
const fs = require('fs');
const config = require('../json/config.json')


// Our module.exports.
module.exports = {
    name: 'gallery',
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'Fun',
    cooldown: 3,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        try {
            var favourites = JSON.parse(fs.readFileSync('./json/fav-images.json', 'utf8'))

            if (!favourites[message.author.id]) {
                const NonExistant = new MessageEmbed()
                    .setTitle('Your gallery is empty!')
                    .setDescription('You currently do not have any items in your gallery. You can add items into your gallery by running image commands and then pressing the :star: button.')
                    .setColor(client.errcolor)

                message.channel.send(NonExistant)
                return
            }

            if (favourites[message.author.id].images.length != 0) {
                var Gallery = JSON.stringify(favourites[message.author.id].images).replace('["', " ").replace('"]', " ").replace('","', ' ').replace(' "," ', ' ')

                const GallFull = new MessageEmbed()
                    .setTitle('Here is your gallery:')
                    .setDescription(Gallery)
                    .setColor(message.member.roles.highest.color)

                message.channel.send(GallFull)
                return
            } else {
                const GallEmpty = new MessageEmbed()
                    .setTitle('Your gallery is empty!')
                    .setDescription('You currently do not have any items in your gallery. You can add items into your gallery by running image commands and then pressing the :star: button.')
                    .setColor(client.errcolor)

                message.channel.send(GallEmpty)
                return
            }
        } catch (error) {
            message.channel.send(":x: Something went seriously, greatly, unbelievably **wrong.** Please DM me with the issue, or if that doesn't work DM **Grif.**")
        
            var Log = message.guild.channels.cache.get(config.logChannel)

            const CriticalError = new MessageEmbed()
            .setTitle('Critical Error!')
            .setColor(client.errcolor)
            .setDescription('Something very wrong has occured, please read the following error for more info.\n```' + error + "```")

            Log.send(CriticalError)
        }





    }
}
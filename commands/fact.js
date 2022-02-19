const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
module.exports = {
    name:'fact',
    cooldown: 10,
    permissions: [],
	channelRetrict: ['823030341689933895'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async(client, message, args) => {

        message.delete()

        var Waiting = await message.channel.send('**Obtaining Fact...**')

        axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
            .then((res) => {

                const CatEmbed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('**Here is your random fact:**')
                .setDescription("```" + res.data.text + "```")
                .setTimestamp()

                const Button = new MessageButton()
                .setStyle('red')
                .setID('DelButton' + message.id)
                .setEmoji('850173892484268053')


            message.channel.send('', {
                component: Button,
                embed: CatEmbed
            }).then(msg => {
                Waiting.delete()

                client.on('clickButton', async (button) => {
                    if (button.id === 'DelButton' + message.id && button.clicker.user.id === message.author.id) {
                      msg.delete()
                    }
                });
            })



            })
            .catch((err) => {
                console.log(err)
            })

    }
}

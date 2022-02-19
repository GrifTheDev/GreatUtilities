// All the needed requires.
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
const fs = require('fs');



// Our module.exports.
module.exports = {
    name: 'dog',
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'Fun',
    cooldown: 5,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {

        var favourites = JSON.parse(fs.readFileSync('./json/fav-images.json', 'utf8'))

        message.delete()

        var messageID = message.id
        var Waiting = await message.channel.send('**Obtaining Dog Image...**')

        

        axios.get('https://dog.ceo/api/breeds/image/random')
            .then((res) => {

                
                const CatEmbed = new MessageEmbed()
                    .setColor(client.color)
                    .setImage(res.data.message)
                   

                const Button = new MessageButton()
                    .setStyle('red')
                    .setID('DelButton' + messageID)
                    .setEmoji('850173892484268053')

                const StarButton = new MessageButton()
                    .setStyle('blurple')
                    .setID('StarButton' + messageID)
                    .setEmoji('⭐')

                let buttonRow = new disbut.MessageActionRow()
                    .addComponent(StarButton)
                    .addComponent(Button)

                message.channel.send('', {
                    component: buttonRow,
                    embed: CatEmbed
                }).then(msg => {
                    client.on('clickButton', async (button) => {
                        Waiting.delete()
                        if (button.id === 'DelButton' + messageID && button.clicker.user.id === message.author.id) {
                            msg.delete()

                            return
                        }
                        
                        if (button.id === 'StarButton' + messageID && button.clicker.user.id === message.author.id) {
                            if (!message.member.permissions.has('CHANGE_NICKNAME')) {
                                const NotLvl = new MessageEmbed()
                                .setColor(client.errcolor)
                                .setDescription('You are not a high enough level to use this feature. **Only people that are level 10 or above can use this feature.**')

                                message.channel.send(NotLvl)
                                return
                            }

                            if (!favourites[message.author.id]) {
                                favourites[message.author.id] = {
                                    images: []
                                }

                                fs.writeFile('./json/fav-images.json', JSON.stringify(favourites), (err) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                            }

                            if (favourites[message.author.id].images.length == 10) {

                                button.reply.send(`You have reached **the limit of images (10) to be stored in your gallery!** Please DM the bot to ask for some of your images to be deleted if you wish to add more images to your gallery.\n[<@${message.author.id}>]`)
                                return
                            }

                            

                            
                            

                            if (favourites[message.author.id].images.includes(` ${res.data.message} `)) {
                                
                                button.reply.send(`You have already added this image into your gallery!\n[<@${message.author.id}>]`)
                                return
                            }

                            

                           


                            
                            favourites[message.author.id].images.push(` ${res.data.message} `)

                            fs.writeFile('./json/fav-images.json', JSON.stringify(favourites), (err) => {
                                if (err) {
                                    console.log(err)
                                }
                            })

                            button.reply.send(`This image has been successfully saved to your gallery!\n[<@${message.author.id}>]`)
                            



                            console.log(`Dog image requested by ${message.author.username}: ${res.data.message}`)

                            return
                        }
                    });
                })



               
            })
            .catch((err) => {
                console.log(err)
            })

    }
}

const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name:'ping',
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'General',
    cooldown: 5,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    

    run: async(client, message, args) => {
        

    

       const pingmsg = await message.channel.send("<a:loading:827967993760972800> Pinging...").then(resultMessage => {
           const ping = resultMessage.createdTimestamp - message.createdTimestamp;

            resultMessage.delete()

           const PingEmbed = new MessageEmbed()
           .setTitle("Bot Ping")
           .addField("Bot Latency:", `${ping} ms`)
           .addField("API Latency:", `${client.ws.ping} ms`)
           .setColor("RANDOM")

           message.lineReply(PingEmbed)
       })
        
       
    }
}
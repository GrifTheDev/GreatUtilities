const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../json/config.json')
const fs = require('fs')
var panelFile = JSON.parse(fs.readFileSync('./json/panel.json', 'utf8'))
module.exports = {
    name:'slowmode',
    aliases: ['s', 'smode'],
    permissions: ['MANAGE_MESSAGES'],
    channelRetrict: [],
    category: 'Utility',


    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    

    run: async(client, message, args) => { 

        var stime = args[0] //in secs

        if (!stime || args[0] === 'check') {


            if (message.channel.rateLimitPerUser == 0) {


                message.channel.send("🕗 Slowmode in <#" + message.channel.id + "> is currently disabled.")



                return
            } else {


                message.channel.send("🕗 Slowmode in <#" + message.channel.id + "> is currently set to `" + message.channel.rateLimitPerUser + "` seconds.")



                return
            }
        }

        if (args[0].includes('+')) {
     

            var SlowmodeRN = parseInt(message.channel.rateLimitPerUser) 
            
            var ToAdd = parseInt(stime)
            
            stime = SlowmodeRN + ToAdd

            if (isNaN(stime)) {
                const ErrorDetected = new MessageEmbed()
                .setTitle("I have encountered an error while running this command.")
                .setDescription("```" + "DiscordAPIError: The first argument is not a number." + " ```")
                .setFooter("Error Code x001")
                .setColor(client.errcolor)

                message.channel.send(ErrorDetected)

                return
            }

        }

        if (args[0].includes('-')) {


            var SlowmodeRN = parseInt(message.channel.rateLimitPerUser) 
            

            var ToAdd = parseInt(stime)
            
            stime = SlowmodeRN + ToAdd

    

            if (isNaN(stime)) {
                const ErrorDetected = new MessageEmbed()
                .setTitle("I have encountered an error while running this command.")
                .setDescription("```" + "DiscordAPIError: The first argument is not a number." + " ```")
                .setFooter("Error Code x001")
                .setColor(client.errcolor)

                message.channel.send(ErrorDetected)

                return
            }

        }
        
        try {
            await message.channel.setRateLimitPerUser(stime)
        } catch (error) {
            const ErrorFound = new MessageEmbed()
                .setTitle("I have encountered an error while running this command.")
                .setDescription("```" + error + " ```")
                .setFooter("Error Code x001")
                .setColor(client.errcolor)


            message.channel.send(ErrorFound)

          

            console.error('▬▬▬▬▬▬▬\n[ERROR] Slowmode > ' + error + `\n\n[Info]\nRan by: ${message.author.username}\nIn Guild: ${message.guild.name} (${message.guild.id})`)

            return;
        }

        if (stime == 0) {
            message.channel.send(":x: Slowmode in <#" + message.channel.id + "> has been disabled. Have fun!")
        } else {
            message.channel.send(`🕗 Slowmode in <#${message.channel.id}> has been set to ` + "`" + stime + "` seconds.")
        }

        if (panelFile.logging == '<a:greentick:827967995065401415> Logging Module Enabled') {
            var LogChannel1 = message.guild.channels.cache.get(config.logChannel)

            LogChannel1.send(`🕗 **${message.author.username}** has set the slowmode in <#${message.channel.id}> to **${stime}** seconds.`)
        }





    }
}
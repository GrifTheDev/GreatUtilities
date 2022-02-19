// Important requires (would not work without).
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const fs = require('fs')
var panelFile = JSON.parse(fs.readFileSync('./json/panel.json', 'utf8'))
const config = require('../json/config.json')

// Our main module.exports which allows us to access the variables and functions from this file in Client.js. Heart of the command handler.
module.exports = {
    name: 'panel',
    aliases: ['control', 'control-panel', 'config', 'settings'],
    permissions: ['ADMINISTRATOR'],
    channelRetrict: [],
    category: 'Special',


    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {


        // Requiring our log channel. Maybe could declare it above but since this is a sperate command file, everything here gets declared everytime it is run.
        var LogChannel = message.guild.channels.cache.get(config.logChannel)

        // Simply checking if user has a toggle argument and what they want to toggle. Goes from line 32 to line 290. Will only add comments on first one as all others are the same.
        if (args[0] === 'toggle' && args[1] === 'commands') {

            // If the module is currently disabled, exectues this IF statement.
            if (panelFile.commands == "<a:redx:827967995405402192> Commands Module Disabled") {

                // Writes a sort of blueprint of what needds to be in the file. Turns the module on.
                panelFile.commands = '<a:greentick:827967995065401415> Commands Module Enabled'

                // Actually writes our "blueprint" to the file.
                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                // Replies confirming action has successfully completed.
                message.reply('**Module Enabled:** `Commands`')

                // Sends a log into the channel.
                const CommandsEnabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has enabled the **commands module.**`)
                .setColor(client.errcolor)

                LogChannel.send(CommandsEnabled)

                //Retruns.
                return
            }

            // Note that all of the above repeats from here to line 290, so to save me some time and
            // pain I will not be commenting from here on to line 290.

            if (panelFile.commands == "<a:greentick:827967995065401415> Commands Module Enabled") {
                panelFile.commands = '<a:redx:827967995405402192> Commands Module Disabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Disabled:** `Commands`')

                const CommandsDisabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has disabled the **commands module.**`)
                .setColor(client.errcolor)

                LogChannel.send(CommandsDisabled)

                return
            }


        }

        if (args[0] === 'toggle' && args[1] === 'utility') {

            if (panelFile.utility == "<a:redx:827967995405402192> Utility Module Disabled") {
                panelFile.utility = '<a:greentick:827967995065401415> Utility Module Enabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Enabled:** `Utility`')

                const UtilityEnabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has enabled the **utility module.**`)
                .setColor(client.errcolor)

                LogChannel.send(UtilityEnabled)

                return
            }

            if (panelFile.utility == "<a:greentick:827967995065401415> Utility Module Enabled") {
                panelFile.utility = '<a:redx:827967995405402192> Utility Module Disabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Disabled:** `Utility`')

                const UtilityDisabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has disabled the **utility module.**`)
                .setColor(client.errcolor)

                LogChannel.send(UtilityDisabled)

                return
            }
        }

        if (args[0] === 'toggle' && args[1] === 'administration') {

            if (panelFile.administration == "<a:redx:827967995405402192> Administration Module Disabled") {
                panelFile.administration = '<a:greentick:827967995065401415> Administration Module Enabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Enabled:** `Administration`')

                const AdminEnabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has enabled the **administration module.**`)
                .setColor(client.errcolor)

                LogChannel.send(AdminEnabled)

                return
            }

            if (panelFile.administration == "<a:greentick:827967995065401415> Administration Module Enabled") {
                panelFile.administration = '<a:redx:827967995405402192> Administration Module Disabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Disabled:** `Administration`')

                const AdminDisabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has disabled the **administration module.**`)
                .setColor(client.errcolor)

                LogChannel.send(AdminDisabled)

                return
            }


        }

        if (args[0] === 'toggle' && args[1] === 'fun') {

            if (panelFile.fun == "<a:redx:827967995405402192> Fun Module Disabled") {
                panelFile.fun = '<a:greentick:827967995065401415> Fun Module Enabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Enabled:** `Fun`')

                const FunEnabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has enabled the **fun module.**`)
                .setColor(client.errcolor)

                LogChannel.send(FunEnabled)

                return
            }

            if (panelFile.fun == "<a:greentick:827967995065401415> Fun Module Enabled") {
                panelFile.fun = '<a:redx:827967995405402192> Fun Module Disabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Disabled:** `Fun`')

                const FunDisabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has disabled the **fun module.**`)
                .setColor(client.errcolor)

                LogChannel.send(FunDisabled)

                return
            }


        }

        if (args[0] === 'toggle' && args[1] === 'general') {

            if (panelFile.general == "<a:redx:827967995405402192> General Module Disabled") {
                panelFile.general = '<a:greentick:827967995065401415> General Module Enabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Enabled:** `General`')

                const GeneralEnabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has enabled the **general module.**`)
                .setColor(client.errcolor)

                LogChannel.send(GeneralEnabled)

                return
            }

            if (panelFile.general == "<a:greentick:827967995065401415> General Module Enabled") {
                panelFile.general = '<a:redx:827967995405402192> General Module Disabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Disabled:** `General`')

                const GeneralDisabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has disabled the **general module.**`)
                .setColor(client.errcolor)

                LogChannel.send(GeneralDisabled)

                return
            }


        }

        if (args[0] === 'toggle' && args[1] === 'logging') {

            if (panelFile.logging == "<a:redx:827967995405402192> Logging Module Disabled") {
                panelFile.logging = '<a:greentick:827967995065401415> Logging Module Enabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Enabled:** `Logging`')

                

                const LoggingEnabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has enabled the **logging module.**`)
                .setColor(client.errcolor)

                LogChannel.send(LoggingEnabled)

                return
            }

            if (panelFile.logging == "<a:greentick:827967995065401415> Logging Module Enabled") {
                panelFile.logging = '<a:redx:827967995405402192> Logging Module Disabled'

                fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

                message.reply('**Module Disabled:** `Logging`')

                const LoggingDisabled = new MessageEmbed()
                .setDescription(`:warning: **${message.author.username}** has disabled the **logging module.**`)
                .setColor(client.errcolor)

                LogChannel.send(LoggingDisabled)


                return
            }


        }

        if (args[0] === 'enable' && args[1] === 'all') {

            panelFile = {
                "commands": "<a:greentick:827967995065401415> Commands Module Enabled", "utility": "<a:greentick:827967995065401415> Utility Module Enabled", "administration": "<a:greentick:827967995065401415> Administration Module Enabled", "fun": "<a:greentick:827967995065401415> Fun Module Enabled", "logging": "<a:greentick:827967995065401415> Logging Module Enabled", "general": "<a:greentick:827967995065401415> General Module Enabled"
            }

            fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

            const AllEnabled = new MessageEmbed()
            .setDescription(`:warning: **${message.author.username}** has enabled **all modules.**`)
            .setColor(client.errcolor)

            LogChannel.send(AllEnabled)

            message.reply('**Module Enabled:** `ALL`')
            return
        }

        if (args[0] === 'disable' && args[1] === 'all') {

            panelFile = {
                "commands": "<a:redx:827967995405402192> Commands Module Disabled", "utility": "<a:redx:827967995405402192> Utility Module Disabled", "administration": "<a:redx:827967995405402192> Administration Module Disabled", "fun": "<a:redx:827967995405402192> Fun Module Disabled", "logging": "<a:redx:827967995405402192> Logging Module Disabled", "general": "<a:redx:827967995405402192> General Module Disabled"
            }

            fs.writeFileSync('./json/panel.json', JSON.stringify(panelFile))

            const AllDisabled = new MessageEmbed()
            .setDescription(`:warning: **${message.author.username}** has disabled **all modules.**`)
            .setColor(client.errcolor)

            LogChannel.send(AllDisabled)

            message.reply('**Module Disabled:** `ALL`')
            return
        }

        // The repeat code ends here. Basiclly making a embed if the user just wants to see the status of all systems.

        const statusEmbed = new MessageEmbed()
            .addFields({
                name: `${panelFile.commands}`,
                value: "- Toggle module with `>panel toggle commands`.\n\n- This module is responsible for **all of the commands**",
                inline: true
            }, {
                name: `${panelFile.utility}`,
                value: "- Toggle module with `>panel toggle utility`.\n\n- This module is responsible for all the commands in the `Utility` category.",
                inline: true
            }, {
                name: `${panelFile.administration}`,
                value: "- Toggle module with `>panel toggle administration`.\n\n- This module is responsible for all the commands in the `Administration` category.`",
                inline: true
            }, {
                name: `${panelFile.fun}`,
                value: "- Toggle module with `>panel toggle fun`.\n\n- This module is responsible for all the commands in the `Fun` category.",
                inline: true
            }, {
                name: `${panelFile.logging}`,
                value: "- Toggle module with `>panel toggle logging`.\n\n- This module is responsible for logging every action in the server.",
                inline: true
            }, {
                name: `${panelFile.general}`,
                value: "- Toggle module with `>panel toggle general`.\n\n- This module is responsible for all the commands in the `General` category.",
                inline: true
            })
            .setTitle('Bot Control Panel')
            .setColor(client.color)

        // Sends the embed.
        message.channel.send(statusEmbed)



    }
}
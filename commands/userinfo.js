const Client = require('../structures/Client');
const { Message, DiscordAPIError, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'user'],
    cooldown: 10,
    permissions: [],
    channelRetrict: [],
    category: 'General',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {


        var User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var UserTwo = message.author.id;
        var Bot = "No";

        let UserInfo

        if (User) {

            if (User.user.bot) {
                Bot = "Yes";
            }

            const UserInfo = new MessageEmbed()
                .setTitle(`User info for ${User.user.username} (${User.id})`)
                .setThumbnail(User.user.displayAvatarURL({ dynamic: true }))
                .setColor(client.color)
                .setTimestamp()
                .addFields({
                    name: `🌍 Global Username`,
                    value: "```" + User.user.username + "```",
                    inline: true
                }, {
                    name: `:man_detective: Server Nickname`,
                    value: "```" + User.displayName + "```",
                    inline: true
                }, {
                    name: `:id: User ID`,
                    value: "```" + User.id + "```",
                    inline: true
                }, {
                    name: `<a:discord:830075904867958805> Joined Discord`,
                    value: "```" + new Date(User.user.createdTimestamp).toLocaleDateString() + "```",
                    inline: true
                }, {
                    name: `<:server:830075900976431164> Joined Server`,
                    value: "```" + User.joinedAt + "```",
                    inline: true
                }, {
                    name: `:scroll: All roles (${User.roles.cache.size})`,
                    value: User.roles.cache.map(r => `${r}`).join(' | '),
                    inline: true
                }, {
                    name: `<:Upvoted:830083394913435689> Highest Role`,
                    value: User.roles.highest,
                    inline: true
                }, {
                    name: `<:devraveninha:830031705750503424> Bot`,
                    value: "```" + Bot + "```",
                    inline: true
                })

            const Button = new MessageButton()
                .setStyle('red')
                .setID('DelButton' + message.id)
                .setLabel('Delete Message')


            message.channel.send(' ', {
                component: Button,
                embed: UserInfo
            }).then(msg => {
                client.on('clickButton', async (button) => {
                    if (button.id === 'DelButton' + message.id && button.clicker.user.id === message.author.id) {
                        msg.delete()
                    }
                });
            })

            return


        } else {

            const UserInfoN = new MessageEmbed()
                .setTitle(`User info for ${message.author.username} (${message.author.id})`)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setColor(client.color)
                .setTimestamp()
                .addFields({
                    name: `🌍 Global Username`,
                    value: "```" + message.author.username + "```",
                    inline: true
                }, {
                    name: `:man_detective: Server Nickname`,
                    value: "```" + message.member.displayName + "```",
                    inline: true
                }, {
                    name: `:id: User ID`,
                    value: "```" + message.author.id + "```",
                    inline: true
                }, {
                    name: `<a:discord:830075904867958805> Joined Discord`,
                    value: "```" + new Date(message.author.createdTimestamp).toLocaleDateString() + "```",
                    inline: true
                }, {
                    name: `<:server:830075900976431164> Joined Server`,
                    value: "```" + message.member.joinedAt + "```",
                    inline: true
                }, {
                    name: `:scroll: All roles (${message.member.roles.cache.size})`,
                    value: message.member.roles.cache.map(r => `${r}`).join(' | '),
                    inline: true
                }, {
                    name: `<:Upvoted:830083394913435689> Highest Role`,
                    value: message.member.roles.highest,
                    inline: true
                }, {
                    name: `<:devraveninha:830031705750503424> Bot`,
                    value: "```" + Bot + "```",
                    inline: true
                })


            const Button = new MessageButton()
                .setStyle('red')
                .setID('DelButton' + message.id)
                .setLabel('Delete Message')


            message.channel.send(' ', {
                component: Button,
                embed: UserInfoN
            }).then(msg => {
                client.on('clickButton', async (button) => {
                    if (button.id === 'DelButton' + message.id && button.clicker.user.id === message.author.id) {
                        msg.delete()
                    }
                });
            })

            return


        }











    }
}

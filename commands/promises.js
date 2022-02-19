const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
module.exports = {
    name: 'promises',
    permissions: [],
    channelRetrict: ['823030341689933895'],
    category: 'General',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */



    run: async (client, message, args) => {



        const Promises = new MessageEmbed()
            .setAuthor("Our promises to you.", message.author.displayAvatarURL())
            .setDescription('Thank you for joining **Everyone is Welcome**. We value you and your time, so here is everything we promise to our lovely server members.')
            .addField("1. Rule Enforcement", "No matter what we will always enforce our rules (found in <#822988293187829823>). This means that all users will be punished for all rule breaking so **YOU** can be safe and not worry about swears, spam or offensive content on our server.")
            .addField("2. Acceptance", "No matter what sexuality you are, what you belive in or what attributes you have, you will always be accepted in this community. If anyone tries to get you removed or do any harm to you because of the previsouly stated reasons - we will ban them immediately.")
            .addField("3. Help", "We will always be here to help. If you are feeling down, need help with a program or some code, we will help you when you need it. Please note that spamming us or wanting an answer 2 seconds after you asked isn't okay because we cannot be online 24/7.")
            .addField("4. Listening", "We always listen to new ideas and suggestions. Please feel free to tell us what we need to improve to become better and satisfy everyone. Never be afraid to suggest something and IF, in any case, a staff member starts offending you for giving an idea report them to an Head Moderator or above.")
            .setColor('RANDOM')
            .setTimestamp()


        const Button = new MessageButton()
            .setStyle('red')
            .setID('DelButton' + message.id)
            .setEmoji('850173892484268053')


        message.channel.send('', {
            component: Button,
            embed: Promises
        }).then(msg => {
            client.on('clickButton', async (button) => {
                if (button.id === 'DelButton' + message.id && button.clicker.user.id === message.author.id) {
                    msg.delete()
                }
            });
        })
    }
}

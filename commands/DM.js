//823180760152145920
const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const config = require('../json/config.json')

module.exports = {
	name:'dm',
	aliases: ['message', 'msg'],
	permissions: ['MANAGE_MESSAGES'],
	channelRetrict: [],
	category: 'Utility',

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	

	run: async(client, message, args) => {
	
	
		const dmUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		const dmMessage = args.slice(1).join(" ")

		if (!dmUser) {
			const NoUser = new MessageEmbed()
			.setDescription('Please provide a valid user by **mentioning them / typing their ID**.')
			.setColor('#ff6e6e')

			message.lineReply(NoUser).then(message => {
				message.delete({ timeout: 4000 })
			})

			return;
		}

		if (!dmMessage) {
			const NoMessage = new MessageEmbed()
			.setDescription(`Please provide a message you want to send to ${dmUser.user.username}.`)
			.setColor('#ff6e6e')

			message.lineReply(NoMessage).then(message => {
				message.delete({ timeout: 4000 })
			})

			return;
		}

		const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`:envelope_with_arrow: A staff member has sent you a message!`)
				.setDescription(`${dmMessage}`)
				.setFooter(message.member.roles.highest.name)
				.setTimestamp()

		
		
		try {
			await dmUser.send(embed)
			dmUser.send(`**Note:** This message was sent from the server **Everyone is Welcome.**`)

			await message.lineReply(`${client.TickEmoji} **I have successfully sent your message to ${dmUser.user.username}.**`)

			await message.delete()

			console.log(`The message ${dmMessage} has been sent to ${dmUser.user.username}.`)
		} catch (error) {
			message.lineReply(`${client.XEemoji} **${dmUser.user.username} has their DMs turned OFF, thus I was unable to DM them.**`)
			await message.delete()
		}

		
		const Log = new MessageEmbed()
		.setTitle(`:incoming_envelope: New Message Sent`)
		.setDescription(`**${message.author.username}** has sent a message to **${dmUser.user.username}**. The message is` + "`" + dmMessage + "`.")
		.setColor('YELLOW')
		.setTimestamp()

		var LogChannel = message.guild.channels.cache.get(config.logChannel)
		
		LogChannel.send(Log)

		
	}
}
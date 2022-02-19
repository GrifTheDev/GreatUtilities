const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons')
module.exports = {
	name:'rule',
	aliases: ['r'],
	permissions: ['MANAGE_MESSAGES'],
	channelRetrict: [],
	category: 'Utility',

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */



	run: async(client, message, args) => {

		message.delete()

		let rules = [
	    "➤ Please follow Discord's official rules in all chats. You can read Discord's official Terms of Service **[here](https://discord.com/terms)** and Discord's Community Guidelines **[here](https://discord.com/guidelines)**.",
		"➤ Spamming of any kind is strongly prohibited. This applies to everyone . Spamming counts as many different things some off which include but are not limited to:\n\n>  Flooding chat (being the only one sending messages in a chat, in turn making the chat flooded with only your messages)\n >\n > Message spam (sending a lot of messages in a little amount of time)\n >\n > Chaining messages (sending one part of a sentence in one message then the second part in another message causing the chat to be flooded with your messages)\n >\n > Useless messages/quotes (sending messages not related to the topic/quoting random things like the bible)",
		"➤ NSFW stands for `Not safe for work`. This means that you cannot post anything that is above PG-13. This includes but is not limited to: gore, nude pictures, pornography and sexual assult.",
		"➤ Please be respectful towards all of our members. This rule applies to everyone. No matter the sexuality, race, religion or any other attribute which may set one apart from others, you are obligated to respect that person for who they are.",
		"➤ Swearing of any kind is strongly prohibited. Bypassing swear words is also strongly prohibited. This rule also includes racial slurs. You can find the list of filtered slurs **[here](https://en.wikipedia.org/wiki/List_of_ethnic_slurs)**.",
		"➤ You are only allowed to have all the letters of the modern English alphabet and numbers 0-9 in your username.  Any other symbols in your username will result to it being turned into `Moderated Nickname 92jasj`. Having swears or anything that ignores rule 5 will also result in your username being changed.",
		"➤ Staff always have final say over a matter that is happening in a text/voice channel. Do not try to change a staff member's decision, when they have made one already. This rule doesn't mean our staff team is always right.",
		"➤ Do not attempt to exploit a bug in Discord itself or a bot, to be able to do things you are not normally permitted to do. Doing this will lead to a ban and a report to Discord's Trust and Safety team.",
		"➤ This server is an English only server. This is due to our staff team being able to moderate only one language at a time.",
		"➤ Advertising of any kind is strongly prohibited. The only channels where you can advertise are: <#823038352798384168> and <#823038482275500044> . Advertising by DM-ing users will result in an immediate ban. Please open a ticket if you would like to report someone.",
		"➤ Scamming is promising users a rewards (like Discord Nitro) for something, and then not giving the user the said reward. Saying 'DM me for Nitro!' or things along those lines is covered under this rule.",
		"➤ You are not allowed to beg for in-game items / in-game currency / money or anything along those lines.",
		"➤ Do not talk about where you live, where you go to school and any private information you don't want a stranger to know Asking people to give them those things will result in a ban. This includes using **[grabify links](https://www.reddit.com/r/software/comments/5hbpdc/can_someone_here_explain_me_what_is_a_grabify/)**.",
		"➤ It is strongly prohibited to talk about any war, terrorism or political debates in this server. If you try and justify yourself by saying that the other person didn't know and asked you you to explain, you will still be moderated.",
		"➤ You are not allowed to start drama in the server. This also includes arguing. Please do that outside of the server.",
		"➤ You are strongly prohibited from playing any form of ear rape or any loud noise in VC's. These noises can disturb people who are using headphones or listening at a large volume.",
		"➤ If any song in the que or that is currently playing contains swear words, or racial slurs you will be punished.",
		"➤  Nobody is allowed to swear in any VC.",
		"➤ You are not allowed to carry out fights in public VC's or create drama.",
		"➤ We cannot cover every possible rule, so please use common sense where ever you are in the server."

	  ]

		if (!isNaN(args[0])){
			if (args[0] > rules.length) {
				message.lineReplyNoMention(`There are only ${rules.length} rules!`)

				return;

			}

			rule = args[0]

			const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`Rule ${args[0]}`)
				.setDescription(`${rules[rule - 1]}`)
				.setTimestamp()

			message.channel.send(embed)

		}


	}
}

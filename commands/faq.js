const Client = require('../structures/Client');
const { Message, MessageEmbed } = require('discord.js');
module.exports = {
	name:'faq',
	permissions: ['MANAGE_MESSAGES'],
	channelRetrict: [],
	category: 'Utility',
	

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	

	run: async(client, message, args) => {

		

		const faqs = [
		"**What is this server about?** \n > This server is a place for **everyone to feel welcome and at home.** You shouldn't need to hide yourself in this server, but should just rather be yourself and meet new people who are like you.",
		"**What are __levels__?** \n > Levels are a fun way to rewards those who are active in our community with **special perks.** Every time you chat in this server you get anywhere from **15 - 25 XP**. Once you reach **a certain amount of XP you will level up**. At certain levels you will get **reward roles with special perks**. To find out more about these roles, check out #role-info. ",
		"**What is @Everyone's Utilities? Can I have it in my server?** \n > @Everyone's Utilities is a **private bot** and cannot be invited to other servers. If you are making your own bot, **please do not steal the design or text of some of our commands.**",
		"**Help, someone is breaking the rules, how do I report him?**\n> To report rule breakers, please DM @Everyone's ModMail#9224 . **In your DM please explain your issue**. This will open a chat with our staff team to assist you as soon as possible. @everyone should use ModMail before DMing staff directly.",
		"**How can I advertise in #advertising and #lightning-advertising?** \n > To advertise in #advertising you need @Dedicated Member [Level 10+], and to advertise in #lightning-advertising you need @Lightning Member [Level 35+] . **Server Boosters can advertise in #advertising and #lightning-advertising, without having the needed level.**",
		"**What does it mean to be giveaway banned?** \n > Some giveaways have requirements which must be completed before entering the giveaway. **If you enter the giveaway WITHOUT doing the requirement you will be giveaway banned.** This applies to @everyone and there are no exceptions.",
		"**I have a suggestion, how can I suggest it?** \n > To suggest something type `>suggest [suggestion here]`, then you suggestion will appear in #suggestions. **A @• Head Moderator and above will look at the votes and review your suggestion, before approving/denying it.**",
		"**How can I become a staff member?** \n > To become a staff member, you need to apply trough a form. **Currently staff applications for staff are closed.**",
		"**I have been muted, but received no DM from @Aperture [?], what do I do?** \n > If you have been muted, with no DM from @Aperture [?] - that means you have been muted for spam. **If you did not spam and got muted, contact @Everyone's ModMail immediately.**",
		"**Wait, this server doesn't actually have MEE6 premium but still has level roles, how?** \n > With permission from the **MEE6 Team**, @Everyone's Utilities has some custom code which gives roles on leveling up. **This code will not be leaked or shared, if you want level roles like we have them, do some research and find out how to do it yourself. __Please do not do anything against MEE6's ToS.__**"
		]

		if (!isNaN(args[0])){
			if (args[0] > faqs.length + 1) {
				 message.reply("There are only 10 FAQs!");
				message.delete();
				return

			}
			
			
			const embed = new MessageEmbed()
				.setColor(client.color)
				.setTitle(`FAQ ${args[0]}`)
				.setDescription(`${faqs[args[0] - 1]}`)
				.setTimestamp()
			message.channel.send(embed);
			

			
		}
		
		
	}
}
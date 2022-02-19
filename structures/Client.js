//Other package requirements?
const { MessageEmbed, Client, Collection } = require('discord.js');
const axios = require('axios');
const cooldowns = new Map()
const config = require('../json/config.json')
const fs = require('fs');
const { EventEmitter } = require('stream');
const mongoose = require('mongoose')
const countingSchema = require('../schemas/counting-schema')
const messageSchema = require('../schemas/messages-schema')

//Obviously a class which extends to the Client with a constructor which constructs a super(power?).
class Modmailclient extends Client {
    constructor() {
        super();

        // Package Requirements.
        this.path = require('path');
        this.discord = require('discord.js');
        this.fs = require('fs');

        // Collections for commands, alliases and so on.
        this.commands = new Collection();
        this.threads = new Collection();
        this.aliases = new Collection();

        // Important Config Variables.
        this.prefix = config.prefix;

        // Global Variables.
        this.XEemoji = '<a:redx:827967995405402192>'
        this.TickEmoji = '<a:greentick:827967995065401415>'
        this.loadingY = '<a:Yellow:830036938559324230>'
        this.color = '#3474fd'
        this.errcolor = '#ff6e6e'
        this.LatestMessage;
        this.opened = 0;

        // Discord Buttons Mumbo Jumbo.
        require("discord-buttons")(this)

        require('discord-reply');

        const disbut = require('discord-buttons')

        this.setMaxListeners(25)
    }

    // Command handler function with the path passed in.
    commandHandler(path) {

        // Reads the command directory, and sets the command to be the file read from the .js file.
        this.fs.readdirSync(this.path.normalize(path)).map((f) => {
            const File = require(this.path.join(__dirname, `..`, path, f));
            this.commands.set(File.name, File);


        });
    }

    // So, function which fetches the command.
    getCommand(cmd) {

        // Tests if a command has successfully been summoned (exists ig), and if it does if gets the command (returns first argument),
        // and if it does not get the command it just returns a false (returns second argument). This is basiclly checking if
        // the condition before the "?" is true and returns either code before the ":" if it is true or code after the ":"
        // if it is false.
        return this.commands.has(cmd) ? this.commands.get(cmd) : false;
    }

    // Start function.
    start(token, path) {

        // Get them command functions.
        this.commandHandler(path);

        mongoose.connect(config.MongoSRV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(() => {
            console.log('✔ > Database connection successful.')
        })

        // Login the client with the token. Index.js
        this.login(token);

        // Event which fires off when the bot is online.
        this.on('ready', (client) => {

            // Log that we have successfully turned on to the console.
            console.log('✔ > Client is online!')

            var Gen = this.channels.cache.get('823027606294495252')

            

            setInterval(() => {
                let list = ["its 3:26 am and I am still writing code please send help my god", "on mars", "on the burning surface of the Sun", "Minecraft", "with my food", "a card game with Ash", "a board game", 'some nice music', "on my PS6", "Dungeons and dragons", "Call of Duty on the PS7", "with Tweets", "yes", "no", "E", "a 1v1 against Ruffmann", "send help", "with electricity", "with the empty void that is space", "with happiness"];
                let result = Math.floor((Math.random() * list.length));; // generates a random number between 1 and the length of the activities array list.
                this.user.setActivity(list[result]); // sets bot's activities to one of the phrases in the arraylist

            }, 60000); //This action happanes every 60 seconds.

        
            setInterval(() => {

                axios.get('https://randomfox.ca/floof/?ref=public-apis')
                    .then((res) => {

                        const FoxEmbed = new MessageEmbed()
                            .setTitle("Here is your daily fox picture:")
                            .setColor(this.color)
                            .setImage(res.data.image)


                        Gen.send(FoxEmbed)

                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }, 86400000)




        });

        this.on('guildMemberAdd', async (member) => {
          


            const WelcomeEmbed = new MessageEmbed()
                .setDescription(`Welcome <@${member.id}> to **Everyone is Welcome**!\nEnjoy your stay!`)
                .setColor(this.color)
                .setAuthor(`${member.displayName} joined the server!`, member.guild.iconURL())


            const channel = member.guild.channels.cache.get('823027606294495252') //823027606294495252
            const LogChannel = member.guild.channels.cache.get('836737518032257044') //836737518032257044

            channel.send(WelcomeEmbed)

            const LogEmbed = new MessageEmbed()
                .setTitle("<:memberjoin:836739690421551145> Member Join")
                .setDescription(`<@${member.id}> has joined the server.`)
                .addField('Member Count', '#' + member.guild.members.cache.filter(member => !member.user.bot).size)
                .addField("Joined Discord", new Date(member.user.createdTimestamp).toLocaleDateString())
                .setColor("YELLOW")
                .setTimestamp()

            LogChannel.send(LogEmbed)

            const DMEmbed = new MessageEmbed()
                .setAuthor(`Thank you for joining Everyone is Welcome!`, member.guild.iconURL())
                .setDescription('**Everyone is Welcome** is a wonderful community for literally anyone. **No matter who you are, where you live, what you believe in we will accept you into our community!**\n\nNow, to fully become a member of our community you will need to verify in <#823020765410230282>, but **I suggest reading the rules first in <#822988293187829823>!**\nOnce you are ready, **you can come talk to us in <#823027606294495252>.**')
                .setColor(this.color)
                .setTimestamp()


            member.send(DMEmbed)
            
            let profile = await countingSchema.create({
                _id: member.id,
                userID: member.id,
                number: 0
            })

            profile.save()

            console.log(`✔ > Created counting profile in database for ${member.user.username}.`)
        })

        this.on('guildMemberRemove', async (member) => {

            countingSchema.findOneAndDelete({ _id: member.id }, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`⚠ > Deleted counting profile in databse for ${member.user.username} due to the user leaving.`)
                }
            })

            messageSchema.findOneAndDelete({_id: member.id}, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`⚠ > Deleted message profile in databse for ${member.user.username} due to the user leaving.`)
                }
            })

        })

       

        // Message event, fires off everytime a message is sent.
        this.on('message', async (message) => {

            if (message.channel.id === '823020765410230282' && !message.author.bot) {
                if (message.content === '>verify') {

                } else {
                    message.delete()

                    message.channel.send(`Hey <@${message.author.id}>, to verify you must type ` + "`" + ">verify" + "` in this chat!").then(message => {
                        message.delete({ timeout: 5000 })
                    })

                    console.log(`Message deleted in #verify from ${message.author.username} (${message.author.id}) because it is not equal to >verify.`)


                }
            }

            

            if (message.channel.id === '823035444005961729' && !message.author.bot) {

                if (!this.LatestMessage) {
                    this.LatestMessage = message.content
                } else if (message.content != this.LatestMessage) {
                    this.LatestMessage = null

                    const UserMuted = new MessageEmbed()
                        .setTitle(`The chain has been broken!`)
                        .setDescription(`${message.author.username} has broken the chain! As a punishment, they have been muted from talking in this channel for the next **15 minutes**! The next message sent will start a new chain.`)
                        .setColor("#ff6e6e")

                    message.lineReply(UserMuted)

                    message.member.roles.add('839802549564604436')

                    setTimeout(() => {
                        message.member.roles.remove('839802549564604436')
                    }, 900000);
                }

            }
            if (!message.author.bot && !message.content.includes('>messages') && !message.content.includes('>verify')) {

                messageSchema.findOne({ _id: message.author.id }, async function (err, obj) {

                    if (obj == null) {
                        console.log(`❌ > ${message.author.username} does not have a profile created in the database for message tracking. Creating profile now.`)
                  
                        let profileMsg = await messageSchema.create({
                            _id: message.author.id,
                            messages: 0,
                            bckUserID: message.author.id
                        })
    
                        profileMsg.save()

                        console.log(`✔ > Created message profile in database for ${message.author.username}.`)

                        return
                    } else {
                        let updatingMsgs = await messageSchema.find
                    }

                })

                

                let updatingMsgs = await messageSchema.findOneAndUpdate({
                    _id: message.author.id,
                }, {
                    $inc: {
                        messages: 1,
                    },
                })

                updatingMsgs.save()

            }

             if (message.channel.id === '823034563642654780' && !message.author.bot) {

                countingSchema.findOne({ _id: message.author.id }, async function (err, obj) {

                    if (obj == null) {
                        console.log(`❌ > ${message.author.username} does not have a profile created in the database. Creating profile now.`)

                        let profile1 = await countingSchema.create({
                            _id: message.author.id,
                            userID: message.author.id,
                            number: 0
                        })

                        profile1.save()

                        console.log(`✔ > Created counting profile in database for ${message.author.username}.`)

                        var BotCommands = message.guild.channels.cache.get('823030341689933895')

                        var NoDB = new MessageEmbed()
                            .setDescription('Hey :wave:, it seems like you do not have a counting profile. Do not fear, because one has just been created for you. You can now continue counting.\n\n*Note: The number you just typed in counting has not been added to your total counted number.*')
                            .setColor('#ff6e6e')

                        await BotCommands.send(`<@${message.author.id}>`)
                        await BotCommands.send(NoDB)

                        return
                    }

                })

                if (isNaN(message.content)) {

                } else {




                    let updating = await countingSchema.findOneAndUpdate({
                        userID: message.author.id,
                    },
                        {
                            $inc: {
                                number: 1,
                            },

                        }
                    )

                    updating.save()


                    countingSchema.findOne({ _id: message.author.id }, async function (err, obj) {

                        var currentUserCount = Number(obj.number) // contains current user count

                        
                        if (currentUserCount == 25) {
                            message.member.roles.add('863888541469245440')

                            try {

                                var Counted25Embed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 25 times in <#823034563642654780>, thus you earned the **Counter (25+ Counted)** role. Congratulations!')
                                    .setColor('#a9ffa0')

                                await message.author.send(Counted25Embed)

                            } catch (error) {

                                var BotCommands = message.guild.channels.cache.get('823030341689933895')


                                var Counted25Embed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 25 times in <#823034563642654780>, thus you earned the **Counter (25+ Counted)** role. Congratulations!')
                                    .setColor('#a9ffa0')

                                await BotCommands.send(`<@${message.author.id}>`)
                                await BotCommands.send(Counted25Embed)
                            }
                        }

                        if (currentUserCount == 50) {
                            message.member.roles.add('835851633790550016')
                            message.member.roles.remove('863888541469245440')

                            try {

                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 50 times in <#823034563642654780>, thus you earned the **Number Lover (50+ Counted)** role. Congratulations!')
                                    .setColor('#8eff43')

                                await message.author.send(CountedEmbed)

                            } catch (error) {

                                var BotCommands = message.guild.channels.cache.get('823030341689933895')


                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 50 times in <#823034563642654780>, thus you earned the **Number Lover (50+ Counted)** role. Congratulations!')
                                    .setColor('#8eff43')

                                await BotCommands.send(`<@${message.author.id}>`)
                                await BotCommands.send(CountedEmbed)
                            }
                        }

                        if (currentUserCount == 100) {
                            message.member.roles.add('863892416448823306')
                            message.member.roles.remove('835851633790550016')

                            try {

                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 100 times in <#823034563642654780>, thus you earned the **Number Cruncher (100+ Counted)** role. Congratulations!')
                                    .setColor('#0fff34')

                                await message.author.send(CountedEmbed)

                            } catch (error) {

                                var BotCommands = message.guild.channels.cache.get('823030341689933895')


                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 100 times in <#823034563642654780>, thus you earned the **Number Cruncher (100+ Counted)** role. Congratulations!')
                                    .setColor('#0fff34')

                                await BotCommands.send(`<@${message.author.id}>`)
                                await BotCommands.send(CountedEmbed)
                            }
                        }

                        if (currentUserCount == 250) {
                            message.member.roles.add('866035968805175336')
                            message.member.roles.remove('863892416448823306')

                            try {

                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 250 times in <#823034563642654780>, thus you earned the **Maniac Counter (250+ Counted)** role. Congratulations!')
                                    .setColor('#0fff8f')

                                await message.author.send(CountedEmbed)

                            } catch (error) {

                                var BotCommands = message.guild.channels.cache.get('823030341689933895')


                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 250 times in <#823034563642654780>, thus you earned the **Maniac Counter (250+ Counted)** role. Congratulations!')
                                    .setColor('#0fff8f')

                                await BotCommands.send(`<@${message.author.id}>`)
                                await BotCommands.send(CountedEmbed)
                            }
                        }


                        if (currentUserCount == 500) {
                            message.member.roles.add('866247503846178816')
                            message.member.roles.remove('866035968805175336')

                            try {

                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 500 times in <#823034563642654780>, thus you earned the **Count-tastic (500+ Counted)** role. Congratulations!')
                                    .setColor('#0fffc4')

                                await message.author.send(CountedEmbed)

                            } catch (error) {

                                var BotCommands = message.guild.channels.cache.get('823030341689933895')


                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 500 times in <#823034563642654780>, thus you earned the **Count-tastic (500+ Counted)** role. Congratulations!')
                                    .setColor('#0fffc4')

                                await BotCommands.send(`<@${message.author.id}>`)
                                await BotCommands.send(CountedEmbed)
                            }
                        }

                        if (currentUserCount == 1000) {
                            message.member.roles.add('866249919841042442')
                            message.member.roles.remove('866247503846178816')

                            try {

                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 1000 times in <#823034563642654780>, thus you earned the **Insane Counter (1000+ Counted)** role. Congratulations!')
                                    .setColor('#b6fdff')

                                await message.author.send(CountedEmbed)

                            } catch (error) {

                                var BotCommands = message.guild.channels.cache.get('823030341689933895')


                                var CountedEmbed = new MessageEmbed()
                                    .setDescription(':tada: You have counted 1000 times in <#823034563642654780>, thus you earned the **Insane Counter (1000+ Counted)** role. Congratulations!')
                                    .setColor('#b6fdff')

                                await BotCommands.send(`<@${message.author.id}>`)
                                await BotCommands.send(CountedEmbed)
                            }
                        }


                    })


                }


            }

            if (message.content.includes('Level 1') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level1Role = message.guild.roles.cache.find(role => role.id == "823003719104200704")

                User.roles.add(Level1Role)


                console.log(message.author.id)

                
            }

            if (message.content.includes('Level 5') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level1Role = message.guild.roles.cache.find(role => role.id == "823003719104200704")
                let Level5Role = message.guild.roles.cache.find(role => role.id == "823011050916020246")

                User.roles.add(Level5Role)
                User.roles.remove(Level1Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 10') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level5Role = message.guild.roles.cache.find(role => role.id == "823011050916020246")
                let Level10Role = message.guild.roles.cache.find(role => role.id == "823011628047532072")

                User.roles.add(Level10Role)
                User.roles.remove(Level5Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 15') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level10Role = message.guild.roles.cache.find(role => role.id == "823011628047532072")
                let Level15Role = message.guild.roles.cache.find(role => role.id == "823012259117924383")

                User.roles.add(Level15Role)
                User.roles.remove(Level10Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 20') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level15Role = message.guild.roles.cache.find(role => role.id == "823012259117924383")
                let Level20Role = message.guild.roles.cache.find(role => role.id == "823013101012123648")


                User.roles.add(Level20Role)
                User.roles.remove(Level15Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 25') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level20Role = message.guild.roles.cache.find(role => role.id == "823013101012123648")
                let Level25Role = message.guild.roles.cache.find(role => role.id == "823013618135466004")



                User.roles.add(Level25Role)
                User.roles.remove(Level20Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 30') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level25Role = message.guild.roles.cache.find(role => role.id == "823013618135466004")
                let Level30Role = message.guild.roles.cache.find(role => role.id == "823014133175287829")




                User.roles.add(Level30Role)
                User.roles.remove(Level25Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 35') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level30Role = message.guild.roles.cache.find(role => role.id == "823014133175287829")
                let Level35Role = message.guild.roles.cache.find(role => role.id == "823014791853244426")



                User.roles.add(Level35Role)
                User.roles.remove(Level30Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 40') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level35Role = message.guild.roles.cache.find(role => role.id == "823014791853244426")
                let Level40Role = message.guild.roles.cache.find(role => role.id == "823015344536682586")






                User.roles.add(Level40Role)
                User.roles.remove(Level35Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 45') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level40Role = message.guild.roles.cache.find(role => role.id == "823015344536682586")
                let Level45Role = message.guild.roles.cache.find(role => role.id == "823016065478033459")


                User.roles.add(Level45Role)
                User.roles.remove(Level40Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 50') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level45Role = message.guild.roles.cache.find(role => role.id == "823016065478033459")
                let Level50Role = message.guild.roles.cache.find(role => role.id == "823016601016205322")



                User.roles.add(Level50Role)
                User.roles.remove(Level45Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 75') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level50Role = message.guild.roles.cache.find(role => role.id == "823016601016205322")
                let Level75Role = message.guild.roles.cache.find(role => role.id == "823017172463910912")




                User.roles.add(Level75Role)
                User.roles.remove(Level50Role)

                console.log(message.author.id)
            }

            if (message.content.includes('Level 100') && message.content.includes('earned') && message.author.id === '159985870458322944') {

                let User = message.mentions.members.first()
                let Level75Role = message.guild.roles.cache.find(role => role.id == "823017172463910912")
                let Level100Role = message.guild.roles.cache.find(role => role.id == "823017752394334209")

                User.roles.add(Level100Role)
                User.roles.remove(Level75Role)

                console.log(message.author.id)
            }

            // Requiring the panel.json file for module configuration. Parsing it as well.
            const panelFile = JSON.parse(fs.readFileSync('./json/panel.json', 'utf8'))

            //Autoresponses.

            if (message.content.includes('partnerships') || message.content.includes('wanna partner') || message.content.includes('partnership')) {
                const NoP = new MessageEmbed()
                    .setDescription("<:777129869862633472:827967992955404360> This server **does not do partnerships.** Please leave if you are only here to partner, as that does not benefit any server and is quite annoying.")
                    .setFooter('Info Card Partner')
                    .setTimestamp()
                    .setColor(this.color)

                const MessagePSent = await message.lineReply(NoP)

                setTimeout(() => {
                    MessagePSent.delete()
                }, 13000);
            }

            if (message.content.includes('!rank') && message.channel.id != '823030341689933895') {
                const NotBotCommands = new MessageEmbed()
                    .setAuthor("Rank Command Alert", "https://cdn.discordapp.com/attachments/823020059639152660/823352441264930856/Eu.jpg")
                    .setDescription("Hey, it seems like you are trying to run the `rank` command outside of the bot commands channel. **Please go to <#823030341689933895> and run the command there.**")
                    .setColor(this.color)
                    .setFooter("Help Card #1")

                message.author.send(NotBotCommands)
            }

            if (message.content.includes('!levels') && message.channel.id != '823030341689933895') {
                const NotBotCommands = new MessageEmbed()
                    .setAuthor("Levels Command Alert", "https://cdn.discordapp.com/attachments/823020059639152660/823352441264930856/Eu.jpg")
                    .setDescription("Hey, it seems like you are trying to run the `levels` command outside of the bot commands channel. **Please go to <#823030341689933895> and run the command there.**")
                    .setColor(this.color)
                    .setFooter("Help Card #2")

                message.author.send(NotBotCommands)
            }

            // If the message is sent by a bot, outside of the guild or doesn't start with the prefix, we do not do anything.
            if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(this.prefix)) return;

            // Slicing our command into arguments (words).
            const args = message.content.slice(this.prefix.length).trim().split(/ +/g);

            // Turning sliced words into some type of a command.
            const cmd = args.shift().toLowerCase();

            // Defining the god forsaken command! Command is being fetched from the getCommand function or by an alias in the
            // module.exports of the file itself.
            const command = this.getCommand(cmd) || this.commands.find(a => a.aliases && a.aliases.includes(cmd))

            if (!command) return

            // A bunch of module checks start here, I will not be commenting every one of them. Basiclly, we check to see if,
            // the whole command module is disabled and that the current command ran isn't the ">panel" command, as that would,
            // lock us out of the system. After that we block the message, tell the user the command is blocked and return.
            // Same thing happens in all other IF statments but only specific module types are checked.
            if (panelFile.commands == '<a:redx:827967995405402192> Commands Module Disabled' && command.name != 'panel') {
                message.reply('The command module is currently **disabled.** Any command typed now will not be run. If this is a mistake, please contact our Administrators or DM the bot with the issue.')
                return
            } else if (command.name == 'panel' && panelFile.commands != '<a:redx:827967995405402192> Commands Module Disabled') {

            } else {

            }

            if (panelFile.utility == '<a:redx:827967995405402192> Utility Module Disabled' && command.category == 'Utility') {
                message.reply('All commands under the `Utility` module are currently **disabled.** Any such type of command typed will not be run. If this is a mistake, please contact our Administrators or DM the bot with the issue.')
                return
            }

            if (panelFile.administration == '<a:redx:827967995405402192> Administration Module Disabled' && command.category == 'Administration') {
                message.reply('All commands under the `Administration` module are currently **disabled.** Any such type of command typed will not be run. If this is a mistake, please contact our Administrators or DM the bot with the issue.')
                return
            }

            if (panelFile.fun == '<a:redx:827967995405402192> Fun Module Disabled' && command.category == 'Fun') {
                message.reply('All commands under the `Fun` module are currently **disabled.** Any such type of command typed will not be run. If this is a mistake, please contact our Administrators or DM the bot with the issue.')
                return
            }

            if (panelFile.general == '<a:redx:827967995405402192> General Module Disabled' && command.category == 'General') {
                message.reply('All commands under the `General` module are currently **disabled.** Any such type of command typed will not be run. If this is a mistake, please contact our Administrators or DM the bot with the issue.')
                return
            }

            // Array holding all of the valid Discord permissions.
            const validPermissions = [
                "CREATE_INSTANT_INVITE",
                "KICK_MEMBERS",
                "BAN_MEMBERS",
                "ADMINISTRATOR",
                "MANAGE_CHANNELS",
                "MANAGE_GUILD",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG",
                "PRIORITY_SPEAKER",
                "STREAM",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "SEND_TTS_MESSAGES",
                "MANAGE_MESSAGES",
                "EMBED_LINKS",
                "ATTACH_FILES",
                "READ_MESSAGE_HISTORY",
                "MENTION_EVERYONE",
                "USE_EXTERNAL_EMOJIS",
                "VIEW_GUILD_INSIGHTS",
                "CONNECT",
                "SPEAK",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MOVE_MEMBERS",
                "USE_VAD",
                "CHANGE_NICKNAME",
                "MANAGE_NICKNAMES",
                "MANAGE_ROLES",
                "MANAGE_WEBHOOKS",
                "MANAGE_EMOJIS",
            ]

            // If the module.export in the command contains the "permission" config, we run this.
            if (command.permissions.length) {

                // New empty arry for all invalid permissions.
                let invalidPerms = []

                // Looping trough all of the permissions specified in the file.
                for (const perm of command.permissions) {

                    // If any of the permissions in the module.exports of the file are not in the
                    // validPermissions array, we console.log that shit.
                    if (!validPermissions.includes(perm)) {
                        return console.log(`Invalid Permissions ${perm}`);
                    }

                    // If the member doesn't have that permissions, we put it into the invalidPerms array.
                    if (!message.member.hasPermission(perm)) {
                        invalidPerms.push(perm);
                    }
                }

                // If there are invalidPerms (permissions which the user does not have), we execute this code.
                if (invalidPerms.length) {

                    // Preparing an error embed.
                    const NoPermission = new MessageEmbed()
                        .setDescription(`Insufficient Permission(s) ` + "`" + invalidPerms + "`.")
                        .setColor(this.errcolor)

                    // Sending the Embed.
                    message.channel.send(NoPermission)

                    // Returning.
                    return
                }
            }

            // Checks if the module.exports has a channelRestrict config and that the member running the command isn't a trainne or above.
            if (command.channelRetrict.length && !message.member.hasPermission('MANAGE_MESSAGES')) {

                // Setting the speicifed ID into this variable.
                var ChannelDet = command.channelRetrict

                // Turning a string into a array.
                ChannelDet = [ChannelDet]

                // If the specified number is not a number we console.log that shit.
                if (isNaN(ChannelDet)) {
                    console.log('Wrong allowed channel added. ' + ChannelDet)
                    return

                    // If the message ID isn't the same as the one in the file, we execute this code.
                } else if (message.channel.id != ChannelDet) {

                    // Message gets deleted.
                    message.delete()

                    // Preparing Embed.
                    const WrongChannel = new MessageEmbed()
                        .setDescription('Please only run commands in the allowed command channels. *Or become a staff member.*')
                        .setColor(this.errcolor)

                    // Sending Embed.
                    message.channel.send(WrongChannel)

                    return
                }

            }

            // Cooldown and Alias handling code below, nothing special so just leave it at that for now.

            if (!message.member.hasPermission('MANAGE_MESSAGES')) {

                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new this.discord.Collection())
                }

                const CurrentTime = Date.now();
                const TimeStamps = cooldowns.get(command.name)
                const CooldownAmount = (command.cooldown) * 1000

                if (TimeStamps.has(message.author.id)) {
                    const ExpirationTime = TimeStamps.get(message.author.id) + CooldownAmount

                    if (CurrentTime < ExpirationTime) {
                        const TimeLeft = (ExpirationTime - CurrentTime) / 1000

                        message.delete()

                        const CooldownEmbed = new MessageEmbed()
                            .setDescription(`You are on cooldown! You can use the ` + "`" + `${command.name}` + "` command in " + "`" + `${TimeLeft.toFixed(1)}` + "` seconds.")
                            .setColor('#ff6e6e')

                        return message.channel.send(CooldownEmbed).then(message => {
                            message.delete({ timeout: 5000 })
                        })
                    }
                }

                TimeStamps.set(message.author.id, CurrentTime)

                setTimeout(() => TimeStamps.delete(message.author.id), CooldownAmount)

            }

            if (command) return command.run(this, message, args).catch(console.error);

         
         

        });

        

        this.on('messageUpdate', async (message) => {
            if (message.channel.id === '823035444005961729' && !message.author.bot) {
                const UserTried = new MessageEmbed()
                    .setTitle('Someone broke the chain by thinking they were funny!')
                    .setDescription(`${message.author.username} has edited a message (thinking they were funny while doing so), which means the chain is broken. As a reward they have been muted from talking in this channel for the next **~~15 minutes~~** **30 minutes**! The next message sent will start a new chain.`)
                    .setColor(this.errcolor)
                message.lineReply(UserTried)
                this.LatestMessage = null
                message.member.roles.add('839802549564604436')

                setTimeout(() => {
                    message.member.roles.remove('839802549564604436')
                }, 1800000);
            }


        })

        
        
      
    
    
    };

};
module.exports = Modmailclient;


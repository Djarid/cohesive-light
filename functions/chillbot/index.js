const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token} = require('./config.json');

//const hook = new Discord.WebhookClient('590497504118964224','NjAdONxUkPFGKy0mkMdicjuXBFGr7jrmc3lydtcGBhSznqp7LI4wmsZ2eNPeCWT8aDeN');
const botlog = new Discord.WebhookClient('590498885441552385','caM_HH83KINI_-budZRrQhVrH3UpqnjkhzFC-2ChZpLU2xp4Pn_ncTUCd3y8UA9bW0rz');
const chllog = new Discord.WebhookClient('590499866996899861','pjuIPpbyo2o_sHjV6Vd8l6HiEKex_8CXxqjLjMamkXmSxSupVNqTjbnkXZa48TVC9Pvw');

//botlog.send('I am alive');
//chllog.send("This is Djarid's new bot - in development");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./chillbot/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

var messageListener = message => {
    // filter unwanted traffic
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // split into command and arguments
    const args = message.content.slice(prefix.length).split(/\s+/);
    const commandName = args.shift().toLowerCase();

    // ensure we have a valid command
    if (!client.commands.has(commandName)) return;
    
    const command = client.commands.get(commandName);

    // check to be sure it is a valid channel for this command
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside a DM!');
    }

    // Are we passing the right arguments?
    if (command.args && !args.length) {
        let reply = `you didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage should be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // Deal with spam - cooldown handling
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\' command`);
        }

        timestamps.set(message.author.id, now);
        function expireTS(authorId) {
            timestamps.delete(authorId);
            console.log("expiring: ", authorId);    
        }
        
        setTimeout(() => expireTS(message.author.id), cooldownAmount);
    }

    // Execute the command
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }   
}
client.off('message', messageListener);
client.on('message', messageListener);


client.on('ready', () => {
    console.log('I am ready');
    //botlog.send('I am ready');
});

client.login(token);



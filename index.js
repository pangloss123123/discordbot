const { Client, RichEmbed, Collection} = require("discord.js");
const {config} = require("dotenv");  

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection;

config ({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", ()=> {
    console.log(`Online`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "french",
            type: "Language:"
        }
    })
});

client.on("message", async message => {
    const prefix = "_";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix))return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLocaleLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command)
        command.run(client, message, args);

       
});

client.on('message', message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;
  
    if (message.content === '_join') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            message.reply('I have successfully connected to the channel!');
          })
          .catch(console.log);
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  });


  

client.login(process.env.TOKEN);

function newFunction() {
    client.commands = new Collection();
    client.aliases = new Collection();
}


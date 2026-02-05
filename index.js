require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const play = require("play-dl");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", () => {
  console.log("Bot de música online!");
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "play") {
    const url = interaction.options.getString("url");
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply("Entre em um canal de voz primeiro.");
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator
    });

    const stream = await play.stream(url);
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    const player = createAudioPlayer();

    connection.subscribe(player);
    player.play(resource);

    interaction.reply("🎵 Tocando música!");
  }
});

client.login(process.env.TOKEN);

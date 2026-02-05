require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca uma música pelo link")
    .addStringOption(option =>
      option
        .setName("url")
        .setDescription("Link da música")
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("Comando /play registrado!");
  } catch (error) {
    console.error(error);
  }
})();

require('dotenv').config();

const discord = require('discord.js');
const dedent = require('dedent');
const utils = require('./extras/utils');

const client = new discord.Client();

client.on('ready', async () => {
  await client.user.setActivity('-info', { type: 'LISTENING' });
});

client.on('message', async message => {
  if (message.content.match(/^\-(i|info)$/)) {
    await message.react('😎');
    await message.channel.send(
      new discord.MessageEmbed({
        author: {
          name: 'Among Bot',
          iconURL:
            'https://cdn.discordapp.com/avatars/756745742261157910/5b93edacbf552e0ee3451531e6b38303.png?size=256',
        },
        description:
          'Juega Among Us de la manera correcta, sin soplones, ni gritones. 🔇',
        fields: [
          {
            name: 'Acerca de mí',
            value:
              'Among Bot silenciará a todos los jugadores en partida hasta que sea la hora de discutir y funarse sin piedad. 🔥',
          },
          {
            name: 'Comandos',
            value: dedent`
                \`-m|-mute\` para mutear.
                \`-u|-unmute\` para desmutear.
                \`-i|-info\` para información.
              `,
          },
          {
            name: 'Adóptame en tu servidor',
            value:
              'Among Bot funciona en todos los servidores que desees, [haz click aquí para agregarme](https://discord.com/api/oauth2/authorize?client_id=756745742261157910&permissions=0&scope=bot).',
          },
          {
            name: 'Contribuciones',
            value:
              'Among Bot es open source, puedes ver el código fuente y contribuir a su desarrollo [haciendo click aquí](https://github.com/gantoreno/among-bot).',
          },
        ],
        footer: {
          text: 'Gabriel Moreno © MuteBot 2020',
        },
      })
    );
  }

  if (message.content.match(/^\-(m|mute)$/)) {
    if (utils.channel.notInVoiceChannel(message.member)) {
      await message.react('😐');
      await message.reply('❌ No estás en un canal de voz.');
    } else {
      await message.react('👍🏻');
      await message.channel.send('🔇 ¡Shhhh, silencio!.');
      await utils.channel.setGlobalMuteState(
        message.member.voice.channel.members,
        true
      );
    }
  }

  if (message.content.match(/^\-(u|unmute)$/)) {
    if (utils.channel.notInVoiceChannel(message.member)) {
      await message.react('😐');
      await message.reply('❌ No estás en un canal de voz.');
    } else {
      await message.react('👍🏻');
      await message.channel.send('🔊 Ya pueden hablar.');
      await utils.channel.setGlobalMuteState(
        message.member.voice.channel.members,
        false
      );
    }
  }
});

utils.client.startClient(client, process.env.DISCORD_BOT_TOKEN);

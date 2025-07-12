const { Client, GatewayIntentBits, Partials, ChannelType, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
    ],
});

client.login(process.env.TOKEN);



client.on('guildMemberAdd', async (member) => {

    const gateChannelId = process.env.GATE_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(gateChannelId);

    if (!gateChannelId) return;
    if (!channel || channel.type !== ChannelType.GuildText) return;

    const embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setAuthor({ name: "+ 参加", iconURL: member.guild.iconURL() })
        .setDescription(`**${member.user.tag}** がサーバーに参加しました！`)
        .setTimestamp()

    await channel.send({ embeds: [embed] });
    await member.roles.add("875969584996446260")
})

client.on('guildMemberRemove', async (member) => {

    const gateChannelId = process.env.GATE_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(gateChannelId);

    if (!gateChannelId) return;
    if (!channel || channel.type !== ChannelType.GuildText) return;

    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setAuthor({ name: "- 脱退", iconURL: member.guild.iconURL() })
        .setDescription(`**${member.user.tag}** がサーバーを退出しました。`)
        .setTimestamp()

    await channel.send({ embeds: [embed] });
})
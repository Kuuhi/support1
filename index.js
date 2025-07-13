const { Client, GatewayIntentBits, Partials, ChannelType, EmbedBuilder, messageLink } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // ギルド関連のイベントを購読するために必須
        GatewayIntentBits.GuildMembers, // メンバーの参加・脱退イベントに必須
        GatewayIntentBits.GuildMessages, // EmbedBuilderを使用するためにメッセージ関連のインテントが必要
        GatewayIntentBits.MessageContent, // メッセージの内容を読み取る場合（現在は不要だが、将来的な拡張を考慮）
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

require('dotenv').config();

client.login(process.env.TOKEN)

client.on('guildMemberAdd', async (member) => {

    if (member.guild.id !== process.env.GUILD_ID) return

    const gateChannelId = process.env.GATE_CHANNEL_ID;

    if (!gateChannelId) return;

    const channel = member.guild.channels.cache.get(gateChannelId);

    if (!channel || channel.type !== ChannelType.GuildText) return

    const joinEmbed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setAuthor({ name: "+ 参加", iconURL: member.guild.iconURL({ dynamic: true }) || undefined })
        .setDescription(`**${member.user.tag}** がサーバーに参加しました！`)
        .setTimestamp();

    await channel.send({ embeds: [joinEmbed] });

});

client.on('guildMemberRemove', async (member) => {

    if (member.guild.id !== process.env.GUILD_ID) return

    const gateChannelId = process.env.GATE_CHANNEL_ID;

    if (!gateChannelId) console.warn('GATE_CHANNEL_IDが設定されていません。メンバー脱退通知は送信されません。');

    const channel = member.guild.channels.cache.get(gateChannelId);

    if (!channel || channel.type !== ChannelType.GuildText) return;

    const leaveEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setAuthor({ name: "- 脱退", iconURL: member.guild.iconURL({ dynamic: true }) || undefined })
        .setDescription(`**${member.user.tag}** がサーバーを退出しました。`)
        .setTimestamp();

    await channel.send({ embeds: [leaveEmbed] });
});
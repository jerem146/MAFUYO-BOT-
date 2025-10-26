const handler = async (m, { conn, participants, isAdmin, isBotAdmin, args }) => {
    if (!m.isGroup) throw 'Este comando solo puede ser usado en grupos.';
    if (!isAdmin) throw 'Necesitas ser administrador para usar este comando.';
    if (!isBotAdmin) throw 'El bot necesita ser administrador para mutear.';

    let users = m.mentionedJid[0] ? [m.mentionedJid[0]] : m.quoted ? [m.quoted.sender] : args.length > 0 ? [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'] : [];

    if (users.length === 0) throw 'Por favor, etiqueta, responde o proporciona el número de usuario que deseas mutear.';

    let userJid = users[0];
    let chat = global.db.data.chats[m.chat];
    let userDb = global.db.data.users[userJid];

    if (!userDb) throw 'El usuario no se encuentra en la base de datos del bot (no ha interactuado antes).';

    // Evitar mutear al propio bot o a un administrador (o creador)
    const isTargetAdmin = participants.find(p => p.id === userJid)?.admin;
    if (isTargetAdmin || userJid === conn.user.jid || global.owner.map(o => o + '@s.whatsapp.net').includes(userJid)) {
        throw 'No puedes mutear a un administrador o al creador del bot.';
    }

    if (chat.mutedUsers[userJid]) {
        throw `El usuario @${userJid.split('@')[0]} ya está muteado en este grupo.`;
    }

    chat.mutedUsers[userJid] = { count: 0, warned: false };
    if (!userDb.mutedChats) userDb.mutedChats = {};
    userDb.mutedChats[m.chat] = { count: 0, warned: false };

    m.reply(`🚫 El usuario @${userJid.split('@')[0]} ha sido muteado en este grupo. Sus mensajes serán eliminados.`, null, { mentions: [userJid] });
};

handler.command = ['mute']; // O el comando que uses para mutear
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
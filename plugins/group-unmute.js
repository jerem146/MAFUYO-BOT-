const handler = async (m, { conn, participants, isAdmin, isBotAdmin, args }) => {
    if (!m.isGroup) throw 'Este comando solo puede ser usado en grupos.';
    if (!isAdmin) throw 'Necesitas ser administrador para usar este comando.';
    if (!isBotAdmin) throw 'El bot necesita ser administrador para desmutear.';

    let users = m.mentionedJid[0] ? [m.mentionedJid[0]] : m.quoted ? [m.quoted.sender] : args.length > 0 ? [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'] : [];

    if (users.length === 0) throw 'Por favor, etiqueta, responde o proporciona el número de usuario que deseas desmutear.';

    let userJid = users[0];
    let chat = global.db.data.chats[m.chat];
    let userDb = global.db.data.users[userJid];

    if (!userDb) throw 'El usuario no se encuentra en la base de datos del bot.'; // No es estrictamente necesario, pero es un buen control

    if (!chat.mutedUsers[userJid]) {
        throw `El usuario @${userJid.split('@')[0]} no está muteado en este grupo.`;
    }

    delete chat.mutedUsers[userJid];
    if (userDb.mutedChats && userDb.mutedChats[m.chat]) {
        delete userDb.mutedChats[m.chat];
    }

    m.reply(`✅ El usuario @${userJid.split('@')[0]} ha sido desmuteado en este grupo.`, null, { mentions: [userJid] });
};

handler.command = ['unmute']; // O el comando que uses para desmutear
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
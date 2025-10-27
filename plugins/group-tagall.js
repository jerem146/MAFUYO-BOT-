const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
    const message = args.join(' ');
    const botname = 'TuBot'; // Reemplaza con el nombre de tu bot
    const vs = '1.0'; // Reemplaza con la versión si es necesario

    let mentionsList = '';
    for (const mem of participants) {
        mentionsList += `│  > @${mem.id.split('@')[0]}\n`;
    }
    
    // Asegura que el mensaje de INFO tenga un ancho consistente para la caja
    const infoLine = `│  [INFO]: ${message || 'Sin información adicional'}`;
    const maxLineLength = Math.max(infoLine.length, (botname + ' v' + vs).length + 8); // Ajusta el ancho base
    
    // Función para crear líneas horizontales con el ancho adecuado
    const createHorizontalLine = (char = '-') => `+${char.repeat(maxLineLength - 2)}+`;

    const finalMessage = `
${createHorizontalLine()}
|  ◎ ALERTA GENERAL DEL GRUPO ◎
${createHorizontalLine('=')}
${infoLine}
${createHorizontalLine('-')}
|  Usuarios Notificados (${participants.length}):
${mentionsList.trim()}
${createHorizontalLine('=')}
|  Ejecutado por ${botname} | Versión ${vs}
${createHorizontalLine()}
    `;

    conn.sendMessage(m.chat, { text: finalMessage, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
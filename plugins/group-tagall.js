const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
    const message = args.join(' ');
    const botname = 'TuBot'; // Reemplaza con el nombre de tu bot
    const vs = '1.0'; // Reemplaza con la versión si es necesario
    const sender = m.sender.split('@')[0]; // Obtiene el nombre del usuario que envió el comando

    let mentionsList = '';
    for (const mem of participants) {
        mentionsList += `│  > @${mem.id.split('@')[0]}\n`;
    }
    
    // Asegura que el mensaje de INFO tenga un ancho consistente para la caja
    const infoLine = `│  [INFO]: ${message || 'Sin información adicional'}`;
    const senderLine = `│  [EJECUTADO POR]: @${sender}`;
    const botTitle = `|       ${botname} - Sistema de Alerta       |`; // Línea del bot en la parte superior
    
    // Calcular el ancho máximo para las líneas
    const maxContentLength = Math.max(
        infoLine.length - 7, // Restamos los caracteres fijos de '│  [INFO]: '
        senderLine.length - 15, // Restamos los caracteres fijos de '│  [EJECUTADO POR]: @'
        (botTitle.length - 2) // Ajuste para el texto dentro del título del bot
    );
    const boxWidth = maxContentLength + 10; // Un poco de margen para los bordes

    // Función para crear líneas horizontales con el ancho adecuado
    const createHorizontalLine = (char = '-') => `+${char.repeat(boxWidth - 2)}+`;

    const finalMessage = `
${createHorizontalLine()}
${botTitle}
${createHorizontalLine('=')}
${infoLine}
${senderLine}
${createHorizontalLine('-')}
|  Usuarios Notificados (${participants.length}):
${mentionsList.trim()}
${createHorizontalLine('=')}
|  Versión ${vs}
${createHorizontalLine()}
    `;

    conn.sendMessage(m.chat, { text: finalMessage, mentions: [...participants.map((a) => a.id), m.sender] });
};

handler.help = ['todos'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
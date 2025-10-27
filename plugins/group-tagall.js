// plugins/tagall.js
const handler = async (m, { conn, participants, args }) => {
  try {
    const pesan = args?.join(' ') || ''
    const botname = global.botname || '🎧 CARLY | BOT'
    const vs = global.vs || '1.0.0'

    const oi = pesan
      ? `✦ ᯽ *Mensaje:* ${pesan}`
      : '⚘ ᥫ᭡ *Sin mensaje adicional*'

    let teks = `╭━ ⪩ 𝑴𝑬𝑵𝑪𝑰𝑶𝑵 𝑮𝑬𝑵𝑬𝑹𝑨𝑳 ⪨ ━╮
┃ ⌬ *Miembros:* ${participants?.length || 0}
┃ ⌬ ${oi}
┃ ⌬ *Invocado por:* @${m.sender.split('@')[0]}
╰━━━━━━━━━━━━━━━━━━━━━╯
`

    // Construye la lista de menciones
    const mentionIds = []
    if (participants && participants.length) {
      for (const mem of participants) {
        teks += `✦ @${mem.id.split('@')[0]}\n`
        mentionIds.push(mem.id)
      }
    } else {
      teks += '\n✦ _No se encontraron miembros para mencionar._\n'
    }

    teks += `\n╭─❖ 「 ${botname} 」❖─╮\n╰─⪼  𝒗${vs}`

    // Aseguramos que el invocador también esté en mentions para evitar que no se marque
    if (!mentionIds.includes(m.sender)) mentionIds.push(m.sender)

    await conn.sendMessage(m.chat, {
      text: teks,
      mentions: mentionIds
    })
  } catch (err) {
    console.error('Error en plugin tagall:', err)
    // Mensaje de error amigable en chat (opcional)
    await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar mencionar a todos.' }, { quoted: m })
  }
}

handler.help = ['tagall <texto>', 'invocar <texto>', 'todos <texto>', 'revivan <texto>']
handler.tags = ['group']
handler.command = ['tagall', 'invocar', 'todos', 'revivan']
// Si tu loader usa regex, la línea siguiente es alternativa (pero no pongas ambas si tu loader no soporta regex):
// handler.command = /^(tagall|invocar|todos|revivan)$/i

handler.admin = true
handler.group = true

export default handler
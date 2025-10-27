const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
  const pesan = args.join(' ')
  const botname = global.botname || '🎧 CARLY | BOT'
  const vs = global.vs || '1.0.0'

  const oi = pesan
    ? `✦ ᯽ *Mensaje:* ${pesan}`
    : '⚘ ᥫ᭡ *Sin mensaje adicional*'

  let teks = `╭━ ⪩ 𝑴𝑬𝑵𝑪𝑰𝑶𝑵 𝑮𝑬𝑵𝑬𝑹𝑨𝑳 ⪨ ━╮
┃ ⌬ *Miembros:* ${participants.length}
┃ ⌬ ${oi}
┃ ⌬ *Invocado por:* @${m.sender.split('@')[0]}
╰━━━━━━━━━━━━━━━━━━━━━╯
`

  for (const mem of participants) {
    teks += `✦ @${mem.id.split('@')[0]}\n`
  }

  teks += `\n╭─❖ 「 ${botname} 」❖─╮\n╰─⪼  𝒗${vs}`

  await conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map(a => a.id).concat(m.sender)
  })
}

handler.help = ['todos']
handler.tags = ['group']
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true
handler.group = true

export default handler
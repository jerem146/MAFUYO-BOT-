const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
  const pesan = args.join(' ')
  const oi = pesan ? `✦ *Mensaje:* ${pesan}` : '⚘ ᥫ᭡ *Sin mensaje adicional*'
  const botname = global.botname || 'CARLY | BOT'
  const vs = global.vs || '1.0.0'

  let teks = `╭━━━〔 *召喚 MENCION GENERAL* 〕━━━╮
│ 𖦹 *Miembros:* ${participants.length}
│ ${oi}
│ 
│ 𖠿 *Invocados por:* @${m.sender.split('@')[0]}
│ 
│ ｡･ﾟ･༻ ᯽ ${botname} ᯽ ༺･ﾟ･｡
╰━━━━━━━━━━━━━━━━━━━╯
`

  for (const mem of participants) {
    teks += `➸ @${mem.id.split('@')[0]}\n`
  }

  teks += `\n「 ✦ Versión ${vs} ✦ 」`

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
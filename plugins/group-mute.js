// import { isGroup } from "../lib/support.js" // ¡Eliminada esta línea!

let handler = async (m, { conn, isAdmin, isBotAdmin, args, usedPrefix, command, chat }) => {
    if (!m.isGroup) return m.reply('『✦』Este comando solo puede ser usado en grupos.')
    if (!isAdmin) return m.reply('『✦』Solo los administradores del grupo pueden usar este comando.')
    if (!isBotAdmin) return m.reply('『✦』El bot debe ser administrador para ejecutar este comando.')

    if (chat.isMute) {
        return m.reply(`『🔇』Este grupo ya está silenciado.`)
    }

    chat.isMute = true
    m.reply(`『🔇』Este grupo ha sido silenciado. Ahora los comandos están deshabilitados para los miembros. Los administradores pueden usar *${usedPrefix}unmute* para activarlos de nuevo.`)
}

handler.help = ['mute']
handler.tags = ['group']
handler.command = ['mute']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
// Este archivo NO requiere 'import { isGroup } from "../lib/support.js"'
let handler = async (m, { conn, isAdmin, isBotAdmin, args, usedPrefix, command, chat }) => {
    if (!m.isGroup) return m.reply('『✦』Este comando solo puede ser usado en grupos.')
    if (!isAdmin) return m.reply('『✦』Solo los administradores del grupo pueden usar este comando.')
    if (!isBotAdmin) return m.reply('『✦』El bot debe ser administrador para ejecutar este comando.')

    if (!chat.isMute) {
        return m.reply(`『🔊』Este grupo no está silenciado.`)
    }

    chat.isMute = false
    m.reply(`『🔊』Este grupo ha sido activado. Ahora los comandos están habilitados de nuevo para los miembros.`)
}

handler.help = ['unmute']
handler.tags = ['group']
handler.command = ['unmute']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
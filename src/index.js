const cheerio = require('cheerio')
const https = require('https')
const iconv = require('iconv-lite')

const url = 'https://www.etymonline.com/word/'
const languages = [/(Old French)$/, /(Anglo-French)$/, /(Old North French)$/, /(Old English)$/, /(PIE root)$/, /(Proto-Germanic)$/, /(Gallo-Roman)$/, /(Modern Latin)$/, /(Medieval Latin)$/, /(Late Latin)$/, /(Latin)$/, /(Greek)$/, /(French)$/]

function getEtym (word, callback) {
  let etymList = []
  https.get(url + word, res => {
    let chunks = []
    res.on('data', chunk => {
      chunks.push(chunk)
    })
    res.on('end', () => {
      const html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      const $ = cheerio.load(html, { decodeEntities: false })
      const allEntries = $('[class^="word--"]')
      $(allEntries).each((entryId, entryItem) => {
        const title = $($(entryItem).find('[class^="word__name--"]')[0]).text().trim()
        let etymDict = {}
        const paragraphs = $(entryItem).find('[class^="word__defination--"] p')
        $(paragraphs).each((pid, paraItem) => {
          $(paraItem).children().each((i, item) => {
            if ($(item).hasClass('notranslate')) {
              const lastText = item.prev.data.trim()
              for (const langRegExp of languages) {
                const groups = langRegExp.exec(lastText)
                if (groups && groups.length > 1) {
                  etymDict[groups[1]] = $(item).text().trim()
                  break
                }
              }
            }
          })
        })
        etymList.push({ title, etymDict })
      })
      callback && callback(etymList.filter(item => Object.keys(item.etymDict).length > 0))
    })
  }).on('error', e => {
    callback && callback([])
  })
}

module.exports = {
  getEtym
}

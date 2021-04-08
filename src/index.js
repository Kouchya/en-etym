const cheerio = require('cheerio')
const https = require('https')
const iconv = require('iconv-lite')

const url = 'https://www.etymonline.com/word/'
const languages = [/(Old French)$/, /(Anglo-French)$/, /(Old North French)$/, /(Old English)$/, /(PIE root)$/, /(PIE)$/, /(root)$/, /(Proto-Germanic)$/, /(Gallo-Roman)$/, /(Old Norse)$/, /(Modern Latin)$/, /(Medieval Latin)$/, /(Late Latin)$/, /(Latin)$/, /(Greek)$/, /(French)$/]

function _parseHTML (html) {
  let etymList = []
  const $ = cheerio.load(html, { decodeEntities: false })
  const allEntries = $('[class^="word--"]')
  $(allEntries).each((entryId, entryItem) => {
    const title = $($(entryItem).find('[class^="word__name--"]')[0]).text().trim()
    let etymDict = {}
    const paragraphs = $(entryItem).find('[class^="word__defination--"] p')
    $(paragraphs).each((pid, paraItem) => {
      $(paraItem).children().each((i, item) => {
        if ($(item).hasClass('notranslate')) {
          const lastText = item.prev && item.prev.data ? item.prev.data.trim() : null
          for (const langRegExp of languages) {
            const groups = langRegExp.exec(lastText)
            if (groups && groups.length > 1) {
              let key = groups[1]
              if (['PIE', 'root'].includes(key)) {
                key = 'PIE'
              }
              if (etymDict[key]) {
                etymDict[key].push($(item).text().trim())
              } else {
                etymDict[key] = [$(item).text().trim()]
              }
              break
            }
          }
        }
      })
    })
    if (Object.keys(etymDict).length > 0) {
      etymList.push({ title, etymDict })
    }
  })
  return etymList
}

function getEtym (word) {
  let etymList = []
  return new Promise((resolve, reject) => {
    https.get(url + word, res => {
      let chunks = []
      res.on('data', chunk => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        const html = iconv.decode(Buffer.concat(chunks), 'utf-8')
        etymList = _parseHTML(html)
        resolve(etymList)
      })
    }).on('error', e => {
      resolve([])
    })
  })
}

function getEtymSync (word, callback) {
  https.get(url + word, res => {
    let chunks = []
    res.on('data', chunk => {
      chunks.push(chunk)
    })
    res.on('end', () => {
      const html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      callback && callback(_parseHTML(html))
    })
  }).on('error', e => {
    callback && callback([])
  })
}

module.exports = {
  getEtym,
  getEtymSync
}

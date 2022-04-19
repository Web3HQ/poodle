var json = require('json!./../docs/index.json'),
    corpus = require('json!./../docs/corpus.json'),
    lunr = require('lunr'),
    wrapper = require('./wrapper.js')

var idx = lunr.Index.load(json)

var documents = corpus.reduce(function (memo, doc) {
  memo[doc.id] = doc
  return memo
}, {})

window.corpus = corpus
window.idx = idx
window.lunr = lunr

window.search = function (q) {
  console.time('search: ' + q)
  var results = idx.search(q)
  console.timeEnd('search: ' + q)
  return results
}

var buildSearchResult = function (doc) {
  var li = document.createElement('li'),
      article = document.createElement('article'),
      header = document.createElement('header'),
      section = document.createElement('section'),
      h2 = document.createElement('h2'),
      p = document.createElement('p')

  h2.dataset.field = 'name'
  h2.textContent = doc.name

  p.dataset.field = 'body'
  p.textContent = doc.body
  
  span.dataset.field = 'keywords'
  span.textContent = doc.keywords

  li.appendChild(article)
  article.appendChild(header)
  article.appendChild(section)
  header.appendChild(h2)
  section.appendChild(p)

  return li
}

var displayQueryError = function (queryText, error) {
  var message = document.createElement('p'),
      container = document.querySelector('.query-error')

  message.classList.add('message')
  message.textContent = error.message

  container.appendChild(message)
}

var clearQueryError = function () {
  var container = document.querySelector('.query-error')

  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

var searchForm = document.querySelector('#search-form'),
    searchField = searchForm.querySelector('input')

searchForm.addEventListener('reset', function (event) {
  clearQueryError()

  var ul = document.querySelector('ul')

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }

  Object.keys(documents).forEach(function (id) {
    var doc = documents[id],
        li = buildSearchResult(doc)

    ul.appendChild(li)
  })
})

searchForm.addEventListener('submit', function (event) {
  event.preventDefault()
  clearQueryError()

  var query = searchField.value,
      results = undefined,
      ul = document.querySelector('ul')

  try {
    results = idx.search(query)
  } catch(e) {
    if (e instanceof lunr.QueryParseError) {
      displayQueryError(query, e)
      return
    } else {
      throw e
    }
  }

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }

  results.forEach(function (result) {
    var doc = documents[result.ref],
        li = buildSearchResult(doc)

    Object.keys(result.matchData.metadata).forEach(function (term) {
      Object.keys(result.matchData.metadata[term]).forEach(function (fieldName) {
        var field = li.querySelector('[data-field=' + fieldName + ']'),
            positions = result.matchData.metadata[term][fieldName].position

        wrapper(field, positions)
      })
    })

    ul.appendChild(li)
  })
})

const Router = require('./router')
const index = require('./routes/index')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function handleRequest(request) {
  try {
    const r = new Router()
    r.get('/', index)
    return r.route(request)
  } catch (err) {
    return new Response(err)
  }
}
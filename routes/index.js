
const staticHost = "https://static-links-page.signalnerve.workers.dev"
const init ={
  headers : {
    "content-type": "text/html;charset=UTF-8",
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}


async function handleRequest(request) {
  const response = await fetch(staticHost, init)
  const results = await gatherResponse(response)
  return new Response(results, init);
}
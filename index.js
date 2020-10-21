const links = [
  {
    name: 'My Portfolio',
    url: 'https://abrahamjulian.github.io',
  },
  {
    name: 'Solution Repository',
    url:
      'https://github.com/AbrahamJulian/cloudflare-2020-general-engineering-assignment/tree/master',
  },
  {
    name: 'Review My Professor',
    url: 'https://aqueous-chamber-40576.herokuapp.com/',
  },
]

const header = {
  headers: {
    'content-type': 'text/html;charset=UTF-8',
  },
}
const jsonHeader = {
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
}

// ----- Event Listener -----
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(e) {
  const url = new URL(e.request.url)
  let element = url.pathname.split('/').filter(n => n)

  if (element[0] == 'links') {
    const json = JSON.stringify(links, null, 2)
    return new Response(json, jsonHeader)
  } else if (element[0] == undefined) {
    const res = await fetch(
      'https://static-links-page.signalnerve.workers.dev/',
      header,
    )

    return new HTMLRewriter()
      .on('div#links', new LinkTransformer())
      .on('body', new BackgroundTransformer())
      .on('div#profile', new ProfileTransformer())
      .on('h1#name', new UsernameTransformer())
      .on('img#avatar', new AvatarTransformer())
      .on('div#social', new SocialTransformer())
      .transform(res)
  } else {
    return new Response('Error', { status: '400' })
  }
}

// ----- HTML Transformer Classes -----
class AvatarTransformer {
  async element(e) {
    e.setAttribute(
      'src',
      'https://avatars1.githubusercontent.com/u/22462689?s=400&u=aa79196c27928d1539d4633a08bad8c4706b4a22&v=4',
    )
  }
}
class LinkTransformer {
  constructor(links) {
    this.links = links
  }

  async element(e) {
    links.forEach(link => {
      e.append(`<a href="${link.url}" target="_blank">${link.name}</a>`, {
        html: true,
      })
    })
  }
}

class UsernameTransformer {
  async element(e) {
    e.setInnerContent('Abraham Santosa')
  }
}

class BackgroundTransformer {
  async element(e) {
    e.setAttribute(
      'class',
      'bg-gradient-to-r from-orange-400 via-red-500 to-pink-500',
    )
  }
}

class ProfileTransformer {
  async element(e) {
    e.removeAttribute('style')
    e.get
  }
}

class SocialTransformer {
  async element(e) {
    e.removeAttribute('style')
    e.append(
      '<a href="https://github.com/AbrahamJulian" target="_blank"><img src="https://www.flaticon.com/svg/static/icons/svg/2111/2111425.svg"></a>',
      { html: true },
    )
    e.append(
      '<a href="https://www.linkedin.com/in/abraham-santosa-671b9b106/" target="_blank"><img src="https://www.flaticon.com/svg/static/icons/svg/1384/1384014.svg"></a>',
      { html: true },
    )
    e.append(
      '<a href="https://leetcode.com/kosalya/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"></a>',
      { html: true },
    )
  }
}

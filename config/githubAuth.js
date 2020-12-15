const fetch = require('node-fetch');

module.exports = {
    githubUser: async function (access_token) {
        const req =  await fetch('https://api.github.com/user', {
            headers : {
              Authorization : `bearer ${access_token}`
            }
          })
       
          const data = await req.json()
          return data;
    },
    getAccessToken: async function ({code,client_id,client_secret}){
    const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  })
  const text = await res.text()
  const params = new URLSearchParams(text);
  return params.get("access_token");
    }

}



require('dotenv').config();

const { Octokit } = require('octokit');

async function setup() {
    const octokit = new Octokit({
        auth: process.env.PERSONAL_ACCESS_TOKEN,
    })

    const response = await octokit.request('GET /repos/5aitama/Blog/contents/public/db.json');

    console.log(response.data);

    await octokit.request('PUT /repos/5aitama/Blog/contents/public/db.json', {
        message: 'Update the db.json',
        committer: {
            name: 'Admiral サイタマ',
            email: 'alx.sb@icloud.com'
        },
        content: response.data.content,
        sha: response.data.sha,
    });
}

setup();
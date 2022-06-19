require('dotenv').config();
const { exec } = require("child_process");
const { Octokit } = require('octokit');
const slugify = require('slugify');

const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
});

async function getFileFromGithub(path) {
    return await octokit.request(`GET /repos/5aitama/Blog/contents/${path}`);
}


async function setFileToGithub(path, sha, content, message = "update file") {
    await octokit.request(`PUT /repos/5aitama/Blog/contents/${path}`, {
        message: message,
        committer: {
            name: process.env.COMMITER_NAME,
            email: process.env.COMMITER_MAIL,
        },
        content: Buffer.from(content).toString('base64'),
        sha: sha,
    });
}

async function setup() {
    const dbPubJsonFile = await getFileFromGithub("public/db.json");
    const dbDocJsonFile = await getFileFromGithub("docs/db.json");
    
    /** @type {{articles: [{title: string, slug: string, description: string, content: string, date: string}]}} */
    let db = JSON.parse(Buffer.from(dbPubJsonFile.data.content, "base64").toString("utf8"));

    const title = "Another title";

    db.articles.push({
        title: title,
        slug: slugify(title, { lower: true }),
        description: "This is a description",
        content: "# This is a title\nThis is a content !",
        date: new Date().toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" })
    });

    const data = JSON.stringify(db);
    const message = "Update the db.json";

    await setFileToGithub('public/db.json', dbPubJsonFile.data.sha, data, message);
    await setFileToGithub('docs/db.json', dbDocJsonFile.data.sha, data, message);
}

setup();
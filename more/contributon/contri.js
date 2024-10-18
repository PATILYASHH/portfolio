// Replace with your GitHub username and personal access token
const username = 'sujal1201'; // Your GitHub username
const token = 'API_KEY'; // Your GitHub personal access token

async function fetchContributions() {
    const url = `https://api.github.com/search/issues?q=author:${username}+is:pr+is:merged&per_page=100`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const pullRequests = data.items;

        displayContributions(pullRequests);
    } catch (error) {
        console.error('Error fetching pull requests:', error);
    }
}

function displayContributions(pullRequests) {
    const container = document.getElementById('contributors-container');
    const contributionCount = document.getElementById('contribution-count');
    container.innerHTML = '';

    pullRequests.forEach(pr => {
        const prElement = document.createElement('div');
        prElement.className = 'my-contributor';
        prElement.innerHTML = `
            <h2><a href="${pr.html_url}" target="_blank">${pr.title}</a></h2>
            <p>Repository: ${pr.repository_url.split('/').pop()}</p>
            <p>Merged At: ${new Date(pr.closed_at).toLocaleDateString()}</p>
        `;
        container.appendChild(prElement);
    });

    contributionCount.textContent = pullRequests.length;
}

document.addEventListener('DOMContentLoaded', fetchContributions);
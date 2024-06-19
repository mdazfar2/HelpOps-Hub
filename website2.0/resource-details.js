document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get('folder');

    if (folderName) {
        const possibleReadmeNames = ['README.md', 'Readme.md', 'readme.md', 'Project.md', 'project.md'];
        let readmeFetched = false;

        possibleReadmeNames.reduce((promiseChain, readmeName) => {
            return promiseChain.then(() => {
                if (!readmeFetched) {
                    const readmeUrl = `https://raw.githubusercontent.com/mdazfar2/HelpOps-Hub/main/${folderName}/${readmeName}`;
                    return fetch(readmeUrl)
                        .then(response => {
                            if (response.ok) {
                                readmeFetched = true;
                                return response.text();
                            }
                            return Promise.reject(`File not found: ${readmeName}`);
                        })
                        .then(text => {
                            const converter = new showdown.Converter({
                                simplifiedAutoLink: true,
                                tables: true,
                                strikethrough: true,
                                tasklists: true,
                                literalMidWordUnderscores: true
                            });
                            const html = converter.makeHtml(text);
                            document.getElementById('content').innerHTML = html;

                            // Add copy buttons to code blocks
                            document.querySelectorAll('pre').forEach(pre => {
                                const button = document.createElement('button');
                                button.className = 'copy-button';
                                button.innerText = 'Copy';
                                button.addEventListener('click', () => {
                                    const code = pre.querySelector('code').innerText;
                                    copyToClipboard(code);
                                });
                                pre.appendChild(button);
                            });

                            const repoLink = `https://github.com/mdazfar2/HelpOps-Hub/tree/main/${folderName}`;
                            document.getElementById('repo-link').href = repoLink;
                        })
                        .catch(error => {
                            console.warn(error);
                        });
                }
            });
        }, Promise.resolve()).then(() => {
            if (!readmeFetched) {
                document.getElementById('content').innerHTML = 'README file not found.';
            }
        });
    } else {
        document.getElementById('content').innerHTML = 'No folder specified.';
    }
});

function copyToClipboard(text) {
  const container = document.createElement('div');
  container.innerHTML = text;
  const pre = container.querySelector('pre');
  let content = '';

   if (pre) {
     content = pre.innerText;
   } else {
     const img = container.querySelector('img');
    if (img) {
      const imgSrc = img.src;
      const imgAlt = img.alt;
      content = `![${imgAlt}](${imgSrc})`;
    } else {
   // Check for image links in the format ![alt text](path/to/image.jpg)
     const imageLink = text.match(/!\[(.*?)\]\((.*?)\)/);
     if (imageLink) {
     content = `![${imageLink[1].trim()}](${imageLink[2]})`;
    } else {
      content = text;
    }
   }
  }

  const textarea = document.createElement('textarea');
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showToast('Code copied!');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}
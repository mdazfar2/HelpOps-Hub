# HelpOps-Hub Contributing Guidelines
Thank you for taking the time to contribute to DevOps World. Your help is essential for keeping it great.

Please take a moment to read the following guidelines before contributing:

> **⚠️IMPORTANT**
>
> **Pull Requests _having no issue associated_ with them _will not be accepted_. Firstly get an issue assigned, whether it's already opened or raised by you, and then create a Pull Request.**
>
> **An automated process has been implemented to ensure the timely management of Pull Requests (PRs) on this platform.**
>
> **PRs that have been open for a duration exceeding 45 days will be automatically closed, so please plan accordingly.**

## Prerequisites ⚠️

- Open Source Etiquette: If you've never contributed to an open source project before, have a read of [Basic etiquette](https://developer.mozilla.org/en-US/docs/MDN/Community/Open_source_etiquette) for open source projects.

- Basic familiarity with Git and GitHub: If you are also new to these tools, visit [GitHub for complete beginners](https://developer.mozilla.org/en-US/docs/MDN/Contribute/GitHub_beginners) for a comprehensive introduction to them.

---

## How to Contribute 🤔

To get started, look at the existing [**create a new issue**](https://github.com/mdazfar2/HelpOps-Hub/issues/new)!

### Setup guidelines 🪜
Follow these steps to setup ShellScript-Toolkit on your local machine
1. [Fork](https://github.com/mdazfar2/HelpOps-Hub/fork) the repository
2. Clone the project to run on your local machine using the following command:

    ```sh
   git clone https://github.com/<your_github_username>/HelpOps-Hub.git
   ```

3. Get into the root directory

   ```sh
   cd HelpOps-Hub
   ```

4. 5. Create your branch

   ```sh
   git checkout -b <your_branch_name>
   ```

- After all completion then push and then create pull request

7. Make your changes before staging them.

8. Stage your changes

   ```sh
   git add <filename>
   ```

9. Commit your changes

   ```sh
   git commit -m "<your-commit-message>"
   ```

10. Push your changes to your branch

    ```sh
    git push origin "<your_branch_name>"
    ```

11. Create a [PULL REQUEST](https://github.com/mdazfar2/HelpOps-Hub/compare) 💣

    > Click _compare across forks_ if you don't see your branch

---

## 🧑‍💻 Engage in Discussions 
Join our community [discussions](https://github.com/mdazfar2/HelpOps-Hub/discussions) to share insights and collaborate with others:
- **Visit the Forum**: Head over to our community forum.
- **Participate Actively**: Engage in ongoing discussions or start new ones on topics you're passionate about.

## ✅ Guidelines for Good Commit Messages 
We follow a standardized commit message format using Commitlint to ensure consistency and clarity in our commit history. Each commit message should adhere to the following guidelines:

1. **Be Concise and Descriptive**: Summarize the change in a way that’s easy to understand at a glance.
2. **Use the Imperative Mood**: Write as if giving a command (e.g., `Add`, `Fix`, `Update`), which is a convention in many projects.
3. **Include Context**: Provide context or reason for the change if it’s not immediately obvious from the summary.
4. **Reference Issues and Pull Requests**: Include `issue numbers` or PR references if the commit addresses them.
5. **Issue reference** (Optional): Include the issue number associated with the commit (e.g., `#123`).

## 📝 Commit Message Examples ✅
### Adding New Tools or Resources
- `Add - Jenkins setup guide to CI/CD section`
- `Include - Terraform best practices in infrastructure as code`
- `Add - Kubernetes cheat sheet to containerization`

### Fixing Errors or Bugs
- `Fix - typo in Docker installation guide`
- `Correct - broken link in Ansible playbook documentation`
- `Resolve - issue #42: Misleading description in Helm chart guide`

### Updating Existing Content
- `Update - Jenkins pipeline examples with new syntax`
- `Revise - Docker security best practices`
- `Refresh - CI/CD tools comparison chart`

### Enhancing Documentation
- `Improve - readability of Kubernetes deployment tutorial`
- `Add - examples to Terraform variable documentation`
- `Enhance - troubleshooting section in Prometheus guide`

### General Maintenance
- `Refactor - README for better clarity`
- `Reorganize repository structure for easier navigation`
- `Remove - outdated CI/CD tools from recommendations`

# ❌ Examples of Invalid Commit Messages

- `Added new stuff`
- `Fixed a bug`
- `Updated code`
- `auth feature update`
- `chore: fixed some stuff`

## Commit Example with Commitlint

```bash
git commit -m "feat(auth): Implement user signup process (#789)"
```

---

- If something is missing here, or you feel something is not well described, please [raise an issue](https://github.com/mdazfar2/HelpOps-Hub/issues).




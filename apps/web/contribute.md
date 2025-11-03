# Contributing to laminarflow

First off, thank you for considering contributing to laminarflow! We welcome any help, from reporting bugs and suggesting features to writing code.

This guide provides instructions for setting up the project locally to get you started.

## Table of Contents

*   [Code of Conduct](#code-of-conduct)
*   [Reporting Bugs and Suggesting Features](#reporting-bugs-and-suggesting-features)
*   [Development Setup](#development-setup)
    *   [Prerequisites](#prerequisites)
    *   [Forking the Repository](#forking-the-repository)
    *   [Cloning Your Fork](#cloning-your-fork)
    *   [Installing Dependencies](#installing-dependencies)
    *   [Environment Variables](#environment-variables)
    *   [Running the Development Server](#running-the-development-server)
*   [Running Linters and Formatters](#running-linters-and-formatters)
*   [Running Tests](#running-tests) <!-- Optional: Include if you have tests -->
*   [Submitting Changes (Pull Request Process)](#submitting-changes-pull-request-process)
*   [Getting Help](#getting-help)

## Code of Conduct

This project and everyone participating in it are governed by the [laminarflow Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior. *(**Note:** You'll need to create a `CODE_OF_CONDUCT.md` file, perhaps using a standard template like the Contributor Covenant).*

## Reporting Bugs and Suggesting Features

We use GitHub Issues to track public bugs and feature requests.

*   **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/your-username/laminarflow/issues). <!-- **TODO:** Replace with your actual repo URL -->
*   If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/your-username/laminarflow/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring. <!-- **TODO:** Replace with your actual repo URL -->
*   For feature requests, please provide context on the problem you're trying to solve and why the feature would be beneficial.

## Development Setup

Follow these steps to get your local development environment running.

### Prerequisites

*   **Node.js:** We recommend using `v22.11.0` version. You can download it from [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm).
*   **pnpm:** This project uses `pnpm` by default. Ensure you have version `10.4.1` or higher. <!-- **TODO:** Specify pnpm/yarn version if necessary -->
*   **Git:** For version control.

### Forking the Repository

1.  Go to the main repository page on GitHub: [https://github.com/your-username/laminarflow](https://github.com/your-username/laminarflow) <!-- **TODO:** Replace with your actual repo URL -->
2.  Click the "Fork" button in the top-right corner. This creates a copy of the repository under your GitHub account.

### Cloning Your Fork

1.  Open your terminal or command prompt.
2.  Clone your forked repository to your local machine (replace `<your-github-username>`):
    ```bash
    git clone https://github.com/<your-github-username>/laminarflow.git
    ```
3.  Navigate into the project directory:
    ```bash
    cd laminarflow
    ```
4.  (Optional but Recommended) Add the original repository as an upstream remote. This helps keep your fork synced with the main project.
    ```bash
    git remote add upstream https://github.com/your-username/laminarflow.git
    # Verify remotes
    git remote -v
    ```
    <!-- **TODO:** Replace with your actual repo URL -->

### Installing Dependencies

Install the project's dependencies using pnpm:

```bash
pnpm install
```


### Environment Variables

This project requires certain environment variables to run correctly (e.g., API keys, database URLs).

1.  Create a local environment file by copying the example file:
    ```bash
    cp .env.example .env
    ```
   
2.  Open the `.env` file in your editor.
3.  Fill in the required values. You might need to sign up for specific services or use provided development keys . Check the comments in the `.env.example` or specific documentation for guidance on obtaining these values. <!-- **TODO:** Add specific instructions if needed, e.g., where to get API keys -->

### Running the Development Server

Once dependencies are installed and environment variables are set, you can start the Next.js development server:

```bash
pnpm run dev
```

This will typically start the application on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to see the application running. The server will automatically reload when you make changes to the code.

## Project Structure

Here's an overview of the key directories in the `laminarflow` project:


```
├── app/ 
│ ├── (dashboard)/ 
│ │ ├── layout.tsx 
│ │ └── page.tsx 
│ ├── api/ 
│ ├── layout.tsx 
│ └── page.tsx
├── components/ 
│ ├── ui/ 
│ └── dashboard/ 
├── lib/ 
│ └── utils.ts 
├── prisma/ 
│ ├── schema.prisma 
│ └── migrations/ 
├── styles/ 
│ └── globals.css 

```

The `app` directory contains the code for:

- `api`: API route handler
- `auth`: Authentication handler
- `components`: Small UI components
- `dashboard`: User dashboard
- `early-access`: User waitlist
- `login`: User login
- `onboarding`: User onboarding
- `settings`: User settings

- `layout.tsx` :  Root layout for the entire application

- `page.tsx` :Application home page (root)

<br>

The `prisma` directory contains the code for:

-   Prisma Configuration for LaminarFlow’s web-app.

## Submitting Changes (Pull Request Process)

1.  **Sync your fork:** Before starting work, ensure your fork's `main` branch is up-to-date with the upstream `main` branch:
    ```bash
    git checkout main
    git fetch upstream
    git merge upstream/main
    git push origin main # Update your fork on GitHub
    ```
2.  **Create a new branch:** Create a descriptive branch name for your feature or bug fix:
    ```bash
    # Example for a feature
    git checkout -b feature/add-cool-new-button

    # Example for a bug fix
    git checkout -b fix/resolve-login-issue
    ```
3.  **Make your changes:** Write your code and corresponding tests (if applicable).
4.  **Lint and test:** Run `pnpm run lint` and `pnpm run test` (if applicable) to ensure code quality and functionality.
5.  **Commit your changes:** Use clear and concise commit messages. Consider following the [Conventional Commits](https://www.conventionalcommits.org/) specification if the project uses it.
    ```bash
    git add .
    git commit -m "feat: Add cool new button to settings page"
    # or
    git commit -m "fix: Prevent crash when user logs out"
    ```
6.  **Push your branch:** Push your changes to your fork on GitHub:
    ```bash
    git push origin feature/add-cool-new-button
    ```
7.  **Open a Pull Request (PR):**
    *   Go to your fork on GitHub (`https://github.com/<your-github-username>/laminarflow`).
    *   You should see a prompt to create a Pull Request from your recently pushed branch. Click it.
    *   Ensure the base repository is the original `your-username/laminarflow` and the base branch is `main` (or the project's default branch).
    *   Ensure the head repository is your fork and the compare branch is your feature/fix branch.
    *   Provide a clear title and description for your PR. Explain *what* you changed and *why*. Link to any relevant GitHub issues (e.g., "Closes #123").
    *   Submit the Pull Request.

8.  **Address feedback:** Project maintainers may review your PR and request changes. Make the necessary updates, commit them to your branch, and push again. The PR will update automatically.

## Getting Help

If you get stuck or have questions, feel free to:

*   Open an issue on GitHub (for specific problems or questions).
*   <!-- **TODO:** Add other contact methods if available (e.g., Discord server, mailing list) -->

Thank you for contributing!
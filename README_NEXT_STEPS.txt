ProjectIQ v0.3.0 Leads Pack

What this pack does
- adds a real UI shell
- adds a working Leads page
- adds a simple FastAPI leads API
- adds Vite base configuration for GitHub Pages project-site deployment

IMPORTANT
Run frontend commands from:
C:\Users\jason\ProjectIQ\frontend

Run backend commands from:
C:\Users\jason\ProjectIQ\backend

How to install this pack
1. Unzip this pack into the root of C:\Users\jason\ProjectIQ
2. Allow the files to overwrite existing files
3. In frontend:
   npm install
   npm run dev
4. In backend:
   .\venv\Scripts\activate
   uvicorn app.main:app --reload

GitHub Pages note
Because this is a project repository named ProjectIQ and not a user-site repository, the frontend uses:
base: "/ProjectIQ/"

That is the correct Vite setting for GitHub Pages project deployments.

GitHub Pages settings to verify
1. GitHub repository -> Settings -> Pages
2. Source:
   - either Deploy from a branch
   - or GitHub Actions
3. If using branch deploy:
   - Branch: gh-pages OR main
   - Folder: / (root) or /docs depending on your deployment plan

For a Vite/React app, GitHub Actions or a gh-pages deployment is usually cleaner than raw branch-root publishing because Vite needs a build step.

Suggested next commit
git add .
git commit -m "v0.3.0 - leads module and GitHub Pages base config"
git push

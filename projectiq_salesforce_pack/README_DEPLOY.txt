ProjectIQ Salesforce Deployment Pack

WHAT THIS PACK DOES
- Replaces the basic Vite starter with a Salesforce-style admin shell
- Uses HashRouter so GitHub Pages route refreshes do not 404
- Sets Vite base to /ProjectIQ/
- Adds GitHub Actions deployment for GitHub Pages

WHERE TO UNZIP
Unzip this pack into the root of:
C:\Users\jason\ProjectIQ
Allow overwrite.

LOCAL FRONTEND RUN
cd C:\Users\jason\ProjectIQ\frontend
npm install
npm run dev

BACKEND RUN
cd C:\Users\jason\ProjectIQ\backend
.\venv\Scripts\activate
uvicorn app.main:app --reload

GITHUB PUSH
cd C:\Users\jason\ProjectIQ
git add .
git commit -m "v0.4.0 - salesforce shell and github pages deployment"
git push

GITHUB PAGES SETTINGS
1. GitHub repo -> Settings -> Pages
2. Under Build and deployment, set Source to GitHub Actions
3. Push to main and wait for workflow to finish
4. Site URL should publish under your repo GitHub Pages address

IMPORTANT
- Run npm install in frontend after unzip so package-lock.json is created or updated
- The workflow uses npm ci, which expects a lock file
- After npm install, commit package-lock.json too

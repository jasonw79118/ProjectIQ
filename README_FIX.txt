PROJECTIQ LEADS + 404 FIX PACK

This pack fixes two issues:
1. Leads page cannot load leads from FastAPI on port 8000
2. Reloading the site causes a 404 on GitHub Pages

STEPS
1. Unzip into C:\Users\jason\ProjectIQ and allow overwrite.
2. Start backend:
   cd C:\Users\jason\ProjectIQ\backend
   .\venv\Scripts\activate
   uvicorn app.main:app --reload
3. Test backend:
   http://127.0.0.1:8000/health
4. Start frontend in another window:
   cd C:\Users\jason\ProjectIQ\frontend
   npm install
   npm run dev
5. Open:
   http://localhost:5173/ProjectIQ/#/leads

PUSH
   cd C:\Users\jason\ProjectIQ
   git add .
   git commit -m "Fix leads API and GitHub Pages reload 404"
   git push

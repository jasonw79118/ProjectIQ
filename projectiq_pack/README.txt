ProjectIQ v0.2.0 Starter Pack

What is included:
- frontend/src/App.jsx
- frontend/src/index.css
- frontend/src/layouts/MainLayout.jsx
- frontend/src/pages/*.jsx
- backend/app/main.py

How to use:
1. Extract this zip into the root of your ProjectIQ repo.
2. Allow it to merge/replace matching files.
3. In frontend, run:
   npm install
   npm install react-router-dom
   npm run dev
4. In backend, run:
   .\venv\Scripts\activate
   uvicorn app.main:app --reload

Git commands after testing:
   git add .
   git commit -m "v0.2.0 - UI shell starter pack"
   git push

Note about 404:
If you saw a 404 in the browser before, it was likely because the route/file structure was not in place yet, or the browser requested a favicon. This pack gives you the actual shell files needed for the frontend app.

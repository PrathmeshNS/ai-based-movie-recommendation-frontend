Render deployment notes

- Problem seen on Render: `react-scripts: not found` when Render used Node 22.
- Cause: `react-scripts@5` is not compatible with Node 22+ in some environments. Pin Node to 18.

What I added:
- `engines.node` = "18.x" in `package.json` so Render will prefer Node 18.
- `.nvmrc` with `18` so local/dev tools know the intended Node version.

Render build settings (when creating the Static Site):
- Root Directory: `frontend` (if your repo root contains multiple projects)
- Build Command: `npm install --legacy-peer-deps && npm run build`
- Publish Directory: `build`

Environment variables:
- Add `REACT_APP_API_URL` with your backend URL (e.g., `https://your-backend.onrender.com`).

If you still see `react-scripts: not found` on Render:
- Ensure Render picked Node 18 (check the build log). Look for a line like `Using Node v18.x`.
- Alternatively, update `react-scripts` to a more recent version that supports Node 22, or use a newer Create React App template.

Local build/preview commands (PowerShell):

# install
npm install

# dev server
npm start

# build (with env var)
$env:REACT_APP_API_URL='http://localhost:8000'; npm run build


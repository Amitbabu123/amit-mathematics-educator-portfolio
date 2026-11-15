# Amit Kumar Portfolio — Deployment

## Before publishing
- Put the resume PDF at `client/public/Amit-Kumar-Resume.pdf` (exact spelling and capitalization).
- Keep `client/public/amit-kumar-profile.jpg` for the profile photo.
- Never commit `.env` files, database passwords, or MongoDB connection strings.
- The Resume button in `client/src/App.jsx` already points to `/Amit-Kumar-Resume.pdf`.

## GitHub
1. Create a new private or public GitHub repository.
2. Upload the contents of this project folder (the root `package.json`, `client/`, `server/`, `netlify.toml`).
3. Do not upload `node_modules`, `.env`, or credentials.

## MongoDB Atlas
1. Rotate the database user's password if it has been shared anywhere.
2. In Atlas, open Network Access and add the IP access range required by your hosting provider. For Render outbound IP allowlisting, use the current outbound IP information for your Render service; avoid opening access to the entire internet unless temporarily needed for testing.
3. Copy the Node.js driver connection string and replace its password only in Render's secret environment variable.
4. Use a database path such as `/amit_portfolio` in the connection string.

## Render API
Create a Web Service from the same GitHub repository:
- Root Directory: `server`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables:
  - `MONGODB_URI` = your private Atlas connection string, including `/amit_portfolio`
  - `CLIENT_ORIGIN` = your exact Netlify site URL, e.g. `https://your-site-name.netlify.app`
  - `NODE_ENV` = `production`
Render provides `PORT` automatically. After deployment, verify `https://YOUR-API.onrender.com/api/health` returns JSON with status `ok`.

## Netlify frontend
Import the same GitHub repository into Netlify. The root `netlify.toml` sets:
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
Set this environment variable in Netlify:
- `VITE_API_URL` = `https://YOUR-API.onrender.com` (no trailing slash)
Trigger a new deploy after setting it.

## Test
- Open the Netlify URL in a private/incognito browser window.
- Check the photo and all links.
- Open `https://YOUR-SITE.netlify.app/Amit-Kumar-Resume.pdf` directly; it should display/download the PDF.
- Submit a test contact message, then verify the `enquiries` collection in the `amit_portfolio` database in Atlas.

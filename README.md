# Amit Kumar — Mathematics Educator Portfolio

A premium MERN portfolio starter with a React/Vite frontend and Express/MongoDB contact API.

## Requirements
- Node.js 20+
- npm
- MongoDB Atlas account (only needed to persist contact enquiries)

## Run locally
1. Extract this folder.
2. Open it in VS Code.
3. In the project root terminal:

```bash
npm install
npm --prefix client install
npm --prefix server install
```

4. Create `server/.env` by copying `server/.env.example`.
5. Add your MongoDB Atlas connection string to `MONGODB_URI`.
6. Start both apps:

```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend health check: http://localhost:5000/api/health

The frontend works without MongoDB; contact submissions will show a helpful message until the backend is configured.

## Before publishing
- Replace the profile photo placeholder with your own approved photograph.
- Verify dates, designation, contact details, achievements and all experience statements.
- Add your resume PDF at `client/public/Amit-Kumar-Resume.pdf`.
- Set `VITE_API_URL` for the deployed frontend (e.g. your Render API URL).
- Configure `CLIENT_ORIGIN` on the backend to your deployed Vercel URL.
- Never commit `.env` or credentials.

## Free deployment outline
- Push the project to GitHub.
- Deploy `server` on Render (Root Directory: `server`, Build: `npm install`, Start: `npm start`).
- Deploy `client` on Vercel (Root Directory: `client`, Build: `npm run build`, Output: `dist`).
- Set `VITE_API_URL` in Vercel and `MONGODB_URI`, `CLIENT_ORIGIN` in Render.

## Accuracy note
The profile content is a draft based on information previously shared. Confirm every detail before publishing. In particular, verify the exact Universal Books designation, employment dates, and the precise scope of work.


### Personal details added
- Profile photo: `client/public/amit-kumar-profile.jpg`
- Email: `amitkumar823900@gmail.com`
- GitHub, LinkedIn and Crio.do portfolio links are configured in `client/src/App.jsx`.

# Quick Start Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Code is committed and pushed to GitHub/GitLab/Bitbucket
- [ ] You have accounts on:
  - [ ] MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
  - [ ] Render (https://render.com)
  - [ ] Cloudinary (https://cloudinary.com)

## 📋 Step-by-Step Deployment

### 1. MongoDB Atlas Setup (10 minutes)

- [ ] Create free M0 cluster
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Replace `<username>`, `<password>`, and add database name

### 2. Deploy Backend to Render (15 minutes)

- [ ] Create new Web Service
- [ ] Connect Git repository
- [ ] Set Root Directory: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Add all environment variables (see DEPLOYMENT_GUIDE.md Part 3, Step 2)
- [ ] Deploy and wait for completion
- [ ] Copy backend URL

### 3. Deploy Frontend to Render (15 minutes)

- [ ] Create new Static Site
- [ ] Connect same Git repository
- [ ] Set Root Directory: `client`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`
- [ ] Add environment variable: `VITE_API_URL=<your-backend-url>`
- [ ] Deploy and wait for completion
- [ ] Copy frontend URL

### 4. Update Backend CORS (5 minutes)

- [ ] Go back to backend service on Render
- [ ] Update `CLIENT_URL` environment variable with frontend URL
- [ ] Save changes (auto-redeploys)

### 5. Test Your Application (10 minutes)

- [ ] Open frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test browsing products
- [ ] Test cart functionality
- [ ] Test admin features

## 🔑 Environment Variables Quick Reference

### Backend (Render Web Service)

```
PORT=5000
DB_URL=<mongodb-atlas-connection-string>
CLIENT_URL=<frontend-url-from-render>
JWT_SECRET=<generate-32-char-random-string>
CLOUDINARY_CLOUD_NAME=<from-cloudinary>
CLOUDINARY_API_KEY=<from-cloudinary>
CLOUDINARY_API_SECRET=<from-cloudinary>
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=<from-paypal>
PAYPAL_CLIENT_SECRET=<from-paypal>
PAYSTACK_PUBLIC_KEY=<optional>
PAYSTACK_SECRET_KEY=<optional>
FLUTTERWAVE_PUBLIC_KEY=<optional>
FLUTTERWAVE_SECRET_KEY=<optional>
```

### Frontend (Render Static Site)

```
VITE_API_URL=<backend-url-from-render>
```

## 🚨 Common Issues

**"Network Error" in frontend:**

- Check `VITE_API_URL` is correct
- Check `CLIENT_URL` in backend matches frontend URL

**"Cannot connect to MongoDB":**

- Verify IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has correct permissions

**"Services sleeping":**

- Free tier services sleep after 15 min inactivity
- First request takes 30-60 seconds to wake

## 📚 Full Documentation

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🎯 Quick Commands

Generate JWT Secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Test MongoDB Connection:

```bash
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING').then(() => console.log('Connected!')).catch(err => console.error(err));"
```

# Deployment Guide: E-Commerce Application to Render + MongoDB Atlas

This guide will walk you through deploying your e-commerce application to Render with MongoDB Atlas as your database.

## Prerequisites

- Git installed and repository pushed to GitHub/GitLab/Bitbucket
- [Render](https://render.com) account (free tier available)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available)
- Cloudinary account for image storage

---

## Part 1: Setting Up MongoDB Atlas

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up/login
2. Click "Build a Database" or "Create" button
3. Choose the **FREE** tier (M0 Sandbox)
4. Select a cloud provider and region closest to your Render deployment region
5. Name your cluster (e.g., "ecommerce-cluster")
6. Click "Create Cluster" (this takes 1-3 minutes)

### Step 2: Configure Database Access

1. In the left sidebar, click **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create a username and strong password (save these securely!)
5. Set user privileges to **Read and write to any database**
6. Click **Add User**

### Step 3: Configure Network Access

1. In the left sidebar, click **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (required for Render)
   - This adds `0.0.0.0/0` which allows connections from any IP
4. Click **Confirm**

### Step 4: Get Your Connection String

1. Go back to **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Select **Connect your application**
4. Choose **Driver: Node.js** and **Version: 5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database username
7. Replace `<password>` with your database password
8. Add your database name after `.mongodb.net/` (e.g., `/ecommerce`)

   Final example:

   ```
   mongodb+srv://myuser:mypassword123@cluster0.abc12.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

---

## Part 2: Prepare Your Code for Deployment

### ✅ Already Completed

The following configurations have been set up in your codebase:

- ✅ Server CORS configured to use `CLIENT_URL` environment variable
- ✅ Client API calls centralized using `API_BASE_URL`
- ✅ Environment variable templates created (`.env.example` files)

### Create Client .env for Production

Create `client/.env.production` (for local production build testing):

```env
VITE_API_URL=https://your-backend-app.onrender.com
```

---

## Part 3: Deploy Backend to Render

### Step 1: Create Web Service for Backend

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your Git repository
4. Configure the service:

   **Basic Settings:**
   - **Name**: `ecommerce-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

   **Instance Type:**
   - Select **Free** tier (or paid if needed)

### Step 2: Add Environment Variables

Scroll down to **Environment Variables** and add:

```
PORT=5000
DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
CLIENT_URL=https://your-frontend-app.onrender.com
JWT_SECRET=your_very_secure_random_string_here_at_least_32_characters
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
```

**Important Notes:**

- Replace `DB_URL` with your MongoDB Atlas connection string from Part 1
- For `JWT_SECRET`, generate a secure random string: use Node.js command:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- You'll update `CLIENT_URL` after deploying the frontend (Step 3)

### Step 3: Deploy Backend

1. Click **Create Web Service**
2. Wait for deployment to complete (5-10 minutes)
3. Once deployed, copy your backend URL: `https://ecommerce-backend-XXXX.onrender.com`

---

## Part 4: Deploy Frontend to Render

### Step 1: Create Static Site for Frontend

1. In Render Dashboard, click **New +** → **Static Site**
2. Connect your Git repository (same repo as backend)
3. Configure the site:

   **Basic Settings:**
   - **Name**: `ecommerce-frontend`
   - **Region**: Choose same as backend
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 2: Add Environment Variables

Add environment variable:

```
VITE_API_URL=https://your-backend-app.onrender.com
```

Replace with your actual backend URL from Part 3, Step 3.

### Step 3: Deploy Frontend

1. Click **Create Static Site**
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your frontend URL: `https://ecommerce-frontend-XXXX.onrender.com`

---

## Part 5: Update Backend CORS Configuration

### Important: Update CLIENT_URL

1. Go back to your **backend web service** on Render
2. Go to **Environment** tab
3. Update the `CLIENT_URL` variable with your frontend URL:
   ```
   CLIENT_URL=https://ecommerce-frontend-XXXX.onrender.com
   ```
4. Click **Save Changes**
5. Render will automatically redeploy your backend

---

## Part 6: Test Your Deployment

1. Open your frontend URL in a browser
2. Test the following:
   - ✅ User registration
   - ✅ User login
   - ✅ Browse products
   - ✅ Add to cart
   - ✅ Checkout process
   - ✅ Admin panel (if applicable)

### Common Issues & Solutions

**Issue: "Network Error" or API calls failing**

- Solution: Check that `VITE_API_URL` in frontend matches your backend URL
- Solution: Verify `CLIENT_URL` in backend matches your frontend URL
- Solution: Check Render logs for errors (Dashboard → Service → Logs)

**Issue: "MongooseServerSelectionError"**

- Solution: Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Solution: Check DB_URL connection string is correct
- Solution: Ensure database user has read/write permissions

**Issue: Images not uploading**

- Solution: Verify Cloudinary credentials are correct
- Solution: Check Cloudinary API limits on free tier

**Issue: Free tier services going to sleep**

- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Consider upgrading to paid tier for production

---

## Part 7: Optional - Custom Domain Setup

### For Frontend (Static Site)

1. In Render Dashboard, go to your static site
2. Click **Settings** → **Custom Domains**
3. Click **Add Custom Domain**
4. Enter your domain (e.g., `www.yourdomain.com`)
5. Add the CNAME record to your DNS provider as instructed
6. Wait for DNS propagation (can take up to 48 hours)

### For Backend (Web Service)

1. Follow similar steps in your backend web service settings
2. Update your frontend's `VITE_API_URL` to use the custom backend domain
3. Redeploy frontend after updating environment variables

---

## Part 8: Monitoring & Maintenance

### View Logs

- **Render Dashboard** → Select your service → **Logs** tab
- Monitor for errors, slow queries, or security issues

### Database Monitoring

- **MongoDB Atlas** → **Clusters** → **Metrics**
- Monitor storage usage, connections, and operations

### Auto-Deploy on Git Push

- Render automatically deploys when you push to your connected branch
- To disable: Service Settings → **Auto-Deploy** toggle

---

## Environment Variables Reference

### Backend (.env)

| Variable        | Description               | Example                       |
| --------------- | ------------------------- | ----------------------------- |
| PORT            | Server port               | 5000                          |
| DB_URL          | MongoDB connection string | mongodb+srv://...             |
| CLIENT_URL      | Frontend URL for CORS     | https://frontend.onrender.com |
| JWT_SECRET      | Secret for JWT tokens     | 32+ character random string   |
| CLOUDINARY\_\*  | Image upload service      | From Cloudinary dashboard     |
| PAYPAL\_\*      | Payment gateway           | From PayPal developer         |
| PAYSTACK\_\*    | Payment gateway           | From Paystack                 |
| FLUTTERWAVE\_\* | Payment gateway           | From Flutterwave              |

### Frontend (.env)

| Variable     | Description     | Example                      |
| ------------ | --------------- | ---------------------------- |
| VITE_API_URL | Backend API URL | https://backend.onrender.com |

---

## Security Best Practices

1. ✅ Never commit `.env` files to Git (already in `.gitignore`)
2. ✅ Use strong, unique JWT_SECRET
3. ✅ Rotate API keys periodically
4. ✅ Enable MongoDB Atlas audit logs
5. ✅ Monitor Render logs for suspicious activity
6. ✅ Use environment variables for all sensitive data
7. ✅ Keep dependencies updated (`npm audit` regularly)

---

## Cost Considerations

### Free Tier Limits

**Render Free Tier:**

- 750 hours/month of free usage per web service
- Services sleep after 15 min inactivity
- 100 GB bandwidth/month
- Good for development/testing

**MongoDB Atlas Free Tier (M0):**

- 512 MB storage
- Shared RAM
- No backup
- Good for development/testing

**Upgrading:**

- Consider paid tiers for production use
- Render: Starting at $7/month per service
- MongoDB Atlas: Starting at $9/month (M10 cluster)

---

## Next Steps

1. ✅ Deploy your application following this guide
2. Test all features thoroughly
3. Set up monitoring and alerts
4. Consider adding:
   - Email service (SendGrid, Mailgun)
   - Analytics (Google Analytics)
   - Error tracking (Sentry)
   - CDN for static assets (Cloudflare)

---

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Troubleshooting Commands

```bash
# Test MongoDB connection locally
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING').then(() => console.log('Connected!')).catch(err => console.error(err));"

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Check if backend is running
curl https://your-backend.onrender.com/api/auth/check-auth

# Local production build test
cd client
npm run build
npm run preview
```

---

Good luck with your deployment! 🚀

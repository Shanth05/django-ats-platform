# Deploy to Railway - Step by Step Guide

## Your Repository
✅ GitHub: https://github.com/Shanth05/django-ats-platform

## Step-by-Step Deployment

### Step 1: Go to Railway
1. Visit: **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**

### Step 2: Sign Up / Login
1. Click **"Login with GitHub"**
2. Authorize Railway to access your GitHub account
3. You'll be redirected to Railway dashboard

### Step 3: Create New Project
1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your repositories
4. Find and select: **`Shanth05/django-ats-platform`**

### Step 4: Railway Auto-Detection
Railway will automatically:
- ✅ Detect Django (Python)
- ✅ Detect Node.js (from frontend/)
- ✅ Set up build process

### Step 5: Configure Environment Variables
1. Click on your project
2. Go to **"Variables"** tab
3. Add these environment variables:

```
SECRET_KEY=django-insecure-change-this-to-random-string-in-production
DEBUG=False
ALLOWED_HOSTS=your-app.up.railway.app
```

**To generate SECRET_KEY:**
- Run locally: `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
- Copy the output and use it as SECRET_KEY

### Step 6: Set Build Settings (if needed)
Railway should auto-detect, but if not:

1. Go to **"Settings"** tab
2. Under **"Build Command"**, Railway should auto-detect
3. Under **"Start Command"**, it should be: `gunicorn ats_platform.wsgi:application`

### Step 7: Deploy
1. Railway will automatically start deploying
2. Watch the build logs
3. Wait for deployment to complete (usually 2-5 minutes)

### Step 8: Get Your URL
1. Once deployed, Railway will provide a URL like: `https://your-app.up.railway.app`
2. Click on the URL to open your app

### Step 9: Run Migrations
1. In Railway dashboard, go to your project
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Open **"View Logs"** or use **"Shell"** option
5. Run: `python manage.py migrate`

Or use Railway CLI:
```bash
railway run python manage.py migrate
```

### Step 10: Create Superuser (Optional)
1. Use Railway Shell or CLI:
```bash
railway run python manage.py createsuperuser
```

## Your App Will Be Live At:
`https://your-app-name.up.railway.app`

## Troubleshooting

### Build Fails
- Check build logs in Railway dashboard
- Ensure `package.json` exists in root (✅ you have it)
- Ensure `Procfile` exists (✅ you have it)

### Frontend Not Loading
- Check that frontend build completed
- Verify `templates/index.html` exists
- Check browser console for errors

### Database Errors
- Run migrations: `railway run python manage.py migrate`
- Check environment variables are set

### Static Files Not Loading
- Railway should handle this automatically
- Check `STATIC_ROOT` in settings.py

## After Deployment

1. ✅ Update README.md with your Railway URL
2. ✅ Test all features on live site
3. ✅ Share URL with interviewer

## Railway Free Tier Includes:
- ✅ 500 hours/month free
- ✅ $5 credit monthly
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ No credit card required

---

**Your repository is ready! Just connect it to Railway and deploy!** 🚀

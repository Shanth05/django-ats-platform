# Deployment Guide - Step by Step

## Option 1: Deploy to Heroku (Recommended - Easiest)

### Prerequisites
- Heroku account (free at heroku.com)
- Heroku CLI installed
- Git repository initialized

### Step-by-Step Instructions

1. **Install Heroku CLI** (if not installed)
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Create Heroku App**
   ```bash
   heroku create your-app-name
   # Replace 'your-app-name' with your desired name (must be unique)
   # Example: heroku create ats-platform-2024
   ```

5. **Add Buildpacks** (Node.js first, then Python)
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add heroku/python
   ```

6. **Set Environment Variables**
   ```bash
   # Generate a secret key
   heroku config:set SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
   
   # Set other variables
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=your-app-name.herokuapp.com
   # Replace 'your-app-name' with your actual app name
   ```

7. **Deploy**
   ```bash
   git push heroku main
   # If your branch is 'master', use: git push heroku master
   ```

8. **Run Migrations**
   ```bash
   heroku run python manage.py migrate
   ```

9. **Create Superuser** (optional)
   ```bash
   heroku run python manage.py createsuperuser
   ```

10. **Open Your App**
    ```bash
    heroku open
    ```

Your app will be live at: `https://your-app-name.herokuapp.com`

---

## Option 2: Deploy to Railway (Easiest - No CLI needed)

### Steps

1. **Go to Railway** (railway.app)
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Connect your repository**
6. **Railway auto-detects** Django and Node.js
7. **Set Environment Variables** in Railway dashboard:
   - `SECRET_KEY` - Generate one (use Python command above)
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.up.railway.app`
8. **Deploy** - Railway automatically deploys on git push
9. **Run migrations** - Use Railway's console or add to startup

Your app will be live at: `https://your-app.up.railway.app`

---

## Option 3: Deploy to Render (Free Tier Available)

### Steps

1. **Go to Render** (render.com)
2. **Sign up/Login** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your repository**
5. **Configure:**
   - **Name**: Your app name
   - **Build Command**: 
     ```bash
     cd frontend && npm install && npm run build && cd .. && python manage.py collectstatic --noinput
     ```
   - **Start Command**: 
     ```bash
     gunicorn ats_platform.wsgi:application
     ```
6. **Set Environment Variables:**
   - `SECRET_KEY` - Generate one
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.onrender.com`
7. **Deploy** - Render builds and deploys automatically
8. **Run migrations** - Use Render's shell or add to build command

Your app will be live at: `https://your-app.onrender.com`

---

## Quick Checklist Before Deploying

- [ ] Code is committed to Git
- [ ] All files are in repository (check `.gitignore`)
- [ ] `Procfile` exists (for Heroku)
- [ ] `runtime.txt` exists (for Heroku)
- [ ] `requirements.txt` is up to date
- [ ] Frontend builds successfully (`cd frontend && npm run build`)

---

## Troubleshooting

### Heroku Build Fails
- Check build logs: `heroku logs --tail`
- Ensure buildpacks are in correct order (Node.js first)
- Verify `package.json` exists in `frontend/` directory

### Static Files Not Loading
- Run: `heroku run python manage.py collectstatic --noinput`
- Check `STATIC_ROOT` in settings.py

### Frontend Not Loading
- Verify frontend build completed: `cd frontend && npm run build`
- Check that `templates/index.html` was updated by postbuild script
- Check browser console for errors

### Database Errors
- Run migrations: `heroku run python manage.py migrate`
- Check database addon is provisioned (Heroku uses PostgreSQL automatically)

---

## After Deployment

1. **Update README.md** with your deployment URL
2. **Test all features** on the live site
3. **Add screenshots** to README (optional)
4. **Share the URL** with your interviewer

---

## Need Help?

- Heroku: https://devcenter.heroku.com/articles/getting-started-with-python
- Railway: https://docs.railway.app/
- Render: https://render.com/docs

# Railway Setup - Copy & Paste These Values

## Step 1: Set Environment Variables in Railway

Go to Railway Dashboard → Your Project → Variables Tab → Add these:

### SECRET_KEY
```
++%jcmxp&01_t&i!vipg3x(m14*bnfb6q_beom(nflzq&hdu(*
```

### DEBUG
```
False
```

### ALLOWED_HOSTS
```
*.up.railway.app
```

## Step 2: Run Migrations

In Railway Dashboard:
1. Go to your project
2. Click on your service
3. Click "Shell" tab (or "Deployments" → Latest → "Shell")
4. Run this command:
```bash
python manage.py migrate
```

## Step 3: Create Admin User (Optional)

In the same Shell, run:
```bash
python manage.py createsuperuser
```
Then follow prompts to create username/password.

## Step 4: Get Your URL

1. In Railway Dashboard → Your Project
2. Click on your service
3. Find the "Domains" section
4. Your app URL will be something like: `https://your-app.up.railway.app`
5. Click the URL to open your app!

## That's it! Your app should be live! 🎉

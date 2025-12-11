#!/bin/bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
cd frontend && npm install && cd ..
echo "Setup complete! Run: python manage.py runserver (Terminal 1) and cd frontend && npm run dev (Terminal 2)"

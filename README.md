# ATS Platform - Applicant Tracking System

A modern, full-stack Applicant Tracking System (ATS) built with Django and React/TypeScript, designed to help recruiters efficiently manage hundreds of job applications.

## 🎯 Project Overview

This ATS platform addresses the core pain points recruiters face when sorting through large volumes of applications:

- **Efficient Organization**: Quickly categorize and filter candidates and applications
- **Quick Search**: Find candidates and applications instantly with powerful search
- **Status Tracking**: Visual pipeline management from application to hire
- **Notes & Collaboration**: Add context and notes to applications for team collaboration
- **Analytics Dashboard**: Get insights into application pipeline health

## 🏗️ Architecture & Technology Stack

### Technology Selection

The assignment specified using **"Django, TypeScript, Golang, or Rust"**. This implementation uses:
- **Django** for the backend (Python web framework)
- **TypeScript** for the frontend (with React as the framework)

This creates a modern, full-stack application with Django REST API backend and React + TypeScript frontend.

### Backend
- **Django 4.2** - Robust Python web framework
- **Django REST Framework** - RESTful API development
- **SQLite** (development) / **PostgreSQL** (production) - Database
- **WhiteNoise** - Static file serving
- **Gunicorn** - Production WSGI server

### Frontend
- **React 18** - Modern UI library (chosen as the framework for TypeScript)
- **TypeScript** - Type-safe JavaScript (as specified in requirements)
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Why These Choices?

**Django**: Rapid development, excellent ORM, strong security, mature ecosystem

**React + TypeScript**: Type safety, component-based architecture, modern UI patterns, industry standard

**REST API**: Separation of concerns, easy to extend, standard HTTP methods, scalable

## 📋 Features

### Core Features

1. **Job Management**
   - Create, edit, and manage job postings
   - Track job status (Draft, Open, Closed)
   - View application count per job
   - Filter by department, location, employment type

2. **Candidate Management**
   - Comprehensive candidate profiles
   - Resume/CV upload and storage
   - Contact information (email, phone, LinkedIn, portfolio)
   - Tagging system for categorization
   - Notes for internal tracking

3. **Application Tracking**
   - Full application lifecycle management
   - Status pipeline: Applied → Screening → Interview → Offer → Hired/Rejected
   - Cover letter storage
   - Internal notes and activity timeline
   - Link applications to jobs and candidates

4. **Search & Filtering**
   - Global search across jobs, candidates, and applications
   - Filter by status, department, tags
   - Real-time search results

5. **Dashboard & Analytics**
   - Overview statistics (total jobs, candidates, applications)
   - Application status breakdown with visual charts
   - Quick action links
   - Pipeline health metrics

### Design Decisions

#### 1. **Status-Based Workflow**
**Decision**: Implemented a clear status pipeline (Applied → Screening → Interview → Offer → Hired/Rejected)

**Rationale**: 
- Recruiters need to quickly see where each candidate is in the process
- Visual status indicators help prioritize work
- Status changes are timestamped for audit trails
- Common industry standard that recruiters are familiar with

#### 2. **Tag System**
**Decision**: Flexible tagging system for candidates and jobs

**Rationale**:
- Recruiters often need to categorize beyond standard fields (e.g., "Python Expert", "Remote Only", "Fast Track")
- Tags are color-coded for quick visual identification
- More flexible than rigid category fields
- Can be customized per organization's needs

#### 3. **Notes at Multiple Levels**
**Decision**: Notes can be added to both candidates and applications, plus activity notes on applications

**Rationale**:
- Candidate notes: General observations that apply across all applications
- Application notes: Job-specific context
- Activity notes: Timeline of interactions and decisions
- Helps maintain context when reviewing applications later

#### 4. **Unified Search**
**Decision**: Single search bar that searches across multiple fields

**Rationale**:
- Recruiters often remember partial information (name, email, job title)
- Faster than navigating to specific sections
- Reduces cognitive load
- Industry standard UX pattern

#### 5. **Dashboard-First Design**
**Decision**: Dashboard as the landing page with key metrics

**Rationale**:
- Recruiters need quick overview of pipeline health
- Visual status breakdown helps identify bottlenecks
- Quick actions reduce navigation time
- Sets context for the day's work

#### 6. **File Upload for Resumes**
**Decision**: Store resume files in media directory

**Rationale**:
- Essential for recruiters to review candidate qualifications
- Direct download links for easy access
- Can be extended to PDF parsing/OCR in future
- Standard practice in ATS systems

#### 7. **RESTful API Design**
**Decision**: Separate frontend and backend with REST API

**Rationale**:
- Frontend can be updated independently
- Easy to add mobile apps or integrations
- Standard HTTP methods (GET, POST, PATCH, DELETE)
- Clear separation of concerns

#### 8. **Pagination**
**Decision**: 20 items per page with pagination

**Rationale**:
- Prevents overwhelming UI with hundreds of items
- Better performance for large datasets
- Standard UX pattern users expect
- Balances information density with usability

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd django-ats-platform
   ```

2. **Set up Python environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional, for admin panel)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Set up frontend**
   ```bash
   cd frontend
   npm install
   ```

7. **Run development servers**

   Terminal 1 (Backend):
   ```bash
   python manage.py runserver
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/
   - Admin Panel: http://localhost:8000/admin/

## 📁 Project Structure

```
django-ats-platform/
├── ats_platform/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── jobs/                  # Job management app
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── candidates/            # Candidate management app
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── applications/          # Application tracking app
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── frontend/              # React frontend
│   ├── src/
│   │   ├── api/          # API client functions
│   │   ├── components/   # Reusable components
│   │   └── pages/        # Page components
│   ├── package.json
│   └── vite.config.ts
├── templates/             # Django templates
├── media/                 # Uploaded files (resumes)
├── staticfiles/           # Collected static files
├── requirements.txt
├── Procfile
├── runtime.txt
└── README.md
```

## 🔌 API Endpoints

### Jobs
- `GET /api/jobs/` - List all jobs
- `POST /api/jobs/` - Create new job
- `GET /api/jobs/{id}/` - Get job details
- `PATCH /api/jobs/{id}/` - Update job
- `DELETE /api/jobs/{id}/` - Delete job

### Candidates
- `GET /api/candidates/` - List all candidates
- `POST /api/candidates/` - Create new candidate
- `GET /api/candidates/{id}/` - Get candidate details
- `PATCH /api/candidates/{id}/` - Update candidate
- `DELETE /api/candidates/{id}/` - Delete candidate

### Applications
- `GET /api/applications/` - List all applications
- `POST /api/applications/` - Create new application
- `GET /api/applications/{id}/` - Get application details
- `PATCH /api/applications/{id}/` - Update application
- `DELETE /api/applications/{id}/` - Delete application
- `GET /api/applications/stats/` - Get application statistics
- `POST /api/applications/{id}/add_note/` - Add note to application

### Tags
- `GET /api/jobs/tags/` - List all tags
- `POST /api/jobs/tags/` - Create new tag

All endpoints support:
- Search: `?search=query`
- Filtering: `?status=open&department=Engineering`
- Ordering: `?ordering=-created_at`
- Pagination: `?page=2`

## 🚢 Deployment to Public URL

### Quick Deploy to Heroku

1. **Install Heroku CLI and login**
   ```bash
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=your-app-name.herokuapp.com
   ```

4. **Add buildpacks** (Node.js first, then Python)
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add heroku/python
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Run migrations**
   ```bash
   heroku run python manage.py migrate
   ```

7. **Create superuser** (optional)
   ```bash
   heroku run python manage.py createsuperuser
   ```

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Railway auto-detects Django and Node.js
3. Set environment variables in Railway dashboard:
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.up.railway.app`
4. Deploy automatically on git push

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your repository
3. Build Command: `cd frontend && npm install && npm run build && cd .. && python manage.py collectstatic --noinput`
4. Start Command: `gunicorn ats_platform.wsgi:application`
5. Set environment variables

### Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Set strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Run migrations
- [ ] Create superuser
- [ ] Test all features

## 🧪 Testing

Run Django tests:
```bash
python manage.py test
```

## 🔮 Future Enhancements

Potential features for future iterations:

1. **Authentication & Authorization**
   - User login/signup
   - Role-based permissions (recruiter, admin, hiring manager)
   - Team collaboration features

2. **Email Integration**
   - Send emails to candidates
   - Email notifications for status changes
   - Email templates

3. **Resume Parsing**
   - Extract skills and experience from resumes
   - Auto-populate candidate profiles
   - Keyword matching

4. **Advanced Analytics**
   - Time-to-hire metrics
   - Source tracking
   - Conversion funnel analysis
   - Export reports

5. **Interview Scheduling**
   - Calendar integration
   - Automated scheduling
   - Interview feedback forms

6. **Bulk Operations**
   - Bulk status updates
   - Bulk tagging
   - Import/export CSV

7. **Notifications**
   - Real-time updates
   - Browser notifications
   - Email digests

## 📝 Assumptions Made

1. **Single User/Organization**: Currently designed for single organization use. Multi-tenancy would require additional work.

2. **No Authentication**: For the take-home assignment, authentication is omitted. Production would need user management.

3. **File Storage**: Resumes stored locally. Production should use cloud storage (S3, etc.).

4. **Email Uniqueness**: Candidates identified by email. In production, might need more sophisticated deduplication.

5. **Simple Status Flow**: Linear status progression. Some organizations need custom workflows.

6. **No Soft Deletes**: Deletions are permanent. Production might need soft deletes for audit trails.

7. **SQLite for Development**: Easy setup, but production should use PostgreSQL.

## 🤝 Contributing

This is a take-home assignment project. For production use, consider:
- Adding comprehensive tests
- Implementing authentication
- Adding API documentation (Swagger/OpenAPI)
- Setting up CI/CD pipeline
- Adding monitoring and logging
- Implementing rate limiting
- Adding data validation and sanitization

## 📄 License

This project is created as a take-home assignment.

## 👤 Author

Built as a demonstration of full-stack development skills with Django and React/TypeScript.

## 🌐 Live Deployment

[Add your deployment URL here once deployed]

Example deployment platforms:
- Heroku: `https://your-app.herokuapp.com`
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`

## 📸 Screenshots

[Add screenshots of your deployed application here]

---

**Note**: This ATS platform prioritizes recruiter efficiency and user experience. Every design decision was made with the recruiter's workflow in mind - from quick searches to visual status tracking to comprehensive note-taking. The goal is to help recruiters manage hundreds of applications without feeling overwhelmed.

## 🎓 Key Learnings & Decisions

### User-Centric Design
Every feature was designed by putting myself in the recruiter's shoes:
- **Quick Actions**: Dashboard provides immediate access to common tasks
- **Visual Status**: Color-coded status indicators for instant recognition
- **Search First**: Global search because recruiters remember fragments, not exact matches
- **Context Preservation**: Notes at multiple levels ensure context isn't lost

### Technical Decisions
- **Django REST Framework**: Chosen for rapid API development and excellent documentation
- **React + TypeScript**: Type safety prevents bugs and improves developer experience
- **RESTful API**: Standard patterns make the API predictable and easy to use
- **WhiteNoise**: Simple static file serving without needing a separate web server

### Trade-offs Made
- **No Authentication**: Omitted for take-home assignment scope, but would be essential in production
- **SQLite Default**: Easy setup for development, but PostgreSQL recommended for production
- **Simple UI**: Focused on functionality over fancy animations to maximize development time on core features
- **File Upload**: Basic implementation; production would benefit from cloud storage (S3, etc.)

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { jobsApi, Job } from '../api/jobs'
import Card from '../components/Card'
import Button from '../components/Button'
import { Plus, Search } from 'lucide-react'

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [search, statusFilter])

  const fetchJobs = async () => {
    try {
      const params: any = { search }
      if (statusFilter) params.status = statusFilter
      const response = await jobsApi.list(params)
      setJobs(response.data.results)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsApi.delete(id)
        fetchJobs()
      } catch (error) {
        console.error('Failed to delete job:', error)
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Jobs</h1>
        <Link to="/jobs/new">
          <Button>
            <Plus size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
            New Job
          </Button>
        </Link>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
              }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {job.title}
                  </h3>
                </Link>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                  {job.department && <span>{job.department}</span>}
                  {job.location && <span>{job.location}</span>}
                  <span>{job.employment_type}</span>
                  <span style={{
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem',
                    backgroundColor: job.status === 'open' ? '#dbeafe' : job.status === 'closed' ? '#fee2e2' : '#f3f4f6',
                    color: job.status === 'open' ? '#1e40af' : job.status === 'closed' ? '#991b1b' : '#374151',
                  }}>
                    {job.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                  {job.application_count} application{job.application_count !== 1 ? 's' : ''}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(job.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              No jobs found. Create your first job posting!
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

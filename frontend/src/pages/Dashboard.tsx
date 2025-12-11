import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applicationsApi, ApplicationStats } from '../api/applications'
import { jobsApi } from '../api/jobs'
import { candidatesApi } from '../api/candidates'
import Card from '../components/Card'
import { Briefcase, Users, FileText, TrendingUp } from 'lucide-react'

const STATUS_COLORS: { [key: string]: string } = {
  applied: '#3b82f6',
  screening: '#f59e0b',
  interview: '#8b5cf6',
  offer: '#10b981',
  hired: '#059669',
  rejected: '#ef4444',
  withdrawn: '#6b7280',
}

export default function Dashboard() {
  const [stats, setStats] = useState<ApplicationStats | null>(null)
  const [jobCount, setJobCount] = useState(0)
  const [candidateCount, setCandidateCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, jobsRes, candidatesRes] = await Promise.all([
          applicationsApi.stats(),
          jobsApi.list({ page_size: 1 }),
          candidatesApi.list({ page_size: 1 }),
        ])
        setStats(statsRes.data)
        setJobCount(jobsRes.data.count)
        setCandidateCount(candidatesRes.data.count)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Dashboard
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem' }}>
              <Briefcase size={24} color="#3b82f6" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Jobs</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{jobCount}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem' }}>
              <Users size={24} color="#f59e0b" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Candidates</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{candidateCount}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#e0e7ff', borderRadius: '0.5rem' }}>
              <FileText size={24} color="#8b5cf6" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Applications</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats?.total || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {stats && (
        <Card title="Applications by Status">
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(stats.by_status).map(([status, data]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '150px', fontSize: '0.875rem', fontWeight: '500' }}>
                  {data.label}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    flex: 1,
                    height: '32px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '0.25rem',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: `${data.percentage}%`,
                      height: '100%',
                      backgroundColor: STATUS_COLORS[status] || '#64748b',
                      transition: 'width 0.3s',
                    }} />
                  </div>
                  <div style={{ width: '80px', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600' }}>
                    {data.count} ({data.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card
          title="Quick Actions"
          actions={<Link to="/jobs" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem' }}>View All →</Link>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/jobs" style={{ color: '#1e293b', textDecoration: 'none', padding: '0.5rem', borderRadius: '0.25rem', hover: { backgroundColor: '#f1f5f9' } }}>
              Create New Job Posting
            </Link>
            <Link to="/candidates" style={{ color: '#1e293b', textDecoration: 'none', padding: '0.5rem', borderRadius: '0.25rem' }}>
              Add New Candidate
            </Link>
            <Link to="/applications" style={{ color: '#1e293b', textDecoration: 'none', padding: '0.5rem', borderRadius: '0.25rem' }}>
              View All Applications
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

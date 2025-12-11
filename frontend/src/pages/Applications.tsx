import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applicationsApi, Application } from '../api/applications'
import Card from '../components/Card'
import Button from '../components/Button'
import { Search } from 'lucide-react'

const STATUS_COLORS: { [key: string]: string } = {
  applied: '#3b82f6',
  screening: '#f59e0b',
  interview: '#8b5cf6',
  offer: '#10b981',
  hired: '#059669',
  rejected: '#ef4444',
  withdrawn: '#6b7280',
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [search, statusFilter])

  const fetchApplications = async () => {
    try {
      const params: any = { search }
      if (statusFilter) params.status = statusFilter
      const response = await applicationsApi.list(params)
      setApplications(response.data.results)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Applications</h1>

      <Card>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search applications..."
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
            <option value="applied">Applied</option>
            <option value="screening">Screening</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {applications.map((application) => (
            <Link
              key={application.id}
              to={`/applications/${application.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc'
                  e.currentTarget.style.borderColor = '#cbd5e1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = '#e2e8f0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                        {application.candidate.full_name}
                      </h3>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: STATUS_COLORS[application.status] + '20',
                        color: STATUS_COLORS[application.status],
                      }}>
                        {application.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      {application.job.title}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                      <span>Applied: {new Date(application.applied_at).toLocaleDateString()}</span>
                      {application.notes_count > 0 && (
                        <span>{application.notes_count} note{application.notes_count !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {applications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              No applications found.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { applicationsApi, ApplicationDetail as AppDetail } from '../api/applications'
import Card from '../components/Card'
import Button from '../components/Button'
import { ArrowLeft } from 'lucide-react'

const STATUS_COLORS: { [key: string]: string } = {
  applied: '#3b82f6',
  screening: '#f59e0b',
  interview: '#8b5cf6',
  offer: '#10b981',
  hired: '#059669',
  rejected: '#ef4444',
  withdrawn: '#6b7280',
}

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [application, setApplication] = useState<AppDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [newNote, setNewNote] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (id) {
      fetchApplication()
    }
  }, [id])

  const fetchApplication = async () => {
    try {
      const response = await applicationsApi.get(Number(id))
      setApplication(response.data)
      setStatus(response.data.status)
    } catch (error) {
      console.error('Failed to fetch application:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return
    try {
      await applicationsApi.update(Number(id), { status: newStatus })
      setStatus(newStatus)
      fetchApplication()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleAddNote = async () => {
    if (!id || !newNote.trim()) return
    try {
      await applicationsApi.addNote(Number(id), newNote)
      setNewNote('')
      fetchApplication()
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!application) {
    return <div>Application not found</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/applications')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Application Details</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div>
          <Card title="Candidate Information">
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {application.candidate.full_name}
              </h3>
              <p style={{ color: '#64748b' }}>{application.candidate.email}</p>
              {application.candidate.phone && <p style={{ color: '#64748b' }}>{application.candidate.phone}</p>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => navigate(`/candidates/${application.candidate.id}`)}>
                View Candidate Profile
              </Button>
            </div>
          </Card>

          <Card title="Job Information">
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {application.job.title}
              </h3>
              <p style={{ color: '#64748b' }}>{application.job.department} • {application.job.location}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => navigate(`/jobs/${application.job.id}`)}>
                View Job Details
              </Button>
            </div>
          </Card>

          {application.cover_letter && (
            <Card title="Cover Letter">
              <p style={{ whiteSpace: 'pre-wrap', color: '#475569' }}>{application.cover_letter}</p>
            </Card>
          )}

          {application.notes && (
            <Card title="Internal Notes">
              <p style={{ whiteSpace: 'pre-wrap', color: '#475569' }}>{application.notes}</p>
            </Card>
          )}

          <Card title="Activity Notes">
            <div style={{ marginBottom: '1rem' }}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <Button onClick={handleAddNote}>Add Note</Button>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {application.application_notes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.375rem',
                    borderLeft: '3px solid #3b82f6',
                  }}
                >
                  <p style={{ marginBottom: '0.5rem', color: '#475569' }}>{note.content}</p>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {application.application_notes.length === 0 && (
                <p style={{ color: '#64748b', textAlign: 'center', padding: '1rem' }}>No notes yet</p>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Status">
            <div style={{ marginBottom: '1rem' }}>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                }}
              >
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: STATUS_COLORS[status] + '20',
              borderRadius: '0.375rem',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Current Status</p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: STATUS_COLORS[status] }}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </p>
            </div>
          </Card>

          <Card title="Timeline">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Applied</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  {new Date(application.applied_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Last Updated</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  {new Date(application.updated_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Status Changed</p>
                <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  {new Date(application.status_changed_at).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

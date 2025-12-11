import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { candidatesApi, Candidate } from '../api/candidates'
import Card from '../components/Card'
import { ArrowLeft, Mail, Phone, Linkedin, Globe, FileText } from 'lucide-react'

export default function CandidateDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchCandidate()
    }
  }, [id])

  const fetchCandidate = async () => {
    try {
      const response = await candidatesApi.get(Number(id))
      setCandidate(response.data)
    } catch (error) {
      console.error('Failed to fetch candidate:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!candidate) {
    return <div>Candidate not found</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/candidates')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{candidate.full_name}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card title="Contact Information">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={20} color="#64748b" />
              <div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Email</p>
                <a href={`mailto:${candidate.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                  {candidate.email}
                </a>
              </div>
            </div>
            {candidate.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={20} color="#64748b" />
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Phone</p>
                  <a href={`tel:${candidate.phone}`} style={{ color: '#1e293b', textDecoration: 'none' }}>
                    {candidate.phone}
                  </a>
                </div>
              </div>
            )}
            {candidate.linkedin_url && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Linkedin size={20} color="#64748b" />
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>LinkedIn</p>
                  <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    View Profile
                  </a>
                </div>
              </div>
            )}
            {candidate.portfolio_url && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Globe size={20} color="#64748b" />
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Portfolio</p>
                  <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    Visit Portfolio
                  </a>
                </div>
              </div>
            )}
            {candidate.resume_url && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={20} color="#64748b" />
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Resume</p>
                  <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    Download Resume
                  </a>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Tags">
          {candidate.tags.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {candidate.tags.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    backgroundColor: tag.color + '20',
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No tags assigned</p>
          )}
        </Card>
      </div>

      {candidate.notes && (
        <Card title="Notes">
          <p style={{ whiteSpace: 'pre-wrap', color: '#475569' }}>{candidate.notes}</p>
        </Card>
      )}

      <Card title={`Applications (${candidate.application_count})`}>
        <p style={{ color: '#64748b' }}>View applications in the Applications section</p>
      </Card>
    </div>
  )
}

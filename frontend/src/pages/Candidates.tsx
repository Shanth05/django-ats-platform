import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { candidatesApi, Candidate } from '../api/candidates'
import Card from '../components/Card'
import Button from '../components/Button'
import { Plus, Search } from 'lucide-react'

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCandidates()
  }, [search])

  const fetchCandidates = async () => {
    try {
      const response = await candidatesApi.list({ search })
      setCandidates(response.data.results)
    } catch (error) {
      console.error('Failed to fetch candidates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await candidatesApi.delete(id)
        fetchCandidates()
      } catch (error) {
        console.error('Failed to delete candidate:', error)
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Candidates</h1>
        <Button>
          <Plus size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
          New Candidate
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search candidates..."
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
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
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
                <Link to={`/candidates/${candidate.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {candidate.full_name}
                  </h3>
                </Link>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                  <span>{candidate.email}</span>
                  {candidate.phone && <span>{candidate.phone}</span>}
                </div>
                {candidate.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {candidate.tags.map((tag) => (
                      <span
                        key={tag.id}
                        style={{
                          padding: '0.125rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          backgroundColor: tag.color + '20',
                          color: tag.color,
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                  {candidate.application_count} application{candidate.application_count !== 1 ? 's' : ''}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/candidates/${candidate.id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(candidate.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {candidates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              No candidates found. Add your first candidate!
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

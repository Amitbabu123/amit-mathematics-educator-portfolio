
import React, { useEffect, useState } from 'react'
import './admin.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Admin() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem('adminToken') || ''
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enquiries, setEnquiries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadEnquiries(authToken = token) {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API}/api/admin/enquiries`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load enquiries.')
      }

      setEnquiries(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) loadEnquiries(token)
  }, [token])

  async function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.')
      }

      sessionStorage.setItem('adminToken', data.token)
      setToken(data.token)
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function toggleRead(item) {
    try {
      const response = await fetch(
        `${API}/api/admin/enquiries/${item._id}/read`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ isRead: !item.isRead })
        }
      )

      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setEnquiries(current =>
        current.map(enquiry =>
          enquiry._id === item._id ? data : enquiry
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteEnquiry(id) {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) {
      return
    }

    try {
      const response = await fetch(`${API}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      setEnquiries(current =>
        current.filter(item => item._id !== id)
      )
    } catch (err) {
      setError(err.message)
    }
  }

  function logout() {
    sessionStorage.removeItem('adminToken')
    setToken('')
    setEnquiries([])
  }

  const unreadCount = enquiries.filter(item => !item.isRead).length

  if (!token) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <div className="admin-brand">AK</div>
          <p className="admin-eyebrow">AMIT KUMAR · PORTFOLIO</p>
          <h1>Admin Login</h1>
          <p className="admin-subtitle">
            Sign in to manage student enquiries.
          </p>

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Admin email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Admin password"
            required
          />

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <a className="admin-back" href="/">← Back to Portfolio</a>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">AMIT KUMAR · PORTFOLIO</p>
          <h1>Enquiry Dashboard</h1>
          <p>Manage messages received from students and visitors.</p>
        </div>
        <button className="admin-logout" onClick={logout}>
          Logout
        </button>
      </header>

      <section className="admin-stats">
        <div className="admin-stat">
          <span>Total Enquiries</span>
          <strong>{enquiries.length}</strong>
        </div>
        <div className="admin-stat">
          <span>Unread Messages</span>
          <strong>{unreadCount}</strong>
        </div>
        <div className="admin-stat">
          <span>Read Messages</span>
          <strong>{enquiries.length - unreadCount}</strong>
        </div>
      </section>

      <section className="admin-list-section">
        <div className="admin-list-heading">
          <h2>Student Enquiries</h2>
          <button
            className="admin-refresh"
            onClick={() => loadEnquiries()}
            disabled={loading}
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}

        {loading && enquiries.length === 0 ? (
          <p className="admin-empty">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="admin-empty">No enquiries received yet.</p>
        ) : (
          <div className="admin-enquiry-list">
            {enquiries.map(item => (
              <article className="admin-enquiry" key={item._id}>
                <div className="admin-enquiry-top">
                  <div>
                    <h3>{item.name}</h3>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </div>
                  <span className={item.isRead ? 'read-badge' : 'unread-badge'}>
                    {item.isRead ? 'Read' : 'Unread'}
                  </span>
                </div>

                <p className="admin-message">{item.message}</p>

                <div className="admin-enquiry-bottom">
                  <span>
                    {new Date(item.createdAt).toLocaleString('en-IN')}
                  </span>

                  <div className="admin-actions">
                    <button onClick={() => toggleRead(item)}>
                      Mark as {item.isRead ? 'Unread' : 'Read'}
                    </button>
                    <button
                      className="admin-delete"
                      onClick={() => deleteEnquiry(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

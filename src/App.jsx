/* src/App.jsx */
import { useState } from 'react'
import ServiceForm from './components/ServiceForm'
import { Wrench } from 'lucide-react'

function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(37, 99, 235, 0.1)',
          padding: '0.75rem',
          borderRadius: '50%',
          marginBottom: '1rem',
          color: 'var(--primary)'
        }}>
          <Wrench size={32} />
        </div>
        <h1>Providers</h1>
        <p style={{ color: 'var(--text-muted)' }}>Soluciones rápidas para tu hogar</p>
      </header>

      <main>
        <ServiceForm />
      </main>

      <footer style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Providers. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App

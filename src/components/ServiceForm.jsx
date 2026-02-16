/* src/components/ServiceForm.jsx */
import { useState } from 'react'
import {
    User, MapPin, Wrench, Calendar as CalendarIcon,
    CreditCard, Camera, Check, ChevronRight, ChevronLeft,
    AlertCircle, Zap, PaintBucket, Droplet, Flame
} from 'lucide-react'
import '../styles/Form.css'

const CATEGORIES = [
    { id: 'electricista', label: 'Electricista', icon: <Zap size={24} />, color: '#fbbf24' },
    { id: 'pintor', label: 'Pintor', icon: <PaintBucket size={24} />, color: '#ec4899' },
    { id: 'plomero', label: 'Plomero', icon: <Droplet size={24} />, color: '#3b82f6' },
    { id: 'gasista', label: 'Gasista', icon: <Flame size={24} />, color: '#ef4444' }
]

const PAYMENT_METHODS = [
    { id: 'efectivo', label: 'Efectivo' },
    { id: 'transferencia', label: 'Transferencia' },
    { id: 'tarjeta', label: 'Tarjeta de Crédito/Débito' }
]

export default function ServiceForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        category: '',
        problem: '',
        description: '',
        date: '',
        time: '',
        payment: '',
        terms: false,
        photos: [] // Just a placeholder for now
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }

    const validateStep = (currentStep) => {
        const newErrors = {}
        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
            if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria'
            if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio'
        } else if (currentStep === 2) {
            if (!formData.category) newErrors.category = 'Selecciona una categoría'
            if (!formData.problem.trim()) newErrors.problem = 'Indica cuál es el problema'
            if (!formData.description.trim()) newErrors.description = 'Describe el problema'
        } else if (currentStep === 3) {
            if (!formData.date) newErrors.date = 'Selecciona una fecha'
            if (!formData.time) newErrors.time = 'Selecciona un horario'
        } else if (currentStep === 4) {
            if (!formData.payment) newErrors.payment = 'Selecciona un método de pago'
            if (!formData.terms) newErrors.terms = 'Debes aceptar los términos'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1)
        }
    }

    const prevStep = () => {
        setStep(prev => prev - 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateStep(4)) {
            // Construct mailto link
            const subject = `Nuevo Servicio: ${CATEGORIES.find(c => c.id === formData.category)?.label} - ${formData.name}`
            const body = `
Hola, necesito un servicio.

--- DATOS DEL CLIENTE ---
Nombre: ${formData.name}
Dirección: ${formData.address}
Teléfono: ${formData.phone}

--- DETALLES DEL PROBLEMA ---
Categoría: ${CATEGORIES.find(c => c.id === formData.category)?.label}
Problema: ${formData.problem}
Descripción: ${formData.description}

--- FECHA Y HORA ---
Fecha: ${formData.date}
Horario: ${formData.time}

--- PAGO ---
Método: ${formData.payment}

Acepto términos y condiciones.
      `.trim()

            window.location.href = `mailto:contacto@providers.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

            alert('¡Solicitud lista para enviar! Se abrirá tu correo.')
        }
    }

    // Handle mock photo upload
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, file.name]
            }))
        }
    }

    return (
        <div className="form-container">
            {/* Step Indicator */}
            <div className="step-indicator">
                {[1, 2, 3, 4].map(idx => (
                    <div
                        key={idx}
                        className={`step-dot ${step === idx ? 'active' : ''} ${step > idx ? 'completed' : ''}`}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="form-step">
                {step === 1 && (
                    <div className="step-content">
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={20} className="text-primary" /> Datos Personales
                        </h2>

                        <div className="input-group">
                            <label className="label">Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                placeholder="Ej. Juan Pérez"
                            />
                            {errors.name && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.name}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label">Dirección Completa</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="input"
                                placeholder="Calle, Altura, Piso, Depto"
                            />
                            {errors.address && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.address}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label">Teléfono / WhatsApp</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input"
                                placeholder="Ej. 11 1234 5678"
                            />
                            {errors.phone && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.phone}</span>}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-content">
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Wrench size={20} /> ¿Qué necesitas?
                        </h2>

                        <div className="input-group">
                            <label className="label">Categoría</label>
                            <div className="category-grid">
                                {CATEGORIES.map(cat => (
                                    <div
                                        key={cat.id}
                                        className={`category-card ${formData.category === cat.id ? 'selected' : ''}`}
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, category: cat.id }))
                                            if (errors.category) setErrors(prev => ({ ...prev, category: null }))
                                        }}
                                    >
                                        <div style={{ color: cat.color, marginBottom: '0.5rem' }}>{cat.icon}</div>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{cat.label}</span>
                                    </div>
                                ))}
                            </div>
                            {errors.category && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.category}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label">Problema (Título breve)</label>
                            <input
                                type="text"
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                className="input"
                                placeholder="Ej. Se rompió un caño"
                            />
                            {errors.problem && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.problem}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label">Descripción Detallada</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea"
                                rows="3"
                                placeholder="Cuéntanos más detalles..."
                            ></textarea>
                            {errors.description && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.description}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label">Fotos (Opcional)</label>
                            <label className="photo-upload">
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                                <Camera size={24} style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '0.875rem' }}>Toca para subir foto</div>
                            </label>
                            {formData.photos.length > 0 && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--success)' }}>
                                    {formData.photos.length} foto(s) seleccionada(s)
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-content">
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CalendarIcon size={20} /> ¿Cuándo pueden ir?
                        </h2>

                        <div className="input-group">
                            <label className="label">Fecha</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.date && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.date}</span>}
                        </div>

                        <div className="input-group">
                            <label className="label">Horario Preferido</label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="select"
                            >
                                <option value="">Selecciona un horario</option>
                                <option value="mañana">Mañana (8:00 - 12:00)</option>
                                <option value="tarde">Tarde (13:00 - 17:00)</option>
                                <option value="noche">Noche (18:00 - 20:00)</option>
                            </select>
                            {errors.time && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.time}</span>}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="step-content">
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={20} /> Pago y Confirmación
                        </h2>

                        <div className="input-group">
                            <label className="label">Método de Pago</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {PAYMENT_METHODS.map(method => (
                                    <label key={method.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: formData.payment === method.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                                        background: formData.payment === method.id ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.id}
                                            checked={formData.payment === method.id}
                                            onChange={handleChange}
                                        />
                                        <span style={{ fontWeight: 500 }}>{method.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.payment && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{errors.payment}</span>}
                        </div>

                        <div className="input-group" style={{ marginTop: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    style={{ marginTop: '0.25rem' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    Acepto los <span style={{ color: 'var(--primary)', textDecoration: 'underline' }}>términos y condiciones</span> de Providers y permito el uso de mis datos para contactar a los profesionales.
                                </span>
                            </label>
                            {errors.terms && <span style={{ color: 'var(--error)', fontSize: '0.75rem', display: 'block', marginTop: '0.5rem' }}>{errors.terms}</span>}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '2rem' }}>
                    {step < 4 ? (
                        <button type="button" onClick={nextStep} className="btn-primary">
                            Siguiente <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button type="submit" className="btn-primary" style={{ background: 'var(--success)' }}>
                            Enviar Solicitud <Check size={18} />
                        </button>
                    )}

                    {step > 1 && (
                        <button type="button" onClick={prevStep} className="btn-secondary">
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <ChevronLeft size={16} /> Volver
                            </span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

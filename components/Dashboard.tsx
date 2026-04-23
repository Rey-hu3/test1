'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  ChevronRight,
  Download,
  Globe,
  PlayCircle,
  Presentation,
  ShieldAlert,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const channelData = [
  { name: 'Sitio web', score: 82, detail: 'Base sólida de presencia y funnel principal.' },
  { name: 'LinkedIn', score: 74, detail: 'Canal corporativo más creíble y consistente.' },
  { name: 'App Android', score: 70, detail: 'Buen volumen de instalación visible.' },
  { name: 'YouTube', score: 49, detail: 'Existe, pero aún pequeño en escala pública.' },
  { name: 'Blog', score: 64, detail: 'Apoya SEO y educación, pero puede afinar foco.' },
  { name: 'Social mix', score: 58, detail: 'Presencia multicanal, madurez desigual.' }
];

const riskMatrix = [
  { risk: 'Transparencia financiera insuficiente', impact: 'Alto', probability: 'Alta', severity: 94 },
  { risk: 'Fricción por captura de datos sensibles', impact: 'Alto', probability: 'Alta', severity: 90 },
  { risk: 'Desconfianza por salto a dominios externos', impact: 'Alto', probability: 'Media', severity: 83 },
  { risk: 'Percepción tipo ecommerce en sitio financiero', impact: 'Medio', probability: 'Alta', severity: 72 },
  { risk: 'Inconsistencia entre canales y prueba social', impact: 'Medio', probability: 'Media', severity: 66 },
  { risk: 'Riesgo de phishing o confusión de marca', impact: 'Alto', probability: 'Media', severity: 79 }
];

const radarData = [
  { subject: 'Claridad', current: 55, target: 85 },
  { subject: 'Confianza', current: 57, target: 88 },
  { subject: 'Conversión', current: 63, target: 84 },
  { subject: 'Contenido', current: 68, target: 82 },
  { subject: 'Social proof', current: 48, target: 80 },
  { subject: 'UX financiera', current: 52, target: 86 }
];

const opportunityData = [
  { name: 'Unificar funnel', value: 26 },
  { name: 'Visibilizar costos', value: 22 },
  { name: 'Prueba social', value: 18 },
  { name: 'Seguridad y privacidad', value: 16 },
  { name: 'Arquitectura UX', value: 18 }
];

const priorities = [
  {
    title: 'Unificar el journey bajo dominio de marca',
    description:
      'Reducir el salto a dominios ajenos o explicar visualmente por qué ocurre. Esto ataca confianza, phishing percibido y abandono en la etapa sensible del funnel.',
    level: 'high'
  },
  {
    title: 'Mostrar CAT, tasas y ejemplo de pago arriba del fold',
    description:
      'La claridad financiera debe competir junto con la promesa de rapidez. Hoy la conversión puede frenarse por falta de transparencia visible.',
    level: 'high'
  },
  {
    title: 'Separar lo financiero de lo ecommerce',
    description:
      'Eliminar señales visuales como carrito, colecciones o pedidos que confundan al usuario sobre el tipo de empresa y su formalidad.',
    level: 'medium'
  },
  {
    title: 'Convertir privacidad en narrativa simple',
    description:
      'No solo legales. Explicar por qué se pide biometría, ubicación o información bancaria y cómo se protege, con lenguaje humano.',
    level: 'high'
  },
  {
    title: 'Escalar la prueba social verificable',
    description:
      'Casos reales, reseñas, métricas trazables, ubicaciones, logos de aliados y testimonios con contexto para elevar credibilidad.',
    level: 'medium'
  }
] as const;

const findings = {
  resumen: [
    'La marca sí tiene huella digital real: sitio, app, blog, LinkedIn, YouTube y redes enlazadas.',
    'La propuesta de valor es clara y orientada a rapidez, movilidad e inclusión crediticia.',
    'La percepción pública aún depende más de promesas comerciales que de evidencia sólida de confianza.'
  ],
  fortalezas: [
    'Mensajes comerciales directos y fáciles de entender.',
    'Señales visibles de operación nacional y de contacto real.',
    'Presencia multicanal activa y app con tracción pública.',
    'Contenido útil para awareness y SEO en blog y video.'
  ],
  debilidades: [
    'Baja visibilidad pública de tasas, CAT y condiciones ejemplificadas.',
    'Brecha entre la promesa simple y el volumen de datos sensibles solicitados.',
    'Arquitectura con rasgos de ecommerce que resta seriedad financiera.',
    'Canales sociales no muestran todavía una autoridad homogénea.'
  ],
  riesgos: [
    'Desconfianza por redirecciones a dominios fuera de marca.',
    'Sensación invasiva por biometría, geolocalización y evaluación extendida.',
    'Riesgo reputacional si la promesa de rapidez supera la claridad de condiciones.',
    'Vulnerabilidad a phishing o suplantación si el usuario no distingue dominios oficiales.'
  ]
};

const sourceCards = [
  {
    icon: Globe,
    title: 'Sitio principal',
    text: 'Es la base del posicionamiento y del funnel. Comunica velocidad, accesibilidad y cobertura.'
  },
  {
    icon: Smartphone,
    title: 'App Android',
    text: 'Refuerza percepción de producto operativo y continuo, con señal de adopción pública.'
  },
  {
    icon: Building2,
    title: 'LinkedIn',
    text: 'Canal más útil para legitimidad corporativa, equipo, operación y tracción B2B.'
  },
  {
    icon: PlayCircle,
    title: 'YouTube y contenido',
    text: 'Aporta educación y awareness, aunque aún no escala como activo fuerte de autoridad.'
  }
];

function levelLabel(level: 'high' | 'medium' | 'low') {
  if (level === 'high') return 'Alta prioridad';
  if (level === 'medium') return 'Prioridad media';
  return 'Prioridad baja';
}

function severityGradient(severity: number) {
  if (severity >= 85) return 'linear-gradient(90deg, #ff6b7a, #ff8ca1)';
  if (severity >= 70) return 'linear-gradient(90deg, #ffb84d, #ffd37e)';
  return 'linear-gradient(90deg, #7ef0c7, #a6ffe0)';
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'presence' | 'risks' | 'actions'>('overview');
  const maxSeverity = useMemo(() => Math.max(...riskMatrix.map((item) => item.severity)), []);

  const handlePrint = () => window.print();
  const handlePresentation = () => {
    document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  return (
    <main className="container">
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div className="brand-copy">
            <h1>Maxikash Audit Dashboard</h1>
            <p>Versión ejecutiva lista para compartir, presentar o exportar a PDF.</p>
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={handlePresentation}>
            <Presentation size={16} /> Modo presentación
          </button>
          <button className="btn primary" onClick={handlePrint}>
            <Download size={16} /> Exportar / PDF
          </button>
        </div>
      </div>

      <section className="hero">
        <div className="panel hero-main">
          <div className="kicker">
            <Sparkles size={15} /> Auditoría digital interactiva
          </div>
          <h2>Maxikash.mx: presencia digital, desafíos y ruta de mejora</h2>
          <p className="subtitle">
            Dashboard ejecutivo para presentar cómo se ve Maxikash desde afuera: fortaleza digital actual,
            señales de confianza, puntos de fricción, riesgos reputacionales y acciones prioritarias.
          </p>

          <div className="metric-row">
            <div className="metric-card">
              <div className="metric-label">Presencia digital global</div>
              <div className="metric-value">72/100</div>
              <div className="metric-note">Buena cobertura de canales, madurez desigual.</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Confianza percibida</div>
              <div className="metric-value">57/100</div>
              <div className="metric-note">El principal cuello de botella visible.</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Riesgo reputacional</div>
              <div className="metric-value">Alto</div>
              <div className="metric-note">Por privacidad, claridad y redirecciones.</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Prioridades inmediatas</div>
              <div className="metric-value">5</div>
              <div className="metric-note">Enfocadas en confianza y conversión.</div>
            </div>
          </div>
          <div className="presentation-tip">
            <ChevronRight size={16} /> Usa “Exportar / PDF” para guardar una versión imprimible desde el navegador.
          </div>
        </div>

        <aside className="panel hero-side">
          <div className="section-title">
            <div>
              <h3>Lectura ejecutiva</h3>
              <p>Qué funciona, qué frena y qué urge resolver.</p>
            </div>
          </div>
          <div className="list">
            <div className="list-item">
              <h3>Lo que sí funciona</h3>
              <p>La marca existe, se mueve y se ve activa. La propuesta de valor es comprensible y el funnel está orientado a conversión rápida.</p>
            </div>
            <div className="list-item">
              <h3>Lo que frena</h3>
              <p>El gap entre promesa simple y tratamiento de datos sensibles. Falta claridad financiera visible en el momento de decisión.</p>
            </div>
            <div className="list-item">
              <h3>Lo más urgente</h3>
              <p>Construir confianza explícita: dominio, transparencia de costos, explicación de seguridad y prueba social verificable.</p>
            </div>
          </div>
        </aside>
      </section>

      <div className="tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Resumen</button>
        <button className={`tab ${activeTab === 'presence' ? 'active' : ''}`} onClick={() => setActiveTab('presence')}>Presencia digital</button>
        <button className={`tab ${activeTab === 'risks' ? 'active' : ''}`} onClick={() => setActiveTab('risks')}>Riesgos</button>
        <button className={`tab ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => setActiveTab('actions')}>Plan de acción</button>
      </div>

      {activeTab === 'overview' && (
        <section className="grid">
          <div className="card span-7">
            <div className="section-title">
              <div>
                <h3>Diagnóstico en 6 dimensiones</h3>
                <p>Comparativo entre estado actual y nivel recomendado.</p>
              </div>
              <span className="badge"><TrendingUp size={14} /> Gap visible</span>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.12)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#dbe8f8', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#89a1b9', fontSize: 10 }} />
                <Radar name="Actual" dataKey="current" stroke="#49c6ff" fill="#49c6ff" fillOpacity={0.4} />
                <Radar name="Objetivo" dataKey="target" stroke="#7ef0c7" fill="#7ef0c7" fillOpacity={0.12} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card span-5">
            <div className="section-title">
              <div>
                <h3>Hallazgos clave</h3>
                <p>Qué define hoy la percepción pública.</p>
              </div>
            </div>
            <div className="list">
              {findings.resumen.map((item, index) => (
                <div key={index} className="list-item">
                  <h4>{index + 1}. Insight</h4>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card span-4">
            <div className="section-title">
              <div>
                <h3>Fortalezas visibles</h3>
                <p>Activos ya construidos.</p>
              </div>
              <span className="badge low"><BadgeCheck size={14} /> Favorable</span>
            </div>
            <div className="list">
              {findings.fortalezas.map((item, idx) => (
                <div key={idx} className="list-item"><p>{item}</p></div>
              ))}
            </div>
          </div>

          <div className="card span-4">
            <div className="section-title">
              <div>
                <h3>Debilidades visibles</h3>
                <p>Fricciones de confianza y UX.</p>
              </div>
              <span className="badge medium"><AlertTriangle size={14} /> Atención</span>
            </div>
            <div className="list">
              {findings.debilidades.map((item, idx) => (
                <div key={idx} className="list-item"><p>{item}</p></div>
              ))}
            </div>
          </div>

          <div className="card span-4">
            <div className="section-title">
              <div>
                <h3>Riesgos visibles</h3>
                <p>Lo que más puede dañar reputación o conversión.</p>
              </div>
              <span className="badge high"><ShieldAlert size={14} /> Alto</span>
            </div>
            <div className="list">
              {findings.riesgos.map((item, idx) => (
                <div key={idx} className="list-item"><p>{item}</p></div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'presence' && (
        <section className="grid">
          <div className="card span-7">
            <div className="section-title">
              <div>
                <h3>Madurez por canal</h3>
                <p>La marca tiene amplitud, pero no todos los canales pesan igual.</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#c9d8ea" fontSize={12} />
                <YAxis stroke="#89a1b9" />
                <Tooltip />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={index % 2 === 0 ? '#49c6ff' : '#7ef0c7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card span-5">
            <div className="section-title">
              <div>
                <h3>Palancas de crecimiento</h3>
                <p>Dónde hay mayor retorno reputacional.</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <PieChart>
                <Pie data={opportunityData} dataKey="value" nameKey="name" innerRadius={75} outerRadius={120} paddingAngle={4}>
                  {opportunityData.map((item, index) => (
                    <Cell key={`${item.name}-${index}`} fill={['#49c6ff', '#7ef0c7', '#ffb84d', '#9f8cff', '#ff6b7a'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card span-12">
            <div className="section-title">
              <div>
                <h3>Lectura de la huella digital</h3>
                <p>Cómo se perciben los activos públicos principales.</p>
              </div>
            </div>
            <div className="grid" style={{ gap: 16 }}>
              {sourceCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card span-3" style={{ padding: 18 }}>
                    <div className="badge"><Icon size={14} /> Canal</div>
                    <h4 style={{ marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                );
              })}
            </div>
            <p className="footer-note">
              Conclusión: la amplitud de presencia ya existe. La oportunidad no está en abrir más canales, sino en volver más creíble el momento de decisión y más consistente la narrativa entre canales.
            </p>
          </div>
        </section>
      )}

      {activeTab === 'risks' && (
        <section className="grid">
          <div className="card span-12">
            <div className="section-title">
              <div>
                <h3>Matriz de riesgos</h3>
                <p>Severidad combinada entre impacto reputacional y probabilidad visible.</p>
              </div>
              <span className="badge high"><Users size={14} /> Riesgos de confianza</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Riesgo</th>
                  <th>Impacto</th>
                  <th>Probabilidad</th>
                  <th>Severidad</th>
                </tr>
              </thead>
              <tbody>
                {riskMatrix.map((item) => (
                  <tr key={item.risk}>
                    <td>{item.risk}</td>
                    <td>{item.impact}</td>
                    <td>{item.probability}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="progress">
                          <span
                            style={{
                              width: `${(item.severity / maxSeverity) * 100}%`,
                              background: severityGradient(item.severity)
                            }}
                          />
                        </div>
                        <strong style={{ color: 'var(--text)' }}>{item.severity}</strong>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card span-6">
            <div className="section-title">
              <div>
                <h3>Riesgo reputacional central</h3>
                <p>La confianza todavía depende demasiado del esfuerzo del usuario.</p>
              </div>
            </div>
            <div className="list">
              <div className="list-item">
                <h3>Promesa simple vs. operación compleja</h3>
                <p>Mientras más simple sea el mensaje comercial, más visible debe ser la explicación de por qué se piden datos sensibles y cómo se protege al usuario.</p>
              </div>
              <div className="list-item">
                <h3>Funnel con cambio de dominio</h3>
                <p>Salir del dominio principal justo antes de solicitar datos financieros puede detonar sospecha y abandono, aunque el backend sea legítimo.</p>
              </div>
            </div>
          </div>

          <div className="card span-6">
            <div className="section-title">
              <div>
                <h3>Riesgo operativo visible</h3>
                <p>Lo que más puede afectar conversión y marca a corto plazo.</p>
              </div>
            </div>
            <div className="list">
              <div className="list-item">
                <h3>Claridad regulatoria y comercial</h3>
                <p>La falta de información financiera prominente puede generar dudas antes de iniciar solicitud o comparación con competidores.</p>
              </div>
              <div className="list-item">
                <h3>Menor consistencia entre activos</h3>
                <p>Cuando LinkedIn se ve corporativo pero el sitio parece mezcla de ecommerce/finanzas, la marca no termina de cerrar como institución confiable.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'actions' && (
        <section className="grid">
          <div className="card span-8">
            <div className="section-title">
              <div>
                <h3>Plan de acción prioritario</h3>
                <p>Orden sugerido para capturar confianza y luego escalar conversión.</p>
              </div>
            </div>
            <div className="list">
              {priorities.map((item, index) => (
                <div key={item.title} className="list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0 }}>{index + 1}. {item.title}</h3>
                    <span className={`badge ${item.level}`}>{levelLabel(item.level)}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card span-4">
            <div className="section-title">
              <div>
                <h3>Resultado esperado</h3>
                <p>Qué cambia si se ejecutan bien estas mejoras.</p>
              </div>
            </div>
            <div className="list">
              <div className="list-item">
                <h3>Más conversión calificada</h3>
                <p>Menos abandono por sospecha o falta de entendimiento del producto.</p>
              </div>
              <div className="list-item">
                <h3>Más confianza institucional</h3>
                <p>La marca deja de verse solo agresiva en adquisición y gana peso financiero.</p>
              </div>
              <div className="list-item">
                <h3>Más resiliencia reputacional</h3>
                <p>Menor exposición a críticas por privacidad, costos y posibles suplantaciones.</p>
              </div>
            </div>
          </div>

          <div className="card span-12">
            <div className="section-title">
              <div>
                <h3>Recomendación final</h3>
                <p>La prioridad no es abrir más canales, sino hacer más confiable el momento de decisión.</p>
              </div>
            </div>
            <div className="list-item">
              <h3>North star</h3>
              <p>
                Maxikash ya parece una empresa real y activa. El siguiente salto de valor está en que también parezca
                inequívocamente clara, segura y financieramente transparente. Ahí vive el crecimiento de reputación y conversión.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, color: '#bfe8ff' }}>
                <ChevronRight size={16} /> Primero confianza, luego performance.
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

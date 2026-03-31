import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../components/SupportLayout';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: string;
  responseTime: number;
  lastUpdated: string;
}

type StatusKey = ServiceStatus['status'];

const statusMeta: Record<StatusKey, { label: string; color: string; tint: string; icon: React.ReactNode }> = {
  operational: {
    label: 'Operational',
    color: '#22c55e',
    tint: 'rgba(34, 197, 94, 0.16)',
    icon: <i className="fa-solid fa-circle" aria-hidden="true" style={{ color: '#22c55e' }}></i>
  },
  degraded: {
    label: 'Degraded',
    color: '#f97316',
    tint: 'rgba(249, 115, 22, 0.18)',
    icon: <i className="fa-solid fa-circle" aria-hidden="true" style={{ color: '#f59e0b' }}></i>
  },
  outage: {
    label: 'Service Outage',
    color: '#f87171',
    tint: 'rgba(248, 113, 113, 0.22)',
    icon: <i className="fa-solid fa-circle" aria-hidden="true" style={{ color: '#ef4444' }}></i>
  },
  maintenance: {
    label: 'Maintenance',
    color: '#38bdf8',
    tint: 'rgba(56, 189, 248, 0.2)',
    icon: <i className="fa-solid fa-circle" aria-hidden="true" style={{ color: '#3b82f6' }}></i>
  }
};

const summaryCardStyle: React.CSSProperties = {
  display: 'grid',
  gap: 24,
  padding: '36px 38px',
  borderRadius: 30,
  border: '1px solid rgba(251, 146, 60, 0.4)',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 247, 237, 0.92) 100%)',
  boxShadow: '0 40px 80px rgba(249, 115, 22, 0.18)'
};

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.6rem',
  fontWeight: 700,
  color: '#1f2937'
};

export const Status: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'API Gateway',
      status: 'operational',
      uptime: '99.9%',
      responseTime: 145,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'Authentication Service',
      status: 'operational',
      uptime: '99.8%',
      responseTime: 89,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.9%',
      responseTime: 23,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.7%',
      responseTime: 234,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'CDN',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: 567,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'Email Service',
      status: 'operational',
      uptime: '99.6%',
      responseTime: 312,
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setServices((prev) =>
        prev.map((service) => {
          const delta = (Math.random() - 0.5) * 40;
          const nextResponse = Math.max(20, Math.round(service.responseTime + delta));
          return {
            ...service,
            responseTime: nextResponse,
            lastUpdated: new Date().toISOString()
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' :
                       services.some(s => s.status === 'outage') ? 'outage' : 'degraded';

  const impactedServices = useMemo(
    () => services.filter((service) => service.status !== 'operational').length,
    [services]
  );

  const averageUptime = useMemo(() => {
    if (services.length === 0) return 0;
    const total = services.reduce((acc, service) => acc + parseFloat(service.uptime), 0);
    return Math.round((total / services.length) * 10) / 10;
  }, [services]);

  const averageResponse = useMemo(() => {
    if (services.length === 0) return 0;
    const total = services.reduce((acc, service) => acc + service.responseTime, 0);
    return Math.round(total / services.length);
  }, [services]);

  return (
    <SupportLayout
      title="System Status"
      intro="Live view of service uptime, performance, and recent incident history across the Nexora platform."
    >
      <div style={{ display: 'grid', gap: 32 }}>
        <section style={summaryCardStyle}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#1f2937' }}>
              <span style={{ fontSize: '2.1rem' }}>{statusMeta[overallStatus].icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(148, 163, 184, 0.75)' }}>
                  Current posture
                </p>
                <strong style={{ fontSize: '1.6rem', letterSpacing: '-0.01em' }}>
                  {overallStatus === 'operational' ? 'All systems operational' : 'Attention required'}
                </strong>
              </div>
            </div>
            <div
              style={{
                borderRadius: 999,
                padding: '10px 18px',
                background: statusMeta[overallStatus].tint,
                color: statusMeta[overallStatus].color,
                fontWeight: 600
              }}
            >
              {statusMeta[overallStatus].label}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 18,
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
            }}
          >
            <div
              style={{
                padding: '16px 18px',
                borderRadius: 18,
                border: '1px solid rgba(251, 146, 60, 0.25)',
                background: '#fff'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f97316', fontWeight: 600 }}>
                Last update
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '1.1rem', color: '#1f2937', fontWeight: 600 }}>
                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div
              style={{
                padding: '16px 18px',
                borderRadius: 18,
                border: '1px solid rgba(251, 146, 60, 0.25)',
                background: '#fff'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f97316', fontWeight: 600 }}>
                Network uptime (30d)
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '1.1rem', color: '#1f2937', fontWeight: 600 }}>
                {averageUptime}%
              </p>
            </div>
            <div
              style={{
                padding: '16px 18px',
                borderRadius: 18,
                border: '1px solid rgba(251, 146, 60, 0.25)',
                background: '#fff'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f97316', fontWeight: 600 }}>
                Avg response (ms)
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '1.1rem', color: '#1f2937', fontWeight: 600 }}>
                {averageResponse}
              </p>
            </div>
            <div
              style={{
                padding: '16px 18px',
                borderRadius: 18,
                border: '1px solid rgba(251, 146, 60, 0.25)',
                background: '#fff'
              }}
            >
              <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f97316', fontWeight: 600 }}>
                Impacted services
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '1.1rem', color: '#1f2937', fontWeight: 600 }}>
                {impactedServices}
              </p>
            </div>
          </div>

          <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
            We track infrastructure telemetry end-to-end with automated alerts and a 24/7 incident response rotation.
            Subscribe to live updates or follow our social channels for proactive notifications.
          </p>
        </section>

        <section style={{ display: 'grid', gap: 20 }}>
          <h2 style={sectionHeadingStyle}>Service health overview</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {services.map((service) => {
              const meta = statusMeta[service.status];
              return (
                <div
                  key={service.name}
                  style={{
                    borderRadius: 26,
                    border: '1px solid rgba(251, 146, 60, 0.3)',
                    background: '#fff',
                    padding: '24px 26px',
                    display: 'grid',
                    gap: 18,
                    boxShadow: '0 28px 60px rgba(249, 115, 22, 0.14)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: '1.4rem' }}>{meta.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: '#1f2937' }}>{service.name}</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>
                          Updated {new Date(service.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        borderRadius: 999,
                        padding: '8px 16px',
                        background: meta.tint,
                        color: meta.color,
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                    >
                      {meta.label}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gap: 16,
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))'
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                        Uptime (30d)
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: '1.15rem', fontWeight: 600, color: '#1f2937' }}>
                        {service.uptime}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                        Avg response
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: '1.15rem', fontWeight: 600, color: '#1f2937' }}>
                        {service.responseTime} ms
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                        Escalation runbooks
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: '#4b5563' }}>
                        Linked in Control Tower
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ display: 'grid', gap: 20 }}>
          <h2 style={sectionHeadingStyle}>Recent incidents</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              {
                title: 'CDN performance imbalance — resolved',
                ago: '2 hours ago',
                summary: 'Traffic spikes in the EU region caused elevated latency between 14:05–14:22 UTC. Mitigated via edge cache rebalancing and additional capacity warm-up.'
              },
              {
                title: 'Scheduled database maintenance — completed',
                ago: '1 day ago',
                summary: 'Quarterly index optimization and backup rotation completed within the 30 minute window. No customer impact recorded.'
              }
            ].map((incident) => (
              <div
                key={incident.title}
                style={{
                  borderRadius: 20,
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  background: '#f0fdf4',
                  padding: '18px 22px',
                  display: 'grid',
                  gap: 8,
                  color: '#166534'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
                  <strong style={{ fontSize: '1.05rem' }}>{incident.title}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{incident.ago}</span>
                </div>
                <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>{incident.summary}</p>
              </div>
            ))}
            <div
              style={{
                textAlign: 'center',
                padding: '32px 0',
                borderRadius: 20,
                border: '1px solid rgba(251, 146, 60, 0.25)',
                background: '#fff7ed',
                color: '#f97316'
              }}
            >
              <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>No active incidents</p>
              <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: '#4b5563' }}>
                All services operating within expected thresholds.
              </p>
            </div>
          </div>
        </section>

        <section
          style={{
            borderRadius: 28,
            border: '1px solid rgba(251, 146, 60, 0.35)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 244, 229, 0.9) 100%)',
            padding: '32px 34px',
            textAlign: 'center',
            display: 'grid',
            gap: 18,
            boxShadow: '0 32px 68px rgba(249, 115, 22, 0.15)'
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#1f2937', fontWeight: 700 }}>
            Subscribe for real-time alerts
          </h3>
          <p style={{ margin: 0, color: '#4b5563' }}>
            Receive incident notifications, maintenance windows, and postmortems straight to your inbox or chat workspace.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              style={{
                border: 'none',
                borderRadius: 999,
                padding: '12px 28px',
                background: '#f97316',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Subscribe to updates
            </button>
            <Link
              to="/contact"
              style={{
                borderRadius: 999,
                padding: '12px 28px',
                border: '1px solid rgba(249, 115, 22, 0.4)',
                color: '#f97316',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Contact support
            </Link>
            <a
              href="https://twitter.com/Nexora"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: 999,
                padding: '12px 28px',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                color: '#0f172a',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Follow on X
            </a>
          </div>
        </section>
      </div>
    </SupportLayout>
  );
};



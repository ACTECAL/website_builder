import React from 'react';
import { PageHero } from '../components/PageHero';
import { ScribbleUnderline } from '../components/Scribbles';
import { GothicH2 } from '../components/GothicHeading';
import { DrippingText } from '../components/DrippingText';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { CreativeCard, CardGrid } from '../components/CreativeCard';
import { FloatingElement } from '../components/FloatingElements';

export const About: React.FC = () => {
  return (
    <main>
      <AnimatedBackground variant="gradient" intensity="medium">
        <PageHero
          title="About Nexora"
          subtitle="we build modern, modular business apps so teams can move faster and work as one."
          imageUrl="https://assets-persist.lovart.ai/agent_images/b25bca6b-06e7-40a8-88a2-64c1d4826334.jpg"
          emphasize="scribble"
          textColor="#ffffff"
        />
      </AnimatedBackground>

      <AnimatedBackground variant="particles" intensity="low">
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FloatingElement direction="up" intensity="low" delay={0.2}>
              <CreativeCard
                variant="glass"
                hoverEffect="lift"
                size="large"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginBottom: '60px'
                }}
              >
                <p style={{
                  color: '#475569',
                  lineHeight: 1.9,
                  fontSize: '1.1rem',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  at nexora we believe the best software doesn't just help businesses run—it helps them thrive. in a world where companies are overloaded with tools, logins, and scattered data, we set out to create a unified platform that feels intuitive, scales with your needs, and makes collaboration effortless.
                  <br /><br />
                  our mission is simple: give every business the power of enterprise-level systems without the complexity, cost, or rigidity.
                </p>
              </CreativeCard>
            </FloatingElement>

            <FloatingElement direction="up" intensity="low" delay={0.4}>
              <GothicH2 text="Our Story" style={{ marginTop: 60, fontSize: '2.5rem', textAlign: 'center' }} />
            </FloatingElement>

            <CardGrid columns={1} gap={32} style={{ marginTop: '40px' }}>
              <FloatingElement direction="up" intensity="low" delay={0.6}>
                <CreativeCard variant="minimal" hoverEffect="lift" size="large">
                  <DrippingText
                    text="Every company has an origin story, and ours began with a simple pain point. a small group of us—entrepreneurs and developers—were frustrated by how much time was wasted on repetitive tasks like invoicing. we wanted something better: a lightweight tool that automated invoices without needing a full it team to maintain it."
                    style={{ color: '#475569', lineHeight: 1.9, fontSize: '1.1rem' }}
                  />
                </CreativeCard>
              </FloatingElement>

              <FloatingElement direction="up" intensity="low" delay={0.8}>
                <CreativeCard variant="gradient" hoverEffect="glow" size="large">
                  <DrippingText
                    text="That first tool was small, but it made a big difference. customers began asking for more: could we add customer tracking? what about expense management? could we handle hr processes, too?"
                    style={{ color: 'white', lineHeight: 1.9, fontSize: '1.1rem' }}
                  />
                </CreativeCard>
              </FloatingElement>

              <FloatingElement direction="up" intensity="low" delay={1.0}>
                <CreativeCard variant="neon" hoverEffect="scale" size="large">
                  <DrippingText
                    text="One by one, we answered those requests. but instead of bolting on clunky features, we reimagined what a business platform should be: modular, open, and coherent."
                    style={{ color: 'white', lineHeight: 1.9, fontSize: '1.1rem' }}
                  />
                </CreativeCard>
              </FloatingElement>
            </CardGrid>

            <FloatingElement direction="up" intensity="low" delay={1.2}>
              <GothicH2 text="Our Principles" style={{ marginTop: 80, fontSize: '2.5rem', textAlign: 'center' }} />
            </FloatingElement>

            <CardGrid columns={2} gap={32} style={{ marginTop: '40px' }}>
              {[
                {
                  title: "Modular first",
                  subtitle: "Start small, expand when you need",
                  content: "Business software shouldn't be 'all or nothing.' with Nexora, you can begin with one app—like CRM or finance—and expand as your company grows. this modularity ensures you always have what you need, without paying for what you don't.",
                  variant: "glass" as const,
                  icon: <i className="fa-solid fa-puzzle-piece" aria-hidden="true"></i>
                },
                {
                  title: "Open by default",
                  subtitle: "API-first with clean integrations",
                  content: "We believe businesses should own their data, not lock it away in silos. Nexora is API-first and designed for seamless integrations with the tools you already use.",
                  variant: "gradient" as const,
                  icon: <i className="fa-solid fa-link" aria-hidden="true"></i>
                },
                {
                  title: "Delightfully usable",
                  subtitle: "Craft and polish matter",
                  content: "We obsess over details—clean interfaces, simple workflows, and thoughtful design—because small touches have a big impact.",
                  variant: "neon" as const,
                  icon: <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
                },
                {
                  title: "One coherent system",
                  subtitle: "Not a pile of tabs",
                  content: "Nexora is designed to feel like one connected brain for your company. no jumping between tabs, no hunting for files—just one seamless experience.",
                  variant: "cyber" as const,
                  icon: <i className="fa-solid fa-brain" aria-hidden="true"></i>
                }
              ].map((principle, idx) => (
                <FloatingElement key={idx} direction="up" intensity="low" delay={1.4 + idx * 0.2}>
                  <CreativeCard
                    variant={principle.variant}
                    hoverEffect="lift"
                    size="large"
                    style={{ height: '100%' }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '3rem' }}>
                      {principle.icon}
                    </div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      margin: '0 0 8px',
                      color: principle.variant === 'cyber' ? '#00ffff' : 'inherit'
                    }}>
                      {principle.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      margin: '0 0 16px',
                      fontWeight: 600
                    }}>
                      {principle.subtitle}
                    </p>
                    <p style={{
                      color: principle.variant === 'cyber' ? '#00ffff' : 'inherit',
                      lineHeight: 1.7,
                      fontSize: '1rem'
                    }}>
                      {principle.content}
                    </p>
                  </CreativeCard>
                </FloatingElement>
              ))}
            </CardGrid>

            <FloatingElement direction="up" intensity="low" delay={2.2}>
              <GothicH2 text="Our Impact" style={{ marginTop: 80, fontSize: '2.5rem', textAlign: 'center' }} />
            </FloatingElement>

            <FloatingElement direction="up" intensity="low" delay={2.4}>
              <CreativeCard
                variant="glass"
                hoverEffect="glow"
                size="large"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginTop: '40px'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                  {[
                    "save time by automating repetitive tasks",
                    "cut costs by reducing tool sprawl",
                    "improve collaboration by unifying teams on one system",
                    "scale faster by adapting tools as you grow"
                  ].map((impact, idx) => (
                    <div key={idx} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}><i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></div>
                      <p style={{ color: '#475569', margin: 0, fontSize: '1rem' }}>{impact}</p>
                    </div>
                  ))}
                </div>
                <p style={{
                  color: '#475569',
                  lineHeight: 1.9,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  "we finally have visibility across departments." "our team feels more connected." "we've reduced manual work by half." that's impact we're proud of—and it pushes us to keep improving.
                </p>
              </CreativeCard>
            </FloatingElement>

            <FloatingElement direction="up" intensity="low" delay={2.6}>
              <GothicH2 text="Closing Note" style={{ marginTop: 80, fontSize: '2.5rem', textAlign: 'center' }} />
            </FloatingElement>

            <FloatingElement direction="up" intensity="low" delay={2.8}>
              <CreativeCard
                variant="gradient"
                hoverEffect="lift"
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '40px'
                }}
              >
                <p style={{
                  lineHeight: 1.9,
                  fontSize: '1.2rem',
                  margin: '0 0 24px'
                }}>
                  at nexora, we believe every business—no matter its size—deserves software that feels powerful, simple, and beautifully connected. we started small, we've grown with our customers, and we're just getting started.
                </p>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ marginRight: 8 }}></i>
                  <a href="/solutions" style={{ color: '#FDBA26', textDecoration: 'none', fontWeight: 700 }}>explore nexora today</a> — and build the system your business deserves.
                </p>
              </CreativeCard>
            </FloatingElement>
          </div>
        </section>
      </AnimatedBackground>
    </main>
  );
};
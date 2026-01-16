import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../components/SupportLayout';

export const APIReference: React.FC = () => {
  const [activeSection, setActiveSection] = useState('authentication');
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsWide(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const sections = [
    { id: 'authentication', title: 'Authentication', icon: <i className="fa-solid fa-user-lock" aria-hidden="true"></i> },
    { id: 'endpoints', title: 'API Endpoints', icon: <i className="fa-solid fa-link" aria-hidden="true"></i> },
    { id: 'webhooks', title: 'Webhooks', icon: <i className="fa-solid fa-diagram-project" aria-hidden="true"></i> },
    { id: 'rate-limits', title: 'Rate Limits', icon: <i className="fa-solid fa-bolt" aria-hidden="true"></i> },
    { id: 'errors', title: 'Error Handling', icon: <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> },
    { id: 'examples', title: 'Code Examples', icon: <i className="fa-solid fa-laptop-code" aria-hidden="true"></i> }
  ];

  const content = {
    authentication: {
      title: 'Authentication',
      description: 'Learn how to authenticate your API requests',
      content: (
        <div>
          <h3>API Key Authentication</h3>
          <p>All API requests require authentication using an API key. Include your API key in the request header:</p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 16,
            borderRadius: 8,
            fontFamily: 'monospace',
            margin: '16px 0',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            Authorization: Bearer YOUR_API_KEY
          </div>

          <h3>Getting an API Key</h3>
          <p>API keys can be obtained from your account dashboard under "API Settings". Keep your API key secure and never share it publicly.</p>

          <h3>Scopes and Permissions</h3>
          <p>API keys can be configured with different scopes:</p>
          <ul>
            <li><code>read</code> - Read-only access to resources</li>
            <li><code>write</code> - Create and modify resources</li>
            <li><code>admin</code> - Full administrative access</li>
          </ul>
        </div>
      )
    },
    endpoints: {
      title: 'API Endpoints',
      description: 'Complete reference of all available API endpoints',
      content: (
        <div>
          <h3>Base URL</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 16,
            borderRadius: 8,
            fontFamily: 'monospace',
            margin: '16px 0',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            https://api.nexora.com/v1
          </div>

          <h3>Available Endpoints</h3>

          <div style={{ marginBottom: 24 }}>
            <h4>Users</h4>
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              <code>GET /users</code> - List all users
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              <code>GET /users/&#123;id&#125;</code> - Get user by ID
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              <code>POST /users</code> - Create new user
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              <code>PUT /users/&#123;id&#125;</code> - Update user
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              <code>DELETE /users/&#123;id&#125;</code> - Delete user
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4>Projects</h4>
            <div style={{
              background: 'rgba(244, 162, 97, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(244, 162, 97, 0.3)'
            }}>
              <code>GET /projects</code> - List all projects
            </div>
            <div style={{
              background: 'rgba(244, 162, 97, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(244, 162, 97, 0.3)'
            }}>
              <code>POST /projects</code> - Create new project
            </div>
            <div style={{
              background: 'rgba(244, 162, 97, 0.1)',
              padding: 16,
              borderRadius: 8,
              margin: '8px 0',
              border: '1px solid rgba(244, 162, 97, 0.3)'
            }}>
              <code>GET /projects/&#123;id&#125;</code> - Get project details
            </div>
          </div>
        </div>
      )
    },
    webhooks: {
      title: 'Webhooks',
      description: 'Configure webhooks to receive real-time notifications',
      content: (
        <div>
          <h3>Setting up Webhooks</h3>
          <p>Webhooks allow your application to receive real-time notifications when events occur in your account.</p>

          <h3>Available Events</h3>
          <ul>
            <li><code>user.created</code> - When a new user is created</li>
            <li><code>user.updated</code> - When user information is modified</li>
            <li><code>project.created</code> - When a new project is created</li>
            <li><code>payment.succeeded</code> - When a payment is processed successfully</li>
          </ul>

          <h3>Webhook Security</h3>
          <p>All webhook requests include a signature in the <code>X-Signature</code> header. Use this to verify the authenticity of the webhook.</p>
        </div>
      )
    },
    'rate-limits': {
      title: 'Rate Limits',
      description: 'Understanding API rate limits and how to handle them',
      content: (
        <div>
          <h3>Rate Limit Headers</h3>
          <p>API responses include rate limit information in the following headers:</p>
          <ul>
            <li><code>X-RateLimit-Limit</code> - Maximum requests per window</li>
            <li><code>X-RateLimit-Remaining</code> - Remaining requests in current window</li>
            <li><code>X-RateLimit-Reset</code> - Time when the rate limit resets</li>
          </ul>

          <h3>Rate Limit Tiers</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 16,
            borderRadius: 8,
            margin: '16px 0',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <p><strong>Free Plan:</strong> 100 requests per hour</p>
            <p><strong>Pro Plan:</strong> 1,000 requests per hour</p>
            <p><strong>Enterprise:</strong> 10,000 requests per hour</p>
          </div>
        </div>
      )
    },
    errors: {
      title: 'Error Handling',
      description: 'Common error codes and how to handle them',
      content: (
        <div>
          <h3>HTTP Status Codes</h3>
          <ul>
            <li><code>200</code> - Success</li>
            <li><code>400</code> - Bad Request</li>
            <li><code>401</code> - Unauthorized</li>
            <li><code>403</code> - Forbidden</li>
            <li><code>404</code> - Not Found</li>
            <li><code>429</code> - Rate Limited</li>
            <li><code>500</code> - Internal Server Error</li>
          </ul>

          <h3>Error Response Format</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 16,
            borderRadius: 8,
            fontFamily: 'monospace',
            margin: '16px 0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'auto'
          }}>
            {`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": {
      "field": "email",
      "issue": "invalid_format"
    }
  }
}`}
          </div>
        </div>
      )
    },
    examples: {
      title: 'Code Examples',
      description: 'Sample code for common API operations',
      content: (
        <div>
          <h3>JavaScript (Node.js)</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 16,
            borderRadius: 8,
            fontFamily: 'monospace',
            margin: '16px 0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'auto'
          }}>
            {`const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.nexora.com/v1',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

// Get all users
async function getUsers() {
  try {
    const response = await client.get('/users');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}`}
          </div>

          <h3>Python</h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 16,
            borderRadius: 8,
            fontFamily: 'monospace',
            margin: '16px 0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'auto'
          }}>
            {`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.get(
    'https://api.nexora.com/v1/users',
    headers=headers
)

if response.status_code == 200:
    users = response.json()
    print(users)
else:
    print(f"Error: {response.status_code}")
    print(response.json())`}
          </div>
        </div>
      )
    }
  };

  const wrapperStyle: React.CSSProperties = isWide
    ? {
      display: 'grid',
      gridTemplateColumns: 'minmax(240px, 280px) 1fr',
      gap: 28
    }
    : {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    };

  return (
    <SupportLayout
      title="API Reference"
      intro="Complete coverage of endpoints, authentication flows, and integration recipes for Actyx."
    >
      <div style={wrapperStyle}>
        <aside
          style={{
            background: 'linear-gradient(180deg, rgba(255, 247, 237, 0.95) 0%, rgba(255, 239, 224, 0.9) 100%)',
            border: '1px solid rgba(251, 146, 60, 0.35)',
            borderRadius: 24,
            padding: '24px 22px',
            position: isWide ? 'sticky' : 'static',
            top: isWide ? 12 : undefined,
            alignSelf: 'flex-start',
            boxShadow: '0 24px 50px rgba(249, 115, 22, 0.12)'
          }}
        >
          <h2 style={{ margin: '0 0 18px', fontSize: '1.15rem', color: '#1f2937' }}>Sections</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {sections.map((section) => {
              const selected = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 16,
                    border: selected ? '1px solid rgba(249, 115, 22, 0.45)' : '1px solid transparent',
                    background: selected ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                    color: selected ? '#f97316' : '#6b7280',
                    cursor: 'pointer',
                    fontWeight: 600,
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                    boxShadow: selected ? '0 16px 30px rgba(249, 115, 22, 0.18)' : '0 4px 16px rgba(249, 115, 22, 0.08)'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
                  {section.title}
                </button>
              );
            })}
          </div>
        </aside>

        <div
          style={{
            borderRadius: 28,
            border: '1px solid rgba(251, 146, 60, 0.4)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 247, 237, 0.9) 100%)',
            padding: isWide ? '42px 44px' : '32px 28px',
            boxShadow: '0 36px 70px rgba(249, 115, 22, 0.15)',
            color: '#374151',
            lineHeight: 1.8,
            display: 'grid',
            gap: 28
          }}
        >
          <header>
            <h1 style={{ margin: '0 0 12px', fontSize: '2.2rem', fontWeight: 800, color: '#1f2937' }}>
              {content[activeSection as keyof typeof content].title}
            </h1>
            <p style={{ margin: 0, fontSize: '1.05rem', color: '#4b5563' }}>
              {content[activeSection as keyof typeof content].description}
            </p>
          </header>

          <div style={{ display: 'grid', gap: 22 }}>{content[activeSection as keyof typeof content].content}</div>

          <div
            style={{
              marginTop: 36,
              padding: '24px 26px',
              borderRadius: 22,
              border: '1px solid rgba(34, 197, 94, 0.25)',
              background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(220, 252, 231, 0.85) 100%)',
              display: 'grid',
              gap: 14,
              boxShadow: '0 20px 45px rgba(34, 197, 94, 0.15)'
            }}
          >
            <h3 style={{ margin: '0 0 8px', color: '#166534', fontSize: '1.2rem', fontWeight: 700 }}>Need help?</h3>
            <p style={{ margin: 0, color: '#166534' }}>
              Explore deeper guides or reach our developer relations team for bespoke support.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                to="/docs"
                style={{
                  padding: '12px 22px',
                  borderRadius: 999,
                  background: '#f97316',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 15px 30px rgba(249, 115, 22, 0.25)'
                }}
              >
                View Documentation
              </Link>
              <a
                href="mailto:developers@nexora.com"
                style={{
                  padding: '12px 22px',
                  borderRadius: 999,
                  border: '1px solid rgba(34, 197, 94, 0.45)',
                  color: '#16a34a',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Contact Dev Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};



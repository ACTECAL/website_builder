import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../components/SupportLayout';
import '../styles/APIReference.css';

type SectionId = 'authentication' | 'endpoints' | 'webhooks' | 'rate-limits' | 'errors' | 'examples';

export const APIReference: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('authentication');
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsWide(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const sections: { id: SectionId; title: string; icon: string }[] = [
    { id: 'authentication', title: 'Authentication',  icon: 'fa-solid fa-user-lock' },
    { id: 'endpoints',      title: 'API Endpoints',   icon: 'fa-solid fa-link' },
    { id: 'webhooks',       title: 'Webhooks',        icon: 'fa-solid fa-diagram-project' },
    { id: 'rate-limits',    title: 'Rate Limits',     icon: 'fa-solid fa-bolt' },
    { id: 'errors',         title: 'Error Handling',  icon: 'fa-solid fa-circle-xmark' },
    { id: 'examples',       title: 'Code Examples',   icon: 'fa-solid fa-laptop-code' },
  ];

  const content: Record<SectionId, { title: string; description: string; body: React.ReactNode }> = {
    authentication: {
      title: 'Authentication',
      description: 'Learn how to authenticate your API requests.',
      body: (
        <div>
          <h3>API Key Authentication</h3>
          <p>All API requests require authentication using an API key. Include your API key in the request header:</p>
          <pre className="api-code-block">Authorization: Bearer YOUR_API_KEY</pre>

          <h3>Getting an API Key</h3>
          <p>API keys can be obtained from your account dashboard under <code>API Settings</code>. Keep your API key secure and never share it publicly.</p>

          <h3>Scopes and Permissions</h3>
          <p>API keys can be configured with different scopes:</p>
          <ul>
            <li><code>read</code> – Read-only access to resources</li>
            <li><code>write</code> – Create and modify resources</li>
            <li><code>admin</code> – Full administrative access</li>
          </ul>
        </div>
      ),
    },
    endpoints: {
      title: 'API Endpoints',
      description: 'Complete reference of all available API endpoints.',
      body: (
        <div>
          <h3>Base URL</h3>
          <pre className="api-code-block">https://api.nexora.com/v1</pre>

          <h3>Users</h3>
          <div className="api-endpoint-list">
            <div className="api-endpoint-row"><span className="api-method get">GET</span><span className="api-endpoint-path">/users</span><span className="api-endpoint-desc">List all users</span></div>
            <div className="api-endpoint-row"><span className="api-method get">GET</span><span className="api-endpoint-path">/users/{'{id}'}</span><span className="api-endpoint-desc">Get user by ID</span></div>
            <div className="api-endpoint-row"><span className="api-method post">POST</span><span className="api-endpoint-path">/users</span><span className="api-endpoint-desc">Create new user</span></div>
            <div className="api-endpoint-row"><span className="api-method put">PUT</span><span className="api-endpoint-path">/users/{'{id}'}</span><span className="api-endpoint-desc">Update user</span></div>
            <div className="api-endpoint-row"><span className="api-method delete">DELETE</span><span className="api-endpoint-path">/users/{'{id}'}</span><span className="api-endpoint-desc">Delete user</span></div>
          </div>

          <h3>Projects</h3>
          <div className="api-endpoint-list">
            <div className="api-endpoint-row"><span className="api-method get">GET</span><span className="api-endpoint-path">/projects</span><span className="api-endpoint-desc">List all projects</span></div>
            <div className="api-endpoint-row"><span className="api-method post">POST</span><span className="api-endpoint-path">/projects</span><span className="api-endpoint-desc">Create new project</span></div>
            <div className="api-endpoint-row"><span className="api-method get">GET</span><span className="api-endpoint-path">/projects/{'{id}'}</span><span className="api-endpoint-desc">Get project details</span></div>
          </div>
        </div>
      ),
    },
    webhooks: {
      title: 'Webhooks',
      description: 'Configure webhooks to receive real-time notifications.',
      body: (
        <div>
          <h3>Setting up Webhooks</h3>
          <p>Webhooks allow your application to receive real-time notifications when events occur in your account.</p>

          <h3>Available Events</h3>
          <ul>
            <li><code>user.created</code> – When a new user is created</li>
            <li><code>user.updated</code> – When user information is modified</li>
            <li><code>project.created</code> – When a new project is created</li>
            <li><code>payment.succeeded</code> – When a payment is processed successfully</li>
          </ul>

          <h3>Webhook Security</h3>
          <p>All webhook requests include a signature in the <code>X-Signature</code> header. Use this to verify the authenticity of the webhook.</p>
        </div>
      ),
    },
    'rate-limits': {
      title: 'Rate Limits',
      description: 'Understanding API rate limits and how to handle them.',
      body: (
        <div>
          <h3>Rate Limit Headers</h3>
          <ul>
            <li><code>X-RateLimit-Limit</code> – Maximum requests per window</li>
            <li><code>X-RateLimit-Remaining</code> – Remaining requests in current window</li>
            <li><code>X-RateLimit-Reset</code> – Time when the rate limit resets</li>
          </ul>

          <h3>Rate Limit Tiers</h3>
          <pre className="api-code-block">{`Free Plan:    100 requests / hour
Pro Plan:     1,000 requests / hour
Enterprise:   10,000 requests / hour`}</pre>
        </div>
      ),
    },
    errors: {
      title: 'Error Handling',
      description: 'Common error codes and how to handle them.',
      body: (
        <div>
          <h3>HTTP Status Codes</h3>
          <ul>
            <li><code>200</code> – Success</li>
            <li><code>400</code> – Bad Request</li>
            <li><code>401</code> – Unauthorized</li>
            <li><code>403</code> – Forbidden</li>
            <li><code>404</code> – Not Found</li>
            <li><code>429</code> – Rate Limited</li>
            <li><code>500</code> – Internal Server Error</li>
          </ul>

          <h3>Error Response Format</h3>
          <pre className="api-code-block">{`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": {
      "field": "email",
      "issue": "invalid_format"
    }
  }
}`}</pre>
        </div>
      ),
    },
    examples: {
      title: 'Code Examples',
      description: 'Sample code for common API operations.',
      body: (
        <div>
          <h3>JavaScript (Node.js)</h3>
          <pre className="api-code-block">{`const axios = require('axios');

const client = axios.create({
  baseURL: 'https://api.nexora.com/v1',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});

async function getUsers() {
  try {
    const response = await client.get('/users');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}`}</pre>

          <h3>Python</h3>
          <pre className="api-code-block">{`import requests

headers = { 'Authorization': 'Bearer YOUR_API_KEY' }

response = requests.get(
    'https://api.nexora.com/v1/users',
    headers=headers
)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")`}</pre>
        </div>
      ),
    },
  };

  return (
    <SupportLayout
      title="API Reference"
      intro="Complete coverage of endpoints, authentication flows, and integration recipes for Nexora."
    >
      <div className={isWide ? 'api-ref-wrapper' : ''} style={isWide ? {} : { display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Sidebar */}
        <aside className="api-ref-sidebar">
          <h2>Sections</h2>
          <div className="api-ref-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`api-nav-btn${activeSection === section.id ? ' active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="api-nav-icon"><i className={section.icon} /></span>
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="api-ref-content">
          <header className="api-ref-header">
            <h1>{content[activeSection].title}</h1>
            <p>{content[activeSection].description}</p>
          </header>

          <div>{content[activeSection].body}</div>

          {/* Help Panel */}
          <div className="api-help-panel">
            <h3>Need help?</h3>
            <p>Explore deeper guides or reach our developer relations team for bespoke support.</p>
            <div className="api-help-btns">
              <Link to="/docs" className="api-help-btn-primary">View Documentation</Link>
              <a href="mailto:developers@nexora.com" className="api-help-btn-secondary">Contact Dev Support</a>
            </div>
          </div>
        </div>

      </div>
    </SupportLayout>
  );
};

export default APIReference;

import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';

import { AccountingPage } from './pages/apps/Accounting';
import { InvoicingPage } from './pages/apps/Invoicing';
import { ExpensesPage } from './pages/apps/Expenses';
import { SpreadsheetbiPage } from './pages/apps/Spreadsheetbi';
import { DocumentsPage } from './pages/apps/Documents';
import { SignPage } from './pages/apps/Sign';
import { CRMPage } from './pages/apps/CRM';
import { SalesPage } from './pages/apps/Sales';
import { POSPage } from './pages/apps/POS';
import { POSShopPage } from './pages/apps/POSShop';
import { POSRestaurantPage } from './pages/apps/POSRestaurant';
import { SubscriptionsPage } from './pages/apps/Subscriptions';
import { RentalPage } from './pages/apps/Rental';
import { WebsiteBuilderPage } from './pages/apps/WebsiteBuilder';
import { ECommercePage } from './pages/apps/eCommerce';
import { BlogPage } from './pages/apps/Blog';
import { ForumPage } from './pages/apps/Forum';
import { LiveChatPage } from './pages/apps/LiveChat';
import { ELearningPage } from './pages/apps/eLearning';
import { InventoryPage } from './pages/apps/Inventory';
import { ManufacturingPage } from './pages/apps/Manufacturing';
import { PurchasePage } from './pages/apps/Purchase';
import { QualityPage } from './pages/apps/Quality';
import { PLMPage } from './pages/apps/PLM';
import { MaintenancePage } from './pages/apps/Maintenance';
import { EmployeesPage } from './pages/apps/Employees';
import { RecruitmentPage } from './pages/apps/Recruitment';
import { TimeOffPage } from './pages/apps/TimeOff';
import { PayrollPage } from './pages/apps/Payroll';
import { AppraisalsPage } from './pages/apps/Appraisals';
import { ReferralsPage } from './pages/apps/Referrals';
import { FleetPage } from './pages/apps/Fleet';
import { SocialMarketingPage } from './pages/apps/SocialMarketing';
import { EmailMarketingPage } from './pages/apps/EmailMarketing';
import { SMSMarketingPage } from './pages/apps/SMSMarketing';
import { EventsPage } from './pages/apps/Events';
import { MarketingAutomationPage } from './pages/apps/MarketingAutomation';
import { SurveysPage } from './pages/apps/Surveys';
import { ProjectPage } from './pages/apps/Project';
import { TimesheetsPage } from './pages/apps/Timesheets';
import { FieldServicePage } from './pages/apps/FieldService';
import { HelpdeskPage } from './pages/apps/Helpdesk';
import { PlanningPage } from './pages/apps/Planning';
import { AppointmentsPage } from './pages/apps/Appointments';
import { DiscussPage } from './pages/apps/Discuss';
import { ApprovalsPage } from './pages/apps/Approvals';
import { IoTPage } from './pages/apps/IoT';
import { VoIPPage } from './pages/apps/VoIP';
import { KnowledgePage } from './pages/apps/Knowledge';
import { WhatsAppPage } from './pages/apps/WhatsApp';

import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Solutions } from './pages/Solutions';
import { Features } from './pages/Features';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Careers } from './pages/Careers';
import { Docs } from './pages/Docs';
import { Support } from './pages/Support';
import { NotFound } from './pages/NotFound';
import { Billing } from './pages/Billing';
import { Plan } from './pages/Plan';
import { Signup } from './pages/Signup';
import { ContactSales } from './pages/ContactSales';
import { Login } from './pages/Login';
import { RequireAuth } from './auth/RequireAuth';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicy } from './pages/CookiePolicy';
import { HelpCenter } from './pages/HelpCenter';
import { APIReference } from './pages/APIReference';
import { Status } from './pages/Status';
import { AppDetail } from './pages/AppDetail';
import { Industry } from './pages/Industry';
import { AllIndustries } from './pages/AllIndustries';
import { Community } from './pages/Community';
import { Tutorials } from './pages/Tutorials';
import { Certifications } from './pages/Certifications';
import { Training } from './pages/Training';
import { Podcast } from './pages/Podcast';
import { EducationProgram } from './pages/EducationProgram';
import { ScaleUpBusinessGame } from './pages/ScaleUpBusinessGame';
import { VisitOdoo } from './pages/VisitOdoo';
import { Download } from './pages/Download';
import { CompareEditions } from './pages/CompareEditions';
import { Releases } from './pages/Releases';
import { Github } from './pages/Github';
import { Forum } from './pages/Forum';
import { Events } from './pages/Events';
import { Translations } from './pages/Translations';
import { BecomeAPartner } from './pages/BecomeAPartner';
import { ServicesForPartners } from './pages/ServicesForPartners';
import { RegisterYourAccountingFirm } from './pages/RegisterYourAccountingFirm';
import { FindAPartner } from './pages/FindAPartner';
import { FindAnAccountant } from './pages/FindAnAccountant';
import { MeetAnAdvisor } from './pages/MeetAnAdvisor';
import { ImplementationServices } from './pages/ImplementationServices';
import { CustomerReferences } from './pages/CustomerReferences';
import { Upgrades } from './pages/Upgrades';
import { LearnMore } from './pages/LearnMore';
import LaunchPlan from './pages/LaunchPlan';
import { GetStarted } from './pages/GetStarted';
function App() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/get-started') ||
    location.pathname.startsWith('/choose-apps') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launch-plan" element={<LaunchPlan />} />        <Route path="/apps/accounting" element={<AccountingPage />} />
        <Route path="/apps/invoicing" element={<InvoicingPage />} />
        <Route path="/apps/expenses" element={<ExpensesPage />} />
        <Route path="/apps/spreadsheet-bi" element={<SpreadsheetbiPage />} />
        <Route path="/apps/documents" element={<DocumentsPage />} />
        <Route path="/apps/sign" element={<SignPage />} />
        <Route path="/apps/crm" element={<CRMPage />} />
        <Route path="/apps/sales" element={<SalesPage />} />
        <Route path="/apps/pos" element={<POSPage />} />
        <Route path="/apps/pos-shop" element={<POSShopPage />} />
        <Route path="/apps/pos-restaurant" element={<POSRestaurantPage />} />
        <Route path="/apps/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/apps/rental" element={<RentalPage />} />
        <Route path="/apps/website-builder" element={<WebsiteBuilderPage />} />
        <Route path="/apps/ecommerce" element={<ECommercePage />} />
        <Route path="/apps/blog" element={<BlogPage />} />
        <Route path="/apps/forum" element={<ForumPage />} />
        <Route path="/apps/live-chat" element={<LiveChatPage />} />
        <Route path="/apps/elearning" element={<ELearningPage />} />
        <Route path="/apps/inventory" element={<InventoryPage />} />
        <Route path="/apps/manufacturing" element={<ManufacturingPage />} />
        <Route path="/apps/purchase" element={<PurchasePage />} />
        <Route path="/apps/quality" element={<QualityPage />} />
        <Route path="/apps/plm" element={<PLMPage />} />
        <Route path="/apps/maintenance" element={<MaintenancePage />} />
        <Route path="/apps/employees" element={<EmployeesPage />} />
        <Route path="/apps/recruitment" element={<RecruitmentPage />} />
        <Route path="/apps/time-off" element={<TimeOffPage />} />
        <Route path="/apps/payroll" element={<PayrollPage />} />
        <Route path="/apps/appraisals" element={<AppraisalsPage />} />
        <Route path="/apps/referrals" element={<ReferralsPage />} />
        <Route path="/apps/fleet" element={<FleetPage />} />
        <Route path="/apps/social-marketing" element={<SocialMarketingPage />} />
        <Route path="/apps/email-marketing" element={<EmailMarketingPage />} />
        <Route path="/apps/sms-marketing" element={<SMSMarketingPage />} />
        <Route path="/apps/events" element={<EventsPage />} />
        <Route path="/apps/marketing-automation" element={<MarketingAutomationPage />} />
        <Route path="/apps/surveys" element={<SurveysPage />} />
        <Route path="/apps/project" element={<ProjectPage />} />
        <Route path="/apps/timesheets" element={<TimesheetsPage />} />
        <Route path="/apps/field-service" element={<FieldServicePage />} />
        <Route path="/apps/helpdesk" element={<HelpdeskPage />} />
        <Route path="/apps/planning" element={<PlanningPage />} />
        <Route path="/apps/appointments" element={<AppointmentsPage />} />
        <Route path="/apps/discuss" element={<DiscussPage />} />
        <Route path="/apps/approvals" element={<ApprovalsPage />} />
        <Route path="/apps/iot" element={<IoTPage />} />
        <Route path="/apps/voip" element={<VoIPPage />} />
        <Route path="/apps/knowledge" element={<KnowledgePage />} />
        <Route path="/apps/whatsapp" element={<WhatsAppPage />} />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/choose-apps" element={<GetStarted />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/plans/:planId" element={<Plan />} />
        <Route path="/billing" element={<RequireAuth><Billing /></RequireAuth>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-sales" element={<ContactSales />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/api-reference" element={<APIReference />} />
        <Route path="/status" element={<Status />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/industries" element={<AllIndustries />} />
        <Route path="/industries/:slug" element={<Industry />} />
        <Route path="/community" element={<Community />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/training" element={<Training />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/education-program" element={<EducationProgram />} />
        <Route path="/scale-up!-business-game" element={<ScaleUpBusinessGame />} />
        <Route path="/visit-odoo" element={<VisitOdoo />} />
        <Route path="/download" element={<Download />} />
        <Route path="/compare-editions" element={<CompareEditions />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/github" element={<Github />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/third-party" element={<GetStarted />} />
        <Route path="/studio" element={<GetStarted />} />
        <Route path="/cloud" element={<GetStarted />} />
        <Route path="/events" element={<Events />} />
        <Route path="/translations" element={<Translations />} />
        <Route path="/become-a-partner" element={<BecomeAPartner />} />
        <Route path="/services-for-partners" element={<ServicesForPartners />} />
        <Route path="/register-your-accounting-firm" element={<RegisterYourAccountingFirm />} />
        <Route path="/find-a-partner" element={<FindAPartner />} />
        <Route path="/find-an-accountant" element={<FindAnAccountant />} />
        <Route path="/meet-an-advisor" element={<MeetAnAdvisor />} />
        <Route path="/implementation-services" element={<ImplementationServices />} />
        <Route path="/customer-references" element={<CustomerReferences />} />
        <Route path="/upgrades" element={<Upgrades />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideChrome && <Footer />}
    </SiteLayout>
  );
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer style={{
      background: '#1A1A1A',
      color: 'white'
    }}>
      {/* Newsletter Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 24px 60px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            margin: '0 0 16px',
            color: 'white'
          }}>
            Stay Ahead of the Curve
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 40px',
            lineHeight: 1.6
          }}>
            Get exclusive insights, product updates, and industry trends delivered to your inbox. Join thousands of professionals who trust us.
          </p>

          {isSubscribed ? (
            <div style={{
              background: 'rgba(72, 187, 120, 0.2)',
              border: '1px solid rgba(72, 187, 120, 0.4)',
              borderRadius: 8,
              padding: '16px',
              color: '#68D391'
            }}>
              <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ marginRight: 8 }}></i>
              Thank you for subscribing! Check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: 12,
              maxWidth: 400,
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  flex: '1 1 250px',
                  padding: '14px 16px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 24px',
                  background: '#f4a261',
                  color: '#2d2d2d',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(244, 162, 97, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
            margin: '16px 0 0',
            lineHeight: 1.5
          }}>
            <i className="fa-solid fa-lock" aria-hidden="true" style={{ marginRight: 8 }}></i>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Feature Highlights */}
      <div style={{
        padding: '60px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24
        }}>
          {[
            {
              icon: <i className="fa fa-envelope" aria-hidden="true" style={{ color: "#3B82F6" }}></i>,
              title: 'Weekly Updates',
              description: 'Get the latest product news and feature releases delivered to your inbox every week.'
            },
            {
              icon: <i className="fa fa-bullseye" aria-hidden="true" style={{ color: "#8B5CF6" }}></i>,
              title: 'Exclusive Access',
              description: 'Be the first to access new features, beta programs, and special member-only content.'
            },
            {
              icon: <i className="fa-solid fa-lightbulb" style={{ color: "#EAB308" }}></i>,
              title: 'Pro Tips & Insights',
              description: 'Learn advanced techniques and best practices from our team of experts and industry leaders.'
            }
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '32px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>{feature.icon}</div>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                margin: '0 0 12px',
                color: 'white'
              }}>
                {feature.title}
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.8)',
                margin: 0,
                lineHeight: 1.5
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Links Section */}
      <div style={{
        padding: '60px 24px 40px'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 40,
            marginBottom: 40
          }}>
            <div>
              <div style={{
                fontWeight: 800,
                fontSize: '1.5rem',
                marginBottom: 16,
                color: 'var(--color-primary)'
              }}>
                Nexora              </div>
              <div style={{
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                marginBottom: 24
              }}>
                Modern business solutions, unified. Transform your workflow with our comprehensive suite of applications designed for the modern enterprise.
              </div>
              <div style={{
                display: 'flex',
                gap: 12
              }}>
                {[
                  { name: 'T', label: 'Twitter' },
                  { name: 'L', label: 'LinkedIn' },
                  { name: 'G', label: 'GitHub' },
                  { name: 'Y', label: 'YouTube' }
                ].map((social) => (
                  <a key={social.name} href={`#${social.label.toLowerCase()}`} style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.color = '#2d2d2d';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                margin: '0 0 20px',
                color: 'white'
              }}>
                Product
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                {['Features', 'Integrations', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase()}`} style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                margin: '0 0 20px',
                color: 'white'
              }}>
                Company
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase()}`} style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f4a261';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                margin: '0 0 20px',
                color: 'white'
              }}>
                Support
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                {['Help Center', 'Documentation', 'API Reference', 'Status', 'Contact'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f4a261';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: 32,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem'
            }}>
              © 2024 Nexora. All rights reserved.
            </div>
            <div style={{
              display: 'flex',
              gap: 24,
              fontSize: '0.9rem'
            }}>
              <Link to="/privacy" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f4a261';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}>
                Terms of Service
              </Link>
              <Link to="/cookies" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;


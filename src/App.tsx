import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BuilderProvider } from './components/builder/BuilderContext';
import { AuthProvider } from './auth/AuthContext';
import { RequireAuth } from './auth/RequireAuth';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import Footer from './components/Footer';

const AccountingPage = React.lazy(() => import('./pages/apps/Accounting').then(m => ({ default: m.AccountingPage })));
const InvoicingPage = React.lazy(() => import('./pages/apps/Invoicing').then(m => ({ default: m.InvoicingPage })));
const ExpensesPage = React.lazy(() => import('./pages/apps/Expenses').then(m => ({ default: m.ExpensesPage })));
const SpreadsheetbiPage = React.lazy(() => import('./pages/apps/Spreadsheetbi').then(m => ({ default: m.SpreadsheetbiPage })));
const DocumentsPage = React.lazy(() => import('./pages/apps/Documents').then(m => ({ default: m.DocumentsPage })));
const SignPage = React.lazy(() => import('./pages/apps/Sign').then(m => ({ default: m.SignPage })));
const CRMPage = React.lazy(() => import('./pages/apps/CRM').then(m => ({ default: m.CRMPage })));
const SalesPage = React.lazy(() => import('./pages/apps/Sales').then(m => ({ default: m.SalesPage })));
const POSPage = React.lazy(() => import('./pages/apps/POS').then(m => ({ default: m.POSPage })));
const POSShopPage = React.lazy(() => import('./pages/apps/POSShop').then(m => ({ default: m.POSShopPage })));
const POSRestaurantPage = React.lazy(() => import('./pages/apps/POSRestaurant').then(m => ({ default: m.POSRestaurantPage })));
const SubscriptionsPage = React.lazy(() => import('./pages/apps/Subscriptions').then(m => ({ default: m.SubscriptionsPage })));
const RentalPage = React.lazy(() => import('./pages/apps/Rental').then(m => ({ default: m.RentalPage })));
const WebsiteBuilderPage = React.lazy(() => import('./pages/apps/WebsiteBuilder').then(m => ({ default: m.WebsiteBuilderPage })));
const ECommercePage = React.lazy(() => import('./pages/apps/eCommerce').then(m => ({ default: m.ECommercePage })));
const BlogPage = React.lazy(() => import('./pages/apps/Blog').then(m => ({ default: m.BlogPage })));
const ForumPage = React.lazy(() => import('./pages/apps/Forum').then(m => ({ default: m.ForumPage })));
const LiveChatPage = React.lazy(() => import('./pages/apps/LiveChat').then(m => ({ default: m.LiveChatPage })));
const ELearningPage = React.lazy(() => import('./pages/apps/eLearning').then(m => ({ default: m.ELearningPage })));
const InventoryPage = React.lazy(() => import('./pages/apps/Inventory').then(m => ({ default: m.InventoryPage })));
const ManufacturingPage = React.lazy(() => import('./pages/apps/Manufacturing').then(m => ({ default: m.ManufacturingPage })));
const PurchasePage = React.lazy(() => import('./pages/apps/Purchase').then(m => ({ default: m.PurchasePage })));
const QualityPage = React.lazy(() => import('./pages/apps/Quality').then(m => ({ default: m.QualityPage })));
const PLMPage = React.lazy(() => import('./pages/apps/PLM').then(m => ({ default: m.PLMPage })));
const MaintenancePage = React.lazy(() => import('./pages/apps/Maintenance').then(m => ({ default: m.MaintenancePage })));
const EmployeesPage = React.lazy(() => import('./pages/apps/Employees').then(m => ({ default: m.EmployeesPage })));
const RecruitmentPage = React.lazy(() => import('./pages/apps/Recruitment').then(m => ({ default: m.RecruitmentPage })));
const TimeOffPage = React.lazy(() => import('./pages/apps/TimeOff').then(m => ({ default: m.TimeOffPage })));
const PayrollPage = React.lazy(() => import('./pages/apps/Payroll').then(m => ({ default: m.PayrollPage })));
const AppraisalsPage = React.lazy(() => import('./pages/apps/Appraisals').then(m => ({ default: m.AppraisalsPage })));
const ReferralsPage = React.lazy(() => import('./pages/apps/Referrals').then(m => ({ default: m.ReferralsPage })));
const FleetPage = React.lazy(() => import('./pages/apps/Fleet').then(m => ({ default: m.FleetPage })));
const SocialMarketingPage = React.lazy(() => import('./pages/apps/SocialMarketing').then(m => ({ default: m.SocialMarketingPage })));
const EmailMarketingPage = React.lazy(() => import('./pages/apps/EmailMarketing').then(m => ({ default: m.EmailMarketingPage })));
const SMSMarketingPage = React.lazy(() => import('./pages/apps/SMSMarketing').then(m => ({ default: m.SMSMarketingPage })));
const EventsPage = React.lazy(() => import('./pages/apps/Events').then(m => ({ default: m.EventsPage })));
const MarketingAutomationPage = React.lazy(() => import('./pages/apps/MarketingAutomation').then(m => ({ default: m.MarketingAutomationPage })));
const SurveysPage = React.lazy(() => import('./pages/apps/Surveys').then(m => ({ default: m.SurveysPage })));
const ProjectPage = React.lazy(() => import('./pages/apps/Project').then(m => ({ default: m.ProjectPage })));
const TimesheetsPage = React.lazy(() => import('./pages/apps/Timesheets').then(m => ({ default: m.TimesheetsPage })));
const FieldServicePage = React.lazy(() => import('./pages/apps/FieldService').then(m => ({ default: m.FieldServicePage })));
const HelpdeskPage = React.lazy(() => import('./pages/apps/Helpdesk').then(m => ({ default: m.HelpdeskPage })));
const PlanningPage = React.lazy(() => import('./pages/apps/Planning').then(m => ({ default: m.PlanningPage })));
const AppointmentsPage = React.lazy(() => import('./pages/apps/Appointments').then(m => ({ default: m.AppointmentsPage })));
const DiscussPage = React.lazy(() => import('./pages/apps/Discuss').then(m => ({ default: m.DiscussPage })));
const ApprovalsPage = React.lazy(() => import('./pages/apps/Approvals').then(m => ({ default: m.ApprovalsPage })));
const IoTPage = React.lazy(() => import('./pages/apps/IoT').then(m => ({ default: m.IoTPage })));
const VoIPPage = React.lazy(() => import('./pages/apps/VoIP').then(m => ({ default: m.VoIPPage })));
const KnowledgePage = React.lazy(() => import('./pages/apps/Knowledge').then(m => ({ default: m.KnowledgePage })));
const WhatsAppPage = React.lazy(() => import('./pages/apps/WhatsApp').then(m => ({ default: m.WhatsAppPage })));

const Pricing = React.lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const About = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Solutions = React.lazy(() => import('./pages/Solutions').then(m => ({ default: m.Solutions })));
const Features = React.lazy(() => import('./pages/Features').then(m => ({ default: m.Features })));
const Blog = React.lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = React.lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const Careers = React.lazy(() => import('./pages/Careers').then(m => ({ default: m.Careers })));
const Docs = React.lazy(() => import('./pages/Docs').then(m => ({ default: m.Docs })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const Billing = React.lazy(() => import('./pages/Billing').then(m => ({ default: m.Billing })));
const Plan = React.lazy(() => import('./pages/Plan').then(m => ({ default: m.Plan })));
const Signup = React.lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const ContactSales = React.lazy(() => import('./pages/ContactSales').then(m => ({ default: m.ContactSales })));
const Login = React.lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy').then(m => ({ default: m.CookiePolicy })));
const HelpCenter = React.lazy(() => import('./pages/HelpCenter').then(m => ({ default: m.HelpCenter })));
const APIReference = React.lazy(() => import('./pages/APIReference').then(m => ({ default: m.APIReference })));
const Status = React.lazy(() => import('./pages/Status').then(m => ({ default: m.Status })));

// Industry Pages
const BookStorePage = React.lazy(() => import('./pages/industries/BookStore').then(m => ({ default: m.BookStorePage })));
const ClothingStorePage = React.lazy(() => import('./pages/industries/ClothingStore').then(m => ({ default: m.ClothingStorePage })));
const FurnitureStorePage = React.lazy(() => import('./pages/industries/FurnitureStore').then(m => ({ default: m.FurnitureStorePage })));
const GroceryStorePage = React.lazy(() => import('./pages/industries/GroceryStore').then(m => ({ default: m.GroceryStorePage })));
const HardwareStorePage = React.lazy(() => import('./pages/industries/HardwareStore').then(m => ({ default: m.HardwareStorePage })));
const ToyStorePage = React.lazy(() => import('./pages/industries/ToyStore').then(m => ({ default: m.ToyStorePage })));
const BarAndPubPage = React.lazy(() => import('./pages/industries/BarAndPub').then(m => ({ default: m.BarAndPubPage })));
const RestaurantPage = React.lazy(() => import('./pages/industries/Restaurant').then(m => ({ default: m.RestaurantPage })));
const FastFoodPage = React.lazy(() => import('./pages/industries/FastFood').then(m => ({ default: m.FastFoodPage })));
const GuestHousePage = React.lazy(() => import('./pages/industries/GuestHouse').then(m => ({ default: m.GuestHousePage })));
const BeverageDistributorPage = React.lazy(() => import('./pages/industries/BeverageDistributor').then(m => ({ default: m.BeverageDistributorPage })));
const HotelPage = React.lazy(() => import('./pages/industries/Hotel').then(m => ({ default: m.HotelPage })));
const RealEstateAgencyPage = React.lazy(() => import('./pages/industries/RealEstateAgency').then(m => ({ default: m.RealEstateAgencyPage })));
const ArchitectureFirmPage = React.lazy(() => import('./pages/industries/ArchitectureFirm').then(m => ({ default: m.ArchitectureFirmPage })));
const ConstructionPage = React.lazy(() => import('./pages/industries/Construction').then(m => ({ default: m.ConstructionPage })));
const PropertyManagementPage = React.lazy(() => import('./pages/industries/PropertyManagement').then(m => ({ default: m.PropertyManagementPage })));
const GardeningPage = React.lazy(() => import('./pages/industries/Gardening').then(m => ({ default: m.GardeningPage })));
const PropertyOwnerAssociationPage = React.lazy(() => import('./pages/industries/PropertyOwnerAssociation').then(m => ({ default: m.PropertyOwnerAssociationPage })));
const AccountingFirmPage = React.lazy(() => import('./pages/industries/AccountingFirm').then(m => ({ default: m.AccountingFirmPage })));
const NexoraPartnerPage = React.lazy(() => import('./pages/industries/NexoraPartner').then(m => ({ default: m.NexoraPartnerPage })));
const MarketingAgencyPage = React.lazy(() => import('./pages/industries/MarketingAgency').then(m => ({ default: m.MarketingAgencyPage })));
const LawFirmPage = React.lazy(() => import('./pages/industries/LawFirm').then(m => ({ default: m.LawFirmPage })));
const TalentAcquisitionPage = React.lazy(() => import('./pages/industries/TalentAcquisition').then(m => ({ default: m.TalentAcquisitionPage })));
const AuditCertificationPage = React.lazy(() => import('./pages/industries/AuditCertification').then(m => ({ default: m.AuditCertificationPage })));
const TextilePage = React.lazy(() => import('./pages/industries/Textile').then(m => ({ default: m.TextilePage })));
const MetalPage = React.lazy(() => import('./pages/industries/Metal').then(m => ({ default: m.MetalPage })));
const FurnituresPage = React.lazy(() => import('./pages/industries/Furnitures').then(m => ({ default: m.FurnituresPage })));
const FoodPage = React.lazy(() => import('./pages/industries/Food').then(m => ({ default: m.FoodPage })));
const BreweryPage = React.lazy(() => import('./pages/industries/Brewery').then(m => ({ default: m.BreweryPage })));
const CorporateGiftsPage = React.lazy(() => import('./pages/industries/CorporateGifts').then(m => ({ default: m.CorporateGiftsPage })));
const SportsClubPage = React.lazy(() => import('./pages/industries/SportsClub').then(m => ({ default: m.SportsClubPage })));
const EyewearStorePage = React.lazy(() => import('./pages/industries/EyewearStore').then(m => ({ default: m.EyewearStorePage })));
const FitnessCenterPage = React.lazy(() => import('./pages/industries/FitnessCenter').then(m => ({ default: m.FitnessCenterPage })));
const WellnessPractitionersPage = React.lazy(() => import('./pages/industries/WellnessPractitioners').then(m => ({ default: m.WellnessPractitionersPage })));
const PharmacyPage = React.lazy(() => import('./pages/industries/Pharmacy').then(m => ({ default: m.PharmacyPage })));
const HairSalonPage = React.lazy(() => import('./pages/industries/HairSalon').then(m => ({ default: m.HairSalonPage })));
const HandymanPage = React.lazy(() => import('./pages/industries/Handyman').then(m => ({ default: m.HandymanPage })));
const ItHardwareSupportPage = React.lazy(() => import('./pages/industries/ItHardwareSupport').then(m => ({ default: m.ItHardwareSupportPage })));
const SolarEnergySystemsPage = React.lazy(() => import('./pages/industries/SolarEnergySystems').then(m => ({ default: m.SolarEnergySystemsPage })));
const ShoeMakerPage = React.lazy(() => import('./pages/industries/ShoeMaker').then(m => ({ default: m.ShoeMakerPage })));
const CleaningServicesPage = React.lazy(() => import('./pages/industries/CleaningServices').then(m => ({ default: m.CleaningServicesPage })));
const HvacServicesPage = React.lazy(() => import('./pages/industries/HvacServices').then(m => ({ default: m.HvacServicesPage })));
const NonprofitOrganizationPage = React.lazy(() => import('./pages/industries/NonprofitOrganization').then(m => ({ default: m.NonprofitOrganizationPage })));
const EnvironmentalAgencyPage = React.lazy(() => import('./pages/industries/EnvironmentalAgency').then(m => ({ default: m.EnvironmentalAgencyPage })));
const BillboardRentalPage = React.lazy(() => import('./pages/industries/BillboardRental').then(m => ({ default: m.BillboardRentalPage })));
const PhotographyPage = React.lazy(() => import('./pages/industries/Photography').then(m => ({ default: m.PhotographyPage })));
const BikeLeasingPage = React.lazy(() => import('./pages/industries/BikeLeasing').then(m => ({ default: m.BikeLeasingPage })));
const SoftwareResellerPage = React.lazy(() => import('./pages/industries/SoftwareReseller').then(m => ({ default: m.SoftwareResellerPage })));

const AllIndustries = React.lazy(() => import('./pages/AllIndustries').then(m => ({ default: m.AllIndustries })));
const Community = React.lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const Tutorials = React.lazy(() => import('./pages/Tutorials').then(m => ({ default: m.Tutorials })));
const Certifications = React.lazy(() => import('./pages/Certifications').then(m => ({ default: m.Certifications })));
const Training = React.lazy(() => import('./pages/Training').then(m => ({ default: m.Training })));
const Podcast = React.lazy(() => import('./pages/Podcast').then(m => ({ default: m.Podcast })));
const EducationProgram = React.lazy(() => import('./pages/EducationProgram').then(m => ({ default: m.EducationProgram })));
const ScaleUpBusinessGame = React.lazy(() => import('./pages/ScaleUpBusinessGame').then(m => ({ default: m.ScaleUpBusinessGame })));
const VisitNexora = React.lazy(() => import('./pages/VisitNexora').then(m => ({ default: m.VisitNexora })));
const Download = React.lazy(() => import('./pages/Download').then(m => ({ default: m.Download })));
const CompareEditions = React.lazy(() => import('./pages/CompareEditions').then(m => ({ default: m.CompareEditions })));
const Releases = React.lazy(() => import('./pages/Releases').then(m => ({ default: m.Releases })));
const Github = React.lazy(() => import('./pages/Github').then(m => ({ default: m.Github })));
const Forum = React.lazy(() => import('./pages/Forum').then(m => ({ default: m.Forum })));
const ThirdPartyApps = React.lazy(() => import('./pages/ThirdPartyApps').then(m => ({ default: m.ThirdPartyApps })));
const Studio = React.lazy(() => import('./pages/Studio').then(m => ({ default: m.Studio })));
const CloudPlatform = React.lazy(() => import('./pages/CloudPlatform').then(m => ({ default: m.CloudPlatform })));
const LaunchPlan = React.lazy(() => import('./pages/LaunchPlan'));
const Translations = React.lazy(() => import('./pages/Translations').then(m => ({ default: m.Translations })));
const BecomeAPartner = React.lazy(() => import('./pages/BecomeAPartner').then(m => ({ default: m.BecomeAPartner })));
const ServicesForPartners = React.lazy(() => import('./pages/ServicesForPartners').then(m => ({ default: m.ServicesForPartners })));
const RegisterYourAccountingFirm = React.lazy(() => import('./pages/RegisterYourAccountingFirm').then(m => ({ default: m.RegisterYourAccountingFirm })));
const FindAPartner = React.lazy(() => import('./pages/FindAPartner').then(m => ({ default: m.FindAPartner })));
const FindAnAccountant = React.lazy(() => import('./pages/FindAnAccountant').then(m => ({ default: m.FindAnAccountant })));
const MeetAnAdvisor = React.lazy(() => import('./pages/MeetAnAdvisor').then(m => ({ default: m.MeetAnAdvisor })));
const ImplementationServices = React.lazy(() => import('./pages/ImplementationServices').then(m => ({ default: m.ImplementationServices })));
const CustomerReferences = React.lazy(() => import('./pages/CustomerReferences').then(m => ({ default: m.CustomerReferences })));
const Upgrades = React.lazy(() => import('./pages/Upgrades').then(m => ({ default: m.Upgrades })));
const LearnMore = React.lazy(() => import('./pages/LearnMore').then(m => ({ default: m.LearnMore })));
const GetStarted = React.lazy(() => import('./pages/GetStarted').then(m => ({ default: m.GetStarted })));

const EliteLoader = () => (
  <div className="elite-loader-container">
    <div className="elite-loader-spinner" />
    <div className="elite-loader-text">
      Loading Nexora
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/get-started') ||
    location.pathname.startsWith('/choose-apps') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';
  return (
    <AuthProvider>
      <BuilderProvider>
        <SiteLayout>
          <React.Suspense fallback={<EliteLoader />}>
            <Routes>
          <Route path="/" element={<Home />} />
          {/* ... (all other routes follow the same structure) */}
          <Route path="/launch-plan" element={<LaunchPlan />} />
          <Route path="/apps/accounting" element={<AccountingPage />} />
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
          <Route path="/industries/book-store" element={<BookStorePage />} />
          <Route path="/industries/clothing-store" element={<ClothingStorePage />} />
          <Route path="/industries/furniture-store" element={<FurnitureStorePage />} />
          <Route path="/industries/grocery-store" element={<GroceryStorePage />} />
          <Route path="/industries/hardware-store" element={<HardwareStorePage />} />
          <Route path="/industries/toy-store" element={<ToyStorePage />} />
          <Route path="/industries/bar-and-pub" element={<BarAndPubPage />} />
          <Route path="/industries/restaurant" element={<RestaurantPage />} />
          <Route path="/industries/fast-food" element={<FastFoodPage />} />
          <Route path="/industries/guest-house" element={<GuestHousePage />} />
          <Route path="/industries/beverage-distributor" element={<BeverageDistributorPage />} />
          <Route path="/industries/hotel" element={<HotelPage />} />
          <Route path="/industries/real-estate-agency" element={<RealEstateAgencyPage />} />
          <Route path="/industries/architecture-firm" element={<ArchitectureFirmPage />} />
          <Route path="/industries/construction" element={<ConstructionPage />} />
          <Route path="/industries/property-management" element={<PropertyManagementPage />} />
          <Route path="/industries/gardening" element={<GardeningPage />} />
          <Route path="/industries/property-owner-association" element={<PropertyOwnerAssociationPage />} />
          <Route path="/industries/accounting-firm" element={<AccountingFirmPage />} />
          <Route path="/industries/nexora-partner" element={<NexoraPartnerPage />} />
          <Route path="/industries/marketing-agency" element={<MarketingAgencyPage />} />
          <Route path="/industries/law-firm" element={<LawFirmPage />} />
          <Route path="/industries/talent-acquisition" element={<TalentAcquisitionPage />} />
          <Route path="/industries/audit-certification" element={<AuditCertificationPage />} />
          <Route path="/industries/textile" element={<TextilePage />} />
          <Route path="/industries/metal" element={<MetalPage />} />
          <Route path="/industries/furnitures" element={<FurnituresPage />} />
          <Route path="/industries/food" element={<FoodPage />} />
          <Route path="/industries/brewery" element={<BreweryPage />} />
          <Route path="/industries/corporate-gifts" element={<CorporateGiftsPage />} />
          <Route path="/industries/sports-club" element={<SportsClubPage />} />
          <Route path="/industries/eyewear-store" element={<EyewearStorePage />} />
          <Route path="/industries/fitness-center" element={<FitnessCenterPage />} />
          <Route path="/industries/wellness-practitioners" element={<WellnessPractitionersPage />} />
          <Route path="/industries/pharmacy" element={<PharmacyPage />} />
          <Route path="/industries/hair-salon" element={<HairSalonPage />} />
          <Route path="/industries/handyman" element={<HandymanPage />} />
          <Route path="/industries/it-hardware-support" element={<ItHardwareSupportPage />} />
          <Route path="/industries/solar-energy-systems" element={<SolarEnergySystemsPage />} />
          <Route path="/industries/shoe-maker" element={<ShoeMakerPage />} />
          <Route path="/industries/cleaning-services" element={<CleaningServicesPage />} />
          <Route path="/industries/hvac-services" element={<HvacServicesPage />} />
          <Route path="/industries/nonprofit-organization" element={<NonprofitOrganizationPage />} />
          <Route path="/industries/environmental-agency" element={<EnvironmentalAgencyPage />} />
          <Route path="/industries/billboard-rental" element={<BillboardRentalPage />} />
          <Route path="/industries/photography" element={<PhotographyPage />} />
          <Route path="/industries/bike-leasing" element={<BikeLeasingPage />} />
          <Route path="/industries/software-reseller" element={<SoftwareResellerPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/training" element={<Training />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/education-program" element={<EducationProgram />} />
          <Route path="/scale-up!-business-game" element={<ScaleUpBusinessGame />} />
          <Route path="/visit-nexora" element={<VisitNexora />} />
          <Route path="/download" element={<Download />} />
          <Route path="/compare-editions" element={<CompareEditions />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/github" element={<Github />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/third-party" element={<ThirdPartyApps />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/cloud" element={<CloudPlatform />} />
          <Route path="/translations" element={<Translations />} />
          <Route path="/become-a-partner" element={<BecomeAPartner />} />
          <Route path="/services-for-partners" element={<ServicesForPartners />} />
          <Route path="/register-your-accounting-firm" element={<RegisterYourAccountingFirm />} />
          <Route path="/find-a-partner" element={<FindAPartner />} />
          <Route path="/find-an-accountant" element={<FindAnAccountant />} />
          <Route path="/meet-an-advisor" element={<MeetAnAdvisor />} />
          <Route path="/project-assessment" element={<MeetAnAdvisor />} />
          <Route path="/implementation-services" element={<ImplementationServices />} />
          <Route path="/customer-references" element={<CustomerReferences />} />
          <Route path="/upgrades" element={<Upgrades />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
      {!hideChrome && <Footer />}
    </SiteLayout>
  </BuilderProvider>
</AuthProvider>
  );
}

export default App;


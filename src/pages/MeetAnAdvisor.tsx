import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Video, Clock } from 'lucide-react';
import CelestialParticles from '../components/visuals/CelestialParticles';
import '../styles/MeetAnAdvisor.css';

export const MeetAnAdvisor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = window.location;
  const isAssessmentRoute = location.pathname === '/project-assessment';
  const type = isAssessmentRoute ? 'assessment' : (searchParams.get('type') || 'demo');

  const [selectedDate, setSelectedDate] = useState(9);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'selection' | 'details' | 'confirmation'>('selection');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    employees: '',
    message: ''
  });

  const isAssessment = type === 'assessment';

  const title = isAssessment
    ? "Project Assessment (250+ employees)"
    : "Demo with an Expert (1-250 employees)";

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM"
  ];

  const renderCalendar = () => {
    const daysInMonth = 31;
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const isSelected = selectedDate === i;
        const isToday = i === 9;
        days.push(
            <div
                key={i}
                className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => setSelectedDate(i)}
            >
                {i}
            </div>
        );
    }
    return days;
  };

  const renderDetails = () => (
    <div className="scheduler-page-root">
      <CelestialParticles />
      <main className="scheduler-container details-view glass-morphism">
        <div className="back-button" onClick={() => setStep('selection')}>
          <i className="fa-solid fa-arrow-left" /> Back
        </div>
        <h1 className="scheduler-title">Enter your details</h1>
        <div className="details-form-container">
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (123) 456-7890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Your Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Specific topics you'd like to discuss?</label>
            <textarea
              placeholder="e.g. I want to learn more about Nexora's CRM and Inventory modules."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button
            className="confirm-button animated-gradient"
            onClick={() => setStep('confirmation')}
          >
            Confirm Appointment
          </button>
        </div>
      </main>
    </div>
  );

  const renderConfirmation = () => (
    <div className="scheduler-page-root">
      <CelestialParticles />
      <main className="scheduler-container confirmation-view glass-morphism">
        <div className="success-icon">
          <i className="fa-solid fa-circle-check" />
        </div>
        <h1 className="scheduler-title">Appointment Confirmed!</h1>
        <p className="confirmation-text">
          Thank you, {formData.name}. Your {isAssessment ? "Project Assessment" : "Demo"} with an expert has been scheduled for <strong>March {selectedDate}, 2026 at {selectedTime}</strong>.
        </p>
        <p className="confirmation-subtext">
          A calendar invitation and zoom link have been sent to <strong>{formData.email}</strong>.
        </p>
        <button
          className="back-home-button animated-gradient"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </main>
    </div>
  );

  const renderSelection = () => (
    <div className="scheduler-page-root">
      <CelestialParticles />
      <main className="scheduler-container glass-morphism">
        <h1 className="scheduler-title">{title}</h1>

        <div className="scheduler-grid">
          <div className="scheduler-column">
            <h2 className="section-label">Select a date</h2>
            <div className="calendar-card">
              <div className="calendar-header">March 2026</div>
              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="day-header">{day}</div>
                ))}
                {renderCalendar()}
              </div>
            </div>
            <div className="timezone-footer">
              <span>Timezone:</span>
              <select className="timezone-select" defaultValue="Asia/Calcutta" title="Select your timezone">
                <option value="Asia/Calcutta">Asia/Calcutta (GMT+5:30)</option>
                <option value="UTC">UTC (GMT+0:00)</option>
                <option value="America/New_York">New York (GMT-5:00)</option>
              </select>
            </div>
          </div>

          <div className="scheduler-column">
            <h2 className="section-label">Time</h2>
            <div className="time-slots-grid">
              {timeSlots.map(time => (
                <div
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          <div className="scheduler-column details-sidebar">
            <h2 className="section-label">Meeting details</h2>
            <div className="meeting-meta">
              <div className="meta-item">
                <Video size={20} />
                <span>Online</span>
              </div>
              <div className="meta-item">
                <Clock size={20} />
                <span>1 hour</span>
              </div>
            </div>

            <div className="description-box">
              <h2 className="section-label">Description</h2>
              {isAssessment ? (
                <p>
                  Meet a Nexora expert to discuss your RFP, get a planning, a budget or a tailored demonstration.
                </p>
              ) : (
                <>
                  <p>Schedule a 1-hour free meeting with an expert, to get:</p>
                  <ul className="description-list">
                    <li>a tailored demonstration</li>
                    <li>recommendations based on your needs</li>
                    <li>answers to your questions about Nexora</li>
                    <li>information about pricing & methodology</li>
                  </ul>
                </>
              )}
            </div>

            {selectedDate && selectedTime && (
              <button
                className="next-button animated-gradient"
                onClick={() => setStep('details')}
              >
                Next: Enter Details
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );

  switch (step) {
    case 'details': return renderDetails();
    case 'confirmation': return renderConfirmation();
    default: return renderSelection();
  }
};

export default MeetAnAdvisor;

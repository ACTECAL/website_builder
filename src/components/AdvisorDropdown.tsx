import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import '../styles/AdvisorDropdown.css';

interface AdvisorDropdownProps {
    variant?: 'default' | 'on-card';
}

export const AdvisorDropdown: React.FC<AdvisorDropdownProps> = ({ variant = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`advisor-dropdown-container ${variant === 'on-card' ? 'on-card' : ''}`} ref={dropdownRef}>
            <button
                className="advisor-btn"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                Meet an advisor
                {variant === 'default' && <ChevronDown size={20} />}
            </button>

            <div className={`advisor-dropdown-menu ${isOpen ? 'is-open' : ''}`}>
                <Link
                    to="/meet-an-advisor?type=demo"
                    className="advisor-dropdown-item"
                    onClick={() => setIsOpen(false)}
                >
                    Demo with an Expert <span>(1-250 employees)</span>
                </Link>
                <Link
                    to="/meet-an-advisor?type=assessment"
                    className="advisor-dropdown-item"
                    onClick={() => setIsOpen(false)}
                >
                    Project Assessment <span>(250+ employees)</span>
                </Link>
            </div>
        </div>
    );
};

export default AdvisorDropdown;

import "./FloatingButtons.css";

// Replace these with your actual values:
const WHATSAPP_NUMBER = "919998664704"; // Greenvolt number without +
const CATALOGUE_PDF   = "/NEXXORA_CATALOGUE.pdf"; // put PDF in /public folder

export default function FloatingButtons() {
  return (
    <div className="fab-container">

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20am%20interested%20in%20Nexxora%20bathroom%20accessories.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <span className="fab-pulse" />
        <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.84 6.64L2.667 29.333l6.88-1.8A13.28 13.28 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24c-2.16 0-4.267-.587-6.107-1.693l-.44-.267-4.08 1.067 1.093-3.947-.28-.453A10.627 10.627 0 015.333 16c0-5.88 4.787-10.667 10.667-10.667S26.667 10.12 26.667 16 21.88 26.667 16 26.667h.004zm5.853-7.987c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.24-.16.213-.333.24-.64.08-.32-.16-1.333-.493-2.547-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32 0-.48.14-.627.14-.133.32-.347.48-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.52-.72-.533h-.613c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.333 1.36.533 1.827.68.76.24 1.453.213 2 .133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"/>
        </svg>
        <span className="fab-label">WhatsApp</span>
      </a>

      {/* Catalogue Button */}
      <a
        href={CATALOGUE_PDF}
        target="_blank"
        rel="noopener noreferrer"
        className="fab fab-catalogue"
        aria-label="Download Catalogue"
        download
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <polyline points="9 15 12 18 15 15"/>
        </svg>
        <span className="fab-label">Catalogue</span>
      </a>

    </div>
  );
}
"use client";
export default function Mapbox() {
  return (
    <section className="mapbox-section">
      <div className="mapbox-inner">
        <div className="section-header">
          <div>
            <h2>Find us on Map</h2>
            <p>We deliver across Meerut and nearby areas</p>
          </div>
        </div>
        <div className="mapbox-frame-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112075.25856795963!2d77.6345!3d28.9845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65c9e3a7f8db%3A0xb32c5df4a8e33ac7!2sMeerut%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699999999999"
            allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Delivery Map"
          />
        </div>
      </div>
    </section>
  );
}

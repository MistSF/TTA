import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white p-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Pages Légales</h5>
            {/* Utilisez Link de react-router-dom pour la navigation */}
            <ul className="list-unstyled">
              <li><a href="/mentions-legales" className="text-white">Mentions légales</a></li>
              {/* ... autres liens ... */}
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Contact</h5>
            <p>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              +33 (0)4 26 73 40 00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
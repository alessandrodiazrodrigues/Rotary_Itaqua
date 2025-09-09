// components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info do Clube */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Rotary Club Itaquaquecetuba
            </h3>
            <p className="text-gray-300 text-sm mb-2">Distrito 4563</p>
            <p className="text-gray-300 text-sm mb-2">
              Sistema de Gestão de Convites
            </p>
            <p className="text-gray-300 text-sm">
              "Servir é a renda que pagamos pelo espaço que ocupamos na Terra"
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Links Úteis
            </h3>
            <div className="space-y-2">
              <a 
                href="https://rotary.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Rotary International
              </a>
              <a 
                href="https://rotary.org.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Rotary Brasil
              </a>
              <a 
                href="https://brandcenter.rotary.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Brand Center
              </a>
            </div>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Suporte Técnico
            </h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                <i className="fas fa-envelope mr-2"></i>
                cvcalessandro@gmail.com
              </p>
              <p className="text-gray-300 text-sm">
                <i className="fas fa-phone mr-2"></i>
                Suporte durante eventos
              </p>
              <p className="text-gray-300 text-sm">
                <i className="fas fa-clock mr-2"></i>
                Sistema 24/7 online
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-600 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Rotary Club Itaquaquecetuba. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Versão 1.0.0</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-400 text-sm">Sistema Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

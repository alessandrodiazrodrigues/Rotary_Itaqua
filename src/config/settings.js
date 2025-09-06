// ⚙️ ARQUIVO DE CONFIGURAÇÃO PRINCIPAL
// Este é o ÚNICO arquivo que Alessandro precisa editar para configurar o sistema

export const CONFIG = {
  // 🏢 DADOS DO CLUBE
  CLUB_NAME: "Rotary Club Itaquaquecetuba",
  CLUB_DISTRICT: "4563",
  ADMIN_EMAIL: "cvcalessandro@gmail.com",
  ADMIN_NAME: "Alessandro Rodrigues",
  
  // 📊 GOOGLE APIS - ⚠️ ATUALIZAR SEMPRE QUE MUDAR
  GOOGLE_SHEETS_ID: "COLE_AQUI_O_ID_DA_PLANILHA", // ⚠️ TROCAR
  GOOGLE_SHEETS_API: "https://script.google.com/macros/s/SEU_SCRIPT_ID_AQUI/exec", // ⚠️ TROCAR
  GOOGLE_DRIVE_FOLDER: "rotary-convites-qrcodes",
  GOOGLE_CLIENT_ID: "SEU_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // ⚠️ TROCAR
  
  // 📱 WHATSAPP - ⚠️ CONFIGURAR COM SUA EVOLUTION API
  WHATSAPP_API: "http://SEU_IP:8080", // ⚠️ TROCAR
  WHATSAPP_INSTANCE: "rotary",
  WHATSAPP_TOKEN: "SEU_TOKEN_EVOLUTION", // ⚠️ TROCAR
  
  // 💰 PAGAMENTOS - ⚠️ CONFIGURAR COM SEUS DADOS
  PIX_KEY: "12345678901", // CNPJ do clube ⚠️ TROCAR
  PIX_BENEFICIARIO: "Rotary Club Itaquaquecetuba",
  PAGSEGURO_TOKEN: "SEU_TOKEN_PAGSEGURO", // ⚠️ TROCAR
  PAGSEGURO_EMAIL: "financeiro@rotaryitaqua.org.br", // ⚠️ TROCAR
  
  // 🎫 LIMITES DO SISTEMA
  MAX_CONVITES_FISICOS: 500,
  MAX_CONVITES_DIGITAIS: 500,
  MAX_COMPANHEIROS: 50,
  CODIGO_FISICO_PREFIX: "F",
  CODIGO_DIGITAL_PREFIX: "D",
  
  // 🎨 VISUAL (Cores do Rotary Brand Guidelines)
  COLORS: {
    primary: "#17458f",      // Azul Rotary
    secondary: "#f7a81b",    // Dourado Rotary
    success: "#28a745",      // Verde
    danger: "#dc3545",       // Vermelho
    warning: "#ffc107",      // Amarelo
    info: "#00a2e0",         // Azul claro
    background: "#ffffff",   // Branco
    surface: "#f8f9fa"       // Cinza claro
  },
  
  // 📧 MENSAGENS PADRÃO - ⚠️ PERSONALIZE COMO QUISER
  MESSAGES: {
    whatsapp_convite: `🎪 *{clube_nome}*

Você foi convidado para o evento:
*{evento_nome}*

📅 Data: {evento_data}
🕐 Hora: {evento_hora}
📍 Local: {evento_local}
💰 Valor: R$ {valor}

🔗 Finalize seu pagamento aqui:
{link_pagamento}

✅ Após o pagamento, você receberá seu QR Code por email.

Nos vemos lá! 🎉`,

    email_qrcode: `Olá {cliente_nome}!

Obrigado pela compra do convite para o evento {evento_nome}.

Seu QR Code está em anexo. Apresente-o na portaria do evento.

Dados do seu convite:
- Código: {codigo_convite}
- Evento: {evento_nome}
- Data: {evento_data}
- Local: {evento_local}
- Valor pago: R$ {valor}

Atenciosamente,
{clube_nome}`,

    sms_login: "Seu código de acesso ao sistema Rotary: {codigo}. Válido por 5 minutos.",
    
    whatsapp_confirmacao: `✅ *Pagamento Confirmado!*

Seu convite foi gerado com sucesso:
🎫 Código: {codigo_convite}
💰 Valor: R$ {valor}

📧 O QR Code foi enviado para seu email.

Obrigado! 🎉`
  },
  
  // 🌐 URLS DO SISTEMA
  URLS: {
    base: "https://convites.rotaryitaqua.org.br", // ⚠️ TROCAR quando tiver domínio
    payment: "/pagamento",
    admin: "/dashboard", 
    member: "/companheiro",
    checkout: "/checkout"
  },
  
  // ⏰ CONFIGURAÇÕES DE TEMPO
  SESSION_TIMEOUT: 30 * 24 * 60 * 60 * 1000, // 30 dias em millisegundos
  QR_CODE_EXPIRY: 365 * 24 * 60 * 60 * 1000,  // 1 ano
  SMS_CODE_EXPIRY: 5 * 60 * 1000,              // 5 minutos
  
  // 🔒 CONFIGURAÇÕES DE SEGURANÇA
  SECURITY: {
    JWT_SECRET: "rotary_secret_key_2024_alessandro", // ⚠️ TROCAR em produção
    MAX_LOGIN_ATTEMPTS: 5,
    RATE_LIMIT_MINUTES: 15,
    RATE_LIMIT_REQUESTS: 100
  }
};

// 🎪 CONFIGURAÇÕES DE EVENTOS PADRÃO
export const DEFAULT_EVENT = {
  capacidade: 300,
  valor_inteira: 100.00,
  valor_meia: 50.00,
  local: "Roda d'Água, Itaquá",
  hora: "12:00",
  permite_meia: true,
  idade_meia_min: 5,
  idade_meia_max: 12
};

// 💳 TAXAS DE PAGAMENTO (para cálculos)
export const PAYMENT_FEES = {
  pix: {
    fixed: 0.40,
    percentage: 0
  },
  credit_card: {
    fixed: 0.39,
    percentage: 3.99
  },
  debit_card: {
    fixed: 0.39,
    percentage: 2.99
  },
  cash: {
    fixed: 0,
    percentage: 0
  }
};

// 📱 CONFIGURAÇÕES MOBILE
export const MOBILE = {
  breakpoint: 768,
  header_height: 60,
  bottom_nav_height: 70
};

// 🎨 CONFIGURAÇÕES DE TEMA
export const THEME = {
  border_radius: "8px",
  box_shadow: "0 2px 8px rgba(23, 69, 143, 0.1)",
  font_family: "'Open Sans', 'Arial', sans-serif",
  spacing: {
    xs: "0.5rem",
    sm: "1rem", 
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem"
  }
};

// ✅ STATUS PERMITIDOS
export const STATUS = {
  event: ["ativo", "inativo", "finalizado"],
  payment: ["pendente", "pago", "cancelado", "estornado"],
  member: ["ativo", "inativo", "suspenso"],
  invite: ["gerado", "enviado", "pago", "usado", "cancelado"]
};

// 📋 VALIDAÇÕES
export const VALIDATION = {
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
};

// 🚀 MODO DE DESENVOLVIMENTO
export const DEV_MODE = process.env.NODE_ENV === 'development';

// 📝 LOGS
export const LOG_LEVEL = DEV_MODE ? 'debug' : 'info';

// ⚠️ IMPORTANTE: 
// Sempre que atualizar este arquivo, faça commit no GitHub
// O Vercel fará deploy automático em 2-3 minutos
// Teste sempre após as alterações!

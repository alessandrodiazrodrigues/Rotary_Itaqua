/**
 * CONFIGURAÇÕES PRINCIPAIS - Sistema Rotary Club Itaquaquecetuba
 * 
 * ⚠️ ARQUIVO PRINCIPAL DE CONFIGURAÇÃO
 * Alessandro: Este é o ÚNICO arquivo que você precisa editar
 */

// ========================================
// 🔧 CONFIGURAÇÕES PRINCIPAIS
// ========================================

export const CONFIG = {
  // 🏢 DADOS DO CLUBE
  CLUB_NAME: "Rotary Club Itaquaquecetuba",
  DISTRICT: "4563",
  ADMIN_EMAIL: "cvcalessandro@gmail.com",
  
  // 📊 GOOGLE APIS
  GOOGLE_SHEETS_ID: "1J84NZ_IsAEMbKgnamXeSO_41rLQ2EElKDnEnJDcAn_Q",
  GOOGLE_SHEETS_API: "https://script.google.com/macros/s/AKfycbyEnbbzjvlxa2QJOBHLyik1Rwwl2ngRqeU_pgaP2pNX3S1BgPC6ivduHucuU6YwuDgsQw/exec",
  GOOGLE_DRIVE_FOLDER: "rotary-convites-qrcodes",
  
  // 📱 WHATSAPP (Configurar depois)
  WHATSAPP_API: "http://sua-evolution-api.com:8080", // ⚠️ CONFIGURAR
  WHATSAPP_INSTANCE: "rotary",
  
  // 💰 PAGAMENTOS
  PIX_KEY: "12345678901", // CNPJ do clube - ⚠️ ATUALIZAR
  PIX_API: "https://api.pagseguro.uol.com.br", // ou outro provedor
  PIX_TOKEN: "SEU_TOKEN_AQUI", // ⚠️ CONFIGURAR
  PIX_TAXA: 0.40, // R$ 0,40 por PIX
  CARTAO_TAXA_PERCENT: 3.99, // 3,99% cartão
  
  // 🎫 LIMITES
  MAX_CONVITES_FISICOS: 500,
  MAX_CONVITES_DIGITAIS: 500,
  MAX_PATROCINIOS: 200,
  MAX_COMPANHEIROS: 50,
  
  // 🎨 VISUAL (Rotary Brand Guidelines)
  COLORS: {
    primary: "#17458f", // Azul Rotary
    secondary: "#f7a81b", // Dourado Rotary
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8"
  },
  
  // 📧 MENSAGENS PADRÃO
  MESSAGES: {
    whatsapp_convite: `🎪 Você foi convidado para o evento *{evento_nome}*!
📅 Data: {data}
📍 Local: {local}
💰 Valor: R$ {valor}

🔗 Finalize seu pagamento: {link}`,
    
    email_qrcode: "Obrigado pela compra! Seu QR Code está em anexo.",
    
    sms_codigo: "Seu código de acesso ao sistema Rotary: {codigo}",
    
    checkin_sucesso: "✅ Check-in realizado com sucesso! Bem-vindo ao evento.",
    
    sorteio_ganhador: "🎉 Parabéns! Você foi sorteado no evento {evento}!"
  },
  
  // 🏆 COTAS DE PATROCÍNIO PADRÃO
  COTAS_PATROCINIO: {
    DIAMANTE: {
      valor: 5000.00,
      convites: 50,
      beneficios: "Logo destacado, mesa VIP, 50 convites",
      cor: "#b9f2ff",
      maximo: 2
    },
    OURO: {
      valor: 3000.00,
      convites: 30,
      beneficios: "Logo médio, mesa preferencial, 30 convites",
      cor: "#ffd700",
      maximo: 5
    },
    PRATA: {
      valor: 2000.00,
      convites: 20,
      beneficios: "Logo padrão, mesa regular, 20 convites",
      cor: "#c0c0c0",
      maximo: 10
    },
    BRONZE: {
      valor: 1000.00,
      convites: 10,
      beneficios: "Menção no evento, 10 convites",
      cor: "#cd7f32",
      maximo: 20
    }
  }
};

// ========================================
// 🔒 CONFIGURAÇÕES DE SEGURANÇA
// ========================================

export const SECURITY = {
  JWT_SECRET: "rotary_secret_key_2024",
  SESSION_TIMEOUT: 30 * 24 * 60 * 60 * 1000, // 30 dias
  MAX_LOGIN_ATTEMPTS: 5,
  ENCRYPT_LOCAL_STORAGE: true
};

// ========================================
// 🌐 URLS DO SISTEMA
// ========================================

export const URLS = {
  base: "https://convites.rotaryitaqua.org.br",
  payment: "/pagamento",
  admin: "/dashboard",
  member: "/companheiro",
  checkin: "/checkin",
  sorteio: "/sorteio"
};

// ========================================
// 📱 CONFIGURAÇÕES DE INTERFACE
// ========================================

export const UI_CONFIG = {
  // Tema
  theme: "rotary", // rotary, dark, light
  
  // Responsividade
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },
  
  // Animações
  animations: {
    enabled: true,
    duration: 300,
    easing: "ease-in-out"
  },
  
  // Notificações
  notifications: {
    position: "top-right", // top-right, top-left, bottom-right, bottom-left
    duration: 5000,
    showProgress: true
  },
  
  // Tabelas
  tables: {
    itemsPerPage: 10,
    showPagination: true,
    showSearch: true,
    showExport: true
  }
};

// ========================================
// 🔧 CONFIGURAÇÕES TÉCNICAS
// ========================================

export const TECH_CONFIG = {
  // API
  api: {
    timeout: 30000, // 30 segundos
    retries: 3,
    retryDelay: 1000 // 1 segundo
  },
  
  // Cache
  cache: {
    enabled: true,
    duration: 5 * 60 * 1000, // 5 minutos
    prefix: "rotary_"
  },
  
  // Local Storage
  storage: {
    prefix: "rotary_",
    encrypt: true
  },
  
  // Logs
  logging: {
    enabled: true,
    level: "info", // debug, info, warn, error
    console: true,
    remote: false
  }
};

// ========================================
// 📊 CONFIGURAÇÕES DE RELATÓRIOS
// ========================================

export const REPORTS_CONFIG = {
  // Formatos de exportação
  export_formats: ["pdf", "excel", "csv"],
  
  // Períodos padrão
  periods: [
    { label: "Hoje", value: "today" },
    { label: "Última semana", value: "week" },
    { label: "Último mês", value: "month" },
    { label: "Último trimestre", value: "quarter" },
    { label: "Personalizado", value: "custom" }
  ],
  
  // Gráficos
  charts: {
    library: "recharts", // recharts, chart.js
    colors: ["#17458f", "#f7a81b", "#28a745", "#dc3545", "#ffc107"],
    animations: true
  }
};

// ========================================
// 🎫 CONFIGURAÇÕES DE CONVITES
// ========================================

export const CONVITES_CONFIG = {
  // Tipos
  tipos: {
    FISICO: {
      prefix: "F",
      range: [1, 500],
      description: "Convite físico tradicional"
    },
    DIGITAL: {
      prefix: "D", 
      range: [1, 500],
      description: "Convite digital via WhatsApp"
    },
    PATROCINIO: {
      prefix: "P",
      range: [1, 200],
      description: "Cortesia de patrocínio"
    }
  },
  
  // QR Code
  qr_code: {
    size: 200,
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 0.92,
    margin: 1
  },
  
  // Validação
  validation: {
    nome_min_length: 2,
    telefone_required: true,
    email_required: false,
    cpf_required: false
  }
};

// ========================================
// 🎲 CONFIGURAÇÕES DE SORTEIOS
// ========================================

export const SORTEIOS_CONFIG = {
  // Tipos de sorteio
  tipos: [
    { value: "automatico", label: "Automático" },
    { value: "manual", label: "Manual" },
    { value: "multi_premio", label: "Múltiplos Prêmios" }
  ],
  
  // Impressora térmica
  impressora: {
    enabled: false, // ⚠️ Configurar depois
    modelo: "EPSON_TM_T20",
    porta: "USB",
    papel_width: 58 // mm
  },
  
  // Regras
  regras: {
    min_participantes: 5,
    max_premios_por_pessoa: 1,
    permitir_organizadores: false
  }
};

// ========================================
// 📧 CONFIGURAÇÕES DE COMUNICAÇÃO
// ========================================

export const COMMUNICATION_CONFIG = {
  // Email
  email: {
    provider: "gmail", // gmail, outlook, custom
    from_name: "Rotary Club Itaquaquecetuba",
    from_email: "convites@rotaryitaqua.org.br", // ⚠️ CONFIGURAR
    reply_to: CONFIG.ADMIN_EMAIL
  },
  
  // WhatsApp
  whatsapp: {
    business_name: "Rotary Itaquaquecetuba",
    welcome_message: "Olá! Bem-vindo ao sistema de convites do Rotary Club Itaquaquecetuba! 🎪",
    support_number: "+5511999991234" // ⚠️ CONFIGURAR
  },
  
  // SMS
  sms: {
    enabled: false, // ⚠️ Configurar se necessário
    provider: "twilio",
    from_number: "+5511999991234"
  }
};

// ========================================
// 🚀 CONFIGURAÇÕES DE DEPLOY
// ========================================

export const DEPLOY_CONFIG = {
  // Ambiente
  environment: "production", // development, staging, production
  
  // Versionamento
  version: "1.0.0",
  build_date: new Date().toISOString(),
  
  // Features flags
  features: {
    sorteios: true,
    patrocinios: true,
    whatsapp: false, // ⚠️ Ativar após configurar
    impressora: false, // ⚠️ Ativar após configurar
    analytics: false,
    push_notifications: false
  },
  
  // Monitoramento
  monitoring: {
    error_tracking: false,
    performance_tracking: false,
    user_analytics: false
  }
};

// ========================================
// 📝 INSTRUÇÕES PARA ALESSANDRO
// ========================================

export const ADMIN_INSTRUCTIONS = {
  // Campos que Alessandro pode editar com segurança
  safe_to_edit: [
    "CONFIG.ADMIN_EMAIL",
    "CONFIG.PIX_KEY", 
    "CONFIG.PIX_TOKEN",
    "CONFIG.WHATSAPP_API",
    "CONFIG.MESSAGES",
    "CONFIG.COTAS_PATROCINIO",
    "COMMUNICATION_CONFIG.email.from_email",
    "COMMUNICATION_CONFIG.whatsapp.support_number",
    "DEPLOY_CONFIG.features"
  ],
  
  // Campos que NÃO devem ser alterados
  dangerous_fields: [
    "CONFIG.GOOGLE_SHEETS_API",
    "CONFIG.GOOGLE_SHEETS_ID",
    "SECURITY.*",
    "TECH_CONFIG.*"
  ],
  
  // Como fazer alterações
  how_to_update: [
    "1. Edite apenas os campos listados em 'safe_to_edit'",
    "2. Salve o arquivo (Ctrl+S)",
    "3. Faça commit no GitHub",
    "4. Aguarde deploy automático (2-3 min)",
    "5. Teste no sistema"
  ]
};

// ========================================
// 🔄 CONFIGURAÇÕES DEFAULT PARA NOVOS EVENTOS
// ========================================

export const EVENT_DEFAULTS = {
  permite_sorteio: true,
  permite_acompanhante: true,
  capacidade_default: 300,
  valor_meia_percent: 50, // 50% do valor inteira
  
  // Distribuição automática de quotas
  quota_distribution: {
    admin_bonus: 10, // Alessandro ganha 10 convites extras
    default_fisicos: 30,
    default_digitais: 30,
    auto_distribute: true
  }
};

// ========================================
// 💾 EXPORT DEFAULT
// ========================================

export default {
  CONFIG,
  SECURITY,
  URLS,
  UI_CONFIG,
  TECH_CONFIG,
  REPORTS_CONFIG,
  CONVITES_CONFIG,
  SORTEIOS_CONFIG,
  COMMUNICATION_CONFIG,
  DEPLOY_CONFIG,
  ADMIN_INSTRUCTIONS,
  EVENT_DEFAULTS
};

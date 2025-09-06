# 🎪 Sistema de Convites - Rotary Club Itaquaquecetuba

Sistema completo de gestão de convites para eventos, eliminando inadimplência e automatizando processos.

## 🚀 Quick Start

### 1. Clone o Repositório
```bash
git clone https://github.com/alessandro/rotary-convites.git
cd rotary-convites
npm install
```

### 2. Configure o arquivo settings.js
Edite `src/config/settings.js` com suas credenciais:

```javascript
GOOGLE_SHEETS_ID: "SEU_ID_AQUI",
GOOGLE_SHEETS_API: "https://script.google.com/macros/s/SEU_SCRIPT/exec",
WHATSAPP_API: "http://SEU_IP:8080",
PIX_KEY: "SEU_CNPJ_AQUI"
```

### 3. Execute Local
```bash
npm run dev
```
Acesse: http://localhost:3000

### 4. Deploy Vercel
```bash
npm run build
# Push para GitHub -> Deploy automático
```

## 📁 Estrutura do Projeto

```
📦 rotary-convites/
├── 📁 src/
│   ├── 📁 config/
│   │   └── settings.js         # ⚙️ ARQUIVO PRINCIPAL
│   ├── 📁 components/
│   │   └── common/
│   │       └── Button.jsx      # Componente base
│   ├── 📁 pages/
│   │   ├── Login.jsx          # Página de login
│   │   └── Dashboard.jsx      # Dashboard Alessandro
│   └── 📁 services/
│       └── auth.js            # Autenticação
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

## 🔐 Sistema de Login

### Alessandro (Admin)
- **Email**: `cvcalessandro@gmail.com`
- **Método**: Google OAuth
- **Acesso**: Dashboard completo

### Companheiros
- **Opção 1**: Login Google
- **Opção 2**: WhatsApp/SMS
- **Acesso**: App de vendas

## ⚙️ Configurações Principais

### Google Sheets API
1. Crie planilha no Google Sheets
2. Extensions → Apps Script
3. Cole código do backend
4. Deploy como Web App
5. Copie URL para `settings.js`

### WhatsApp Evolution API
```bash
docker run -d \
  --name evolution-rotary \
  -p 8080:8080 \
  evolution-api/evolution-api:latest
```

### Vercel Deploy
1. Conecte repositório GitHub
2. Configure auto-deploy
3. Adicione variáveis de ambiente
4. Deploy automático a cada push

## 🎫 Fluxo de Convites

### Físicos (F001-F500)
1. Alessandro distribui quotas
2. Companheiro registra venda
3. Sistema gera QR Code
4. Impressão de etiqueta QR

### Digitais (D001-D500)
1. Companheiro gera link
2. Cliente acessa e paga
3. QR Code via email/WhatsApp
4. Check-in automático

## 💰 Integrações de Pagamento

### PIX (Recomendado)
- Taxa: R$ 0,40 por transação
- Confirmação instantânea
- 99,60% valor líquido

### Cartão de Crédito
- Taxa: 3,99% + R$ 0,39
- Aprovação em segundos
- 95,62% valor líquido (R$ 100)

### Cartão de Débito
- Taxa: 2,99% + R$ 0,39
- Confirmação rápida
- 96,62% valor líquido (R$ 100)

## 📱 Apps e Interfaces

### Dashboard Alessandro
- Visão geral de eventos
- Gestão de companheiros
- Relatórios financeiros
- Scanner portaria

### App Companheiros
- Login simples
- Geração de links
- Acompanhamento de vendas
- Comissões

### Página Cliente
- Formulário simples
- Pagamento seguro
- QR Code automático
- Confirmação WhatsApp

## 🔧 Manutenção

### Atualizar Configurações
1. Edite `src/config/settings.js`
2. Commit no GitHub
3. Deploy automático (2-3 min)
4. Teste funcionamento

### Monitoramento
- Uptime: >99.5%
- Response time: <2s
- Error rate: <1%
- WhatsApp delivery: >95%

### Backup
- Google Sheets: automático
- Código: GitHub
- QR Codes: Google Drive

## 🎯 Roadmap

### Fase 1 ✅ (Atual)
- [x] Sistema de login
- [x] Dashboard básico
- [x] Estrutura modular
- [ ] Google Sheets integration
- [ ] WhatsApp integration

### Fase 2 (Próxima)
- [ ] Sistema de convites
- [ ] Pagamentos PIX
- [ ] App companheiros
- [ ] QR Codes

### Fase 3 (Futura)
- [ ] Relatórios avançados
- [ ] App portaria
- [ ] Notificações push
- [ ] Analytics

## 📞 Suporte

### Alessandro
- **Email**: cvcalessandro@gmail.com
- **Acesso**: Dashboard admin

### Desenvolvedor
- **Contato**: Via plataforma de desenvolvimento
- **Documentação**: Este README + código comentado

## 🤝 Contribuição

Este é um projeto **pro-bono** para o Rotary Club Itaquaquecetuba.

### Como contribuir:
1. Fork do repositório
2. Crie branch para feature
3. Teste localmente
4. Submeta pull request
5. Aguarde review

## 📄 Licença

MIT License - Uso livre para o Rotary Club Itaquaquecetuba

---

**"Servir é a renda que pagamos pelo espaço que ocupamos na Terra"** 🌟

*Sistema desenvolvido com ❤️ para o Rotary Club Itaquaquecetuba*

## 🔗 Links Úteis

- [Rotary Brand Center](https://brandcenter.rotary.org)
- [Google Apps Script](https://script.google.com)
- [Evolution API](https://evolution-api.com)
- [Vercel Deploy](https://vercel.com)
- [Next.js Docs](https://nextjs.org/docs)

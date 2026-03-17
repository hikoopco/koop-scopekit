import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');`;

const C = {
  bg: "#0d2b35", surf: "#112f3a", border: "#1e4d5e",
  lime: "#c8f135", text: "#f0f4f5", muted: "#8bb8c8",
  surfHover: "#163845"
};

const T = {
  ES: {
    badge: "● SCOPEKIT BY KOOP",
    hero: ["Cuéntanos tu proyecto.", "Te damos un precio real.", "3 minutos · Sin compromiso · Presupuesto en menos de 24h"],
    steps: ["Servicio", "Contexto", "Contacto"],
    next: "Continuar →", back: "← Volver", submit: "Solicitar presupuesto",
    new: "Nueva solicitud",
    step1Title: "¿Qué necesitas?", step1Sub: "Selecciona el servicio principal",
    step2Title: "Cuéntanos más",
    step3Title: "¿A quién le enviamos el presupuesto?",
    optLabel: "Descripción adicional (opcional)",
    optPlaceholder: "Cuéntanos más sobre tu proyecto...",
    retainerNote: "📌 Las suscripciones no tienen precio fijo — se acuerda directamente contigo.",
    fields: { name: "Nombre completo", email: "Email", phone: "Teléfono (con código de país)", company: "Empresa (opcional)" },
    consent: "Acepto compartir mis datos para recibir información sobre este presupuesto. Entiendo que Koop podrá contactarme por email o WhatsApp.",
    service: "Servicio", scope: "Alcance",
    confirmTitle: "¡Solicitud enviada!", confirmSub: "Revisaremos tu proyecto y te contactaremos en menos de 24h.",
    contact: "Tus datos",
    errService: "Selecciona un servicio", errScope: "Selecciona al menos una opción",
    errName: "Nombre obligatorio", errEmail: "Email válido obligatorio",
    errPhone: "El teléfono debe empezar por +", errConsent: "Debes aceptar para continuar",
    sending: "Enviando...", footer: "POWERED BY KOOP · SCOPEKIT",
    obTitle: "Antes de empezar", obSub: "Te llevará 45seg rellenar este presupuesto",
    obRegionQ: "¿Desde dónde nos contactas?", obLangQ: "¿En qué idioma prefieres continuar?",
    obStart: "Empezar →",
    regions: { EUR: "🇪🇺 Europa / EUR", USD: "🌎 América / USD" },
    langs: { ES: "🇪🇸 Español", EN: "🇺🇸 English" },
    svcSubs: { seo:"Análisis y posicionamiento", copy:"Web, blog y contenido", ai:"Chatbot conversacional", auto:"Flujos automatizados", saas:"Desarrollo de producto", sub:"Licencia mensual Koop", consult:"Estrategia digital completa" }
  },
  EN: {
    badge: "● SCOPEKIT BY KOOP",
    hero: ["Tell us about your project.", "We give you a real price.", "3 minutes · No commitment · Quote in less than 24h"],
    steps: ["Service", "Context", "Contact"],
    next: "Continue →", back: "← Back", submit: "Request quote",
    new: "New request",
    step1Title: "What do you need?", step1Sub: "Select the main service",
    step2Title: "Tell us more",
    step3Title: "Who should we send the quote to?",
    optLabel: "Additional description (optional)",
    optPlaceholder: "Tell us more about your project...",
    retainerNote: "📌 Subscriptions have no fixed price — agreed directly with you.",
    fields: { name: "Full name", email: "Email", phone: "Phone (with country code)", company: "Company (optional)" },
    consent: "I agree to share my data to receive information about this quote. I understand that Koop may contact me by email or WhatsApp.",
    service: "Service", scope: "Scope",
    confirmTitle: "Request sent!", confirmSub: "We'll review your project and contact you within 24h.",
    contact: "Your details",
    errService: "Select a service", errScope: "Select at least one option",
    errName: "Name required", errEmail: "Valid email required",
    errPhone: "Phone must start with +", errConsent: "You must accept to continue",
    sending: "Sending...", footer: "POWERED BY KOOP · SCOPEKIT",
    obTitle: "Before we start", obSub: "It'll take you 45sec to fill this in",
    obRegionQ: "Where are you contacting us from?", obLangQ: "What language do you prefer?",
    obStart: "Let's go →",
    regions: { EUR: "🇪🇺 Europe / EUR", USD: "🌎 Americas / USD" },
    langs: { ES: "🇪🇸 Español", EN: "🇺🇸 English" },
    svcSubs: { seo:"Analysis & positioning", copy:"Web, blog & content", ai:"Conversational chatbot", auto:"Automated flows", saas:"Product development", sub:"Koop monthly license", consult:"Full digital strategy" }
  }
};

const SERVICES = [
  { id:"seo",     icon:"🔍", ES:"Auditoría SEO",    EN:"SEO Audit" },
  { id:"copy",    icon:"✍️", ES:"Copywriting",       EN:"Copywriting" },
  { id:"ai",      icon:"🤖", ES:"Agente IA",         EN:"AI Agent" },
  { id:"auto",    icon:"⚡", ES:"Automatizaciones",  EN:"Automations" },
  { id:"saas",    icon:"🚀", ES:"Producto SaaS",     EN:"SaaS Product" },
  { id:"sub",     icon:"🔄", ES:"Suscripción SaaS",  EN:"SaaS Subscription" },
  { id:"consult", icon:"🧠", ES:"Consultoría 360",   EN:"360 Consulting" },
];

const SCOPE_OPTIONS = {
  seo:     { ES:["Auditoría técnica","Estrategia de contenidos","Link building","SEO local","Todo lo anterior"],          EN:["Technical audit","Content strategy","Link building","Local SEO","All of the above"] },
  copy:    { ES:["Web completa","Landing page","Blog/artículos","Email marketing","Redes sociales"],                       EN:["Full website","Landing page","Blog/articles","Email marketing","Social media"] },
  ai:      { ES:["Web/chat","WhatsApp","Atención al cliente","Ventas","Interno (equipo)"],                                 EN:["Web/chat","WhatsApp","Customer service","Sales","Internal (team)"] },
  auto:    { ES:["CRM y leads","Emails y notificaciones","Reportes","Procesos internos","Integraciones"],                  EN:["CRM & leads","Emails & notifications","Reports","Internal processes","Integrations"] },
  saas:    { ES:["Portal de cliente","CRM sectorial","Dashboard","Formulario inteligente","Otro MVP"],                    EN:["Client portal","Sector CRM","Dashboard","Smart form","Other MVP"] },
  sub:     { ES:["StaffDesk","MediDesk","StockFlow","Portal seguimiento","Formulario presupuesto"],                       EN:["StaffDesk","MediDesk","StockFlow","Tracking portal","Quote form"] },
  consult: { ES:["Empezando desde cero","Quiero escalar","Necesito digitalizar","Tengo un proyecto","No sé por dónde empezar"], EN:["Starting from scratch","I want to scale","I need to digitize","I have a project","I don't know where to start"] },
};

const PRICES = {
  EUR: { seo:[197,1500], copy:[80,400], ai:[600,2500], auto:[400,4000], saas:[3000,10000], sub:[50,500], consult:[800,5000] },
  USD: { seo:[100,750],  copy:[40,200], ai:[300,1250], auto:[200,2000], saas:[1500,5000],  sub:[25,250], consult:[400,2500] },
};

function Chip({ children }) {
  return <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,background:"rgba(200,241,53,.12)",color:C.lime,border:"1px solid rgba(200,241,53,.3)",borderRadius:20,padding:"4px 12px"}}>{children}</span>;
}

function ProgressBar({ step, steps }) {
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:0,marginBottom:24}}>
      {steps.map((s,i) => {
        const active=i+1===step, done=i+1<step;
        return (
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,position:"relative"}}>
            {i<steps.length-1 && <div style={{position:"absolute",top:13,left:"50%",width:"100%",height:2,background:done?C.lime:C.border,zIndex:0}}/>}
            <div style={{width:26,height:26,borderRadius:"50%",background:done||active?C.lime:C.surf,border:`2px solid ${done||active?C.lime:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1,fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:600,color:done||active?C.bg:C.muted}}>
              {done?"✓":i+1}
            </div>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:active?C.lime:done?C.text:C.muted,letterSpacing:1}}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

function Onboarding({ onDone }) {
  const [lang, setLang] = useState("ES");
  const [region, setRegion] = useState(null);
  const t = T[lang];
  const canStart = !!region;

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Syne',sans-serif",color:C.text,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:40}}>
        <div style={{width:44,height:44,background:C.surf,border:`1px solid ${C.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:C.lime,fontSize:22}}>K</div>
        <div>
          <div style={{fontWeight:800,fontSize:17,letterSpacing:2}}>KOOP</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,letterSpacing:2}}>SCOPEKIT</div>
        </div>
      </div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.lime,letterSpacing:3,marginBottom:12}}>{t.badge}</div>
      <h1 style={{margin:"0 0 8px",fontSize:"clamp(20px,5vw,28px)",fontWeight:800,textAlign:"center"}}>{t.obTitle}</h1>
      <p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,margin:"0 0 40px",textAlign:"center"}}>{t.obSub}</p>
      <div style={{width:"100%",maxWidth:480,display:"flex",flexDirection:"column",gap:28}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:2,marginBottom:12}}>{T[lang].obLangQ}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {["ES","EN"].map(l => {
              const sel = lang===l;
              return (
                <button key={l} onClick={()=>setLang(l)} style={{padding:"16px",borderRadius:10,border:`1.5px solid ${sel?C.lime:C.border}`,background:sel?"rgba(200,241,53,.08)":C.surf,color:sel?C.lime:C.text,fontFamily:"'Syne',sans-serif",fontWeight:sel?700:400,fontSize:14,cursor:"pointer",transition:"all .15s",textAlign:"center"}}>
                  {T[l].langs[l]}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:2,marginBottom:12}}>{t.obRegionQ}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {["EUR","USD"].map(r => {
              const sel = region===r;
              return (
                <button key={r} onClick={()=>setRegion(r)} style={{padding:"16px",borderRadius:10,border:`1.5px solid ${sel?C.lime:C.border}`,background:sel?"rgba(200,241,53,.08)":C.surf,color:sel?C.lime:C.text,fontFamily:"'Syne',sans-serif",fontWeight:sel?700:400,fontSize:14,cursor:"pointer",transition:"all .15s",textAlign:"center"}}>
                  {t.regions[r]}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={()=>canStart&&onDone(lang,region)} style={{marginTop:8,padding:"14px",borderRadius:10,border:"none",background:canStart?C.lime:"#1e4d5e",color:canStart?C.bg:C.muted,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,cursor:canStart?"pointer":"not-allowed",transition:"all .2s"}}>
          {t.obStart}
        </button>
      </div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.border,marginTop:48,letterSpacing:2}}>{t.footer}</div>
    </div>
  );
}

function ScopeForm({ lang: initLang, region: initRegion }) {
  const [lang]   = useState(initLang);
  const [region] = useState(initRegion);
  const [step, setStep]       = useState(1);
  const [service, setService] = useState(null);
  const [scope, setScope]     = useState([]);
  const [desc, setDesc]       = useState("");
  const [form, setForm]       = useState({name:"",email:"",phone:"",company:""});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors]   = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone]       = useState(false);

  const t = T[lang];
  const selSvc = SERVICES.find(s => s.id === service);

  const validate = (s) => {
    if (s===1) { if (!service) { setErrors({service:t.errService}); return false; } }
    if (s===2) { if (!scope.length) { setErrors({scope:t.errScope}); return false; } }
    if (s===3) {
      const e={};
      if (!form.name.trim()) e.name=t.errName;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email=t.errEmail;
      if (!form.phone.trim().startsWith("+")) e.phone=t.errPhone;
      if (!consent) e.consent=t.errConsent;
      if (Object.keys(e).length) { setErrors(e); return false; }
    }
    return true;
  };

  const next = () => { if (validate(step)) { setErrors({}); setStep(s=>s+1); }};
  const back = () => { setErrors({}); setStep(s=>s-1); };

  const handleSubmit = async () => {
    if (!validate(3)) return;
    setSending(true);
    const p = PRICES[region][service];
    const payload = {
      nombre:form.name, email:form.email, telefono:form.phone, empresa:form.company,
      servicio:selSvc?.[lang]||service, alcance:scope.join(", "), descripcion:desc,
      estimacion_minima:p[0], estimacion_maxima:p[1],
      moneda:region, idioma:lang, region, fecha:new Date().toISOString()
    };
    try { await fetch("https://hook.eu1.make.com/3kvwjbxb59ljwk6orrsmkjozjeopydbd",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); } catch(_){}
    setSending(false); setDone(true);
  };

  const reset = () => { setStep(1);setService(null);setScope([]);setDesc("");setForm({name:"",email:"",phone:"",company:""});setConsent(false);setErrors({});setDone(false); };

  if (done) return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Syne',sans-serif",color:C.text,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{maxWidth:520,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:56,marginBottom:16}}>✅</div>
        <h2 style={{fontSize:26,fontWeight:800,margin:"0 0 8px"}}>{t.confirmTitle}</h2>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,marginBottom:28}}>{t.confirmSub}</p>
        <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",textAlign:"left",marginBottom:16}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,letterSpacing:2,marginBottom:10}}>{t.service} / {t.scope}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
            {selSvc && <Chip>{selSvc[lang]}</Chip>}
            {scope.map(s=><Chip key={s}>{s}</Chip>)}
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,letterSpacing:2,marginBottom:8}}>{t.contact}</div>
          {[form.name,form.email,form.phone,form.company].filter(Boolean).map((v,i)=>(
            <div key={i} style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.text,marginBottom:3}}>{v}</div>
          ))}
        </div>
        {(() => { const p=PRICES[region][service]; const sym=region==="EUR"?"€":"$"; const isS=service==="sub";
          return (
            <div style={{background:"rgba(200,241,53,.06)",border:`1px solid rgba(200,241,53,.25)`,borderRadius:12,padding:"18px 20px",marginBottom:20,textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,letterSpacing:2,marginBottom:6}}>{lang==="ES"?"ESTIMACIÓN ORIENTATIVA":"ESTIMATED RANGE"}</div>
              <div style={{fontSize:26,fontWeight:800,color:C.lime,marginBottom:4}}>
                {sym}{p[0].toLocaleString()} — {sym}{p[1].toLocaleString()}{isS?<span style={{fontSize:14,fontWeight:400}}>/mes</span>:null}
              </div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,lineHeight:1.6}}>
                {lang==="ES"
                  ? "Este rango es orientativo. El precio final se definirá en la llamada según el alcance exacto de tu proyecto."
                  : "This range is indicative. The final price will be defined on the call based on the exact scope of your project."}
              </div>
            </div>
          );
        })()}
        <button onClick={reset} style={{padding:"12px 28px",borderRadius:8,border:`1px solid ${C.border}`,background:C.surfHover,color:C.text,fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer"}}>{t.new}</button>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.border,marginTop:32,letterSpacing:2}}>{t.footer}</div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Syne',sans-serif",color:C.text,paddingBottom:48}}>
      <div style={{background:C.surf,borderBottom:`1px solid ${C.border}`,padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:C.lime,fontSize:17}}>K</div>
          <div>
            <div style={{fontWeight:800,fontSize:14,letterSpacing:2}}>KOOP</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted,letterSpacing:2}}>SCOPEKIT</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,padding:"4px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:4}}>{region==="EUR"?"🇪🇺 EUR":"🌎 USD"}</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,padding:"4px 10px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:4}}>{lang==="ES"?"🇪🇸 ES":"🇺🇸 EN"}</span>
        </div>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",padding:"0 16px"}}>
        <div style={{textAlign:"center",padding:"32px 0 20px"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.lime,letterSpacing:3,marginBottom:14}}>{t.badge}</div>
          <h1 style={{margin:"0 0 8px",fontSize:"clamp(20px,5vw,30px)",fontWeight:800,lineHeight:1.2}}>
            {t.hero[0]} <span style={{color:C.lime}}>{t.hero[1]}</span>
          </h1>
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,margin:0}}>{t.hero[2]}</p>
        </div>
        <ProgressBar step={step} steps={t.steps} />
        <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"24px 22px"}}>
          {step===1 && <Step1 t={t} lang={lang} service={service} setService={s=>{setService(s);setScope([]);setErrors({});}} errors={errors}/>}
          {step===2 && <Step2 t={t} lang={lang} service={service} scope={scope} setScope={setScope} desc={desc} setDesc={setDesc} errors={errors}/>}
          {step===3 && <Step3 t={t} selSvc={selSvc} lang={lang} scope={scope} form={form} setForm={setForm} consent={consent} setConsent={setConsent} errors={errors}/>}
        </div>
        <div style={{display:"flex",gap:10,marginTop:14,justifyContent:step>1?"space-between":"flex-end"}}>
          {step>1 && <button onClick={back} style={{padding:"12px 22px",borderRadius:8,border:`1px solid ${C.border}`,background:C.surfHover,color:C.text,fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14,cursor:"pointer"}}>{t.back}</button>}
          {step<3
            ? <button onClick={next} style={{padding:"12px 28px",borderRadius:8,border:"none",background:C.lime,color:C.bg,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>{t.next}</button>
            : <button onClick={handleSubmit} disabled={sending} style={{padding:"12px 28px",borderRadius:8,border:"none",background:C.lime,color:C.bg,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",opacity:sending?.7:1}}>{sending?t.sending:t.submit}</button>
          }
        </div>
        <div style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:10,color:C.border,marginTop:36,letterSpacing:2}}>{t.footer}</div>
      </div>
    </div>
  );
}

function Step1({ t, lang, service, setService, errors }) {
  return (
    <div>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700}}>{t.step1Title}</h2>
      <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,margin:"0 0 18px"}}>{t.step1Sub}</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {SERVICES.map(s => {
          const sel = service===s.id;
          const sub = t.svcSubs[s.id];
          return (
            <button key={s.id} onClick={()=>setService(s.id)} style={{padding:"14px 14px",borderRadius:10,border:`1.5px solid ${sel?C.lime:C.border}`,background:sel?"rgba(200,241,53,.08)":C.bg,color:C.text,fontFamily:"'Syne',sans-serif",fontWeight:400,fontSize:13,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,transition:"all .15s"}}>
              <span style={{fontSize:22,minWidth:28}}>{s.icon}</span>
              <div>
                <div style={{fontWeight:sel?700:500,color:sel?C.lime:C.text,fontSize:13}}>{s[lang]}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,marginTop:2}}>{sub}</div>
              </div>
            </button>
          );
        })}
      </div>
      {errors.service && <p style={{color:"#ff6b6b",fontFamily:"'DM Mono',monospace",fontSize:11,marginTop:8}}>{errors.service}</p>}
    </div>
  );
}

function Step2({ t, lang, service, scope, setScope, desc, setDesc, errors }) {
  const opts = SCOPE_OPTIONS[service]?.[lang]||[];
  const toggle = opt => setScope(p => p.includes(opt)?p.filter(o=>o!==opt):[...p,opt]);
  return (
    <div>
      <h2 style={{margin:"0 0 18px",fontSize:18,fontWeight:700}}>{t.step2Title}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {opts.map(opt => {
          const sel=scope.includes(opt);
          return (
            <button key={opt} onClick={()=>toggle(opt)} style={{padding:"13px 16px",borderRadius:8,border:`1.5px solid ${sel?C.lime:C.border}`,background:sel?C.lime:C.bg,color:sel?C.bg:C.text,fontFamily:"'Syne',sans-serif",fontWeight:sel?700:400,fontSize:13,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .15s"}}>
              <span>{opt}</span>
              {sel && <span style={{fontWeight:700}}>✓</span>}
            </button>
          );
        })}
      </div>
      {errors.scope && <p style={{color:"#ff6b6b",fontFamily:"'DM Mono',monospace",fontSize:11,marginTop:8}}>{errors.scope}</p>}
      {service==="sub" && <div style={{marginTop:14,padding:"10px 14px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted}}>{t.retainerNote}</div>}
      <div style={{marginTop:16}}>
        <label style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,display:"block",marginBottom:6,letterSpacing:1}}>{t.optLabel}</label>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder={t.optPlaceholder} rows={3} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",color:C.text,fontFamily:"'DM Mono',monospace",fontSize:12,resize:"vertical",boxSizing:"border-box",outline:"none"}}/>
      </div>
    </div>
  );
}

function Step3({ t, selSvc, lang, scope, form, setForm, consent, setConsent, errors }) {
  const inp = (field, label, ph, req=true) => (
    <div key={field} style={{marginBottom:14}}>
      <label style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,display:"block",marginBottom:5,letterSpacing:1}}>{label}{req&&<span style={{color:C.lime}}> *</span>}</label>
      <input value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} placeholder={ph} style={{width:"100%",background:C.bg,border:`1px solid ${errors[field]?"#ff6b6b":C.border}`,borderRadius:8,padding:"10px 12px",color:C.text,fontFamily:"'Syne',sans-serif",fontSize:13,boxSizing:"border-box",outline:"none"}}/>
      {errors[field] && <p style={{color:"#ff6b6b",fontFamily:"'DM Mono',monospace",fontSize:10,margin:"4px 0 0"}}>{errors[field]}</p>}
    </div>
  );
  return (
    <div>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700}}>{t.step3Title}</h2>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {selSvc && <Chip>{selSvc[lang]}</Chip>}
        {scope.map(s=><Chip key={s}>{s}</Chip>)}
      </div>
      {inp("name",t.fields.name,"Ana García")}
      {inp("email",t.fields.email,"ana@empresa.com")}
      {inp("phone",t.fields.phone,"+34 600 000 000")}
      {inp("company",t.fields.company,"Mi Empresa S.L.",false)}
      <div style={{marginTop:6,display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer"}} onClick={()=>setConsent(c=>!c)}>
        <div style={{width:20,height:20,minWidth:20,borderRadius:4,border:`1.5px solid ${consent?C.lime:errors.consent?"#ff6b6b":C.border}`,background:consent?C.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>
          {consent && <span style={{color:C.bg,fontSize:13,fontWeight:800}}>✓</span>}
        </div>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,margin:0,lineHeight:1.5}}>{t.consent}</p>
      </div>
      {errors.consent && <p style={{color:"#ff6b6b",fontFamily:"'DM Mono',monospace",fontSize:10,margin:"6px 0 0"}}>{errors.consent}</p>}
    </div>
  );
}

export default function App() {
  const [config, setConfig] = useState(null);
  return (
    <>
      <style>{FONTS}</style>
      {!config
        ? <Onboarding onDone={(lang, region) => setConfig({lang, region})} />
        : <ScopeForm lang={config.lang} region={config.region} />
      }
    </>
  );
}

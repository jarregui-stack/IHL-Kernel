import { useState, useRef } from "react";

const SOURCES = {
  ICTY: { label: "ICTY", full: "Intl Criminal Tribunal for the former Yugoslavia", color: "#2563EB", bg: "rgba(37,99,235,0.08)", ul: "rgba(37,99,235,0.4)" },
  ICTR: { label: "ICTR", full: "Intl Criminal Tribunal for Rwanda", color: "#DC2626", bg: "rgba(220,38,38,0.08)", ul: "rgba(220,38,38,0.4)" },
  ICC: { label: "ICC", full: "International Criminal Court", color: "#059669", bg: "rgba(5,150,105,0.08)", ul: "rgba(5,150,105,0.4)" },
  ICJ: { label: "ICJ", full: "International Court of Justice", color: "#7C3AED", bg: "rgba(124,58,237,0.08)", ul: "rgba(124,58,237,0.4)" },
  CIHL: { label: "ICRC CIHL", full: "ICRC Customary Intl Humanitarian Law Rules", color: "#D97706", bg: "rgba(217,119,6,0.08)", ul: "rgba(217,119,6,0.4)" },
  COMMENTARY: { label: "ICRC Commentary", full: "ICRC Commentary on the Geneva Conventions", color: "#0891B2", bg: "rgba(8,145,178,0.08)", ul: "rgba(8,145,178,0.4)" },
  DOCTRINE: { label: "Doctrine", full: "Academic Doctrine and Scholarly Works", color: "#92400E", bg: "rgba(146,64,14,0.08)", ul: "rgba(146,64,14,0.4)" },
  OTHER: { label: "Other Tribunals", full: "Other International Tribunals", color: "#BE185D", bg: "rgba(190,24,93,0.08)", ul: "rgba(190,24,93,0.4)" },
};

const DATA = [
  { id:"chapeau", title:"Article 3 \u2014 Chapeau (Scope of Application)",
    treaty:"In the case of armed conflict not of an international character occurring in the territory of one of the High Contracting Parties, each Party to the conflict shall be bound to apply, as a minimum, the following provisions:",
    ps:[
      {s:"ICTY",t:"The application of CA3 turns on two cumulative and objective criteria: (i) a minimum level of intensity of hostilities; and (ii) a minimum degree of organisation of the non-governmental party or parties.",f:"ICTY, Tadi\u0107, AC, IT-94-1-AR72, 2 Oct. 1995, \u00b6 70"},
      {s:"ICTY",t:"(i) Intensity. The threshold is met when hostilities are of a collective character or when the government is obliged to use military force instead of mere police forces. Situations of banditry, unorganised insurrections, or terrorist activities do not suffice.",f:"ICTY, Tadi\u0107, \u00b6 70; ICRC Commentary GC I (2016), \u00b6 431"},
      {s:"COMMENTARY",t:"The 2016 ICRC Commentary treats the ICTY\u2019s \u2018protracted armed violence\u2019 standard as widely accepted, placing the minimum threshold where formerly \u2018sporadic violence\u2019 is reclassified as armed conflict. A single, isolated use of force is extremely unlikely to satisfy this criterion.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 423\u2013432; GC III (2020), \u00b6\u00b6 310\u2013311"},
      {s:"ICTY",t:"(ii) Organisation. Non-governmental groups must possess organised armed forces \u2014 a command structure, the capacity to sustain military operations, and the ability to implement IHL. Indicative factors include: hierarchical command, internal discipline, logistical capacity, and ability to speak with one voice.",f:"ICTY, Tadi\u0107, \u00b6 70; Bo\u0161koski, TC II, \u00b6 175; Haradinaj et al., TC I, \u00b6 60"},
      {s:"ICC",t:"The ICC in Bemba endorsed the same two-pronged test and held that the organisation criteria are not individually determinative but assessed holistically.",f:"ICC, Bemba, TC III, ICC-01/05-01/08-3343, 21 Mar. 2016, \u00b6\u00b6 131\u2013137"},
      {s:"COMMENTARY",t:"Classification is objective and does not depend on the legal status of the parties or on recognition by the State.",f:"ICRC Commentary GC I (2016), \u00b6 395"},
      {s:"ICTY",t:"IHL applies to the entire territory under the control of the parties, not only to the immediate theatre of operations.",f:"ICTY, Tadi\u0107, TC I, IT-94-1-T, 7 May 1997, \u00b6 565"},
    ],
    sub:{title:"Art. 3A. Coalitions and Third-Party Support (2025)",ps:[
      {s:"COMMENTARY",t:"Where multiple organised armed groups act in coalition, the intensity of violence may be assessed in aggregated fashion, provided the groups maintain a sufficient level of coordination.",f:"ICRC Commentary GC IV (2025), \u00b6 505"},
      {s:"COMMENTARY",t:"A third party becomes itself a party to a pre-existing NIAC only if its activities make a \u2018direct and effective contribution\u2019 to the hostilities \u2014 meaning it is pooling military resources or coordinating actions to fight a common enemy.",f:"ICRC Commentary GC IV (2025), \u00b6 519; ICRC Opinion Paper (2024), p. 16"},
      {s:"COMMENTARY",t:"Private companies may constitute a Party to a NIAC if they satisfy the same organisational criteria applicable to other armed groups.",f:"ICRC Commentary GC IV (2025), \u00b6 525"},
    ]}},
  { id:"art3-1", title:"Article 3(1) \u2014 Persons Protected",
    treaty:"(1) Persons taking no active part in the hostilities, including members of armed forces who have laid down their arms and those placed hors de combat by sickness, wounds, detention, or any other cause, shall in all circumstances be treated humanely, without any adverse distinction founded on race, colour, religion or faith, sex, birth or wealth, or any other similar criteria.",
    ps:[
      {s:"COMMENTARY",t:"\u2018Persons taking no active part in the hostilities\u2019 encompasses: (a) civilians not directly participating in hostilities; (b) members of armed forces who have laid down their arms; and (c) persons placed hors de combat.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 537\u2013541"},
      {s:"ICC",t:"CA3 protects persons on all sides \u2014 including members of a party\u2019s own armed forces when they are hors de combat.",f:"ICC, Ntaganda, AC, ICC-01/04-02/06, 30 Mar. 2021, \u00b6\u00b6 46\u201352"},
      {s:"COMMENTARY",t:"Protection under CA3 extends to all persons taking no active part in hostilities, regardless of their party affiliation.",f:"ICRC Commentary GC I (2016), \u00b6 547"},
      {s:"ICTY",t:"The standard of humane treatment is absolute and non-derogable, applying at all times throughout the territory affected by the conflict.",f:"ICTY, Tadi\u0107, AC, \u00b6 70"},
      {s:"COMMENTARY",t:"\u2018Without any adverse distinction\u2019 \u2014 the list of prohibited grounds is non-exhaustive; the 2025 Commentary revision confirms it includes sexual orientation and gender identity.",f:"ICRC Commentary GC IV (2025), CA3 section"},
    ]},
  { id:"art3-1a", title:"Article 3(1)(a) \u2014 Violence to Life and Person",
    treaty:"(a) Violence to life and person, in particular murder of all kinds, mutilation, cruel treatment and torture;",
    ps:[
      {s:"ICTR",t:"This prohibition is absolute and non-derogable. It encompasses wilful killing, mutilation, corporal punishment, and any form of physical or mental coercion constituting cruel treatment or torture.",f:"ICTR, Akayesu, TC I, ICTR-96-4-T, 2 Sep. 1998, \u00b6 629"},
      {s:"ICTY",t:"Torture requires: (i) severe pain or suffering, physical or mental; (ii) a specific purpose (e.g., extracting information, intimidation, discrimination). Cruel treatment covers acts causing serious suffering below the torture threshold.",f:"ICTY, \u010celebi\u0107i, \u00b6 442; Kunarac et al., AC, \u00b6\u00b6 142\u2013148"},
      {s:"COMMENTARY",t:"The 2016 Commentary affirms that sexual violence is prohibited under this provision, as it can amount to violence to life and person, torture, or cruel treatment.",f:"ICRC Commentary GC I (2016), \u00b6 637; ICTR, Akayesu, \u00b6\u00b6 688\u2013697"},
    ],
    sub:{title:"Customary Extension (IAC and NIAC)",ps:[
      {s:"CIHL",t:"ICRC CIHL Rule 87: Humane treatment. Rule 90: Torture, cruel treatment, and outrages upon personal dignity prohibited. Rule 91: Corporal punishment prohibited. Rule 92: Mutilation prohibited.",f:"ICRC CIHL, Rules 87, 90, 91, 92"},
    ]}},
  { id:"art3-1b", title:"Article 3(1)(b) \u2014 Hostage-taking",
    treaty:"(b) Taking of hostages;",
    ps:[
      {s:"ICTY",t:"Hostage-taking is the seizure or detention of a person accompanied by a threat to kill, injure, or continue detention as a condition for fulfilling a demand on a third party. The prohibition is absolute.",f:"ICTY, Bla\u0161ki\u0107, TC, IT-95-14-T, 3 Mar. 2000, \u00b6 158"},
      {s:"ICTY",t:"The ICTY confirmed the prohibition on hostage-taking constitutes customary international law applicable in NIACs.",f:"ICTY, Bla\u0161ki\u0107, \u00b6 158; Tadi\u0107, TC, \u00b6 616"},
    ],
    sub:{title:"Customary Extension",ps:[
      {s:"CIHL",t:"ICRC CIHL Rule 96 (IAC and NIAC): The taking of hostages is prohibited.",f:"ICRC CIHL, Rule 96"},
    ]}},
  { id:"art3-1c", title:"Article 3(1)(c) \u2014 Outrages upon Personal Dignity",
    treaty:"(c) Outrages upon personal dignity, in particular humiliating and degrading treatment;",
    ps:[
      {s:"COMMENTARY",t:"This is interpreted broadly to cover any act that seriously injures human dignity. Elements: (i) act sufficiently serious; (ii) intentional; (iii) targeted at the victim\u2019s dignity.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 657\u2013667"},
      {s:"ICC",t:"Includes: sexual violence, mutilation of corpses, using persons as human shields, and forcing persons to perform degrading acts. The ICC confirmed in Katanga that mutilation of corpses constitutes an outrage upon personal dignity.",f:"ICC, Katanga, \u00b6\u00b6 996\u20131002"},
    ],
    sub:{title:"Customary Extension",ps:[
      {s:"CIHL",t:"ICRC CIHL Rule 90 (IAC and NIAC): Torture, cruel or inhuman treatment, and outrages upon personal dignity are prohibited.",f:"ICRC CIHL, Rule 90"},
    ]}},
  { id:"art3-1d", title:"Article 3(1)(d) \u2014 Judicial Guarantees",
    treaty:"(d) The passing of sentences and the carrying out of executions without previous judgment pronounced by a regularly constituted court, affording all the judicial guarantees which are recognised as indispensable by civilised peoples.",
    ps:[
      {s:"COMMENTARY",t:"A \u2018regularly constituted court\u2019 means one established in accordance with pre-existing laws and procedures. Ad hoc or summary tribunals do not suffice.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 680\u2013687; GC III (2020), \u00b6\u00b6 740\u2013750"},
      {s:"COMMENTARY",t:"The indispensable judicial guarantees include at a minimum: presumption of innocence; right to be informed of charges; adequate time and means for defence; right to be tried in presence; right to legal representation; right against self-incrimination; right of appeal. This list is non-exhaustive.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 693\u2013718; GC III (2020), \u00b6\u00b6 754\u2013800"},
      {s:"CIHL",t:"The prohibition on ex post facto laws applies: no conviction for conduct not criminal under applicable law at the time of commission.",f:"ICRC CIHL, Rule 101; ICRC Commentary GC I (2016), \u00b6 718"},
    ],
    sub:{title:"Customary Extension",ps:[
      {s:"CIHL",t:"ICRC CIHL Rule 100: Fair trial guarantees. Rule 101: No ex post facto laws. Rule 103: Collective punishments prohibited. All IAC and NIAC.",f:"ICRC CIHL, Rules 100, 101, 103"},
    ]}},
  { id:"art3-2", title:"Article 3(2) \u2014 Wounded and Sick; ICRC Right of Initiative",
    treaty:"(2) The wounded and sick shall be collected and cared for.",
    ps:[
      {s:"COMMENTARY",t:"This obligation applies to all wounded and sick persons of any party. The obligation to collect is active: parties must search after each engagement and protect against pillage.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 721\u2013737"},
      {s:"CIHL",t:"Medical personnel, units, and transports assigned exclusively to medical functions must be respected and protected.",f:"ICRC CIHL, Rules 25, 28, 29"},
    ],
    sub:{title:"Customary Extension",ps:[
      {s:"CIHL",t:"ICRC CIHL Rule 109: Search, collect, and evacuate without adverse distinction. Rule 110: Medical care to the fullest extent practicable; no distinction other than medical grounds. Both IAC and NIAC.",f:"ICRC CIHL, Rules 109, 110"},
    ]},
    extraTreaty:"An impartial humanitarian body, such as the International Committee of the Red Cross, may offer its services to the Parties to the conflict.",
    extraPs:[
      {s:"COMMENTARY",t:"The ICRC\u2019s right to offer its services is treaty-based. Rejection of an offer does not per se violate CA3, but parties are expected to give serious consideration to any offer made in good faith.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 833\u2013840"},
      {s:"COMMENTARY",t:"The ICRC also has a broader right of humanitarian initiative under its Statutes in situations below the NIAC threshold.",f:"ICRC, Position Paper, 2021, p. 6"},
    ]},
  { id:"art3-3", title:"Article 3(3) \u2014 Special Agreements",
    treaty:"(3) The Parties to the conflict should further endeavour to bring into force, by means of special agreements, all or part of the other provisions of the present Convention.",
    ps:[
      {s:"COMMENTARY",t:"This encourages \u2014 but does not require \u2014 parties to extend the full Convention regime by agreement. Such agreements have been concluded in practice (e.g., Bosnia 1992). They do not confer belligerent recognition.",f:"ICRC Commentary GC III (2020), \u00b6\u00b6 850\u2013858"},
    ]},
  { id:"art3-4", title:"Article 3(4) \u2014 Legal Status of the Parties",
    treaty:"(4) The application of the preceding provisions shall not affect the legal status of the Parties to the conflict.",
    ps:[
      {s:"COMMENTARY",t:"Application of CA3 does not constitute recognition of the non-governmental party as a belligerent, nor does it prejudice the right of the State to prosecute members of armed groups under domestic law.",f:"ICRC Commentary GC I (2016), \u00b6\u00b6 855\u2013860"},
      {s:"DOCTRINE",t:"There is no combatant immunity in NIAC: members of non-state armed groups may be prosecuted even for acts lawful under IHL.",f:"Sass\u00f2li, IHL, Edward Elgar, 2019, p. 198; Dinstein, Conduct of Hostilities, 3rd ed., CUP, 2016, p. 31"},
    ]},
  { id:"customary", title:"General Customary Extension (ICRC CIHL Rules 87\u2013105)",
    treaty:null,
    intro:"The ICRC Customary IHL Study identifies the following rules as applicable in NIACs, extending CA3 protections even where no treaty specifically requires them:",
    ps:[
      {s:"CIHL",t:"Rule 87 \u2014 Humane treatment. Rule 88 \u2014 Non-adverse distinction. Rule 89 \u2014 Violence to life prohibited. Rule 90 \u2014 Torture and cruel treatment prohibited. Rule 93 \u2014 Rape and sexual violence prohibited. Rule 95 \u2014 Forced labour prohibited. Rule 96 \u2014 Hostage-taking prohibited. Rule 97 \u2014 Human shields prohibited. Rule 98 \u2014 Enforced disappearances prohibited. Rule 99 \u2014 Arbitrary deprivation of liberty prohibited. Rules 100\u2013103 \u2014 Fair trial guarantees. Rules 109\u2013110 \u2014 Care for wounded and sick. All applicable in IAC and NIAC.",f:"Henckaerts & Doswald-Beck, Customary IHL, ICRC/CUP, 2005, Vol. I, pp. 306\u2013380"},
    ]},
];

function Tip({src, fn, show}) {
  const source = SOURCES[src];
  if (!show) return null;
  return (
    <span style={{position:"absolute",bottom:"calc(100% + 8px)",left:0,zIndex:100,background:"#1a1a2e",color:"#e8e6e3",padding:"10px 14px",borderRadius:"6px",fontSize:"12px",lineHeight:"1.5",maxWidth:"360px",minWidth:"220px",boxShadow:"0 8px 32px rgba(0,0,0,0.3)",pointerEvents:"none",fontFamily:"'Source Sans 3',sans-serif"}}>
      <span style={{display:"block",fontWeight:700,color:source.color,marginBottom:"4px",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{source.full}</span>
      <span style={{display:"block",color:"#c4c0ba",fontStyle:"italic"}}>{fn}</span>
      <span style={{position:"absolute",bottom:"-5px",left:"20px",width:"10px",height:"10px",background:"#1a1a2e",transform:"rotate(45deg)"}}/>
    </span>
  );
}

function Span({src, text, fn, vis, tipId, activeTip, setTip}) {
  const source = SOURCES[src];
  if (!vis) return null;
  const active = activeTip === tipId;
  return (
    <span style={{position:"relative",display:"inline"}}>
      <span
        onClick={() => setTip(active ? null : tipId)}
        onMouseEnter={() => setTip(tipId)}
        onMouseLeave={() => setTip(null)}
        style={{color:source.color,backgroundColor:active?source.bg:"transparent",borderBottom:`2px solid ${source.ul}`,cursor:"help",padding:"1px 2px",borderRadius:"2px",transition:"background-color 0.2s",lineHeight:1.85}}
      >{text}</span>
      <Tip src={src} fn={fn} show={active}/>
    </span>
  );
}

function LegendItems({vis, toggle, toggleAll, allOn, count}) {
  return (
    <>
      <button onClick={toggleAll} style={{width:"100%",padding:"7px 10px",marginBottom:"10px",background:allOn?"#f0efeb":"#1a1a2e",color:allOn?"#555":"#fafaf8",border:"1px solid #ddd",borderRadius:"4px",cursor:"pointer",fontSize:"12px",fontFamily:"'Source Sans 3',sans-serif",fontWeight:600,transition:"all 0.2s"}}>
        {allOn ? "Deselect All" : "Select All"}
      </button>
      <div style={{fontSize:"11px",color:"#999",marginBottom:"10px",fontFamily:"'Source Sans 3',sans-serif"}}>{count} of {Object.keys(SOURCES).length} sources active</div>
      {Object.entries(SOURCES).map(([k, src]) => (
        <div key={k} onClick={() => toggle(k)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"7px 8px",borderRadius:"4px",cursor:"pointer",opacity:vis[k]?1:0.5,marginBottom:"2px",transition:"opacity 0.15s"}}>
          <span style={{width:"18px",height:"18px",borderRadius:"3px",border:`2px solid ${vis[k]?src.color:"#ccc"}`,background:vis[k]?src.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",flexShrink:0}}>
            {vis[k] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </span>
          <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:"13px",fontWeight:600,color:vis[k]?src.color:"#aaa",transition:"color 0.15s",lineHeight:1.3}}>{src.label}</span>
        </div>
      ))}
    </>
  );
}

export default function App() {
  const [vis, setVis] = useState(Object.fromEntries(Object.keys(SOURCES).map(k=>[k,true])));
  const [tip, setTip] = useState(null);
  const [legOpen, setLegOpen] = useState(true);
  const [mobOpen, setMobOpen] = useState(false);

  const toggle = k => setVis(p => ({...p,[k]:!p[k]}));
  const allOn = Object.values(vis).every(Boolean);
  const toggleAll = () => { const v=!allOn; setVis(Object.fromEntries(Object.keys(SOURCES).map(k=>[k,v]))); };
  const count = Object.values(vis).filter(Boolean).length;

  const renderPs = (ps, pfx) => ps.map((p,i) => {
    const k = `${pfx}-${i}`;
    return (
      <div key={k} style={{transition:"opacity 0.3s,max-height 0.4s,margin 0.3s",opacity:vis[p.s]?1:0,maxHeight:vis[p.s]?"600px":"0",overflow:"hidden",marginBottom:vis[p.s]?"14px":"0"}}>
        <Span src={p.s} text={p.t} fn={p.f} vis={vis[p.s]} tipId={k} activeTip={tip} setTip={setTip}/>
      </div>
    );
  });

  return (
    <div style={{minHeight:"100vh",background:"#FAF9F6",fontFamily:"'Source Sans 3',Georgia,serif",color:"#2c2c2c"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
      <style>{`
        @media(max-width:860px){.dsk{display:none!important}.cta{max-width:100%!important}}
        @media(min-width:861px){.mob-fab,.mob-pan{display:none!important}}
        a:hover{color:#1a1a2e!important;border-left-color:#C41E3A!important}
      `}</style>

      <header style={{background:"#1a1a2e",padding:"48px 24px 40px",textAlign:"center",borderBottom:"4px solid #C41E3A"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:"#C41E3A",margin:"0 0 16px",fontWeight:600}}>Geneva Conventions of 1949</p>
          <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(28px,5vw,44px)",fontWeight:700,color:"#FAFAF8",margin:"0 0 12px",lineHeight:1.15}}>Common Article 3</h1>
          <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:"14px",color:"#9a9a9a",margin:0,lineHeight:1.6,maxWidth:"600px",marginLeft:"auto",marginRight:"auto"}}>As interpreted by international tribunals, the ICRC Customary IHL Study, and the ICRC Commentaries (through 2025)</p>
          <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:"12px",color:"#6a6a6a",margin:"8px 0 0",fontStyle:"italic"}}>Applicable to Non-International Armed Conflicts (NIAC) · Appears identically in GC I, II, III, and IV</p>
        </div>
      </header>

      <div style={{maxWidth:"800px",margin:"0 auto",padding:"20px 24px 0"}}>
        <div style={{background:"#f0efeb",border:"1px solid #ddd",borderRadius:"6px",padding:"14px 18px",fontSize:"13px",lineHeight:1.6,color:"#555",fontFamily:"'Source Sans 3',sans-serif"}}>
          <strong style={{color:"#333"}}>Methodology:</strong> <strong style={{fontFamily:"'Cormorant Garamond',serif"}}>Bold serif</strong> = original treaty text. <span style={{borderBottom:"2px solid rgba(37,99,235,0.4)",padding:"0 2px"}}>Colour-coded text</span> = interpretations. Hover/tap for citations. Use the legend to filter by source.
        </div>
      </div>

      <div style={{display:"flex",maxWidth:"1120px",margin:"0 auto",padding:"24px 24px 80px",gap:"32px",position:"relative"}}>
        <main className="cta" style={{flex:1,minWidth:0,maxWidth:"800px"}}>
          {DATA.map(sec => (
            <article key={sec.id} id={sec.id} style={{marginBottom:"48px"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"22px",fontWeight:700,color:"#1a1a2e",margin:"0 0 20px",paddingBottom:"10px",borderBottom:"2px solid #e8e6e1",lineHeight:1.3}}>{sec.title}</h2>
              {sec.treaty && (
                <blockquote style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"17px",fontWeight:700,color:"#1a1a2e",lineHeight:1.75,margin:"0 0 24px",padding:"18px 24px",borderLeft:"4px solid #C41E3A",background:"rgba(196,30,58,0.03)",borderRadius:"0 4px 4px 0"}}>{sec.treaty}</blockquote>
              )}
              {sec.intro && <p style={{fontSize:"15px",lineHeight:1.75,color:"#444",margin:"0 0 16px",fontStyle:"italic"}}>{sec.intro}</p>}
              <div style={{fontSize:"15px",color:"#333"}}>{renderPs(sec.ps, sec.id)}</div>
              {sec.sub && (
                <div style={{marginTop:"24px",paddingLeft:"20px",borderLeft:"2px solid #e0ddd8"}}>
                  <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"17px",fontWeight:600,fontStyle:"italic",color:"#555",margin:"0 0 14px"}}>{sec.sub.title}</h3>
                  <div style={{fontSize:"15px",color:"#333"}}>{renderPs(sec.sub.ps, `${sec.id}-sub`)}</div>
                </div>
              )}
              {sec.extraTreaty && (
                <>
                  <blockquote style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"17px",fontWeight:700,color:"#1a1a2e",lineHeight:1.75,margin:"24px 0 20px",padding:"18px 24px",borderLeft:"4px solid #C41E3A",background:"rgba(196,30,58,0.03)",borderRadius:"0 4px 4px 0"}}>{sec.extraTreaty}</blockquote>
                  <div style={{fontSize:"15px",color:"#333"}}>{renderPs(sec.extraPs, `${sec.id}-x`)}</div>
                </>
              )}
            </article>
          ))}
        </main>

        <aside className="dsk" style={{width:"260px",flexShrink:0,position:"sticky",top:"24px",alignSelf:"flex-start"}}>
          <div style={{background:"#fff",border:"1px solid #e0ddd8",borderRadius:"8px",overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <button onClick={()=>setLegOpen(!legOpen)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"#1a1a2e",border:"none",cursor:"pointer",color:"#fafaf8",fontFamily:"'Source Sans 3',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase"}}>
              <span>Source Legend</span>
              <span style={{transform:legOpen?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",fontSize:"16px"}}>{"\u25BE"}</span>
            </button>
            {legOpen && <div style={{padding:"12px 14px"}}><LegendItems vis={vis} toggle={toggle} toggleAll={toggleAll} allOn={allOn} count={count}/></div>}
          </div>
          <div style={{marginTop:"16px",background:"#fff",border:"1px solid #e0ddd8",borderRadius:"8px",padding:"14px 16px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:"11px",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#888",margin:"0 0 10px"}}>Contents</p>
            {DATA.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{display:"block",fontSize:"12px",fontFamily:"'Source Sans 3',sans-serif",color:"#666",textDecoration:"none",padding:"4px 0",lineHeight:1.4,borderLeft:"2px solid transparent",paddingLeft:"8px",transition:"all 0.15s"}}>
                {s.title.includes("\u2014") ? s.title.split("\u2014")[1].trim() : s.title}
              </a>
            ))}
          </div>
        </aside>
      </div>

      <button className="mob-fab" onClick={()=>setMobOpen(!mobOpen)} style={{position:"fixed",bottom:"20px",right:"20px",width:"52px",height:"52px",borderRadius:"50%",background:"#1a1a2e",color:"#fafaf8",border:"none",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",cursor:"pointer",zIndex:1000,fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {mobOpen ? "\u2715" : "\u25D0"}
      </button>
      {mobOpen && (
        <div className="mob-pan" style={{position:"fixed",bottom:"82px",right:"20px",width:"260px",background:"#fff",border:"1px solid #e0ddd8",borderRadius:"10px",boxShadow:"0 8px 40px rgba(0,0,0,0.15)",zIndex:999,padding:"16px",maxHeight:"70vh",overflowY:"auto"}}>
          <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:"12px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#888",margin:"0 0 10px"}}>Source Legend</p>
          <LegendItems vis={vis} toggle={toggle} toggleAll={toggleAll} allOn={allOn} count={count}/>
        </div>
      )}
    </div>
  );
}

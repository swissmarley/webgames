(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const tf="modulepreload",nf=function(i,e){return new URL(i,e).href},kl={},sf=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=c(t.map(u=>{if(u=nf(u,n),u in kl)return;kl[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(n)for(let p=o.length-1;p>=0;p--){const _=o[p];if(_.href===u&&(!h||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":tf,h||(d.as="script"),d.crossOrigin="",d.href=u,l&&d.setAttribute("nonce",l),document.head.appendChild(d),h)return new Promise((p,_)=>{d.addEventListener("load",p),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},Fe={fixedDt:1/120,maxSubsteps:12,swingAmplitude:70*Math.PI/180,swingPeriod:2.5,aimSlowFactor:.22,restLength:.95,clawRadius:.2,extendSpeed:4.4,emptyReturnSpeed:7,cargoReturnSpeed:2.6,cargoBase:.35,cargoSlope:.65,feverReelMult:1.9,feverValueMult:2,feverDuration:7,feverCharge:4,streakMults:[1,1.2,1.4,1.6],tntRadius:2.1,tntCollectFactor:.75,crystalTime:3,startDynamite:3,maxDynamite:12,chestCash:220,chestTime:8,chestDynamite:2,upgradeWinchStep:1.13,upgradeWinchCap:3.2,upgradeValueStep:1.08,upgradeValueCap:1.65,upgradeDynamite:3,star2Time:.25,star3Time:.4,star3Accuracy:.75,countdownFrom:10},zs={smallGold:{value:95,weight:1.1,radius:.36,valuable:!0},largeGold:{value:220,weight:2.25,radius:.66,valuable:!0},crystal:{value:250,weight:.8,radius:.36,valuable:!0,time:3},rock:{value:15,weight:3.1,radius:.58,valuable:!1},chest:{value:190,weight:1.35,radius:.48,valuable:!0},relic:{value:550,weight:3,radius:.56,valuable:!0},tnt:{value:0,weight:0,radius:.42,valuable:!1,explosive:!0}},Za=["gilded","glacier","ember","amethyst"],Es=["balanced","heavyGold","explosive","crystals","chests","relic"],ri=24,Ro={target:1900,time:75},Mo={time:70,baseTarget:2300,step:100,cap:3100};function rf(i){return 650+Math.floor(i/6)*300+i%6*130}function of(i){return i<12?60:68}function af(i){return Math.min(Mo.cap,Mo.baseTarget+i*Mo.step)}const zl="golden-miner.save.v1",Lh=14;function Ja(){return{version:1,unlocked:1,stars:new Array(ri).fill(0),bestHaul:0,daily:[],lang:null,sound:{muted:!1,volume:.8},reducedMotion:null,quality:"auto",campaignComplete:!1}}const Hl=i=>Number.isFinite(i)&&Math.floor(i)===i,Nr=(i,e,t)=>Math.min(t,Math.max(e,i));function cf(i){const e=Ja();if(!i||typeof i!="object")return e;if(Hl(i.unlocked)&&(e.unlocked=Nr(i.unlocked,1,ri)),Array.isArray(i.stars))for(let t=0;t<ri;t++){const n=i.stars[t];e.stars[t]=Hl(n)&&n>=0&&n<=3?n:0}for(let t=0;t<ri;t++)e.stars[t]>0&&(e.unlocked=Math.max(e.unlocked,Math.min(ri,t+2)));if(Number.isFinite(i.bestHaul)&&(e.bestHaul=Nr(Math.floor(i.bestHaul),0,1e7)),Array.isArray(i.daily)){const t=new Set;for(const n of i.daily)!n||typeof n.date!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(n.date)||t.has(n.date)||Number.isFinite(n.best)&&(t.add(n.date),e.daily.push({date:n.date,best:Nr(Math.floor(n.best),0,1e7)}));e.daily.sort((n,s)=>n.date<s.date?1:-1),e.daily=e.daily.slice(0,Lh)}return(i.lang==="en"||i.lang==="zh-CN"||i.lang==="es")&&(e.lang=i.lang),i.sound&&typeof i.sound=="object"&&(e.sound.muted=i.sound.muted===!0,Number.isFinite(i.sound.volume)&&(e.sound.volume=Nr(i.sound.volume,0,1))),(i.reducedMotion===!0||i.reducedMotion===!1)&&(e.reducedMotion=i.reducedMotion),["auto","low","medium","high"].includes(i.quality)&&(e.quality=i.quality),e.campaignComplete=i.campaignComplete===!0||e.stars[ri-1]>0,e}function lf(i=uf()){let e=i?"ok":"unavailable",t=Ja();if(i)try{const s=i.getItem(zl);if(s!=null){let r=null;try{r=JSON.parse(s)}catch{r=null}(!r||typeof r!="object"||r.version!==1)&&(e="recovered"),t=cf(r),e==="recovered"&&n()}}catch{e="unavailable"}function n(){if(!i)return!1;try{return i.setItem(zl,JSON.stringify(t)),!0}catch{return e="unavailable",!1}}return{get data(){return t},get status(){return e},save:n,recordCampaignClear(s,r,o){t.stars[s]=Math.max(t.stars[s]||0,r),t.unlocked=Math.max(t.unlocked,Math.min(ri,s+2)),s===ri-1&&(t.campaignComplete=!0),t.bestHaul=Math.max(t.bestHaul,o),n()},recordHaul(s){s>t.bestHaul&&(t.bestHaul=s,n())},dailyBest(s){const r=t.daily.find(o=>o.date===s);return r?r.best:0},recordDaily(s,r){const o=t.daily.find(l=>l.date===s);let a=!1;return o?r>o.best&&(o.best=r,a=!0):(t.daily.push({date:s,best:r}),a=r>0),t.daily.sort((l,c)=>l.date<c.date?1:-1),t.daily=t.daily.slice(0,Lh),t.bestHaul=Math.max(t.bestHaul,r),n(),a},set(s,r){t[s]=r,n()},reset(){t=Ja(),n()}}}function uf(){try{if(typeof localStorage>"u")return null;const i="__gm_probe__";return localStorage.setItem(i,"1"),localStorage.removeItem(i),localStorage}catch{return null}}const hf=[{id:"en",label:"English"},{id:"zh-CN",label:"简体中文"},{id:"es",label:"Español"}],Qa={en:{title:"Golden Miner",tagline:"Time the swing. Pick the prize. Beat the clock.",play:"Start expedition",continue:"Continue",daily:"Daily challenge",endless:"Endless mode",map:"Map",camp:"Camp",help:"How to play",close:"Close",resume:"Resume",retry:"Retry",next:"Next level",paused:"Paused",sound:"Sound",soundOn:"Sound on",soundOff:"Muted",volume:"Volume",language:"Language",reducedMotion:"Reduced motion",quality:"Graphics",q_auto:"Auto",q_low:"Low",q_medium:"Medium",q_high:"High",on:"On",off:"Off",level:"Level",levelShort:"Lv",target:"Target",haul:"Haul",time:"Time",dynamite:"Dynamite",drop:"Drop",pause:"Pause",mute:"Mute",locked:"Locked",stars:"Stars",region_gilded:"Gilded Hollow",region_glacier:"Glacier Grotto",region_ember:"Ember Foundry",region_amethyst:"Amethyst Abyss",emph_balanced:"Balanced seam",emph_heavyGold:"Heavy gold",emph_explosive:"Explosive seam",emph_crystals:"Time crystals",emph_chests:"Mystery chests",emph_relic:"Ancient relic",mapTitle:"Expedition map",mapHint:"Clear a level to unlock the next. Stars: clear · 25 % time left · 75 % accuracy and 40 % time left.",dailyTitle:"Daily challenge",dailyInfo:"One shared board for {date} (UTC). Target {target} · {time} s.",dailyBest:"Your best today: {best}",dailyNone:"No run yet today",dailyReset:"New board in {time}",dailyLocal:"Best scores are stored on this device only.",dailyHistory:"Recent daily bests",endlessInfo:"Endless stages, rising targets up to $3,100 · 70 s each.",endlessFresh:"From camp you start with fresh gear.",stage:"Stage",play_btn:"Play",levelIntro:"{region} · {emph}",clearedTitle:"Seam cleared!",failedTitle:"Out of time",failedBody:"The cart needed {missing} more.",victoryTitle:"All four regions conquered!",victoryBody:"You hauled the Deep Vault dry. {stars} of 72 stars.",dailyDoneTitle:"Daily run complete",dailyCleared:"Target reached!",dailyMissed:"Target missed",newBest:"New device best!",endlessClearedTitle:"Stage {n} cleared",endlessOverTitle:"Endless run over",endlessOverBody:"You reached stage {n}.",keepUpgrades:"Endless (keep upgrades)",toMap:"Back to map",timeLeft:"Time left",accuracy:"Accuracy",bestHaul:"Best haul",chooseUpgrade:"Choose one free upgrade",upg_winch:"Faster winch",upg_winch_d:"+13 % reel speed",upg_value:"Assayer’s eye",upg_value_d:"+8 % treasure value",upg_dynamite:"Dynamite crate",upg_dynamite_d:"+3 dynamite",upg_max:"Maxed",upg_now:"Now {v}",toastFever:"Gold Fever! 2× value",toastFeverEnd:"Fever cooled",toastCrystal:"+{s} s",toastChestCash:"Chest: +{v}",toastChestTime:"Chest: +{s} s",toastChestDyn:"Chest: +{n} dynamite",toastChestDynFull:"Chest: dynamite crate full",toastNoCargo:"Nothing to blast",toastNoDynamite:"No dynamite left",toastTimeUp:"Time! Reeling in…",toastTarget:"Target reached — keep mining!",toastChain:"Chain blast ×{n}",toastLayout:"Layout updates after the claw returns",toastRecovered:"Save data was unreadable and has been reset.",toastNoStorage:"Storage unavailable: progress lasts this session only.",model_label:"Models",model_tripo:"Tripo",model_three:"Three.js",model_loading:"Loading Tripo models…",model_ready:"Tripo models active",model_classic:"Three.js models active",model_failed:"Tripo models failed to load ({err}). Three.js models stay active.",model_standin:"Stand-in GLBs: generated in code until real Tripo exports are dropped in.",loading:"Loading the mine…",loading_tex:"Painting rock strata",loading_models:"Hauling models",loading_shaders:"Warming up shaders",noWebgl:"This game needs WebGL 2, which your browser or device does not provide.",errorTitle:"Something went wrong",reload:"Reload",helpBody:["The claw swings by itself. Tap or click the mine — or press Space / ↓ — to drop it. It returns on its own.","Hold to slow the swing to aim, release to drop. The clock keeps running while you aim.","Heavy cargo reels in slowly. Crystals add 3 s. Chests hide cash, time or dynamite.","TNT explodes on contact: it smashes rocks and grabs nearby treasure at 75 %.","Four valuable catches in a row light Gold Fever: 2× value and a faster winch for 7 s.","Dynamite (B / ↑) blasts away a bad catch. A miss, a stone or dynamite breaks your streak.","P / Esc pauses. Reach the target before time runs out."],keyHintDrop:"Space / ↓",keyHintDyn:"B / ↑",streak:"Streak",fever:"Fever",caption_explode:"[explosion]",caption_tick:"[clock ticking]",open:"Open",yourStats:"Run"},"zh-CN":{title:"黄金矿工",tagline:"掌握摆动时机，挑选宝藏，与时间赛跑。",play:"开始探险",continue:"继续",daily:"每日挑战",endless:"无尽模式",map:"地图",camp:"营地",help:"玩法说明",close:"关闭",resume:"继续游戏",retry:"重试",next:"下一关",paused:"已暂停",sound:"声音",soundOn:"声音开",soundOff:"已静音",volume:"音量",language:"语言",reducedMotion:"减少动态效果",quality:"画质",q_auto:"自动",q_low:"低",q_medium:"中",q_high:"高",on:"开",off:"关",level:"关卡",levelShort:"关",target:"目标",haul:"收获",time:"时间",dynamite:"炸药",drop:"放钩",pause:"暂停",mute:"静音",locked:"未解锁",stars:"星星",region_gilded:"镀金幽谷",region_glacier:"冰川洞窟",region_ember:"余烬熔炉",region_amethyst:"紫晶深渊",emph_balanced:"均衡矿脉",emph_heavyGold:"重金矿脉",emph_explosive:"爆破矿脉",emph_crystals:"时光水晶",emph_chests:"神秘宝箱",emph_relic:"远古遗物",mapTitle:"探险地图",mapHint:"通关以解锁下一关。星级：通关 · 剩余 25% 时间 · 命中率 75% 且剩余 40% 时间。",dailyTitle:"每日挑战",dailyInfo:"{date}（UTC）全体共享同一矿区。目标 {target} · {time} 秒。",dailyBest:"今日最佳：{best}",dailyNone:"今天还没有挑战记录",dailyReset:"{time} 后刷新矿区",dailyLocal:"最佳成绩仅保存在本设备上。",dailyHistory:"近期每日最佳",endlessInfo:"无尽关卡，目标逐步提高至 $3,100 · 每关 70 秒。",endlessFresh:"从营地出发时使用初始装备。",stage:"阶段",play_btn:"开始",levelIntro:"{region} · {emph}",clearedTitle:"矿脉清空！",failedTitle:"时间到",failedBody:"还差 {missing}。",victoryTitle:"四大矿区全部征服！",victoryBody:"你搬空了深层宝库。共获得 {stars} / 72 颗星。",dailyDoneTitle:"每日挑战完成",dailyCleared:"达成目标！",dailyMissed:"未达成目标",newBest:"本机新纪录！",endlessClearedTitle:"第 {n} 阶段完成",endlessOverTitle:"无尽模式结束",endlessOverBody:"你到达了第 {n} 阶段。",keepUpgrades:"无尽模式（保留升级）",toMap:"返回地图",timeLeft:"剩余时间",accuracy:"命中率",bestHaul:"最佳收获",chooseUpgrade:"免费选择一项升级",upg_winch:"加速绞盘",upg_winch_d:"收线速度 +13%",upg_value:"鉴宝慧眼",upg_value_d:"宝藏价值 +8%",upg_dynamite:"炸药箱",upg_dynamite_d:"炸药 +3",upg_max:"已满级",upg_now:"当前 {v}",toastFever:"黄金狂热！价值翻倍",toastFeverEnd:"狂热结束",toastCrystal:"+{s} 秒",toastChestCash:"宝箱：+{v}",toastChestTime:"宝箱：+{s} 秒",toastChestDyn:"宝箱：炸药 +{n}",toastChestDynFull:"宝箱：炸药已满",toastNoCargo:"钩爪上没有东西",toastNoDynamite:"炸药用完了",toastTimeUp:"时间到！正在收回…",toastTarget:"达成目标——继续挖吧！",toastChain:"连环爆炸 ×{n}",toastLayout:"钩爪收回后切换布局",toastRecovered:"存档无法读取，已重置。",toastNoStorage:"存储不可用：进度仅在本次会话中保留。",model_label:"模型",model_tripo:"Tripo",model_three:"Three.js",model_loading:"正在加载 Tripo 模型…",model_ready:"已启用 Tripo 模型",model_classic:"已启用 Three.js 模型",model_failed:"Tripo 模型加载失败（{err}），继续使用 Three.js 模型。",model_standin:"替代 GLB：在放入真正的 Tripo 导出文件之前，由代码生成。",loading:"正在载入矿井…",loading_tex:"绘制岩层",loading_models:"搬运模型",loading_shaders:"预热着色器",noWebgl:"本游戏需要 WebGL 2，你的浏览器或设备不支持。",errorTitle:"出现错误",reload:"重新加载",helpBody:["钩爪会自动摆动。点击矿井，或按 空格 / ↓ 放下钩爪，它会自动收回。","按住可让摆动减慢以便瞄准，松开即放钩。瞄准时计时不会停止。","重物收回较慢。水晶 +3 秒。宝箱里有金钱、时间或炸药。","TNT 一碰就炸：炸碎附近石头，并以 75% 价值收取附近宝藏。","连续抓到 4 件宝物会触发黄金狂热：7 秒内价值翻倍、绞盘加速。","炸药（B / ↑）可炸掉不想要的货物。落空、抓到石头或使用炸药都会中断连击。","P / Esc 暂停。在时间耗尽前达到目标。"],keyHintDrop:"空格 / ↓",keyHintDyn:"B / ↑",streak:"连击",fever:"狂热",caption_explode:"[爆炸声]",caption_tick:"[计时滴答声]",open:"打开",yourStats:"本局"},es:{title:"Golden Miner",tagline:"Calcula el balanceo. Elige el tesoro. Gánale al reloj.",play:"Iniciar expedición",continue:"Continuar",daily:"Desafío diario",endless:"Modo infinito",map:"Mapa",camp:"Campamento",help:"Cómo jugar",close:"Cerrar",resume:"Reanudar",retry:"Reintentar",next:"Siguiente nivel",paused:"En pausa",sound:"Sonido",soundOn:"Sonido activado",soundOff:"Silenciado",volume:"Volumen",language:"Idioma",reducedMotion:"Movimiento reducido",quality:"Gráficos",q_auto:"Auto",q_low:"Bajo",q_medium:"Medio",q_high:"Alto",on:"Sí",off:"No",level:"Nivel",levelShort:"Nv",target:"Objetivo",haul:"Botín",time:"Tiempo",dynamite:"Dinamita",drop:"Lanzar",pause:"Pausa",mute:"Silenciar",locked:"Bloqueado",stars:"Estrellas",region_gilded:"Hondonada Dorada",region_glacier:"Gruta Glaciar",region_ember:"Fundición de Brasas",region_amethyst:"Abismo de Amatista",emph_balanced:"Veta equilibrada",emph_heavyGold:"Oro pesado",emph_explosive:"Veta explosiva",emph_crystals:"Cristales del tiempo",emph_chests:"Cofres misteriosos",emph_relic:"Reliquia antigua",mapTitle:"Mapa de la expedición",mapHint:"Supera un nivel para desbloquear el siguiente. Estrellas: superarlo · 25 % de tiempo restante · 75 % de precisión y 40 % de tiempo.",dailyTitle:"Desafío diario",dailyInfo:"Un tablero compartido para el {date} (UTC). Objetivo {target} · {time} s.",dailyBest:"Tu mejor marca de hoy: {best}",dailyNone:"Aún no has jugado hoy",dailyReset:"Nuevo tablero en {time}",dailyLocal:"Las mejores marcas solo se guardan en este dispositivo.",dailyHistory:"Mejores marcas recientes",endlessInfo:"Etapas sin fin, objetivos que suben hasta $3,100 · 70 s cada una.",endlessFresh:"Desde el campamento empiezas con equipo nuevo.",stage:"Etapa",play_btn:"Jugar",levelIntro:"{region} · {emph}",clearedTitle:"¡Veta despejada!",failedTitle:"Se acabó el tiempo",failedBody:"Faltaron {missing} para la vagoneta.",victoryTitle:"¡Las cuatro regiones conquistadas!",victoryBody:"Vaciaste la Bóveda Profunda. {stars} de 72 estrellas.",dailyDoneTitle:"Desafío diario terminado",dailyCleared:"¡Objetivo logrado!",dailyMissed:"Objetivo no alcanzado",newBest:"¡Nueva mejor marca en este dispositivo!",endlessClearedTitle:"Etapa {n} superada",endlessOverTitle:"Fin del modo infinito",endlessOverBody:"Llegaste a la etapa {n}.",keepUpgrades:"Infinito (conservar mejoras)",toMap:"Volver al mapa",timeLeft:"Tiempo restante",accuracy:"Precisión",bestHaul:"Mejor botín",chooseUpgrade:"Elige una mejora gratis",upg_winch:"Torno veloz",upg_winch_d:"+13 % velocidad de recogida",upg_value:"Ojo de tasador",upg_value_d:"+8 % valor del tesoro",upg_dynamite:"Caja de dinamita",upg_dynamite_d:"+3 dinamitas",upg_max:"Al máximo",upg_now:"Ahora {v}",toastFever:"¡Fiebre del oro! Valor ×2",toastFeverEnd:"La fiebre se enfría",toastCrystal:"+{s} s",toastChestCash:"Cofre: +{v}",toastChestTime:"Cofre: +{s} s",toastChestDyn:"Cofre: +{n} dinamita",toastChestDynFull:"Cofre: dinamita al máximo",toastNoCargo:"No hay nada que volar",toastNoDynamite:"No te queda dinamita",toastTimeUp:"¡Tiempo! Recogiendo…",toastTarget:"¡Objetivo logrado! Sigue minando",toastChain:"Explosión en cadena ×{n}",toastLayout:"El diseño cambia cuando vuelva la garra",toastRecovered:"Los datos guardados eran ilegibles y se han restablecido.",toastNoStorage:"Almacenamiento no disponible: el progreso dura solo esta sesión.",model_label:"Modelos",model_tripo:"Tripo",model_three:"Three.js",model_loading:"Cargando modelos Tripo…",model_ready:"Modelos Tripo activos",model_classic:"Modelos Three.js activos",model_failed:"No se pudieron cargar los modelos Tripo ({err}). Siguen activos los modelos Three.js.",model_standin:"GLB provisionales: generados por código hasta añadir las exportaciones reales de Tripo.",loading:"Cargando la mina…",loading_tex:"Pintando estratos",loading_models:"Transportando modelos",loading_shaders:"Preparando sombreadores",noWebgl:"Este juego necesita WebGL 2 y tu navegador o dispositivo no lo ofrece.",errorTitle:"Algo salió mal",reload:"Recargar",helpBody:["La garra se balancea sola. Toca o haz clic en la mina, o pulsa Espacio / ↓, para lanzarla. Vuelve sola.","Mantén pulsado para frenar el balanceo y apuntar; suelta para lanzar. El reloj sigue corriendo.","La carga pesada sube despacio. Los cristales suman 3 s. Los cofres esconden dinero, tiempo o dinamita.","El TNT estalla al tocarlo: rompe rocas y recoge el tesoro cercano al 75 %.","Cuatro capturas valiosas seguidas encienden la Fiebre del oro: valor ×2 y torno más rápido durante 7 s.","La dinamita (B / ↑) destruye una mala captura. Fallar, una piedra o la dinamita rompen tu racha.","P / Esc pausa. Alcanza el objetivo antes de que se acabe el tiempo."],keyHintDrop:"Espacio / ↓",keyHintDyn:"B / ↑",streak:"Racha",fever:"Fiebre",caption_explode:"[explosión]",caption_tick:"[tictac del reloj]",open:"Abrir",yourStats:"Partida"}};let ws="en";const df=new Set;function ff(i){const e=i&&i.length?i:["en"];for(const t of e){const n=String(t).toLowerCase();if(n.startsWith("zh"))return"zh-CN";if(n==="es"||n.startsWith("es-"))return"es";if(n==="en"||n.startsWith("en-"))return"en"}return"en"}function Ih(i){ws=Qa[i]?i:"en",typeof document<"u"&&(document.documentElement.lang=ws);for(const e of df)e(ws)}function Dh(){return ws}function Y(i,e){let t=Qa[ws][i];return t===void 0&&(t=Qa.en[i]),t===void 0?i:(Array.isArray(t)||e&&(t=t.replace(/\{(\w+)\}/g,(n,s)=>e[s]!==void 0?e[s]:`{${s}}`)),t)}const Ur={};function pn(i){const e=ws;if(!Ur[e])try{Ur[e]=new Intl.NumberFormat(e==="zh-CN"?"zh-CN":e==="es"?"es-ES":"en-US",{maximumFractionDigits:0,useGrouping:!0})}catch{Ur[e]={format:t=>String(t)}}return"$"+Ur[e].format(Math.round(i))}const st=i=>document.getElementById(i),Yn=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Jo={soundOn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',soundOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>'};function pf(){const i={hud:st("hud"),level:st("hud-level"),haul:st("hud-haul"),target:st("hud-target"),mult:st("hud-mult"),bar:st("hud-bar"),barFill:st("hud-bar-fill"),fever:st("hud-fever"),feverFill:st("hud-fever-fill"),time:st("hud-time"),controls:st("controls"),dyn:st("btn-dyn"),dynCount:st("dyn-count"),dynLabel:st("dyn-label"),dynKey:st("dyn-key"),drop:st("btn-drop"),dropLabel:st("drop-label"),dropKey:st("drop-key"),toasts:st("toasts"),floaters:st("floaters"),modalRoot:st("modal-root"),title:st("title-card"),sound:st("btn-sound"),pause:st("btn-pause"),mTripo:st("m-tripo"),mThree:st("m-three"),badge:st("model-badge"),modelLabel:st("model-label"),modelSwitch:st("model-switch"),loading:st("loading"),loadFill:st("load-fill"),loadText:st("load-text"),debug:st("debug"),fatal:st("fatal")};i.pause.innerHTML=Jo.pause;const e=Array.from(i.fever.querySelectorAll("i")),t=[];for(let M=0;M<14;M++){const S=document.createElement("div");S.className="floater",i.floaters.appendChild(S),t.push({el:S,busy:!1})}let n=!1;function s(M,S,P,F=""){const U=t.find(z=>!z.busy)||t[0];U.busy=!0;const O=U.el;O.className="floater "+F,O.innerHTML=P,O.getAnimations().forEach(z=>z.cancel());const V=n?0:60,L=O.animate([{transform:`translate(${M}px, ${S}px) translate(-50%, -50%) scale(.7)`,opacity:0},{transform:`translate(${M}px, ${S-V*.25}px) translate(-50%, -50%) scale(1.08)`,opacity:1,offset:.15},{transform:`translate(${M}px, ${S-V}px) translate(-50%, -50%) scale(1)`,opacity:0}],{duration:n?900:1100,easing:"cubic-bezier(.2,.8,.2,1)"});L.onfinish=()=>{U.busy=!1,O.style.opacity="0"}}function r(M,S="",P=1800){for(;i.toasts.children.length>=3;)i.toasts.firstChild.remove();const F=document.createElement("div");F.className="toast "+S,F.textContent=M,i.toasts.appendChild(F),setTimeout(()=>{F.classList.add("out"),setTimeout(()=>F.remove(),320)},P)}function o(){i.toasts.innerHTML=""}const a={};function l(M,S,P){a[S]!==P&&(a[S]=P,M.textContent=P)}function c(M){l(i.haul,"haul",pn(M.haul)),l(i.target,"target","/ "+pn(M.target));const S=Math.min(100,M.haul/M.target*100),P=Math.round(S);a.pct!==P&&(a.pct=P,i.barFill.style.width=S+"%",i.bar.setAttribute("aria-valuenow",String(P)),i.bar.classList.toggle("done",S>=100));const F=Math.ceil(M.time),U=`${Math.floor(F/60)}:${String(F%60).padStart(2,"0")}`;l(i.time,"time",U);const O=!M.expired&&M.time<=10;a.warn!==O&&(a.warn=O,i.time.classList.toggle("warn",O)),a.over!==M.expired&&(a.over=M.expired,i.time.classList.toggle("over",M.expired));const V=M.streakMult,L=M.fever>0?`×${(V*2).toFixed(1)}`:V>1?`×${V.toFixed(1)}`:"";a.mult!==L&&(a.mult=L,i.mult.hidden=!L,i.mult.textContent=L,i.mult.classList.toggle("fever",M.fever>0));const z=M.fever>0?"F"+Math.ceil(M.fever*10):"C"+M.charge;a.fever!==z&&(a.fever=z,i.fever.classList.toggle("active",M.fever>0),e.forEach((se,ye)=>se.classList.toggle("on",M.fever>0||ye<M.charge)),i.feverFill.style.width=M.fever>0?M.fever/7*100+"%":"0%"),l(i.dynCount,"dyn",String(M.dynamite));const k=M.canDynamite;a.dynReady!==k&&(a.dynReady=k,i.dyn.classList.toggle("ready",k));const G=M.dynamite<=0;a.dynEmpty!==G&&(a.dynEmpty=G,i.dyn.classList.toggle("empty",G));const $=!M.canLaunch;a.busy!==$&&(a.busy=$,i.drop.classList.toggle("busy",$))}function u(){for(const M of Object.keys(a))delete a[M]}function h(M,S){i.level.innerHTML=`${Yn(M)}<small>${Yn(S)}</small>`}function f(M){i.hud.hidden=!M,i.controls.hidden=!M,i.pause.hidden=!M}function d(M){i.sound.innerHTML=M?Jo.soundOff:Jo.soundOn,i.sound.setAttribute("aria-label",Y(M?"soundOff":"soundOn")),i.sound.setAttribute("aria-pressed",String(!M))}function p(M,S,P){i.mTripo.setAttribute("aria-pressed",String(M==="tripo")),i.mThree.setAttribute("aria-pressed",String(M!=="tripo")),i.mTripo.disabled=S==="loading",i.mTripo.title=S==="failed"?Y("model_failed",{err:""}):"",i.badge.hidden=!(P&&S==="ready"),i.badge.textContent="stand-in",i.badge.title=Y("model_standin")}function _(){i.modelLabel.textContent=Y("model_label"),i.mTripo.textContent=Y("model_tripo"),i.mThree.textContent=Y("model_three"),i.dynLabel.textContent=Y("dynamite"),i.dropLabel.textContent=Y("drop"),i.dynKey.textContent=Y("keyHintDyn"),i.dropKey.textContent=Y("keyHintDrop"),i.pause.setAttribute("aria-label",Y("pause")),i.dyn.setAttribute("aria-label",`${Y("dynamite")} (${Y("keyHintDyn")})`),i.drop.setAttribute("aria-label",`${Y("drop")} (${Y("keyHintDrop")})`),i.fever.setAttribute("aria-label",Y("fever")),i.hud.setAttribute("aria-label",`${Y("level")} · ${Y("haul")} · ${Y("time")}`),document.title=Y("title")}let g=null,m=null;function v(M,{wide:S=!1,onClose:P=null,label:F=""}={}){y(!0),m=document.activeElement;const U=document.createElement("div");U.className="backdrop",U.innerHTML=`<div class="card modal ${S?"wide":""}" role="dialog" aria-modal="true" aria-label="${Yn(F)}" tabindex="-1">${M}</div>`,i.modalRoot.appendChild(U);const O=U.firstChild,V=L=>{if(L.key==="Tab"){const z=x(O);if(!z.length){L.preventDefault();return}const k=z[0],G=z[z.length-1];L.shiftKey&&(document.activeElement===k||!O.contains(document.activeElement))?(L.preventDefault(),G.focus()):!L.shiftKey&&(document.activeElement===G||!O.contains(document.activeElement))&&(L.preventDefault(),k.focus())}else L.key==="Escape"&&P&&(L.preventDefault(),L.stopPropagation(),P())};return U.addEventListener("keydown",V),U.addEventListener("pointerdown",L=>{L.stopPropagation()}),g={back:U,box:O,onClose:P},requestAnimationFrame(()=>{(O.querySelector("[data-autofocus]")||x(O)[0]||O).focus({preventScroll:!0})}),O}function y(M=!1){g&&(g.back.remove(),g=null,!M&&m&&document.body.contains(m)&&m.focus({preventScroll:!0}))}function x(M){return Array.from(M.querySelectorAll('button:not([disabled]), [href], select, input, [tabindex]:not([tabindex="-1"])')).filter(S=>S.offsetParent!==null)}function T(M,S){i.loadFill.style.width=Math.round(M*100)+"%",S&&(i.loadText.textContent=S)}function b(){i.loading.classList.add("done"),setTimeout(()=>{i.loading.hidden=!0},600)}function A(M,S,P="Reload"){i.fatal.hidden=!1,i.fatal.innerHTML=`<div class="card"><h2 style="margin:0 0 8px">${Yn(M)}</h2><pre>${Yn(S)}</pre><button class="btn primary" type="button" id="fatal-reload">${Yn(P)}</button></div>`,st("fatal-reload").onclick=()=>location.reload(),i.loading.hidden=!0}function w(M){return`<select class="sel" id="${M}" aria-label="${Yn(Y("language"))}">${hf.map(S=>`<option value="${S.id}" ${S.id===Dh()?"selected":""}>${Yn(S.label)}</option>`).join("")}</select>`}return{el:i,hud:c,resetHud:u,setLevelLabel:h,showPlay:f,toast:r,clearToasts:o,floater:s,setSoundIcon:d,setModelSwitch:p,localizeStatic:_,openModal:v,closeModal:y,get modalOpen(){return!!g},get modalBox(){return g?g.box:null},loading:T,loadingDone:b,fatal:A,langSelect:w,esc:Yn,setReduced(M){n=M,document.documentElement.classList.toggle("reduced",M),document.documentElement.classList.toggle("motion-ok",!M)},reserve(){const M=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sat"))||0,S=i.hud.hidden?128+M:i.hud.getBoundingClientRect().bottom+6,P=i.controls.hidden?78:window.innerHeight-i.controls.getBoundingClientRect().top+8;return{top:S,bottom:P}}}}function mf(){let i=null,e=null,t=null,n=null,s=null,r=null,o=!1,a=.8,l=!1,c=!1;const u=new Set;function h(){if(i){i.state==="suspended"&&!c&&i.resume().catch(()=>{});return}const x=window.AudioContext||window.webkitAudioContext;if(!x)return;try{i=new x({latencyHint:"interactive"})}catch{i=null;return}s=i.createDynamicsCompressor(),s.threshold.value=-14,s.knee.value=10,s.ratio.value=4,e=i.createGain(),e.gain.value=o?0:a,t=i.createGain(),t.gain.value=.9,n=i.createGain(),n.gain.value=.22,t.connect(s),n.connect(s),s.connect(e),e.connect(i.destination),r=i.createBuffer(1,i.sampleRate*1.5,i.sampleRate);const T=r.getChannelData(0);for(let b=0;b<T.length;b++)T[b]=Math.random()*2-1;try{const b=Math.floor(i.sampleRate*1.8),A=i.createBuffer(2,b,i.sampleRate);for(let S=0;S<2;S++){const P=A.getChannelData(S);for(let F=0;F<b;F++)P[F]=(Math.random()*2-1)*Math.pow(1-F/b,3.2)}const w=i.createConvolver();w.buffer=A;const M=i.createGain();M.gain.value=.16,t.connect(w),w.connect(M),M.connect(s)}catch{}m()}function f(){e&&e.gain.setTargetAtTime(o?0:a,i.currentTime,.03);for(const x of u)x()}const d=(x,T)=>x+Math.random()*(T-x);function p(x,T,b,A,w,M=1e-4){x.gain.cancelScheduledValues(T),x.gain.setValueAtTime(1e-4,T),x.gain.exponentialRampToValueAtTime(A,T+b),x.gain.exponentialRampToValueAtTime(Math.max(1e-4,M),T+b+w)}function _(x,T,b,A,w,M=t,S=.005,P=0){const F=i.createOscillator(),U=i.createGain();return F.type=x,F.frequency.setValueAtTime(T,b),P&&F.frequency.exponentialRampToValueAtTime(P,b+A),p(U,b,S,w,A),F.connect(U),U.connect(M),F.start(b),F.stop(b+S+A+.05),F}function g(x,T,b,A,w,M,S=1,P=t){const F=i.createBufferSource();F.buffer=r,F.playbackRate.value=d(.9,1.1);const U=i.createBiquadFilter();U.type=A,U.Q.value=S,U.frequency.setValueAtTime(w,x),M&&U.frequency.exponentialRampToValueAtTime(M,x+T);const O=i.createGain();p(O,x,.004,b,T),F.connect(U),U.connect(O),O.connect(P),F.start(x,Math.random()*.5),F.stop(x+T+.05)}function m(){if(l||!i)return;l=!0;const x=i.createBiquadFilter();x.type="lowpass",x.frequency.value=320;const T=i.createOscillator(),b=i.createGain();T.frequency.value=.05,b.gain.value=120,T.connect(b),b.connect(x.frequency);for(const S of[55,55.7,82.4]){const P=i.createOscillator();P.type="sine",P.frequency.value=S;const F=i.createGain();F.gain.value=S>80?.05:.11,P.connect(F),F.connect(x),P.start()}const A=i.createBufferSource();A.buffer=r,A.loop=!0;const w=i.createBiquadFilter();w.type="bandpass",w.frequency.value=500,w.Q.value=.6;const M=i.createGain();M.gain.value=.05,A.connect(w),w.connect(M),M.connect(n),A.start(),x.connect(n),T.start()}const v={t:0},y={launch(){const x=i.currentTime;g(x,.22,.28,"bandpass",900,2600,1.2),_("triangle",d(180,200),x,.12,.12,t,.004,120)},ratchet(x){const T=i.currentTime;_("square",d(1900,2300)*x,T,.018,.025)},impact(x){const T=i.currentTime,b=x==="rock"||x==="largeGold"||x==="relic";g(T,b?.22:.12,b?.5:.32,"lowpass",b?900:1800,200,.8),_("sine",b?d(70,85):d(130,160),T,b?.25:.12,b?.5:.25,t,.002,45)},gold(x=1){const T=i.currentTime,b=d(880,940)*(1+(x-1)*.35);[1,1.25,1.5,2].forEach((w,M)=>_("triangle",b*w,T+M*.055,.32,.14)),_("sine",b*4,T+.2,.4,.05),g(T,.08,.06,"highpass",6e3,0,.5)},crystal(){const x=i.currentTime,T=d(1240,1320);for(const[b,A]of[[1,0],[1.5,.07],[2.01,.14],[3,.2]])_("sine",T*b,x+A,.9,.09,t,.003);_("sine",T*.5,x,.5,.05)},rock(){const x=i.currentTime;g(x,.3,.3,"lowpass",500,120,.7),_("sine",d(60,70),x,.3,.3)},chest(){const x=i.currentTime;g(x,.25,.16,"bandpass",400,900,3),[1,1.26,1.5,1.68,2].forEach((T,b)=>_("triangle",660*T,x+.12+b*.05,.25,.09))},explode(x=0){const T=i.currentTime+x*.05;g(T,1.1,.95,"lowpass",2400,90,.7),g(T,.12,.6,"highpass",2500,0,.5),_("sine",d(55,65),T,.7,.9,t,.004,28),_("sawtooth",d(110,130),T,.35,.18,t,.004,40)},dynamite(){y.explode(0)},tick(x){const T=i.currentTime;_("square",x<=3?1320:990,T,.05,.08)},fever(){const x=i.currentTime;[523,659,784,1047,1319].forEach((T,b)=>_("triangle",T,x+b*.06,.35,.12)),g(x,.6,.08,"highpass",4e3,9e3,.5)},miss(){const x=i.currentTime;_("sine",220,x,.2,.08,t,.01,150)},win(){const x=i.currentTime;[[523,0],[659,.12],[784,.24],[1047,.38],[784,.52],[1047,.62]].forEach(([T,b])=>{_("triangle",T,x+b,.45,.16),_("sine",T/2,x+b,.45,.06)})},lose(){const x=i.currentTime;[[392,0],[349,.2],[311,.4],[262,.62]].forEach(([T,b])=>_("triangle",T,x+b,.5,.13))},ui(){const x=i.currentTime;_("sine",d(700,760),x,.06,.06)},upgrade(){const x=i.currentTime;[659,880,1175].forEach((T,b)=>_("triangle",T,x+b*.07,.3,.12))},drip(){const x=i.currentTime;x-v.t<2||(v.t=x,_("sine",d(1400,2200),x,.12,.03,n,.002,d(500,700)))}};return{unlock:h,get ready(){return!!i},get muted(){return o},get volume(){return a},setMuted(x){o=!!x,f()},setVolume(x){a=Math.max(0,Math.min(1,x)),f()},onChange(x){u.add(x)},play(x,...T){if(!i||o||i.state!=="running")return;const b=y[x];if(b)try{b(...T)}catch{}},suspend(){c=!0,i&&i.state==="running"&&i.suspend().catch(()=>{})},resume(){c=!1,i&&i.state==="suspended"&&i.resume().catch(()=>{})}}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jc="180",gf=0,Vl=1,_f=2,Nh=1,Uh=2,ti=3,hi=0,tn=1,zn=2,Si=0,Gi=1,ec=2,Gl=3,Wl=4,xf=5,zi=100,vf=101,yf=102,Mf=103,Sf=104,bf=200,Tf=201,Ef=202,wf=203,tc=204,nc=205,Af=206,Rf=207,Cf=208,Pf=209,Lf=210,If=211,Df=212,Nf=213,Uf=214,ic=0,sc=1,rc=2,Ls=3,oc=4,ac=5,cc=6,lc=7,Qc=0,Ff=1,Of=2,bi=0,Bf=1,kf=2,zf=3,Fh=4,Hf=5,Vf=6,Gf=7,Xl="attached",Wf="detached",Oh=300,Is=301,Ds=302,uc=303,hc=304,Ho=306,qi=1e3,Mi=1001,Co=1002,nn=1003,Bh=1004,or=1005,mn=1006,So=1007,oi=1008,Wn=1009,kh=1010,zh=1011,_r=1012,el=1013,$i=1014,In=1015,Lr=1016,tl=1017,nl=1018,xr=1020,Hh=35902,Vh=35899,Gh=1021,Wh=1022,Tn=1023,vr=1026,yr=1027,il=1028,sl=1029,Xh=1030,rl=1031,ol=1033,bo=33776,To=33777,Eo=33778,wo=33779,dc=35840,fc=35841,pc=35842,mc=35843,gc=36196,_c=37492,xc=37496,vc=37808,yc=37809,Mc=37810,Sc=37811,bc=37812,Tc=37813,Ec=37814,wc=37815,Ac=37816,Rc=37817,Cc=37818,Pc=37819,Lc=37820,Ic=37821,Dc=36492,Nc=36494,Uc=36495,Fc=36283,Oc=36284,Bc=36285,kc=36286,Mr=2300,Sr=2301,Qo=2302,ql=2400,$l=2401,Yl=2402,Xf=2500,qf=0,qh=1,zc=2,$f=3200,Yf=3201,al=0,jf=1,Hn="",Bt="srgb",Ot="srgb-linear",Po="linear",xt="srgb",Qi=7680,jl=519,Kf=512,Zf=513,Jf=514,$h=515,Qf=516,ep=517,tp=518,np=519,Hc=35044,Fr=35048,Kl="300 es",Gn=2e3,Lo=2001;class Hs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zl=1234567;const ur=Math.PI/180,Ns=180/Math.PI;function En(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function cl(i,e){return(i%e+e)%e}function ip(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function sp(i,e,t){return i!==e?(t-i)/(e-i):0}function hr(i,e,t){return(1-t)*i+t*e}function rp(i,e,t,n){return hr(i,e,1-Math.exp(-t*n))}function op(i,e=1){return e-Math.abs(cl(i,e*2)-e)}function ap(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function cp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function lp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function up(i,e){return i+Math.random()*(e-i)}function hp(i){return i*(.5-Math.random())}function dp(i){i!==void 0&&(Zl=i);let e=Zl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function fp(i){return i*ur}function pp(i){return i*Ns}function mp(i){return(i&i-1)===0&&i!==0}function gp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _p(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xp(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),p=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*h,l*f,a*c);break;case"YZY":i.set(l*f,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*f,a*u,a*c);break;case"XZX":i.set(a*u,l*p,l*d,a*c);break;case"YXY":i.set(l*d,a*u,l*p,a*c);break;case"ZYZ":i.set(l*p,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const br={DEG2RAD:ur,RAD2DEG:Ns,generateUUID:En,clamp:Je,euclideanModulo:cl,mapLinear:ip,inverseLerp:sp,lerp:hr,damp:rp,pingpong:op,smoothstep:ap,smootherstep:cp,randInt:lp,randFloat:up,randFloatSpread:hp,seededRandom:dp,degToRad:fp,radToDeg:pp,isPowerOfTwo:mp,ceilPowerOfTwo:gp,floorPowerOfTwo:_p,setQuaternionFromProperEuler:xp,normalize:ft,denormalize:Pn};class be{constructor(e=0,t=0){be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class sn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3];const f=r[o+0],d=r[o+1],p=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=p,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==p){let g=1-a;const m=l*f+c*d+u*p+h*_,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const T=Math.sqrt(y),b=Math.atan2(T,m*v);g=Math.sin(g*b)/T,a=Math.sin(a*b)/T}const x=a*v;if(l=l*g+f*x,c=c*g+d*x,u=u*g+p*x,h=h*g+_*x,g===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+u*h+l*d-c*f,e[t+1]=l*p+u*f+c*h-a*d,e[t+2]=c*p+u*d+a*f-l*h,e[t+3]=u*p-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),h=a(r/2),f=l(n/2),d=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ea.copy(this).projectOnVector(e),this.sub(ea)}reflect(e){return this.sub(ea.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ea=new R,Jl=new sn;class Ye{constructor(e,t,n,s,r,o,a,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],p=n[8],_=s[0],g=s[3],m=s[6],v=s[1],y=s[4],x=s[7],T=s[2],b=s[5],A=s[8];return r[0]=o*_+a*v+l*T,r[3]=o*g+a*y+l*b,r[6]=o*m+a*x+l*A,r[1]=c*_+u*v+h*T,r[4]=c*g+u*y+h*b,r[7]=c*m+u*x+h*A,r[2]=f*_+d*v+p*T,r[5]=f*g+d*y+p*b,r[8]=f*m+d*x+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,p=t*h+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=h*_,e[1]=(s*c-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ta.makeScale(e,t)),this}rotate(e){return this.premultiply(ta.makeRotation(-e)),this}translate(e,t){return this.premultiply(ta.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ta=new Ye;function Yh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vp(){const i=Tr("canvas");return i.style.display="block",i}const Ql={};function Er(i){i in Ql||(Ql[i]=!0,console.warn(i))}function yp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const eu=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tu=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mp(){const i={enabled:!0,workingColorSpace:Ot,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===xt&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===xt&&(s.r=As(s.r),s.g=As(s.g),s.b=As(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Po:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Er("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Er("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ot]:{primaries:e,whitePoint:n,transfer:Po,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),i}const ot=Mp();function li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function As(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let es;class Sp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{es===void 0&&(es=Tr("canvas")),es.width=e.width,es.height=e.height;const s=es.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=es}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Tr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=li(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(li(t[n]/255)*255):t[n]=li(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bp=0;class ll{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=En(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(na(s[o].image)):r.push(na(s[o]))}else r=na(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function na(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tp=0;const ia=new R;class kt extends Hs{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=Mi,s=Mi,r=mn,o=oi,a=Tn,l=Wn,c=kt.DEFAULT_ANISOTROPY,u=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=En(),this.name="",this.source=new ll(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ia).x}get height(){return this.source.getSize(ia).y}get depth(){return this.source.getSize(ia).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qi:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case Co:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qi:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case Co:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Oh;kt.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,s=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(d+1)/2,T=(m+1)/2,b=(u+f)/4,A=(h+_)/4,w=(p+g)/4;return y>x&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=b/n,r=A/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=b/s,r=w/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=w/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(h-_)/v,this.z=(f-u)/v,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ep extends Hs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new kt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ll(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Ep{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jh extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class wp extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Br.subVectors(this.max,Ys),ts.subVectors(e.a,Ys),ns.subVectors(e.b,Ys),is.subVectors(e.c,Ys),fi.subVectors(ns,ts),pi.subVectors(is,ns),Ri.subVectors(ts,is);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Ri.z,Ri.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Ri.z,0,-Ri.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Ri.y,Ri.x,0];return!sa(t,ts,ns,is,Br)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,ts,ns,is,Br))?!1:(kr.crossVectors(fi,pi),t=[kr.x,kr.y,kr.z],sa(t,ts,ns,is,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new R,new R,new R,new R,new R,new R,new R,new R],wn=new R,Or=new Nn,ts=new R,ns=new R,is=new R,fi=new R,pi=new R,Ri=new R,Ys=new R,Br=new R,kr=new R,Ci=new R;function sa(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ci.fromArray(i,r);const a=s.x*Math.abs(Ci.x)+s.y*Math.abs(Ci.y)+s.z*Math.abs(Ci.z),l=e.dot(Ci),c=t.dot(Ci),u=n.dot(Ci);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ap=new Nn,js=new R,ra=new R;class Un{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ap.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;js.subVectors(e,this.center);const t=js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(js,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ra.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(js.copy(e.center).add(ra)),this.expandByPoint(js.copy(e.center).sub(ra))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Kn=new R,oa=new R,zr=new R,mi=new R,aa=new R,Hr=new R,ca=new R;class Vo{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){oa.copy(e).add(t).multiplyScalar(.5),zr.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(oa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(zr),a=mi.dot(this.direction),l=-mi.dot(zr),c=mi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,p;if(u>0)if(h=o*l-a,f=o*a-l,p=r*u,h>=0)if(f>=-p)if(f<=p){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(oa).addScaledVector(zr,f),d}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,s,r){aa.subVectors(t,e),Hr.subVectors(n,e),ca.crossVectors(aa,Hr);let o=this.direction.dot(ca),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,e);const l=a*this.direction.dot(Hr.crossVectors(mi,Hr));if(l<0)return null;const c=a*this.direction.dot(aa.cross(mi));if(c<0||l+c>o)return null;const u=-a*mi.dot(ca);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(e,t,n,s,r,o,a,l,c,u,h,f,d,p,_,g){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,h,f,d,p,_,g)}set(e,t,n,s,r,o,a,l,c,u,h,f,d,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ss.setFromMatrixColumn(e,0).length(),r=1/ss.setFromMatrixColumn(e,1).length(),o=1/ss.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*u,d=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+p*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=p+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,p=c*u,_=c*h;t[0]=f+_*a,t[4]=p*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-p,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,p=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,p=a*u,_=a*h;t[0]=l*u,t[4]=p*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=p*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+p,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,d=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-p,t[2]=p*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rp,e,Cp)}lookAt(e,t,n){const s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),gi.crossVectors(n,dn),gi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),gi.crossVectors(n,dn)),gi.normalize(),Vr.crossVectors(dn,gi),s[0]=gi.x,s[4]=Vr.x,s[8]=dn.x,s[1]=gi.y,s[5]=Vr.y,s[9]=dn.y,s[2]=gi.z,s[6]=Vr.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],y=n[7],x=n[11],T=n[15],b=s[0],A=s[4],w=s[8],M=s[12],S=s[1],P=s[5],F=s[9],U=s[13],O=s[2],V=s[6],L=s[10],z=s[14],k=s[3],G=s[7],$=s[11],se=s[15];return r[0]=o*b+a*S+l*O+c*k,r[4]=o*A+a*P+l*V+c*G,r[8]=o*w+a*F+l*L+c*$,r[12]=o*M+a*U+l*z+c*se,r[1]=u*b+h*S+f*O+d*k,r[5]=u*A+h*P+f*V+d*G,r[9]=u*w+h*F+f*L+d*$,r[13]=u*M+h*U+f*z+d*se,r[2]=p*b+_*S+g*O+m*k,r[6]=p*A+_*P+g*V+m*G,r[10]=p*w+_*F+g*L+m*$,r[14]=p*M+_*U+g*z+m*se,r[3]=v*b+y*S+x*O+T*k,r[7]=v*A+y*P+x*V+T*G,r[11]=v*w+y*F+x*L+T*$,r[15]=v*M+y*U+x*z+T*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+r*l*h-s*c*h-r*a*f+n*c*f+s*a*d-n*l*d)+_*(+t*l*d-t*c*f+r*o*f-s*o*d+s*c*u-r*l*u)+g*(+t*c*h-t*a*d-r*o*h+n*o*d+r*a*u-n*c*u)+m*(-s*a*u-t*l*h+t*a*f+s*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=h*g*c-_*f*c+_*l*d-a*g*d-h*l*m+a*f*m,y=p*f*c-u*g*c-p*l*d+o*g*d+u*l*m-o*f*m,x=u*_*c-p*h*c+p*a*d-o*_*d-u*a*m+o*h*m,T=p*h*l-u*_*l-p*a*f+o*_*f+u*a*g-o*h*g,b=t*v+n*y+s*x+r*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=v*A,e[1]=(_*f*r-h*g*r-_*s*d+n*g*d+h*s*m-n*f*m)*A,e[2]=(a*g*r-_*l*r+_*s*c-n*g*c-a*s*m+n*l*m)*A,e[3]=(h*l*r-a*f*r-h*s*c+n*f*c+a*s*d-n*l*d)*A,e[4]=y*A,e[5]=(u*g*r-p*f*r+p*s*d-t*g*d-u*s*m+t*f*m)*A,e[6]=(p*l*r-o*g*r-p*s*c+t*g*c+o*s*m-t*l*m)*A,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*d+t*l*d)*A,e[8]=x*A,e[9]=(p*h*r-u*_*r-p*n*d+t*_*d+u*n*m-t*h*m)*A,e[10]=(o*_*r-p*a*r+p*n*c-t*_*c-o*n*m+t*a*m)*A,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*d-t*a*d)*A,e[12]=T*A,e[13]=(u*_*s-p*h*s+p*n*f-t*_*f-u*n*g+t*h*g)*A,e[14]=(p*a*s-o*_*s-p*n*l+t*_*l+o*n*g-t*a*g)*A,e[15]=(o*h*s-u*a*s+u*n*l-t*h*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,p=r*h,_=o*u,g=o*h,m=a*h,v=l*c,y=l*u,x=l*h,T=n.x,b=n.y,A=n.z;return s[0]=(1-(_+m))*T,s[1]=(d+x)*T,s[2]=(p-y)*T,s[3]=0,s[4]=(d-x)*b,s[5]=(1-(f+m))*b,s[6]=(g+v)*b,s[7]=0,s[8]=(p+y)*A,s[9]=(g-v)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ss.set(s[0],s[1],s[2]).length();const o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],An.copy(this);const c=1/r,u=1/o,h=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=u,An.elements[5]*=u,An.elements[6]*=u,An.elements[8]*=h,An.elements[9]*=h,An.elements[10]*=h,t.setFromRotationMatrix(An),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Gn,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===Gn)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Lo)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Gn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s);let p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===Gn)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Lo)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ss=new R,An=new Xe,Rp=new R(0,0,0),Cp=new R(1,1,1),gi=new R,Vr=new R,dn=new R,nu=new Xe,iu=new sn;class Wt{constructor(e=0,t=0,n=0,s=Wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return iu.setFromEuler(this),this.setFromQuaternion(iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wt.DEFAULT_ORDER="XYZ";class Kh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Pp=0;const su=new R,rs=new sn,Zn=new Xe,Gr=new R,Ks=new R,Lp=new R,Ip=new sn,ru=new R(1,0,0),ou=new R(0,1,0),au=new R(0,0,1),cu={type:"added"},Dp={type:"removed"},os={type:"childadded",child:null},la={type:"childremoved",child:null};class St extends Hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new R,t=new Wt,n=new sn,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new Ye}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(ru,e)}rotateY(e){return this.rotateOnAxis(ou,e)}rotateZ(e){return this.rotateOnAxis(au,e)}translateOnAxis(e,t){return su.copy(e).applyQuaternion(this.quaternion),this.position.add(su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ru,e)}translateY(e){return this.translateOnAxis(ou,e)}translateZ(e){return this.translateOnAxis(au,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Gr.copy(e):Gr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Ks,Gr,this.up):Zn.lookAt(Gr,Ks,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Zn),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cu),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dp),la.child=e,this.dispatchEvent(la),la.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cu),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Lp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,Ip,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new R(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new R,Jn=new R,ua=new R,Qn=new R,as=new R,cs=new R,lu=new R,ha=new R,da=new R,fa=new R,pa=new ut,ma=new ut,ga=new ut;class Ln{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Rn.subVectors(e,t),s.cross(Rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Rn.subVectors(s,t),Jn.subVectors(n,t),ua.subVectors(e,t);const o=Rn.dot(Rn),a=Rn.dot(Jn),l=Rn.dot(ua),c=Jn.dot(Jn),u=Jn.dot(ua),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,p=(o*u-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Qn.x),l.addScaledVector(o,Qn.y),l.addScaledVector(a,Qn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return pa.setScalar(0),ma.setScalar(0),ga.setScalar(0),pa.fromBufferAttribute(e,t),ma.fromBufferAttribute(e,n),ga.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(pa,r.x),o.addScaledVector(ma,r.y),o.addScaledVector(ga,r.z),o}static isFrontFacing(e,t,n,s){return Rn.subVectors(n,t),Jn.subVectors(e,t),Rn.cross(Jn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Rn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Ln.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;as.subVectors(s,n),cs.subVectors(r,n),ha.subVectors(e,n);const l=as.dot(ha),c=cs.dot(ha);if(l<=0&&c<=0)return t.copy(n);da.subVectors(e,s);const u=as.dot(da),h=cs.dot(da);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(as,o);fa.subVectors(e,r);const d=as.dot(fa),p=cs.dot(fa);if(p>=0&&d<=p)return t.copy(r);const _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(cs,a);const g=u*p-d*h;if(g<=0&&h-u>=0&&d-p>=0)return lu.subVectors(r,s),a=(h-u)/(h-u+(d-p)),t.copy(s).addScaledVector(lu,a);const m=1/(g+_+f);return o=_*m,a=f*m,t.copy(n).addScaledVector(as,o).addScaledVector(cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function _a(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class me{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=cl(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=_a(o,r,e+1/3),this.g=_a(o,r,e),this.b=_a(o,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=Bt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const n=Zh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return ot.workingToColorSpace(qt.copy(this),e),Math.round(Je(qt.r*255,0,255))*65536+Math.round(Je(qt.g*255,0,255))*256+Math.round(Je(qt.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(qt.copy(this),t);const n=qt.r,s=qt.g,r=qt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Bt){ot.workingToColorSpace(qt.copy(this),e);const t=qt.r,n=qt.g,s=qt.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(Wr);const n=hr(_i.h,Wr.h,t),s=hr(_i.s,Wr.s,t),r=hr(_i.l,Wr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new me;me.NAMES=Zh;let Np=0;class Dn extends Hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=En(),this.name="",this.type="Material",this.blending=Gi,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tc,this.blendDst=nc,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new me(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tc&&(n.blendSrc=this.blendSrc),this.blendDst!==nc&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ai extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new R,Xr=new be;let Up=0;class ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Up++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hc,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xr.fromBufferAttribute(this,t),Xr.applyMatrix3(e),this.setXY(t,Xr.x,Xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hc&&(e.usage=this.usage),e}}class Jh extends ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Qh extends ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class it extends ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Fp=0;const yn=new Xe,xa=new St,ls=new R,fn=new Nn,Zs=new Nn,Vt=new R;class bt extends Hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yh(e)?Qh:Jh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return xa.lookAt(e),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new it(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Zs.setFromBufferAttribute(a),this.morphTargetsRelative?(Vt.addVectors(fn.min,Zs.min),fn.expandByPoint(Vt),Vt.addVectors(fn.max,Zs.max),fn.expandByPoint(Vt)):(fn.expandByPoint(Zs.min),fn.expandByPoint(Zs.max))}fn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Vt.fromBufferAttribute(a,c),l&&(ls.fromBufferAttribute(e,c),Vt.add(ls)),s=Math.max(s,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ht(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<n.count;w++)a[w]=new R,l[w]=new R;const c=new R,u=new R,h=new R,f=new be,d=new be,p=new be,_=new R,g=new R;function m(w,M,S){c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,S),f.fromBufferAttribute(r,w),d.fromBufferAttribute(r,M),p.fromBufferAttribute(r,S),u.sub(c),h.sub(c),d.sub(f),p.sub(f);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(P),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(P),a[w].add(_),a[M].add(_),a[S].add(_),l[w].add(g),l[M].add(g),l[S].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let w=0,M=v.length;w<M;++w){const S=v[w],P=S.start,F=S.count;for(let U=P,O=P+F;U<O;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const y=new R,x=new R,T=new R,b=new R;function A(w){T.fromBufferAttribute(s,w),b.copy(T);const M=a[w];y.copy(M),y.sub(T.multiplyScalar(T.dot(M))).normalize(),x.crossVectors(b,M);const P=x.dot(l[w])<0?-1:1;o.setXYZW(w,y.x,y.y,y.z,P)}for(let w=0,M=v.length;w<M;++w){const S=v[w],P=S.start,F=S.count;for(let U=P,O=P+F;U<O;U+=3)A(e.getX(U+0)),A(e.getX(U+1)),A(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new R,r=new R,o=new R,a=new R,l=new R,c=new R,u=new R,h=new R;if(e)for(let f=0,d=e.count;f<d;f+=3){const p=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let m=0;m<u;m++)f[p++]=c[d++]}return new ht(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uu=new Xe,Pi=new Vo,qr=new Un,hu=new R,$r=new R,Yr=new R,jr=new R,va=new R,Kr=new R,du=new R,Zr=new R;class He extends St{constructor(e=new bt,t=new ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Kr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(va.fromBufferAttribute(h,e),o?Kr.addScaledVector(va,u):Kr.addScaledVector(va.sub(t),u))}t.add(Kr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(r),Pi.copy(e.ray).recast(e.near),!(qr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(qr,hu)===null||Pi.origin.distanceToSquared(hu)>(e.far-e.near)**2))&&(uu.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(uu),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],v=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=v,T=y;x<T;x+=3){const b=a.getX(x),A=a.getX(x+1),w=a.getX(x+2);s=Jr(this,m,e,n,c,u,h,b,A,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const v=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);s=Jr(this,o,e,n,c,u,h,v,y,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],v=Math.max(g.start,d.start),y=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let x=v,T=y;x<T;x+=3){const b=x,A=x+1,w=x+2;s=Jr(this,m,e,n,c,u,h,b,A,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const v=g,y=g+1,x=g+2;s=Jr(this,o,e,n,c,u,h,v,y,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Op(i,e,t,n,s,r,o,a){let l;if(e.side===tn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===hi,a),l===null)return null;Zr.copy(a),Zr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Zr);return c<t.near||c>t.far?null:{distance:c,point:Zr.clone(),object:i}}function Jr(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,$r),i.getVertexPosition(l,Yr),i.getVertexPosition(c,jr);const u=Op(i,e,t,n,$r,Yr,jr,du);if(u){const h=new R;Ln.getBarycoord(du,$r,Yr,jr,h),s&&(u.uv=Ln.getInterpolatedAttribute(s,a,l,c,h,new be)),r&&(u.uv1=Ln.getInterpolatedAttribute(r,a,l,c,h,new be)),o&&(u.normal=Ln.getInterpolatedAttribute(o,a,l,c,h,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new R,materialIndex:0};Ln.getNormal($r,Yr,jr,f.normal),u.face=f,u.barycoord=h}return u}class gn extends bt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(h,2));function p(_,g,m,v,y,x,T,b,A,w,M){const S=x/A,P=T/w,F=x/2,U=T/2,O=b/2,V=A+1,L=w+1;let z=0,k=0;const G=new R;for(let $=0;$<L;$++){const se=$*P-U;for(let ye=0;ye<V;ye++){const fe=ye*S-F;G[_]=fe*v,G[g]=se*y,G[m]=O,c.push(G.x,G.y,G.z),G[_]=0,G[g]=0,G[m]=b>0?1:-1,u.push(G.x,G.y,G.z),h.push(ye/A),h.push(1-$/w),z+=1}}for(let $=0;$<w;$++)for(let se=0;se<A;se++){const ye=f+se+V*$,fe=f+se+V*($+1),Ce=f+(se+1)+V*($+1),Le=f+(se+1)+V*$;l.push(ye,fe,Le),l.push(fe,Ce,Le),k+=6}a.addGroup(d,k,M),d+=k,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Us(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Zt(i){const e={};for(let t=0;t<i.length;t++){const n=Us(i[t]);for(const s in n)e[s]=n[s]}return e}function Bp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ed(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const kp={clone:Us,merge:Zt};var zp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zp,this.fragmentShader=Hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=Bp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class td extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=Gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xi=new R,fu=new be,pu=new be;class en extends td{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ns*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,fu,pu),t.subVectors(pu,fu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ur*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const us=-90,hs=1;class Vp extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new en(us,hs,e,t);s.layers=this.layers,this.add(s);const r=new en(us,hs,e,t);r.layers=this.layers,this.add(r);const o=new en(us,hs,e,t);o.layers=this.layers,this.add(o);const a=new en(us,hs,e,t);a.layers=this.layers,this.add(a);const l=new en(us,hs,e,t);l.layers=this.layers,this.add(l);const c=new en(us,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class nd extends kt{constructor(e=[],t=Is,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gp extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new nd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gn(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:Us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Si});r.uniforms.tEquirect.value=t;const o=new He(s,r),a=t.minFilter;return t.minFilter===oi&&(t.minFilter=mn),new Vp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class yt extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wp={type:"move"};class ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class id extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Xp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Hc,this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new R;class ul{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ul(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const mu=new R,gu=new ut,_u=new ut,qp=new R,xu=new Xe,Qr=new R,Ma=new Un,vu=new Xe,Sa=new Vo;class $p extends He{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Xl,this.bindMatrix=new Xe,this.bindMatrixInverse=new Xe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qr),this.boundingBox.expandByPoint(Qr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qr),this.boundingSphere.expandByPoint(Qr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ma.copy(this.boundingSphere),Ma.applyMatrix4(s),e.ray.intersectsSphere(Ma)!==!1&&(vu.copy(s).invert(),Sa.copy(e.ray).applyMatrix4(vu),!(this.boundingBox!==null&&Sa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Sa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Xl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Wf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;gu.fromBufferAttribute(s.attributes.skinIndex,e),_u.fromBufferAttribute(s.attributes.skinWeight,e),mu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=_u.getComponent(r);if(o!==0){const a=gu.getComponent(r);xu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(qp.copy(mu).applyMatrix4(xu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class sd extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class rd extends kt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=nn,u=nn,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yu=new Xe,Yp=new Xe;class hl{constructor(e=[],t=[]){this.uuid=En(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Xe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Xe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Yp;yu.multiplyMatrices(a,t[r]),yu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new hl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new rd(t,e,e,Tn,In);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new sd),this.bones.push(o),this.boneInverses.push(new Xe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Vc extends ht{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ds=new Xe,Mu=new Xe,eo=[],Su=new Nn,jp=new Xe,Js=new He,Qs=new Un;class dr extends He{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),Su.copy(e.boundingBox).applyMatrix4(ds),this.boundingBox.union(Su)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ds),Qs.copy(e.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ds),Mu.multiplyMatrices(n,ds),Js.matrixWorld=Mu,Js.raycast(e,eo);for(let o=0,a=eo.length;o<a;o++){const l=eo[o];l.instanceId=r,l.object=this,t.push(l)}eo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rd(new Float32Array(s*this.count),s,this.count,il,In));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ba=new R,Kp=new R,Zp=new Ye;class Bi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ba.subVectors(n,t).cross(Kp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ba),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Zp.getNormalMatrix(e),s=this.coplanarPoint(ba).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Un,Jp=new be(.5,.5),to=new R;class dl{constructor(e=new Bi,t=new Bi,n=new Bi,s=new Bi,r=new Bi,o=new Bi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],p=r[8],_=r[9],g=r[10],m=r[11],v=r[12],y=r[13],x=r[14],T=r[15];if(s[0].setComponents(c-o,d-u,m-p,T-v).normalize(),s[1].setComponents(c+o,d+u,m+p,T+v).normalize(),s[2].setComponents(c+a,d+h,m+_,T+y).normalize(),s[3].setComponents(c-a,d-h,m-_,T-y).normalize(),n)s[4].setComponents(l,f,g,x).normalize(),s[5].setComponents(c-l,d-f,m-g,T-x).normalize();else if(s[4].setComponents(c-l,d-f,m-g,T-x).normalize(),t===Gn)s[5].setComponents(c+l,d+f,m+g,T+x).normalize();else if(t===Lo)s[5].setComponents(l,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=Jp.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(to.x=s.normal.x>0?e.max.x:e.min.x,to.y=s.normal.y>0?e.max.y:e.min.y,to.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class od extends Dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Io=new R,Do=new R,bu=new Xe,er=new Vo,no=new Un,Ta=new R,Tu=new R;class fl extends St{constructor(e=new bt,t=new od){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Io.fromBufferAttribute(t,s-1),Do.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Io.distanceTo(Do);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(s),no.radius+=r,e.ray.intersectsSphere(no)===!1)return;bu.copy(s).invert(),er.copy(e.ray).applyMatrix4(bu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=c){const m=u.getX(_),v=u.getX(_+1),y=io(this,e,er,l,m,v,_);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(p-1),g=u.getX(d),m=io(this,e,er,l,_,g,p-1);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=c){const m=io(this,e,er,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=io(this,e,er,l,p-1,d,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function io(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(Io.fromBufferAttribute(a,s),Do.fromBufferAttribute(a,r),t.distanceSqToSegment(Io,Do,Ta,Tu)>n)return;Ta.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ta);if(!(c<e.near||c>e.far))return{distance:c,point:Tu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Eu=new R,wu=new R;class Qp extends fl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Eu.fromBufferAttribute(t,s),wu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Eu.distanceTo(wu);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class em extends fl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ad extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Au=new Xe,Gc=new Vo,so=new Un,ro=new R;class cd extends St{constructor(e=new bt,t=new ad){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),so.radius+=r,e.ray.intersectsSphere(so)===!1)return;Au.copy(s).invert(),Gc.copy(e.ray).applyMatrix4(Au);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let p=f,_=d;p<_;p++){const g=c.getX(p);ro.fromBufferAttribute(h,g),Ru(ro,g,l,s,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=f,_=d;p<_;p++)ro.fromBufferAttribute(h,p),Ru(ro,p,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ru(i,e,t,n,s,r,o){const a=Gc.distanceSqToPoint(i);if(a<t){const l=new R;Gc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class pl extends kt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ld extends kt{constructor(e,t,n=$i,s,r,o,a=nn,l=nn,c,u=vr,h=1){if(u!==vr&&u!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ll(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ud extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cn extends bt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let p=0;const _=[],g=n/2;let m=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new it(h,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(d,2));function v(){const x=new R,T=new R;let b=0;const A=(t-e)/n;for(let w=0;w<=r;w++){const M=[],S=w/r,P=S*(t-e)+e;for(let F=0;F<=s;F++){const U=F/s,O=U*l+a,V=Math.sin(O),L=Math.cos(O);T.x=P*V,T.y=-S*n+g,T.z=P*L,h.push(T.x,T.y,T.z),x.set(V,A,L).normalize(),f.push(x.x,x.y,x.z),d.push(U,1-S),M.push(p++)}_.push(M)}for(let w=0;w<s;w++)for(let M=0;M<r;M++){const S=_[M][w],P=_[M+1][w],F=_[M+1][w+1],U=_[M][w+1];(e>0||M!==0)&&(u.push(S,P,U),b+=3),(t>0||M!==r-1)&&(u.push(P,F,U),b+=3)}c.addGroup(m,b,0),m+=b}function y(x){const T=p,b=new be,A=new R;let w=0;const M=x===!0?e:t,S=x===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,g*S,0),f.push(0,S,0),d.push(.5,.5),p++;const P=p;for(let F=0;F<=s;F++){const O=F/s*l+a,V=Math.cos(O),L=Math.sin(O);A.x=M*L,A.y=g*S,A.z=M*V,h.push(A.x,A.y,A.z),f.push(0,S,0),b.x=V*.5+.5,b.y=L*.5*S+.5,d.push(b.x,b.y),p++}for(let F=0;F<s;F++){const U=T+F,O=P+F;x===!0?u.push(O,O+1,U):u.push(O+1,O,U),w+=3}c.addGroup(m,w,x===!0?1:2),m+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class No extends cn{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new No(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ml extends bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(r.slice(),3)),this.setAttribute("uv",new it(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new R,x=new R,T=new R;for(let b=0;b<t.length;b+=3)d(t[b+0],y),d(t[b+1],x),d(t[b+2],T),l(y,x,T,v)}function l(v,y,x,T){const b=T+1,A=[];for(let w=0;w<=b;w++){A[w]=[];const M=v.clone().lerp(x,w/b),S=y.clone().lerp(x,w/b),P=b-w;for(let F=0;F<=P;F++)F===0&&w===b?A[w][F]=M:A[w][F]=M.clone().lerp(S,F/P)}for(let w=0;w<b;w++)for(let M=0;M<2*(b-w)-1;M++){const S=Math.floor(M/2);M%2===0?(f(A[w][S+1]),f(A[w+1][S]),f(A[w][S])):(f(A[w][S+1]),f(A[w+1][S+1]),f(A[w+1][S]))}}function c(v){const y=new R;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(v),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function u(){const v=new R;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const x=g(v)/2/Math.PI+.5,T=m(v)/Math.PI+.5;o.push(x,1-T)}p(),h()}function h(){for(let v=0;v<o.length;v+=6){const y=o[v+0],x=o[v+2],T=o[v+4],b=Math.max(y,x,T),A=Math.min(y,x,T);b>.9&&A<.1&&(y<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,y){const x=v*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function p(){const v=new R,y=new R,x=new R,T=new R,b=new be,A=new be,w=new be;for(let M=0,S=0;M<r.length;M+=9,S+=6){v.set(r[M+0],r[M+1],r[M+2]),y.set(r[M+3],r[M+4],r[M+5]),x.set(r[M+6],r[M+7],r[M+8]),b.set(o[S+0],o[S+1]),A.set(o[S+2],o[S+3]),w.set(o[S+4],o[S+5]),T.copy(v).add(y).add(x).divideScalar(3);const P=g(T);_(b,S+0,v,P),_(A,S+2,y,P),_(w,S+4,x,P)}}function _(v,y,x,T){T<0&&v.x===1&&(o[y]=v.x-1),x.x===0&&x.z===0&&(o[y]=T/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ml(e.vertices,e.indices,e.radius,e.details)}}class Xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new be:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,s=[],r=[],o=[],a=new R,l=new Xe;for(let d=0;d<=e;d++){const p=d/e;s[d]=this.getTangentAt(p,new R)}r[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Je(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Je(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class gl extends Xn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new be){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class tm extends gl{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function _l(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const oo=new R,Ea=new _l,wa=new _l,Aa=new _l;class Go extends Xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new R){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(oo.subVectors(s[0],s[1]).add(s[0]),c=oo);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(oo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=oo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Ea.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,p,_,g),wa.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,p,_,g),Aa.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,p,_,g)}else this.curveType==="catmullrom"&&(Ea.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),wa.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Aa.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Ea.calc(l),wa.calc(l),Aa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Cu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function nm(i,e){const t=1-i;return t*t*e}function im(i,e){return 2*(1-i)*i*e}function sm(i,e){return i*i*e}function fr(i,e,t,n){return nm(i,e)+im(i,t)+sm(i,n)}function rm(i,e){const t=1-i;return t*t*t*e}function om(i,e){const t=1-i;return 3*t*t*i*e}function am(i,e){return 3*(1-i)*i*i*e}function cm(i,e){return i*i*i*e}function pr(i,e,t,n,s){return rm(i,e)+om(i,t)+am(i,n)+cm(i,s)}class hd extends Xn{constructor(e=new be,t=new be,n=new be,s=new be){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new be){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(pr(e,s.x,r.x,o.x,a.x),pr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class lm extends Xn{constructor(e=new R,t=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new R){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(pr(e,s.x,r.x,o.x,a.x),pr(e,s.y,r.y,o.y,a.y),pr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class dd extends Xn{constructor(e=new be,t=new be){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new be){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new be){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class um extends Xn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fd extends Xn{constructor(e=new be,t=new be,n=new be){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new be){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(fr(e,s.x,r.x,o.x),fr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pd extends Xn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(fr(e,s.x,r.x,o.x),fr(e,s.y,r.y,o.y),fr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xl extends Xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new be){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(Cu(a,l.x,c.x,u.x,h.x),Cu(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new be().fromArray(s))}return this}}var Wc=Object.freeze({__proto__:null,ArcCurve:tm,CatmullRomCurve3:Go,CubicBezierCurve:hd,CubicBezierCurve3:lm,EllipseCurve:gl,LineCurve:dd,LineCurve3:um,QuadraticBezierCurve:fd,QuadraticBezierCurve3:pd,SplineCurve:xl});class hm extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Wc[s.type]().fromJSON(s))}return this}}class Xc extends hm{constructor(e){super(),this.type="Path",this.currentPoint=new be,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new dd(this.currentPoint.clone(),new be(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new fd(this.currentPoint.clone(),new be(e,t),new be(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new hd(this.currentPoint.clone(),new be(e,t),new be(n,s),new be(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new xl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new gl(e,t,n,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class md extends Xc{constructor(e){super(e),this.uuid=En(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Xc().fromJSON(s))}return this}}function dm(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=gd(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=_m(i,e,r,t)),i.length>80*t){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=t;f<s;f+=t){const d=i[f],p=i[f+1];d<a&&(a=d),p<l&&(l=p),d>u&&(u=d),p>h&&(h=p)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return wr(r,o,t,a,l,c,0),o}function gd(i,e,t,n,s){let r;if(s===Rm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Pu(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Pu(o/n|0,i[o],i[o+1],r);return r&&Fs(r,r.next)&&(Rr(r),r=r.next),r}function ji(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Fs(t,t.next)||wt(t.prev,t,t.next)===0)){if(Rr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function wr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Sm(i,n,s,r);let a=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?pm(i,n,s,r):fm(i)){e.push(l.i,i.i,c.i),Rr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=mm(ji(i),e),wr(i,e,t,n,s,r,2)):o===2&&gm(i,e,t,n,s,r):wr(ji(i),e,t,n,s,r,1);break}}}function fm(i){const e=i.prev,t=i,n=i.next;if(wt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=Math.min(s,r,o),h=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c);let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&ar(s,a,r,l,o,c,p.x,p.y)&&wt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function pm(i,e,t,n){const s=i.prev,r=i,o=i.next;if(wt(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,f=o.y,d=Math.min(a,l,c),p=Math.min(u,h,f),_=Math.max(a,l,c),g=Math.max(u,h,f),m=qc(d,p,e,t,n),v=qc(_,g,e,t,n);let y=i.prevZ,x=i.nextZ;for(;y&&y.z>=m&&x&&x.z<=v;){if(y.x>=d&&y.x<=_&&y.y>=p&&y.y<=g&&y!==s&&y!==o&&ar(a,u,l,h,c,f,y.x,y.y)&&wt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&ar(a,u,l,h,c,f,x.x,x.y)&&wt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=m;){if(y.x>=d&&y.x<=_&&y.y>=p&&y.y<=g&&y!==s&&y!==o&&ar(a,u,l,h,c,f,y.x,y.y)&&wt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=v;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&ar(a,u,l,h,c,f,x.x,x.y)&&wt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function mm(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Fs(n,s)&&xd(n,t,t.next,s)&&Ar(n,s)&&Ar(s,n)&&(e.push(n.i,t.i,s.i),Rr(t),Rr(t.next),t=i=s),t=t.next}while(t!==i);return ji(t)}function gm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Em(o,a)){let l=vd(o,a);o=ji(o,o.next),l=ji(l,l.next),wr(o,e,t,n,s,r,0),wr(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function _m(i,e,t,n){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=gd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Tm(c))}s.sort(xm);for(let r=0;r<s.length;r++)t=vm(s[r],t);return t}function xm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function vm(i,e){const t=ym(i,e);if(!t)return e;const n=vd(t,i);return ji(n,n.next),ji(t,t.next)}function ym(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,o;if(Fs(i,t))return t;do{if(Fs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&_d(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);Ar(t,i)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&Mm(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function Mm(i,e){return wt(i.prev,i,e.prev)<0&&wt(e.next,i,i.next)<0}function Sm(i,e,t,n){let s=i;do s.z===0&&(s.z=qc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,bm(s)}function bm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function qc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Tm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function _d(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function ar(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&_d(i,e,t,n,s,r,o,a)}function Em(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!wm(i,e)&&(Ar(i,e)&&Ar(e,i)&&Am(i,e)&&(wt(i.prev,i,e.prev)||wt(i,e.prev,e))||Fs(i,e)&&wt(i.prev,i,i.next)>0&&wt(e.prev,e,e.next)>0)}function wt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Fs(i,e){return i.x===e.x&&i.y===e.y}function xd(i,e,t,n){const s=co(wt(i,e,t)),r=co(wt(i,e,n)),o=co(wt(t,n,i)),a=co(wt(t,n,e));return!!(s!==r&&o!==a||s===0&&ao(i,t,e)||r===0&&ao(i,n,e)||o===0&&ao(t,i,n)||a===0&&ao(t,e,n))}function ao(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function co(i){return i>0?1:i<0?-1:0}function wm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&xd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ar(i,e){return wt(i.prev,i,i.next)<0?wt(i,e,i.next)>=0&&wt(i,i.prev,e)>=0:wt(i,e,i.prev)<0||wt(i,i.next,e)<0}function Am(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function vd(i,e){const t=$c(i.i,i.x,i.y),n=$c(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Pu(i,e,t,n){const s=$c(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Rr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $c(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Rm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Cm{static triangulate(e,t,n=2){return dm(e,t,n)}}class Rs{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Rs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Lu(e),Iu(n,e);let o=e.length;t.forEach(Lu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Iu(n,t[l]);const a=Cm.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Lu(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Iu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Wo extends ml{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wo(e.radius,e.detail)}}class vl extends bt{constructor(e=[new be(0,-.5),new be(.5,0),new be(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Je(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],u=1/t,h=new R,f=new be,d=new R,p=new R,_=new R;let g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,d.x=m*1,d.y=-g,d.z=m*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(p)}for(let v=0;v<=t;v++){const y=n+v*u*s,x=Math.sin(y),T=Math.cos(y);for(let b=0;b<=e.length-1;b++){h.x=e[b].x*x,h.y=e[b].y,h.z=e[b].x*T,o.push(h.x,h.y,h.z),f.x=v/t,f.y=b/(e.length-1),a.push(f.x,f.y);const A=l[3*b+0]*x,w=l[3*b+1],M=l[3*b+0]*T;c.push(A,w,M)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){const x=y+v*e.length,T=x,b=x+e.length,A=x+e.length+1,w=x+1;r.push(T,b,w),r.push(A,w,b)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("uv",new it(a,2)),this.setAttribute("normal",new it(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vl(e.points,e.segments,e.phiStart,e.phiLength)}}class Cn extends bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,h=e/a,f=t/l,d=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const v=m*f-o;for(let y=0;y<c;y++){const x=y*h-r;p.push(x,-v,0),_.push(0,0,1),g.push(y/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const y=v+c*m,x=v+c*(m+1),T=v+1+c*(m+1),b=v+1+c*m;d.push(y,x,b),d.push(x,T,b)}this.setIndex(d),this.setAttribute("position",new it(p,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.width,e.height,e.widthSegments,e.heightSegments)}}class yl extends bt{constructor(e=new md([new be(0,.5),new be(-.5,-.5),new be(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new it(s,3)),this.setAttribute("normal",new it(r,3)),this.setAttribute("uv",new it(o,2));function c(u){const h=s.length/3,f=u.extractPoints(t);let d=f.shape;const p=f.holes;Rs.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];Rs.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=Rs.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];d=d.concat(v)}for(let g=0,m=d.length;g<m;g++){const v=d[g];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],y=v[0]+h,x=v[1]+h,T=v[2]+h;n.push(y,x,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Pm(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new yl(n,e.curveSegments)}}function Pm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Xo extends bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new R,f=new R,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],y=m/n;let x=0;m===0&&o===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){const b=T/t;h.x=-e*Math.cos(s+b*r)*Math.sin(o+y*a),h.y=e*Math.cos(o+y*a),h.z=e*Math.sin(s+b*r)*Math.sin(o+y*a),p.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),g.push(b+x,1-y),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const y=u[m][v+1],x=u[m][v],T=u[m+1][v],b=u[m+1][v+1];(m!==0||o>0)&&d.push(y,x,b),(m!==n-1||l<Math.PI)&&d.push(x,T,b)}this.setIndex(d),this.setAttribute("position",new it(p,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ui extends bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new R,h=new R,f=new R;for(let d=0;d<=n;d++)for(let p=0;p<=s;p++){const _=p/s*r,g=d/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(p/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let p=1;p<=s;p++){const _=(s+1)*d+p-1,g=(s+1)*(d-1)+p-1,m=(s+1)*(d-1)+p,v=(s+1)*d+p;o.push(_,g,v),o.push(g,m,v)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ml extends bt{constructor(e=new pd(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new be;let u=new R;const h=[],f=[],d=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new it(h,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(d,2));function _(){for(let y=0;y<t;y++)g(y);g(r===!1?t:0),v(),m()}function g(y){u=e.getPointAt(y/t,u);const x=o.normals[y],T=o.binormals[y];for(let b=0;b<=s;b++){const A=b/s*Math.PI*2,w=Math.sin(A),M=-Math.cos(A);l.x=M*x.x+w*T.x,l.y=M*x.y+w*T.y,l.z=M*x.z+w*T.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function m(){for(let y=1;y<=t;y++)for(let x=1;x<=s;x++){const T=(s+1)*(y-1)+(x-1),b=(s+1)*y+(x-1),A=(s+1)*y+x,w=(s+1)*(y-1)+x;p.push(T,b,w),p.push(b,A,w)}}function v(){for(let y=0;y<=t;y++)for(let x=0;x<=s;x++)c.x=y/t,c.y=x/s,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ml(new Wc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class It extends Dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=al,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qn extends It{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Lm extends Dn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=al,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Im extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$f,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dm extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function lo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Nm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Um(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Du(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function yd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class Ir{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Fm extends Ir{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ql,endingEnd:ql}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case $l:r=e,a=2*t-n;break;case Yl:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $l:o=e,l=2*n-t;break;case Yl:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),_=p*p,g=_*p,m=-f*g+2*f*_-f*p,v=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*p+1,y=(-1-d)*g+(1.5+d)*_+.5*p,x=d*g-d*_;for(let T=0;T!==a;++T)r[T]=m*o[u+T]+v*o[c+T]+y*o[l+T]+x*o[h+T];return r}}class Om extends Ir{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[c+f]*h+o[l+f]*u;return r}}class Bm extends Ir{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=lo(t,this.TimeBufferType),this.values=lo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:lo(e.times,Array),values:lo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Om(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Mr:t=this.InterpolantFactoryMethodDiscrete;break;case Sr:t=this.InterpolantFactoryMethodLinear;break;case Qo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Mr;case this.InterpolantFactoryMethodLinear:return Sr;case this.InterpolantFactoryMethodSmooth:return Qo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&Nm(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Qo,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{const h=a*n,f=h-n,d=h+n;for(let p=0;p!==n;++p){const _=t[h+p];if(_!==t[f+p]||_!==t[d+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Fn.prototype.ValueTypeName="";Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=Sr;class Vs extends Fn{constructor(e,t,n){super(e,t,n)}}Vs.prototype.ValueTypeName="bool";Vs.prototype.ValueBufferType=Array;Vs.prototype.DefaultInterpolation=Mr;Vs.prototype.InterpolantFactoryMethodLinear=void 0;Vs.prototype.InterpolantFactoryMethodSmooth=void 0;class Md extends Fn{constructor(e,t,n,s){super(e,t,n,s)}}Md.prototype.ValueTypeName="color";class Os extends Fn{constructor(e,t,n,s){super(e,t,n,s)}}Os.prototype.ValueTypeName="number";class km extends Ir{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t);let c=e*a;for(let u=c+a;c!==u;c+=4)sn.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Bs extends Fn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new km(this.times,this.values,this.getValueSize(),e)}}Bs.prototype.ValueTypeName="quaternion";Bs.prototype.InterpolantFactoryMethodSmooth=void 0;class Gs extends Fn{constructor(e,t,n){super(e,t,n)}}Gs.prototype.ValueTypeName="string";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=Mr;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class ks extends Fn{constructor(e,t,n,s){super(e,t,n,s)}}ks.prototype.ValueTypeName="vector";class zm{constructor(e="",t=-1,n=[],s=Xf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=En(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Vm(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=Um(l);l=Du(l,1,u),c=Du(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Os(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let f=s[h];f||(s[h]=f=[]),f.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,p,_){if(d.length!==0){const g=[],m=[];yd(d,g,m,p),g.length!==0&&_.push(new h(f,g,m))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let _=0;_<f[p].morphTargets.length;_++)d[f[p].morphTargets[_]]=-1;for(const _ in d){const g=[],m=[];for(let v=0;v!==f[p].morphTargets.length;++v){const y=f[p];g.push(y.time),m.push(y.morphTarget===_?1:0)}s.push(new Os(".morphTargetInfluence["+_+"]",g,m))}l=d.length*o}else{const d=".bones["+t[h].name+"]";n(ks,d+".position",f,"pos",s),n(Bs,d+".quaternion",f,"rot",s),n(ks,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Hm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Os;case"vector":case"vector2":case"vector3":case"vector4":return ks;case"color":return Md;case"quaternion":return Bs;case"bool":case"boolean":return Vs;case"string":return Gs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Vm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Hm(i.type);if(i.times===void 0){const t=[],n=[];yd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const ci={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Gm{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Wm=new Gm;class Ws{constructor(e){this.manager=e!==void 0?e:Wm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ws.DEFAULT_MATERIAL_NAME="__DEFAULT";const ei={};class Xm extends Error{constructor(e,t){super(e),this.response=t}}class Sd extends Ws{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ci.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ei[e]!==void 0){ei[e].push({onLoad:t,onProgress:n,onError:s});return}ei[e]=[],ei[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=ei[e],h=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){h.read().then(({done:y,value:x})=>{if(y)m.close();else{_+=x.byteLength;const T=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let b=0,A=u.length;b<A;b++){const w=u[b];w.onProgress&&w.onProgress(T)}m.enqueue(x),v()}},y=>{m.error(y)})}}});return new Response(g)}else throw new Xm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{ci.add(`file:${e}`,c);const u=ei[e];delete ei[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=ei[e];if(u===void 0)throw this.manager.itemError(e),c;delete ei[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const fs=new WeakMap;class qm extends Ws{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ci.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=fs.get(o);h===void 0&&(h=[],fs.set(o,h)),h.push({onLoad:t,onError:s})}return o}const a=Tr("img");function l(){u(),t&&t(this);const h=fs.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}fs.delete(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),ci.remove(`image:${e}`);const f=fs.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(h)}fs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ci.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class $m extends Ws{constructor(e){super(e)}load(e,t,n,s){const r=new kt,o=new qm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class qo extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new me(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ym extends qo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new me(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ra=new Xe,Nu=new R,Uu=new R;class Sl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=Wn,this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dl,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Nu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nu),Uu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Uu),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class jm extends Sl{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ns*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Km extends qo{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new jm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fu=new Xe,tr=new R,Ca=new R;class Zm extends Sl{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new be(4,2),this._viewportCount=6,this._viewports=[new ut(2,1,1,1),new ut(0,1,1,1),new ut(3,1,1,1),new ut(1,1,1,1),new ut(3,0,1,1),new ut(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),tr.setFromMatrixPosition(e.matrixWorld),n.position.copy(tr),Ca.copy(n.position),Ca.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ca),n.updateMatrixWorld(),s.makeTranslation(-tr.x,-tr.y,-tr.z),Fu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fu,n.coordinateSystem,n.reversedDepth)}}class Ms extends qo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Zm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class bl extends td{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Jm extends Sl{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bd extends qo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Jm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Pa=new WeakMap;class Qm extends Ws{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ci.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(Pa.has(o)===!0)s&&s(Pa.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ci.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Pa.set(l,c),ci.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ci.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class e0 extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Tl="\\[\\]\\.:\\/",t0=new RegExp("["+Tl+"]","g"),El="[^"+Tl+"]",n0="[^"+Tl.replace("\\.","")+"]",i0=/((?:WC+[\/:])*)/.source.replace("WC",El),s0=/(WCOD+)?/.source.replace("WCOD",n0),r0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",El),o0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",El),a0=new RegExp("^"+i0+s0+r0+o0+"$"),c0=["material","materials","bones","map"];class l0{constructor(e,t,n){const s=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class pt{constructor(e,t,n){this.path=t,this.parsedPath=n||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,n):new pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(t0,"")}static parseTrackName(e){const t=a0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);c0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[s];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=l0;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Ou(i,e,t,n){const s=u0(n);switch(t){case Gh:return i*e;case il:return i*e/s.components*s.byteLength;case sl:return i*e/s.components*s.byteLength;case Xh:return i*e*2/s.components*s.byteLength;case rl:return i*e*2/s.components*s.byteLength;case Wh:return i*e*3/s.components*s.byteLength;case Tn:return i*e*4/s.components*s.byteLength;case ol:return i*e*4/s.components*s.byteLength;case bo:case To:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Eo:case wo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fc:case mc:return Math.max(i,16)*Math.max(e,8)/4;case dc:case pc:return Math.max(i,8)*Math.max(e,8)/2;case gc:case _c:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Mc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case bc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case wc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Lc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ic:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Dc:case Nc:case Uc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fc:case Oc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Bc:case kc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function u0(i){switch(i){case Wn:case kh:return{byteLength:1,components:1};case _r:case zh:case Lr:return{byteLength:2,components:1};case tl:case nl:return{byteLength:2,components:4};case $i:case el:case In:return{byteLength:4,components:1};case Hh:case Vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Td(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function h0(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){const p=h[f],_=h[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){const _=h[d];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var d0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,f0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,p0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,m0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,g0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,x0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,v0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,M0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,S0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,b0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,T0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,E0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,w0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,A0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,R0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,L0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,I0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,D0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,N0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,U0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,F0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,O0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,B0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,k0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,z0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,H0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,V0="gl_FragColor = linearToOutputTexel( gl_FragColor );",G0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,W0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,X0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,q0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Y0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,j0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,K0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Z0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,J0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Q0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ng=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ig=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,rg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,og=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ug=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Eg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ng=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ug=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$g=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,t_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,r_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,o_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,u_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const h_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,d_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,__=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,x_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,v_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,M_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,S_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,I_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,D_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,G_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:d0,alphahash_pars_fragment:f0,alphamap_fragment:p0,alphamap_pars_fragment:m0,alphatest_fragment:g0,alphatest_pars_fragment:_0,aomap_fragment:x0,aomap_pars_fragment:v0,batching_pars_vertex:y0,batching_vertex:M0,begin_vertex:S0,beginnormal_vertex:b0,bsdfs:T0,iridescence_fragment:E0,bumpmap_pars_fragment:w0,clipping_planes_fragment:A0,clipping_planes_pars_fragment:R0,clipping_planes_pars_vertex:C0,clipping_planes_vertex:P0,color_fragment:L0,color_pars_fragment:I0,color_pars_vertex:D0,color_vertex:N0,common:U0,cube_uv_reflection_fragment:F0,defaultnormal_vertex:O0,displacementmap_pars_vertex:B0,displacementmap_vertex:k0,emissivemap_fragment:z0,emissivemap_pars_fragment:H0,colorspace_fragment:V0,colorspace_pars_fragment:G0,envmap_fragment:W0,envmap_common_pars_fragment:X0,envmap_pars_fragment:q0,envmap_pars_vertex:$0,envmap_physical_pars_fragment:sg,envmap_vertex:Y0,fog_vertex:j0,fog_pars_vertex:K0,fog_fragment:Z0,fog_pars_fragment:J0,gradientmap_pars_fragment:Q0,lightmap_pars_fragment:eg,lights_lambert_fragment:tg,lights_lambert_pars_fragment:ng,lights_pars_begin:ig,lights_toon_fragment:rg,lights_toon_pars_fragment:og,lights_phong_fragment:ag,lights_phong_pars_fragment:cg,lights_physical_fragment:lg,lights_physical_pars_fragment:ug,lights_fragment_begin:hg,lights_fragment_maps:dg,lights_fragment_end:fg,logdepthbuf_fragment:pg,logdepthbuf_pars_fragment:mg,logdepthbuf_pars_vertex:gg,logdepthbuf_vertex:_g,map_fragment:xg,map_pars_fragment:vg,map_particle_fragment:yg,map_particle_pars_fragment:Mg,metalnessmap_fragment:Sg,metalnessmap_pars_fragment:bg,morphinstance_vertex:Tg,morphcolor_vertex:Eg,morphnormal_vertex:wg,morphtarget_pars_vertex:Ag,morphtarget_vertex:Rg,normal_fragment_begin:Cg,normal_fragment_maps:Pg,normal_pars_fragment:Lg,normal_pars_vertex:Ig,normal_vertex:Dg,normalmap_pars_fragment:Ng,clearcoat_normal_fragment_begin:Ug,clearcoat_normal_fragment_maps:Fg,clearcoat_pars_fragment:Og,iridescence_pars_fragment:Bg,opaque_fragment:kg,packing:zg,premultiplied_alpha_fragment:Hg,project_vertex:Vg,dithering_fragment:Gg,dithering_pars_fragment:Wg,roughnessmap_fragment:Xg,roughnessmap_pars_fragment:qg,shadowmap_pars_fragment:$g,shadowmap_pars_vertex:Yg,shadowmap_vertex:jg,shadowmask_pars_fragment:Kg,skinbase_vertex:Zg,skinning_pars_vertex:Jg,skinning_vertex:Qg,skinnormal_vertex:e_,specularmap_fragment:t_,specularmap_pars_fragment:n_,tonemapping_fragment:i_,tonemapping_pars_fragment:s_,transmission_fragment:r_,transmission_pars_fragment:o_,uv_pars_fragment:a_,uv_pars_vertex:c_,uv_vertex:l_,worldpos_vertex:u_,background_vert:h_,background_frag:d_,backgroundCube_vert:f_,backgroundCube_frag:p_,cube_vert:m_,cube_frag:g_,depth_vert:__,depth_frag:x_,distanceRGBA_vert:v_,distanceRGBA_frag:y_,equirect_vert:M_,equirect_frag:S_,linedashed_vert:b_,linedashed_frag:T_,meshbasic_vert:E_,meshbasic_frag:w_,meshlambert_vert:A_,meshlambert_frag:R_,meshmatcap_vert:C_,meshmatcap_frag:P_,meshnormal_vert:L_,meshnormal_frag:I_,meshphong_vert:D_,meshphong_frag:N_,meshphysical_vert:U_,meshphysical_frag:F_,meshtoon_vert:O_,meshtoon_frag:B_,points_vert:k_,points_frag:z_,shadow_vert:H_,shadow_frag:V_,sprite_vert:G_,sprite_frag:W_},Te={common:{diffuse:{value:new me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new me(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},kn={basic:{uniforms:Zt([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Zt([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new me(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Zt([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new me(0)},specular:{value:new me(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Zt([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Zt([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new me(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Zt([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Zt([Te.points,Te.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Zt([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Zt([Te.common,Te.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Zt([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Zt([Te.sprite,Te.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Zt([Te.common,Te.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Zt([Te.lights,Te.fog,{color:{value:new me(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};kn.physical={uniforms:Zt([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new me(0)},specularColor:{value:new me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const uo={r:0,b:0,g:0},Ii=new Wt,X_=new Xe;function q_(i,e,t,n,s,r,o){const a=new me(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function p(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function _(y){let x=!1;const T=p(y);T===null?m(a,l):T&&T.isColor&&(m(T,1),x=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(y,x){const T=p(x);T&&(T.isCubeTexture||T.mapping===Ho)?(u===void 0&&(u=new He(new gn(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:Us(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ii.copy(x.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(X_.makeRotationFromEuler(Ii)),u.material.toneMapped=ot.getTransfer(T.colorSpace)!==xt,(h!==T||f!==T.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=T,f=T.version,d=i.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new He(new Cn(2,2),new di({name:"BackgroundMaterial",uniforms:Us(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ot.getTransfer(T.colorSpace)!==xt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||f!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=T,f=T.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,x){y.getRGB(uo,ed(i)),n.buffers.color.setClear(uo.r,uo.g,uo.b,x,o)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(a,l)},render:_,addToRenderList:g,dispose:v}}function $_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,P,F,U,O){let V=!1;const L=h(U,F,P);r!==L&&(r=L,c(r.object)),V=d(S,U,F,O),V&&p(S,U,F,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,x(S,P,F,U),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,P,F){const U=F.wireframe===!0;let O=n[S.id];O===void 0&&(O={},n[S.id]=O);let V=O[P.id];V===void 0&&(V={},O[P.id]=V);let L=V[U];return L===void 0&&(L=f(l()),V[U]=L),L}function f(S){const P=[],F=[],U=[];for(let O=0;O<t;O++)P[O]=0,F[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:U,object:S,attributes:{},index:null}}function d(S,P,F,U){const O=r.attributes,V=P.attributes;let L=0;const z=F.getAttributes();for(const k in z)if(z[k].location>=0){const $=O[k];let se=V[k];if(se===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(se=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(se=S.instanceColor)),$===void 0||$.attribute!==se||se&&$.data!==se.data)return!0;L++}return r.attributesNum!==L||r.index!==U}function p(S,P,F,U){const O={},V=P.attributes;let L=0;const z=F.getAttributes();for(const k in z)if(z[k].location>=0){let $=V[k];$===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&($=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&($=S.instanceColor));const se={};se.attribute=$,$&&$.data&&(se.data=$.data),O[k]=se,L++}r.attributes=O,r.attributesNum=L,r.index=U}function _(){const S=r.newAttributes;for(let P=0,F=S.length;P<F;P++)S[P]=0}function g(S){m(S,0)}function m(S,P){const F=r.newAttributes,U=r.enabledAttributes,O=r.attributeDivisors;F[S]=1,U[S]===0&&(i.enableVertexAttribArray(S),U[S]=1),O[S]!==P&&(i.vertexAttribDivisor(S,P),O[S]=P)}function v(){const S=r.newAttributes,P=r.enabledAttributes;for(let F=0,U=P.length;F<U;F++)P[F]!==S[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function y(S,P,F,U,O,V,L){L===!0?i.vertexAttribIPointer(S,P,F,O,V):i.vertexAttribPointer(S,P,F,U,O,V)}function x(S,P,F,U){_();const O=U.attributes,V=F.getAttributes(),L=P.defaultAttributeValues;for(const z in V){const k=V[z];if(k.location>=0){let G=O[z];if(G===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(G=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(G=S.instanceColor)),G!==void 0){const $=G.normalized,se=G.itemSize,ye=e.get(G);if(ye===void 0)continue;const fe=ye.buffer,Ce=ye.type,Le=ye.bytesPerElement,j=Ce===i.INT||Ce===i.UNSIGNED_INT||G.gpuType===el;if(G.isInterleavedBufferAttribute){const Z=G.data,te=Z.stride,ae=G.offset;if(Z.isInstancedInterleavedBuffer){for(let ge=0;ge<k.locationSize;ge++)m(k.location+ge,Z.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ge=0;ge<k.locationSize;ge++)g(k.location+ge);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let ge=0;ge<k.locationSize;ge++)y(k.location+ge,se/k.locationSize,Ce,$,te*Le,(ae+se/k.locationSize*ge)*Le,j)}else{if(G.isInstancedBufferAttribute){for(let Z=0;Z<k.locationSize;Z++)m(k.location+Z,G.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Z=0;Z<k.locationSize;Z++)g(k.location+Z);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let Z=0;Z<k.locationSize;Z++)y(k.location+Z,se/k.locationSize,Ce,$,se*Le,se/k.locationSize*Z*Le,j)}}else if(L!==void 0){const $=L[z];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(k.location,$);break;case 3:i.vertexAttrib3fv(k.location,$);break;case 4:i.vertexAttrib4fv(k.location,$);break;default:i.vertexAttrib1fv(k.location,$)}}}}v()}function T(){w();for(const S in n){const P=n[S];for(const F in P){const U=P[F];for(const O in U)u(U[O].object),delete U[O];delete P[F]}delete n[S]}}function b(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const F in P){const U=P[F];for(const O in U)u(U[O].object),delete U[O];delete P[F]}delete n[S.id]}function A(S){for(const P in n){const F=n[P];if(F[S.id]===void 0)continue;const U=F[S.id];for(const O in U)u(U[O].object),delete U[O];delete F[S.id]}}function w(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function Y_(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)o(c[p],u[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_]*f[_];t.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function j_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Tn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const w=A===Lr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Wn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==In&&!w)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=p>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:T,maxSamples:b}}function K_(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Bi,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const p=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,m=i.get(h);if(!s||p===null||p.length===0||r&&!g)r?u(null):c();else{const v=r?0:n,y=v*4;let x=m.clippingState||null;l.value=x,x=u(p,f,y,d);for(let T=0;T!==y;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,p){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=d+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,x=d;y!==_;++y,x+=4)o.copy(h[y]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Z_(i){let e=new WeakMap;function t(o,a){return a===uc?o.mapping=Is:a===hc&&(o.mapping=Ds),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===uc||a===hc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Gp(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Ss=4,Bu=[.125,.215,.35,.446,.526,.582],Hi=20,La=new bl,ku=new me;let Ia=null,Da=0,Na=0,Ua=!1;const ki=(1+Math.sqrt(5))/2,ps=1/ki,zu=[new R(-ki,ps,0),new R(ki,ps,0),new R(-ps,0,ki),new R(ps,0,ki),new R(0,ki,-ps),new R(0,ki,ps),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],J_=new R;class Yc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=J_}=r;Ia=this._renderer.getRenderTarget(),Da=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,Da,Na),this._renderer.xr.enabled=Ua,e.scissorTest=!1,ho(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Is||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),Da=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:Lr,format:Tn,colorSpace:Ot,depthBuffer:!1},s=Hu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q_(r)),this._blurMaterial=ex(r,e,t)}return s}_compileMaterial(e){const t=new He(this._lodPlanes[0],e);this._renderer.compile(t,La)}_sceneToCubeUV(e,t,n,s,r){const l=new en(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(ku),h.toneMapping=bi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new ai({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new He(new gn,_);let m=!1;const v=e.background;v?v.isColor&&(_.color.copy(v),e.background=null,m=!0):(_.color.copy(ku),m=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[y],r.y,r.z)):x===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[y]));const T=this._cubeSize;ho(s,x*T,y>2?T:0,T,T),h.setRenderTarget(s),m&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Is||e.mapping===Ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new He(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;ho(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,La)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zu[(s-r-1)%zu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new He(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Hi-1),_=r/p,g=isFinite(r)?1+Math.floor(u*_):Hi;g>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Hi}`);const m=[];let v=0;for(let A=0;A<Hi;++A){const w=A/_,M=Math.exp(-w*w/2);m.push(M),A===0?v+=M:A<g&&(v+=2*M)}for(let A=0;A<m.length;A++)m[A]=m[A]/v;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=p,f.mipInt.value=y-n;const x=this._sizeLods[s],T=3*x*(s>y-Ss?s-y+Ss:0),b=4*(this._cubeSize-x);ho(t,T,b,3*x,2*x),l.setRenderTarget(t),l.render(h,La)}}function Q_(i){const e=[],t=[],n=[];let s=i;const r=i-Ss+1+Bu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Ss?l=Bu[o-i+Ss-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*d),y=new Float32Array(g*p*d),x=new Float32Array(m*p*d);for(let b=0;b<d;b++){const A=b%3*2/3-1,w=b>2?0:-1,M=[A,w,0,A+2/3,w,0,A+2/3,w+1,0,A,w,0,A+2/3,w+1,0,A,w+1,0];v.set(M,_*p*b),y.set(f,g*p*b);const S=[b,b,b,b,b,b];x.set(S,m*p*b)}const T=new bt;T.setAttribute("position",new ht(v,_)),T.setAttribute("uv",new ht(y,g)),T.setAttribute("faceIndex",new ht(x,m)),e.push(T),s>Ss&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Hu(i,e,t){const n=new Yi(i,e,t);return n.texture.mapping=Ho,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ho(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ex(i,e,t){const n=new Float32Array(Hi),s=new R(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Vu(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Gu(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function wl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===uc||l===hc,u=l===Is||l===Ds;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Yc(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Yc(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function nx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Er("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ix(i,e,t,n){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,p=h.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let y=0,x=v.length;y<x;y+=3){const T=v[y+0],b=v[y+1],A=v[y+2];f.push(T,b,b,A,A,T)}}else if(p!==void 0){const v=p.array;_=p.version;for(let y=0,x=v.length/3-1;y<x;y+=3){const T=y+0,b=y+1,A=y+2;f.push(T,b,b,A,A,T)}}else return;const g=new(Yh(f)?Qh:Jh)(f,1);g.version=_;const m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function sx(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),t.update(d,n,1)}function c(f,d,p){p!==0&&(i.drawElementsInstanced(n,d,r,f*o,p),t.update(d,n,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function h(f,d,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=d[v]*_[v];t.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function rx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ox(i,e,t){const n=new WeakMap,s=new ut;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let M=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;d===!0&&(y=1),p===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const b=new Float32Array(x*T*4*h),A=new jh(b,x,T,h);A.type=In,A.needsUpdate=!0;const w=y*4;for(let S=0;S<h;S++){const P=g[S],F=m[S],U=v[S],O=x*T*4*S;for(let V=0;V<P.count;V++){const L=V*w;d===!0&&(s.fromBufferAttribute(P,V),b[O+L+0]=s.x,b[O+L+1]=s.y,b[O+L+2]=s.z,b[O+L+3]=0),p===!0&&(s.fromBufferAttribute(F,V),b[O+L+4]=s.x,b[O+L+5]=s.y,b[O+L+6]=s.z,b[O+L+7]=0),_===!0&&(s.fromBufferAttribute(U,V),b[O+L+8]=s.x,b[O+L+9]=s.y,b[O+L+10]=s.z,b[O+L+11]=U.itemSize===4?s.w:1)}}f={count:h,texture:A,size:new be(x,T)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function ax(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Ed=new kt,Wu=new ld(1,1),wd=new jh,Ad=new wp,Rd=new nd,Xu=[],qu=[],$u=new Float32Array(16),Yu=new Float32Array(9),ju=new Float32Array(4);function Xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Xu[s];if(r===void 0&&(r=new Float32Array(s),Xu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $o(i,e){let t=qu[e];t===void 0&&(t=new Int32Array(e),qu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function cx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function lx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function dx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;ju.set(n),i.uniformMatrix2fv(this.addr,!1,ju),Ht(t,n)}}function fx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Yu.set(n),i.uniformMatrix3fv(this.addr,!1,Yu),Ht(t,n)}}function px(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;$u.set(n),i.uniformMatrix4fv(this.addr,!1,$u),Ht(t,n)}}function mx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function _x(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function xx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function vx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function yx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function Mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function bx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wu.compareFunction=$h,r=Wu):r=Ed,t.setTexture2D(e||r,s)}function Tx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ad,s)}function Ex(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Rd,s)}function wx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||wd,s)}function Ax(i){switch(i){case 5126:return cx;case 35664:return lx;case 35665:return ux;case 35666:return hx;case 35674:return dx;case 35675:return fx;case 35676:return px;case 5124:case 35670:return mx;case 35667:case 35671:return gx;case 35668:case 35672:return _x;case 35669:case 35673:return xx;case 5125:return vx;case 36294:return yx;case 36295:return Mx;case 36296:return Sx;case 35678:case 36198:case 36298:case 36306:case 35682:return bx;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Ex;case 36289:case 36303:case 36311:case 36292:return wx}}function Rx(i,e){i.uniform1fv(this.addr,e)}function Cx(i,e){const t=Xs(e,this.size,2);i.uniform2fv(this.addr,t)}function Px(i,e){const t=Xs(e,this.size,3);i.uniform3fv(this.addr,t)}function Lx(i,e){const t=Xs(e,this.size,4);i.uniform4fv(this.addr,t)}function Ix(i,e){const t=Xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Dx(i,e){const t=Xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Nx(i,e){const t=Xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ux(i,e){i.uniform1iv(this.addr,e)}function Fx(i,e){i.uniform2iv(this.addr,e)}function Ox(i,e){i.uniform3iv(this.addr,e)}function Bx(i,e){i.uniform4iv(this.addr,e)}function kx(i,e){i.uniform1uiv(this.addr,e)}function zx(i,e){i.uniform2uiv(this.addr,e)}function Hx(i,e){i.uniform3uiv(this.addr,e)}function Vx(i,e){i.uniform4uiv(this.addr,e)}function Gx(i,e,t){const n=this.cache,s=e.length,r=$o(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Ed,r[o])}function Wx(i,e,t){const n=this.cache,s=e.length,r=$o(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ad,r[o])}function Xx(i,e,t){const n=this.cache,s=e.length,r=$o(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Rd,r[o])}function qx(i,e,t){const n=this.cache,s=e.length,r=$o(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||wd,r[o])}function $x(i){switch(i){case 5126:return Rx;case 35664:return Cx;case 35665:return Px;case 35666:return Lx;case 35674:return Ix;case 35675:return Dx;case 35676:return Nx;case 5124:case 35670:return Ux;case 35667:case 35671:return Fx;case 35668:case 35672:return Ox;case 35669:case 35673:return Bx;case 5125:return kx;case 36294:return zx;case 36295:return Hx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Gx;case 35679:case 36299:case 36307:return Wx;case 35680:case 36300:case 36308:case 36293:return Xx;case 36289:case 36303:case 36311:case 36292:return qx}}class Yx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ax(t.type)}}class jx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$x(t.type)}}class Kx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Fa=/(\w+)(\])?(\[|\.)?/g;function Ku(i,e){i.seq.push(e),i.map[e.id]=e}function Zx(i,e,t){const n=i.name,s=n.length;for(Fa.lastIndex=0;;){const r=Fa.exec(n),o=Fa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ku(t,c===void 0?new Yx(a,i,e):new jx(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Kx(a),Ku(t,h)),t=h}}}class Ao{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Zx(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Zu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Jx=37297;let Qx=0;function ev(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Ju=new Ye;function tv(i){ot._getMatrix(Ju,ot.workingColorSpace,i);const e=`mat3( ${Ju.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case Po:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Qu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+ev(i.getShaderSource(e),a)}else return r}function nv(i,e){const t=tv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function iv(i,e){let t;switch(e){case Bf:t="Linear";break;case kf:t="Reinhard";break;case zf:t="Cineon";break;case Fh:t="ACESFilmic";break;case Vf:t="AgX";break;case Gf:t="Neutral";break;case Hf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fo=new R;function sv(){ot.getLuminanceCoefficients(fo);const i=fo.x.toFixed(4),e=fo.y.toFixed(4),t=fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cr).join(`
`)}function ov(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function av(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function cr(i){return i!==""}function eh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function th(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(i){return i.replace(cv,uv)}const lv=new Map;function uv(i,e){let t=Ze[e];if(t===void 0){const n=lv.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return jc(t)}const hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nh(i){return i.replace(hv,dv)}function dv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ih(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function fv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Uh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ti&&(e="SHADOWMAP_TYPE_VSM"),e}function pv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Is:case Ds:e="ENVMAP_TYPE_CUBE";break;case Ho:e="ENVMAP_TYPE_CUBE_UV";break}return e}function mv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ds:e="ENVMAP_MODE_REFRACTION";break}return e}function gv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ff:e="ENVMAP_BLENDING_MIX";break;case Of:e="ENVMAP_BLENDING_ADD";break}return e}function _v(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function xv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=fv(t),c=pv(t),u=mv(t),h=gv(t),f=_v(t),d=rv(t),p=ov(r),_=s.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(cr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(cr).join(`
`),m.length>0&&(m+=`
`)):(g=[ih(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cr).join(`
`),m=[ih(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==bi?iv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,nv("linearToOutputTexel",t.outputColorSpace),sv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cr).join(`
`)),o=jc(o),o=eh(o,t),o=th(o,t),a=jc(a),a=eh(a,t),a=th(a,t),o=nh(o),a=nh(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=v+g+o,x=v+m+a,T=Zu(s,s.VERTEX_SHADER,y),b=Zu(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,b),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(P){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(T)||"",O=s.getShaderInfoLog(b)||"",V=F.trim(),L=U.trim(),z=O.trim();let k=!0,G=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,b);else{const $=Qu(s,T,"vertex"),se=Qu(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+$+`
`+se)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(L===""||z==="")&&(G=!1);G&&(P.diagnostics={runnable:k,programLog:V,vertexShader:{log:L,prefix:g},fragmentShader:{log:z,prefix:m}})}s.deleteShader(T),s.deleteShader(b),w=new Ao(s,_),M=av(s,_)}let w;this.getUniforms=function(){return w===void 0&&A(this),w};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Jx)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Qx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}let vv=0;class yv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Mv(e),t.set(e,n)),n}}class Mv{constructor(e){this.id=vv++,this.code=e,this.usedTimes=0}}function Sv(i,e,t,n,s,r,o){const a=new Kh,l=new yv,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,P,F,U){const O=F.fog,V=U.geometry,L=M.isMeshStandardMaterial?F.environment:null,z=(M.isMeshStandardMaterial?t:e).get(M.envMap||L),k=z&&z.mapping===Ho?z.image.height:null,G=p[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));const $=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,se=$!==void 0?$.length:0;let ye=0;V.morphAttributes.position!==void 0&&(ye=1),V.morphAttributes.normal!==void 0&&(ye=2),V.morphAttributes.color!==void 0&&(ye=3);let fe,Ce,Le,j;if(G){const at=kn[G];fe=at.vertexShader,Ce=at.fragmentShader}else fe=M.vertexShader,Ce=M.fragmentShader,l.update(M),Le=l.getVertexShaderID(M),j=l.getFragmentShaderID(M);const Z=i.getRenderTarget(),te=i.state.buffers.depth.getReversed(),ae=U.isInstancedMesh===!0,ge=U.isBatchedMesh===!0,Pe=!!M.map,et=!!M.matcap,B=!!z,je=!!M.aoMap,De=!!M.lightMap,Oe=!!M.bumpMap,Re=!!M.normalMap,Ke=!!M.displacementMap,Ee=!!M.emissiveMap,ze=!!M.metalnessMap,lt=!!M.roughnessMap,rt=M.anisotropy>0,N=M.clearcoat>0,E=M.dispersion>0,q=M.iridescence>0,ne=M.sheen>0,I=M.transmission>0,D=rt&&!!M.anisotropyMap,ee=N&&!!M.clearcoatMap,Q=N&&!!M.clearcoatNormalMap,le=N&&!!M.clearcoatRoughnessMap,Me=q&&!!M.iridescenceMap,oe=q&&!!M.iridescenceThicknessMap,he=ne&&!!M.sheenColorMap,ce=ne&&!!M.sheenRoughnessMap,de=!!M.specularMap,ve=!!M.specularColorMap,qe=!!M.specularIntensityMap,H=I&&!!M.transmissionMap,pe=I&&!!M.thicknessMap,_e=!!M.gradientMap,we=!!M.alphaMap,ue=M.alphaTest>0,re=!!M.alphaHash,Ie=!!M.extensions;let Ge=bi;M.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ge=i.toneMapping);const dt={shaderID:G,shaderType:M.type,shaderName:M.name,vertexShader:fe,fragmentShader:Ce,defines:M.defines,customVertexShaderID:Le,customFragmentShaderID:j,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:ge,batchingColor:ge&&U._colorsTexture!==null,instancing:ae,instancingColor:ae&&U.instanceColor!==null,instancingMorph:ae&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ot,alphaToCoverage:!!M.alphaToCoverage,map:Pe,matcap:et,envMap:B,envMapMode:B&&z.mapping,envMapCubeUVHeight:k,aoMap:je,lightMap:De,bumpMap:Oe,normalMap:Re,displacementMap:f&&Ke,emissiveMap:Ee,normalMapObjectSpace:Re&&M.normalMapType===jf,normalMapTangentSpace:Re&&M.normalMapType===al,metalnessMap:ze,roughnessMap:lt,anisotropy:rt,anisotropyMap:D,clearcoat:N,clearcoatMap:ee,clearcoatNormalMap:Q,clearcoatRoughnessMap:le,dispersion:E,iridescence:q,iridescenceMap:Me,iridescenceThicknessMap:oe,sheen:ne,sheenColorMap:he,sheenRoughnessMap:ce,specularMap:de,specularColorMap:ve,specularIntensityMap:qe,transmission:I,transmissionMap:H,thicknessMap:pe,gradientMap:_e,opaque:M.transparent===!1&&M.blending===Gi&&M.alphaToCoverage===!1,alphaMap:we,alphaTest:ue,alphaHash:re,combine:M.combine,mapUv:Pe&&_(M.map.channel),aoMapUv:je&&_(M.aoMap.channel),lightMapUv:De&&_(M.lightMap.channel),bumpMapUv:Oe&&_(M.bumpMap.channel),normalMapUv:Re&&_(M.normalMap.channel),displacementMapUv:Ke&&_(M.displacementMap.channel),emissiveMapUv:Ee&&_(M.emissiveMap.channel),metalnessMapUv:ze&&_(M.metalnessMap.channel),roughnessMapUv:lt&&_(M.roughnessMap.channel),anisotropyMapUv:D&&_(M.anisotropyMap.channel),clearcoatMapUv:ee&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Q&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ce&&_(M.sheenRoughnessMap.channel),specularMapUv:de&&_(M.specularMap.channel),specularColorMapUv:ve&&_(M.specularColorMap.channel),specularIntensityMapUv:qe&&_(M.specularIntensityMap.channel),transmissionMapUv:H&&_(M.transmissionMap.channel),thicknessMapUv:pe&&_(M.thicknessMap.channel),alphaMapUv:we&&_(M.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Re||rt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!V.attributes.uv&&(Pe||we),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:te,skinning:U.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ye,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Pe&&M.map.isVideoTexture===!0&&ot.getTransfer(M.map.colorSpace)===xt,decodeVideoTextureEmissive:Ee&&M.emissiveMap.isVideoTexture===!0&&ot.getTransfer(M.emissiveMap.colorSpace)===xt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===zn,flipSided:M.side===tn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ie&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&M.extensions.multiDraw===!0||ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function m(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)S.push(P),S.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(v(S,M),y(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function v(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){const S=p[M.type];let P;if(S){const F=kn[S];P=kp.clone(F.uniforms)}else P=M.uniforms;return P}function T(M,S){let P;for(let F=0,U=u.length;F<U;F++){const O=u[F];if(O.cacheKey===S){P=O,++P.usedTimes;break}}return P===void 0&&(P=new xv(i,S,M,r),u.push(P)),P}function b(M){if(--M.usedTimes===0){const S=u.indexOf(M);u[S]=u[u.length-1],u.pop(),M.destroy()}}function A(M){l.remove(M)}function w(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:T,releaseProgram:b,releaseShaderCache:A,programs:u,dispose:w}}function bv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Tv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function sh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function rh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,d,p,_,g){let m=i[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:p,renderOrder:h.renderOrder,z:_,group:g},i[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=_,m.group=g),e++,m}function a(h,f,d,p,_,g){const m=o(h,f,d,p,_,g);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):t.push(m)}function l(h,f,d,p,_,g){const m=o(h,f,d,p,_,g);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||Tv),n.length>1&&n.sort(f||sh),s.length>1&&s.sort(f||sh)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function Ev(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new rh,i.set(n,[o])):s>=r.length?(o=new rh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function wv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new me};break;case"SpotLight":t={position:new R,direction:new R,color:new me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new me,groundColor:new me};break;case"RectAreaLight":t={color:new me,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Av(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Rv=0;function Cv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Pv(i){const e=new wv,t=Av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const s=new R,r=new Xe,o=new Xe;function a(c){let u=0,h=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,v=0,y=0,x=0,T=0,b=0,A=0;c.sort(Cv);for(let M=0,S=c.length;M<S;M++){const P=c[M],F=P.color,U=P.intensity,O=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=F.r*U,h+=F.g*U,f+=F.b*U;else if(P.isLightProbe){for(let L=0;L<9;L++)n.probe[L].addScaledVector(P.sh.coefficients[L],U);A++}else if(P.isDirectionalLight){const L=e.get(P);if(L.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,k=t.get(P);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=V,n.directionalShadowMatrix[d]=P.shadow.matrix,v++}n.directional[d]=L,d++}else if(P.isSpotLight){const L=e.get(P);L.position.setFromMatrixPosition(P.matrixWorld),L.color.copy(F).multiplyScalar(U),L.distance=O,L.coneCos=Math.cos(P.angle),L.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),L.decay=P.decay,n.spot[_]=L;const z=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,z.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[_]=z.matrix,P.castShadow){const k=t.get(P);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=V,x++}_++}else if(P.isRectAreaLight){const L=e.get(P);L.color.copy(F).multiplyScalar(U),L.halfWidth.set(P.width*.5,0,0),L.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=L,g++}else if(P.isPointLight){const L=e.get(P);if(L.color.copy(P.color).multiplyScalar(P.intensity),L.distance=P.distance,L.decay=P.decay,P.castShadow){const z=P.shadow,k=t.get(P);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,k.shadowCameraNear=z.camera.near,k.shadowCameraFar=z.camera.far,n.pointShadow[p]=k,n.pointShadowMap[p]=V,n.pointShadowMatrix[p]=P.shadow.matrix,y++}n.point[p]=L,p++}else if(P.isHemisphereLight){const L=e.get(P);L.skyColor.copy(P.color).multiplyScalar(U),L.groundColor.copy(P.groundColor).multiplyScalar(U),n.hemi[m]=L,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Te.LTC_FLOAT_1,n.rectAreaLTC2=Te.LTC_FLOAT_2):(n.rectAreaLTC1=Te.LTC_HALF_1,n.rectAreaLTC2=Te.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const w=n.hash;(w.directionalLength!==d||w.pointLength!==p||w.spotLength!==_||w.rectAreaLength!==g||w.hemiLength!==m||w.numDirectionalShadows!==v||w.numPointShadows!==y||w.numSpotShadows!==x||w.numSpotMaps!==T||w.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+T-b,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,w.directionalLength=d,w.pointLength=p,w.spotLength=_,w.rectAreaLength=g,w.hemiLength=m,w.numDirectionalShadows=v,w.numPointShadows=y,w.numSpotShadows=x,w.numSpotMaps=T,w.numLightProbes=A,n.version=Rv++)}function l(c,u){let h=0,f=0,d=0,p=0,_=0;const g=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const y=c[m];if(y.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),h++}else if(y.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),d++}else if(y.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function oh(i){const e=new Pv(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Lv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new oh(i),e.set(s,[a])):r>=o.length?(a=new oh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Nv(i,e,t){let n=new dl;const s=new be,r=new be,o=new ut,a=new Im({depthPacking:Yf}),l=new Dm,c={},u=t.maxTextureSize,h={[hi]:tn,[tn]:hi,[zn]:zn},f=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:Iv,fragmentShader:Dv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new bt;p.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new He(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nh;let m=this.type;this.render=function(b,A,w){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const M=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Si),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const U=m!==ti&&this.type===ti,O=m===ti&&this.type!==ti;for(let V=0,L=b.length;V<L;V++){const z=b[V],k=z.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const G=k.getFrameExtents();if(s.multiply(G),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/G.x),s.x=r.x*G.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/G.y),s.y=r.y*G.y,k.mapSize.y=r.y)),k.map===null||U===!0||O===!0){const se=this.type!==ti?{minFilter:nn,magFilter:nn}:{};k.map!==null&&k.map.dispose(),k.map=new Yi(s.x,s.y,se),k.map.texture.name=z.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const $=k.getViewportCount();for(let se=0;se<$;se++){const ye=k.getViewport(se);o.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),F.viewport(o),k.updateMatrices(z,se),n=k.getFrustum(),x(A,w,k.camera,z,this.type)}k.isPointLightShadow!==!0&&this.type===ti&&v(k,w),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(M,S,P)};function v(b,A){const w=e.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Yi(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,w,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,w,d,_,null)}function y(b,A,w,M){let S=null;const P=w.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)S=P;else if(S=w.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=S.uuid,U=A.uuid;let O=c[F];O===void 0&&(O={},c[F]=O);let V=O[U];V===void 0&&(V=S.clone(),O[U]=V,A.addEventListener("dispose",T)),S=V}if(S.visible=A.visible,S.wireframe=A.wireframe,M===ti?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:h[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,w.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=i.properties.get(S);F.light=w}return S}function x(b,A,w,M,S){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===ti)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,b.matrixWorld);const U=e.update(b),O=b.material;if(Array.isArray(O)){const V=U.groups;for(let L=0,z=V.length;L<z;L++){const k=V[L],G=O[k.materialIndex];if(G&&G.visible){const $=y(b,G,M,S);b.onBeforeShadow(i,b,A,w,U,$,k),i.renderBufferDirect(w,null,U,$,b,k),b.onAfterShadow(i,b,A,w,U,$,k)}}}else if(O.visible){const V=y(b,O,M,S);b.onBeforeShadow(i,b,A,w,U,V,null),i.renderBufferDirect(w,null,U,V,b,null),b.onAfterShadow(i,b,A,w,U,V,null)}}const F=b.children;for(let U=0,O=F.length;U<O;U++)x(F[U],A,w,M,S)}function T(b){b.target.removeEventListener("dispose",T);for(const w in c){const M=c[w],S=b.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const Uv={[ic]:sc,[rc]:cc,[oc]:lc,[Ls]:ac,[sc]:ic,[cc]:rc,[lc]:oc,[ac]:Ls};function Fv(i,e){function t(){let H=!1;const pe=new ut;let _e=null;const we=new ut(0,0,0,0);return{setMask:function(ue){_e!==ue&&!H&&(i.colorMask(ue,ue,ue,ue),_e=ue)},setLocked:function(ue){H=ue},setClear:function(ue,re,Ie,Ge,dt){dt===!0&&(ue*=Ge,re*=Ge,Ie*=Ge),pe.set(ue,re,Ie,Ge),we.equals(pe)===!1&&(i.clearColor(ue,re,Ie,Ge),we.copy(pe))},reset:function(){H=!1,_e=null,we.set(-1,0,0,0)}}}function n(){let H=!1,pe=!1,_e=null,we=null,ue=null;return{setReversed:function(re){if(pe!==re){const Ie=e.get("EXT_clip_control");re?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),pe=re;const Ge=ue;ue=null,this.setClear(Ge)}},getReversed:function(){return pe},setTest:function(re){re?Z(i.DEPTH_TEST):te(i.DEPTH_TEST)},setMask:function(re){_e!==re&&!H&&(i.depthMask(re),_e=re)},setFunc:function(re){if(pe&&(re=Uv[re]),we!==re){switch(re){case ic:i.depthFunc(i.NEVER);break;case sc:i.depthFunc(i.ALWAYS);break;case rc:i.depthFunc(i.LESS);break;case Ls:i.depthFunc(i.LEQUAL);break;case oc:i.depthFunc(i.EQUAL);break;case ac:i.depthFunc(i.GEQUAL);break;case cc:i.depthFunc(i.GREATER);break;case lc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=re}},setLocked:function(re){H=re},setClear:function(re){ue!==re&&(pe&&(re=1-re),i.clearDepth(re),ue=re)},reset:function(){H=!1,_e=null,we=null,ue=null,pe=!1}}}function s(){let H=!1,pe=null,_e=null,we=null,ue=null,re=null,Ie=null,Ge=null,dt=null;return{setTest:function(at){H||(at?Z(i.STENCIL_TEST):te(i.STENCIL_TEST))},setMask:function(at){pe!==at&&!H&&(i.stencilMask(at),pe=at)},setFunc:function(at,_n,ie){(_e!==at||we!==_n||ue!==ie)&&(i.stencilFunc(at,_n,ie),_e=at,we=_n,ue=ie)},setOp:function(at,_n,ie){(re!==at||Ie!==_n||Ge!==ie)&&(i.stencilOp(at,_n,ie),re=at,Ie=_n,Ge=ie)},setLocked:function(at){H=at},setClear:function(at){dt!==at&&(i.clearStencil(at),dt=at)},reset:function(){H=!1,pe=null,_e=null,we=null,ue=null,re=null,Ie=null,Ge=null,dt=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],p=null,_=!1,g=null,m=null,v=null,y=null,x=null,T=null,b=null,A=new me(0,0,0),w=0,M=!1,S=null,P=null,F=null,U=null,O=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,z=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(k)[1]),L=z>=1):k.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),L=z>=2);let G=null,$={};const se=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),fe=new ut().fromArray(se),Ce=new ut().fromArray(ye);function Le(H,pe,_e,we){const ue=new Uint8Array(4),re=i.createTexture();i.bindTexture(H,re),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<_e;Ie++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(pe+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return re}const j={};j[i.TEXTURE_2D]=Le(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Ls),Oe(!1),Re(Vl),Z(i.CULL_FACE),je(Si);function Z(H){u[H]!==!0&&(i.enable(H),u[H]=!0)}function te(H){u[H]!==!1&&(i.disable(H),u[H]=!1)}function ae(H,pe){return h[H]!==pe?(i.bindFramebuffer(H,pe),h[H]=pe,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function ge(H,pe){let _e=d,we=!1;if(H){_e=f.get(pe),_e===void 0&&(_e=[],f.set(pe,_e));const ue=H.textures;if(_e.length!==ue.length||_e[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Ie=ue.length;re<Ie;re++)_e[re]=i.COLOR_ATTACHMENT0+re;_e.length=ue.length,we=!0}}else _e[0]!==i.BACK&&(_e[0]=i.BACK,we=!0);we&&i.drawBuffers(_e)}function Pe(H){return p!==H?(i.useProgram(H),p=H,!0):!1}const et={[zi]:i.FUNC_ADD,[vf]:i.FUNC_SUBTRACT,[yf]:i.FUNC_REVERSE_SUBTRACT};et[Mf]=i.MIN,et[Sf]=i.MAX;const B={[bf]:i.ZERO,[Tf]:i.ONE,[Ef]:i.SRC_COLOR,[tc]:i.SRC_ALPHA,[Lf]:i.SRC_ALPHA_SATURATE,[Cf]:i.DST_COLOR,[Af]:i.DST_ALPHA,[wf]:i.ONE_MINUS_SRC_COLOR,[nc]:i.ONE_MINUS_SRC_ALPHA,[Pf]:i.ONE_MINUS_DST_COLOR,[Rf]:i.ONE_MINUS_DST_ALPHA,[If]:i.CONSTANT_COLOR,[Df]:i.ONE_MINUS_CONSTANT_COLOR,[Nf]:i.CONSTANT_ALPHA,[Uf]:i.ONE_MINUS_CONSTANT_ALPHA};function je(H,pe,_e,we,ue,re,Ie,Ge,dt,at){if(H===Si){_===!0&&(te(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),H!==xf){if(H!==g||at!==M){if((m!==zi||x!==zi)&&(i.blendEquation(i.FUNC_ADD),m=zi,x=zi),at)switch(H){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ec:i.blendFunc(i.ONE,i.ONE);break;case Gl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ec:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Gl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}v=null,y=null,T=null,b=null,A.set(0,0,0),w=0,g=H,M=at}return}ue=ue||pe,re=re||_e,Ie=Ie||we,(pe!==m||ue!==x)&&(i.blendEquationSeparate(et[pe],et[ue]),m=pe,x=ue),(_e!==v||we!==y||re!==T||Ie!==b)&&(i.blendFuncSeparate(B[_e],B[we],B[re],B[Ie]),v=_e,y=we,T=re,b=Ie),(Ge.equals(A)===!1||dt!==w)&&(i.blendColor(Ge.r,Ge.g,Ge.b,dt),A.copy(Ge),w=dt),g=H,M=!1}function De(H,pe){H.side===zn?te(i.CULL_FACE):Z(i.CULL_FACE);let _e=H.side===tn;pe&&(_e=!_e),Oe(_e),H.blending===Gi&&H.transparent===!1?je(Si):je(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);const we=H.stencilWrite;a.setTest(we),we&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ee(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):te(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(H){S!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),S=H)}function Re(H){H!==gf?(Z(i.CULL_FACE),H!==P&&(H===Vl?i.cullFace(i.BACK):H===_f?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):te(i.CULL_FACE),P=H}function Ke(H){H!==F&&(L&&i.lineWidth(H),F=H)}function Ee(H,pe,_e){H?(Z(i.POLYGON_OFFSET_FILL),(U!==pe||O!==_e)&&(i.polygonOffset(pe,_e),U=pe,O=_e)):te(i.POLYGON_OFFSET_FILL)}function ze(H){H?Z(i.SCISSOR_TEST):te(i.SCISSOR_TEST)}function lt(H){H===void 0&&(H=i.TEXTURE0+V-1),G!==H&&(i.activeTexture(H),G=H)}function rt(H,pe,_e){_e===void 0&&(G===null?_e=i.TEXTURE0+V-1:_e=G);let we=$[_e];we===void 0&&(we={type:void 0,texture:void 0},$[_e]=we),(we.type!==H||we.texture!==pe)&&(G!==_e&&(i.activeTexture(_e),G=_e),i.bindTexture(H,pe||j[H]),we.type=H,we.texture=pe)}function N(){const H=$[G];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function E(){try{i.compressedTexImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function q(){try{i.compressedTexImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ne(){try{i.texSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function I(){try{i.texSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function D(){try{i.compressedTexSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ee(){try{i.compressedTexSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Q(){try{i.texStorage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function le(){try{i.texStorage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Me(){try{i.texImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function oe(){try{i.texImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function he(H){fe.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),fe.copy(H))}function ce(H){Ce.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Ce.copy(H))}function de(H,pe){let _e=c.get(pe);_e===void 0&&(_e=new WeakMap,c.set(pe,_e));let we=_e.get(H);we===void 0&&(we=i.getUniformBlockIndex(pe,H.name),_e.set(H,we))}function ve(H,pe){const we=c.get(pe).get(H);l.get(pe)!==we&&(i.uniformBlockBinding(pe,we,H.__bindingPointIndex),l.set(pe,we))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},G=null,$={},h={},f=new WeakMap,d=[],p=null,_=!1,g=null,m=null,v=null,y=null,x=null,T=null,b=null,A=new me(0,0,0),w=0,M=!1,S=null,P=null,F=null,U=null,O=null,fe.set(0,0,i.canvas.width,i.canvas.height),Ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:te,bindFramebuffer:ae,drawBuffers:ge,useProgram:Pe,setBlending:je,setMaterial:De,setFlipSided:Oe,setCullFace:Re,setLineWidth:Ke,setPolygonOffset:Ee,setScissorTest:ze,activeTexture:lt,bindTexture:rt,unbindTexture:N,compressedTexImage2D:E,compressedTexImage3D:q,texImage2D:Me,texImage3D:oe,updateUBOMapping:de,uniformBlockBinding:ve,texStorage2D:Q,texStorage3D:le,texSubImage2D:ne,texSubImage3D:I,compressedTexSubImage2D:D,compressedTexSubImage3D:ee,scissor:he,viewport:ce,reset:qe}}function Ov(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(N,E){return d?new OffscreenCanvas(N,E):Tr("canvas")}function _(N,E,q){let ne=1;const I=rt(N);if((I.width>q||I.height>q)&&(ne=q/Math.max(I.width,I.height)),ne<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const D=Math.floor(ne*I.width),ee=Math.floor(ne*I.height);h===void 0&&(h=p(D,ee));const Q=E?p(D,ee):h;return Q.width=D,Q.height=ee,Q.getContext("2d").drawImage(N,0,0,D,ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+I.width+"x"+I.height+") to ("+D+"x"+ee+")."),Q}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+I.width+"x"+I.height+")."),N;return N}function g(N){return N.generateMipmaps}function m(N){i.generateMipmap(N)}function v(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(N,E,q,ne,I=!1){if(N!==null){if(i[N]!==void 0)return i[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let D=E;if(E===i.RED&&(q===i.FLOAT&&(D=i.R32F),q===i.HALF_FLOAT&&(D=i.R16F),q===i.UNSIGNED_BYTE&&(D=i.R8)),E===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(D=i.R8UI),q===i.UNSIGNED_SHORT&&(D=i.R16UI),q===i.UNSIGNED_INT&&(D=i.R32UI),q===i.BYTE&&(D=i.R8I),q===i.SHORT&&(D=i.R16I),q===i.INT&&(D=i.R32I)),E===i.RG&&(q===i.FLOAT&&(D=i.RG32F),q===i.HALF_FLOAT&&(D=i.RG16F),q===i.UNSIGNED_BYTE&&(D=i.RG8)),E===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(D=i.RG8UI),q===i.UNSIGNED_SHORT&&(D=i.RG16UI),q===i.UNSIGNED_INT&&(D=i.RG32UI),q===i.BYTE&&(D=i.RG8I),q===i.SHORT&&(D=i.RG16I),q===i.INT&&(D=i.RG32I)),E===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(D=i.RGB8UI),q===i.UNSIGNED_SHORT&&(D=i.RGB16UI),q===i.UNSIGNED_INT&&(D=i.RGB32UI),q===i.BYTE&&(D=i.RGB8I),q===i.SHORT&&(D=i.RGB16I),q===i.INT&&(D=i.RGB32I)),E===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(D=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(D=i.RGBA16UI),q===i.UNSIGNED_INT&&(D=i.RGBA32UI),q===i.BYTE&&(D=i.RGBA8I),q===i.SHORT&&(D=i.RGBA16I),q===i.INT&&(D=i.RGBA32I)),E===i.RGB&&(q===i.UNSIGNED_INT_5_9_9_9_REV&&(D=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(D=i.R11F_G11F_B10F)),E===i.RGBA){const ee=I?Po:ot.getTransfer(ne);q===i.FLOAT&&(D=i.RGBA32F),q===i.HALF_FLOAT&&(D=i.RGBA16F),q===i.UNSIGNED_BYTE&&(D=ee===xt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(D=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(D=i.RGB5_A1)}return(D===i.R16F||D===i.R32F||D===i.RG16F||D===i.RG32F||D===i.RGBA16F||D===i.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function x(N,E){let q;return N?E===null||E===$i||E===xr?q=i.DEPTH24_STENCIL8:E===In?q=i.DEPTH32F_STENCIL8:E===_r&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===$i||E===xr?q=i.DEPTH_COMPONENT24:E===In?q=i.DEPTH_COMPONENT32F:E===_r&&(q=i.DEPTH_COMPONENT16),q}function T(N,E){return g(N)===!0||N.isFramebufferTexture&&N.minFilter!==nn&&N.minFilter!==mn?Math.log2(Math.max(E.width,E.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?E.mipmaps.length:1}function b(N){const E=N.target;E.removeEventListener("dispose",b),w(E),E.isVideoTexture&&u.delete(E)}function A(N){const E=N.target;E.removeEventListener("dispose",A),S(E)}function w(N){const E=n.get(N);if(E.__webglInit===void 0)return;const q=N.source,ne=f.get(q);if(ne){const I=ne[E.__cacheKey];I.usedTimes--,I.usedTimes===0&&M(N),Object.keys(ne).length===0&&f.delete(q)}n.remove(N)}function M(N){const E=n.get(N);i.deleteTexture(E.__webglTexture);const q=N.source,ne=f.get(q);delete ne[E.__cacheKey],o.memory.textures--}function S(N){const E=n.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),n.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(E.__webglFramebuffer[ne]))for(let I=0;I<E.__webglFramebuffer[ne].length;I++)i.deleteFramebuffer(E.__webglFramebuffer[ne][I]);else i.deleteFramebuffer(E.__webglFramebuffer[ne]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[ne])}else{if(Array.isArray(E.__webglFramebuffer))for(let ne=0;ne<E.__webglFramebuffer.length;ne++)i.deleteFramebuffer(E.__webglFramebuffer[ne]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ne=0;ne<E.__webglColorRenderbuffer.length;ne++)E.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[ne]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const q=N.textures;for(let ne=0,I=q.length;ne<I;ne++){const D=n.get(q[ne]);D.__webglTexture&&(i.deleteTexture(D.__webglTexture),o.memory.textures--),n.remove(q[ne])}n.remove(N)}let P=0;function F(){P=0}function U(){const N=P;return N>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+s.maxTextures),P+=1,N}function O(N){const E=[];return E.push(N.wrapS),E.push(N.wrapT),E.push(N.wrapR||0),E.push(N.magFilter),E.push(N.minFilter),E.push(N.anisotropy),E.push(N.internalFormat),E.push(N.format),E.push(N.type),E.push(N.generateMipmaps),E.push(N.premultiplyAlpha),E.push(N.flipY),E.push(N.unpackAlignment),E.push(N.colorSpace),E.join()}function V(N,E){const q=n.get(N);if(N.isVideoTexture&&ze(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&q.__version!==N.version){const ne=N.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(q,N,E);return}}else N.isExternalTexture&&(q.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+E)}function L(N,E){const q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&q.__version!==N.version){j(q,N,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+E)}function z(N,E){const q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&q.__version!==N.version){j(q,N,E);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+E)}function k(N,E){const q=n.get(N);if(N.version>0&&q.__version!==N.version){Z(q,N,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+E)}const G={[qi]:i.REPEAT,[Mi]:i.CLAMP_TO_EDGE,[Co]:i.MIRRORED_REPEAT},$={[nn]:i.NEAREST,[Bh]:i.NEAREST_MIPMAP_NEAREST,[or]:i.NEAREST_MIPMAP_LINEAR,[mn]:i.LINEAR,[So]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},se={[Kf]:i.NEVER,[np]:i.ALWAYS,[Zf]:i.LESS,[$h]:i.LEQUAL,[Jf]:i.EQUAL,[tp]:i.GEQUAL,[Qf]:i.GREATER,[ep]:i.NOTEQUAL};function ye(N,E){if(E.type===In&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===mn||E.magFilter===So||E.magFilter===or||E.magFilter===oi||E.minFilter===mn||E.minFilter===So||E.minFilter===or||E.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,G[E.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,G[E.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,G[E.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,$[E.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,$[E.minFilter]),E.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,se[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===nn||E.minFilter!==or&&E.minFilter!==oi||E.type===In&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(N,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function fe(N,E){let q=!1;N.__webglInit===void 0&&(N.__webglInit=!0,E.addEventListener("dispose",b));const ne=E.source;let I=f.get(ne);I===void 0&&(I={},f.set(ne,I));const D=O(E);if(D!==N.__cacheKey){I[D]===void 0&&(I[D]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),I[D].usedTimes++;const ee=I[N.__cacheKey];ee!==void 0&&(I[N.__cacheKey].usedTimes--,ee.usedTimes===0&&M(E)),N.__cacheKey=D,N.__webglTexture=I[D].texture}return q}function Ce(N,E,q){return Math.floor(Math.floor(N/q)/E)}function Le(N,E,q,ne){const D=N.updateRanges;if(D.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,q,ne,E.data);else{D.sort((oe,he)=>oe.start-he.start);let ee=0;for(let oe=1;oe<D.length;oe++){const he=D[ee],ce=D[oe],de=he.start+he.count,ve=Ce(ce.start,E.width,4),qe=Ce(he.start,E.width,4);ce.start<=de+1&&ve===qe&&Ce(ce.start+ce.count-1,E.width,4)===ve?he.count=Math.max(he.count,ce.start+ce.count-he.start):(++ee,D[ee]=ce)}D.length=ee+1;const Q=i.getParameter(i.UNPACK_ROW_LENGTH),le=i.getParameter(i.UNPACK_SKIP_PIXELS),Me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let oe=0,he=D.length;oe<he;oe++){const ce=D[oe],de=Math.floor(ce.start/4),ve=Math.ceil(ce.count/4),qe=de%E.width,H=Math.floor(de/E.width),pe=ve,_e=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),i.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,qe,H,pe,_e,q,ne,E.data)}N.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,Q),i.pixelStorei(i.UNPACK_SKIP_PIXELS,le),i.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function j(N,E,q){let ne=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ne=i.TEXTURE_3D);const I=fe(N,E),D=E.source;t.bindTexture(ne,N.__webglTexture,i.TEXTURE0+q);const ee=n.get(D);if(D.version!==ee.__version||I===!0){t.activeTexture(i.TEXTURE0+q);const Q=ot.getPrimaries(ot.workingColorSpace),le=E.colorSpace===Hn?null:ot.getPrimaries(E.colorSpace),Me=E.colorSpace===Hn||Q===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let oe=_(E.image,!1,s.maxTextureSize);oe=lt(E,oe);const he=r.convert(E.format,E.colorSpace),ce=r.convert(E.type);let de=y(E.internalFormat,he,ce,E.colorSpace,E.isVideoTexture);ye(ne,E);let ve;const qe=E.mipmaps,H=E.isVideoTexture!==!0,pe=ee.__version===void 0||I===!0,_e=D.dataReady,we=T(E,oe);if(E.isDepthTexture)de=x(E.format===yr,E.type),pe&&(H?t.texStorage2D(i.TEXTURE_2D,1,de,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,de,oe.width,oe.height,0,he,ce,null));else if(E.isDataTexture)if(qe.length>0){H&&pe&&t.texStorage2D(i.TEXTURE_2D,we,de,qe[0].width,qe[0].height);for(let ue=0,re=qe.length;ue<re;ue++)ve=qe[ue],H?_e&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ve.width,ve.height,he,ce,ve.data):t.texImage2D(i.TEXTURE_2D,ue,de,ve.width,ve.height,0,he,ce,ve.data);E.generateMipmaps=!1}else H?(pe&&t.texStorage2D(i.TEXTURE_2D,we,de,oe.width,oe.height),_e&&Le(E,oe,he,ce)):t.texImage2D(i.TEXTURE_2D,0,de,oe.width,oe.height,0,he,ce,oe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){H&&pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,de,qe[0].width,qe[0].height,oe.depth);for(let ue=0,re=qe.length;ue<re;ue++)if(ve=qe[ue],E.format!==Tn)if(he!==null)if(H){if(_e)if(E.layerUpdates.size>0){const Ie=Ou(ve.width,ve.height,E.format,E.type);for(const Ge of E.layerUpdates){const dt=ve.data.subarray(Ge*Ie/ve.data.BYTES_PER_ELEMENT,(Ge+1)*Ie/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,Ge,ve.width,ve.height,1,he,dt)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,ve.width,ve.height,oe.depth,he,ve.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,de,ve.width,ve.height,oe.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else H?_e&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,ve.width,ve.height,oe.depth,he,ce,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,de,ve.width,ve.height,oe.depth,0,he,ce,ve.data)}else{H&&pe&&t.texStorage2D(i.TEXTURE_2D,we,de,qe[0].width,qe[0].height);for(let ue=0,re=qe.length;ue<re;ue++)ve=qe[ue],E.format!==Tn?he!==null?H?_e&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,ve.width,ve.height,he,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,de,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):H?_e&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,ve.width,ve.height,he,ce,ve.data):t.texImage2D(i.TEXTURE_2D,ue,de,ve.width,ve.height,0,he,ce,ve.data)}else if(E.isDataArrayTexture)if(H){if(pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,de,oe.width,oe.height,oe.depth),_e)if(E.layerUpdates.size>0){const ue=Ou(oe.width,oe.height,E.format,E.type);for(const re of E.layerUpdates){const Ie=oe.data.subarray(re*ue/oe.data.BYTES_PER_ELEMENT,(re+1)*ue/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,re,oe.width,oe.height,1,he,ce,Ie)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,he,ce,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,oe.width,oe.height,oe.depth,0,he,ce,oe.data);else if(E.isData3DTexture)H?(pe&&t.texStorage3D(i.TEXTURE_3D,we,de,oe.width,oe.height,oe.depth),_e&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,he,ce,oe.data)):t.texImage3D(i.TEXTURE_3D,0,de,oe.width,oe.height,oe.depth,0,he,ce,oe.data);else if(E.isFramebufferTexture){if(pe)if(H)t.texStorage2D(i.TEXTURE_2D,we,de,oe.width,oe.height);else{let ue=oe.width,re=oe.height;for(let Ie=0;Ie<we;Ie++)t.texImage2D(i.TEXTURE_2D,Ie,de,ue,re,0,he,ce,null),ue>>=1,re>>=1}}else if(qe.length>0){if(H&&pe){const ue=rt(qe[0]);t.texStorage2D(i.TEXTURE_2D,we,de,ue.width,ue.height)}for(let ue=0,re=qe.length;ue<re;ue++)ve=qe[ue],H?_e&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,he,ce,ve):t.texImage2D(i.TEXTURE_2D,ue,de,he,ce,ve);E.generateMipmaps=!1}else if(H){if(pe){const ue=rt(oe);t.texStorage2D(i.TEXTURE_2D,we,de,ue.width,ue.height)}_e&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,ce,oe)}else t.texImage2D(i.TEXTURE_2D,0,de,he,ce,oe);g(E)&&m(ne),ee.__version=D.version,E.onUpdate&&E.onUpdate(E)}N.__version=E.version}function Z(N,E,q){if(E.image.length!==6)return;const ne=fe(N,E),I=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+q);const D=n.get(I);if(I.version!==D.__version||ne===!0){t.activeTexture(i.TEXTURE0+q);const ee=ot.getPrimaries(ot.workingColorSpace),Q=E.colorSpace===Hn?null:ot.getPrimaries(E.colorSpace),le=E.colorSpace===Hn||ee===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const Me=E.isCompressedTexture||E.image[0].isCompressedTexture,oe=E.image[0]&&E.image[0].isDataTexture,he=[];for(let re=0;re<6;re++)!Me&&!oe?he[re]=_(E.image[re],!0,s.maxCubemapSize):he[re]=oe?E.image[re].image:E.image[re],he[re]=lt(E,he[re]);const ce=he[0],de=r.convert(E.format,E.colorSpace),ve=r.convert(E.type),qe=y(E.internalFormat,de,ve,E.colorSpace),H=E.isVideoTexture!==!0,pe=D.__version===void 0||ne===!0,_e=I.dataReady;let we=T(E,ce);ye(i.TEXTURE_CUBE_MAP,E);let ue;if(Me){H&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,qe,ce.width,ce.height);for(let re=0;re<6;re++){ue=he[re].mipmaps;for(let Ie=0;Ie<ue.length;Ie++){const Ge=ue[Ie];E.format!==Tn?de!==null?H?_e&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,0,0,Ge.width,Ge.height,de,Ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,qe,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,0,0,Ge.width,Ge.height,de,ve,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie,qe,Ge.width,Ge.height,0,de,ve,Ge.data)}}}else{if(ue=E.mipmaps,H&&pe){ue.length>0&&we++;const re=rt(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,qe,re.width,re.height)}for(let re=0;re<6;re++)if(oe){H?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,he[re].width,he[re].height,de,ve,he[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,qe,he[re].width,he[re].height,0,de,ve,he[re].data);for(let Ie=0;Ie<ue.length;Ie++){const dt=ue[Ie].image[re].image;H?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,0,0,dt.width,dt.height,de,ve,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,qe,dt.width,dt.height,0,de,ve,dt.data)}}else{H?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,de,ve,he[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,qe,de,ve,he[re]);for(let Ie=0;Ie<ue.length;Ie++){const Ge=ue[Ie];H?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,0,0,de,ve,Ge.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ie+1,qe,de,ve,Ge.image[re])}}}g(E)&&m(i.TEXTURE_CUBE_MAP),D.__version=I.version,E.onUpdate&&E.onUpdate(E)}N.__version=E.version}function te(N,E,q,ne,I,D){const ee=r.convert(q.format,q.colorSpace),Q=r.convert(q.type),le=y(q.internalFormat,ee,Q,q.colorSpace),Me=n.get(E),oe=n.get(q);if(oe.__renderTarget=E,!Me.__hasExternalTextures){const he=Math.max(1,E.width>>D),ce=Math.max(1,E.height>>D);I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?t.texImage3D(I,D,le,he,ce,E.depth,0,ee,Q,null):t.texImage2D(I,D,le,he,ce,0,ee,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,N),Ee(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,I,oe.__webglTexture,0,Ke(E)):(I===i.TEXTURE_2D||I>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&I<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,I,oe.__webglTexture,D),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(N,E,q){if(i.bindRenderbuffer(i.RENDERBUFFER,N),E.depthBuffer){const ne=E.depthTexture,I=ne&&ne.isDepthTexture?ne.type:null,D=x(E.stencilBuffer,I),ee=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=Ke(E);Ee(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,D,E.width,E.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,D,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,D,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,N)}else{const ne=E.textures;for(let I=0;I<ne.length;I++){const D=ne[I],ee=r.convert(D.format,D.colorSpace),Q=r.convert(D.type),le=y(D.internalFormat,ee,Q,D.colorSpace),Me=Ke(E);q&&Ee(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,le,E.width,E.height):Ee(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,le,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,le,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(N,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,N),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(E.depthTexture);ne.__renderTarget=E,(!ne.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),V(E.depthTexture,0);const I=ne.__webglTexture,D=Ke(E);if(E.depthTexture.format===vr)Ee(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,I,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,I,0);else if(E.depthTexture.format===yr)Ee(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,I,0,D):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,I,0);else throw new Error("Unknown depthTexture format")}function Pe(N){const E=n.get(N),q=N.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==N.depthTexture){const ne=N.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ne){const I=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ne.removeEventListener("dispose",I)};ne.addEventListener("dispose",I),E.__depthDisposeCallback=I}E.__boundDepthTexture=ne}if(N.depthTexture&&!E.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const ne=N.texture.mipmaps;ne&&ne.length>0?ge(E.__webglFramebuffer[0],N):ge(E.__webglFramebuffer,N)}else if(q){E.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[ne]),E.__webglDepthbuffer[ne]===void 0)E.__webglDepthbuffer[ne]=i.createRenderbuffer(),ae(E.__webglDepthbuffer[ne],N,!1);else{const I=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=E.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,D),i.framebufferRenderbuffer(i.FRAMEBUFFER,I,i.RENDERBUFFER,D)}}else{const ne=N.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ae(E.__webglDepthbuffer,N,!1);else{const I=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,D),i.framebufferRenderbuffer(i.FRAMEBUFFER,I,i.RENDERBUFFER,D)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function et(N,E,q){const ne=n.get(N);E!==void 0&&te(ne.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&Pe(N)}function B(N){const E=N.texture,q=n.get(N),ne=n.get(E);N.addEventListener("dispose",A);const I=N.textures,D=N.isWebGLCubeRenderTarget===!0,ee=I.length>1;if(ee||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=E.version,o.memory.textures++),D){q.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[Q]=[];for(let le=0;le<E.mipmaps.length;le++)q.__webglFramebuffer[Q][le]=i.createFramebuffer()}else q.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)q.__webglFramebuffer[Q]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(ee)for(let Q=0,le=I.length;Q<le;Q++){const Me=n.get(I[Q]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&Ee(N)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Q=0;Q<I.length;Q++){const le=I[Q];q.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[Q]);const Me=r.convert(le.format,le.colorSpace),oe=r.convert(le.type),he=y(le.internalFormat,Me,oe,le.colorSpace,N.isXRRenderTarget===!0),ce=Ke(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,he,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,q.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(q.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(D){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),ye(i.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0)for(let le=0;le<E.mipmaps.length;le++)te(q.__webglFramebuffer[Q][le],N,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,le);else te(q.__webglFramebuffer[Q],N,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);g(E)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){for(let Q=0,le=I.length;Q<le;Q++){const Me=I[Q],oe=n.get(Me);let he=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(he=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,oe.__webglTexture),ye(he,Me),te(q.__webglFramebuffer,N,Me,i.COLOR_ATTACHMENT0+Q,he,0),g(Me)&&m(he)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Q=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,ne.__webglTexture),ye(Q,E),E.mipmaps&&E.mipmaps.length>0)for(let le=0;le<E.mipmaps.length;le++)te(q.__webglFramebuffer[le],N,E,i.COLOR_ATTACHMENT0,Q,le);else te(q.__webglFramebuffer,N,E,i.COLOR_ATTACHMENT0,Q,0);g(E)&&m(Q),t.unbindTexture()}N.depthBuffer&&Pe(N)}function je(N){const E=N.textures;for(let q=0,ne=E.length;q<ne;q++){const I=E[q];if(g(I)){const D=v(N),ee=n.get(I).__webglTexture;t.bindTexture(D,ee),m(D),t.unbindTexture()}}}const De=[],Oe=[];function Re(N){if(N.samples>0){if(Ee(N)===!1){const E=N.textures,q=N.width,ne=N.height;let I=i.COLOR_BUFFER_BIT;const D=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=n.get(N),Q=E.length>1;if(Q)for(let Me=0;Me<E.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ee.__webglMultisampledFramebuffer);const le=N.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ee.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ee.__webglFramebuffer);for(let Me=0;Me<E.length;Me++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(I|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(I|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ee.__webglColorRenderbuffer[Me]);const oe=n.get(E[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,oe,0)}i.blitFramebuffer(0,0,q,ne,0,0,q,ne,I,i.NEAREST),l===!0&&(De.length=0,Oe.length=0,De.push(i.COLOR_ATTACHMENT0+Me),N.depthBuffer&&N.resolveDepthBuffer===!1&&(De.push(D),Oe.push(D),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Oe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let Me=0;Me<E.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,ee.__webglColorRenderbuffer[Me]);const oe=n.get(E[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ee.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&l){const E=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Ke(N){return Math.min(s.maxSamples,N.samples)}function Ee(N){const E=n.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ze(N){const E=o.render.frame;u.get(N)!==E&&(u.set(N,E),N.update())}function lt(N,E){const q=N.colorSpace,ne=N.format,I=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||q!==Ot&&q!==Hn&&(ot.getTransfer(q)===xt?(ne!==Tn||I!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),E}function rt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=L,this.setTexture3D=z,this.setTextureCube=k,this.rebindTextures=et,this.setupRenderTarget=B,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=te,this.useMultisampledRTT=Ee}function Bv(i,e){function t(n,s=Hn){let r;const o=ot.getTransfer(s);if(n===Wn)return i.UNSIGNED_BYTE;if(n===tl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===nl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===kh)return i.BYTE;if(n===zh)return i.SHORT;if(n===_r)return i.UNSIGNED_SHORT;if(n===el)return i.INT;if(n===$i)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Lr)return i.HALF_FLOAT;if(n===Gh)return i.ALPHA;if(n===Wh)return i.RGB;if(n===Tn)return i.RGBA;if(n===vr)return i.DEPTH_COMPONENT;if(n===yr)return i.DEPTH_STENCIL;if(n===il)return i.RED;if(n===sl)return i.RED_INTEGER;if(n===Xh)return i.RG;if(n===rl)return i.RG_INTEGER;if(n===ol)return i.RGBA_INTEGER;if(n===bo||n===To||n===Eo||n===wo)if(o===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===bo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===bo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===dc||n===fc||n===pc||n===mc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===dc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gc||n===_c||n===xc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===gc||n===_c)return o===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vc||n===yc||n===Mc||n===Sc||n===bc||n===Tc||n===Ec||n===wc||n===Ac||n===Rc||n===Cc||n===Pc||n===Lc||n===Ic)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ec)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ac)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lc)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ic)return o===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Dc||n===Nc||n===Uc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Dc)return o===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fc||n===Oc||n===Bc||n===kc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const kv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Hv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ud(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new di({vertexShader:kv,fragmentShader:zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new Cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Vv extends Hs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",g=new Hv,m={},v=t.getContextAttributes();let y=null,x=null;const T=[],b=[],A=new be;let w=null;const M=new en;M.viewport=new ut;const S=new en;S.viewport=new ut;const P=[M,S],F=new e0;let U=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Z=T[j];return Z===void 0&&(Z=new ya,T[j]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(j){let Z=T[j];return Z===void 0&&(Z=new ya,T[j]=Z),Z.getGripSpace()},this.getHand=function(j){let Z=T[j];return Z===void 0&&(Z=new ya,T[j]=Z),Z.getHandSpace()};function V(j){const Z=b.indexOf(j.inputSource);if(Z===-1)return;const te=T[Z];te!==void 0&&(te.update(j.inputSource,j.frame,c||o),te.dispatchEvent({type:j.type,data:j.inputSource}))}function L(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",z);for(let j=0;j<T.length;j++){const Z=b[j];Z!==null&&(b[j]=null,T[j].disconnect(Z))}U=null,O=null,g.reset();for(const j in m)delete m[j];e.setRenderTarget(y),d=null,f=null,h=null,s=null,x=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",L),s.addEventListener("inputsourceschange",z),v.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,ae=null,ge=null;v.depth&&(ge=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=v.stencil?yr:vr,ae=v.stencil?xr:$i);const Pe={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Pe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Yi(f.textureWidth,f.textureHeight,{format:Tn,type:Wn,depthTexture:new ld(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const te={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Yi(d.framebufferWidth,d.framebufferHeight,{format:Tn,type:Wn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Le.setContext(s),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(j){for(let Z=0;Z<j.removed.length;Z++){const te=j.removed[Z],ae=b.indexOf(te);ae>=0&&(b[ae]=null,T[ae].disconnect(te))}for(let Z=0;Z<j.added.length;Z++){const te=j.added[Z];let ae=b.indexOf(te);if(ae===-1){for(let Pe=0;Pe<T.length;Pe++)if(Pe>=b.length){b.push(te),ae=Pe;break}else if(b[Pe]===null){b[Pe]=te,ae=Pe;break}if(ae===-1)break}const ge=T[ae];ge&&ge.connect(te)}}const k=new R,G=new R;function $(j,Z,te){k.setFromMatrixPosition(Z.matrixWorld),G.setFromMatrixPosition(te.matrixWorld);const ae=k.distanceTo(G),ge=Z.projectionMatrix.elements,Pe=te.projectionMatrix.elements,et=ge[14]/(ge[10]-1),B=ge[14]/(ge[10]+1),je=(ge[9]+1)/ge[5],De=(ge[9]-1)/ge[5],Oe=(ge[8]-1)/ge[0],Re=(Pe[8]+1)/Pe[0],Ke=et*Oe,Ee=et*Re,ze=ae/(-Oe+Re),lt=ze*-Oe;if(Z.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(lt),j.translateZ(ze),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ge[10]===-1)j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const rt=et+ze,N=B+ze,E=Ke-lt,q=Ee+(ae-lt),ne=je*B/N*rt,I=De*B/N*rt;j.projectionMatrix.makePerspective(E,q,ne,I,rt,N),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function se(j,Z){Z===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Z.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Z=j.near,te=j.far;g.texture!==null&&(g.depthNear>0&&(Z=g.depthNear),g.depthFar>0&&(te=g.depthFar)),F.near=S.near=M.near=Z,F.far=S.far=M.far=te,(U!==F.near||O!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),U=F.near,O=F.far),F.layers.mask=j.layers.mask|6,M.layers.mask=F.layers.mask&3,S.layers.mask=F.layers.mask&5;const ae=j.parent,ge=F.cameras;se(F,ae);for(let Pe=0;Pe<ge.length;Pe++)se(ge[Pe],ae);ge.length===2?$(F,M,S):F.projectionMatrix.copy(M.projectionMatrix),ye(j,F,ae)};function ye(j,Z,te){te===null?j.matrix.copy(Z.matrixWorld):(j.matrix.copy(te.matrixWorld),j.matrix.invert(),j.matrix.multiply(Z.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ns*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(j){return m[j]};let fe=null;function Ce(j,Z){if(u=Z.getViewerPose(c||o),p=Z,u!==null){const te=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let ae=!1;te.length!==F.cameras.length&&(F.cameras.length=0,ae=!0);for(let B=0;B<te.length;B++){const je=te[B];let De=null;if(d!==null)De=d.getViewport(je);else{const Re=h.getViewSubImage(f,je);De=Re.viewport,B===0&&(e.setRenderTargetTextures(x,Re.colorTexture,Re.depthStencilTexture),e.setRenderTarget(x))}let Oe=P[B];Oe===void 0&&(Oe=new en,Oe.layers.enable(B),Oe.viewport=new ut,P[B]=Oe),Oe.matrix.fromArray(je.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(je.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(De.x,De.y,De.width,De.height),B===0&&(F.matrix.copy(Oe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ae===!0&&F.cameras.push(Oe)}const ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const B=h.getDepthInformation(te[0]);B&&B.isValid&&B.texture&&g.init(B,s.renderState)}if(ge&&ge.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let B=0;B<te.length;B++){const je=te[B].camera;if(je){let De=m[je];De||(De=new ud,m[je]=De);const Oe=h.getCameraImage(je);De.sourceTexture=Oe}}}}for(let te=0;te<T.length;te++){const ae=b[te],ge=T[te];ae!==null&&ge!==void 0&&ge.update(ae,Z,c||o)}fe&&fe(j,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),p=null}const Le=new Td;Le.setAnimationLoop(Ce),this.setAnimationLoop=function(j){fe=j},this.dispose=function(){}}}const Di=new Wt,Gv=new Xe;function Wv(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,ed(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,v,y,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===tn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===tn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),y=v.envMap,x=v.envMapRotation;y&&(g.envMap.value=y,Di.copy(x),Di.x*=-1,Di.y*=-1,Di.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),g.envMapRotation.value.setFromMatrix4(Gv.makeRotationFromEuler(Di)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Xv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const x=y.program;n.uniformBlockBinding(v,x)}function c(v,y){let x=s[v.id];x===void 0&&(p(v),x=u(v),s[v.id]=x,v.addEventListener("dispose",g));const T=y.program;n.updateUBOMapping(v,T);const b=e.render.frame;r[v.id]!==b&&(f(v),r[v.id]=b)}function u(v){const y=h();v.__bindingPointIndex=y;const x=i.createBuffer(),T=v.__size,b=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const y=s[v.id],x=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let b=0,A=x.length;b<A;b++){const w=Array.isArray(x[b])?x[b]:[x[b]];for(let M=0,S=w.length;M<S;M++){const P=w[M];if(d(P,b,M,T)===!0){const F=P.__offset,U=Array.isArray(P.value)?P.value:[P.value];let O=0;for(let V=0;V<U.length;V++){const L=U[V],z=_(L);typeof L=="number"||typeof L=="boolean"?(P.__data[0]=L,i.bufferSubData(i.UNIFORM_BUFFER,F+O,P.__data)):L.isMatrix3?(P.__data[0]=L.elements[0],P.__data[1]=L.elements[1],P.__data[2]=L.elements[2],P.__data[3]=0,P.__data[4]=L.elements[3],P.__data[5]=L.elements[4],P.__data[6]=L.elements[5],P.__data[7]=0,P.__data[8]=L.elements[6],P.__data[9]=L.elements[7],P.__data[10]=L.elements[8],P.__data[11]=0):(L.toArray(P.__data,O),O+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,y,x,T){const b=v.value,A=y+"_"+x;if(T[A]===void 0)return typeof b=="number"||typeof b=="boolean"?T[A]=b:T[A]=b.clone(),!0;{const w=T[A];if(typeof b=="number"||typeof b=="boolean"){if(w!==b)return T[A]=b,!0}else if(w.equals(b)===!1)return w.copy(b),!0}return!1}function p(v){const y=v.uniforms;let x=0;const T=16;for(let A=0,w=y.length;A<w;A++){const M=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,P=M.length;S<P;S++){const F=M[S],U=Array.isArray(F.value)?F.value:[F.value];for(let O=0,V=U.length;O<V;O++){const L=U[O],z=_(L),k=x%T,G=k%z.boundary,$=k+G;x+=G,$!==0&&T-$<z.storage&&(x+=T-$),F.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=z.storage}}}const b=x%T;return b>0&&(x+=T-b),v.__size=x,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class qv{constructor(e={}){const{canvas:t=vp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let T=!1;this._outputColorSpace=Bt;let b=0,A=0,w=null,M=-1,S=null;const P=new ut,F=new ut;let U=null;const O=new me(0);let V=0,L=t.width,z=t.height,k=1,G=null,$=null;const se=new ut(0,0,L,z),ye=new ut(0,0,L,z);let fe=!1;const Ce=new dl;let Le=!1,j=!1;const Z=new Xe,te=new R,ae=new ut,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Pe=!1;function et(){return w===null?k:1}let B=n;function je(C,W){return t.getContext(C,W)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jc}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",ue,!1),B===null){const W="webgl2";if(B=je(W,C),B===null)throw je(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let De,Oe,Re,Ke,Ee,ze,lt,rt,N,E,q,ne,I,D,ee,Q,le,Me,oe,he,ce,de,ve,qe;function H(){De=new nx(B),De.init(),de=new Bv(B,De),Oe=new j_(B,De,e,de),Re=new Fv(B,De),Oe.reversedDepthBuffer&&f&&Re.buffers.depth.setReversed(!0),Ke=new rx(B),Ee=new bv,ze=new Ov(B,De,Re,Ee,Oe,de,Ke),lt=new Z_(x),rt=new tx(x),N=new h0(B),ve=new $_(B,N),E=new ix(B,N,Ke,ve),q=new ax(B,E,N,Ke),oe=new ox(B,Oe,ze),Q=new K_(Ee),ne=new Sv(x,lt,rt,De,Oe,ve,Q),I=new Wv(x,Ee),D=new Ev,ee=new Lv(De),Me=new q_(x,lt,rt,Re,q,d,l),le=new Nv(x,q,Oe),qe=new Xv(B,Ke,Oe,Re),he=new Y_(B,De,Ke),ce=new sx(B,De,Ke),Ke.programs=ne.programs,x.capabilities=Oe,x.extensions=De,x.properties=Ee,x.renderLists=D,x.shadowMap=le,x.state=Re,x.info=Ke}H();const pe=new Vv(x,B);this.xr=pe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const C=De.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=De.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(C){C!==void 0&&(k=C,this.setSize(L,z,!1))},this.getSize=function(C){return C.set(L,z)},this.setSize=function(C,W,K=!0){if(pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=C,z=W,t.width=Math.floor(C*k),t.height=Math.floor(W*k),K===!0&&(t.style.width=C+"px",t.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(L*k,z*k).floor()},this.setDrawingBufferSize=function(C,W,K){L=C,z=W,k=K,t.width=Math.floor(C*K),t.height=Math.floor(W*K),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(P)},this.getViewport=function(C){return C.copy(se)},this.setViewport=function(C,W,K,J){C.isVector4?se.set(C.x,C.y,C.z,C.w):se.set(C,W,K,J),Re.viewport(P.copy(se).multiplyScalar(k).round())},this.getScissor=function(C){return C.copy(ye)},this.setScissor=function(C,W,K,J){C.isVector4?ye.set(C.x,C.y,C.z,C.w):ye.set(C,W,K,J),Re.scissor(F.copy(ye).multiplyScalar(k).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(C){Re.setScissorTest(fe=C)},this.setOpaqueSort=function(C){G=C},this.setTransparentSort=function(C){$=C},this.getClearColor=function(C){return C.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(C=!0,W=!0,K=!0){let J=0;if(C){let X=!1;if(w!==null){const xe=w.texture.format;X=xe===ol||xe===rl||xe===sl}if(X){const xe=w.texture.type,Ae=xe===Wn||xe===$i||xe===_r||xe===xr||xe===tl||xe===nl,Ue=Me.getClearColor(),Ne=Me.getClearAlpha(),Ve=Ue.r,We=Ue.g,Be=Ue.b;Ae?(p[0]=Ve,p[1]=We,p[2]=Be,p[3]=Ne,B.clearBufferuiv(B.COLOR,0,p)):(_[0]=Ve,_[1]=We,_[2]=Be,_[3]=Ne,B.clearBufferiv(B.COLOR,0,_))}else J|=B.COLOR_BUFFER_BIT}W&&(J|=B.DEPTH_BUFFER_BIT),K&&(J|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),Me.dispose(),D.dispose(),ee.dispose(),Ee.dispose(),lt.dispose(),rt.dispose(),q.dispose(),ve.dispose(),qe.dispose(),ne.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",ie),pe.removeEventListener("sessionend",$e),tt.stop()};function _e(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=Ke.autoReset,W=le.enabled,K=le.autoUpdate,J=le.needsUpdate,X=le.type;H(),Ke.autoReset=C,le.enabled=W,le.autoUpdate=K,le.needsUpdate=J,le.type=X}function ue(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function re(C){const W=C.target;W.removeEventListener("dispose",re),Ie(W)}function Ie(C){Ge(C),Ee.remove(C)}function Ge(C){const W=Ee.get(C).programs;W!==void 0&&(W.forEach(function(K){ne.releaseProgram(K)}),C.isShaderMaterial&&ne.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,K,J,X,xe){W===null&&(W=ge);const Ae=X.isMesh&&X.matrixWorld.determinant()<0,Ue=jd(C,W,K,J,X);Re.setMaterial(J,Ae);let Ne=K.index,Ve=1;if(J.wireframe===!0){if(Ne=E.getWireframeAttribute(K),Ne===void 0)return;Ve=2}const We=K.drawRange,Be=K.attributes.position;let nt=We.start*Ve,mt=(We.start+We.count)*Ve;xe!==null&&(nt=Math.max(nt,xe.start*Ve),mt=Math.min(mt,(xe.start+xe.count)*Ve)),Ne!==null?(nt=Math.max(nt,0),mt=Math.min(mt,Ne.count)):Be!=null&&(nt=Math.max(nt,0),mt=Math.min(mt,Be.count));const Rt=mt-nt;if(Rt<0||Rt===1/0)return;ve.setup(X,J,Ue,K,Ne);let Mt,vt=he;if(Ne!==null&&(Mt=N.get(Ne),vt=ce,vt.setIndex(Mt)),X.isMesh)J.wireframe===!0?(Re.setLineWidth(J.wireframeLinewidth*et()),vt.setMode(B.LINES)):vt.setMode(B.TRIANGLES);else if(X.isLine){let ke=J.linewidth;ke===void 0&&(ke=1),Re.setLineWidth(ke*et()),X.isLineSegments?vt.setMode(B.LINES):X.isLineLoop?vt.setMode(B.LINE_LOOP):vt.setMode(B.LINE_STRIP)}else X.isPoints?vt.setMode(B.POINTS):X.isSprite&&vt.setMode(B.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Er("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),vt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))vt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const ke=X._multiDrawStarts,Tt=X._multiDrawCounts,ct=X._multiDrawCount,un=Ne?N.get(Ne).bytesPerElement:1,Ji=Ee.get(J).currentProgram.getUniforms();for(let hn=0;hn<ct;hn++)Ji.setValue(B,"_gl_DrawID",hn),vt.render(ke[hn]/un,Tt[hn])}else if(X.isInstancedMesh)vt.renderInstances(nt,Rt,X.count);else if(K.isInstancedBufferGeometry){const ke=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Tt=Math.min(K.instanceCount,ke);vt.renderInstances(nt,Rt,Tt)}else vt.render(nt,Rt)};function dt(C,W,K){C.transparent===!0&&C.side===zn&&C.forceSinglePass===!1?(C.side=tn,C.needsUpdate=!0,on(C,W,K),C.side=hi,C.needsUpdate=!0,on(C,W,K),C.side=zn):on(C,W,K)}this.compile=function(C,W,K=null){K===null&&(K=C),m=ee.get(K),m.init(W),y.push(m),K.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),C!==K&&C.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(m.pushLight(X),X.castShadow&&m.pushShadow(X))}),m.setupLights();const J=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const xe=X.material;if(xe)if(Array.isArray(xe))for(let Ae=0;Ae<xe.length;Ae++){const Ue=xe[Ae];dt(Ue,K,X),J.add(Ue)}else dt(xe,K,X),J.add(xe)}),m=y.pop(),J},this.compileAsync=function(C,W,K=null){const J=this.compile(C,W,K);return new Promise(X=>{function xe(){if(J.forEach(function(Ae){Ee.get(Ae).currentProgram.isReady()&&J.delete(Ae)}),J.size===0){X(C);return}setTimeout(xe,10)}De.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let at=null;function _n(C){at&&at(C)}function ie(){tt.stop()}function $e(){tt.start()}const tt=new Td;tt.setAnimationLoop(_n),typeof self<"u"&&tt.setContext(self),this.setAnimationLoop=function(C){at=C,pe.setAnimationLoop(C),C===null?tt.stop():tt.start()},pe.addEventListener("sessionstart",ie),pe.addEventListener("sessionend",$e),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(W),W=pe.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,W,w),m=ee.get(C,y.length),m.init(W),y.push(m),Z.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Ce.setFromProjectionMatrix(Z,Gn,W.reversedDepth),j=this.localClippingEnabled,Le=Q.init(this.clippingPlanes,j),g=D.get(C,v.length),g.init(),v.push(g),pe.enabled===!0&&pe.isPresenting===!0){const xe=x.xr.getDepthSensingMesh();xe!==null&&rn(xe,W,-1/0,x.sortObjects)}rn(C,W,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(G,$),Pe=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,Pe&&Me.addToRenderList(g,C),this.info.render.frame++,Le===!0&&Q.beginShadows();const K=m.state.shadowsArray;le.render(K,C,W),Le===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=g.opaque,X=g.transmissive;if(m.setupLights(),W.isArrayCamera){const xe=W.cameras;if(X.length>0)for(let Ae=0,Ue=xe.length;Ae<Ue;Ae++){const Ne=xe[Ae];At(J,X,C,Ne)}Pe&&Me.render(C);for(let Ae=0,Ue=xe.length;Ae<Ue;Ae++){const Ne=xe[Ae];$t(g,C,Ne,Ne.viewport)}}else X.length>0&&At(J,X,C,W),Pe&&Me.render(C),$t(g,C,W);w!==null&&A===0&&(ze.updateMultisampleRenderTarget(w),ze.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(x,C,W),ve.resetDefaultState(),M=-1,S=null,y.pop(),y.length>0?(m=y[y.length-1],Le===!0&&Q.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function rn(C,W,K,J){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Ce.intersectsSprite(C)){J&&ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Z);const Ae=q.update(C),Ue=C.material;Ue.visible&&g.push(C,Ae,Ue,K,ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Ce.intersectsObject(C))){const Ae=q.update(C),Ue=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ae.copy(C.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ae.copy(Ae.boundingSphere.center)),ae.applyMatrix4(C.matrixWorld).applyMatrix4(Z)),Array.isArray(Ue)){const Ne=Ae.groups;for(let Ve=0,We=Ne.length;Ve<We;Ve++){const Be=Ne[Ve],nt=Ue[Be.materialIndex];nt&&nt.visible&&g.push(C,Ae,nt,K,ae.z,Be)}}else Ue.visible&&g.push(C,Ae,Ue,K,ae.z,null)}}const xe=C.children;for(let Ae=0,Ue=xe.length;Ae<Ue;Ae++)rn(xe[Ae],W,K,J)}function $t(C,W,K,J){const X=C.opaque,xe=C.transmissive,Ae=C.transparent;m.setupLightsView(K),Le===!0&&Q.setGlobalState(x.clippingPlanes,K),J&&Re.viewport(P.copy(J)),X.length>0&&ln(X,W,K),xe.length>0&&ln(xe,W,K),Ae.length>0&&ln(Ae,W,K),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function At(C,W,K,J){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[J.id]===void 0&&(m.state.transmissionRenderTarget[J.id]=new Yi(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Lr:Wn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));const xe=m.state.transmissionRenderTarget[J.id],Ae=J.viewport||P;xe.setSize(Ae.z*x.transmissionResolutionScale,Ae.w*x.transmissionResolutionScale);const Ue=x.getRenderTarget(),Ne=x.getActiveCubeFace(),Ve=x.getActiveMipmapLevel();x.setRenderTarget(xe),x.getClearColor(O),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),Pe&&Me.render(K);const We=x.toneMapping;x.toneMapping=bi;const Be=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),m.setupLightsView(J),Le===!0&&Q.setGlobalState(x.clippingPlanes,J),ln(C,K,J),ze.updateMultisampleRenderTarget(xe),ze.updateRenderTargetMipmap(xe),De.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let mt=0,Rt=W.length;mt<Rt;mt++){const Mt=W[mt],vt=Mt.object,ke=Mt.geometry,Tt=Mt.material,ct=Mt.group;if(Tt.side===zn&&vt.layers.test(J.layers)){const un=Tt.side;Tt.side=tn,Tt.needsUpdate=!0,Dr(vt,K,J,ke,Tt,ct),Tt.side=un,Tt.needsUpdate=!0,nt=!0}}nt===!0&&(ze.updateMultisampleRenderTarget(xe),ze.updateRenderTargetMipmap(xe))}x.setRenderTarget(Ue,Ne,Ve),x.setClearColor(O,V),Be!==void 0&&(J.viewport=Be),x.toneMapping=We}function ln(C,W,K){const J=W.isScene===!0?W.overrideMaterial:null;for(let X=0,xe=C.length;X<xe;X++){const Ae=C[X],Ue=Ae.object,Ne=Ae.geometry,Ve=Ae.group;let We=Ae.material;We.allowOverride===!0&&J!==null&&(We=J),Ue.layers.test(K.layers)&&Dr(Ue,W,K,Ne,We,Ve)}}function Dr(C,W,K,J,X,xe){C.onBeforeRender(x,W,K,J,X,xe),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(x,W,K,J,C,xe),X.transparent===!0&&X.side===zn&&X.forceSinglePass===!1?(X.side=tn,X.needsUpdate=!0,x.renderBufferDirect(K,W,J,X,C,xe),X.side=hi,X.needsUpdate=!0,x.renderBufferDirect(K,W,J,X,C,xe),X.side=zn):x.renderBufferDirect(K,W,J,X,C,xe),C.onAfterRender(x,W,K,J,X,xe)}function on(C,W,K){W.isScene!==!0&&(W=ge);const J=Ee.get(C),X=m.state.lights,xe=m.state.shadowsArray,Ae=X.state.version,Ue=ne.getParameters(C,X.state,xe,W,K),Ne=ne.getProgramCacheKey(Ue);let Ve=J.programs;J.environment=C.isMeshStandardMaterial?W.environment:null,J.fog=W.fog,J.envMap=(C.isMeshStandardMaterial?rt:lt).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?W.environmentRotation:C.envMapRotation,Ve===void 0&&(C.addEventListener("dispose",re),Ve=new Map,J.programs=Ve);let We=Ve.get(Ne);if(We!==void 0){if(J.currentProgram===We&&J.lightsStateVersion===Ae)return Bl(C,Ue),We}else Ue.uniforms=ne.getUniforms(C),C.onBeforeCompile(Ue,x),We=ne.acquireProgram(Ue,Ne),Ve.set(Ne,We),J.uniforms=Ue.uniforms;const Be=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Be.clippingPlanes=Q.uniform),Bl(C,Ue),J.needsLights=Zd(C),J.lightsStateVersion=Ae,J.needsLights&&(Be.ambientLightColor.value=X.state.ambient,Be.lightProbe.value=X.state.probe,Be.directionalLights.value=X.state.directional,Be.directionalLightShadows.value=X.state.directionalShadow,Be.spotLights.value=X.state.spot,Be.spotLightShadows.value=X.state.spotShadow,Be.rectAreaLights.value=X.state.rectArea,Be.ltc_1.value=X.state.rectAreaLTC1,Be.ltc_2.value=X.state.rectAreaLTC2,Be.pointLights.value=X.state.point,Be.pointLightShadows.value=X.state.pointShadow,Be.hemisphereLights.value=X.state.hemi,Be.directionalShadowMap.value=X.state.directionalShadowMap,Be.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Be.spotShadowMap.value=X.state.spotShadowMap,Be.spotLightMatrix.value=X.state.spotLightMatrix,Be.spotLightMap.value=X.state.spotLightMap,Be.pointShadowMap.value=X.state.pointShadowMap,Be.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=We,J.uniformsList=null,We}function qs(C){if(C.uniformsList===null){const W=C.currentProgram.getUniforms();C.uniformsList=Ao.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function Bl(C,W){const K=Ee.get(C);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.batchingColor=W.batchingColor,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.instancingMorph=W.instancingMorph,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function jd(C,W,K,J,X){W.isScene!==!0&&(W=ge),ze.resetTextureUnits();const xe=W.fog,Ae=J.isMeshStandardMaterial?W.environment:null,Ue=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Ot,Ne=(J.isMeshStandardMaterial?rt:lt).get(J.envMap||Ae),Ve=J.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,We=!!K.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Be=!!K.morphAttributes.position,nt=!!K.morphAttributes.normal,mt=!!K.morphAttributes.color;let Rt=bi;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Rt=x.toneMapping);const Mt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,vt=Mt!==void 0?Mt.length:0,ke=Ee.get(J),Tt=m.state.lights;if(Le===!0&&(j===!0||C!==S)){const Yt=C===S&&J.id===M;Q.setState(J,C,Yt)}let ct=!1;J.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Tt.state.version||ke.outputColorSpace!==Ue||X.isBatchedMesh&&ke.batching===!1||!X.isBatchedMesh&&ke.batching===!0||X.isBatchedMesh&&ke.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&ke.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&ke.instancing===!1||!X.isInstancedMesh&&ke.instancing===!0||X.isSkinnedMesh&&ke.skinning===!1||!X.isSkinnedMesh&&ke.skinning===!0||X.isInstancedMesh&&ke.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&ke.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&ke.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&ke.instancingMorph===!1&&X.morphTexture!==null||ke.envMap!==Ne||J.fog===!0&&ke.fog!==xe||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Q.numPlanes||ke.numIntersection!==Q.numIntersection)||ke.vertexAlphas!==Ve||ke.vertexTangents!==We||ke.morphTargets!==Be||ke.morphNormals!==nt||ke.morphColors!==mt||ke.toneMapping!==Rt||ke.morphTargetsCount!==vt)&&(ct=!0):(ct=!0,ke.__version=J.version);let un=ke.currentProgram;ct===!0&&(un=on(J,W,X));let Ji=!1,hn=!1,$s=!1;const Et=un.getUniforms(),xn=ke.uniforms;if(Re.useProgram(un.program)&&(Ji=!0,hn=!0,$s=!0),J.id!==M&&(M=J.id,hn=!0),Ji||S!==C){Re.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Et.setValue(B,"projectionMatrix",C.projectionMatrix),Et.setValue(B,"viewMatrix",C.matrixWorldInverse);const an=Et.map.cameraPosition;an!==void 0&&an.setValue(B,te.setFromMatrixPosition(C.matrixWorld)),Oe.logarithmicDepthBuffer&&Et.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Et.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,hn=!0,$s=!0)}if(X.isSkinnedMesh){Et.setOptional(B,X,"bindMatrix"),Et.setOptional(B,X,"bindMatrixInverse");const Yt=X.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),Et.setValue(B,"boneTexture",Yt.boneTexture,ze))}X.isBatchedMesh&&(Et.setOptional(B,X,"batchingTexture"),Et.setValue(B,"batchingTexture",X._matricesTexture,ze),Et.setOptional(B,X,"batchingIdTexture"),Et.setValue(B,"batchingIdTexture",X._indirectTexture,ze),Et.setOptional(B,X,"batchingColorTexture"),X._colorsTexture!==null&&Et.setValue(B,"batchingColorTexture",X._colorsTexture,ze));const vn=K.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&oe.update(X,K,un),(hn||ke.receiveShadow!==X.receiveShadow)&&(ke.receiveShadow=X.receiveShadow,Et.setValue(B,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(xn.envMap.value=Ne,xn.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&W.environment!==null&&(xn.envMapIntensity.value=W.environmentIntensity),hn&&(Et.setValue(B,"toneMappingExposure",x.toneMappingExposure),ke.needsLights&&Kd(xn,$s),xe&&J.fog===!0&&I.refreshFogUniforms(xn,xe),I.refreshMaterialUniforms(xn,J,k,z,m.state.transmissionRenderTarget[C.id]),Ao.upload(B,qs(ke),xn,ze)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ao.upload(B,qs(ke),xn,ze),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Et.setValue(B,"center",X.center),Et.setValue(B,"modelViewMatrix",X.modelViewMatrix),Et.setValue(B,"normalMatrix",X.normalMatrix),Et.setValue(B,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Yt=J.uniformsGroups;for(let an=0,Zo=Yt.length;an<Zo;an++){const Ai=Yt[an];qe.update(Ai,un),qe.bind(Ai,un)}}return un}function Kd(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function Zd(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,W,K){const J=Ee.get(C);J.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Ee.get(C.texture).__webglTexture=W,Ee.get(C.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:K,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,W){const K=Ee.get(C);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0};const Jd=B.createFramebuffer();this.setRenderTarget=function(C,W=0,K=0){w=C,b=W,A=K;let J=!0,X=null,xe=!1,Ae=!1;if(C){const Ne=Ee.get(C);if(Ne.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(B.FRAMEBUFFER,null),J=!1;else if(Ne.__webglFramebuffer===void 0)ze.setupRenderTarget(C);else if(Ne.__hasExternalTextures)ze.rebindTextures(C,Ee.get(C.texture).__webglTexture,Ee.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Be=C.depthTexture;if(Ne.__boundDepthTexture!==Be){if(Be!==null&&Ee.has(Be)&&(C.width!==Be.image.width||C.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ze.setupDepthRenderbuffer(C)}}const Ve=C.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Ae=!0);const We=Ee.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[W])?X=We[W][K]:X=We[W],xe=!0):C.samples>0&&ze.useMultisampledRTT(C)===!1?X=Ee.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?X=We[K]:X=We,P.copy(C.viewport),F.copy(C.scissor),U=C.scissorTest}else P.copy(se).multiplyScalar(k).floor(),F.copy(ye).multiplyScalar(k).floor(),U=fe;if(K!==0&&(X=Jd),Re.bindFramebuffer(B.FRAMEBUFFER,X)&&J&&Re.drawBuffers(C,X),Re.viewport(P),Re.scissor(F),Re.setScissorTest(U),xe){const Ne=Ee.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ne.__webglTexture,K)}else if(Ae){const Ne=W;for(let Ve=0;Ve<C.textures.length;Ve++){const We=Ee.get(C.textures[Ve]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ve,We.__webglTexture,K,Ne)}}else if(C!==null&&K!==0){const Ne=Ee.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ne.__webglTexture,K)}M=-1},this.readRenderTargetPixels=function(C,W,K,J,X,xe,Ae,Ue=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=Ee.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne){Re.bindFramebuffer(B.FRAMEBUFFER,Ne);try{const Ve=C.textures[Ue],We=Ve.format,Be=Ve.type;if(!Oe.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-J&&K>=0&&K<=C.height-X&&(C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ue),B.readPixels(W,K,J,X,de.convert(We),de.convert(Be),xe))}finally{const Ve=w!==null?Ee.get(w).__webglFramebuffer:null;Re.bindFramebuffer(B.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(C,W,K,J,X,xe,Ae,Ue=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=Ee.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ne=Ne[Ae]),Ne)if(W>=0&&W<=C.width-J&&K>=0&&K<=C.height-X){Re.bindFramebuffer(B.FRAMEBUFFER,Ne);const Ve=C.textures[Ue],We=Ve.format,Be=Ve.type;if(!Oe.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const nt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,nt),B.bufferData(B.PIXEL_PACK_BUFFER,xe.byteLength,B.STREAM_READ),C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ue),B.readPixels(W,K,J,X,de.convert(We),de.convert(Be),0);const mt=w!==null?Ee.get(w).__webglFramebuffer:null;Re.bindFramebuffer(B.FRAMEBUFFER,mt);const Rt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await yp(B,Rt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,nt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,xe),B.deleteBuffer(nt),B.deleteSync(Rt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,W=null,K=0){const J=Math.pow(2,-K),X=Math.floor(C.image.width*J),xe=Math.floor(C.image.height*J),Ae=W!==null?W.x:0,Ue=W!==null?W.y:0;ze.setTexture2D(C,0),B.copyTexSubImage2D(B.TEXTURE_2D,K,0,0,Ae,Ue,X,xe),Re.unbindTexture()};const Qd=B.createFramebuffer(),ef=B.createFramebuffer();this.copyTextureToTexture=function(C,W,K=null,J=null,X=0,xe=null){xe===null&&(X!==0?(Er("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=X,X=0):xe=0);let Ae,Ue,Ne,Ve,We,Be,nt,mt,Rt;const Mt=C.isCompressedTexture?C.mipmaps[xe]:C.image;if(K!==null)Ae=K.max.x-K.min.x,Ue=K.max.y-K.min.y,Ne=K.isBox3?K.max.z-K.min.z:1,Ve=K.min.x,We=K.min.y,Be=K.isBox3?K.min.z:0;else{const vn=Math.pow(2,-X);Ae=Math.floor(Mt.width*vn),Ue=Math.floor(Mt.height*vn),C.isDataArrayTexture?Ne=Mt.depth:C.isData3DTexture?Ne=Math.floor(Mt.depth*vn):Ne=1,Ve=0,We=0,Be=0}J!==null?(nt=J.x,mt=J.y,Rt=J.z):(nt=0,mt=0,Rt=0);const vt=de.convert(W.format),ke=de.convert(W.type);let Tt;W.isData3DTexture?(ze.setTexture3D(W,0),Tt=B.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ze.setTexture2DArray(W,0),Tt=B.TEXTURE_2D_ARRAY):(ze.setTexture2D(W,0),Tt=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,W.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,W.unpackAlignment);const ct=B.getParameter(B.UNPACK_ROW_LENGTH),un=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ji=B.getParameter(B.UNPACK_SKIP_PIXELS),hn=B.getParameter(B.UNPACK_SKIP_ROWS),$s=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Mt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Mt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ve),B.pixelStorei(B.UNPACK_SKIP_ROWS,We),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Be);const Et=C.isDataArrayTexture||C.isData3DTexture,xn=W.isDataArrayTexture||W.isData3DTexture;if(C.isDepthTexture){const vn=Ee.get(C),Yt=Ee.get(W),an=Ee.get(vn.__renderTarget),Zo=Ee.get(Yt.__renderTarget);Re.bindFramebuffer(B.READ_FRAMEBUFFER,an.__webglFramebuffer),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,Zo.__webglFramebuffer);for(let Ai=0;Ai<Ne;Ai++)Et&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ee.get(C).__webglTexture,X,Be+Ai),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ee.get(W).__webglTexture,xe,Rt+Ai)),B.blitFramebuffer(Ve,We,Ae,Ue,nt,mt,Ae,Ue,B.DEPTH_BUFFER_BIT,B.NEAREST);Re.bindFramebuffer(B.READ_FRAMEBUFFER,null),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(X!==0||C.isRenderTargetTexture||Ee.has(C)){const vn=Ee.get(C),Yt=Ee.get(W);Re.bindFramebuffer(B.READ_FRAMEBUFFER,Qd),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,ef);for(let an=0;an<Ne;an++)Et?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,vn.__webglTexture,X,Be+an):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,vn.__webglTexture,X),xn?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Yt.__webglTexture,xe,Rt+an):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Yt.__webglTexture,xe),X!==0?B.blitFramebuffer(Ve,We,Ae,Ue,nt,mt,Ae,Ue,B.COLOR_BUFFER_BIT,B.NEAREST):xn?B.copyTexSubImage3D(Tt,xe,nt,mt,Rt+an,Ve,We,Ae,Ue):B.copyTexSubImage2D(Tt,xe,nt,mt,Ve,We,Ae,Ue);Re.bindFramebuffer(B.READ_FRAMEBUFFER,null),Re.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else xn?C.isDataTexture||C.isData3DTexture?B.texSubImage3D(Tt,xe,nt,mt,Rt,Ae,Ue,Ne,vt,ke,Mt.data):W.isCompressedArrayTexture?B.compressedTexSubImage3D(Tt,xe,nt,mt,Rt,Ae,Ue,Ne,vt,Mt.data):B.texSubImage3D(Tt,xe,nt,mt,Rt,Ae,Ue,Ne,vt,ke,Mt):C.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,xe,nt,mt,Ae,Ue,vt,ke,Mt.data):C.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,xe,nt,mt,Mt.width,Mt.height,vt,Mt.data):B.texSubImage2D(B.TEXTURE_2D,xe,nt,mt,Ae,Ue,vt,ke,Mt);B.pixelStorei(B.UNPACK_ROW_LENGTH,ct),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,un),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ji),B.pixelStorei(B.UNPACK_SKIP_ROWS,hn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,$s),xe===0&&W.generateMipmaps&&B.generateMipmap(Tt),Re.unbindTexture()},this.initRenderTarget=function(C){Ee.get(C).__webglFramebuffer===void 0&&ze.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?ze.setTextureCube(C,0):C.isData3DTexture?ze.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?ze.setTexture2DArray(C,0):ze.setTexture2D(C,0),Re.unbindTexture()},this.resetState=function(){b=0,A=0,w=null,Re.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}}function $v(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new bt;let c=0;for(let u=0;u<i.length;++u){const h=i[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(t){let u=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let p=0;p<d.count;++p)h.push(d.getX(p)+u);u+=i[f].attributes.position.count}l.setIndex(h)}for(const u in r){const h=ah(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][f]);const p=ah(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}return l}function ah(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}const o=new e(r),a=new ht(o,t,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let f=0,d=u.count;f<d;f++)for(let p=0;p<t;p++){const _=u.getComponent(f,p);a.setComponent(f+h,p,_)}}else o.set(u.array,l);l+=u.count*t}return s!==void 0&&(a.gpuType=s),a}function ch(i,e){if(e===qf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===zc||e===qh){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===zc)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Yv extends Ws{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Qv(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new ly(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new hy(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new sy(t)}),this.register(function(t){return new ry(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new oy(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new cy(t)}),this.register(function(t){return new ay(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new dy(t)}),this.register(function(t){return new fy(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=mr.extractUrlBase(e);o=mr.resolveURL(c,this.path)}else o=mr.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Sd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Cd){try{o[Qe.KHR_BINARY_GLTF]=new py(e)}catch(h){s&&s(h);return}r=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Ay(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case Qe.KHR_MATERIALS_UNLIT:o[h]=new Zv;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[h]=new my(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[h]=new gy;break;case Qe.KHR_MESH_QUANTIZATION:o[h]=new _y;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function jv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Kv{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new me(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Ot);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new bd(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ms(u),c.distance=h;break;case"spot":c=new Km(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),On(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Zv{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return ai}extendParams(e,t,n){const s=[];e.color=new me(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ot),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Bt))}return Promise.all(s)}}class Jv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Qv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(a,a)}return Promise.all(r)}}class ey{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class ty{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class ny{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new me(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ot)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Bt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class iy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class sy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new me().setRGB(a[0],a[1],a[2],Ot),Promise.all(r)}}class ry{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class oy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new me().setRGB(a[0],a[1],a[2],Ot),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Bt)),Promise.all(r)}}class ay{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class cy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class ly{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class uy{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class hy{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class dy{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,s.mode,s.filter),d})})}else return null}}class fy{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Sn.TRIANGLES&&c.mode!==Sn.TRIANGLE_STRIP&&c.mode!==Sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],f=c[0].count,d=[];for(const p of h){const _=new Xe,g=new R,m=new sn,v=new R(1,1,1),y=new dr(p.geometry,p.material,f);for(let x=0;x<f;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,x),l.SCALE&&v.fromBufferAttribute(l.SCALE,x),y.setMatrixAt(x,_.compose(g,m,v));for(const x in l)if(x==="_COLOR_0"){const T=l[x];y.instanceColor=new Vc(T.array,T.itemSize,T.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&p.geometry.setAttribute(x,l[x]);St.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),d.push(y)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Cd="glTF",nr=12,lh={JSON:1313821514,BIN:5130562};class py{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,nr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Cd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-nr,r=new DataView(e,nr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===lh.JSON){const c=new Uint8Array(e,nr+o,a);this.content=n.decode(c)}else if(l===lh.BIN){const c=nr+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class my{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=Kc[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=Kc[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=Cs[f.componentType];c[h]=d.name,l[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(d){for(const p in d.attributes){const _=d.attributes[p],g=l[p];g!==void 0&&(_.normalized=g)}h(d)},a,c,Ot,f)})})}}class gy{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class _y{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class Pd extends Ir{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,h=(n-t)/u,f=h*h,d=f*h,p=e*c,_=p-c,g=-2*d+3*f,m=d-f,v=1-g,y=m-f+h;for(let x=0;x!==a;x++){const T=o[_+x+a],b=o[_+x+l]*u,A=o[p+x+a],w=o[p+x]*u;r[x]=v*T+y*b+g*A+m*w}return r}}const xy=new sn;class vy extends Pd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return xy.fromArray(r).normalize().toArray(r),r}}const Sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Cs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uh={9728:nn,9729:mn,9984:Bh,9985:So,9986:or,9987:oi},hh={33071:Mi,33648:Co,10497:qi},Oa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Kc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},vi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},yy={CUBICSPLINE:void 0,LINEAR:Sr,STEP:Mr},Ba={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function My(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new It({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:hi})),i.DefaultMaterial}function Ni(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function On(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Sy(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(s){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function by(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ty(i){let e;const t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ka(t.attributes):e=i.indices+":"+ka(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ka(i.targets[n]);return e}function ka(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Zc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ey(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const wy=new Xe;class Ay{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new jv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new $m(this.options.manager):this.textureLoader=new Qm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Sd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Ni(r,a,s),On(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())r(u,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(mr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Oa[s.type],a=Cs[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new ht(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Oa[s.type],c=Cs[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let _,g;if(d&&d!==h){const m=Math.floor(f/d),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let y=t.cache.get(v);y||(_=new c(a,m*d,s.count*d/u),y=new Xp(_,d/u),t.cache.add(v,y)),g=new ul(y,l,f%d/u,p)}else a===null?_=new c(s.count*l):_=new c(a,f,s.count*l),g=new ht(_,l,p);if(s.sparse!==void 0){const m=Oa.SCALAR,v=Cs[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,T=new v(o[1],y,s.sparse.count*m),b=new c(o[2],x,s.sparse.count*l);a!==null&&(g=new ht(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,w=T.length;A<w;A++){const M=T[A];if(g.setX(M,b[A*l]),l>=2&&g.setY(M,b[A*l+1]),l>=3&&g.setZ(M,b[A*l+2]),l>=4&&g.setW(M,b[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=uh[f.magFilter]||mn,u.minFilter=uh[f.minFilter]||oi,u.wrapS=hh[f.wrapS]||qi,u.wrapT=hh[f.wrapT]||qi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==nn&&u.minFilter!==mn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=s.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const f=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(f,d){let p=f;t.isImageBitmapLoader===!0&&(p=function(_){const g=new kt(_);g.needsUpdate=!0,f(g)}),t.load(mr.resolveURL(h,r.path),p,void 0,d)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),On(h,o),h.userData.mimeType=o.mimeType||Ey(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ad,Dn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new od,Dn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return It}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Qe.KHR_MATERIALS_UNLIT]){const h=s[Qe.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new me(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Ot),a.opacity=f[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Bt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=zn);const u=r.alphaMode||Ba.OPAQUE;if(u===Ba.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Ba.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==ai&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new be(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==ai&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==ai){const h=r.emissiveFactor;a.emissive=new me().setRGB(h[0],h[1],h[2],Ot)}return r.emissiveTexture!==void 0&&o!==ai&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Bt)),Promise.all(c).then(function(){const h=new o(a);return r.name&&(h.name=r.name),On(h,r),t.associations.set(h,{materials:e}),r.extensions&&Ni(s,h,r),h})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return dh(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=Ty(c),h=s[u];if(h)o.push(h.promise);else{let f;c.extensions&&c.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=dh(new bt,c,t),s[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?My(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let d=0,p=u.length;d<p;d++){const _=u[d],g=o[d];let m;const v=c[d];if(g.mode===Sn.TRIANGLES||g.mode===Sn.TRIANGLE_STRIP||g.mode===Sn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new $p(_,v):new He(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===Sn.TRIANGLE_STRIP?m.geometry=ch(m.geometry,qh):g.mode===Sn.TRIANGLE_FAN&&(m.geometry=ch(m.geometry,zc));else if(g.mode===Sn.LINES)m=new Qp(_,v);else if(g.mode===Sn.LINE_STRIP)m=new fl(_,v);else if(g.mode===Sn.LINE_LOOP)m=new em(_,v);else if(g.mode===Sn.POINTS)m=new cd(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&by(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),On(m,r),g.extensions&&Ni(s,m,g),t.assignFinalMaterial(m),h.push(m)}for(let d=0,p=h.length;d<p;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&Ni(s,h[0],r),h[0];const f=new yt;r.extensions&&Ni(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,p=h.length;d<p;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new en(br.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new bl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),On(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const f=new Xe;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new hl(a,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){const d=s.channels[h],p=s.samplers[d.sampler],_=d.target,g=_.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,v=s.parameters!==void 0?s.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",v)),c.push(p),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],p=h[2],_=h[3],g=h[4],m=[];for(let y=0,x=f.length;y<x;y++){const T=f[y],b=d[y],A=p[y],w=_[y],M=g[y];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const S=n._createAnimationTracks(T,b,A,w,M);if(S)for(let P=0;P<S.length;P++)m.push(S[P])}const v=new zm(r,void 0,m);return On(v,s),v})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],f=c[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,wy)});for(let d=0,p=h.length;d<p;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new sd:c.length>1?u=new yt:c.length===1?u=c[0]:u=new St,u!==c[0])for(let h=0,f=c.length;h<f;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=o),On(u,r),r.extensions&&Ni(n,u,r),r.matrix!==void 0){const h=new Xe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new yt;n.name&&(r.name=s.createUniqueName(n.name)),On(r,n),n.extensions&&Ni(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);const c=u=>{const h=new Map;for(const[f,d]of s.associations)(f instanceof Dn||f instanceof kt)&&h.set(f,d);return u.traverse(f=>{const d=s.associations.get(f);d!=null&&h.set(f,d)}),h};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,l=[];vi[r.path]===vi.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(vi[r.path]){case vi.weights:c=Os;break;case vi.rotation:c=Bs;break;case vi.translation:case vi.scale:c=ks;break;default:switch(n.itemSize){case 1:c=Os;break;case 2:case 3:default:c=ks;break}break}const u=s.interpolation!==void 0?yy[s.interpolation]:Sr,h=this._getArrayFromAccessor(n);for(let f=0,d=l.length;f<d;f++){const p=new c(l[f]+"."+vi[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Zc(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Bs?vy:Pd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ry(i,e,t){const n=e.attributes,s=new Nn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new R(l[0],l[1],l[2]),new R(c[0],c[1],c[2])),a.normalized){const u=Zc(Cs[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new R,l=new R;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,p=f.max;if(d!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),f.normalized){const _=Zc(Cs[f.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new Un;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function dh(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=Kc[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return ot.workingColorSpace!==Ot&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ot.workingColorSpace}" not supported.`),On(i,e),Ry(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Sy(i,e.targets,t):i})}function $n(i=1){let e=i>>>0;return function(){e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Ti(i=1){const e=$n(i),t=new Uint8Array(512),n=[];for(let l=0;l<256;l++)n.push(l);for(let l=255;l>0;l--){const c=Math.floor(e()*(l+1));[n[l],n[c]]=[n[c],n[l]]}for(let l=0;l<512;l++)t[l]=n[l&255];const s=l=>l*l*l*(l*(l*6-15)+10),r=(l,c,u)=>c+l*(u-c),o=(l,c,u,h)=>{l&=15;const f=l<8?c:u,d=l<4?u:l===12||l===14?c:h;return((l&1)===0?f:-f)+((l&2)===0?d:-d)};function a(l,c,u){const h=Math.floor(l)&255,f=Math.floor(c)&255,d=Math.floor(u)&255;l-=Math.floor(l),c-=Math.floor(c),u-=Math.floor(u);const p=s(l),_=s(c),g=s(u),m=t[h]+f,v=t[m]+d,y=t[m+1]+d,x=t[h+1]+f,T=t[x]+d,b=t[x+1]+d;return r(g,r(_,r(p,o(t[v],l,c,u),o(t[T],l-1,c,u)),r(p,o(t[y],l,c-1,u),o(t[b],l-1,c-1,u))),r(_,r(p,o(t[v+1],l,c,u-1),o(t[T+1],l-1,c,u-1)),r(p,o(t[y+1],l,c-1,u-1),o(t[b+1],l-1,c-1,u-1))))}return a.fbm=function(l,c,u,h=3,f=2,d=.5){let p=1,_=1,g=0,m=0;for(let v=0;v<h;v++)g+=p*a(l*_,c*_,u*_),m+=p,p*=d,_*=f;return g/m},a}const Wi=(i,e,t)=>i<e?e:i>t?t:i,Pt=(i,e,t)=>{const n=Wi((t-i)/(e-i),0,1);return n*n*(3-2*n)};function Zi(i,e=1e-5){const t=i.index?i.toNonIndexed():i,n=t.attributes.position,s=new Map,r=[],o=new Uint32Array(n.count),a=1/e;for(let u=0;u<n.count;u++){const h=n.getX(u),f=n.getY(u),d=n.getZ(u),p=Math.round(h*a)+"_"+Math.round(f*a)+"_"+Math.round(d*a);let _=s.get(p);_===void 0&&(_=r.length/3,r.push(h,f,d),s.set(p,_)),o[u]=_}const l=[];for(let u=0;u<n.count;u+=3){const h=o[u],f=o[u+1],d=o[u+2];h===f||f===d||h===d||l.push(h,f,d)}const c=new bt;return c.setAttribute("position",new it(r,3)),c.setIndex(l),t!==i&&t.dispose(),c}function Ct(i,e){const t=i.attributes.position,n=new R;for(let s=0;s<t.count;s++)n.fromBufferAttribute(t,s),e(n,s),t.setXYZ(s,n.x,n.y,n.z);return t.needsUpdate=!0,i}function ni(i,e){i.computeVertexNormals();const t=i.attributes.position,n=i.attributes.normal,s=new R,r=new R,o=new Float32Array(t.count);for(let l=0;l<t.count;l++){s.fromBufferAttribute(t,l),r.fromBufferAttribute(n,l);const c=e(s,r,l);o[l]=c,t.setXYZ(l,s.x+r.x*c,s.y+r.y*c,s.z+r.z*c)}const a=i.userData.disp;if(a)for(let l=0;l<o.length;l++)o[l]+=a[l];return i.userData.disp=o,i.deleteAttribute("normal"),i}function Qt(i,{p:e=[0,0,0],r:t=[0,0,0],s:n=[1,1,1],order:s="XYZ"}={}){const r=new Xe().compose(new R(...e),new sn().setFromEuler(new Wt(t[0],t[1],t[2],s)),new R(...typeof n=="number"?[n,n,n]:n));return i.applyMatrix4(r),i}function Dt(i,e,t,n,s=2,r=1){n=Math.min(n,i/2-1e-4,e/2-1e-4,t/2-1e-4);const o=Array.isArray(r)?r:[r,r,r],a=o.map(p=>s*2+p),l=new gn(2,2,2,a[0],a[1],a[2]),c=[i/2,e/2,t/2],u=(p,_)=>{const g=a[_],m=c[_],v=Math.round((p+1)/2*g),y=m-n;return v<=s?-(y+n*Math.tan(Math.PI/4*(1-v/s))):v>=g-s?y+n*Math.tan(Math.PI/4*(1-(g-v)/s)):-y+2*y*((v-s)/o[_])},h=Zi(l),f=new R,d=new R;return Ct(h,p=>{const _=[p.x,p.y,p.z].map((m,v)=>u(m,v));p.set(_[0],_[1],_[2]),d.set(Wi(p.x,-c[0]+n,c[0]-n),Wi(p.y,-c[1]+n,c[1]-n),Wi(p.z,-c[2]+n,c[2]-n)),f.subVectors(p,d);const g=f.length();g>1e-9&&f.multiplyScalar(n/g),p.copy(d).add(f)}),l.dispose(),h}function Bn(i,e=24,t=0,n=Math.PI*2){const s=i.map(([a,l])=>new be(Math.max(a,0),l)),r=new vl(s,e,t,n),o=Zi(r);return r.dispose(),o}function Xi(i,e,t,n,s=24,r=3,o=0,a=Math.PI*2){const l=[[0,-t/2]],c=(u,h,f,d)=>{for(let p=0;p<=r;p++){const _=f+(d-f)*(p/r);l.push([u+Math.cos(_)*n,h+Math.sin(_)*n])}};return c(e-n,-t/2+n,-Math.PI/2,0),c(i-n,t/2-n,0,Math.PI/2),l.push([0,t/2]),Bn(l,s,o,a)}function Cy(i,e=16,t=12){const n=new Xo(i,e,t),s=Zi(n);return n.dispose(),s}function Ki(i,e=1){const t=new Wo(i,e),n=Zi(t);return t.dispose(),n}function Vi(i,e,t=8,n=24,s=Math.PI*2){const r=new ui(i,e,t,n,s),o=Zi(r);return r.dispose(),o}function bs(i,e,t=24,n=8,{closed:s=!1,cap:r=!0,up:o=null}={}){const a=Array.isArray(i)?new Go(i,s,"centripetal"):i,l=a.computeFrenetFrames(t,s);if(o){const p=new R(...o).normalize();for(let _=0;_<=t;_++){const g=l.tangents[_],m=p.clone().sub(g.clone().multiplyScalar(p.dot(g))).normalize(),v=new R().crossVectors(m,g).normalize();l.binormals[_]=m,l.normals[_]=v}}const c=[],u=[],h=new R;for(let p=0;p<=t;p++){const _=p/t;a.getPointAt(_,h);let g=e(_);typeof g=="number"&&(g=[g,g]);const m=l.normals[p],v=l.binormals[p];for(let y=0;y<n;y++){const x=y/n*Math.PI*2,T=Math.cos(x)*g[0],b=Math.sin(x)*g[1];c.push(h.x+v.x*T+m.x*b,h.y+v.y*T+m.y*b,h.z+v.z*T+m.z*b)}}for(let p=0;p<t;p++)for(let _=0;_<n;_++){const g=p*n+_,m=p*n+(_+1)%n,v=(p+1)*n+_,y=(p+1)*n+(_+1)%n;u.push(g,v,m,m,v,y)}if(r&&!s){const p=new R,_=new R;a.getPointAt(0,p),a.getPointAt(1,_);const g=c.length/3;c.push(p.x,p.y,p.z);const m=c.length/3;c.push(_.x,_.y,_.z);const v=t*n;for(let y=0;y<n;y++){const x=(y+1)%n;u.push(g,y,x),u.push(m,v+x,v+y)}}const f=new bt;f.setAttribute("position",new it(c,3)),f.setIndex(u);const d=Zi(f);return f.dispose(),d}function Al(i,e){return Ct(i,t=>{for(const[n,s]of e){const r=t.dot(n)-s;r>0&&t.addScaledVector(n,-r)}})}function Yo(i,e,t,n=.1){const s=[];for(let r=0;r<i;r++){const o=t()*2-1,a=t()*Math.PI*2,l=Math.sqrt(1-o*o),c=new R(l*Math.cos(a),o,l*Math.sin(a));s.push([c,e*(1-n+t()*n*2)])}return s}function Py(i){const e=i.attributes.position,t=i.attributes.normal,n=i.index.array,s=e.count,r=new Float32Array(s*3),o=new Float32Array(s),a=new Float32Array(s),l=e.array,c=(f,d)=>{r[f*3]+=l[d*3],r[f*3+1]+=l[d*3+1],r[f*3+2]+=l[d*3+2];const p=l[d*3]-l[f*3],_=l[d*3+1]-l[f*3+1],g=l[d*3+2]-l[f*3+2];a[f]+=Math.sqrt(p*p+_*_+g*g),o[f]++};for(let f=0;f<n.length;f+=3){const d=n[f],p=n[f+1],_=n[f+2];c(d,p),c(d,_),c(p,d),c(p,_),c(_,d),c(_,p)}const u=new Float32Array(s),h=t.array;for(let f=0;f<s;f++){if(!o[f])continue;const d=r[f*3]/o[f]-l[f*3],p=r[f*3+1]/o[f]-l[f*3+1],_=r[f*3+2]/o[f]-l[f*3+2],g=a[f]/o[f];u[f]=-(d*h[f*3]+p*h[f*3+1]+_*h[f*3+2])/(g+1e-9)}return u}function Ei(i){const e={};for(const[t,n]of Object.entries(i)){const s=new It({color:n.color??16777215,vertexColors:n.vertexColors??!0,roughness:n.roughness??.7,metalness:n.metalness??0,emissive:n.emissive??0,emissiveIntensity:n.emissiveIntensity??1,flatShading:!1});s.name=n.name??t,n.envMapIntensity!==void 0&&(s.envMapIntensity=n.envMapIntensity),e[t]=s}return e}const po=new me;class wi{constructor(e){this.o=Object.assign({ao:1,edge:.25,cavity:0,grad:null,seed:7,topLight:.12},e),this.pieces=[],this.extraOcc=[],this.noise=Ti(this.o.seed)}add(e,t){const n=Object.assign({part:"body",mat:"paint",color:16777215,flat:!1,occ:!0,ao:1,edge:1,cavity:1,vary:.06,varyScale:6},t,{geo:e});return this.pieces.push(n),n}fitSphere(e=.97){const t=new Nn;for(const o of this.pieces)o.geo.computeBoundingBox(),t.union(o.geo.boundingBox);const n=t.getCenter(new R);let s=0;for(const o of this.pieces){const a=o.geo.attributes.position;for(let l=0;l<a.count;l++){const c=a.getX(l)-n.x,u=a.getY(l)-n.y,h=a.getZ(l)-n.z;s=Math.max(s,c*c+u*u+h*h)}}const r=e/Math.sqrt(s);for(const o of this.pieces)o.geo.translate(-n.x,-n.y,-n.z),o.geo.scale(r,r,r),Array.isArray(o.occ)&&(o.occ=o.occ.map(([a,l,c,u])=>[(a-n.x)*r,(l-n.y)*r,(c-n.z)*r,u*r]));for(const o of this.extraOcc)o.c.sub(n).multiplyScalar(r),o.r*=r;return this.fit={center:n,scale:r},this.fit}occluder(e,t,n,s,r="__extra"){this.extraOcc.push({c:new R(e,t,n),r:s,id:r})}_autoOcc(e,t){if(e.occ===!1)return[];if(Array.isArray(e.occ))return e.occ.map(([_,g,m,v])=>({c:new R(_,g,m),r:v,id:t}));const n=e.geo;n.computeBoundingBox();const s=n.boundingBox,r=s.getSize(new R),o=[r.x,r.y,r.z],a=[0,1,2].sort((_,g)=>o[g]-o[_]),l=o[a[0]],c=o[a[1]],u=o[a[2]],h=.5*Math.sqrt(c*u)*.95;if(h<1e-4)return[];const f=Math.max(1,Math.min(8,Math.round(l/(2*h)))),d=[],p=s.getCenter(new R);for(let _=0;_<f;_++){const g=p.clone(),m=f===1?0:(_/(f-1)-.5)*(l-2*h);g.setComponent(a[0],g.getComponent(a[0])+m),d.push({c:g,r:h,id:t})}return d}assemble({name:e="model",pivots:t={},partOrder:n=null,meshNames:s={},partRotations:r={},attach:o={}}={}){const a=this.o,l=[];this.pieces.forEach((y,x)=>{y.id=x,l.push(...this._autoOcc(y,x))}),l.push(...this.extraOcc);const c=new R,u=new R,h=new R,f=new R,d=this.fit,p=new me,_=this.noise,g=new Map;for(const y of this.pieces){let x=y.geo;if(!x.index)if(y.keepFaces){const U=x.attributes.position.count,O=new Uint32Array(U);for(let V=0;V<U;V++)O[V]=V;x.setIndex(new ht(O,1))}else x=y.geo=Zi(x);Ly(x),x.computeVertexNormals();const T=Py(x),b=x.userData.disp;let A=0,w=0;if(b)for(const U of b)A=Math.min(A,U),w=Math.max(w,U);const M=x.attributes.position,S=x.attributes.normal,P=new Float32Array(M.count*3);for(let U=0;U<M.count;U++){c.fromBufferAttribute(M,U),u.fromBufferAttribute(S,U),d?f.copy(c).divideScalar(d.scale).add(d.center):f.copy(c);const O=typeof y.color=="function"?y.color(f,u,U):y.color;O&&O.isColor?p.copy(O):p.set(O);let V=0;for(const G of l){if(G.id===y.id)continue;h.subVectors(G.c,c);let $=h.length();const se=G.r,ye=Math.max($,se*1.02),fe=$>1e-6?u.dot(h)/$:1;V+=Wi(fe*.85+.15,0,1)*(se*se)/(ye*ye)}let L=1-Wi(V*.9,0,.85)*a.ao*y.ao;const z=Wi(T[U]*2,-1,1);let k=L*(1+z*.35*a.edge*y.edge);if(b&&a.cavity&&y.cavity){const G=b[U]>=0?w>1e-6?b[U]/w:0:-(A<-1e-6?b[U]/A:0);k*=1+G*.35*a.cavity*y.cavity}if(k*=1+u.y*a.topLight,y.vary){const G=y.varyScale;k*=1+_(c.x*G+11.3,c.y*G+3.1,c.z*G+7.7)*y.vary*2}a.grad&&(k*=a.grad(f,u)),po.copy(p).multiplyScalar(Math.max(0,k)),P[U*3]=po.r,P[U*3+1]=po.g,P[U*3+2]=po.b}if(x.setAttribute("color",new it(P,3)),y.flat||y.crease){const U=x.toNonIndexed();x.dispose(),y.crease?Fy(U,y.crease,y.faceTag??null):U.computeVertexNormals(),x=y.geo=U}g.has(y.part)||g.set(y.part,new Map);const F=g.get(y.part);F.has(y.mat)||F.set(y.mat,[]),F.get(y.mat).push(x)}const m=[],v=n??[...g.keys()];for(const y of v){const x=g.get(y);if(!x)continue;const T=t[y]??[0,0,0],b=r[y]??null,A=b?new Xe().makeRotationFromEuler(new Wt(...b)).invert():null,w=[];for(const[M,S]of x){const P=Iy(S);P.translate(-T[0],-T[1],-T[2]),A&&P.applyMatrix4(A),P.computeBoundingSphere(),P.computeBoundingBox();const F=s[y+":"+M]??`${y}_${M}`;w.push({geo:P,mat:this.o.mats[M],name:F})}m.push({name:y,pivot:T,rotation:b,meshes:w})}return new Dy(e,m,o)}}function Ly(i){const e=i.attributes.position.array,t=i.index.array;let n=0,s=0,r=0;const o=e.length/3;for(let l=0;l<o;l++)n+=e[l*3],s+=e[l*3+1],r+=e[l*3+2];n/=o,s/=o,r/=o;let a=0;for(let l=0;l<t.length;l+=3){const c=t[l]*3,u=t[l+1]*3,h=t[l+2]*3,f=e[c]-n,d=e[c+1]-s,p=e[c+2]-r,_=e[u]-n,g=e[u+1]-s,m=e[u+2]-r,v=e[h]-n,y=e[h+1]-s,x=e[h+2]-r;a+=f*(g*x-m*y)-d*(_*x-m*v)+p*(_*y-g*v)}if(a<0){for(let l=0;l<t.length;l+=3){const c=t[l+1];t[l+1]=t[l+2],t[l+2]=c}return i.index.needsUpdate=!0,!0}return!1}function Iy(i){let e=0,t=0;for(const h of i)e+=h.attributes.position.count,t+=h.index?h.index.count:h.attributes.position.count;const n=new Float32Array(e*3),s=new Float32Array(e*3),r=new Float32Array(e*3),o=e>65535?Uint32Array:Uint16Array,a=new o(t);let l=0,c=0;for(const h of i){const f=h.attributes.position.count;if(n.set(h.attributes.position.array,l*3),s.set(h.attributes.normal.array,l*3),r.set(h.attributes.color.array,l*3),h.index){const d=h.index.array;for(let p=0;p<d.length;p++)a[c+p]=d[p]+l;c+=d.length}else{for(let d=0;d<f;d++)a[c+d]=d+l;c+=f}l+=f,h.dispose()}const u=new bt;return u.setAttribute("position",new ht(n,3)),u.setAttribute("normal",new ht(s,3)),u.setAttribute("color",new ht(r,3)),u.setIndex(new ht(a,1)),u}class Dy{constructor(e,t,n={}){this.name=e,this.parts=t,this.attach=n}instantiate(){const e=new yt;e.name=this.name;for(const t of this.parts){const n=new yt;n.name=t.name,n.position.set(...t.pivot),t.rotation&&n.rotation.set(...t.rotation);const s={};for(const r of t.meshes){const o=new He(r.geo,r.mat);o.name=r.name,o.castShadow=!0,o.receiveShadow=!0,s[r.name]=o}for(const r of t.meshes)(this.attach[r.name]&&s[this.attach[r.name]]||n).add(s[r.name]);e.add(n)}return e}}function lr(i){let e=null;return()=>(e||(e=i()),e.instantiate())}function ys(i,e=24){return new xl(i.map(([n,s])=>new be(n,s))).getSpacedPoints(e-1).map(n=>[Math.max(0,n.x),n.y])}function Ny(i,e,t){const n=new R(...e),r=new R(...t).clone().sub(n).normalize(),o=new sn().setFromUnitVectors(new R(0,1,0),r);return i.applyQuaternion(o),i.translate(n.x,n.y,n.z),i}function bn(i,e,t,n,s=12,r=4,o=4,a=0){const l=new R(...i).distanceTo(new R(...e)),c=[];for(let h=0;h<=r;h++){const f=-Math.PI/2+Math.PI/2*(h/r);c.push([Math.cos(f)*t,Math.sin(f)*t])}for(let h=1;h<o;h++){const f=h/o;c.push([t+(n-t)*f+Math.sin(Math.PI*f)*a,l*f])}for(let h=0;h<=r;h++){const f=Math.PI/2*(h/r);c.push([Math.cos(f)*n,l+Math.sin(f)*n])}const u=Bn(c,s);return Ny(u,i,e)}function Gt(i,e,t=16,n=12){const s=Cy(1,t,n);return s.scale(e[0],e[1],e[2]),s.translate(i[0],i[1],i[2]),s}function Uy(i,e=1,t=.5){const n=i.attributes.position,s=i.index.array,r=n.count,o=Array.from({length:r},()=>new Set);for(let l=0;l<s.length;l+=3){const c=s[l],u=s[l+1],h=s[l+2];o[c].add(u),o[c].add(h),o[u].add(c),o[u].add(h),o[h].add(c),o[h].add(u)}const a=n.array;for(let l=0;l<e;l++){const c=new Float32Array(a);for(let u=0;u<r;u++){if(!o[u].size)continue;let h=0,f=0,d=0;for(const _ of o[u])h+=a[_*3],f+=a[_*3+1],d+=a[_*3+2];const p=1/o[u].size;c[u*3]+=(h*p-a[u*3])*t,c[u*3+1]+=(f*p-a[u*3+1])*t,c[u*3+2]+=(d*p-a[u*3+2])*t}a.set(c)}return n.needsUpdate=!0,i}function Fy(i,e=.5,t=null){const n=i.attributes.position,s=n.count,r=Math.cos(e);new Float32Array(s);const o=new Float32Array(s*3),a=new R,l=new R,c=new R;for(let g=0;g<s;g+=3){a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,g+1),c.fromBufferAttribute(n,g+2);const m=new R().crossVectors(l.clone().sub(a),c.clone().sub(a));for(let v=0;v<3;v++)o.set([m.x,m.y,m.z],(g+v)*3)}const u=new Map,h=g=>`${Math.round(n.getX(g)*1e5)}_${Math.round(n.getY(g)*1e5)}_${Math.round(n.getZ(g)*1e5)}`;for(let g=0;g<s;g++){const m=h(g);u.has(m)||u.set(m,[]),u.get(m).push(g)}const f=new Float32Array(s*3),d=new R,p=new R,_=new R;for(const g of u.values())for(const m of g){d.fromArray(o,m*3);const v=d.length()||1;_.set(0,0,0);for(const y of g){p.fromArray(o,y*3);const x=p.length()||1;t&&t[m/3|0]!==t[y/3|0]||d.dot(p)/(v*x)>=r&&_.add(p)}_.lengthSq()<1e-20&&_.copy(d),_.lengthSq()<1e-20&&_.set(0,1,0),_.normalize(),f[m*3]=_.x,f[m*3+1]=_.y,f[m*3+2]=_.z}return i.setAttribute("normal",new ht(f,3)),i}function Oy(i,e){let t=Array.from(i.attributes.position.array),n=new Array(t.length/9).fill(0);const s=(h,f,d)=>`${Math.round(h*1e6)}_${Math.round(f*1e6)}_${Math.round(d*1e6)}`;e.forEach(([h,f],d)=>{const p=[],_=[],g=[],m=M=>t[M]*h.x+t[M+1]*h.y+t[M+2]*h.z-f,v=(M,S)=>{const P=s(t[M],t[M+1],t[M+2]),F=s(t[S],t[S+1],t[S+2]);P>F&&([M,S]=[S,M]);const U=m(M),O=m(S),V=U/(U-O);return[t[M]+(t[S]-t[M])*V,t[M+1]+(t[S+1]-t[M+1])*V,t[M+2]+(t[S+2]-t[M+2])*V]};for(let M=0;M<t.length/9;M++){const S=[M*9,M*9+3,M*9+6],F=S.map(m).map(L=>L<=0),U=F.filter(Boolean).length;if(U===3){for(const L of S)p.push(t[L],t[L+1],t[L+2]);_.push(n[M]);continue}if(U===0)continue;const O=[],V=[];for(let L=0;L<3;L++){const z=S[L],k=S[(L+1)%3],G=F[L],$=F[(L+1)%3];if(G&&O.push([t[z],t[z+1],t[z+2]]),G!==$){const se=v(z,k);O.push(se),V.push(se)}}for(let L=1;L<O.length-1;L++)p.push(...O[0],...O[L],...O[L+1]),_.push(n[M]);V.length===2&&g.push(V)}const y=new Map,x=new Map;for(const[M,S]of g){const P=s(...M),F=s(...S);P!==F&&(x.set(P,M),x.set(F,S),y.has(P)||y.set(P,[]),y.has(F)||y.set(F,[]),y.get(P).push(F),y.get(F).push(P))}const T=new Set,b=new R,A=new R,w=h.clone().normalize();b.set(Math.abs(w.x)<.9?1:0,Math.abs(w.x)<.9?0:1,0).cross(w).normalize(),A.crossVectors(w,b);for(const M of y.keys()){if(T.has(M))continue;const S=[M];T.add(M);let P=null,F=M;for(;;){const L=y.get(F).filter(z=>z!==P&&!T.has(z));if(!L.length)break;P=F,F=L[0],T.add(F),S.push(F)}if(S.length<3)continue;const U=S.map(L=>new R(...x.get(L))),O=U.map(L=>new be(L.dot(b),L.dot(A))),V=Rs.triangulateShape(O,[]);for(const[L,z,k]of V){const G=U[z].clone().sub(U[L]),$=U[k].clone().sub(U[L]),ye=G.cross($).dot(w)<0?[U[L],U[k],U[z]]:[U[L],U[z],U[k]];for(const fe of ye)p.push(fe.x,fe.y,fe.z);_.push(d+1)}}t=p,n=_});const r=[],o=[],a=new R,l=new R,c=new R;for(let h=0;h<n.length;h++)if(a.fromArray(t,h*9),l.fromArray(t,h*9+3),c.fromArray(t,h*9+6),!(l.clone().sub(a).cross(c.clone().sub(a)).lengthSq()<1e-14)){for(let f=0;f<9;f++)r.push(t[h*9+f]);o.push(n[h])}const u=new bt;return u.setAttribute("position",new it(r,3)),u.userData.faceTag=o,u}const gt={skin:15117704,nose:14255212,cheek:14914940,hairDark:11120310,brass:14723400,brassDark:10250788,shirt:2400403,shirtDark:1800816,leather:8210986,leatherDark:6174496,glove:5912608,boot:3023645,wood:10250812,iron:8028296,eye:1708558};function By(){return Ei({cloth:{roughness:.86},leather:{roughness:.55},skin:{roughness:.58},hair:{roughness:.72},brass:{metalness:1,roughness:.32},iron:{metalness:1,roughness:.42},wood:{roughness:.68},eye:{roughness:.18},lamp:{color:16777215,emissive:16767114,emissiveIntensity:2.6,roughness:.25,name:"headlamp_lens"}})}function ky(i){const e=i?{lat:32,rad:16,sph:[24,16],sphS:[18,12],cap:5,mid:6,prof:24}:{lat:22,rad:12,sph:[18,12],sphS:[14,10],cap:3,mid:3,prof:14},t=new wi({mats:By(),ao:1,edge:i?.7:.45,cavity:i?1:0,topLight:.1,grad:L=>.78+.22*Pt(0,.45,L.y),seed:11}),n=Ti(5),s=$n(3),r=(L,z=22)=>k=>i?ni(k,G=>n.fbm(G.x*z,G.y*z*1.6,G.z*z,3)*L):k;for(const L of[-1,1]){const z=L*.102,k=Dt(.13,.09,.2,.04,2,i?2:1);Ct(k,fe=>{const Ce=Pt(-.02,.1,fe.z);fe.y>0&&(fe.y*=1-.38*Ce),fe.x*=1+.08*Ce}),k.translate(z+L*.004,.022+.045,.028),i&&ni(k,fe=>n(fe.x*40,fe.y*40,fe.z*40)*.0025),t.add(k,{part:"legs",mat:"leather",color:gt.boot});const G=Dt(.128,.026,.192,.012,2,1);Ct(G,fe=>{fe.x*=1+.08*Pt(-.02,.1,fe.z)}),G.translate(z+L*.004,.013,.03),t.add(G,{part:"legs",mat:"leather",color:2759700,vary:.02});const $=Xi(.064,.066,.075,.015,e.rad+4,2);$.translate(z,.115,-.005),t.add($,{part:"legs",mat:"leather",color:gt.boot});const se=Vi(.064,.016,i?8:6,e.rad+4);if(Qt(se,{r:[Math.PI/2,0,0],p:[z,.152,-.005]}),t.add(se,{part:"legs",mat:"leather",color:3877924}),i)for(let fe=0;fe<3;fe++){const Ce=bn([z-.03,.095-fe*.012,.075+fe*.016],[z+.03,.095-fe*.012,.075+fe*.016],.005,.005,6,2,1);t.add(Ce,{part:"legs",mat:"leather",color:9202248,occ:!1})}const ye=Bn(ys([[0,.135],[.07,.14],[.078,.2],[.083,.27],[.08,.33],[0,.34]],Math.round(e.prof*.6)),e.rad+4);if(ye.translate(z,0,0),r(.005,26)(ye),t.add(ye,{part:"legs",mat:"cloth",color:gt.leather}),i&&L===1){const fe=Dt(.07,.065,.02,.008,2,2);Ct(fe,Ce=>{Ce.z-=Ce.x*Ce.x*6}),fe.translate(z+.005,.23,.075),t.add(fe,{part:"legs",mat:"cloth",color:10119742,occ:!1})}}const o=ys([[0,.25],[.16,.255],[.205,.31],[.225,.4],[.222,.48],[.205,.55],[.17,.605],[.09,.64],[0,.645]],e.prof),a=Bn(o,e.lat);a.scale(1,1,.84),r(.004,18)(a),t.add(a,{part:"torso",mat:"cloth",color:gt.shirt});const l=Bn(ys([[0,.245],[.18,.248],[.218,.31],[.236,.39],[.236,.44],[.22,.452],[0,.455]],e.prof),e.lat);l.scale(1,1,.86),r(.005,20)(l),t.add(l,{part:"torso",mat:"cloth",color:gt.leather});const c=Dt(.22,.15,.035,.014,2,i?4:1);Ct(c,L=>{L.z-=L.x*L.x*2.4}),c.translate(0,.505,.168),t.add(c,{part:"torso",mat:"cloth",color:gt.leather});for(const L of[-1,1]){const z=bs([[L*.085,.565,.172],[L*.11,.62,.11],[L*.12,.645,0],[L*.11,.6,-.13],[L*.085,.47,-.18]].map(G=>new R(...G)),()=>[.024,.007],i?18:12,i?8:6,{up:[1,0,0]});t.add(z,{part:"torso",mat:"cloth",color:gt.leatherDark});for(const[G,$,se,ye]of[[L*.085,.475,-.19,Math.PI+L*.25]]){const fe=Dt(.05,.042,.016,.008,2,1);Qt(fe,{r:[0,ye,0],p:[G,$,se]}),t.add(fe,{part:"torso",mat:"brass",color:gt.brass,occ:!1})}const k=Xi(.024,.024,.014,.006,i?14:8,2);Qt(k,{r:[0,0,Math.PI/2],p:[L*.238,.415,.02]}),t.add(k,{part:"torso",mat:"brass",color:gt.brass,occ:!1})}if(i){const L=Vi(.228,.004,4,e.lat);Qt(L,{r:[Math.PI/2,0,0],s:[1,.86,1],p:[0,.437,0]}),t.add(L,{part:"torso",mat:"cloth",color:gt.leatherDark,occ:!1});const z=Dt(.1,.06,.012,.006,2,2);Ct(z,k=>{k.z-=k.x*k.x*2.4}),z.translate(0,.48,.19),t.add(z,{part:"torso",mat:"cloth",color:9065778,occ:!1})}const u=(L,z,k,G,$,se)=>{const ye=L,fe=Gt(z,[.07,.068,.07],e.sphS[0],e.sphS[1]);r(.004,22)(fe),t.add(fe,{part:se,mat:"cloth",color:gt.shirt});const Ce=bn(z,k,.062,.054,e.rad,e.cap,e.mid,.008);r(.004,24)(Ce),t.add(Ce,{part:se,mat:"cloth",color:gt.shirt});const Le=Vi(.052,.018,i?8:6,e.rad),j=new R(...G).sub(new R(...k)).normalize();Le.applyQuaternion(new sn().setFromUnitVectors(new R(0,0,1),j));const Z=new R(...k).addScaledVector(j,.01);Le.translate(Z.x,Z.y,Z.z),t.add(Le,{part:se,mat:"cloth",color:gt.shirtDark});const te=bn(k,G,.045,.04,e.rad,e.cap,e.mid,.004);t.add(te,{part:se,mat:"skin",color:gt.skin});const ae=bn(new R(...G).addScaledVector(j,-.02).toArray(),new R(...G).addScaledVector(j,.02).toArray(),.05,.052,e.rad,2,1);t.add(ae,{part:se,mat:"leather",color:gt.glove});const ge=Gt([0,0,0],[.05,.056,.058],e.sphS[0],e.sphS[1]);ge.translate(...$),t.add(ge,{part:se,mat:"leather",color:gt.glove});const Pe=[$[0]-ye*.025,$[1]+.03,$[2]+.03],et=bn(Pe,[$[0]-ye*.005,$[1]+.04,$[2]+.055],.018,.016,i?10:6,2,1);if(t.add(et,{part:se,mat:"leather",color:gt.glove}),i)for(let B=0;B<4;B++){const je=$[1]+.03-B*.02,De=bn([$[0]-.03,je,$[2]+.04],[$[0]+.03,je,$[2]+.04],.011,.011,8,2,1);t.add(De,{part:se,mat:"leather",color:gt.glove,occ:!1})}};u(1,[.215,.56,0],[.285,.44,0],[.29,.34,.06],[.285,.305,.085],"armL"),u(-1,[-.215,.56,0],[-.285,.44,.03],[-.3,.385,.13],[-.3,.355,.16],"armR");{const L=new R(-.29,.25,.2),z=new R(-.4,.75,.03),k=z.clone().sub(L).normalize(),G=bn(L.toArray(),z.toArray(),.017,.02,i?12:8,2,i?6:1);if(i&&ni(G,ae=>n(ae.x*30,ae.y*120,ae.z*30)*.0016),t.add(G,{part:"pickaxe",mat:"wood",color:gt.wood,vary:.1,varyScale:30}),i){const ae=bn(L.clone().addScaledVector(k,.04).toArray(),L.clone().addScaledVector(k,.13).toArray(),.021,.021,12,2,4);t.add(ae,{part:"pickaxe",mat:"leather",color:4861724,occ:!1})}const $=new R(k.y,-k.x,0).normalize(),se=k.clone(),ye=z.clone().addScaledVector(k,-.02),fe=ye.clone().addScaledVector($,.17).addScaledVector(se,-.06),Ce=ye.clone().addScaledVector($,-.17).addScaledVector(se,-.06),Le=ye.clone().addScaledVector($,.09).addScaledVector(se,-.005),j=ye.clone().addScaledVector($,-.09).addScaledVector(se,-.005),Z=bs([Ce,j,ye,Le,fe],ae=>{const ge=Math.abs(ae-.5)*2,Pe=.03*Math.pow(1-ge,.65)+.002;return[Pe*.8,Pe]},i?28:18,i?8:6,{up:[0,0,1]});t.add(Z,{part:"pickaxe",mat:"iron",color:ae=>{const ge=Math.min(ae.distanceTo(fe),ae.distanceTo(Ce));return new me(gt.iron).lerp(new me(14081508),Pt(.08,0,ge))}});const te=bn(z.clone().addScaledVector(k,-.055).toArray(),z.clone().addScaledVector(k,.012).toArray(),.03,.03,i?14:8,2,2);t.add(te,{part:"pickaxe",mat:"iron",color:5067352})}const d=Gt([0,.765,.02],[.125,.128,.118],e.sph[0],e.sph[1]);t.add(d,{part:"head",mat:"skin",color:gt.skin});const p=Gt([0,.752,.142],[.041,.037,.036],e.sph[0],e.sph[1]);t.add(p,{part:"head",mat:"skin",color:gt.nose});for(const L of[-1,1]){const z=Gt([L*.066,.74,.1],[.043,.038,.035],e.sph[0]*.75,e.sph[1]*.75);t.add(z,{part:"head",mat:"skin",color:gt.cheek,occ:!1});const k=Gt([L*.124,.77,.005],[.018,.034,.026],12,8);t.add(k,{part:"head",mat:"skin",color:gt.nose});const G=Gt([L*.047,.793,.117],[.015,.018,.012],12,8);t.add(G,{part:"head",mat:"eye",color:gt.eye,occ:!1,edge:0,vary:0});const $=bs([new R(L*.018,.812,.13),new R(L*.05,.825,.125),new R(L*.088,.815,.105)],se=>.017*Math.sin(Math.PI*(.15+.7*se))+.004,i?14:8,i?10:6);i&&ni($,se=>n(se.x*160,se.y*40,se.z*160)*.003),t.add($,{part:"head",mat:"hair",color:15659250,ao:.35})}const _=L=>{const z=Pt(.7,.42,L.y);return new me(gt.hairDark).lerp(new me(15659250),.35+.65*z)},g=(L,z=.006)=>i?ni(L,k=>{const G=n(k.x*55,k.y*4,k.z*55),$=1-Math.abs(n(k.x*90+3,k.y*6,k.z*90)*2);return G*z+($-.5)*z*.8}):L,m=(L,z,k,G=[0,0],$=.72,se=0)=>{const ye=i?14:9,fe=[];for(let Le=0;Le<=ye;Le++){const j=Le/ye,Z=Math.pow(j,1.35);fe.push([k*Math.pow(Math.sin(Math.PI*Z),.9),-z+j*z])}const Ce=Bn(fe,i?14:10);return Ct(Ce,Le=>{const j=1+Le.y/z,Z=Math.pow(1-j,2);Le.z*=$,Le.x+=G[0]*Z,Le.z+=G[1]*Z}),Qt(Ce,{r:[0,0,se]}),Ce.translate(...L),Ce},v=Gt([0,.625,.105],[.17,.13,.095],e.sph[0],e.sph[1]);Ct(v,L=>{const z=Pt(.66,.5,L.y);L.z+=z*.035}),g(v,.007),t.add(v,{part:"head",mat:"hair",color:_});const y=[[0,.62,.17,.24,.07,0,.03,0],[.075,.63,.155,.21,.066,.02,.02,.12],[-.075,.63,.155,.21,.066,-.02,.02,-.12],[.14,.66,.11,.16,.06,.035,0,.3],[-.14,.66,.11,.16,.06,-.035,0,-.3]];i&&y.push([.04,.6,.19,.2,.04,0,.02,.05],[-.04,.6,.19,.19,.04,-.01,.02,-.05],[.11,.62,.15,.17,.042,.03,.01,.2],[-.11,.62,.15,.17,.042,-.03,.01,-.2]);for(const[L,z,k,G,$,se,ye,fe]of y){const Ce=m([L,z,k],G,$,[se,ye],.72,fe);g(Ce,.006),t.add(Ce,{part:"head",mat:"hair",color:_})}for(const L of[-1,1]){const z=Gt([L*.112,.725,.04],[.042,.08,.06],e.sph[0]*.75,e.sph[1]*.75);g(z,.005),t.add(z,{part:"head",mat:"hair",color:_});const k=bs([new R(L*.008,.728,.158),new R(L*.055,.722,.15),new R(L*.1,.7,.12),new R(L*.125,.668,.095)],G=>.03*Math.pow(Math.sin(Math.PI*(.12+.88*G)),.7)+.003,i?16:10,i?10:8);g(k,.004),t.add(k,{part:"head",mat:"hair",color:G=>new me(15330543).multiplyScalar(.92+.08*s())})}{const L=Gt([0,.772,-.028],[.134,.1,.122],e.sph[0],e.sph[1]);Ct(L,z=>{const k=Pt(0,-.12,z.z);z.y<.772&&(z.y-=.03*k)}),g(L,.006),t.add(L,{part:"head",mat:"hair",color:z=>new me(13225170).multiplyScalar(.9+.15*Pt(.7,.8,z.y))})}const x=.838,T=[],b=i?16:10;for(let L=0;L<=b;L++){const z=L/b*(Math.PI/2);T.push([.155*Math.pow(Math.cos(z),.8),x+.148*Math.sin(z)])}T.unshift([.14,x-.005]);const A=Bn(T,e.lat);A.scale(1,1,1.06),A.translate(0,0,-.005),i&&ni(A,L=>n.fbm(L.x*9,L.y*9,L.z*9,2)*.004),t.add(A,{part:"head",mat:"brass",color:gt.brass});const w=Bn(ys([[.148,x+.012],[.185,x-.002],[.2,x-.012],[.19,x-.02],[.15,x-.012]],i?10:6),e.lat);Ct(w,L=>{L.z=L.z*1.08-(L.z<0?.012:0)}),t.add(w,{part:"head",mat:"brass",color:gt.brassDark});const M=Vi(.152,.013,i?8:6,i?32:14,Math.PI);if(Qt(M,{r:[0,Math.PI/2,0],s:[1,1,1.06],p:[0,x,-.005]}),Ct(M,L=>{L.y=Math.min(L.y,1)}),t.add(M,{part:"head",mat:"brass",color:15777888}),i)for(let z=0;z<14;z++){const k=z/14*Math.PI*2+.2,G=Gt([Math.sin(k)*.156,x+.018,Math.cos(k)*.165-.005],[.009,.009,.009],6,4);t.add(G,{part:"head",mat:"brass",color:15978362,occ:!1})}const S=.163,P=.893,F=Xi(.042,.045,.055,.012,i?28:14,i?3:2);Qt(F,{r:[Math.PI/2,0,0],p:[0,P,S+.012]}),t.add(F,{part:"head",mat:"brass",color:12880948});const U=Vi(.041,.009,i?8:6,i?28:14);U.translate(0,P,S+.04),t.add(U,{part:"head",mat:"brass",color:15910760,occ:!1});const O=Bn(ys([[.034,-.004],[.034,0],[.02,.009],[0,.012]],6),i?24:12);return Qt(O,{r:[Math.PI/2,0,0],p:[0,P,S+.038]}),t.add(O,{part:"head",mat:"lamp",color:16774876,ao:0,edge:0,vary:0,occ:!1}),t.assemble({name:i?"miner_sculpted":"miner_classic",pivots:{legs:[0,0,0],torso:[0,.3,0],head:[0,.62,.02],armL:[.215,.56,0],armR:[-.215,.56,0],pickaxe:[-.215,.56,0]},partOrder:["legs","torso","head","armL","armR","pickaxe"],meshNames:{"head:lamp":"headlamp"}})}const Ld=15903522,Id=16769162,Dd=8014348;function zy(){return Ei({gold:{metalness:1,roughness:.3,name:"gold"}})}function Hy({detail:i,seed:e=1,cuts:t=12,depth:n=.12,lumps:s=5,crevices:r=!0,hammer:o=0,soften:a=0,stretch:l=[1.18,.8,.95]}){const c=Ti(e),u=$n(e*7+3),h=Ki(1,i),f=[];for(let g=0;g<s;g++){const m=new R(u()*2-1,u()*2-1,u()*2-1).normalize();f.push([m,.14+u()*.2,.6+u()*.6])}Ct(h,g=>{const m=g.clone().normalize();let v=.85+c.fbm(m.x*1.4+5,m.y*1.4,m.z*1.4,3)*.4;for(const[y,x,T]of f)v+=x*Math.exp(-(1-m.dot(y))/(T*.3));g.copy(m).multiplyScalar(v),g.x*=l[0],g.y*=l[1],g.z*=l[2]});const d=h.attributes.position,p=new R,_=Yo(t,1,u,0).map(([g])=>{let m=-1/0;for(let v=0;v<d.count;v++)m=Math.max(m,p.fromBufferAttribute(d,v).dot(g));return[g,m*(1-n*(.6+u()*.8))]});return Al(h,_),a&&Uy(h,a,.5),(r||o)&&ni(h,g=>{let m=o*c(g.x*13,g.y*13,g.z*13);if(r){const v=1-Math.abs(c(g.x*1.7+9,g.y*1.7,g.z*1.7)*2);m-=.035*Math.pow(Math.max(0,v),14)}return m}),h}function fh(i){const e=i.userData.disp;let t=0;if(e)for(const a of e)t=Math.min(t,a);const n=new me(Ld),s=new me(Dd),r=new me(Id),o=new me;return(a,l,c)=>(o.copy(n),e&&t<0&&o.lerp(s,Pt(.15,.9,e[c]/t)),o.lerp(r,Math.max(0,l.y)*.18),o)}function Vy(i){const t=Ti(4),n=$n(91),s=[1.2,.78,.95],r=Ki(1,i?8:2),o=[];for(let m=0;m<5;m++){const v=new R(n()*2-1,n()*1.2-.6,n()*2-1).normalize();o.push([v,.18+n()*.22,.5+n()*.5])}const a=m=>{const v=1-Math.abs(t(m.x*1.6+9,m.y*1.6,m.z*1.6)*2);return Math.pow(Math.max(0,v),10)};Ct(r,m=>{const v=m.clone().normalize();let y=.85+t.fbm(v.x*1.4+5,v.y*1.4,v.z*1.4,3)*.4;for(const[x,T,b]of o)y+=T*Math.exp(-(1-v.dot(x))/(b*.3));i&&(y+=t(v.x*4,v.y*4,v.z*4)*.012-a(v)*.03),m.copy(v).multiplyScalar(y),m.x*=s[0],m.y*=s[1],m.z*=s[2]});const l=r.attributes.position,c=new R,u=Yo(i?16:12,1,n,0).map(([m])=>{let v=-1/0;for(let y=0;y<l.count;y++)v=Math.max(v,c.fromBufferAttribute(l,y).dot(m));return[m,v*(1-.04-n()*.09)]}),h=r.toNonIndexed();r.dispose();const f=Oy(h,u);h.dispose(),f.computeBoundingBox();const d=f.boundingBox.getCenter(new R);f.translate(-d.x,-d.y,-d.z);let p=0;const _=f.attributes.position;for(let m=0;m<_.count;m++)p=Math.max(p,c.fromBufferAttribute(_,m).lengthSq());const g=.95/Math.sqrt(p);return f.scale(g,g,g),f.userData.crev=m=>a(m.clone().divideScalar(g).add(d).normalize()),f}function Gy(i){const e=new wi({mats:zy(),ao:0,edge:0,cavity:0,topLight:.08,seed:21}),t=Vy(i),n=t.userData.faceTag,s=t.userData.crev,r=$n(5),o=Array.from({length:32},()=>.92+r()*.22),a=new me(Ld),l=new me(Dd),c=new me(Id);return e.add(t,{part:"nugget",mat:"gold",keepFaces:!0,occ:!1,vary:.05,varyScale:3,crease:i?1.2:0,faceTag:n,flat:!i,color:(u,h,f)=>{const d=n[Math.floor(f/3)],p=a.clone();return d>0?p.lerp(c,.22).multiplyScalar(o[d%32]):(p.lerp(l,i?Pt(.2,.9,s(u))*.6:0),p.multiplyScalar(.86+.14*Pt(-.8,.6,u.y)))}}),e.assemble({name:i?"gold_sculpted":"gold_classic",meshNames:{"nugget:gold":"gold"}})}const mo=7226920,go=5189916,za=9067574,Ha=3815999,ph=2368552;function Wy(){return Ei({wood:{roughness:.78},iron:{metalness:.85,roughness:.55},gold:{metalness:1,roughness:.3,name:"gold"}})}const Jt=.135,Ut=.5,Cr=.37,ii=.46,Uo=.2,si=.265,Nd=i=>Pt(Jt,Ut,i)*0+(i-Jt)/(Ut-Jt),Ui=i=>Cr+(ii-Cr)*Nd(i),Fi=i=>Uo+(si-Uo)*Nd(i);function ms(i){return Ct(i,e=>{const t=Math.min(1.08,Math.max(-.1,(e.y-Jt)/(Ut-Jt))),n=(Cr+(ii-Cr)*t)/ii,s=(Uo+(si-Uo)*t)/si;e.x*=n,e.z*=s})}function Xy(i){const e=new wi({mats:Wy(),ao:1,edge:i?.8:.5,cavity:i?1:0,topLight:.1,seed:41,grad:h=>.75+.25*Pt(.05,.4,h.y)}),t=Ti(13),n=$n(29),s=Ut-Jt,r=(h,f="x")=>{if(!i)return h;const d=n()*10,p=.003+n()*.004;return Ct(h,_=>{const g=f==="x"?_.x:_.z,m=Math.sin(g*6+d)*p;f==="x"?(_.z+=m*Math.sign(_.z||1)*.5,_.y+=m*.6):(_.x+=m*.5,_.y+=m*.6)})},o=h=>f=>new me(h).multiplyScalar(.92+.16*t(f.x*3,f.y*3,f.z*3)+.08);if(i){const d=(s-.018000000000000002)/4,p=Dt(ii*2-.03,s-.01,si*2-.03,.02,1,1);p.translate(0,Jt+s/2,0),ms(p),e.add(p,{part:"cart",mat:"wood",color:2759184,occ:!1,edge:0,vary:0});for(let _=0;_<4;_++){const g=Jt+d/2+_*(d+.006);for(const m of[-1,1]){const v=Dt(ii*2-.01,d,.04,.012,1,[8,1,1]);v.translate((n()-.5)*.01,g,m*(si-.02)),r(v,"x"),ms(v);const y=[mo,za,go,mo][Math.floor(n()*4)];e.add(v,{part:"cart",mat:"wood",color:o(y),vary:.06,varyScale:9})}for(const m of[-1,1]){const v=Dt(.04,d,si*2-.05,.012,1,[1,1,5]);v.translate(m*(ii-.02),g,(n()-.5)*.01),r(v,"z"),ms(v);const y=[mo,za,go][Math.floor(n()*3)];e.add(v,{part:"cart",mat:"wood",color:o(y),vary:.06,varyScale:9})}}for(const _ of[-1,1]){const g=Dt(Cr*2+.04,.045,.06,.012,1,[4,1,1]);g.translate(0,Jt-.005,_*.12),e.add(g,{part:"cart",mat:"wood",color:o(go)})}}else{const h=Dt(ii*2,s,si*2,.03,2,1);h.translate(0,Jt+s/2,0),ms(h),e.add(h,{part:"cart",mat:"wood",color:mo,vary:.08,varyScale:4});for(let f=1;f<3;f++){const d=Jt+s*f/3,p=Dt(ii*2+.006,.008,si*2+.006,.003,1,1);p.translate(0,d,0),ms(p),e.add(p,{part:"cart",mat:"wood",color:go,occ:!1,edge:0})}}{const h=Ut-.01,f=Ui(h),d=Fi(h),p=.05,_=[[f*2+p,p,p,0,d],[f*2+p,p,p,0,-d],[p,p,d*2-p,f,0],[p,p,d*2-p,-f,0]];for(const[g,m,v,y,x]of _){const T=Dt(g,m,v,.016,i?1:2,i?g>v?[4,1,1]:[1,1,3]:1);T.translate(y,h,x),r(T,g>v?"x":"z"),e.add(T,{part:"cart",mat:"wood",color:o(za)})}}const a=[Jt+.06,Ut-.075];for(const h of a){const f=Dt(ii*2+.014,.04,si*2+.014,.008,1,1);f.translate(0,h,0),ms(f),e.add(f,{part:"cart",mat:"iron",color:Ha,occ:!1})}const l=(h,f,d,p,_)=>{const g=Gt([0,0,0],[.013,.013,.008],6,3),m=Math.atan2(p,_);Qt(g,{r:[0,m,0],p:[h,f,d]}),e.add(g,{part:"cart",mat:"iron",color:5921376,occ:!1})};for(const h of[-1,1])for(const f of[-1,1]){const d=[h*(Ui(Jt)+.004),Jt+.005,f*(Fi(Jt)+.004)],p=[h*(Ui(Ut)+.004),Ut-.01,f*(Fi(Ut)+.004)],_=bn(d,p,.022,.022,i?8:4,1,i?4:1);Ct(_,g=>{}),e.add(_,{part:"cart",mat:"iron",color:ph});for(const g of a){const m=Ui(g)+.01,v=Fi(g)+.01;l(h*(m-.045),g,f*v,0,f),l(h*m,g,f*(v-.045),h,0),i&&(l(h*.12,g,f*v,0,f),l(h*m,g,0,h,0))}}const c=.1,u=ys([[0,-.022],[.045,-.024],[.088,-.022],[c,-.018],[c,.006],[c+.013,.012],[c+.013,.02],[c-.012,.024],[.04,.02],[0,.03]],i?12:10);for(const h of[-1,1])for(const f of[-1,1]){const d=Bn(u,i?24:16);Qt(d,{r:[f>0?-Math.PI/2:Math.PI/2,0,0],p:[h*.27,c,f*.225]}),e.add(d,{part:"cart",mat:"iron",color:_=>new me(Ha).lerp(new me(9079440),Pt(c*.92,c,Math.hypot(_.x-h*.27,_.y-c))*.6)});const p=Xi(.03,.034,.03,.01,i?16:8,2);if(Qt(p,{r:[Math.PI/2,0,0],p:[h*.27,c,f*.245]}),e.add(p,{part:"cart",mat:"iron",color:5592411,occ:!1}),i)for(let _=0;_<4;_++){const g=_/4*Math.PI*2+Math.PI/4,m=Dt(.05,.016,.01,.004,1,1);Qt(m,{r:[0,0,g],p:[h*.27+Math.cos(g)*.062,c+Math.sin(g)*.062,f*.25]}),e.add(m,{part:"cart",mat:"iron",color:4868688,occ:!1})}}for(const h of[-1,1]){const f=bn([h*.27,c,-.24],[h*.27,c,.24],.014,.014,i?10:6,1,2);e.add(f,{part:"cart",mat:"iron",color:ph,occ:!1});for(const d of[-1,1]){const p=Dt(.06,.05,.04,.01,1,1);p.translate(h*.27,c+.018,d*.17),e.add(p,{part:"cart",mat:"iron",color:Ha})}}{const f=Ut-.015,d=Ui(Ut)-.012,p=Fi(Ut)-.012,_=(x,T)=>f+.16*Math.pow(Math.max(0,1-x*x-T*T),.7),g=Gt([0,f,0],[d,.16,p],i?24:16,i?12:8);Ct(g,x=>{x.y<f&&(x.y=f-(f-x.y)*.15)}),ni(g,x=>t.fbm(x.x*12,x.y*12,x.z*12,2)*.025),e.add(g,{part:"cart",mat:"gold",color:fh(g),vary:.06});const m=i?30:16,v=[];let y=0;for(;v.length<m&&y++<4e3;){const x=n()*2-1,T=n()*2-1;if(x*x+T*T>.95)continue;const b=1-v.length/m,A=i?.045+.045*b*(.6+n()*.4):.06+.045*b*(.6+n()*.4),w=x*d,M=T*p,S=_(x,T)+A*.1;v.some(P=>Math.hypot(P[0]-w,P[1]-S,P[2]-M)<(P[3]+A)*.8)||v.push([w,S,M,A])}v.push([Ui(Ut)+.005,Ut+.03,.08,.055],[-Ui(Ut)+.02,Ut+.035,-.12,.06],[.16,Ut+.03,Fi(Ut)+0,.05],[-.2,Ut+.03,Fi(Ut)-.005,.045]),v.forEach(([x,T,b,A],w)=>{const M=Hy(i?{detail:1,seed:100+w,cuts:7,depth:.15,lumps:3,crevices:!1}:{detail:1,seed:100+w%5,cuts:6,depth:.15,lumps:3,crevices:!1});Qt(M,{r:[n()*6,n()*6,n()*6],s:A,p:[x,T,b]}),e.add(M,{part:"cart",mat:"gold",color:fh(M),flat:!0,vary:.08,varyScale:20})})}return e.assemble({name:i?"cart_sculpted":"cart_classic",meshNames:{"cart:wood":"cart_wood","cart:iron":"cart_iron","cart:gold":"cart_gold"}})}const qy=401254,$y=688052,Yy=6088447,jy=3880512;function Ky(){return Ei({crystal:{roughness:.32,metalness:0,emissive:695488,emissiveIntensity:.3,name:"crystal"},rock:{roughness:.9,name:"crystal_root"}})}function Zy(i,e,t,n,s,{chamfer:r=0,twist:o=0,taper:a=.9,tipOffset:l=0}={}){const c=new R(...e).normalize(),u=new R(...i),h=new sn().setFromUnitVectors(new R(0,1,0),c),f=[];for(let T=0;T<6;T++){const b=T/6*Math.PI*2+o;if(r>0){const A=b-r,w=b+r,M=Math.cos(Math.PI/6)/Math.cos(Math.PI/6-r);f.push([Math.cos(A)*t*M,Math.sin(A)*t*M],[Math.cos(w)*t*M,Math.sin(w)*t*M])}else f.push([Math.cos(b)*t,Math.sin(b)*t])}const d=f.length,p=[],_=(T,b,A)=>new R(T,b,A).applyQuaternion(h).add(u),g=f.map(([T,b])=>_(T,-.15*n,b)),m=f.map(([T,b])=>_(T*a,n,b*a)),v=_(l*t,n+s,l*t*.5),y=(T,b,A)=>p.push(T.x,T.y,T.z,b.x,b.y,b.z,A.x,A.y,A.z);for(let T=0;T<d;T++){const b=(T+1)%d;y(g[T],m[b],m[T]),y(g[T],g[b],m[b]),y(m[T],m[b],v)}const x=new bt;return x.setAttribute("position",new it(p,3)),x.userData.axis={base:u,dir:c,len:n+s},x}function Jy(i){const e=new wi({mats:Ky(),ao:.8,edge:.6,topLight:.05,seed:31}),t=$n(17),n=Ti(9),s=Ki(.5,i?3:1);Ct(s,u=>{const h=u.clone().normalize(),f=1+n.fbm(h.x*1.8,h.y*1.8,h.z*1.8,3)*.45;u.copy(h).multiplyScalar(.5*f),u.y*=.5}),Al(s,Yo(i?12:7,.42,t,.15)),i&&ni(s,u=>n(u.x*9,u.y*9,u.z*9)*.012),s.translate(0,-.66,0),e.add(s,{part:"cluster",mat:"rock",flat:!0,color:u=>new me(jy).multiplyScalar(.8+.4*Pt(-.9,-.5,u.y)),vary:.12,varyScale:5});const r=[[[0,-.6,0],[.05,1,.02],.17,1.12,.36],[[.2,-.62,.06],[.55,1,.18],.125,.72,.27],[[-.21,-.6,.05],[-.6,1,.22],.135,.82,.29],[[.06,-.62,.22],[.12,1,.75],.1,.52,.22],[[-.06,-.62,-.2],[-.2,1,-.6],.11,.62,.24],[[.27,-.66,-.14],[.9,1,-.45],.08,.36,.17],[[-.29,-.66,-.12],[-1,.85,-.25],.075,.32,.16]];i&&r.push([[.33,-.7,.17],[1,.8,.6],.045,.16,.09],[[-.32,-.7,.2],[-.9,.9,.7],.04,.14,.08],[[.12,-.72,-.33],[.3,.8,-1],.04,.13,.08],[[-.15,-.74,.34],[-.2,.7,1],.035,.11,.07]);const o=new me(qy),a=new me($y),l=new me(Yy),c=new R;for(const[u,h,f,d,p]of r){const _=Zy(u,h,f,d,p,{chamfer:i?.09:0,twist:t()*Math.PI,taper:.86+t()*.1,tipOffset:i?(t()-.5)*.3:0}),g=_.userData.axis,m=[];for(let v=0;v<_.attributes.position.count/3;v++)m.push(.7+t()*.45);e.add(_,{part:"cluster",mat:"crystal",flat:!0,keepFaces:!0,occ:[[...g.base.clone().addScaledVector(g.dir,g.len*.35).toArray(),f*.9]],vary:0,edge:0,ao:.7,color:(v,y,x)=>{const T=c.subVectors(v,g.base).dot(g.dir)/g.len;return(T<.6?o.clone().lerp(a,Pt(0,.6,T)):a.clone().lerp(l,Pt(.6,1,T))).multiplyScalar(m[Math.floor(x/3)])}})}return e.fitSphere(.97),e.assemble({name:i?"crystal_sculpted":"crystal_classic",meshNames:{"cluster:crystal":"crystal","cluster:rock":"crystal_root"}})}function Qy(){const i=new wi({mats:Ei({rock:{roughness:.92,name:"rock"}}),ao:0,edge:.5,topLight:.18,seed:51}),e=Ti(23),t=$n(61),n=Ki(1,2);Ct(n,o=>{const a=o.clone().normalize();o.copy(a).multiplyScalar(1+e.fbm(a.x*1.6,a.y*1.6,a.z*1.6,3)*.5),o.y*=.68,o.x*=1.1}),Al(n,Yo(16,.82,t,.12));const s=[];for(let o=0;o<400;o++)s.push(.88+t()*.24);const r=n.toNonIndexed();return n.dispose(),i.add(r,{part:"rock",mat:"rock",flat:!0,keepFaces:!0,occ:!1,color:(o,a,l)=>new me(5922405).lerp(new me(3027254),Pt(.2,-.6,o.y)).multiplyScalar(s[Math.floor(l/3)%400]),vary:.1,varyScale:2.5}),i.fitSphere(.97),i.assemble({name:"rock",meshNames:{"rock:rock":"rock"}})}function eM(){const i=new wi({mats:Ei({paper:{roughness:.7,name:"tnt_paper"},iron:{metalness:.9,roughness:.5,name:"tnt_iron"},fuse:{roughness:.9,name:"tnt_fuse"},spark:{color:16777215,emissive:16742928,emissiveIntensity:2.2,roughness:.4,name:"tnt_spark"}}),ao:1,edge:.5,topLight:.1,seed:52}),e=new me(13902875),t=new me(9311247),n=new me(15126430),s=1,r=.2,o=[[-.4,0,0],[0,0,.025],[.4,0,0]];for(const[g,m,v]of o){const y=Xi(r,r,s,.045,16,2);y.translate(g,m,v),i.add(y,{part:"tnt",mat:"paper",vary:.04,color:(x,T)=>{const b=x.y-m;if(T.y>.6&&b>s/2-.05)return n.clone();if(T.y<-.6&&b<-s/2+.05)return n.clone().multiplyScalar(.8);const A=Pt(.34,.36,Math.abs(b))*(1-Pt(.4,.42,Math.abs(b)));return e.clone().lerp(t,A*.8)}})}const a=[],l=.4,c=r+.022;for(let g=0;g<24;g++){const m=g/24*Math.PI*2,v=Math.cos(m)>=0?l:-l;a.push(new R(v+Math.cos(m)*c,-.05,Math.sin(m)*(c+.03)))}const u=bs(new Go(a,!0,"centripetal"),()=>[.07,.016],30,6,{closed:!0,up:[0,1,0]});i.add(u,{part:"tnt",mat:"iron",color:3947586});for(const g of[-.18,.18]){const m=Gt([g,-.05,.27],[.025,.025,.015],8,6);i.add(m,{part:"tnt",mat:"iron",color:6974066,occ:!1})}const h=[[0,s/2-.02,.07],[.02,s/2+.1,.08],[.13,s/2+.2,.05],[.1,s/2+.3,.02]].map(g=>new R(...g)),f=bs(h,()=>.024,20,6);i.add(f,{part:"tnt",mat:"fuse",color:g=>new me(3811868).lerp(new me(1380364),Pt(s/2+.15,s/2+.3,g.y))});const d=h[3],p=Ki(.07,0);p.translate(d.x,d.y+.02,d.z),i.add(p,{part:"tnt",mat:"spark",color:16760896,occ:!1,ao:0,edge:0,vary:0});const _=$n(5);for(let g=0;g<6;g++){const m=new R(_()*2-1,_()*1.4-.2,_()*2-1).normalize(),v=[d.x,d.y+.02,d.z],y=[v[0]+m.x*.16,v[1]+m.y*.16,v[2]+m.z*.16],x=bn(v,y,.02,.003,4,1,1);i.add(x,{part:"tnt",mat:"spark",color:16751136,occ:!1,ao:0,edge:0,vary:0})}return i.fitSphere(.97),i.assemble({name:"tnt",meshNames:{"tnt:spark":"spark"}})}function tM(){const i=new wi({mats:Ei({wood:{roughness:.75,name:"chest_wood"},brass:{metalness:1,roughness:.35,name:"chest_brass"},dark:{roughness:.6,name:"chest_dark"}}),ao:1,edge:.6,topLight:.1,seed:53});Ti(31);const e=1.2,t=.55,n=.78,s=6042394,r=14723656,o=t/3;for(let p=0;p<3;p++){const _=Dt(e-(p===1?.006:0),o,n-(p===1?.006:0),.022,1,1);_.translate(0,-.3-t/2+o/2+p*o,0);const g=[1,.86,1.08][p];i.add(_,{part:"chest",mat:"wood",color:new me(s).multiplyScalar(g),vary:.08,varyScale:6})}const a=n/2,l=Xi(a,a,e,.04,16,2,0,Math.PI);Qt(l,{r:[0,0,Math.PI/2]}),Ct(l,p=>{p.y=Math.max(p.y,0)*.7}),l.translate(0,-.03,0),i.add(l,{part:"chest",mat:"wood",color:p=>new me(s).multiplyScalar(.95+.25*Pt(0,.2,p.y)),vary:.08,varyScale:5});for(const p of[-.4,.4]){const _=Dt(.09,t+.01,n+.025,.012,1,1);_.translate(p,-.3,0),i.add(_,{part:"chest",mat:"brass",color:r});const g=Xi(a+.014,a+.014,.09,.012,12,1,0,Math.PI);Qt(g,{r:[0,0,Math.PI/2]}),Ct(g,m=>{m.y=Math.max(m.y,0)*.72}),g.translate(p,-.035,0),i.add(g,{part:"chest",mat:"brass",color:r})}const c=Dt(e+.02,.05,n+.02,.015,1,1);c.translate(0,-.035,0),i.add(c,{part:"chest",mat:"brass",color:13144378,occ:!1});const u=Dt(e+.03,.06,n+.03,.02,1,1);u.translate(0,-.56,0),i.add(u,{part:"chest",mat:"brass",color:12158002});const h=Dt(.2,.24,.04,.02,1,1);h.translate(0,-.08,n/2+.01),i.add(h,{part:"chest",mat:"brass",color:15777888});const f=Gt([0,-.06,n/2+.03],[.026,.026,.01],10,6);i.add(f,{part:"chest",mat:"dark",color:1708556,occ:!1,edge:0});const d=Gt([0,-.1,n/2+.028],[.011,.03,.008],6,4);return i.add(d,{part:"chest",mat:"dark",color:1708556,occ:!1,edge:0}),i.fitSphere(.97),i.assemble({name:"chest"})}function nM(){const i=new wi({mats:Ei({gold:{metalness:1,roughness:.28,name:"relic_gold"},ring:{metalness:.8,roughness:.45,name:"relic_ring"},gem:{color:16777215,emissive:43232,emissiveIntensity:.6,roughness:.2,name:"relic_gem"}}),ao:.6,edge:.6,topLight:.08,seed:54}),e=$n(77),t=8,n=.48,s=.11,r=.72,o=[],a=(S,P)=>Array.from({length:t},(F,U)=>{const O=U/t*Math.PI*2+Math.PI/t+Math.PI/2;return new R(Math.cos(O)*P,S,Math.sin(O)*P)}),l=a(s,n),c=a(-s,n),u=a(s+.28,n*.55),h=a(-s-.24,n*.55),f=new R(0,r,0),d=new R(0,-.6,0),p=(S,P,F)=>o.push(S.x,S.y,S.z,P.x,P.y,P.z,F.x,F.y,F.z),_=(S,P,F,U)=>{p(S,P,F),p(S,F,U)};for(let S=0;S<t;S++){const P=(S+1)%t;_(c[S],c[P],l[P],l[S]),_(l[S],l[P],u[P],u[S]),p(u[S],u[P],f),_(h[S],h[P],c[P],c[S]),p(h[P],h[S],d)}const g=new bt;g.setAttribute("position",new it(o,3)),g.computeVertexNormals();{const S=g.attributes.position,P=g.attributes.normal,F=new R,U=new R;if(F.fromBufferAttribute(S,0),U.fromBufferAttribute(P,0),F.dot(U)<0)for(let O=0;O<S.count;O+=3){const V=S.getX(O+1),L=S.getY(O+1),z=S.getZ(O+1);S.setXYZ(O+1,S.getX(O+2),S.getY(O+2),S.getZ(O+2)),S.setXYZ(O+2,V,L,z)}g.deleteAttribute("normal")}const m=[];for(let S=0;S<o.length/9;S++)m.push(.85+e()*.3);i.add(g,{part:"relic",mat:"gold",flat:!0,keepFaces:!0,occ:[[0,0,0,.4]],color:(S,P,F)=>new me(16761402).lerp(new me(16769946),Math.max(0,P.y)*.4).multiplyScalar(m[Math.floor(F/3)])});const v=n*Math.cos(Math.PI/t),y=Vi(.085,.022,6,16);y.translate(0,0,v+.005),i.add(y,{part:"relic",mat:"gold",color:14260778,occ:!1});const x=Ki(.075,0);x.scale(1,1.2,.6),x.translate(0,0,v+.012),i.add(x,{part:"relic",mat:"gem",flat:!0,color:696272,occ:!1,ao:0,edge:0,vary:0});for(const[S,P]of[[r-.02,1],[-.6+.02,-1]]){const F=Gt([0,S+P*.03,0],[.04,.05,.04],8,6);i.add(F,{part:"relic",mat:"gem",color:696272,occ:!1,ao:0,edge:0,vary:0})}const T=[1.15,0,.35],b=new Xe().makeRotationFromEuler(new Wt(...T)),A=Vi(.8,.045,8,40);A.rotateX(Math.PI/2),A.applyMatrix4(b),i.add(A,{part:"ringTilt",mat:"ring",color:3420218,occ:!1});for(let S=0;S<4;S++){const P=S/4*Math.PI*2,F=Gt([Math.cos(P)*.8,0,Math.sin(P)*.8],[.07,.07,.07],8,6);F.applyMatrix4(b),i.add(F,{part:"ringTilt",mat:"ring",color:5919328,occ:!1});const U=Ki(.035,0);U.translate(Math.cos(P)*.8*1,.07,Math.sin(P)*.8),U.applyMatrix4(b),i.add(U,{part:"ringTilt",mat:"gem",flat:!0,color:696272,occ:!1,ao:0,edge:0,vary:0})}const w=i.fitSphere(.97),M=new R(0,0,0).sub(w.center).multiplyScalar(w.scale).toArray();return i.assemble({name:"relic",pivots:{ringTilt:M},partRotations:{ringTilt:T},meshNames:{"ringTilt:ring":"ring","ringTilt:gem":"ring_gems","relic:gem":"gem"},attach:{ring_gems:"ring"}})}const Ud=["miner","cart","gold","crystal"],iM=["rock","tnt","chest","relic"],sM={miner:ky,cart:Xy,gold:Gy,crystal:Jy},Fd={};for(const i of Ud)Fd[i]=lr(()=>sM[i](!1));const rM={rock:lr(Qy),tnt:lr(eM),chest:lr(tM),relic:lr(nM)};function oM(i){const e=Fd[i];if(!e)throw new Error(`buildClassicSlot: unknown slot "${i}" (expected ${Ud.join(", ")})`);return e()}function aM(i){const e=rM[i];if(!e)throw new Error(`buildPropTemplate: unknown kind "${i}" (expected ${iM.join(", ")})`);return e()}const cM={file:"miner.glb",source:"stand-in",triangles:29464},lM={file:"cart.glb",source:"stand-in",triangles:14500},uM={file:"gold.glb",source:"stand-in",triangles:2057},hM={file:"crystal.glb",source:"stand-in",triangles:716},Va={miner:cM,cart:lM,gold:uM,crystal:hM},dM=""+new URL("miner-DoItAiy_.glb",import.meta.url).href,fM=""+new URL("cart-skTPd7_s.glb",import.meta.url).href,pM=""+new URL("gold-UjZx1pin.glb",import.meta.url).href,mM=""+new URL("crystal-B6LC33tb.glb",import.meta.url).href,gs=["miner","cart","gold","crystal"],gM=["rock","tnt","chest","relic"],_M={miner:dM,cart:fM,gold:pM,crystal:mM},xM={miner:{fit:"height",size:1.7,yaw:0},cart:{fit:"length",size:2.1,yaw:0},gold:{fit:"radius",size:1,yaw:0},crystal:{fit:"radius",size:1,yaw:0},rock:{fit:"radius",size:1,yaw:0},tnt:{fit:"radius",size:1,yaw:0},chest:{fit:"radius",size:1,yaw:0},relic:{fit:"radius",size:1,yaw:0}},ir=new Nn,Oi=new R,_s=new R;function Ga(i,e,t=0){const n=xM[e],s=new yt;if(s.add(i),s.rotation.y=n.yaw+t,s.updateMatrixWorld(!0),ir.setFromObject(s,!0),ir.isEmpty())throw new Error(`${e}: empty model`);ir.getSize(Oi),ir.getCenter(_s);let r=1;n.fit==="height"?r=n.size/Math.max(1e-6,Oi.y):n.fit==="length"?r=n.size/Math.max(1e-6,Math.max(Oi.x,Oi.z)):r=n.size/Math.max(1e-6,Math.max(Oi.x,Oi.y,Oi.z)/2);const o=new yt;return o.name=`slot:${e}`,s.scale.setScalar(r),n.fit==="radius"?s.position.set(-_s.x*r,-_s.y*r,-_s.z*r):s.position.set(-_s.x*r,-ir.min.y*r,-_s.z*r),o.add(s),o.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=e==="miner"||e==="cart")}),o.userData.slot=e,o.userData.rig=Od(o),o}function Od(i){const e={};return i.traverse(t=>{for(const n of["head","torso","armL","armR","pickaxe","ring","headlamp"])t.name===n&&!e[n]&&(e[n]=t)}),e}function mh(i){return Od(i)}function vM(){const i={},e={},t={};let n="classic",s="idle",r=null;const o=new Set;for(const c of gs)i[c]=Ga(oM(c),c);for(const c of gM)e[c]=Ga(aM(c),c);function a(){for(const c of o)c({mode:n,status:s,error:r})}async function l(c){s="loading",a();const u=new Yv,h={},f=()=>{if(!c)return;let d=0;for(const p of gs)d+=h[p]||0;c(d/gs.length)};try{await Promise.all(gs.map(d=>new Promise((p,_)=>{u.load(_M[d],g=>{try{const m=g.scene||g.scenes&&g.scenes[0];if(!m)throw new Error(`${d}.glb has no scene`);t[d]=Ga(m,d),h[d]=1,f(),p()}catch(m){_(m)}},g=>{g&&g.total&&(h[d]=Math.min(.99,g.loaded/g.total),f())},g=>_(new Error(`${d}.glb: ${g&&g.message?g.message:"network error"}`)))}))),s="ready",r=null,n="tripo"}catch(d){s="failed",r=d&&d.message?d.message:String(d),n="classic";for(const p of gs)delete t[p]}return a(),s}return{load:l,get mode(){return n},get status(){return s},get error(){return r},get standIn(){return gs.some(c=>Va[c]&&Va[c].source!=="tripo")},manifest:Va,onChange(c){return o.add(c),()=>o.delete(c)},setMode(c){return c==="tripo"&&s!=="ready"?!1:(n=c==="tripo"?"tripo":"classic",a(),!0)},template(c){return e[c]?e[c]:n==="tripo"&&t[c]?t[c]:i[c]},instance(c){return this.template(c).clone(!0)},allTemplates(){return[...Object.values(i),...Object.values(e),...Object.values(t)]}}}class yM extends id{constructor(){super();const e=new gn;e.deleteAttribute("uv");const t=new It({side:tn}),n=new It,s=new Ms(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new He(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new dr(e,n,6),a=new St;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const l=new He(e,xs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new He(e,xs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const u=new He(e,xs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const h=new He(e,xs(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const f=new He(e,xs(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new He(e,xs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function xs(i){return new Lm({color:0,emissive:16777215,emissiveIntensity:i})}const sr=new R;function Mn(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;sr.copy(e),sr[n]=0,sr.normalize();const c=.5*o/(o+a),u=1-sr.angleTo(i)/l;return Math.sign(sr[t])===1?u*c:a/(o+a)+c+c*(1-u)}class Rl extends gn{constructor(e=1,t=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new R,c=new R,u=new R(e,t,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,_=new R,g=.5/o;for(let m=0,v=0;m<h.length;m+=3,v+=2)switch(l.fromArray(h,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),h[m+0]=u.x*Math.sign(l.x)+c.x*r,h[m+1]=u.y*Math.sign(l.y)+c.y*r,h[m+2]=u.z*Math.sign(l.z)+c.z*r,f[m+0]=c.x,f[m+1]=c.y,f[m+2]=c.z,Math.floor(m/p)){case 0:_.set(1,0,0),d[v+0]=Mn(_,c,"z","y",r,n),d[v+1]=1-Mn(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),d[v+0]=1-Mn(_,c,"z","y",r,n),d[v+1]=1-Mn(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),d[v+0]=1-Mn(_,c,"x","z",r,e),d[v+1]=Mn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),d[v+0]=1-Mn(_,c,"x","z",r,e),d[v+1]=1-Mn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),d[v+0]=1-Mn(_,c,"x","y",r,e),d[v+1]=1-Mn(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),d[v+0]=Mn(_,c,"x","y",r,e),d[v+1]=1-Mn(_,c,"y","x",r,t);break}}static fromJSON(e){return new Rl(e.width,e.height,e.depth,e.segments,e.radius)}}const Fo=new Xe,Oo=new sn,Bo=new Wt,Bd=new R,kd=new R;function MM(i,e=2,t=0){i.attributes.normal||i.computeVertexNormals();const n=i.attributes.position,s=i.attributes.normal,r=new Float32Array(n.count*2);for(let o=0;o<n.count;o++){const a=n.getX(o),l=n.getY(o),c=n.getZ(o),u=Math.abs(s.getX(o)),h=Math.abs(s.getY(o)),f=Math.abs(s.getZ(o));let d,p;h>=u&&h>=f?(d=a,p=c):f>=u?(d=a,p=l):(d=c,p=l),r[o*2]=d/e+t,r[o*2+1]=p/(e*.25)+t*3.7}return i.setAttribute("uv",new ht(r,2)),i}function zd(i,e){const t=new me(e),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=t.r,s[r*3+1]=t.g,s[r*3+2]=t.b;return i.setAttribute("color",new ht(s,3)),i}function Kt(i,e,t,n,s=[0,0,0],r=16777215,o=0){const a=new Rl(i,e,t,2,Math.min(e,t)*.18);return MM(a,2.2,o),zd(a,r),Bo.set(s[0],s[1],s[2]),Oo.setFromEuler(Bo),Fo.compose(kd.set(n[0],n[1],n[2]),Oo,Bd.set(1,1,1)),a.applyMatrix4(Fo),Hd(a,["position","normal","uv","color"])}function yi(i,e,t=[0,0,0],n=[1,1,1],s=16777215){const r=i.clone();return r.attributes.uv||r.setAttribute("uv",new ht(new Float32Array(r.attributes.position.count*2),2)),zd(r,s),Bo.set(t[0],t[1],t[2]),Oo.setFromEuler(Bo),Fo.compose(kd.set(e[0],e[1],e[2]),Oo,Bd.set(n[0],n[1],n[2])),r.applyMatrix4(Fo),Hd(r,["position","normal","uv","color"])}function Hd(i,e){for(const t of Object.keys(i.attributes))e.includes(t)||i.deleteAttribute(t);return i.index?i.toNonIndexed():i}function _o(i){const e=$v(i,!1);for(const t of i)t.dispose();return e.computeBoundingSphere(),e}function xo(i=1,e=1,t=.8){const n=new Wo(1,e),s=n.attributes.position,r=new R;let o=i;const a=()=>(o=o*16807%2147483647,o/2147483647),l=[];for(let u=0;u<8;u++)l.push([a()*2-1,a()*2-1,a()*2-1,a()*.35]);for(let u=0;u<s.count;u++){r.fromBufferAttribute(s,u).normalize();let h=1;for(const f of l)h+=f[3]*Math.max(0,r.x*f[0]+r.y*f[1]+r.z*f[2]);r.multiplyScalar(h),r.y*=t,s.setXYZ(u,r.x,r.y,r.z)}const c=n.index?n.toNonIndexed():n;return c!==n&&n.dispose(),c.computeVertexNormals(),c}function Cl(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function jo(i){let e=i>>>0;const t=()=>{e=e+1831565813>>>0;let n=e;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296};return t.range=(n,s)=>n+(s-n)*t(),t.int=(n,s)=>n+Math.floor(t()*(s-n+1)),t.pick=n=>n[Math.floor(t()*n.length)],t.shuffle=n=>{for(let s=n.length-1;s>0;s--){const r=Math.floor(t()*(s+1)),o=n[s];n[s]=n[r],n[r]=o}return n},t}const Vn=i=>new me().setHex(i,Ot);function Pl(i,e){if(typeof OffscreenCanvas<"u")try{const n=new OffscreenCanvas(i,e);if(n.getContext("2d"))return n}catch{}const t=document.createElement("canvas");return t.width=i,t.height=e,t}function Ll(i){const e=jo(i),t=256,n=new Uint8Array(t*2),s=new Float32Array(t);for(let a=0;a<t;a++)n[a]=a,s[a]=e();for(let a=t-1;a>0;a--){const l=Math.floor(e()*(a+1)),c=n[a];n[a]=n[l],n[l]=c}for(let a=0;a<t;a++)n[a+t]=n[a];const r=(a,l)=>s[n[n[a&255]+(l&255)&511]],o=a=>a*a*(3-2*a);return function(l,c,u){const h=Math.floor(l),f=Math.floor(c),d=l-h,p=c-f,_=(h%u+u)%u,g=(f%u+u)%u,m=(_+1)%u,v=(g+1)%u,y=o(d),x=o(p),T=r(_,g),b=r(m,g),A=r(_,v),w=r(m,v);return T+(b-T)*y+(A-T)*x+(T-b-A+w)*y*x}}function Ps(i,e,t,n,s){let r=0,o=.5,a=n,l=1,c=0;for(let u=0;u<s;u++)r+=o*i(e*l,t*l,a),c+=o,o*=.5,l*=2,a*=2;return r/c}function gh(i,e,t=512,n=1){const s=Ll(e),r=new Float32Array(t*t),o=new Uint8ClampedArray(t*t*4),a=Vn(i.base),l=Vn(i.dark),c=Vn(i.light),u=Vn(i.vein),h=Vn(i.speck),f=new me,d=jo(e^2654435769),p=7,_=[];for(let v=0;v<p;v++)for(let y=0;y<p;y++)_.push([(y+d())/p,(v+d())/p,d()]);for(let v=0;v<t;v++)for(let y=0;y<t;y++){const x=y/t,T=v/t,b=Ps(s,x*4,T*4,4,3),A=Math.sin((T*7+b*1.6)*Math.PI*2)*.5+.5,w=Ps(s,x*16,T*16,16,4);let M=9,S=0;const P=Math.floor(x*p),F=Math.floor(T*p);for(let $=-1;$<=1;$++)for(let se=-1;se<=1;se++){const ye=(P+se+p)%p,fe=(F+$+p)%p,Ce=_[fe*p+ye];let Le=Math.abs(Ce[0]-x);Le=Math.min(Le,1-Le);let j=Math.abs(Ce[1]-T);j=Math.min(j,1-j);const Z=Math.hypot(Le,j);Z<M&&(M=Z,S=Ce[2])}const U=Math.max(0,1-M*p*(2.6+S*2.5)),O=U>.3?Math.min(1,(U-.3)*2.5):0,V=w*.55+A*.25+O*.5*n;r[v*t+y]=V,f.copy(l).lerp(a,Math.min(1,A*.7+w*.6)),O>0&&f.lerp(c,O*(.15+S*.25)*n);const L=Math.abs(Ps(s,x*6+3.1,T*6+1.7,6,3)-.5);L<.011&&f.lerp(u,(1-L/.011)*.5);const z=s(x*128,T*128,128);z>.93&&f.lerp(h,(z-.93)*10);const k=.75+w*.35,G=(v*t+y)*4;o[G]=f.r*255*k,o[G+1]=f.g*255*k,o[G+2]=f.b*255*k,o[G+3]=255}const g=Pr(t,t,o,!0),m=SM(r,t,3.2);return{map:g,normalMap:m}}function Pr(i,e,t,n){const s=Pl(i,e);s.getContext("2d").putImageData(new ImageData(t,i,e),0,0);const o=new pl(s);return o.wrapS=o.wrapT=qi,o.colorSpace=n?Bt:Hn,o.anisotropy=4,o.needsUpdate=!0,o}function SM(i,e,t){const n=new Uint8ClampedArray(e*e*4);for(let s=0;s<e;s++)for(let r=0;r<e;r++){const o=i[s*e+(r-1+e)%e],a=i[s*e+(r+1)%e],l=i[(s-1+e)%e*e+r],c=i[(s+1)%e*e+r];let u=(o-a)*t,h=(c-l)*t,f=1;const d=Math.hypot(u,h,f);u/=d,h/=d,f/=d;const p=(s*e+r)*4;n[p]=(u*.5+.5)*255,n[p+1]=(h*.5+.5)*255,n[p+2]=(f*.5+.5)*255,n[p+3]=255}return Pr(e,e,n,!1)}function bM(i,e=512,t=128){const n=Ll(i),s=new Uint8ClampedArray(e*t*4),r=new Float32Array(e*t),o=Vn(10120258),a=Vn(6176036),l=Vn(12094040),c=new me;for(let d=0;d<t;d++)for(let p=0;p<e;p++){const _=p/e,g=d/t,m=Ps(n,_*2,g*4,2,3),v=Math.sin((g*9+m*2.2)*Math.PI*2)*.5+.5,y=n(_*64,g*32*4,64),x=Ps(n,_*8,g*64,8,2);c.copy(a).lerp(o,v*.8+x*.3),v>.85&&c.lerp(l,(v-.85)*3);const T=.8+y*.3,b=(d*e+p)*4;s[b]=c.r*255*T,s[b+1]=c.g*255*T,s[b+2]=c.b*255*T,s[b+3]=255,r[d*e+p]=v*.4+x*.6}const u=Pr(e,t,s,!0),h=new Uint8ClampedArray(e*t*4);for(let d=0;d<t;d++)for(let p=0;p<e;p++){const _=r[d*e+(p-1+e)%e],g=r[d*e+(p+1)%e],m=r[(d-1+t)%t*e+p],v=r[(d+1)%t*e+p];let y=(_-g)*2,x=(v-m)*4,T=1;const b=Math.hypot(y,x,T),A=(d*e+p)*4;h[A]=(y/b*.5+.5)*255,h[A+1]=(x/b*.5+.5)*255,h[A+2]=(T/b*.5+.5)*255,h[A+3]=255}const f=Pr(e,t,h,!1);return{map:u,normalMap:f}}function TM(i=128){const e=Pl(i,i),t=e.getContext("2d"),n=t.createRadialGradient(i/2,i/2,0,i/2,i/2,i/2);n.addColorStop(0,"rgba(0,0,0,0.85)"),n.addColorStop(.45,"rgba(0,0,0,0.55)"),n.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=n,t.fillRect(0,0,i,i);const s=new pl(e);return s.colorSpace=Hn,s}function EM(i=64){const e=Pl(i,i),t=e.getContext("2d"),n=t.createRadialGradient(i/2,i/2,0,i/2,i/2,i/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.8)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,i,i),new pl(e)}function wM(i,e,t,n=256,s=256){const r=Ll(t),o=new Uint8ClampedArray(n*s*4),a=Vn(i),l=Vn(e),c=new me;for(let u=0;u<s;u++)for(let h=0;h<n;h++){const f=Ps(r,h/n*4,u/s*4,4,4);c.copy(a).lerp(l,u/s);const d=.7+f*.6,p=(u*n+h)*4;o[p]=c.r*255*d,o[p+1]=c.g*255*d,o[p+2]=c.b*255*d,o[p+3]=255}return Pr(n,s,o,!0)}const gr={gilded:{id:"gilded",bg:1319188,bgTop:3033640,bgBottom:1186832,fog:988942,strata:{base:8149043,dark:4139541,light:11242076,vein:14724672,speck:16769162},surround:3425578,rock:4670511,rockVar:.18,moss:4153892,deco:"moss",hemiSky:14275232,hemiGround:2761750,hemiIntensity:.55,key:16769712,keyIntensity:2,lantern:16757850,accent:16762460,accentIntensity:6,dust:16767130,exposure:1.05,ui:"#ffc65c"},glacier:{id:"glacier",bg:728106,bgTop:1984358,bgBottom:661540,fog:662056,strata:{base:5009288,dark:2044998,light:11129574,vein:9434111,speck:15268863},surround:2245726,rock:7311011,rockVar:.14,moss:15136511,deco:"snow",hemiSky:12576511,hemiGround:1386042,hemiIntensity:.6,key:15004927,keyIntensity:2.4,lantern:16763018,accent:6283519,accentIntensity:7,dust:13629183,exposure:1,ui:"#7fe7ff"},ember:{id:"ember",bg:1838085,bgTop:5120012,bgBottom:1509637,fog:1706501,strata:{base:8077606,dark:3478793,light:12087882,vein:16742942,speck:16756848},surround:4202511,rock:4863278,rockVar:.16,moss:16738842,deco:"embers",hemiSky:16761754,hemiGround:2756358,hemiIntensity:.5,key:16765088,keyIntensity:2.5,lantern:16751168,accent:16738846,accentIntensity:8,dust:16753226,exposure:1.02,ui:"#ff9a4a"},amethyst:{id:"amethyst",bg:1510694,bgTop:3940960,bgBottom:1313568,fog:1313570,strata:{base:5913970,dark:2430522,light:11770576,vein:14199039,speck:15917311},surround:3547468,rock:5917296,rockVar:.15,moss:12946687,deco:"shards",hemiSky:14731519,hemiGround:1904688,hemiIntensity:.6,key:15852287,keyIntensity:2.4,lantern:16756848,accent:11566335,accentIntensity:7,dust:14862079,exposure:1.02,ui:"#c79bff"}},Se={pivotY:1.1,deckTop:.18,deckFrontZ:-.12,slabFrontZ:.85,wallZ:-.72,rearZ:-2,minerX:-1.75,cartX:2.75,railZ:-1.1};function AM(i,e){const t=new Map,n=new yt;n.name="mine";const s=bM(77),r=new It({map:s.map,normalMap:s.normalMap,normalScale:new be(.8,.8),roughness:.82,metalness:0,vertexColors:!0}),o=new It({color:3881529,roughness:.55,metalness:.85,vertexColors:!0}),a=new It({color:13210943,roughness:.35,metalness:1}),l=new It({color:10123854,roughness:.95,metalness:0,vertexColors:!0}),c=new It({roughness:.96,metalness:0,normalScale:new be(1.2,1.2),vertexColors:!0}),u=new It({roughness:.97,metalness:0,color:10132122}),h=new It({roughness:.97,metalness:0}),f=new It({roughness:1,metalness:0}),d=new It({roughness:.9,metalness:.02,flatShading:!0}),p=new It({roughness:.95,metalness:0,flatShading:!0}),_=new It({roughness:.3,metalness:.1,flatShading:!0,emissiveIntensity:.6}),g=new It({color:16769704,emissive:16757850,emissiveIntensity:3,roughness:.3}),m=new ai({fog:!1}),v={woodMat:r,ironMat:o,brassMat:a,ropeMat:l},y=[xo(11,1,.78),xo(23,1,.7),xo(37,1,.85)],x=xo(5,0,.45),T=new No(.12,.5,5,1);T.translate(0,.25,0);const b=new Map;function A(U){const O=new yt;O.name=`mine-${U.name}`;const V=U.width,L=Se.pivotY-U.depth,z=V/2+.45,k=L-.45,G=jo(U.name==="portrait"?913:377),$=60,se=new md;se.moveTo(-$,L-$),se.lineTo($,L-$),se.lineTo($,0),se.lineTo(-$,0),se.lineTo(-$,L-$);const ye=new Xc,fe=[],Ce=(ie,$e)=>ie+($e-ie)*G();fe.push([-z,-.06],[z,-.06]);for(let ie=-.2;ie>L;ie-=.55)fe.push([V/2+Ce(.08,.42),ie]);fe.push([V/2+Ce(.1,.4),L-Ce(.1,.4)]);for(let ie=V/2-.4;ie>-V/2+.2;ie-=.6)fe.push([ie,L-Ce(.08,.42)]);fe.push([-V/2-Ce(.1,.4),L-Ce(.1,.4)]);for(let ie=L+.4;ie<-.2;ie+=.55)fe.push([-V/2-Ce(.08,.42),ie]);ye.moveTo(fe[0][0],fe[0][1]);for(let ie=1;ie<fe.length;ie++)ye.lineTo(fe[ie][0],fe[ie][1]);ye.lineTo(fe[0][0],fe[0][1]),se.holes.push(ye);const Le=new yl(se,1);RM(Le,1/8);const j=new He(Le,h);j.position.z=Se.slabFrontZ,j.receiveShadow=!0,O.add(j);const Z=0-k,te=new Cn(z*2,Z,16,16);te.translate(0,k+Z/2,Se.wallZ),rr(te,"xy",1/8);{const ie=te.attributes.position,$e=new Float32Array(ie.count*3);for(let tt=0;tt<ie.count;tt++){const rn=1-Math.abs(ie.getX(tt))/z,$t=(ie.getY(tt)-k)/Z,ln=.42+.58*(Math.min(rn*4,1)*Math.min($t*5,1)*Math.min((1-$t)*8+.4,1))*(.78+.22*$t);$e[tt*3]=ln,$e[tt*3+1]=ln,$e[tt*3+2]=ln}te.setAttribute("color",new ht($e,3))}const ae=Se.slabFrontZ-Se.wallZ,ge=new Cn(ae,Z);ge.rotateY(Math.PI/2),ge.translate(-z,k+Z/2,(Se.slabFrontZ+Se.wallZ)/2),rr(ge,"zy",1/8);const Pe=new Cn(ae,Z);Pe.rotateY(-Math.PI/2),Pe.translate(z,k+Z/2,(Se.slabFrontZ+Se.wallZ)/2),rr(Pe,"zy",1/8);const et=new Cn(z*2,ae);et.rotateX(-Math.PI/2),et.translate(0,k,(Se.slabFrontZ+Se.wallZ)/2),rr(et,"xz",1/8);const B=new He(te,c);B.receiveShadow=!0,O.add(B);const je=new He(_o([ge,Pe,et].map(ie=>ie.index?ie.toNonIndexed():ie)),u);je.receiveShadow=!0,O.add(je);const De=new Cn($*2,Se.slabFrontZ-(Se.rearZ-1.2));De.rotateX(-Math.PI/2),De.translate(0,0,(Se.slabFrontZ+Se.rearZ-1.2)/2),rr(De,"xz",1/6);const Oe=new He(De,f);Oe.receiveShadow=!0,O.add(Oe);const Re=new He(new Cn($*2,40),m);Re.position.set(0,18,Se.rearZ-1.4),O.add(Re);const Ke=[],Ee=(ie,$e,tt)=>Ke.push({x:ie,y:$e,s:tt,z:Se.slabFrontZ-.15+G()*.25,rot:G()*6.28,geo:Math.floor(G()*3)});for(let ie=-.35;ie>L-.1;ie-=.5+G()*.25)Ee(-z-G()*.2,ie,.2+G()*.3),Ee(z+G()*.2,ie,.2+G()*.3);for(let ie=-z;ie<z;ie+=.5+G()*.4)Ee(ie,k-.05+G()*.15,.22+G()*.3);Ee(-z,k,.55),Ee(z,k,.55);for(let ie=0;ie<26;ie++){const $e=ie%2?1:-1;Ee($e*(z+.6+G()*3.5),-.4-G()*(Z+1),.15+G()*.35)}const ze=[];for(let ie=0;ie<3;ie++){const $e=Ke.filter(on=>on.geo===ie),tt=new dr(y[ie],d,Math.max(1,$e.length));tt.count=$e.length;const rn=new Xe,$t=new sn,At=new Wt,ln=new R,Dr=new R;$e.forEach((on,qs)=>{At.set(G()*.6,on.rot,G()*.6),$t.setFromEuler(At),rn.compose(Dr.set(on.x,on.y,on.z),$t,ln.set(on.s*(1+G()*.3),on.s,on.s*.9)),tt.setMatrixAt(qs,rn),tt.setColorAt(qs,new me().setScalar(.55+G()*.4))}),tt.instanceMatrix.needsUpdate=!0,tt.instanceColor&&(tt.instanceColor.needsUpdate=!0),tt.castShadow=!0,tt.receiveShadow=!0,tt.userData.rim=$e,ze.push(tt),O.add(tt)}const lt=Ke.filter(ie=>ie.y>L-.2||Math.abs(ie.x)>z+.2),rt=new dr(x,p,lt.length),N=new dr(T,_,lt.length);{const ie=new Xe,$e=new sn,tt=new Wt,rn=new R,$t=new R;lt.forEach((At,ln)=>{tt.set(0,G()*6.28,0),$e.setFromEuler(tt),ie.compose($t.set(At.x+(G()-.5)*At.s*.6,At.y+At.s*.58,At.z+.05),$e,rn.setScalar(At.s*(.35+G()*.3))),rt.setMatrixAt(ln,ie),tt.set((G()-.5)*.9,G()*6.28,(G()-.5)*.9),$e.setFromEuler(tt),ie.compose($t.set(At.x+(G()-.5)*At.s,At.y+At.s*.4,At.z+.1),$e,rn.setScalar(At.s*(.7+G()*.9))),N.setMatrixAt(ln,ie)}),rt.instanceMatrix.needsUpdate=!0,N.instanceMatrix.needsUpdate=!0,rt.receiveShadow=!0}O.add(rt,N);const E=[],q=-(V/2+.9),ne=V/2+.9,I=.38,D=Se.deckFrontZ-Se.rearZ-.05,ee=(Se.deckFrontZ+Se.rearZ)/2-.08;let Q=0;for(let ie=q+I/2;ie<ne;ie+=I){const $e=new me(16777215).multiplyScalar(.78+G()*.32);$e.g*=.97+G()*.05,E.push(Kt(D,.11,I-.03,[ie,Se.deckTop-.055+(G()-.5)*.015,ee],[0,Math.PI/2+(G()-.5)*.015,0],$e,Q++*.37))}E.push(Kt(ne-q+.2,.3,.24,[0,Se.deckTop-.2,Se.deckFrontZ-.12],[0,0,0],9079434,.2));for(const ie of[-1,1])E.push(Kt(D,.26,.26,[ie*(ne+.05),Se.deckTop-.2,ee],[0,Math.PI/2,0],8224125,.5));const le=V/2+.45,Me=2.72,oe=[-le,le];V>12&&oe.push(-4.1,4.1);for(const ie of oe)E.push(Kt(Me+.55,.3,.3,[ie,(Me-.55)/2,Se.rearZ],[0,0,Math.PI/2],10132122,ie*.13));E.push(Kt(le*2+.5,.32,.32,[0,Me,Se.rearZ],[0,0,0],10263708,.71)),E.push(Kt(le*2+.3,.2,.2,[0,Me-.34,Se.rearZ+.05],[0,0,0],8158332,.11));for(const ie of oe)for(const $e of[-1,1])ie===-le&&$e<0||ie===le&&$e>0||E.push(Kt(1.25,.16,.16,[ie+$e*.42,Me-.44,Se.rearZ+.02],[0,0,$e*Math.PI/4],9276813,ie));for(const ie of[-1,1])E.push(Kt(1.55,.24,.24,[ie*le,.42,Se.deckFrontZ-.18],[0,0,Math.PI/2],10132122,ie*.3)),E.push(Kt(Se.deckFrontZ-Se.rearZ,.14,.14,[ie*le,1.02,(Se.deckFrontZ+Se.rearZ)/2-.1],[0,Math.PI/2,0],9342606,ie));for(const ie of[-1,1])E.push(Kt(1.25,.16,.16,[ie*.5,Se.deckTop+.6,-.95],[0,0,Math.PI/2],10526880,ie*.9)),E.push(Kt(.9,.12,.12,[ie*.5,Se.deckTop+.38,-.95],[Math.PI/2*0,Math.PI/2,Math.PI/4.5],9079434,ie*.5));E.push(Kt(1.2,.15,.2,[0,Se.deckTop+1.26,-.95],[0,0,0],10526880,.3)),E.push(Kt(1.25,.14,.14,[0,Se.deckTop+1.4,-.42],[0,Math.PI/2,0],11053224,.8));const he=1.05,ce=V/2+.85;for(let ie=he;ie<ce;ie+=.42)E.push(Kt(.9,.06,.16,[ie,Se.deckTop+.03,Se.railZ],[0,Math.PI/2,0],7105644,ie));if(V>12)for(let ie=0;ie<3;ie++)E.push(Kt(.62,.18,.62,[-V/2+.2,Se.deckTop+.1+ie*.2,-1.55],[0,.3,0],10127994,ie));const de=new He(_o(E),r);de.castShadow=!0,de.receiveShadow=!0,O.add(de);const ve=[],qe=new gn(1,.06,.05);for(const ie of[-.27,.27])ve.push(yi(qe,[(he+ce)/2,Se.deckTop+.09,Se.railZ+ie],[0,0,0],[ce-he,1,1],11579568));const H=new cn(.035,.035,.04,6);H.rotateX(Math.PI/2);for(const ie of oe)for(const $e of[Me,Me-.34,.6,1.4])ve.push(yi(H,[ie+.07,$e,Se.rearZ+.17],[0,0,0],[1,1,1],10132122),yi(H,[ie-.07,$e+.05,Se.rearZ+.17],[0,0,0],[1,1,1],9079434));for(let ie=q+.4;ie<ne;ie+=1.1)ve.push(yi(H,[ie,Se.deckTop-.15,Se.deckFrontZ+.005],[0,0,0],[1.2,1.2,1],10526880));const pe=new gn(.04,.34,.06);for(const ie of[-1,1])ve.push(yi(pe,[ie*.07,Se.pivotY+.24,.12],[0,0,0],[1,1,1],9079434));const _e=Math.min(V/2-1.5,4.7),we=new ui(.04,.012,4,8);for(const ie of[-1,1])for(let $e=0;$e<4;$e++)ve.push(yi(we,[ie*_e,Me-.2-$e*.07,Se.rearZ+.2],[0,$e%2?Math.PI/2:0,0],[1,1,1],7829367));const ue=new He(_o(ve),o);ue.castShadow=!0,O.add(ue);const re=[],Ie=new ui(.2,.055,6,16);Ie.rotateX(Math.PI/2);const Ge=Math.max(-V/2+.9,-3.1);for(let ie=0;ie<3;ie++)re.push(yi(Ie,[Ge,Se.deckTop+.06+ie*.09,-1.45],[0,ie,0],[1-ie*.08,1,1-ie*.08],16777215));re.push(yi(Ie,[.95,Se.deckTop+.06,-1.6],[0,0,0],[.8,1,.8],14540253));const dt=new He(_o(re),l);dt.castShadow=!0,O.add(dt);const at=[];for(const ie of[-1,1]){const $e=new yt;$e.position.set(ie*_e,Me-.62,Se.rearZ+.2);const tt=new He(new cn(.1,.1,.22,10),g),rn=new He(new No(.15,.12,8),a);rn.position.y=.17;const $t=new He(new cn(.13,.11,.05,10),a);$t.position.y=-.13;const At=new He(new ui(.11,.012,4,12),a);At.rotation.x=Math.PI/2,$e.add(tt,rn,$t,At),O.add($e),at.push($e)}const _n={group:O,lanterns:at,lanternX:_e,rimMeshes:ze,blobs:rt,shards:N,halfOuter:z,floorY:L,floorOuter:k,beamY:Me};return O.userData.info=_n,_n}function w(U){if(!b.has(U.name)){const O=A(U);b.set(U.name,O),n.add(O.group)}return b.get(U.name)}let M=null;function S(U){const O=w(U);for(const[,V]of b)V.group.visible=V===O;return M=O,O}function P(U){if(!t.has(U)){const O=gr[U],V=512,L=1e3+U.length*97+U.charCodeAt(0),z=gh(O.strata,L,V,.55);new me(O.surround);const k=se=>se.getHex(Ot),G=new me().setHex(O.surround,Ot),$=gh({base:O.surround,dark:k(G.clone().multiplyScalar(.45)),light:k(G.clone().lerp(new me().setHex(O.strata.light,Ot),.35)),vein:k(G.clone().lerp(new me().setHex(O.moss,Ot),O.deco==="embers"?.7:.35)),speck:O.moss},L+7,256,.25);t.set(U,{...z,surround:$})}return t.get(U)}function F(U){const O=gr[U],V=P(U);for(const L of[c,u])L.map=V.map,L.normalMap=V.normalMap,L.needsUpdate=!0;for(const L of[h,f])L.map=V.surround.map,L.normalMap=V.surround.normalMap,L.needsUpdate=!0;c.color.set(16777215),u.color.set(16777215).multiplyScalar(.62),h.color.set(16777215).multiplyScalar(.8),f.color.set(16777215).multiplyScalar(.9),d.color.set(O.rock),m.userData[U]||(m.userData[U]=wM(O.bgTop,O.bgBottom,55+U.length)),m.map=m.userData[U],m.needsUpdate=!0,p.color.set(O.moss),p.emissive.set(O.deco==="embers"?O.moss:0),p.emissiveIntensity=O.deco==="embers"?1.4:0,O.deco==="embers"&&p.color.set(2759188),_.color.set(O.deco==="snow"?10479871:O.moss),_.emissive.set(O.deco==="snow"?2789296:O.moss),_.emissiveIntensity=O.deco==="shards"?.55:.35,g.emissive.set(O.lantern);for(const[,L]of b)L.blobs.visible=O.deco!=="shards",L.shards.visible=O.deco==="shards"||O.deco==="snow"}return{root:n,shared:v,setLayout:S,setRegion:F,regionTextures:P,get current(){return M},materials:{woodMat:r,ironMat:o,brassMat:a,ropeMat:l,earthMat:c,rockMat:d,lampGlassMat:g}}}function RM(i,e){const t=i.attributes.uv;for(let n=0;n<t.count;n++)t.setXY(n,t.getX(n)*e,t.getY(n)*e);t.needsUpdate=!0}function rr(i,e,t){const n=i.attributes.position,s=i.attributes.uv;for(let r=0;r<n.count;r++){const o=e[0]==="x"?n.getX(r):e[0]==="z"?n.getZ(r):n.getY(r),a=e[1]==="y"?n.getY(r):n.getZ(r);s.setXY(r,o*t,a*t)}s.needsUpdate=!0}const ko={landscape:{name:"landscape",width:16,top:1.45,depth:9.7,margin:.55,topPad:.55,speedScale:1},portrait:{name:"portrait",width:8.6,top:1.45,depth:14.6,margin:.5,topPad:.6,speedScale:1.3}};function zo(i,e,t,n){const s=i.width-2*i.margin,r=i.top+i.topPad,o=i.depth-i.margin-r;return n.x=(e-.5)*s,n.y=r+t*o,n}function Vd(i,e,t,n){const s=zo(i,.5,e,{x:0,y:0}),r=i.width-2*i.margin,o=Math.max(0,Math.tan(t)*s.y+n*.6);return Math.min(.5,o/r)}const Ft={SWING:"swing",EXTEND:"extend",RETURN:"return"};function CM(){return{winch:1,value:1,picks:0}}function _h(i,e,t){const n={def:i,layout:e,items:i.items.map(s=>({id:s.id,type:s.type,u:s.u,v:s.v,r:s.r,moving:s.moving?{...s.moving}:null,reward:s.reward||null,x:0,y:0,state:"active",exploded:!1})),target:i.target,levelTime:i.time,time:i.time,elapsed:0,expired:!1,claw:{state:Ft.SWING,phase:0,angle:0,len:Fe.restLength,aiming:!1,held:-1,tipX:0,tipY:Fe.restLength,prevX:0,prevY:Fe.restLength,openAmount:1},haul:0,dynamite:t.dynamite,upgrades:{...t.upgrades},streak:0,charge:0,fever:0,launches:0,hits:0,reachedTarget:!1,demo:!1,outcome:null,stars:0,events:[],acc:0};return Il(n),Ts(n),n}const Wa={x:0,y:0};function PM(i,e){return i.moving?i.u+i.moving.ampU*Math.sin(e/i.moving.period*Math.PI*2+i.moving.phase):i.u}function Il(i){for(const e of i.items)e.state==="active"&&(zo(i.layout,PM(e,i.elapsed),e.v,Wa),e.x=Wa.x,e.y=Wa.y)}function LM(i,e){return i.claw.state!==Ft.SWING?!1:(i.layout=e,Il(i),Ts(i),!0)}function Lt(i,e,t){i.events.push(Object.assign({type:e},t))}function Ts(i){const e=i.claw;e.tipX=Math.sin(e.angle)*e.len,e.tipY=Math.cos(e.angle)*e.len}function Dl(i){return!i.demo&&!i.outcome&&!i.expired&&i.claw.state===Ft.SWING}function IM(i){return Dl(i)?(i.claw.aiming=!0,!0):!1}function DM(i){return i.claw.aiming?(i.claw.aiming=!1,NM(i)):!1}function xh(i){i.claw.aiming=!1}function NM(i){if(!Dl(i))return!1;const e=i.claw;return e.aiming=!1,e.state=Ft.EXTEND,i.launches++,Lt(i,"launch",{angle:e.angle}),!0}function UM(i){const e=i.claw;if(i.outcome)return!1;if(e.state!==Ft.RETURN||e.held<0)return Lt(i,"dynamiteDenied",{}),!1;if(i.dynamite<=0)return Lt(i,"dynamiteEmpty",{}),!1;const t=i.items[e.held];return t.state="gone",e.held=-1,i.dynamite--,Nl(i),Lt(i,"dynamite",{x:e.tipX,y:e.tipY,itemType:t.type,id:t.id}),!0}function Nl(i){i.streak=0,i.charge=0}function vh(i,e){i.acc+=Math.min(e,Fe.fixedDt*Fe.maxSubsteps);let t=0;for(;i.acc>=Fe.fixedDt&&t<Fe.maxSubsteps;)FM(i,Fe.fixedDt),i.acc-=Fe.fixedDt,t++;return t===Fe.maxSubsteps&&(i.acc=0),t}function yh(i){return i.layout.speedScale*i.upgrades.winch*(i.fever>0?Fe.feverReelMult:1)}function FM(i,e){if(i.outcome)return;const t=i.claw;if(!i.expired&&!i.demo){const n=i.time;i.time=Math.max(0,i.time-e);const s=Math.ceil(n),r=Math.ceil(i.time);if(r<s&&r<Fe.countdownFrom&&r>0&&Lt(i,"tick",{sec:r}),i.time<=0&&(i.expired=!0,t.aiming=!1,Lt(i,"timeUp",{}),t.state===Ft.SWING)){Ko(i);return}}if(i.elapsed+=e,i.fever>0&&(i.fever=Math.max(0,i.fever-e),i.fever===0&&Lt(i,"feverEnd",{})),Il(i),t.prevX=t.tipX,t.prevY=t.tipY,t.state===Ft.SWING){const n=Math.PI*2/Fe.swingPeriod;t.phase+=e*n*(t.aiming?Fe.aimSlowFactor:1),t.angle=Math.sin(t.phase)*Fe.swingAmplitude,t.len=Fe.restLength,t.openAmount=Math.min(1,t.openAmount+e*4),Ts(i)}else if(t.state===Ft.EXTEND){const n=Fe.extendSpeed*yh(i);if(t.len+=n*e,Ts(i),OM(i),t.state===Ft.EXTEND){const s=i.layout;(Math.abs(t.tipX)>s.width/2-.1||t.tipY>s.depth-.05)&&(t.state=Ft.RETURN,Nl(i),Lt(i,"miss",{x:t.tipX,y:t.tipY}))}}else if(t.state===Ft.RETURN){let n;if(t.held>=0){const s=zs[i.items[t.held].type].weight;n=Fe.cargoReturnSpeed/(Fe.cargoBase+Fe.cargoSlope*s)}else n=Fe.emptyReturnSpeed;if(n*=yh(i),t.len-=n*e,t.openAmount=t.held>=0?Math.max(0,t.openAmount-e*8):Math.min(1,t.openAmount+e*4),t.len<=Fe.restLength?(t.len=Fe.restLength,Ts(i),kM(i)):Ts(i),t.held>=0){const s=i.items[t.held];s.x=t.tipX+Math.sin(t.angle)*s.r*.85,s.y=t.tipY+Math.cos(t.angle)*s.r*.85}}}function OM(i){const e=i.claw,t=e.prevX,n=e.prevY,s=e.tipX-t,r=e.tipY-n,o=s*s+r*r;let a=-1,l=2;for(let h=0;h<i.items.length;h++){const f=i.items[h];if(f.state!=="active")continue;const d=f.r+Fe.clawRadius,p=t-f.x,_=n-f.y,g=p*p+_*_-d*d;let m;if(g<=0)m=0;else{if(o<1e-12)continue;{const v=p*s+_*r,y=v*v-o*g;if(y<0||(m=(-v-Math.sqrt(y))/o,m<0||m>1))continue}}m<l&&(l=m,a=h)}if(a<0)return;const c=i.items[a],u=l;e.tipX=t+s*u,e.tipY=n+r*u,e.len=Math.hypot(e.tipX,e.tipY),i.hits++,Lt(i,"impact",{x:e.tipX,y:e.tipY,itemType:c.type,id:c.id}),c.type==="tnt"?(e.state=Ft.RETURN,BM(i,a)):(c.state="held",e.held=a,e.state=Ft.RETURN,Lt(i,"grab",{itemType:c.type,id:c.id}))}function Gd(i){return i.upgrades.value*(i.fever>0?Fe.feverValueMult:1)}function BM(i,e){const t=[e];i.items[e].exploded=!0;let n=0;for(;t.length;){const s=t.shift(),r=i.items[s];r.state="gone",Lt(i,"explode",{x:r.x,y:r.y,id:r.id,chain:n}),n++;for(let o=0;o<i.items.length;o++){const a=i.items[o];if(!(a.state!=="active"||Math.hypot(a.x-r.x,a.y-r.y)>Fe.tntRadius+a.r*.5))if(a.type==="tnt")a.exploded||(a.exploded=!0,t.push(o));else if(a.type==="rock")a.state="gone",Lt(i,"rockDestroyed",{x:a.x,y:a.y,id:a.id});else{a.state="gone";const c=Math.floor(zs[a.type].value*Fe.tntCollectFactor*Gd(i));Ul(i,c),Lt(i,"collect",{x:a.x,y:a.y,id:a.id,itemType:a.type,value:c,blast:!0,mult:1}),Wd(i,a)}}}Xd(i)}function Ul(i,e){i.haul+=e}function Wd(i,e){const t=zs[e.type];if(t.time&&!i.expired&&(i.time+=t.time,Lt(i,"timeBonus",{x:e.x,y:e.y,seconds:t.time})),e.type==="chest"&&e.reward)if(e.reward==="cash")Ul(i,Fe.chestCash),Lt(i,"chestReward",{reward:"cash",amount:Fe.chestCash,x:e.x,y:e.y});else if(e.reward==="time")i.expired||(i.time+=Fe.chestTime),Lt(i,"chestReward",{reward:"time",amount:Fe.chestTime,x:e.x,y:e.y});else{const n=i.dynamite;i.dynamite=Math.min(Fe.maxDynamite,i.dynamite+Fe.chestDynamite),Lt(i,"chestReward",{reward:"dynamite",amount:i.dynamite-n,x:e.x,y:e.y})}}function kM(i){const e=i.claw;if(e.state=Ft.SWING,e.held>=0){const t=i.items[e.held];e.held=-1,t.state="gone";const n=zs[t.type];let s,r=1;n.valuable?(i.streak++,r=Fe.streakMults[Math.min(i.streak,Fe.streakMults.length)-1],s=Math.floor(n.value*r*Gd(i)),i.fever<=0&&(i.charge++,i.charge>=Fe.feverCharge&&(i.charge=0,i.fever=Fe.feverDuration,Lt(i,"fever",{})))):(Nl(i),s=Math.floor(n.value*i.upgrades.value)),Ul(i,s),Lt(i,"collect",{x:e.tipX,y:e.tipY,id:t.id,itemType:t.type,value:s,mult:r,fever:i.fever>0,streak:i.streak}),Wd(i,t)}Lt(i,"settled",{}),Xd(i),!i.outcome&&i.expired&&Ko(i)}function Xd(i){i.outcome||i.haul>=i.target&&(i.def.continueAfterTarget?i.reachedTarget||(i.reachedTarget=!0,Lt(i,"targetReached",{})):(i.reachedTarget=!0,Ko(i)))}function Ko(i){if(i.outcome)return;const e=i.reachedTarget||i.haul>=i.target;i.claw.aiming=!1,e?(i.outcome="cleared",i.stars=HM(i)):i.outcome="failed",Lt(i,"outcome",{outcome:i.outcome,stars:i.stars})}function zM(i,e){i.outcome||(e&&(i.haul=Math.max(i.haul,i.target),i.reachedTarget=!0),Ko(i))}function qd(i){return i.launches?i.hits/i.launches:0}function HM(i){const e=i.time/i.levelTime;let t=1;return e>=Fe.star2Time&&(t=2),t===2&&e>=Fe.star3Time&&qd(i)>=Fe.star3Accuracy&&(t=3),t}function VM(i,e){for(let t=0;t<i.events.length;t++)e.push(i.events[t]);return i.events.length=0,e}const Mh=["winch","value","dynamite"];function GM(i,e){const t=i.upgrades;return e==="winch"?t.winch=Math.min(Fe.upgradeWinchCap,t.winch*Fe.upgradeWinchStep):e==="value"?t.value=Math.min(Fe.upgradeValueCap,t.value*Fe.upgradeValueStep):e==="dynamite"&&(i.dynamite=Math.min(Fe.maxDynamite,i.dynamite+Fe.upgradeDynamite)),t.picks=(t.picks||0)+1,i}function Sh(i,e){const t=i.upgrades;return e==="winch"?t.winch>=Fe.upgradeWinchCap-1e-9:e==="value"?t.value>=Fe.upgradeValueCap-1e-9:i.dynamite>=Fe.maxDynamite}function vo(){return{dynamite:Fe.startDynamite,upgrades:CM()}}const WM={smallGold:1.12,largeGold:1.08,crystal:1.3,rock:1.06,tnt:1.2,chest:1.12,relic:1.2},bh={smallGold:"gold",largeGold:"gold",crystal:"crystal",rock:"rock",tnt:"tnt",chest:"chest",relic:"relic"};function Th(i,e,t=.55,n=14,s=6){const r=new Go(i.map(u=>new R(u[0],u[1],u[2]||0))),o=new Ml(r,n,e,s,!1),a=o.attributes.position,l=new R,c=new R;for(let u=0;u<=n;u++){const h=u/n;r.getPointAt(h,l);for(let f=0;f<=s;f++){const d=u*(s+1)+f;c.fromBufferAttribute(a,d).sub(l).multiplyScalar(1-t*h).add(l),a.setXYZ(d,c.x,c.y,c.z)}}return o.computeVertexNormals(),o}function XM(i,e,t,n){const{woodMat:s,ironMat:r,brassMat:o,ropeMat:a}=e.shared,l=new yt;l.name="actors",i.add(l);const c=new It({color:5591630,roughness:.45,metalness:.9}),u=new It({color:2894634,roughness:.6,metalness:.8}),h=new It({color:7033398,roughness:.9,metalness:.05}),f=new yt;f.position.set(0,Se.deckTop+.5,-.95);const d=new yt,p=new He(new cn(.2,.2,.78,14),s);p.rotation.z=Math.PI/2;const _=new He(new cn(.235,.235,.5,16),h);_.rotation.z=Math.PI/2;const g=new cn(.29,.29,.04,16),m=new He(g,c);m.rotation.z=Math.PI/2,m.position.x=.3;const v=m.clone();v.position.x=-.3;const y=new gn(.05,.5,.05);for(const I of[.33,-.33])for(let D=0;D<2;D++){const ee=new He(y,u);ee.position.x=I,ee.rotation.x=D*Math.PI/2,d.add(ee)}d.add(p,_,m,v);const x=new yt,T=new He(new gn(.04,.32,.06),c);T.position.set(0,-.14,0);const b=new He(new cn(.03,.03,.16,8),s);b.rotation.z=Math.PI/2,b.position.set(.08,-.28,0),x.add(T,b),x.position.x=.62,d.add(x);const A=new yt,w=new He(new cn(.17,.17,.05,18),o);w.rotation.z=Math.PI/2,A.add(w);const M=new gn(.05,.06,.05);for(let I=0;I<12;I++){const D=new He(M,o),ee=I/12*Math.PI*2;D.position.set(0,Math.cos(ee)*.19,Math.sin(ee)*.19),D.rotation.x=-ee,A.add(D)}A.position.set(-.62,.12,.05),f.add(d,A),l.add(f);const S=new He(new ui(.1,.035,6,16),c);S.rotation.y=Math.PI/2,S.position.set(0,Se.pivotY+.1,.12),l.add(S);const P=new R(0,f.position.y+.22,f.position.z+.08),F=new R(0,Se.pivotY+.2,.08),U=new He(new cn(.02,.02,1,6),h);U.position.copy(P).add(F).multiplyScalar(.5),U.scale.y=P.distanceTo(F),U.quaternion.setFromUnitVectors(new R(0,1,0),F.clone().sub(P).normalize()),l.add(U);const O=new cn(.034,.034,1,6);O.translate(0,-.5,0);const V=new He(O,h);V.castShadow=!0,V.position.set(0,Se.pivotY+.1,0),l.add(V);const L=new yt,z=new He(new cn(.1,.13,.17,12),c);z.position.y=-.02;const k=new He(new ui(.115,.025,6,16),o);k.rotation.x=Math.PI/2,k.position.y=.05;const G=new He(new ui(.045,.014,6,12),u);G.position.y=.11;const $=new Xo(.022,6,4);for(let I=0;I<6;I++){const D=new He($,o),ee=I/6*Math.PI*2;D.position.set(Math.cos(ee)*.12,-.04,Math.sin(ee)*.12),L.add(D)}L.add(z,k,G);const se=Th([[0,0],[.12,-.06],[.2,-.2],[.19,-.36],[.09,-.47]],.034,.6),ye=Th([[0,0],[.1,-.06],[.16,-.18],[.15,-.3],[.07,-.39]],.028,.6),fe=[];for(let I=0;I<4;I++){const D=new yt;D.rotation.y=[0,Math.PI,Math.PI/2,-Math.PI/2][I],D.position.y=-.09;const ee=new yt,Q=new He(I<2?se:ye,c);Q.castShadow=!0,ee.add(Q),D.add(ee),L.add(D),fe.push(ee)}L.traverse(I=>{I.isMesh&&(I.castShadow=!0)}),L.scale.setScalar(1.85),l.add(L);const Ce=new yt;Ce.position.set(Se.minerX,Se.deckTop,-1),l.add(Ce);const Le=new yt;Le.position.set(Se.cartX,Se.deckTop+.12,Se.railZ),Le.rotation.y=-.38,l.add(Le);let j=null,Z={},te=null;const ae={};function ge(){j&&Ce.remove(j),te&&Le.remove(te),j=t.instance("miner"),Z=mh(j);for(const I of Object.keys(Z))ae[I]=Z[I].rotation.clone();Ce.add(j),te=t.instance("cart"),Le.add(te)}const Pe=TM(128),et=new ai({map:Pe,transparent:!0,depthWrite:!1,opacity:.8}),B=new Cn(1,1),je=new yt;l.add(je);let De=[];const Oe=new R;function Re(I){const D=t.instance(bh[I.type]),ee=I.r*WM[I.type];D.scale.setScalar(ee);const Q=I.id*2654435761>>>0,le=(Q&1023)/1023,Me=(Q>>>10&1023)/1023,oe=(Q>>>20&1023)/1023;return I.type==="smallGold"||I.type==="largeGold"||I.type==="rock"?D.rotation.set(le*6.28,Me*6.28,oe*6.28):I.type==="crystal"?D.rotation.set((le-.5)*.5,Me*6.28,(oe-.5)*.6):I.type==="chest"?D.rotation.set(.12,(le-.5)*.7,(Me-.5)*.15):I.type==="tnt"?D.rotation.set((le-.5)*.4,(Me-.5)*.8,(oe-.5)*.9):D.rotation.set(.15,le*.6,0),D.userData.rig=mh(D),D}function Ke(I){Ee();for(const D of I.items){const ee=new yt,Q=Re(D);ee.add(Q);const le=new He(B,et);le.scale.setScalar(D.r*2.7),le.position.z=Se.wallZ+.01-0,le.renderOrder=1,je.add(ee),je.add(le),De.push({id:D.id,type:D.type,group:ee,visual:Q,socket:le,wasState:"active",sparkleT:Math.random()*3,bob:Math.random()*6.28,pop:0})}q(I,0,0)}function Ee(){for(const I of De)je.remove(I.group),je.remove(I.socket);De=[]}function ze(I){for(const D of De){const ee=bh[D.type];if(ee!=="gold"&&ee!=="crystal")continue;const Q=I.items[D.id],le=Re(Q);D.group.remove(D.visual),D.group.add(le),D.visual=le}}let lt=Fe.restLength,rt=0,N={cheer:0,shake:0,lean:0},E=0;function q(I,D,ee){const Q=I.claw;V.rotation.z=Q.angle;const le=Se.pivotY;V.scale.y=Math.max(.05,Q.len-.1),L.position.set(Q.tipX,le-Q.tipY,0),L.rotation.z=Q.angle;const Me=.15+Q.openAmount*.55;for(let ce=0;ce<4;ce++)fe[ce].rotation.z=Me*(ce<2?1:.8)-.12;const oe=Q.len-lt;lt=Q.len,rt+=oe*3.2,d.rotation.x=rt,A.rotation.x=-rt*1.6,S.rotation.x=rt*2;const he=Math.abs(oe)>1e-4;for(const ce of De){const de=I.items[ce.id];if(de.state==="gone"){ce.group.visible&&(ce.group.visible=!1),ce.socket.visible=!1,ce.wasState="gone";continue}if(ce.group.visible=!0,ce.group.position.set(de.x,le-de.y,0),de.state==="active"?(ce.socket.visible=!0,ce.socket.position.x=de.x,ce.socket.position.y=le-de.y,ce.sparkleT-=D,ce.sparkleT<=0&&(ce.type==="smallGold"||ce.type==="largeGold"||ce.type==="crystal"||ce.type==="relic")&&(ce.sparkleT=1.6+Math.random()*3.5,n.sparkle(de.x+(Math.random()-.5)*de.r,le-de.y+(Math.random()-.3)*de.r,.2,ce.type==="crystal"?10483455:16773288,3,de.r*.6)),de.moving&&(ce.visual.rotation.y+=D*.4)):(ce.socket.visible=!1,ce.visual.rotation.z+=Math.sin(ee*6)*.002),ce.visual.userData.rig.ring&&(ce.visual.userData.rig.ring.rotation.y+=D*1.2),ce.pop>0){ce.pop=Math.max(0,ce.pop-D*4);const ve=1+Math.sin(ce.pop*Math.PI)*.18;ce.group.scale.setScalar(ve)}else ce.group.scale.setScalar(1)}if(j){const ce=Math.sin(ee*2.1)*.012;N.cheer=Math.max(0,N.cheer-D*1.8),N.shake=Math.max(0,N.shake-D*1.5);const de=Math.sin(N.cheer*Math.PI)*.09;j.position.y=de,j.scale.set(1-ce*.5,1+ce-de*.3,1-ce*.5);const ve=Q.state===Ft.RETURN?.06:Q.state===Ft.EXTEND?-.04:0;if(N.lean+=(ve-N.lean)*Math.min(1,D*5),j.rotation.z=-N.lean,j.rotation.y=.25+Math.sin(ee*.7)*.04,Z.head&&(Z.head.rotation.y=(ae.head?ae.head.y:0)+br.clamp(Q.tipX*.06,-.35,.35)+Math.sin(N.shake*18)*N.shake*.4,Z.head.rotation.x=(ae.head?ae.head.x:0)+br.clamp(Q.tipY*.02,0,.18)),Z.armR){const H=-(he?Math.sin(ee*9)*.35:0)-Math.sin(N.cheer*Math.PI)*1.6;Z.armR.rotation.x=(ae.armR?ae.armR.x:0)+H,Z.pickaxe&&(Z.pickaxe.rotation.x=(ae.pickaxe?ae.pickaxe.x:0)+H)}Z.armL&&(Z.armL.rotation.x=(ae.armL?ae.armL.x:0)+Math.sin(ee*2.1+1)*.04)}te&&(E=Math.max(0,E-D*3),te.position.x=Math.sin(E*12)*E*.05)}function ne(I){const D=De.find(ee=>ee.id===I);D&&(D.pop=1)}return{root:l,claw:L,minerHolder:Ce,cartHolder:Le,mountSlots:ge,buildItems:Ke,clearItems:Ee,remountItemVisuals:ze,sync:q,popItem:ne,cheer(){N.cheer=1,E=1},grumble(){N.shake=1},cartWorldPos(I){return Le.getWorldPosition(I).add(Oe.set(0,.9,0))},get itemCount(){return De.length}}}const qM=`
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
uniform float uScale;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uScale / max(0.1, -mv.z);
  vAlpha = aAlpha;
  vColor = aColor;
}`,$M=`
uniform sampler2D uTex;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 t = texture2D(uTex, gl_PointCoord);
  float a = t.a * vAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor * t.rgb, a);
}`;function Eh(i,e,t){const n=new Float32Array(i*3),s=new Float32Array(i*3),r=new Float32Array(i),o=new Float32Array(i),a=new Float32Array(i*3),l=new Float32Array(i),c=new Float32Array(i),u=new Float32Array(i),h=new Float32Array(i),f=new Float32Array(i),d=new Uint8Array(i),p=new bt;p.setAttribute("position",new ht(n,3).setUsage(Fr)),p.setAttribute("aColor",new ht(s,3).setUsage(Fr)),p.setAttribute("aSize",new ht(r,1).setUsage(Fr)),p.setAttribute("aAlpha",new ht(o,1).setUsage(Fr)),p.boundingSphere=new Un(new R(0,-4,0),40);const _=new di({vertexShader:qM,fragmentShader:$M,uniforms:{uTex:{value:t},uScale:{value:300}},transparent:!0,depthWrite:!1,blending:e?ec:Gi}),g=new cd(p,_);g.frustumCulled=!1,g.renderOrder=e?20:19;let m=0,v=i;function y(b,A,w,M,S,P,F,U,O,V,L,z=1.5,k=0,G=0){let $=-1;for(let se=0;se<v;se++){const ye=(m+se)%v;if(l[ye]<=0&&d[ye]===0){$=ye,m=(ye+1)%v;break}}$<0&&($=m,m=(m+1)%v,d[$]===1)||(n[$*3]=b,n[$*3+1]=A,n[$*3+2]=w,a[$*3]=M,a[$*3+1]=S,a[$*3+2]=P,s[$*3]=F,s[$*3+1]=U,s[$*3+2]=O,u[$]=V,r[$]=V,l[$]=L,c[$]=L,h[$]=z,f[$]=k,d[$]=G,o[$]=1)}function x(b,A){for(let w=0;w<v;w++){if(l[w]<=0){o[w]=0;continue}l[w]-=b;const M=1-l[w]/c[w],S=Math.exp(-h[w]*b);a[w*3]*=S,a[w*3+1]=a[w*3+1]*S-f[w]*b,a[w*3+2]*=S,n[w*3]+=a[w*3]*b,n[w*3+1]+=a[w*3+1]*b,n[w*3+2]+=a[w*3+2]*b,d[w]===1?(n[w*3]+=Math.sin(A*.6+w)*.002,o[w]=Math.sin(Math.min(1,M)*Math.PI)*.55,l[w]<=0&&(d[w]=1)):(o[w]=M<.1?M*10:1-(M-.1)/.9,r[w]=u[w]*(1-M*.5))}for(let w=v;w<i;w++)o[w]=0;p.attributes.position.needsUpdate=!0,p.attributes.aAlpha.needsUpdate=!0,p.attributes.aSize.needsUpdate=!0,p.attributes.aColor.needsUpdate=!0}function T(){l.fill(0),o.fill(0),d.fill(0)}return{points:g,spawn:y,update:x,clear:T,life:l,kind:d,capacity:i,setLimit(b){v=Math.max(16,Math.min(i,b));for(let A=v;A<i;A++)l[A]=0,d[A]=0},get limit(){return v},material:_}}function YM(){const i=EM(64),e=Eh(700,!0,i),t=Eh(400,!1,i),n=new yt;n.add(e.points,t.points);const s=new me;let r=new me(16767130),o=40,a={w:16,top:2.4,bottom:-8.6},l=!1;const c=Math.random,u={group:n,setScale(h){e.material.uniforms.uScale.value=h,t.material.uniforms.uScale.value=h},setBudget(h){const f=h==="low"?.4:h==="medium"?.7:1;e.setLimit(Math.floor(700*f)),t.setLimit(Math.floor(400*f)),o=Math.floor(44*f)},setReducedMotion(h){l=h},setDust(h,f){r.set(h),a=f},clear(){e.clear(),t.clear()},sparkle(h,f,d,p=16773552,_=6,g=.4){s.set(p);for(let m=0;m<_;m++)e.spawn(h+(c()-.5)*g,f+(c()-.5)*g,d+.3,(c()-.5)*.6,c()*.8,0,s.r,s.g,s.b,.09+c()*.1,.35+c()*.4,2.5,0)},burst(h,f,d,p,_=24,g=3,m=.12,v=.7){s.set(p);const y=l?.5:1;for(let x=0;x<_*y;x++){const T=c()*Math.PI*2,b=g*(.3+c()*.7);e.spawn(h,f,d+.2,Math.cos(T)*b,Math.sin(T)*b,(c()-.3)*b*.4,s.r,s.g,s.b,m*(.6+c()*.8),v*(.6+c()*.6),3,2.5)}},debris(h,f,d,p,_=14,g=2.5){s.set(p);for(let m=0;m<_;m++){const v=-Math.PI*c(),y=g*(.3+c()*.7),x=.6+c()*.5;t.spawn(h,f,d+.25,Math.cos(v)*y*.9,-Math.sin(v)*y*.4+1.2,(c()-.5)*.8,s.r*x,s.g*x,s.b*x,.07+c()*.09,.6+c()*.5,1.2,7)}},smoke(h,f,d,p=10){for(let _=0;_<p;_++){const g=.25+c()*.15;t.spawn(h+(c()-.5)*.8,f+(c()-.5)*.8,d+.3,(c()-.5)*.8,.4+c()*.8,0,g,g*.95,g*.9,.5+c()*.6,1+c()*.8,1.6,-.3)}},explosion(h,f,d){u.burst(h,f,d,16765562,46,5.5,.22,.6),u.burst(h,f,d,16738848,30,3.5,.3,.8),u.smoke(h,f,d,l?6:16),u.debris(h,f,d,6967360,16,4)},update(h,f){let d=0;for(let p=0;p<e.limit;p++)e.kind[p]===1&&e.life[p]>0&&d++;for(let p=d;p<o;p++){const _=a;e.spawn((c()-.5)*_.w,_.bottom+c()*(_.top-_.bottom),-.4+c()*1.2,(c()-.5)*.06,.03+c()*.05,0,r.r*.7,r.g*.7,r.b*.7,.035+c()*.04,5+c()*6,.05,0,1)}for(let p=0;p<e.limit;p++)e.kind[p]===1&&e.life[p]<=0&&(e.kind[p]=0);e.update(h,f),t.update(h,f)}};return u.setBudget("high"),u}const Xa={low:{dprCap:1,shadow:1024,shadows:!0,particles:"low"},medium:{dprCap:1.5,shadow:1024,shadows:!0,particles:"medium"},high:{dprCap:2,shadow:2048,shadows:!0,particles:"high"}};function jM(i){const e=i.getContext();let t="";try{const r=e.getExtension("WEBGL_debug_renderer_info");r&&(t=String(e.getParameter(r.UNMASKED_RENDERER_WEBGL)||""))}catch{}const n=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/Mac/.test(navigator.platform);return/SwiftShader|llvmpipe|Software|Mali-4|Adreno \(TM\) [3-5]/i.test(t)?"low":n?"medium":"high"}function KM(i,e){const t=new qv({canvas:i,antialias:!0,powerPreference:"high-performance",alpha:!1,stencil:!1});t.outputColorSpace=Bt,t.toneMapping=Fh,t.toneMappingExposure=1.05,t.shadowMap.enabled=!0,t.shadowMap.type=Uh;const n=new id;n.background=new me(1055248);const s=new en(34,1,.5,200),r=new Yc(t),o=r.fromScene(new yM,.04).texture;r.dispose(),n.environment=o,n.environmentIntensity=.42;let a="high",l=Xa.high;const c=AM();n.add(c.root);const u=YM();n.add(u.group);const h=XM(n,c,e,u),f=new Ym(14275232,2761750,.55);n.add(f);const d=new bd(16769712,2.6);d.position.set(-6,10,11),d.target.position.set(0,-4,0),d.castShadow=!0,d.shadow.bias=-6e-4,d.shadow.normalBias=.03,d.shadow.radius=3,n.add(d,d.target);const p=[new Ms(16757850,5,0,2),new Ms(16757850,5,0,2)];for(const te of p)n.add(te);const _=new Ms(16762460,6,16,1.4);n.add(_);const g=new Ms(16773312,.9,3.5,2);n.add(g);let m=null,v=null,y=gr.gilded,x=0,T=!1,b={top:120,bottom:110},A=1,w=1,M=1;const S={sum:0,n:0,good:0},P=new R,F=new R,U=new R;function O(te){a=Xa[te]?te:"high",l=Xa[a],d.shadow.mapSize.set(l.shadow,l.shadow),d.shadow.map&&(d.shadow.map.dispose(),d.shadow.map=null),u.setBudget(l.particles),M=1,G()}function V(te){m=te,v=c.setLayout(te);const ae=d.shadow.camera,ge=Math.max(te.width,te.depth)/2+3;ae.left=-ge,ae.right=ge,ae.top=ge,ae.bottom=-ge,ae.near=1,ae.far=50,ae.updateProjectionMatrix(),d.target.position.set(0,Se.pivotY-te.depth/2,0),d.position.set(-6,d.target.position.y+14,13);const Pe=v.lanternX;p[0].position.set(-Pe,v.beamY-.62,Se.rearZ+.35),p[1].position.set(Pe,v.beamY-.62,Se.rearZ+.35),_.position.set(0,Se.pivotY-te.depth+1.2,1.6),u.setDust(y.dust,{w:te.width,top:v.beamY-.3,bottom:v.floorY+.5}),k()}function L(te){y=gr[te]||gr.gilded,c.setRegion(y.id),n.background.set(y.bg),f.color.set(y.hemiSky),f.groundColor.set(y.hemiGround),f.intensity=y.hemiIntensity,d.color.set(y.key),d.intensity=y.keyIntensity;for(const ae of p)ae.color.set(y.lantern);_.color.set(y.accent),_.intensity=y.accentIntensity,t.toneMappingExposure=y.exposure,m&&u.setDust(y.dust,{w:m.width,top:v.beamY-.3,bottom:v.floorY+.5})}function z(te,ae){b={top:te,bottom:ae},k()}function k(){if(!m)return;const te=A/w;s.aspect=te;const ae=br.degToRad(s.fov),ge=Math.tan(ae/2),Pe=v.halfOuter+.75,et=v.beamY+.42,B=v.floorOuter-.3,je=et-B,De=Math.max(.35,(w-b.top-b.bottom)/w),Oe=je/(2*ge*De),Re=Pe/(ge*te),Ke=Math.max(Oe,Re)+.85,Ee=2*Ke*ge,ze=(et+B)/2+(b.top-b.bottom)/(2*w)*Ee,lt=br.degToRad(8);F.set(0,ze,0),P.set(0,ze+Math.sin(lt)*Ke,Math.cos(lt)*Ke),s.near=Math.max(.5,Ke-12),s.far=Ke+60,s.position.copy(P),s.lookAt(F),s.updateProjectionMatrix(),u.setScale(w*t.getPixelRatio()/(2*ge))}function G(){A=Math.max(1,i.clientWidth||window.innerWidth),w=Math.max(1,i.clientHeight||window.innerHeight);const te=Math.min(window.devicePixelRatio||1,l.dprCap)*M;t.setPixelRatio(Math.max(.5,te)),t.setSize(A,w,!1),k()}function $(te){if(S.sum+=te,S.n++,S.sum<1e3)return;const ae=S.sum/S.n;S.sum=0,S.n=0,ae>22&&M>.6?(M=Math.max(.6,M-.1),S.good=0,G()):ae<15.5?(S.good++,S.good>=4&&M<1&&(M=Math.min(1,M+.05),S.good=0,G())):S.good=0}function se(te){x=Math.min(1,x+te)}function ye(te,ae,ge){ge&&h.sync(ge,te,ae),u.update(te,ae);const Pe=1+Math.sin(ae*13.1)*.04+Math.sin(ae*7.3+1)*.05;if(p[0].intensity=9*Pe,p[1].intensity=9*(2-Pe),v)for(const B of v.lanterns)B.rotation.z=Math.sin(ae*1.3+B.position.x)*.04;g.position.set(Se.minerX+.05,Se.deckTop+1.25,-.6),x=Math.max(0,x-te*1.6);const et=(T?.15:1)*x*x;s.position.copy(P),et>1e-4&&(s.position.x+=et*.22*(Math.sin(ae*37.1)+Math.sin(ae*23.7)*.6),s.position.y+=et*.18*(Math.sin(ae*31.3+2)+Math.sin(ae*19.1)*.6)),s.lookAt(F),t.render(n,s)}function fe(te,ae,ge={x:0,y:0}){return U.set(te,Se.pivotY-ae,0).project(s),ge.x=(U.x*.5+.5)*A,ge.y=(-U.y*.5+.5)*w,ge}function Ce(te,ae={x:0,y:0}){return U.copy(te).project(s),ae.x=(U.x*.5+.5)*A,ae.y=(-U.y*.5+.5)*w,ae}function Le(te,ae){if(!m)return!1;const ge=fe(0,-1.6),Pe=fe(0,m.depth+.6);return ae>=ge.y&&ae<=Pe.y}async function j(){try{await t.compileAsync(n,s)}catch{}t.render(n,s)}function Z(){const te=t.info;return{calls:te.render.calls,triangles:te.render.triangles,points:te.render.points,geometries:te.memory.geometries,textures:te.memory.textures,programs:te.programs?te.programs.length:0,dpr:t.getPixelRatio(),dprScale:M,quality:a}}return G(),{renderer:t,scene:n,camera:s,mine:c,actors:h,particles:u,setLayout:V,setRegion:L,setQuality:O,setReserve:z,resize:G,render:ye,adapt:$,addTrauma:se,project:fe,projectWorld:Ce,screenInMine:Le,warmup:j,info:Z,setReducedMotion(te){T=te,u.setReducedMotion(te)},get layout(){return m},get qualityName(){return a},get theme(){return y}}}function ZM(i,e,t,n){const s={key:null,pointer:null,button:null,pad:!1};let r=!1,o="keyboard";const a=(d,...p)=>{const _=n[d];_&&_(...p)};function l(){return s.key||s.pointer!==null||s.button!==null||s.pad}function c(){l()||a("aimRelease")}window.addEventListener("keydown",d=>{if(d.target&&(d.target.tagName==="INPUT"||d.target.tagName==="SELECT"))return;o="keyboard",a("gesture");const p=d.key;if(p==="F3"||p==="`"){d.preventDefault(),a("debug");return}if(p==="p"||p==="P"||p==="Escape"){(!n.modalOpen||!n.modalOpen())&&(d.preventDefault(),a("pause"));return}if(p==="m"||p==="M"){a("mute");return}if(r&&!(n.modalOpen&&n.modalOpen()))if(p===" "||p==="ArrowDown"||p==="Spacebar"){if(d.preventDefault(),d.repeat||s.key)return;s.key=!0,s.pointer===null&&s.button===null&&!s.pad&&a("aimStart")}else(p==="b"||p==="B"||p==="ArrowUp")&&(d.preventDefault(),d.repeat||a("dynamite"))}),window.addEventListener("keyup",d=>{const p=d.key;if(p===" "||p==="ArrowDown"||p==="Spacebar"){if(r&&d.preventDefault(),!s.key)return;s.key=!1,c()}});function u(d,p){d.addEventListener("pointerdown",g=>{if(a("gesture"),o=g.pointerType==="touch"?"touch":"mouse",!r||n.modalOpen&&n.modalOpen()||g.pointerType==="mouse"&&g.button!==0||s[p]!==null)return;g.preventDefault(),s[p]=g.pointerId;try{d.setPointerCapture(g.pointerId)}catch{}d.classList.add("pressed"),s.key||s.pad||(p==="pointer"?s.button!==null:s.pointer!==null)||a("aimStart")});const _=(g,m)=>{if(s[p]===g.pointerId){s[p]=null,d.classList.remove("pressed");try{d.hasPointerCapture(g.pointerId)&&d.releasePointerCapture(g.pointerId)}catch{}m?l()||a("aimCancel"):c()}};d.addEventListener("pointerup",g=>_(g,!1)),d.addEventListener("pointercancel",g=>_(g,!0)),d.addEventListener("lostpointercapture",g=>{s[p]===g.pointerId&&_(g,!0)}),d.addEventListener("contextmenu",g=>g.preventDefault())}u(i,"pointer"),u(e,"button"),e.addEventListener("keydown",d=>{d.key==="Enter"&&(d.preventDefault(),r&&(a("aimStart"),a("aimRelease")))}),t.addEventListener("click",()=>{a("gesture"),r&&a("dynamite")});const h={};function f(){const d=navigator.getGamepads?navigator.getGamepads():[];for(const p of d){if(!p||!p.connected)continue;const _=p.buttons[0]&&p.buttons[0].pressed,g=p.buttons[1]&&p.buttons[1].pressed||p.buttons[2]&&p.buttons[2].pressed,m=p.buttons[9]&&p.buttons[9].pressed;(_||g||m)&&(o="gamepad"),r&&_&&!h.a&&(s.pad=!0,s.pointer===null&&s.button===null&&!s.key&&a("aimStart")),!_&&h.a&&s.pad&&(s.pad=!1,c()),r&&g&&!h.b&&a("dynamite"),m&&!h.st&&a("pause"),h.a=_,h.b=g,h.st=m;break}}return{pollPad:f,setEnabled(d){r=d,d||(s.key=null,s.pad=!1,s.button=null,s.pointer=null,e.classList.remove("pressed"))},cancelAll(){const d=l();s.key=null,s.pointer=null,s.button=null,s.pad=!1,e.classList.remove("pressed"),d&&a("aimCancel")},get lastDevice(){return o},get holding(){return!!l()}}}const JM={balanced:{smallGold:6,largeGold:3,crystal:2,rock:5,tnt:2,chest:2,relic:0},heavyGold:{smallGold:4,largeGold:6,crystal:1,rock:5,tnt:2,chest:2,relic:0},explosive:{smallGold:5,largeGold:3,crystal:2,rock:4,tnt:5,chest:1,relic:0},crystals:{smallGold:5,largeGold:2,crystal:6,rock:4,tnt:2,chest:1,relic:0},chests:{smallGold:5,largeGold:3,crystal:2,rock:4,tnt:2,chest:4,relic:0},relic:{smallGold:5,largeGold:3,crystal:2,rock:5,tnt:2,chest:2,relic:1}},QM={smallGold:.18,rock:.38,tnt:.5,chest:.55,crystal:.62,largeGold:.72,relic:.97},qa=4,yo=5,eS=.14,$d=63*Math.PI/180;function wh(i){const e=Math.floor(i/6),t=Es[i%6],n=Cl(`golden-miner/campaign/${i}`);return Fl({mode:"campaign",index:i,region:e,emphasis:t,seed:n,target:rf(i),time:of(i),features:{tnt:i>=2,chest:i>=4,movingCrystals:i>=6},mirror:(n>>>5&1)===1&&i%3!==0,valueFloor:1.5,continueAfterTarget:!1})}function $a(i=new Date){return i.toISOString().slice(0,10)}function tS(i=Date.now()){const e=new Date(i);return Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()+1)-i}function nS(i){const e=Cl(`golden-miner/daily/${i}`);return Fl({mode:"daily",index:0,dateKey:i,region:e%4,emphasis:Es[(e>>>3)%6],seed:e,target:Ro.target,time:Ro.time,features:{tnt:!0,chest:!0,movingCrystals:!0},mirror:(e>>>7&1)===1,valueFloor:1.6,continueAfterTarget:!0})}function Ah(i,e){const t=Cl(`golden-miner/endless/${e}/${i}`);return Fl({mode:"endless",index:i,runSeed:e,region:(i+e%4)%4,emphasis:Es[(i+(t>>>4))%6],seed:t,target:af(i),time:Mo.time,features:{tnt:!0,chest:!0,movingCrystals:!0},mirror:(t>>>9&1)===1,valueFloor:1.6,continueAfterTarget:!1})}function Fl(i){return i.regionId=Za[i.region],i.items=rS(i),i}function iS(i,e){let t=0;for(const n of i)t+=zs[n].value;for(const n of e)n==="cash"&&(t+=Fe.chestCash);return t}function sS(i,e){const t={...JM[i.emphasis]};i.features.tnt||(t.smallGold+=t.tnt,t.tnt=0),i.features.chest||(t.smallGold+=t.chest,t.chest=0);const n=[];for(const a of Object.keys(t))for(let l=0;l<t[a];l++)n.push(a);const s=i.target*i.valueFloor*(i.emphasis==="explosive"?1.3:1);let r=0;const o=a=>n.filter(l=>l===a).length;for(;iS(n,[])<s&&r++<60;){let a=-1,l="largeGold";if(o("rock")>3?a=n.indexOf("rock"):o("smallGold")>0?(a=n.indexOf("smallGold"),l=e()<.5?"largeGold":"crystal"):o("tnt")>3?a=n.indexOf("tnt"):o("rock")>2?a=n.indexOf("rock"):o("relic")<2&&o("largeGold")>0&&(a=n.indexOf("largeGold"),l="relic"),a<0)break;n[a]=l}return n}function rS(i){for(let e=0;e<30;e++){const t=jo(i.seed+e*7919),n=oS(i,t);if(n)return n}throw new Error(`board generation failed for seed ${i.seed}`)}function oS(i,e){const n=sS(i,e).map(u=>({t:u,s:QM[u]+e.range(-.22,.22)}));n.sort((u,h)=>u.s-h.s);const s=[];for(let u=0;u<qa;u++)s.push(e.shuffle(n.slice(u*yo,(u+1)*yo).map(h=>h.t)));const r=[],o=[ko.landscape,ko.portrait];let a=0;for(let u=0;u<qa;u++)for(let h=0;h<yo;h++){const f=s[u][h],d=zs[f],p=f==="rock"?e.range(.5,.66):d.radius;let _=!1;for(let g=0;g<60&&!_;g++){const m=g<30?1:1.6,v=Math.min(.99,Math.max(.02,(u+.5+e.range(-.42,.42)*m)/qa));let y=.5;for(const M of o)y=Math.min(y,Vd(M,v,$d,p));const x=.5-y,T=.5+y,b=T-x;let A=x+b*((h+.5+e.range(-.45,.45)*m)/yo);A=Math.min(T,Math.max(x,A));const w={id:a,type:f,u:A,v,r:p,moving:null};Yd(w,r,o)&&(r.push(w),_=!0)}if(!_)return null;a++}const l=["cash","time","dynamite"];let c=0;for(const u of r)u.type==="chest"&&(u.reward=l[(Math.floor(e()*3)+c)%3],c++);if(i.features.movingCrystals){const u=i.emphasis==="crystals"?3:1,h=e.shuffle(r.filter(d=>d.type==="crystal"));let f=0;for(const d of h){if(f>=u)break;const p={ampU:e.range(.05,.075),period:e.range(5.5,7.5),phase:e.range(0,Math.PI*2)};d.moving=p;const _=r.filter(g=>g!==d);aS(d,_,o)?f++:d.moving=null}}if(i.mirror)for(const u of r)u.u=1-u.u;return r}const vs={x:0,y:0},Ya={x:0,y:0};function Rh(i,e,t=4){return i.moving?i.u+i.moving.ampU*Math.sin(e/t*Math.PI*2):i.u}function Yd(i,e,t){for(const n of t){if(n.width-2*n.margin,zo(n,i.u,i.v,vs),Math.abs(vs.x)+i.r>n.width/2-.15||vs.y+i.r>n.depth-.1||vs.y-i.r<n.top+.15)return!1;for(const s of e){zo(n,s.u,s.v,Ya);const r=vs.x-Ya.x,o=vs.y-Ya.y,a=i.r+s.r+eS;if(r*r+o*o<a*a)return!1}}return!0}function aS(i,e,t){for(let n=0;n<8;n++){const s=Rh(i,n,8),r={u:Math.min(.995,Math.max(.005,s)),v:i.v,r:i.r};for(const o of e)for(let a=0;a<4;a++){const l=Rh(o,a,4);if(!Yd(r,[{u:l,v:o.v,r:o.r}],t))return!1}for(const o of t){const a=Vd(o,i.v,$d+.08,i.r);if(Math.abs(r.u-.5)>a)return!1}}return!0}const cS=new R,ja=i=>({dynamite:i.dynamite,upgrades:{...i.upgrades}}),Ch={smallGold:{color:16765770,sound:"gold"},largeGold:{color:16761386,sound:"gold"},crystal:{color:8385535,sound:"crystal"},rock:{color:10132106,sound:"rock"},chest:{color:16764794,sound:"chest"},relic:{color:16769162,sound:"gold"}};function lS({view:i,ui:e,audio:t,storage:n,slots:s,input:r}){let o="loading",a=null,l=null,c=null;const u={campaignEquip:vo(),endless:null,lastCampaign:0};let h=null,f=0,d=null,p=0,_={};const g=[],m={x:0,y:0},v=n.data,y=I=>Y("region_"+Za[I]),x=I=>Y("emph_"+I);function T(){const I=window.innerWidth,D=window.innerHeight;return I/D<.8?ko.portrait:ko.landscape}function b(){return a||l}function A(I,D,ee,Q){p-(_[I]||-9)<1.2||(_[I]=p,e.toast(D,ee,Q))}function w(){i.setReserve(e.reserve().top,e.reserve().bottom)}function M(){o="title",a=null,c=null,r.setEnabled(!1),e.showPlay(!1),e.closeModal(!0),e.clearToasts();const I=T();l=_h(wh(0),I,vo()),l.demo=!0,i.setRegion("gilded"),document.documentElement.style.setProperty("--accent",i.theme.ui),i.setLayout(I),i.actors.buildItems(l),i.particles.clear(),w(),S()}function S(){const I=e.el.title,D=v.stars.every(ee=>ee===0);I.hidden=!1,I.innerHTML=`
      <h1 class="brand">${e.esc(Y("title"))}</h1>
      <p class="tagline">${e.esc(Y("tagline"))}</p>
      <div class="btn-col">
        <button class="btn primary" type="button" id="t-play" data-autofocus>${e.esc(Y(D?"play":"continue"))}</button>
        <div class="btn-row">
          <button class="btn" type="button" id="t-daily">${e.esc(Y("daily"))}</button>
          <button class="btn" type="button" id="t-endless">${e.esc(Y("endless"))}</button>
        </div>
      </div>
      <div class="mini-row">
        ${e.langSelect("t-lang")}
        <button class="btn" type="button" id="t-help">${e.esc(Y("help"))}</button>
      </div>`,I.querySelector("#t-play").onclick=()=>{t.play("ui"),D?U(0):Pe()},I.querySelector("#t-daily").onclick=()=>{t.play("ui"),O()},I.querySelector("#t-endless").onclick=()=>{t.play("ui"),V(!1)},I.querySelector("#t-help").onclick=()=>{t.play("ui"),ge(()=>{e.closeModal()})},I.querySelector("#t-lang").onchange=ee=>ae(ee.target.value)}function P(I,D,ee){e.closeModal(!0),e.el.title.hidden=!0,e.clearToasts(),d=null;const Q=T();h=null,c={kind:D,def:I,startEquip:ja(ee),equip:ee},a=_h(I,Q,ja(ee)),l=null,i.setRegion(I.regionId),i.setLayout(Q),i.actors.buildItems(a),i.particles.clear(),document.documentElement.style.setProperty("--accent",i.theme.ui),e.resetHud(),e.showPlay(!0),F(),w(),o="playing",r.setEnabled(!0),f=0;const le=D==="daily"?`${Y("dailyTitle")} · ${x(I.emphasis)}`:Y("levelIntro",{region:y(I.region),emph:x(I.emphasis)});e.toast(le,"good",2200)}function F(){if(!c)return;const I=c.def;c.kind==="campaign"?e.setLevelLabel(`${Y("level")} ${I.index+1}`,y(I.region)):c.kind==="daily"?e.setLevelLabel(Y("daily"),I.dateKey):e.setLevelLabel(`${Y("stage")} ${I.index+1}`,y(I.region))}function U(I){u.lastCampaign=I,P(wh(I),"campaign",u.campaignEquip)}function O(){P(nS($a()),"daily",vo())}function V(I){const D=Math.random()*4294967295>>>0;u.endless={n:0,seed:D,equip:I?ja(u.campaignEquip):vo()},P(Ah(0,D),"endless",u.endless.equip)}function L(){c&&(c.equip.dynamite=c.startEquip.dynamite,Object.assign(c.equip.upgrades,c.startEquip.upgrades),P(c.def,c.kind,c.equip))}const z={gesture(){t.unlock()},aimStart(){o==="playing"&&a&&IM(a)},aimRelease(){o==="playing"&&a&&DM(a)},aimCancel(){a&&xh(a)},dynamite(){o==="playing"&&a&&UM(a)},pause(){o==="playing"?G():o==="paused"&&$()},mute(){k()},modalOpen:()=>e.modalOpen};function k(){t.unlock(),t.setMuted(!t.muted),v.sound.muted=t.muted,n.save(),e.setSoundIcon(t.muted)}function G(){o==="playing"&&(o="paused",r.cancelAll(),a&&xh(a),t.suspend(),se())}function $(){o==="paused"&&(e.closeModal(),d=null,t.resume(),o="playing")}function se(){d=se;const I=e.openModal(`
      <h2>${e.esc(Y("paused"))}</h2>
      <p class="sub">${e.esc(c?ye(c):"")}</p>
      <div class="btn-col">
        <button class="btn primary" type="button" id="p-resume" data-autofocus>${e.esc(Y("resume"))}</button>
        <div class="btn-row">
          <button class="btn" type="button" id="p-retry">${e.esc(Y("retry"))}</button>
          <button class="btn" type="button" id="p-map">${e.esc(Y("map"))}</button>
          <button class="btn" type="button" id="p-help">${e.esc(Y("help"))}</button>
        </div>
      </div>
      ${fe()}`,{onClose:$,label:Y("paused")});I.querySelector("#p-resume").onclick=$,I.querySelector("#p-retry").onclick=()=>{t.resume(),L()},I.querySelector("#p-map").onclick=()=>{t.resume(),Pe()},I.querySelector("#p-help").onclick=()=>ge(se),Ce(I)}function ye(I){return I.kind==="campaign"?`${Y("level")} ${I.def.index+1} · ${y(I.def.region)} · ${x(I.def.emphasis)}`:I.kind==="daily"?`${Y("dailyTitle")} · ${I.def.dateKey}`:`${Y("stage")} ${I.def.index+1} · ${y(I.def.region)}`}function fe(){const I=Le(),D=v.quality;return`
      <div class="settings">
        <label class="setting"><span>${e.esc(Y("language"))}</span>${e.langSelect("s-lang")}</label>
        <div class="setting"><span>${e.esc(Y("sound"))}</span><button class="btn toggle" type="button" id="s-sound" aria-pressed="${!t.muted}">${e.esc(t.muted?Y("off"):Y("on"))}</button></div>
        <label class="setting"><span>${e.esc(Y("volume"))}</span><input type="range" id="s-vol" min="0" max="100" value="${Math.round(t.volume*100)}" /></label>
        <div class="setting"><span>${e.esc(Y("reducedMotion"))}</span><button class="btn toggle" type="button" id="s-rm" aria-pressed="${I}">${e.esc(Y(I?"on":"off"))}</button></div>
        <label class="setting"><span>${e.esc(Y("quality"))}</span>
          <select class="sel" id="s-q">${["auto","low","medium","high"].map(ee=>`<option value="${ee}" ${ee===D?"selected":""}>${e.esc(Y("q_"+ee))}</option>`).join("")}</select></label>
      </div>`}function Ce(I){I.querySelector("#s-lang").onchange=D=>ae(D.target.value),I.querySelector("#s-sound").onclick=D=>{k(),D.currentTarget.setAttribute("aria-pressed",String(!t.muted)),D.currentTarget.textContent=t.muted?Y("off"):Y("on")},I.querySelector("#s-vol").oninput=D=>{t.setVolume(D.target.value/100),v.sound.volume=t.volume,n.save()},I.querySelector("#s-rm").onclick=D=>{const ee=!Le();v.reducedMotion=ee,n.save(),j(),D.currentTarget.setAttribute("aria-pressed",String(ee)),D.currentTarget.textContent=Y(ee?"on":"off")},I.querySelector("#s-q").onchange=D=>{v.quality=D.target.value,n.save(),Z()}}function Le(){return v.reducedMotion!==null?v.reducedMotion:window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function j(){const I=Le();e.setReduced(I),i.setReducedMotion(I)}function Z(){i.setQuality(v.quality==="auto"?te:v.quality)}let te="high";function ae(I){Ih(I),v.lang=I,n.save(),e.localizeStatic(),e.setSoundIcon(t.muted),e.setModelSwitch(s.mode,s.status,s.standIn),F(),(o==="title"&&!e.modalOpen||o==="title")&&S(),d&&d()}function ge(I){const D=d;d=()=>ge(I);const ee=e.openModal(`
      <h2>${e.esc(Y("help"))}</h2>
      <ul class="help-list">${Y("helpBody").map(Q=>`<li>${e.esc(Q)}</li>`).join("")}</ul>
      <div class="btn-row"><button class="btn primary" type="button" id="h-close" data-autofocus>${e.esc(Y("close"))}</button></div>`,{onClose:()=>{d=D,I()},label:Y("help")});ee.querySelector("#h-close").onclick=()=>{d=D,I()}}function Pe(){(o==="playing"||o==="paused"||o==="result")&&M(),d=Pe;const I=$a(),D=n.dailyBest(I),ee=tS(),Q=Math.floor(ee/36e5),le=Math.floor(ee%36e5/6e4),Me=Za.map((de,ve)=>{const qe=v.stars.slice(ve*6,ve*6+6).reduce((_e,we)=>_e+we,0),H=[];for(let _e=0;_e<6;_e++){const we=ve*6+_e,ue=we<v.unlocked,re=v.stars[we],Ie=ue&&re===0;H.push(`<button type="button" class="lvl ${Ie?"next":""}" data-l="${we}" ${ue?"":"disabled"}
          aria-label="${e.esc(`${Y("level")} ${we+1} · ${x(Es[_e])}${ue?` · ${re}/3 ${Y("stars")}`:" · "+Y("locked")}`)}"
          title="${e.esc(x(Es[_e]))}">
          <span>${we+1}</span>${ue?`<span class="ls">${[0,1,2].map(Ge=>`<i class="${Ge<re?"on":""}"></i>`).join("")}</span>`:'<span class="lock" aria-hidden="true"></span>'}
        </button>`)}const pe={gilded:["#ffc65c","#ffd98a"],glacier:["#5fe0ff","#9feeff"],ember:["#ff6a1e","#ffab70"],amethyst:["#b07cff","#d6b6ff"]}[de];return`<section class="region" style="--rc:${pe[0]};--rcl:${pe[1]}">
        <h3>${e.esc(y(ve))}<small>${qe}/18 ★</small></h3>
        <div class="levels">${H.join("")}</div></section>`}).join(""),oe=v.daily.filter(de=>de.date!==I).slice(0,13),he=e.openModal(`
      <div class="map-head"><h2>${e.esc(Y("mapTitle"))}</h2>
        <button class="btn" type="button" id="map-close">${e.esc(Y("close"))}</button></div>
      <p class="map-hint">${e.esc(Y("mapHint"))}</p>
      <div class="map-grid">${Me}</div>
      <div class="camp">
        <div class="camp-card">
          <h3>${e.esc(Y("dailyTitle"))}</h3>
          <p>${e.esc(Y("dailyInfo",{date:I,target:pn(Ro.target),time:Ro.time}))}</p>
          <p class="best">${e.esc(D>0?Y("dailyBest",{best:pn(D)}):Y("dailyNone"))}</p>
          <p>${e.esc(Y("dailyReset",{time:`${Q}h ${String(le).padStart(2,"0")}m`}))} · ${e.esc(Y("dailyLocal"))}</p>
          ${oe.length?`<p>${e.esc(Y("dailyHistory"))}</p><ul class="hist">${oe.map(de=>`<li>${de.date.slice(5)} · ${pn(de.best)}</li>`).join("")}</ul>`:""}
          <button class="btn primary" type="button" id="map-daily">${e.esc(Y("play_btn"))}</button>
        </div>
        <div class="camp-card">
          <h3>${e.esc(Y("endless"))}</h3>
          <p>${e.esc(Y("endlessInfo"))}</p>
          <p>${e.esc(Y("endlessFresh"))}</p>
          <p class="best">${e.esc(Y("bestHaul"))}: ${pn(v.bestHaul)}</p>
          <button class="btn" type="button" id="map-endless">${e.esc(Y("play_btn"))}</button>
        </div>
      </div>`,{wide:!0,onClose:B,label:Y("mapTitle")});he.querySelectorAll(".lvl").forEach(de=>{de.onclick=()=>{t.play("ui"),U(+de.dataset.l)}});const ce=he.querySelector(".lvl.next")||he.querySelector(".lvl:not([disabled])");ce&&ce.setAttribute("data-autofocus",""),he.querySelector("#map-close").onclick=B,he.querySelector("#map-daily").onclick=()=>{t.play("ui"),O()},he.querySelector("#map-endless").onclick=()=>{t.play("ui"),V(!1)},et=I}let et=null;function B(){d=null,e.closeModal(),o==="title"&&S()}function je(){o="result",r.setEnabled(!1),r.cancelAll();const I=a,D=c.kind;D==="campaign"?I.outcome==="cleared"?(n.recordCampaignClear(c.def.index,I.stars,I.haul),c.equip.dynamite=I.dynamite):n.recordHaul(0):D==="daily"?c.newBest=n.recordDaily(c.def.dateKey,I.haul):(n.recordHaul(I.haul),I.outcome==="cleared"&&(c.equip.dynamite=I.dynamite)),t.play(I.outcome==="cleared"?"win":"lose"),I.outcome==="cleared"&&i.actors.cheer(),Re()}function De(I){const D=Math.max(0,Math.ceil(I.time));return`<div class="stats">
      <div class="stat"><b>${pn(I.haul)}</b><span>${e.esc(Y("haul"))} / ${pn(I.target)}</span></div>
      <div class="stat"><b>${D}s</b><span>${e.esc(Y("timeLeft"))}</span></div>
      <div class="stat"><b>${Math.round(qd(I)*100)}%</b><span>${e.esc(Y("accuracy"))}</span></div>
    </div>`}function Oe(I){return`<div class="stars" aria-label="${I}/3 ${e.esc(Y("stars"))}">${[0,1,2].map(D=>`<span class="star ${D<I?"on":""}"></span>`).join("")}</div>`}function Re(){d=Re;const I=a,D=c.kind,ee=c.def;let Q="",le=null;if(D==="campaign"&&I.outcome==="cleared")if(ee.index===ri-1){const he=v.stars.reduce((ce,de)=>ce+de,0);Q=`<h2>${e.esc(Y("victoryTitle"))}</h2>${Oe(I.stars)}
          <p class="sub">${e.esc(Y("victoryBody",{stars:he}))}</p>${De(I)}
          <div class="btn-row"><button class="btn primary" type="button" id="r-endless" data-autofocus>${e.esc(Y("keepUpgrades"))}</button>
          <button class="btn" type="button" id="r-map">${e.esc(Y("toMap"))}</button></div>`,le=ce=>{ce.querySelector("#r-endless").onclick=()=>V(!0),ce.querySelector("#r-map").onclick=Pe}}else Q=`<h2>${e.esc(Y("clearedTitle"))}</h2>${Oe(I.stars)}
          <p class="sub">${e.esc(ye(c))}</p>${De(I)}
          <div class="btn-row"><button class="btn primary" type="button" id="r-next" data-autofocus>${e.esc(Y("continue"))}</button>
          <button class="btn" type="button" id="r-retry">${e.esc(Y("retry"))}</button>
          <button class="btn" type="button" id="r-map">${e.esc(Y("map"))}</button></div>`,le=he=>{he.querySelector("#r-next").onclick=()=>Ke(ee.index+1),he.querySelector("#r-retry").onclick=L,he.querySelector("#r-map").onclick=Pe};else if(D==="daily"){const oe=n.dailyBest(ee.dateKey);Q=`<h2>${e.esc(Y("dailyDoneTitle"))}</h2>
        <p class="sub">${e.esc(I.outcome==="cleared"?Y("dailyCleared"):Y("dailyMissed"))} · ${e.esc(ee.dateKey)} (UTC)</p>
        ${De(I)}
        <p class="sub">${e.esc(c.newBest?Y("newBest"):Y("dailyBest",{best:pn(oe)}))}</p>
        <div class="btn-row"><button class="btn primary" type="button" id="r-retry" data-autofocus>${e.esc(Y("retry"))}</button>
        <button class="btn" type="button" id="r-map">${e.esc(Y("map"))}</button></div>
        <p class="note">${e.esc(Y("dailyLocal"))}</p>`,le=he=>{he.querySelector("#r-retry").onclick=O,he.querySelector("#r-map").onclick=Pe}}else if(D==="endless"&&I.outcome==="cleared")Q=`<h2>${e.esc(Y("endlessClearedTitle",{n:ee.index+1}))}</h2>${Oe(I.stars)}
        <p class="sub">${e.esc(y(ee.region))} · ${e.esc(x(ee.emphasis))}</p>${De(I)}
        <div class="btn-row"><button class="btn primary" type="button" id="r-next" data-autofocus>${e.esc(Y("next"))}</button>
        <button class="btn" type="button" id="r-map">${e.esc(Y("map"))}</button></div>`,le=oe=>{oe.querySelector("#r-next").onclick=()=>{u.endless.n++,P(Ah(u.endless.n,u.endless.seed),"endless",u.endless.equip)},oe.querySelector("#r-map").onclick=Pe};else{const oe=pn(Math.max(0,I.target-I.haul)),he=Y(D==="endless"?"endlessOverTitle":"failedTitle"),ce=D==="endless"?Y("endlessOverBody",{n:ee.index+1})+" "+Y("failedBody",{missing:oe}):Y("failedBody",{missing:oe});Q=`<h2>${e.esc(he)}</h2><p class="sub">${e.esc(ce)}</p>${De(I)}
        <div class="btn-row"><button class="btn primary" type="button" id="r-retry" data-autofocus>${e.esc(Y("retry"))}</button>
        <button class="btn" type="button" id="r-map">${e.esc(Y("map"))}</button></div>`,le=de=>{de.querySelector("#r-retry").onclick=L,de.querySelector("#r-map").onclick=Pe}}const Me=e.openModal(Q,{label:Y("clearedTitle")});le(Me)}function Ke(I){const D=u.campaignEquip;if(!Mh.filter(ce=>!Sh(D,ce)).length){U(I);return}d=()=>Ke(I);const Q={winch:`×${D.upgrades.winch.toFixed(2)}`,value:`×${D.upgrades.value.toFixed(2)}`,dynamite:String(D.dynamite)},le={winch:"⚙️",value:"💰",dynamite:"🧨"},Me=Mh.map(ce=>{const de=Sh(D,ce);return`<button type="button" class="upg-card" data-k="${ce}" ${de?"disabled":""}>
        <span class="upg-ico" aria-hidden="true">${le[ce]}</span>
        <div><b>${e.esc(Y("upg_"+ce))}</b><span>${e.esc(Y(de?"upg_max":"upg_"+ce+"_d"))}</span>
        <em>${e.esc(Y("upg_now",{v:Q[ce]}))}</em></div></button>`}).join(""),oe=e.openModal(`<h2>${e.esc(Y("chooseUpgrade"))}</h2>
      <p class="sub">${e.esc(Y("level"))} ${I+1} · ${e.esc(y(Math.floor(I/6)))} · ${e.esc(x(Es[I%6]))}</p>
      <div class="upg">${Me}</div>`,{label:Y("chooseUpgrade")}),he=oe.querySelector(".upg-card:not([disabled])");he&&he.setAttribute("data-autofocus",""),oe.querySelectorAll(".upg-card").forEach(ce=>{ce.onclick=()=>{GM(D,ce.dataset.k),t.play("upgrade"),U(I)}})}function Ee(){g.length=0,VM(a,g);let I=0;for(const D of g)switch(D.type){case"launch":t.play("launch");break;case"impact":{t.play("impact",D.itemType),i.particles.debris(D.x,Se.pivotY-D.y,0,i.theme.strata.light,D.itemType==="rock"?14:8,2.2),i.addTrauma(D.itemType==="rock"||D.itemType==="largeGold"||D.itemType==="relic"?.22:.1),D.itemType!=="tnt"&&i.actors.popItem(D.id);break}case"miss":{t.play("miss"),i.particles.debris(D.x,Se.pivotY-D.y,0,i.theme.strata.light,8,1.6);break}case"collect":{const ee=Ch[D.itemType]||Ch.smallGold;if(i.project(D.x,D.y,m),D.blast)e.floater(m.x,m.y,`+${pn(D.value)}`,"low"),i.particles.sparkle(D.x,Se.pivotY-D.y,0,ee.color,8,.6);else{const Q=D.mult>1||D.fever?`<small>×${(D.mult*(D.fever?2:1)).toFixed(1)}</small>`:"";e.floater(m.x,m.y-24,`+${pn(D.value)}${Q}`,D.itemType==="rock"?"low":D.fever?"fever":""),t.play(ee.sound,D.mult),i.particles.burst(D.x,Se.pivotY-D.y,.2,ee.color,D.itemType==="rock"?6:18,2.2,.1,.6),D.itemType==="rock"?i.actors.grumble():i.actors.cheer();const le=i.actors.cartWorldPos(cS);i.particles.sparkle(le.x,le.y,le.z,16773280,D.itemType==="rock"?2:10,.8)}break}case"timeBonus":{i.project(D.x,D.y,m),e.floater(m.x+30,m.y-6,Y("toastCrystal",{s:D.seconds}),"time");break}case"chestReward":{D.reward==="cash"?e.toast(Y("toastChestCash",{v:pn(D.amount)}),"good"):D.reward==="time"?e.toast(Y("toastChestTime",{s:D.amount}),"good"):e.toast(D.amount>0?Y("toastChestDyn",{n:D.amount}):Y("toastChestDynFull"),"good");break}case"explode":{I++,t.play("explode",D.chain),i.particles.explosion(D.x,Se.pivotY-D.y,0),i.addTrauma(.55);break}case"rockDestroyed":i.particles.debris(D.x,Se.pivotY-D.y,0,9079424,16,3.5);break;case"dynamite":{t.play("dynamite"),i.particles.explosion(D.x,Se.pivotY-D.y,0),i.addTrauma(.4);break}case"dynamiteDenied":A("nocargo",Y("toastNoCargo"),"bad",1200);break;case"dynamiteEmpty":A("nodyn",Y("toastNoDynamite"),"bad",1200);break;case"tick":t.play("tick",D.sec);break;case"timeUp":a.claw.state!==Ft.SWING&&e.toast(Y("toastTimeUp"),"bad",1600);break;case"fever":{t.play("fever"),e.toast(Y("toastFever"),"fever",2e3),i.particles.burst(a.claw.tipX,Se.pivotY-a.claw.tipY,.3,16756794,40,4,.14,.9);break}case"feverEnd":e.toast(Y("toastFeverEnd"),"",1200);break;case"targetReached":e.toast(Y("toastTarget"),"good",2200);break;case"settled":rt();break;case"outcome":f=.9;break}I>=2&&e.toast(Y("toastChain",{n:I}),"good",1500)}function ze(){i.resize(),w();const I=T(),D=b();if(D){if(D.layout===I){h=null;return}D.claw.state===Ft.SWING?lt(I):(h||A("layout",Y("toastLayout"),"",1600),h=I)}}function lt(I){const D=b();D&&LM(D,I)&&(i.setLayout(I),h=null,i.actors.sync(D,0,p),w())}function rt(){h&&b()&&b().claw.state===Ft.SWING&&lt(h)}function N(I){if(I==="tripo"){if(s.status==="failed"){e.toast(Y("model_failed",{err:s.error}),"bad",4200);return}if(s.status!=="ready"){e.toast(Y("model_loading"),"",1400);return}}s.mode!==I&&(s.setMode(I),E(),e.toast(Y(I==="tripo"?"model_ready":"model_classic"),"",1400))}function E(){i.actors.mountSlots();const I=b();I&&i.actors.remountItemVisuals(I),e.setModelSwitch(s.mode,s.status,s.standIn)}function q(I){p+=I,r.pollPad(),o==="playing"&&a?(vh(a,I),Ee(),a.outcome&&f>0&&(f-=I,f<=0&&je())):o==="result"&&a?ne():o==="title"&&l&&(vh(l,I),l.events.length=0,et&&e.modalOpen&&d===Pe&&$a()!==et&&Pe()),a&&(o==="playing"||o==="paused"||o==="result")&&e.hud({haul:a.haul,target:a.target,time:a.time,expired:a.expired,streakMult:Fe.streakMults[Math.min(a.streak,Fe.streakMults.length-1)],fever:a.fever,charge:a.charge,dynamite:a.dynamite,canDynamite:a.claw.state===Ft.RETURN&&a.claw.held>=0&&a.dynamite>0,canLaunch:Dl(a)}),Math.random()<I*.15&&t.play("drip")}function ne(){a.events.length=0}return{actions:z,update:q,onResize:ze,switchModels:N,remount:E,showTitle:M,pause:G,resume:$,applyReduced:j,applyQuality:Z,setAutoQuality(I){te=I},changeLanguage:ae,get state(){return o},get sim(){return b()},get ctx(){return c},test:{startCampaign:U,startDaily:O,startEndless:V,retry:L,openMap:Pe,openUpgrades:Ke,get session(){return u},finish(I){a&&zM(a,I)}},getLanguage:Dh}}let _t=null,Ph=!1;function Ol(i){if(Ph)return;Ph=!0;const e=i&&(i.stack||i.message)?String(i.stack||i.message):String(i);if(console.error(i),_t)_t.fatal(Y("errorTitle"),e,Y("reload"));else{const t=document.getElementById("fatal");t.hidden=!1,t.textContent="Golden Miner failed to start: "+e}}window.addEventListener("error",i=>Ol(i.error||i.message));window.addEventListener("unhandledrejection",i=>Ol(i.reason));function uS(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}const Ka=()=>new Promise(i=>requestAnimationFrame(()=>i()));async function hS(){const i=lf(),e=i.data;if(Ih(e.lang||ff(navigator.languages||[navigator.language])),_t=pf(),_t.localizeStatic(),_t.loading(.05,Y("loading")),!uS()){_t.fatal(Y("errorTitle"),Y("noWebgl"),Y("reload"));return}const t=mf();t.setMuted(e.sound.muted),t.setVolume(e.sound.volume),_t.setSoundIcon(e.sound.muted),await Ka(),_t.loading(.12,Y("loading_tex"));const n=vM(),s=document.getElementById("scene"),r=KM(s,n),o=jM(r.renderer);r.setQuality(e.quality==="auto"?o:e.quality),r.mine.regionTextures("gilded"),r.actors.mountSlots(),_t.setModelSwitch(n.mode,"loading",n.standIn),await Ka(),_t.loading(.3,Y("loading_models"));const a=await n.load(y=>_t.loading(.3+y*.45,Y("loading_models")));let l=null;const c=ZM(s,_t.el.drop,_t.el.dyn,new Proxy({},{get:(y,x)=>l?l.actions[x]:void 0}));l=lS({view:r,ui:_t,audio:t,storage:i,slots:n,input:c}),l.setAutoQuality(o),l.applyReduced(),a==="ready"&&l.remount(),_t.setModelSwitch(n.mode,n.status,n.standIn),_t.loading(.8,Y("loading_shaders")),l.showTitle();const u=n.allTemplates().map(y=>{const x=y.clone();return x.position.set(0,-2,.2),r.scene.add(x),x});await r.warmup();for(const y of u)r.scene.remove(y);_t.loading(1,""),await Ka(),_t.loadingDone(),i.status==="recovered"?_t.toast(Y("toastRecovered"),"bad",4200):i.status==="unavailable"&&_t.toast(Y("toastNoStorage"),"bad",4200),a==="failed"&&_t.toast(Y("model_failed",{err:n.error}),"bad",5200),_t.el.mTripo.addEventListener("click",()=>{t.unlock(),l.switchModels("tripo")}),_t.el.mThree.addEventListener("click",()=>{t.unlock(),l.switchModels("classic")}),_t.el.sound.addEventListener("click",()=>l.actions.mute()),_t.el.pause.addEventListener("click",()=>{t.unlock(),l.pause()}),window.addEventListener("pointerdown",()=>t.unlock(),{capture:!0});let h=!1;const f=()=>{h||(h=!0,requestAnimationFrame(()=>{h=!1,l.onResize()}))};if(window.addEventListener("resize",f),window.addEventListener("orientationchange",f),window.visualViewport&&window.visualViewport.addEventListener("resize",f),window.matchMedia){const y=window.matchMedia("(prefers-reduced-motion: reduce)");y.addEventListener&&y.addEventListener("change",()=>l.applyReduced())}document.addEventListener("visibilitychange",()=>{document.hidden&&(l.pause(),c.cancelAll()),g=performance.now()}),window.addEventListener("blur",()=>c.cancelAll());let d=!1,p=null;const _={acc:0,n:0,value:0,cpu:0,cpuAcc:0};l.actions.debug=async()=>{if(d=!d,_t.el.debug.hidden=!d,d&&!p)try{const{default:y}=await sf(async()=>{const{default:b}=await import("./lil-gui.esm-DFUWXXp-.js");return{default:b}},[],import.meta.url);p=new y({title:"Golden Miner tuning"});const x=p.addFolder("Claw");x.add(Fe,"swingPeriod",1.2,5,.05),x.add(Fe,"extendSpeed",2,10,.1),x.add(Fe,"cargoReturnSpeed",1,6,.05),x.add(Fe,"emptyReturnSpeed",3,14,.1);const T=p.addFolder("Render");T.add(r.renderer,"toneMappingExposure",.4,2,.01),T.add(r.scene,"environmentIntensity",0,2,.01)}catch{}p&&p.show(d)};let g=performance.now(),m=0;function v(y){if(requestAnimationFrame(v),document.hidden){g=y;return}const x=y-g;g=y;const T=Math.min(.1,Math.max(0,x/1e3)),b=performance.now();l.update(T),m+=T,r.render(T,m,l.sim);const A=performance.now()-b;if(r.adapt(x),_.acc+=x,_.n++,_.cpuAcc+=A,_.acc>=500&&(_.value=_.n*1e3/_.acc,_.cpu=_.cpuAcc/_.n,_.frame=_.acc/_.n,_.acc=0,_.n=0,_.cpuAcc=0,d)){const w=r.info(),M=l.sim,S=performance.memory?` heap ${(performance.memory.usedJSHeapSize/1048576).toFixed(1)} MB`:"";_t.el.debug.textContent=`FPS ${_.value.toFixed(0)}  frame interval ${_.frame.toFixed(1)} ms
CPU update+submit ${_.cpu.toFixed(2)} ms (not GPU time)
draw calls ${w.calls}  tris ${w.triangles}  points ${w.points}
geometries ${w.geometries}  textures ${w.textures}  programs ${w.programs}${S}
dpr ${w.dpr.toFixed(2)} (adaptive ×${w.dprScale.toFixed(2)})  quality ${w.quality}
state ${l.state}  layout ${M?M.layout.name:"-"}  models ${n.mode}`}}requestAnimationFrame(v),new URLSearchParams(location.search).has("test")&&(window.__gm={game:l,view:r,slots:n,storage:i,audio:t,input:c,ui:_t,RULES:Fe})}hS().catch(Ol);

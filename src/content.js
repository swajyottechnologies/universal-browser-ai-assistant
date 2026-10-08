(()=>{if(window.top!==window||document.getElementById("universal-ai-host"))return;
const host=document.createElement("div");
host.id="universal-ai-host";
host.style.cssText="all:initial;position:fixed;right:0;bottom:0;width:0;height:0;overflow:visible;z-index:2147483647;pointer-events:auto;display:block;visibility:visible";
document.documentElement.appendChild(host);
const shadow=host.attachShadow({mode:"closed"});
shadow.innerHTML=\`
<style>
:host{all:initial}*{box-sizing:border-box}
.launcher{position:fixed;right:22px;bottom:22px;width:54px;height:54px;border:0;border-radius:18px;display:grid;place-items:center;cursor:pointer;pointer-events:auto;background:linear-gradient(135deg,#8b5cf6,#22d3ee);box-shadow:0 12px 34px #0008,0 0 0 1px #ffffff22;font:700 24px system-ui;color:#fff;transition:.18s transform,.18s box-shadow}.launcher:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 16px 42px #0009,0 0 0 1px #ffffff33}.spark{filter:drop-shadow(0 1px 3px #0006)}
.backdrop{position:fixed;inset:0;background:#0006;backdrop-filter:blur(3px);pointer-events:auto;opacity:0;transition:.18s}.backdrop.open{opacity:1}
.panel{position:fixed;right:20px;bottom:20px;width:min(540px,calc(100vw - 32px));height:min(740px,calc(100vh - 40px));display:flex;flex-direction:column;overflow:hidden;border:1px solid #ffffff16;border-radius:22px;background:#0c0e12;color:#f4f4f5;box-shadow:0 28px 90px #000b,0 0 0 1px #0008;font:13px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;pointer-events:auto;transform:translateY(10px) scale(.985);opacity:0;transition:.2s ease}.panel.open{transform:none;opacity:1}
.header{height:64px;display:flex;align-items:center;gap:11px;padding:0 14px;border-bottom:1px solid #ffffff10;background:linear-gradient(180deg,#12151b,#0e1015)}
.logo{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(135deg,#8b5cf6,#22d3ee);font-size:17px;box-shadow:0 5px 16px #0006}.title{font-weight:750;font-size:14px}.meta{font-size:10px;color:#858894;margin-top:1px}.headspace{flex:1}
.icon{width:32px;height:32px;border:1px solid #ffffff10;background:#ffffff06;color:#b9bcc6;border-radius:10px;cursor:pointer;font-size:15px}.icon:hover{background:#ffffff0d;color:#fff}
.context{padding:10px 14px 0}.pill{display:flex;align-items:center;gap:7px;max-width:100%;padding:7px 10px;border:1px solid #ffffff0d;border-radius:10px;background:#ffffff04;color:#858894;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dot{width:6px;height:6px;border-radius:50%;background:#22d3ee;box-shadow:0 0 9px #22d3ee88;flex:none}
.chat{flex:1;overflow:auto;padding:16px 15px 12px;scroll-behavior:smooth}.empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;color:#858894}.emptylogo{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;margin-bottom:14px;background:linear-gradient(135deg,#8b5cf6,#22d3ee);font-size:26px;box-shadow:0 14px 35px #0007}.empty h2{margin:0;color:#f4f4f5;font-size:17px}.empty p{max-width:350px;margin:7px 0 18px;color:#818591;font-size:12px}.suggestions{display:flex;flex-wrap:wrap;justify-content:center;gap:7px}.suggest{border:1px solid #ffffff10;background:#ffffff05;color:#aeb2bd;border-radius:10px;padding:7px 10px;cursor:pointer;font-size:11px}.suggest:hover{background:#ffffff0b;color:#fff}
.msg{display:flex;margin:0 0 14px}.msg.user{justify-content:flex-end}.bubble{max-width:88%;padding:10px 12px;border-radius:14px;border:1px solid #ffffff0c;word-break:break-word}.user .bubble{background:linear-gradient(135deg,#7056df,#5e4bc7);color:#fff;border-bottom-right-radius:5px;box-shadow:0 7px 20px #0003}.assistant .bubble{background:#15181e;color:#d9dbe1;border-bottom-left-radius:5px}.assistant .bubble p{margin:0 0 9px}.assistant .bubble p:last-child{margin-bottom:0}.assistant .bubble code{font:12px ui-monospace,SFMono-Regular,Consolas,monospace;background:#090b0f;border:1px solid #ffffff0c;border-radius:5px;padding:1px 4px;color:#d7dcff}.codewrap{position:relative;margin:8px 0;background:#090b0f;border:1px solid #ffffff0d;border-radius:10px;overflow:hidden}.codehead{height:30px;display:flex;align-items:center;padding:0 8px;color:#707581;font-size:9px;border-bottom:1px solid #ffffff0b}.copycode{margin-left:auto;border:0;background:#ffffff08;color:#9ca1ae;border-radius:6px;padding:4px 7px;font-size:9px;cursor:pointer}.code{display:block;padding:10px;overflow:auto;color:#d8dbe4;font:11px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre}.typing{display:inline-flex;gap:4px;padding:3px 2px}.typing i{width:5px;height:5px;border-radius:50%;background:#8b5cf6;animation:b 1s infinite ease-in-out}.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}@keyframes b{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-2px)}}
.actions{display:flex;justify-content:flex-end;gap:6px;margin:-7px 0 12px}.mini{border:1px solid #ffffff0b;background:#ffffff04;color:#777d89;border-radius:7px;padding:4px 7px;cursor:pointer;font-size:9px}.mini:hover{color:#c7cad2;background:#ffffff08}
.composer{padding:10px 12px 8px;border-top:1px solid #ffffff10;background:#0f1116}.inputrow{display:flex;align-items:flex-end;gap:8px;padding:8px;background:#15181e;border:1px solid #ffffff10;border-radius:14px;box-shadow:inset 0 1px 0 #fff3}.input{flex:1;min-height:22px;max-height:110px;resize:none;outline:0;border:0;background:transparent;color:#f3f4f6;font:13px/1.45 inherit;padding:3px 2px}.input::placeholder{color:#676c78}.send,.stop{width:36px;height:36px;border:0;border-radius:10px;color:#fff;cursor:pointer;font-weight:800}.send{background:linear-gradient(135deg,#8b5cf6,#22d3ee)}.stop{background:#272a32}.send:disabled{opacity:.45}.footerline{display:flex;align-items:center;gap:7px;padding:7px 2px 0;color:#666b76;font-size:9px}.status{display:flex;align-items:center;gap:6px}.statusdot{width:5px;height:5px;border-radius:50%;background:#22d3ee}.hint{margin-left:auto}
@media(max-width:600px){.panel{inset:0;width:100%;height:100%;border-radius:0;right:auto;bottom:auto}.launcher{right:16px;bottom:16px}.backdrop{display:none}.chat{padding-bottom:10px}}
</style>
<button class="launcher" aria-label="Open Universal AI Assistant" title="Open Universal AI Assistant"><span class="spark">✦</span></button>
<div class="backdrop"></div>
<section class="panel" role="dialog" aria-modal="true" aria-label="Universal AI Assistant">
<header class="header"><div class="logo">✦</div><div><div class="title">Universal AI Assistant</div><div class="meta">Context-aware browser assistant</div></div><div class="headspace"></div><button class="icon settings" aria-label="Settings" title="Settings">⚙</button><button class="icon new" aria-label="New conversation" title="New conversation">＋</button><button class="icon close" aria-label="Close" title="Close">×</button></header>
<div class="context"><div class="pill"><span class="dot"></span><span class="contextText">Ready to help with this page</span></div></div>
<main class="chat" aria-live="polite"></main>
<footer class="composer"><div class="inputrow"><textarea class="input" rows="1" aria-label="Ask Universal AI Assistant" placeholder="Ask about this page…"></textarea><button class="send" aria-label="Send" title="Send">↑</button><button class="stop" aria-label="Stop generation" title="Stop" hidden>■</button></div><div class="footerline"><span class="status"><span class="statusdot"></span><span class="statusText">Ready</span></span><span class="hint">Enter to send · Shift+Enter for new line</span></div></footer>
</section>\`;
const q=s=>shadow.querySelector(s);
const launcher=q(".launcher"),backdrop=q(".backdrop"),panel=q(".panel"),chat=q(".chat"),input=q(".input"),send=q(".send"),stop=q(".stop"),status=q(".statusText"),contextText=q(".contextText");
let history=[],busy=false,requestId=null,conversationId=null,live="",opened=false,runtimeDead=false,lastFocused=null;

function sendRuntime(message){
  if(runtimeDead)return Promise.resolve(null);
  try{
    if(!chrome.runtime?.id){runtimeDead=true;return Promise.resolve(null)}
    return chrome.runtime.sendMessage(message).then(result=>{
      if(result?.ok===false&&result.error)throw Error(result.error);
      return result;
    }).catch(error=>{
      if(/Extension context invalidated|Receiving end does not exist|message port closed/i.test(String(error?.message||""))) markRuntimeDead();
      throw error;
    });
  }catch(error){markRuntimeDead();return Promise.reject(error)}
}
function markRuntimeDead(){
  runtimeDead=true;
  busy=false;
  send.hidden=false;
  stop.hidden=true;
  input.disabled=true;
  status.textContent="Extension updated — refresh page";
}
function esc(x){return String(x??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function inline(x){return esc(x).replace(/\\`([^\\`]+)\\`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}
function md(x){
  const s=String(x??"").replace(/\r/g,""),parts=[],re=/\\`\\`\\`([\s\S]*?)\\`\\`\\`/g;let last=0,m;
  while((m=re.exec(s))){parts.push({t:"text",v:s.slice(last,m.index)});parts.push({t:"code",v:m[1].replace(/^\w+\n/,"")});last=m.index+m[0].length}
  parts.push({t:"text",v:s.slice(last)});
  let out="";
  for(const p of parts){
    if(p.t==="code"){const value=esc(p.v);out+='<div class="codewrap"><div class="codehead">Code <button class="copycode" data-copy="'+value.replace(/"/g,"&quot;")+'">Copy</button></div><pre class="code">'+value+"</pre></div>";continue}
    const lines=p.v.split("\n");
    for(const line of lines){
      if(!line.trim()){out+='<div style="height:7px"></div>';continue}
      if(/^\s*[-*]\s+/.test(line))out+="<div>• "+inline(line.replace(/^\s*[-*]\s+/,""))+"</div>";
      else out+="<p>"+inline(line)+"</p>";
    }
  }
  return out;
}
function empty(){chat.innerHTML='<div class="empty"><div class="emptylogo">✦</div><h2>How can I help?</h2><p>I can use selected text and relevant page content. Passwords and form values are never collected automatically.</p><div class="suggestions"><button class="suggest">Explain this page</button><button class="suggest">Summarize it</button><button class="suggest">Find issues</button></div></div>'}
function render(){
  if(!history.length){empty();return}
  chat.innerHTML=history.map((m,i)=>m.role==="user"
    ?'<div class="msg user"><div class="bubble">'+esc(m.content).replace(/\n/g,"<br>")+"</div></div>"
    :'<div class="msg assistant"><div class="bubble">'+md(m.content)+'</div></div><div class="actions"><button class="mini copy" data-i="'+i+'">Copy</button></div>').join("");
  chat.scrollTop=chat.scrollHeight;
}
function open(){lastFocused=document.activeElement;opened=true;launcher.style.display="none";backdrop.classList.add("open");panel.classList.add("open");requestAnimationFrame(()=>input.focus())}
function close(){opened=false;panel.classList.remove("open");backdrop.classList.remove("open");launcher.style.display="grid";if(lastFocused?.focus)lastFocused.focus()}
function reset(s){busy=false;send.hidden=false;stop.hidden=true;status.textContent=s;requestId=null;input.disabled=runtimeDead}
function sanitizeText(value,max){return String(value||"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").replace(/\s+/g," ").trim().slice(0,max)}
function isHidden(el){const style=getComputedStyle(el);return style.display==="none"||style.visibility==="hidden"||style.contentVisibility==="hidden"}
function extractPageText(){
  const selected=sanitizeText(window.getSelection?.().toString()||"",12000);
  const roots=[...document.querySelectorAll("main,article,[role=\"main\"]")].filter(x=>!isHidden(x));
  const root=roots.sort((a,b)=>(b.innerText?.length||0)-(a.innerText?.length||0))[0]||document.body;
  const clone=root?.cloneNode(true);
  if(!clone)return selected;
  clone.querySelectorAll("script,style,noscript,template,nav,footer,form,[aria-hidden=\"true\"],[hidden],input,textarea,select,button").forEach(el=>el.remove());
  const text=sanitizeText(clone.innerText||clone.textContent||"",24000);
  return selected ? selected+"\n\n"+text : text;
}
function pageContext(){
  contextText.textContent=document.title?("Page: "+sanitizeText(document.title,90)):"Current page";
  return {title:document.title,url:location.href,selectedText:sanitizeText(window.getSelection?.().toString()||"",12000),pageText:extractPageText()};
}
function submit(prompt){
  prompt=(prompt??input.value).trim();
  if(!prompt||busy||runtimeDead)return;
  input.value="";input.style.height="auto";
  history.push({role:"user",content:prompt});render();
  requestId=crypto.randomUUID();busy=true;send.hidden=true;stop.hidden=false;status.textContent="Starting…";input.disabled=true;
  const context=pageContext();
  sendRuntime({type:"GENERATE",requestId,conversationId,prompt,context}).catch(error=>{
    if(runtimeDead)return;
    reset("Error");history.pop();render();
    chat.insertAdjacentHTML("beforeend",'<div class="msg assistant"><div class="bubble"><strong>Error:</strong> '+esc(error.message||"Could not start generation.")+"</div></div>");
  });
}
launcher.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();open()},{capture:true});
launcher.addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation()},{capture:true});
backdrop.addEventListener("click",close);
q(".close").onclick=close;
q(".settings").onclick=()=>sendRuntime({type:"OPEN_OPTIONS"}).catch(()=>{});
q(".new").onclick=()=>{if(busy)return;history=[];render();sendRuntime({type:"CLEAR_CONVERSATION"}).catch(()=>{})};
send.onclick=()=>submit();
stop.onclick=()=>{if(requestId)sendRuntime({type:"STOP_GENERATION",requestId}).catch(()=>{})};
input.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit()}};
input.oninput=()=>{input.style.height="auto";input.style.height=Math.min(input.scrollHeight,110)+"px"};
document.addEventListener?.("keydown",e=>{if(e.key==="Escape"&&opened)close()});
chat.addEventListener("click",e=>{
  const s=e.target.closest?.(".suggest");if(s){open();submit(s.textContent)}
  const c=e.target.closest?.(".copy");if(c){const i=Number(c.dataset.i);navigator.clipboard?.writeText(history[i]?.content||"").then(()=>{c.textContent="Copied";setTimeout(()=>c.textContent="Copy",900)})}
  const cc=e.target.closest?.(".copycode");if(cc){navigator.clipboard?.writeText(cc.dataset.copy||"").then(()=>{cc.textContent="Copied";setTimeout(()=>cc.textContent="Copy",900)})}
});
chrome.runtime.onMessage.addListener(message=>{
  if(message.requestId&&message.requestId!==requestId)return;
  if(message.type==="OPEN_ASSISTANT"){
    open();
    if(message.selection)contextText.textContent="Selected text included";
    if(message.quickPrompt&&!busy){input.value=message.quickPrompt;submit()}
    return;
  }
  if(message.type==="GENERATION_START"){
    open();live="";
    chat.insertAdjacentHTML("beforeend",'<div class="msg assistant"><div class="bubble" id="ua-live"><span class="typing"><i></i><i></i><i></i></span></div></div>');
    busy=true;status.textContent="Generating…";input.disabled=true;chat.scrollTop=chat.scrollHeight;
  }
  if(message.type==="GENERATION_STATUS"&&busy)status.textContent=message.status||"Generating…";
  if(message.type==="GENERATION_CHUNK"){
    live+=String(message.content||"");
    const z=shadow.querySelector("#ua-live");if(z)z.innerHTML=md(live);
    chat.scrollTop=chat.scrollHeight;
  }
  if(message.type==="GENERATION_DONE"){
    const z=shadow.querySelector("#ua-live");z?.closest(".msg")?.remove();
    history.push({role:"assistant",content:message.content||live});
    reset("Ready");render();
  }
  if(message.type==="GENERATION_STOPPED"){
    shadow.querySelector("#ua-live")?.closest(".msg")?.remove();
    reset("Stopped");
  }
  if(message.type==="GENERATION_ERROR"){
    shadow.querySelector("#ua-live")?.closest(".msg")?.remove();
    reset("Error");
    chat.insertAdjacentHTML("beforeend",'<div class="msg assistant"><div class="bubble"><strong>Error:</strong> '+esc(message.error||"Unknown error")+"</div></div>");
  }
});
sendRuntime({type:"GET_CONVERSATION"}).then(result=>{
  if(result?.ok){conversationId=result.conversationId||null;history=result.history||[];render()}
}).catch(()=>{});
})();
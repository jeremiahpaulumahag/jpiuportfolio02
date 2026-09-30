(function(){
  'use strict';
  var endpoint='https://jpiu-chat-api.jeremiahpaulumahag.workers.dev';
  var history=[];
  var launcher=document.createElement('button');
  launcher.className='ai-chat-launcher'; launcher.type='button'; launcher.setAttribute('aria-label','Open Jeremiah\'s AI Assistant'); launcher.setAttribute('aria-expanded','false');
  launcher.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.7-.8L4 20l1.1-3.4A7.4 7.4 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"/></svg>';
  var win=document.createElement('section'); win.className='ai-chat-window'; win.setAttribute('aria-label','Jeremiah\'s AI Assistant');
  win.innerHTML='<header class="ai-chat-header"><div><div class="ai-chat-title">Jeremiah\'s AI Assistant</div><span class="ai-chat-status">Here to help with your media needs</span></div><button class="ai-chat-close" type="button" aria-label="Close chat">&times;</button></header><div class="ai-chat-messages" role="log" aria-live="polite"></div><form class="ai-chat-form"><input class="ai-chat-input" type="text" autocomplete="off" placeholder="Ask about services or projects..." aria-label="Message"><button class="ai-chat-send" type="submit">Send</button></form>';
  document.body.appendChild(launcher); document.body.appendChild(win);
  var messages=win.querySelector('.ai-chat-messages'), form=win.querySelector('form'), input=win.querySelector('input'), send=win.querySelector('.ai-chat-send');
  function addMessage(text,role){var el=document.createElement('div');el.className='ai-chat-message '+role;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el}
  function open(){win.classList.add('is-open');launcher.setAttribute('aria-expanded','true');if(!messages.children.length)addMessage('Hi! I\'m Jeremiah\'s AI assistant. Ask me about real estate media, social media management, or post-production.', 'assistant');setTimeout(function(){input.focus();},100)}
  function close(){win.classList.remove('is-open');launcher.setAttribute('aria-expanded','false');launcher.focus()}
  launcher.addEventListener('click',function(){win.classList.contains('is-open')?close():open()});win.querySelector('.ai-chat-close').addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&win.classList.contains('is-open'))close()});
  form.addEventListener('submit',async function(e){e.preventDefault();var text=input.value.trim();if(!text||send.disabled)return;addMessage(text,'user');history.push({role:'user',content:text});input.value='';send.disabled=true;var typing=addMessage('','assistant typing');typing.innerHTML='<span></span><span></span><span></span>';
    try{var response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history})});if(!response.ok)throw new Error('Request failed');var data=await response.json();var reply=data.reply||data.response||data.message||(data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content);if(!reply)throw new Error('Empty response');typing.remove();addMessage(reply,'assistant');history.push({role:'assistant',content:reply});}
    catch(err){typing.remove();addMessage('I\'m having trouble connecting right now. Please try again or use the contact link on this page.','assistant');}finally{send.disabled=false;input.focus();}
  });
})();
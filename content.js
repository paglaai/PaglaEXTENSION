// Capital Sin - Content Script
// Extracts conversations from multiple AI platforms

function extractChat() {
  const host = window.location.hostname;
  if (host.includes('together.ai')) return extractTogetherChat();
  if (host.includes('chatgpt.com')) return extractChatGPT();
  if (host.includes('grok.com')) return extractGrok();
  if (host.includes('gemini.google.com')) return extractGemini();
  if (host.includes('aistudio.google.com')) return extractAIStudio();
  if (host.includes('deepseek.com')) return extractDeepSeek();
  if (host.includes('qwen')) return extractQwen();
  if (host.includes('z.ai')) return extractZAI();
  if (host.includes('hailuoai.com')) return extractMiniMax();
  if (host.includes('mimo.mi.com') || host.includes('xiaomimimo')) return extractXiaomiMimo();
  
  // Generic fallback
  return extractGeneric();
}

function extractTogetherChat() {
  const chatBubbles = document.querySelectorAll('.chat-message, [class*="MessageContainer"]');
  const chat = [];
  chatBubbles.forEach(msg => {
    const isUser = msg.classList.contains('user-message') || msg.innerText.toLowerCase().includes('you');
    const sender = isUser ? 'You' : 'AI';
    const content = msg.querySelector('.message-text, [class*="MessageContent"]') || msg;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: msg.querySelector('.timestamp')?.innerText || ''
    });
  });
  return chat;
}

function extractChatGPT() {
  const turns = document.querySelectorAll('[data-testid^="conversation-turn-"], article');
  const chat = [];
  turns.forEach(turn => {
    const isUser = turn.querySelector('img[alt="User"]') || turn.innerText.includes('You');
    const sender = isUser ? 'You' : 'AI';
    const contentEl = turn.querySelector('.markdown, .prose, [data-message-author-role]') || turn;
    chat.push({
      sender,
      messageHTML: contentEl.innerHTML,
      messageMD: contentEl.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractGrok() {
  const containers = document.querySelectorAll('div[data-testid="message-container"], [class*="message_container"]');
  const chat = [];
  containers.forEach(msg => {
    const sender = msg.innerText.toLowerCase().includes('grok') ? 'AI' : 'You';
    const content = msg.querySelector('div[dir="auto"], [class*="message_content"]') || msg;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractGemini() {
  const messages = document.querySelectorAll('message-content, .message-content, [class*="message_content"]');
  const chat = [];
  messages.forEach(msg => {
    const isUser = msg.closest('.query-text, .user-message');
    const sender = isUser ? 'You' : 'AI';
    chat.push({
      sender,
      messageHTML: msg.innerHTML,
      messageMD: msg.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractAIStudio() {
  const entries = document.querySelectorAll('.chat-entry, .message-row');
  const chat = [];
  entries.forEach(entry => {
    const sender = entry.classList.contains('user') || entry.innerText.toLowerCase().includes('user') ? 'You' : 'AI';
    const content = entry.querySelector('.message-content, .content') || entry;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractDeepSeek() {
  const items = document.querySelectorAll('.ds-message-item, [class*="message_item"]');
  const chat = [];
  items.forEach(item => {
    const isUser = item.querySelector('.ds-icon--user') || item.innerText.includes('You');
    const sender = isUser ? 'You' : 'AI';
    const content = item.querySelector('.ds-markdown, .ds-content, [class*="markdown"]') || item;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractQwen() {
  const items = document.querySelectorAll('.message-item, .chat-message');
  const chat = [];
  items.forEach(item => {
    const sender = item.classList.contains('user') || item.innerText.toLowerCase().includes('user') ? 'You' : 'AI';
    const content = item.querySelector('.content-wrapper, .message-content') || item;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractZAI() {
  const bubbles = document.querySelectorAll('.message-bubble, .chat-item');
  const chat = [];
  bubbles.forEach(bubble => {
    const sender = bubble.classList.contains('user') || bubble.innerText.toLowerCase().includes('user') ? 'You' : 'AI';
    chat.push({
      sender,
      messageHTML: bubble.innerHTML,
      messageMD: bubble.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractMiniMax() {
  const bubbles = document.querySelectorAll('.message-bubble, .chat-content-item');
  const chat = [];
  bubbles.forEach(bubble => {
    const sender = bubble.classList.contains('user') || bubble.innerText.toLowerCase().includes('user') ? 'You' : 'AI';
    const content = bubble.querySelector('.chat-content, .content') || bubble;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractXiaomiMimo() {
  const msgs = document.querySelectorAll('.chat-message, .message-item');
  const chat = [];
  msgs.forEach(msg => {
    const sender = msg.classList.contains('user') || msg.innerText.toLowerCase().includes('user') ? 'You' : 'AI';
    const content = msg.querySelector('.message-content, .content') || msg;
    chat.push({
      sender,
      messageHTML: content.innerHTML,
      messageMD: content.innerText,
      timestamp: ''
    });
  });
  return chat;
}

function extractGeneric() {
  const possibleMessages = document.querySelectorAll('.markdown, .prose, .message-content, .chat-bubble, .message');
  const chat = [];
  possibleMessages.forEach((msg, index) => {
    chat.push({
      sender: index % 2 === 0 ? 'User' : 'AI',
      messageHTML: msg.innerHTML,
      messageMD: msg.innerText,
      timestamp: ''
    });
  });
  return chat;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extract_chat") {
    sendResponse({ chat: extractChat() });
  }
  return true;
});

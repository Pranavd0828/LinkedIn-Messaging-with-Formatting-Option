// LinkedIn Messaging - Interactive Functionality
// Version 2.1.0 (Refactored)

import { conversationData } from './data.js';

// Application State
const state = {
    activeConversation: 'david-chen'
};

/* --- Helper Functions --- */

// Render a single message HTML
function createMessageHTML(msg, index, conversationAvatar, conversationName) {
    const isMine = msg.isMine;
    const messageClass = isMine ? 'message message--mine' : 'message';
    const avatarSrc = isMine ? 'https://i.pravatar.cc/100?img=14' : conversationAvatar;
    const avatarAlt = isMine ? 'You' : conversationName;
    const editButton = isMine ? `<button class="message__edit-btn" onclick="handleEdit(this)">✎ Edit</button>` : '';
    const readStatus = isMine && index === conversationData[state.activeConversation].messages.length - 1 ? '<span class="message__read">✓</span>' : '';

    return `
        <div class="${messageClass}" data-id="${index}">
            <img src="${avatarSrc}" alt="${avatarAlt}" class="message__avatar">
            <div class="message__content">
                <div class="message__header">
                    <span class="message__sender">${msg.sender}</span>
                    <span class="message__time">${msg.time}</span>
                    ${editButton}
                </div>
                <div class="message__text">${msg.text}</div>
                ${readStatus}
            </div>
        </div>
    `;
}

// Render the conversation list
function renderConversationList() {
    const listContainer = document.querySelector('.conversation-list__items');
    if (!listContainer) return;

    listContainer.innerHTML = Object.keys(conversationData).map(key => {
        const conv = conversationData[key];
        const lastMsg = conv.messages[conv.messages.length - 1];
        const isActive = key === state.activeConversation ? 'conversation-item--active' : '';

        let previewText = lastMsg.isMine
            ? `<span class="conversation-item__sender">You:</span> <span class="conversation-item__text">${lastMsg.text}</span>`
            : `<span class="conversation-item__text">${lastMsg.text}</span>`;

        return `
            <div class="conversation-item ${isActive}" data-id="${key}">
                <img src="${conv.avatar}" alt="${conv.name}" class="conversation-item__avatar">
                <div class="conversation-item__content">
                    <div class="conversation-item__header">
                        <span class="conversation-item__name">${conv.name}</span>
                        <span class="conversation-item__time">${lastMsg.time}</span>
                    </div>
                    <div class="conversation-item__preview">
                        ${previewText}
                    </div>
                </div>
                <button class="conversation-item__options">⋮</button>
                <button class="conversation-item__star">☆</button>
            </div>
        `;
    }).join('');

    // Re-attach listeners after rendering
    attachConversationListeners();
}

// Load conversation messages
function loadConversation(conversationKey) {
    const conversation = conversationData[conversationKey];
    if (!conversation) return;

    state.activeConversation = conversationKey;

    // Update Header
    const headerAvatar = document.querySelector('.message-view__avatar');
    const headerName = document.querySelector('.message-view__name');
    const headerTitle = document.querySelector('.message-view__title');

    if (headerAvatar) headerAvatar.src = conversation.avatar;
    if (headerName) {
        const lastMsg = conversation.messages[conversation.messages.length - 1];
        const time = lastMsg ? lastMsg.time : '';
        headerName.textContent = `${conversation.name} ✓ · ${time}`;
    }
    if (headerTitle) {
        headerTitle.innerHTML = `${conversation.name}<br>${conversation.title}${conversation.company ? '<br>' + conversation.company : ''}`;
    }

    // Update Messages
    const messageContainer = document.querySelector('.message-view__content');
    if (messageContainer) {
        messageContainer.innerHTML = conversation.messages.map((msg, index) =>
            createMessageHTML(msg, index, conversation.avatar, conversation.name)
        ).join('');

        // Scroll to bottom
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Update active class in list
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.toggle('conversation-item--active', item.dataset.id === conversationKey);
    });
}


/* --- Event Handlers & Listeners --- */

function attachConversationListeners() {
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach((item) => {
        item.addEventListener('click', () => {
            const conversationKey = item.getAttribute('data-id');
            loadConversation(conversationKey);
        });
    });
}

function sendMessage() {
    const messageInput = document.querySelector('.message-view__input');
    const text = messageInput.innerHTML;

    if (messageInput.textContent.trim() === '') return;

    const conversation = conversationData[state.activeConversation];
    if (!conversation) return;

    const newMessage = {
        sender: 'You',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
    };

    conversation.messages.push(newMessage);

    // Clear and reset UI
    messageInput.innerHTML = '';
    const sendButton = document.querySelector('.btn-send');
    if (sendButton) sendButton.disabled = true;

    // Re-render
    loadConversation(state.activeConversation);
    updateConversationPreview(state.activeConversation, newMessage.text, newMessage.time);
}

function updateConversationPreview(conversationKey, lastMessage, time) {
    // Re-render the list entirely is easiest to keep sync, or update selective DOM
    // For simplicity and correctness with the new preview logic:
    renderConversationList();
}

// Make global functions available fo inline HTML event handlers (like onclick="handleEdit(...)")
// Note: It's better to verify if we can remove inline handlers, but to keep 'no layout change' and minimize risk, we expose only needed ones.
window.handleEdit = function (btn) {
    const messageEl = btn.closest('.message');
    const textEl = messageEl.querySelector('.message__text');
    const currentText = textEl.innerHTML;

    const editableDiv = document.createElement('div');
    editableDiv.className = 'message__text';
    editableDiv.contentEditable = true;
    editableDiv.innerHTML = currentText;

    textEl.replaceWith(editableDiv);
    editableDiv.focus();

    editableDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const messageId = messageEl.dataset.id;
            const conversation = conversationData[state.activeConversation];

            if (conversation && conversation.messages[messageId]) {
                let finalText = editableDiv.innerHTML;
                if (!finalText.includes('(Edited)')) {
                    finalText += ' <span class="edited-label">(Edited)</span>';
                }
                conversation.messages[messageId].text = finalText;
                loadConversation(state.activeConversation);
            }
        } else if (e.key === 'Escape') {
            loadConversation(state.activeConversation);
        }
    });
};


/* --- Initialization --- */

function initializeApp() {
    renderConversationList();
    loadConversation(state.activeConversation);

    // Send Message Liteners
    const messageInput = document.querySelector('.message-view__input');
    const sendButton = document.querySelector('.btn-send');

    if (sendButton) {
        sendButton.disabled = true;
        sendButton.addEventListener('click', sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('input', () => {
            if (sendButton) sendButton.disabled = messageInput.textContent.trim() === '';
        });
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    setupRichText();
}

function setupRichText() {
    const formatBtns = document.querySelectorAll('.format-btn');
    const editor = document.querySelector('.message-view__input');

    if (editor && editor.innerHTML.trim() === '') editor.innerHTML = '';

    const updateToolbarState = () => {
        formatBtns.forEach(btn => {
            const command = btn.dataset.command;
            btn.classList.toggle('active', document.queryCommandState(command));
        });
    };

    formatBtns.forEach(btn => {
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const command = btn.dataset.command;
            document.execCommand(command, false, null);
            updateToolbarState();
        });
        btn.addEventListener('dblclick', (e) => {
            e.preventDefault();
            if (!document.queryCommandState(btn.dataset.command)) {
                document.execCommand(btn.dataset.command, false, null);
                updateToolbarState();
            }
        });
    });

    if (editor) {
        ['keyup', 'mouseup', 'click'].forEach(evt => editor.addEventListener(evt, updateToolbarState));
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// LinkedIn Messaging - Interactive Functionality
// Version 2.0.0

// Dummy conversation data
const conversationData = {
    'sarah-jenkins': {
        name: 'Sarah Jenkins',
        avatar: 'https://i.pravatar.cc/100?img=12',
        title: 'Senior Recruiter at Google',
        messages: [
            { sender: 'Sarah Jenkins', text: 'Hi Pranav! I came across your profile and was impressed by your experience. We have a Senior PM role open.', time: '2:15 PM', isMine: false },
            { sender: 'You', text: 'Hi Sarah! Thanks for reaching out. I would love to hear more about the opportunity.', time: '2:20 PM', isMine: true },
            { sender: 'Sarah Jenkins', text: 'Great! Are you available for a quick chat later this week?', time: '2:25 PM', isMine: false },
            { sender: 'You', text: 'Yes, Thursday afternoon works best for me.', time: 'Nov 27', isMine: true }
        ]
    },
    'david-chen': {
        name: 'David Chen',
        avatar: 'https://i.pravatar.cc/100?img=32',
        title: 'Director of Product at Netflix',
        company: 'netflix.com',
        messages: [
            { sender: 'David Chen', text: 'Hi! I have an exciting opportunity for a Sr Product Manager role at Netflix that I think would be perfect for you.', time: '1:45 PM', isMine: false },
            { sender: 'You', text: 'Hi David, thanks for reaching out! I\'m definitely interested in the streaming space.', time: '2:00 PM', isMine: true },
            { sender: 'David Chen', text: 'Awesome. Let\'s set up a time to chat. Here is my calendar link: calendly.com/david-netflix', time: '2:10 PM', isMine: false },
            { sender: 'You', text: 'Thank you. I have scheduled a time for Tuesday at 10 AM.', time: '2:38 PM', isMine: true }
        ]
    },
    'emily-rodriguez': {
        name: 'Emily Rodriguez',
        avatar: 'https://i.pravatar.cc/100?img=47',
        title: 'Talent Acquisition at Apple',
        messages: [
            { sender: 'Emily Rodriguez', text: 'Sponsored · Join the team building the next generation of Apple services. Apply now!', time: 'Nov 24', isMine: false }
        ]
    },
    'michael-chang': {
        name: 'Michael Chang',
        avatar: 'https://i.pravatar.cc/100?img=58',
        title: 'Product Lead at Uber',
        messages: [
            { sender: 'Michael Chang', text: 'Pranav, are you open to new opportunities? We are building a new vertical at Uber.', time: '10:30 AM', isMine: false },
            { sender: 'You', text: 'Hi Michael, good to hear from you. I\'m always open to interesting conversations.', time: '11:00 AM', isMine: true },
            { sender: 'Michael Chang', text: 'Perfect. Let\'s grab coffee next week.', time: '11:15 AM', isMine: false },
            { sender: 'You', text: 'Sounds good. Let me know what day works for you.', time: 'Nov 23', isMine: true }
        ]
    },
    'jessica-williams': {
        name: 'Jessica Williams',
        avatar: 'https://i.pravatar.cc/100?img=63',
        title: 'Recruiter at DoorDash',
        messages: [
            { sender: 'Jessica Williams', text: '🚀 DoorDash | 2026 🚀 Hiring Batch - Product Managers needed! Are you interested in learning more?', time: 'Nov 21', isMine: false }
        ]
    },
    'alex-thompson': {
        name: 'Alex Thompson',
        avatar: 'https://i.pravatar.cc/100?img=68',
        title: 'Head of Growth at Stripe',
        messages: [
            { sender: 'Alex Thompson', text: 'InMail · Help Us Scale Expert Growth 🚀 - We\'re looking for talented product leaders to join our team.', time: 'Nov 21', isMine: false }
        ]
    },
    'ryan-cooper': {
        name: 'Ryan Cooper',
        avatar: 'https://i.pravatar.cc/100?img=12',
        title: 'Engineering Manager at Meta',
        messages: [
            { sender: 'Ryan Cooper', text: 'Hey Pranav, hope you\'re doing well! Saw your recent post about AI product management.', time: 'Nov 19', isMine: false }
        ]
    }
};

// Current active conversation
let activeConversation = 'david-chen';

// Initialize the app
function initializeApp() {
    // Add click handlers to conversation items
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach((item, index) => {
        const conversationKeys = Object.keys(conversationData);
        const conversationKey = conversationKeys[index];

        item.addEventListener('click', () => {
            selectConversation(conversationKey, item);
        });
    });

    // Add send message handler
    const messageInput = document.querySelector('.message-view__input');
    const sendButton = document.querySelector('.btn-send');

    if (sendButton) {
        // Initially disable send button
        sendButton.disabled = true;

        sendButton.addEventListener('click', () => sendMessage());
    }

    if (messageInput) {
        // Enable/disable send button based on input
        messageInput.addEventListener('input', () => {
            if (sendButton) {
                sendButton.disabled = messageInput.textContent.trim() === '';
            }
        });

        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    // Load initial conversation (Joe Battinieri)
    loadConversation(activeConversation);
}

// Select a conversation
function selectConversation(conversationKey, clickedItem) {
    // Remove active class from all items
    // Remove active class from all items
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('conversation-item--active');
    });

    // Add active class to clicked item
    clickedItem.classList.add('conversation-item--active');

    // Update active conversation
    activeConversation = conversationKey;
    // Assuming renderConversationList and renderMessageView are new functions to be added or already exist
    // renderConversationList();
    // renderMessageView();

    // Load conversation messages
    loadConversation(conversationKey);
}

// Rich Text Formatting
document.addEventListener('DOMContentLoaded', () => {
    const formatBtns = document.querySelectorAll('.format-btn');
    const editor = document.querySelector('.message-view__input');

    // Force clear editor to remove any HTML whitespace
    if (editor && editor.innerHTML.trim() === '') {
        editor.innerHTML = '';
    }

    // Toolbar Button Click
    formatBtns.forEach(btn => {
        // Use mousedown instead of click to prevent focus loss
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Critical: prevents editor from losing focus
            const command = btn.dataset.command;
            document.execCommand(command, false, null);
            updateToolbarState();
        });

        // Handle Double Click to ensure it stays selected ("Sticky")
        // Double click = Click (Toggle On) + Click (Toggle Off) -> Result Off
        // We want Result On. So if it's Off, toggle it again.
        btn.addEventListener('dblclick', (e) => {
            e.preventDefault();
            const command = btn.dataset.command;
            // If currently OFF (because 2nd click turned it off), turn it back ON
            if (!document.queryCommandState(command)) {
                document.execCommand(command, false, null);
                updateToolbarState();
            }
        });
    });

    // Update toolbar state on cursor movement
    if (editor) {
        editor.addEventListener('keyup', updateToolbarState);
        editor.addEventListener('mouseup', updateToolbarState);
        editor.addEventListener('click', updateToolbarState);
    }

    function updateToolbarState() {
        formatBtns.forEach(btn => {
            const command = btn.dataset.command;
            if (document.queryCommandState(command)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});

// Load conversation messages
function loadConversation(conversationKey) {
    const conversation = conversationData[conversationKey];
    if (!conversation) return;

    // Update header
    const headerAvatar = document.querySelector('.message-view__avatar');
    const headerName = document.querySelector('.message-view__name');
    const headerTitle = document.querySelector('.message-view__title');

    if (headerAvatar) headerAvatar.src = conversation.avatar;
    if (headerName) {
        const time = conversation.messages[conversation.messages.length - 1]?.time || '';
        headerName.textContent = `${conversation.name} ✓ · ${time}`;
    }
    if (headerTitle) {
        headerTitle.innerHTML = `${conversation.name}<br>${conversation.title}${conversation.company ? '<br>' + conversation.company : ''}`;
    }

    // Update messages
    const messageContainer = document.querySelector('.message-view__content');
    if (!messageContainer) return;

    messageContainer.innerHTML = conversation.messages.map((msg, index) => {
        if (msg.isMine) {
            return `
        <div class="message message--mine" data-id="${index}">
          <img src="https://i.pravatar.cc/100?img=14" alt="You" class="message__avatar">
          <div class="message__content">
            <div class="message__header">
              <span class="message__sender">${msg.sender}</span>
              <span class="message__time">${msg.time}</span>
              <button class="message__edit-btn" onclick="handleEdit(this)">✎ Edit</button>
            </div>
            <div class="message__text">${msg.text}</div>
          </div>
        </div>
      `;
        } else {
            return `
        <div class="message">
          <img src="${conversation.avatar}" alt="${conversation.name}" class="message__avatar">
          <div class="message__content">
            <div class="message__header">
              <span class="message__sender">${msg.sender}</span>
              <span class="message__time">${msg.time}</span>
            </div>
            <div class="message__text">${msg.text}</div>
          </div>
        </div>
      `;
        }
    }).join('');

    // Scroll to bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Handle Message Editing
window.handleEdit = function (btn) {
    const messageEl = btn.closest('.message');
    const textEl = messageEl.querySelector('.message__text');
    const currentText = textEl.innerHTML; // Keep HTML for rich text

    // Convert to editable
    const editableDiv = document.createElement('div');
    editableDiv.className = 'message__text';
    editableDiv.contentEditable = true;
    editableDiv.innerHTML = currentText;

    // Replace div with editable div
    textEl.replaceWith(editableDiv);
    editableDiv.focus();

    // Handle Save on Enter
    editableDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveEdit(messageEl, editableDiv.innerHTML);
        } else if (e.key === 'Escape') {
            // Cancel edit (reload conversation)
            loadConversation(activeConversation);
        }
    });
};

function saveEdit(messageEl, newText) {
    const messageId = messageEl.dataset.id;
    const conversation = conversationData[activeConversation];

    if (conversation && conversation.messages[messageId]) {
        // Update data
        let finalText = newText;
        if (!finalText.includes('(Edited)')) {
            finalText += ' <span class="edited-label">(Edited)</span>';
        }
        conversation.messages[messageId].text = finalText;

        // Re-render
        loadConversation(activeConversation);
    }
}

// Send a message
function sendMessage() {
    const messageInput = document.querySelector('.message-view__input');
    const text = messageInput.innerHTML; // Get HTML content for rich text

    if (messageInput.textContent.trim() === '') return;

    const conversation = conversationData[activeConversation];
    if (!conversation) return;

    // Add new message
    const newMessage = {
        sender: 'You',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
    };

    conversation.messages.push(newMessage);

    // Clear input
    messageInput.innerHTML = '';

    // Disable send button
    const sendButton = document.querySelector('.btn-send');
    if (sendButton) sendButton.disabled = true;

    // Re-render messages
    loadConversation(activeConversation);

    // Scroll to bottom
    const messageContainer = document.querySelector('.message-view__content');
    if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Update conversation preview in left panel
    updateConversationPreview(activeConversation, newMessage.text, newMessage.time);
}

// Update conversation preview
function updateConversationPreview(conversationKey, lastMessage, time) {
    const conversationItems = document.querySelectorAll('.conversation-item');
    const conversationKeys = Object.keys(conversationData);
    const index = conversationKeys.indexOf(conversationKey);

    if (index >= 0 && conversationItems[index]) {
        const previewText = conversationItems[index].querySelector('.conversation-item__text');
        const previewTime = conversationItems[index].querySelector('.conversation-item__time');

        if (previewText) {
            previewText.textContent = lastMessage.substring(0, 50) + (lastMessage.length > 50 ? '...' : '');
        }
        if (previewTime) {
            previewTime.textContent = time;
        }
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// LinkedIn Messaging - Interactive Functionality
// Version 2.0.0

// Dummy conversation data
const conversationData = {
    'dhivya-vijayakumar': {
        name: 'Dhivya Vijayakumar',
        avatar: 'https://i.pravatar.cc/100?img=12',
        title: 'Product Manager at Google',
        messages: [
            { sender: 'Dhivya Vijayakumar', text: 'Hey! How have you been?', time: '2:15 PM', isMine: false },
            { sender: 'You', text: 'Hi Dhivya! Been great, just really busy with work lately. How about you?', time: '2:20 PM', isMine: true },
            { sender: 'Dhivya Vijayakumar', text: 'Same here! We should catch up soon. Are you free this week?', time: '2:25 PM', isMine: false },
            { sender: 'You', text: 'Hi Dhivya, sorry, it\'s been really busy 😔 - working on a big launch. Maybe next week?', time: 'Nov 27', isMine: true }
        ]
    },
    'joe-battinieri': {
        name: 'Joe Battinieri',
        avatar: 'https://i.pravatar.cc/100?img=32',
        title: 'Strategic Talent Acquisition | Executive Search | Full Lifecycle...',
        company: 'calendly.com',
        messages: [
            { sender: 'Joe Battinieri', text: 'Hi! I have an exciting opportunity for a Sr Product Manager role at Best Buy that I think would be perfect for you.', time: '1:45 PM', isMine: false },
            { sender: 'You', text: 'Hi Joe, thanks for reaching out! I\'d be interested to learn more.', time: '2:00 PM', isMine: true },
            { sender: 'Joe Battinieri', text: 'Great! Here\'s a link to schedule a call: calendly.com/joe-interview', time: '2:10 PM', isMine: false },
            { sender: 'You', text: 'Thank you for sharing the link. I have scheduled time to discuss the Sr. Product Manager role on Tuesday, December 4th, from 9:00 AM to 9:30 AM PST.', time: '2:38 PM', isMine: true }
        ]
    },
    'roanic-levy': {
        name: 'Roanic Levy',
        avatar: 'https://i.pravatar.cc/100?img=47',
        title: 'Financial Services Professional',
        messages: [
            { sender: 'Roanic Levy', text: 'Sponsored · A Job Guide from Financial Services - Available now for qualified candidates.', time: 'Nov 24', isMine: false }
        ]
    },
    'jeff-cheng': {
        name: 'Jeff Cheng',
        avatar: 'https://i.pravatar.cc/100?img=58',
        title: 'Senior Product Manager at Amazon',
        messages: [
            { sender: 'Jeff Cheng', text: 'Hey! Long time no talk. How\'s everything going?', time: '10:30 AM', isMine: false },
            { sender: 'You', text: 'Hey Jeff! Everything is great. Just closed a big project last week.', time: '11:00 AM', isMine: true },
            { sender: 'Jeff Cheng', text: 'That\'s awesome! We should grab coffee sometime.', time: '11:15 AM', isMine: false },
            { sender: 'You', text: 'Hi Jeff, Thank you for the quick response. I just checked my calendar - I\'m free Thursday afternoon if that works?', time: 'Nov 23', isMine: true }
        ]
    },
    'jacob-baraki': {
        name: 'Jacob Baraki',
        avatar: 'https://i.pravatar.cc/100?img=63',
        title: 'Recruiter at DoorDash',
        messages: [
            { sender: 'Jacob Baraki', text: '🚀 DoorDash | 2026 🚀 Hiring Batch - Product Managers needed! Are you interested in learning more?', time: 'Nov 21', isMine: false }
        ]
    },
    'jonathan-summers': {
        name: 'Jonathan Summers',
        avatar: 'https://i.pravatar.cc/100?img=68',
        title: 'Growth Lead at Startup Inc.',
        messages: [
            { sender: 'Jonathan Summers', text: 'InMail · Help Us Scale Expert Growth 🚀 - We\'re looking for talented product leaders.', time: 'Nov 21', isMine: false }
        ]
    },
    'bipin-gowda': {
        name: 'Bipin Gowda',
        avatar: 'https://i.pravatar.cc/100?img=12',
        title: 'Software Engineer at Meta',
        messages: [
            { sender: 'Bipin Gowda', text: 'Hope you\'re doing well!', time: 'Nov 19', isMine: false }
        ]
    }
};

// Current active conversation
let activeConversation = 'joe-battinieri';

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
                sendButton.disabled = messageInput.value.trim() === '';
            }
        });

        messageInput.addEventListener('keypress', (e) => {
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
    document.querySelectorAll('.pill').forEach(item => {
        item.classList.remove('pill--active');
    });

    // Add active class to clicked item
    clickedItem.classList.add('pill--active');

    // Update active conversation
    activeConversation = conversationKey;

    // Load conversation messages
    loadConversation(conversationKey);
}

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

    messageContainer.innerHTML = conversation.messages.map(msg => {
        if (msg.isMine) {
            return `
        <div class="message message--mine">
          <img src="https://i.pravatar.cc/100?img=14" alt="You" class="message__avatar">
          <div class="message__content">
            <div class="message__header">
              <span class="message__sender">${msg.sender}</span>
              <span class="message__time">${msg.time}</span>
            </div>
            <div class="message__text">
              <p>${msg.text}</p>
            </div>
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
            <div class="message__text">
              <p>${msg.text}</p>
            </div>
          </div>
        </div>
      `;
        }
    }).join('');

    // Scroll to bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Send a new message
function sendMessage() {
    const messageInput = document.querySelector('.message-view__input');
    if (!messageInput) return;

    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const conversation = conversationData[activeConversation];
    if (!conversation) return;

    // Get current time
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    // Add message to conversation data
    conversation.messages.push({
        sender: 'You',
        text: messageText,
        time: time,
        isMine: true
    });

    // Clear input
    messageInput.value = '';

    // Reload conversation to show new message
    loadConversation(activeConversation);

    // Update conversation preview in left panel
    updateConversationPreview(activeConversation, messageText, time);
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

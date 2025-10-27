// OpenAI Configuration
const OpenAIConfig = {
    apiKey: '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',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo'
};

// Function to call OpenAI API with fallback
async function callOpenAI(message, context = '') {
    const systemPrompt = `You are an AI assistant for "Binni the Library", a smart library management system. You help users with:
- Searching for books
- Getting recommendations
- Answering library-related questions
- Providing information about available books and services

Available book genres: Computer Science, Literature, Mathematics, Economics, Chemistry
User roles: Students, Faculty, Librarians

Be helpful, friendly, and informative. Keep responses concise but informative.

${context}`;

    try {
        console.log('Attempting OpenAI API call...');
        // Try direct API call first
        const response = await fetch(OpenAIConfig.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OpenAIConfig.apiKey}`
            },
            body: JSON.stringify({
                model: OpenAIConfig.model,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        console.log('OpenAI response status:', response.status);

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('OpenAI response data:', data);
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API call failed:', error);
        console.log('Using fallback response for message:', message);
        // Use fallback responses instead of generic error
        return generateFallbackResponse(message, context);
    }
}

// Fallback response generator for when OpenAI API is unavailable
function generateFallbackResponse(message, context = '') {
    const lowerMessage = message.toLowerCase();

    // Extract context information
    const hasUser = context.includes('Current user:');
    const userMatch = context.match(/Current user: ([^(]+) \(([^)]+)\)/);
    const userName = userMatch ? userMatch[1] : 'there';
    const userRole = userMatch ? userMatch[2] : 'user';

    const bookMatch = context.match(/Library has (\d+) total books, (\d+) currently available/);
    const totalBooks = bookMatch ? bookMatch[1] : 'many';
    const availableBooks = bookMatch ? bookMatch[2] : 'several';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return `Hello ${userName}! I'm your AI library assistant. We have ${totalBooks} books in our collection with ${availableBooks} currently available. How can I help you today?`;
    }

    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('book')) {
        if (lowerMessage.includes('computer') || lowerMessage.includes('programming')) {
            return `I'd recommend checking out "Introduction to Algorithms" by Thomas H. Cormen or "Clean Code" by Robert C. Martin. Both are excellent Computer Science books currently in our collection. Would you like me to help you request one?`;
        }
        if (lowerMessage.includes('math')) {
            return `For Mathematics, we have "Calculus: Early Transcendentals" by James Stewart. It's a comprehensive textbook covering calculus fundamentals.`;
        }
        return `I can help you search our collection! We have books in Computer Science, Literature, Mathematics, Economics, and Chemistry. What type of book are you looking for?`;
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
        if (userRole === 'student') {
            return `As a student, I'd recommend starting with "Introduction to Algorithms" for Computer Science or "Calculus: Early Transcendentals" for Mathematics. Both are highly rated and available in our digital collection.`;
        }
        if (userRole === 'faculty') {
            return `For faculty members, you might be interested in "Artificial Intelligence: A Modern Approach" or "Principles of Economics". You also have upload privileges for adding new materials.`;
        }
        return `Based on our collection, I recommend "Clean Code" by Robert C. Martin for software development best practices, or "The Great Gatsby" for classic literature. What are your interests?`;
    }

    if (lowerMessage.includes('available') || lowerMessage.includes('status')) {
        return `We currently have ${availableBooks} books available out of ${totalBooks} total. Our collection includes digital and physical books across multiple genres. Would you like me to check availability for a specific book?`;
    }

    if (lowerMessage.includes('issue') || lowerMessage.includes('borrow') || lowerMessage.includes('request')) {
        return `To issue a book, browse our catalog and click "Request" on any available book. As a ${userRole}, you can request books and they'll be approved by our librarian. Due dates are typically 14 days from issue.`;
    }

    if (lowerMessage.includes('return') || lowerMessage.includes('due')) {
        return `Books are typically due 14 days after issue. You can check your issued books in the "My Books" section. Late returns may incur fines.`;
    }

    if (lowerMessage.includes('upload') || lowerMessage.includes('add')) {
        if (userRole === 'faculty' || userRole === 'librarian') {
            return `As a ${userRole}, you have permission to upload new books. Go to the "Upload" section in your dashboard to add PDFs and book information to our digital repository.`;
        } else {
            return `Only faculty and librarians can upload books. If you have materials to suggest, please contact a librarian.`;
        }
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
        return `I can help you search for books, get recommendations based on your interests, check book availability, explain library policies, and answer questions about our services. What would you like to know?`;
    }

    // Default response
    return `I'm here to help with your library needs! I can assist with book searches, recommendations, checking availability, and answering questions about our services. What would you like to know about our ${totalBooks} books?`;
}

// Export for use in other files
window.OpenAIConfig = { callOpenAI };

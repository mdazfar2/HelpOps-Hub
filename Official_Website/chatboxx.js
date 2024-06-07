const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message

const inputInitHeight = chatInput.scrollHeight;

const predefinedAnswers = {
    "What is HelpOps-Hub?": "HelpOps-Hub is an open-source, community-driven repository designed to support and enhance DevOps practices. It serves as a comprehensive, centralized resource aimed at helping DevOps professionals and teams optimize their workflows, stay updated with the latest tools and trends, and implement best practices effectively.",
    "What is the mission of HelpOps-Hub?": "Our mission is to create an all-encompassing resource that empowers DevOps practitioners to achieve higher efficiency, reliability, and performance in their operations. We strive to build a dynamic, ever-evolving repository that reflects the latest advancements in DevOps, driven by the collective knowledge and experience of our community.",
    "What are the benefits of using HelpOps-Hub?": "HelpOps-Hub offers several benefits, including a unified knowledge base that centralizes valuable DevOps resources, enhanced learning opportunities for continuous skill development, and streamlined practices to help teams implement best practices efficiently, reducing errors and improving reliability.",
    "How can I contribute to HelpOps-Hub?": "You can contribute to HelpOps-Hub by sharing your knowledge and experience in DevOps, adding resources, participating in discussions, and helping to keep the repository up-to-date with the latest trends and tools. Visit our contribution page to learn more about how you can get involved.",
    "How do I access the resources on HelpOps-Hub?": "Accessing resources on HelpOps-Hub is simple. Visit our website, browse through the various categories and topics, and explore the wealth of information available. You can also use our search feature to find specific resources quickly.",
    "What types of resources are available on HelpOps-Hub?": "HelpOps-Hub offers a wide range of resources, including articles, tutorials, tool recommendations, best practice guides, case studies, and community discussions. These resources cover various aspects of DevOps to help professionals at all levels enhance their skills and knowledge.",
    "How can HelpOps-Hub support my learning and development in DevOps?": "HelpOps-Hub supports your learning and development by providing access to high-quality resources and a community of experienced professionals. Whether you are a beginner or an experienced DevOps practitioner, you can find valuable information and support to help you grow your skills.",
    "Is HelpOps-Hub free to use?": "Yes, HelpOps-Hub is completely free to use. Our goal is to make valuable DevOps resources accessible to everyone, fostering a community-driven approach to learning and collaboration.",
    
   
};

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    if (className === "question") {
        chatLi.style.cursor = "pointer";
      }
    return chatLi; // return chat <li> element
}


const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Check if the message matches a predefined question
    if (userMessage == "Hi" || userMessage == "hi" || userMessage == "HI")
        showQuestionList(); 
         else {
        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

function showWelcomeMessage() {
    const welcomeChatLi = createChatLi("Hi! Welcome to HelpOps-Hub! Chatbot. Say Hi to display menu.");
    chatbox.appendChild(welcomeChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }

  // Function to display list of questions
  function showQuestionList() {
    for (const question in predefinedAnswers) {
      const questionChatLi = createChatLi(question, "question");
      questionChatLi.addEventListener("click", () => showAnswer(question));
      questionChatLi.style.cursor = "pointer";
      chatbox.appendChild(questionChatLi);
    }
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }

  // Function to display answer based on clicked question
  function showAnswer(clickedQuestion) {
    const answer = predefinedAnswers[clickedQuestion];
    const answerChatLi = createChatLi(answer, "incoming");
    chatbox.appendChild(answerChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }

  // Call showWelcomeMessage and showQuestionList initially
  showWelcomeMessage();


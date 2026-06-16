# Capital Sin Chrome Extension

![Capital Sin Logo](icons/icon128.png)

**A powerful and private Chrome extension for exporting and managing your AI conversations across multiple platforms.**

[![GitHub license](https://img.shields.io/github/license/paglagpt/capitalSIN?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/paglagpt/capitalSIN?style=flat-square)](https://github.com/paglagpt/capitalSIN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/paglagpt/capitalSIN?style=flat-square)](https://github.com/paglagpt/capitalSIN/network/members)

## ✨ Features

Capital Sin provides a comprehensive suite of tools to manage your AI chat interactions:

*   **Multi-Platform Compatibility**: Seamlessly export conversations from a wide range of AI platforms, including:
    *   ChatGPT (chatgpt.com)
    *   Grok (grok.com)
    *   Gemini (gemini.google.com)
    *   Google AI Studio (aistudio.google.com)
    *   Qwen (qwen.ai / chat.qwenlm.ai)
    *   DeepSeek (chat.deepseek.com)
    *   Z.ai (z.ai)
    *   MiniMax (hailuoai.com)
    *   Xiaomi Mimo (mimo.mi.com)
    *   LibreChat (generic support for common self-hosted patterns)
    *   TogetherChat (chat.together.ai)

*   **Flexible Export Options**:
    *   **Local Downloads**: Export conversations as HTML, Markdown, PDF, and Microsoft Word (.doc) files.
    *   **Cloud Integration**: Direct export capabilities to Notion and Google Drive for enhanced organization and sharing.

*   **Advanced Customization**:
    *   **Participant Renaming**: Personalize your chat exports by renaming AI models and user names.
    *   **Visual Enhancements**: Add custom header and footer images to your exported documents.
    *   **Message Editing**: Modify individual message content and timestamps before export.

*   **AI Agent (Gemini Integration)**:
    *   Leverage the power of Gemini for optional AI-powered analysis directly within the extension.
    *   **Summarize**: Get quick overviews of lengthy conversations.
    *   **Analyze**: Gain insights into sentiment, key trends, and topics.
    *   **Rewrite**: Rephrase conversations for clarity and conciseness.
    *   **Custom Prompts**: Define your own AI tasks for tailored analysis.

*   **Screenshot Functionality**: Capture full-page screenshots of your chat interfaces for visual documentation.

*   **Privacy-First Approach**: All processing is local and nothing is sent to external APIs unless explicitly opted in. No analytics, telemetry, or data leakage.

## 🚀 Setup Instructions

### Prerequisites

*   Google Chrome browser
*   (Optional) Notion integration token: [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
*   (Optional) Gemini API key: [https://makersuite.google.com/](https://makersuite.google.com/)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/paglagpt/capitalSIN.git
    cd capitalSIN
    ```

2.  **Load as Chrome Extension**:

    *   Open `chrome://extensions/` in your Chrome browser.
    *   Enable **Developer mode** (toggle switch in the top right corner).
    *   Click **Load unpacked**.
    *   Select the `capitalSIN` folder that you cloned.

3.  **Configure (Optional)**:

    *   Click the **Capital Sin** icon in your Chrome toolbar.
    *   Enter your Notion integration token for Notion exports.
    *   Provide your Gemini API key for AI analysis features.

### First Run

1.  Navigate to any supported AI chat platform (e.g., [TogetherChat](https://chat.together.ai/)).
2.  Engage in a conversation.
3.  Click the **Capital Sin** extension icon in your Chrome toolbar.
4.  Customize participant names or add images if desired.
5.  Choose your preferred export format (HTML, Markdown, PDF, DOC) or export directly to Notion/Google Drive.

## ⚙️ Configuration

### Notion Setup

1.  Visit [Notion My Integrations](https://www.notion.so/my-integrations).
2.  Create a new integration and copy the integration token.
3.  Paste the token into the **Capital Sin** popup under "Notion Token".
4.  (Optional) Add a Notion Database ID to export to a specific database.

### Gemini Setup

1.  Visit [Google AI Studio](https://makersuite.google.com/).
2.  Create an API key.
3.  Paste the API key into the **Capital Sin** popup under "Gemini API Key".
4.  Choose your desired Gemini model and task, then click "Run Gemini".

## 🔒 Privacy & Security

*   **No Analytics**: We do not collect any usage data, telemetry, or analytics.
*   **No Data Leakage**: All conversation processing occurs locally on your machine.
*   **API Keys**: Your API keys are not stored persistently; they are kept in memory only during active use.
*   **User Control**: Data is only sent to Notion or Gemini if you explicitly choose to use their export or analysis features.
*   **Open Source**: The entire codebase is open for audit, ensuring transparency and trust.

## 📂 File Structure

```
capitalSIN/
├── README.md                    # Project overview and documentation
├── manifest.json               # Chrome extension manifest file
├── background.js               # Background service worker for event handling
├── content.js                  # Content script for DOM extraction from chat platforms
├── popup.html                  # User interface for the extension popup
├── popup.js                    # Logic and event handlers for the popup UI
├── style.css                   # Styling for the extension popup
├── notion_api.js              # Integration logic for Notion API
├── libs/
│   └── html2pdf.bundle.min.js # Library for PDF export functionality
├── icons/
│   └── icon128.png            # Extension icon (128x128 pixels)
└── LICENSE                     # MIT License details
```

## 🛠️ Development & Customization

### Adding New Platforms

To extend support for additional AI chat platforms:

1.  Update `manifest.json` with the new platform's `host_permissions`.
2.  Implement platform-specific DOM selectors and extraction logic within `content.js`.
3.  (Optional) Update `popup.html` if platform-specific UI elements are required.

### Modifying DOM Selectors

If a supported platform changes its DOM structure, update the relevant selectors in `content.js`:

```javascript
const chatBubbles = document.querySelectorAll(".your-new-selector");
```

### Adding More Gemini Tasks

To introduce new Gemini-powered analysis tasks:

1.  Extend `popup.html` with new options in the Gemini task dropdown.
2.  Add corresponding logic to `popup.js` to handle the new task and construct the appropriate prompt.

## ❓ Troubleshooting

### Extension Not Showing?

*   Reload your Chrome browser.
*   Check `chrome://extensions/` for any errors related to **Capital Sin**.
*   Ensure **Capital Sin** is enabled in your extensions list.

### Chat Not Extracting?

*   Open Developer Tools (F12) on the AI chat page.
*   Inspect the chat message elements to identify current DOM selectors.
*   Update the selectors in `content.js` to match the platform's current structure.

### Notion Export Failing?

*   Verify that your Notion integration token is correct and active.
*   Confirm the Notion Database ID (if used) is valid (32 characters or UUID format).
*   Ensure your Notion integration has the necessary permissions to access the target database or page.

### Gemini Not Responding?

*   Verify that your Gemini API key is valid and correctly entered.
*   Check for any rate limits on your Gemini API usage (free tiers may have restrictions).
*   Try a simpler prompt to rule out complexity issues.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

## 📝 Notes

*   This extension is intended **for private personal use only**.
*   It is not designed or intended for public distribution or marketplace listing.
*   You are solely responsible for the management and security of your API keys and credentials.
*   Please ensure compliance with the terms of service of any AI platform you use with this extension.

## 💬 Support & Feedback

For any issues, suggestions, or contributions, please refer to the GitHub repository. Feel free to modify the code to suit your specific needs.

**Last updated**: June 2026

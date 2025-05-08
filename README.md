# Ask Earth 🌍

> Ask questions about the world — this AI map shows you where and why, with satellite views and smart captions.

## What It Does
This web app combines natural language processing with real-world geolocation. You ask a question, and it responds with:
- A **relevant location**
- A **global topic** (e.g. flooding, tourism)
- A **caption or insight**
- A live **Google Map pin** based on the response

Examples:
- “Where should I go hiking in June?”
- “What places are at risk of flooding?”
- "Where are fintech companies transforming rural economies?"

Every answer is unique and geospatially visualized on a map.

---

## 🛠 Tech Stack
| Layer        | Tooling                        |
|--------------|--------------------------------|
| Frontend     | HTML, Vanilla JS, CSS          |
| AI Backend   | OpenAI GPT-4 API               |
| Maps         | Google Maps + OpenStreetMap    |
| Geocoding    | Nominatim (OpenStreetMap API)  |

---

## ⚙️ Configuration

Before running, you must insert your own OpenAI API key in `openai.js`:

```js
// openai.js
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";
```

## Ideas for Next Steps
- **Conversational memory**: Let users ask follow-up questions and refine results through an ongoing dialogue.
- **Multi-domain support**: Expand system prompts to guide research across diverse themes like travel planning, climate risk, economic development, and more.
- **Result threading**: Tie follow-up responses back to previous ones — e.g., “show me nearby places less affected by flooding.”
- **User history + bookmarks**: Save past searches and locations for reuse or comparison.
- **Topic-aware insights**: Tailor responses not just by location, but also by intent — e.g., forecast future trends, assess opportunity zones, or analyze ecological health.
- **Exportable reports**: Let users generate PDFs, maps, or JSON exports to share or integrate into research workflows.

## 📄 License
MIT — free to fork, adapt, and build on.

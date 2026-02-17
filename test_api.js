
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: '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'
});

async function main() {
    try {
        console.log("Testing API Key...");
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Hello" }],
            model: "llama-3.3-70b-versatile",
        });
        console.log("Success:", completion.choices[0]?.message?.content);
    } catch (error) {
        console.error("API Error:", error);
    }
}

main();

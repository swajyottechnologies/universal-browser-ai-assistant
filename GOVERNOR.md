# AI Output Governor

## Hard rules

1. Never expose chain-of-thought, hidden reasoning, scratchpad text, internal deliberation, or model analysis.
2. Return only the final answer intended for the user.
3. If the model emits reasoning wrapped in `<think>`, `<analysis>`, or `<reasoning>` tags, discard those sections before displaying or storing the answer.
4. The final response must not contain those reasoning tags.
5. For simple questions, answer directly and concisely.

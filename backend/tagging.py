import openai
import os

openai.api_key = os.environ.get("OPENAI_API")


def tag_chat(chat: str):
    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Generate one tag for this text:\n\n{chat}",
            temperature=0.5,
            max_tokens=60,
            top_p=1.0,
            frequency_penalty=0.8,
            presence_penalty=0.0
        )
    except:
        return "Error"
    text_response = response["choices"][0]["text"]
    tag = text_response.split("#")[-1]
    return tag
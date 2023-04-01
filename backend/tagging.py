

import openai


openai.api_key = "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"

if __name__ == "__main__":
    response = openai.Completion.create(
      model="text-davinci-003",
      prompt="Generate 3 tags for this text:\nMachine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications",
      temperature=0.2,
      max_tokens=60,
      top_p=1.0,
      frequency_penalty=0.8,
      presence_penalty=0.0
    )
    text_response = response["choices"][0]["text"]

    print(text_response)
    tags = text_response.split("#")
    tags = tags[-3:]
    print(tags)

def tag_chat(chat: str):
    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Generate a maximum of 3 tags for this text:\n\n{chat}",
            temperature=0.5,
            max_tokens=60,
            top_p=1.0,
            frequency_penalty=0.8,
            presence_penalty=0.0
        )
    except:
        return "Error"
    text_response = response["choices"][0]["text"]
    tags = text_response.split("#")[-3:]
    return tags



import pandas as pd
import json

df = pd.read_excel("英単語.xlsx")

words = []

for index, row in df.iterrows():
    words.append({
        "id": index + 1,
        "word": row["word"],
        "meaning": row["meaning"],
        "example": row["example"],
        "translation": row["translation"]
    })

with open("words.json", "w", encoding="utf-8") as f:
    json.dump(words, f, ensure_ascii=False, indent=2)
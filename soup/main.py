from flask import Flask, request
from bs4 import BeautifulSoup
import requests
import re

app = Flask(__name__)


def add_delimiter(words: list, delimiter='.', new_words=[]):
    try:
        del_index = words.index(delimiter)
        prev_text = words[del_index - 1]
        words[del_index - 1] = prev_text + delimiter
        words.remove(del_index)

    except Exception as e:
        return new_words
    return add_delimiter


def get_recipe_contents(url: str):
    resp = requests.get(url)
    content = resp.content
    soup = BeautifulSoup(content, 'html.parser')
    recipe = []
    for p in soup.find_all('p'):
        text = p.get_text(" ", strip=True)
        split_text = re.split('(\.)+', text)  # split by .
        add_delimiter()
        recipe.append(split_text)

    return {
        "title": soup.title.get_text(),
        "recipe": recipe
    }


@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == 'POST':
        url = request.json['url']
        return get_recipe_contents(url)
    else:
        return 'Going to get em'

from flask import Flask, render_template, request, redirect
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html', code='up up down down left right left right')

@app.route('/submit_code', methods=['POST'])
def test():
    return "The lockbox is abg"

if __name__ == '__main__':
    app.run(threaded=True, port=5000)

from flask import Flask, render_template, request, redirect
import os

app = Flask(__name__)

CODE = os.getenv('CODE')
LOCKBOX = os.getenv('LOCKBOX', "")
NUM_INPUT = 8
DIRECTIONS = ['up', 'down', 'left', 'right']

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/check_code', methods=['POST'])
def check_code():
    if request.form['code'] == CODE:
        return { 'res': "The lockbox is " + LOCKBOX }
    else:
        return { 'res': None }

if __name__ == '__main__':
    app.run(threaded=True, port=5000)

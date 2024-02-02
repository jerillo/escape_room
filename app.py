from flask import Flask, render_template, request, redirect
import os

app = Flask(__name__)

CODE = os.getenv('CODE')
LOCKBOX = os.getenv('LOCKBOX')
NUM_INPUT = 8
DIRECTIONS = ['up', 'down', 'left', 'right']

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/submit_code', methods=['POST'])
def test():
    return "The lockbox is " + LOCKBOX

@app.route('/input', methods=['POST'])
def input():
    # Get input
    direction = request.form['direction']
    pos = int(request.form['pos'])
    inputted = request.form['inputted']

    # If input is not an arrowkey, skip
    if direction not in DIRECTIONS:
        return
    
    inputted += direction
    
    activateCheats = False
    if pos <= NUM_INPUT - 1:
        if pos < NUM_INPUT - 1:
            inputted += ' '
        else:
            if inputted == CODE:
                activateCheats = True
        pos += 1       
    else:
        pos = 0
        inputted = ""
         
    return {
        'pos': pos,
        'inputted': inputted,
        'activateCheats': activateCheats
    }

if __name__ == '__main__':
    app.run(threaded=True, port=5000)

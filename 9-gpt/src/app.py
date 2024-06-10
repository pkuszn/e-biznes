from flask import Flask, abort, jsonify, render_template, request
from bot import send_request
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        result = send_request(request.form)
        return render_template('index.html', result=result)
    return render_template('index.html', result=None)

@app.route('/send', methods=['POST'])
def send():
    if not request.is_json:
        abort(400, description="Invalid input: Expected JSON")
    request_data = request.get_json()
    if request_data is None:
        abort(400, description="Invalid input: JSON payload is missing")
    
    response = send_request(request_data)
    
    if not response:
        abort(500, description="Error processing request")
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained models from pickle files
models = {}
tags = ['Array', 'Matrix', 'String', 'Searching & Sorting', 'LinkedList', 'Binary Trees', 'Binary Search Trees',
        'Greedy', 'BackTracking', 'Stacks & Queues', 'Heap', 'Graph', 'Trie', 'Dynamic Programming', 'Bit Manipulation']
for tag in tags:
    filename = tag + '.pkl'
    with open(filename, 'rb') as f:
        models[tag] = pickle.load(f)


@app.route('/', methods=['GET'])
def default():
    return jsonify("ml is up")
@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON data from the request
    data = request.get_json()

    # Make predictions using the trained models
    predictions = {}
    for tag in tags:
        X = np.array([data["totalQuestionsPerTag"][tag]]).reshape(-1, 1)
        predictions[tag] = float(models[tag].predict(X))

    # Return the predictions in JSON format
    return jsonify(predictions)


if __name__ == '__main__':
    app.run(debug=True)

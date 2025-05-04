
from flask import Flask, request, jsonify, send_from_directory
app = Flask(__name__)

routines_by_days = {
    2: ["Día 1: Full Body", "Día 2: Cardio + Core"],
    3: ["Día 1: Push", "Día 2: Pull", "Día 3: Piernas + Core"],
    4: ["Día 1: Tren superior", "Día 2: Piernas", "Día 3: Core + Cardio", "Día 4: Full Body"],
    5: ["Día 1: Pecho", "Día 2: Espalda", "Día 3: Piernas", "Día 4: Hombros y brazos", "Día 5: Cardio + Core"]
}

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    days = data.get("days", 3)
    routine = "\n".join(routines_by_days.get(days, routines_by_days[3]))
    return jsonify({"routine": routine})

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('', path)

if __name__ == "__main__":
    app.run(debug=True)

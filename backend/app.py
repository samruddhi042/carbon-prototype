from flask import Flask, request, jsonify
from flask_cors import CORS
from model import db, EmissionRecord

app = Flask(__name__)
CORS(app)

# --- config ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emissions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Emission factors
EF_DIESEL = 2.68      # kg CO2 per liter
EF_ELECTRICITY = 0.82 # kg CO2 per kWh

# Create tables immediately
with app.app_context():
    db.create_all()

@app.route('/calculate', methods=['POST'])
def calculate_emissions():
    data = request.json or {}
    diesel = float(data.get('diesel', 0))
    electricity = float(data.get('electricity', 0))
    coal = float(data.get('coal', 0))

    scope1 = diesel * EF_DIESEL
    scope2 = electricity * EF_ELECTRICITY
    total_emissions = scope1 + scope2

    recommendations = []
    if diesel > 1000:
        recommendations.append("Consider fuel efficiency improvements or EV trucks.")
    if electricity > 5000:
        recommendations.append("Integrate renewable energy sources like solar panels.")

    # save to DB
    record = EmissionRecord(
        diesel=diesel,
        electricity=electricity,
        coal=coal,
        scope1=round(scope1,2),
        scope2=round(scope2,2),
        total=round(total_emissions,2)
    )
    db.session.add(record)
    db.session.commit()

    return jsonify({
        'scope1': round(scope1,2),
        'scope2': round(scope2,2),
        'total': round(total_emissions,2),
        'recommendations': recommendations,
        'record_id': record.id
    })

@app.route('/records', methods=['GET'])
def list_records():
    records = EmissionRecord.query.order_by(EmissionRecord.timestamp.desc()).limit(100).all()
    out = []
    for r in records:
        out.append({
            'id': r.id,
            'diesel': r.diesel,
            'electricity': r.electricity,
            'coal': r.coal,
            'scope1': r.scope1,
            'scope2': r.scope2,
            'total': r.total,
            'timestamp': r.timestamp.isoformat()
        })
    return jsonify(out)

if __name__ == '__main__':
    app.run(debug=True)

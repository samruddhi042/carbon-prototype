from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class EmissionRecord(db.Model):
    __tablename__ = "emission_records"
    id = db.Column(db.Integer, primary_key=True)
    diesel = db.Column(db.Float, nullable=False)
    electricity = db.Column(db.Float, nullable=False)
    coal = db.Column(db.Float, nullable=True)
    scope1 = db.Column(db.Float)
    scope2 = db.Column(db.Float)
    total = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, server_default=db.func.current_timestamp())

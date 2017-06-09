from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin


app = Flask(__name__)

app.config.from_pyfile('appconfig.cfg')

db = SQLAlchemy(app)

cors = CORS(app)

from ExpenseTracker.api.routes import mod


@app.route('/', methods=['GET'])
def index():
    html_content = """
        <h2> Expense Tracker Api Docs</h2>
        <ul>
            <li>GET /api/expenses/: Returns all Expenses</li>
            <li>GET /api/expenses/<id>: Returns a single expense from the database</li>
            <li>POST /api/expenses: Returns the ID of a newly created expense</li>
            <li>PATCH /api/expenses/<id>: Returns the ID of the updated expense</li>
            <li>DELETE: /api/expenses/<id>: Deletes the specified expense from the database</li>
        </ul>
    """
    return html_content

app.register_blueprint(api.routes.mod, url_prefix='/api')

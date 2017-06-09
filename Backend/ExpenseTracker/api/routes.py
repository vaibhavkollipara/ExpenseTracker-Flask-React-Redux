from flask import Blueprint, jsonify, request, make_response, abort
from .. import db
from ..models import Item
from datetime import datetime

mod = Blueprint('api', __name__)


@mod.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@mod.route('/expenses/', methods=['GET'])
def get_expenses():
    return jsonify({'result': [i.serialize for i in Item.query.order_by(Item.purchase_date.desc()).all()]})


@mod.route('/expenses/<int:id>/', methods=['GET'])
def get_expense(id):
    try:
        item = Item.query.get(id)
        return jsonify({'result': item.serialize})
    except Exception, e:
        abort(404)


@mod.route('/expenses/<int:id>/', methods=['PATCH'])
def update_expense(id):
    try:
        item = Item.query.get(id)
        if request.json.get('name'):
            item.name = request.json.get('name')
        if request.json.get('cost'):
            item.cost = request.json.get('cost')
        if request.json.get('purchase_date'):
            dt_obj = datetime.strptime(request.json.get('purchase_date'), "%Y-%m-%d")
            item.purchase_date = dt_obj.date()
        db.session.commit()
        return jsonify({'result': {"id": item.id}})
    except Exception, e:
        return jsonify({'error': "Internal Error"}), 500


@mod.route('/expenses/', methods=['POST'])
def create_expense():
    try:
        dt_obj = datetime.strptime(request.json.get('purchase_date'), "%Y-%m-%d")
        item = Item(name=request.json.get('name'), cost=request.json.get('cost'), purchase_date=dt_obj.date())
        db.session.add(item)
        db.session.commit()
        return jsonify({'result': {"id": item.id}}), 201
    except Exception, e:
        abort(404)


@mod.route('/expenses/<int:id>/', methods=['DELETE'])
def delete_expense(id):
    try:
        db.session.delete(Item.query.get(id))
        db.session.commit()
        return jsonify({'result': True}), 200
    except Exception, e:
        return jsonify({'error': str(e)}), 400

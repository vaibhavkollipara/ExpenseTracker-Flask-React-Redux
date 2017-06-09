from . import db


class Item(db.Model):
    __tablename__ = 'Item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(length=20))
    cost = db.Column(db.Numeric(5, 2))
    purchase_date = db.Column(db.Date())

    def __init__(self, name, cost, purchase_date):
        self.name = name
        self.cost = cost
        self.purchase_date = purchase_date

    def __unicode__(self):
        return "{} : {}".format(self.name, self.cost)

    def __repr__(self):
        return "Item(name=\"{}\", cost={}, purchase_date={})".format(self.name, self.cost, self.purchase_date)

    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cost": str(self.cost),
            "purchase_date": self.purchase_date
        }

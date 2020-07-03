module.exports = function Cart(oldCart){
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0};
        }

        storedItem.qty++;
        this.totalQty++;
        this.totalPrice+= storedItem.item.price;
    };

    this.genArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        };
        return arr;
    }

    this.genPaypalArray = function() {
        var arr = [];
        for (var id in this.items) {
            var item = this.items[id];
            var arrItem = {
                name: item.item.name.toString(),
                unit_amount: {
                    currency_code: "USD",
                    unit_amount: Number(item.item.price).toFixed(2),
                },
                quantity: item.qty.toString(),
                category: "PHYSICAL_GOODS",
            };

            arr.push(arrItem);
        }
        return arr;
        
    }
};
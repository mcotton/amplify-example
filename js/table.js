
var TABLE = {
    proto : {
        init : function (el) {
            this.element = $(el).find('tbody');
        },
        add: function (arr) {
            var row = $('<tr>').html(function () {
                return $.map(arr, function (value) {
                    return '<td>' + value + '</td>';
                }).join('');
            });
            this.element.append(row);
        },
        load: function (rows, order) {
            for (var i = 0; rows[i]; i++ ) {
                this.add(rows[i]);
            }
            var fields = [];
            for (var j = 0; order[j]; j++) {
                fields.push(rows[i][order[j]]);
            }
                this.add(fields);
        },
        clear: function () {
            this.element.empty();
        }
    },
    create : function (el) {
        var table = Object.create(this.proto);
        table.init(el);
        return table;
    }
};


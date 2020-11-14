var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// schema definiuje wygląd wpisu do bazy
var newsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Pole tytuł jest wymagane']
    }, //required oznacza że dany wpis jest wymagany
    description: {
        type: String,
        required: [true, 'Pole opis jest wymagane']
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('News', newsSchema) // tu definiuje nazwe modelu do użycia w mongo db atlas 'News' i wskazuje co ma exportować
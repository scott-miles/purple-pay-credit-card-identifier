const { Client } = require('pg');
const client = new Client();
client.connect();


exports.getCardsWithoutTypeOrMerchant = function(next){
  client.query('SELECT id, card_no FROM cards WHERE merchant IS NULL OR card_type IS NULL', (err, res) => {
    if (err) {
      console.log(err.stack);
      client.end();
    } else {
      if(res.rows.length == 0){
        console.log('No cards to update');
        client.end();
      }
      else {
        console.log('Cards to update: ' + res.rows.length);
        next (res.rows);
      }
    }
  })
}

exports.updateCards = function(cards){
  var counter = cards.length;

  cards.forEach( card => {
    const query = {
      text: "UPDATE cards SET merchant = $1, card_type = $2 WHERE id = $3",
      values: [card.merchant, card.card_type, card.id]
    }

    client.query(query, (err, res) => {{
      counter -= 1;
      if (err) {
        console.log(err.stack);
      } else
        if(counter == 0)
        {
          client.end();
          console.log('DONE');
        }
      }
    })
  })
}

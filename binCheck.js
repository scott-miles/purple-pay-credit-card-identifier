var request = require('request');

exports.check = function(cards, next){
  var counter = cards.length;

  cards.forEach( card => {
    bin = card.card_no.substring(0,6);

    request.get({
      url:'https://api.bincodes.com/bin/json/28803aae8f2da0394ceef3f3f38bd66c/' + bin,
      json: true },
      function (err, response, body) {
        if(err){
            console.log(err);
            return;
        }
        card.merchant = body.card.toLowerCase();
        card.card_type = body.type.toLowerCase();

        counter -= 1;

        if(counter == 0)
        {
          console.log(cards);
          next(cards);
        }
      }
    );
  })
}

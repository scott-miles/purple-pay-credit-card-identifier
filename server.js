var binCheck = require('./binCheck');
var cardRepository = require('./cardRepository');

cardRepository.getCardsWithoutTypeOrMerchant( cards => {
  cards = binCheck.check(cards,  updatedCards => {
    cardRepository.updateCards(updatedCards);
  }) ;
});

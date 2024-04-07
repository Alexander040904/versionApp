$(document).ready(function(){
  var zindex = 10;
  
  $("div.card").click(function(e){
    e.preventDefault();

    // Verificar si el elemento clickeado es la parte flap1
    if ($(e.target).closest('.card-flap.flap1').length > 0) {
      return; // Evitar que se realice cualquier acción adicional
    }
    
    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true
    }

    if ($("div.cards").hasClass("showing")) {
      // a card is already in view
      $("div.card.show")
        .removeClass("show");

      if (isShowing) {
        // this card was showing - reset the grid
        $("div.cards")
          .removeClass("showing");
      } else {
        // this card isn't showing - get in with it
        $(this)
          .css({zIndex: zindex})
          .addClass("show");

      }

      zindex++;

    } else {
      // no cards in view
      $("div.cards")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("show");

      zindex++;
    }
    if ($("div.cards").hasClass("showing")) {
      $('#btn-add').css('opacity', '0.5');
    } else {
      $('#btn-add').css('opacity', '1');
    }
    
  });
});

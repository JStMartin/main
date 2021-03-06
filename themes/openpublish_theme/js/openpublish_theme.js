/**
 * Implementation of Drupal behavior.
 */
Drupal.behaviors.openpublish = function(context) {
  
// Focus cursor into username field for login.
$('#edit-name').focus();

// http://cssbeauty.com/skillshare/discussion/1593/#Item_5
$(document).ready(function(){
  $("#add-this").fadeTo("100", 0.6);
  $("#add-this").hover(function(){
    $(this).fadeTo("400", 1.0);
  },function(){
    $(this).fadeTo("400", 0.6);
  });
});

// Iterate over all images in #op-content div (body and comments).
$('#op-content img').each(function(i) {
  
  // If it's likely a user editable image (has style attribute).
  if ($(this).attr("style")) {
    // Get the float from the style attribute or also unfortunately the stylesheet.
    var img_float = $(this).css("float");
    
    // Change CSS based on which float and if it has a caption.
    // Only downfall here is if you wanted to add custom margins via WYSIWYG, have to use !important.
    // Also if a system img uses a style attribute its margins are going to get clobbered.
    if (img_float == "left") {
      // If it has an image caption.
      if ($(this).parent().hasClass("image-caption-container")) {
        $(this).parent().css({
          'margin': '10px 25px 10px 0px',
          'clear': 'left'
          });
      } else {
        $(this).css({
          'margin': '10px 25px 10px 0px',
          'clear': 'left'
          });
      }
    }
  
    if (img_float == "right") {
      if ($(this).parent().hasClass("image-caption-container")) {
        $(this).parent().css({
          'margin': '10px 0px 10px 25px',
          'clear': 'right'
        });
      } else {
        $(this).css({
          'margin': '10px 0px 10px 25px',
          'clear': 'right'
        });
      }
    }
  }

});

};
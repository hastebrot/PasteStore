$(function() {
  var atPosition = function($element, position) {
    var top = $element[0] == window ? 0 : $element.position().top;
    var height = $element.height();
    if (position == "top") { return top; }
    if (position == "bottom") { return top + height; }
    throw "unknown position";
  };

  var alignAbsolutePosition = function($element, top, height) {
    $element.css("position", "absolute");
    $element.css("top", top);
    $element.css("height", height);
  };

  $(window).resize(function() {
    var $window = $(window);
    var $header = $("header");
    var $content = $("main");

    var topAnchor = atPosition($header, "bottom");
    var bottomAnchor = atPosition($window, "bottom");
    alignAbsolutePosition($content, topAnchor, bottomAnchor - topAnchor);
  });

  //$(window).trigger("resize");
});

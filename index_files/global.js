jQuery(document).ready(function($) {

             // Judge the browser
             var ms_ie = false;
             var ua = window.navigator.userAgent;
             var ie = ua.search(/(MSIE|Trident|Edge)/);
             if (ie > -1) {
               ms_ie = true;
         }  
         if ( ms_ie ) {
               document.documentElement.className += " ie";
         }

  //Masonry blocks
  $blocks = $(".posts");
  $blocks.imagesLoaded(function(){
    $blocks.masonry({
      itemSelector: '.post-container'
    });
    // Fade blocks in after images are ready (prevents jumping and re-rendering)
    $(".post-container").fadeIn();
  });
  $(document).ready( function() { setTimeout( function() { $blocks.masonry(); }, 500); });
  $(window).resize(function () {
    $blocks.masonry();
  });
  
  // Load Flexslider
  $(".flexslider").flexslider({
    animation: "slide",
    controlNav: true,
    prevText: "",
    nextText: "",
    smoothHeight: true   
  });
  
  // resize videos after container
  var vidSelector = ".post iframe, .post object, .post video, .widget-content iframe, .widget-content object, .widget-content iframe";  
  var resizeVideo = function(sSel) {
    $( sSel ).each(function() {
      var $video = $(this),
      $container = $video.parent(),
      iTargetWidth = $container.width();

      if ( !$video.attr("data-origwidth") ) {
        $video.attr("data-origwidth", $video.attr("width"));
        $video.attr("data-origheight", $video.attr("height"));
      }
      var ratio = iTargetWidth / $video.attr("data-origwidth");
      $video.css("width", iTargetWidth + "px");
      $video.css("height", ( $video.attr("data-origheight") * ratio ) + "px");
    });
  };
  resizeVideo(vidSelector);
  $(window).resize(function() {
    resizeVideo(vidSelector);
  });
  
  // Smooth scroll to header
  $('.tothetop').click(function(){
    $('html,body').animate({scrollTop: 0}, 500);
    $(this).unbind("mouseenter mouseleave");
    return false;
  });

      // image hover with text
      $(".hover").mouseleave(
           function() {
                $(this).removeClass("hover");
          });

      // Detect browser - objectFit support IE & Edge
      if('objectFit' in document.documentElement.style === false ) {
            var container = document.getElementsByClassName('imgfit');
            for(var i = 0; i < container.length; i++) {

                  var imageSource = container[i].querySelector('img').src;
                  container[i].querySelector('img').style.display = 'none';
                  container[i].style.backgroundSize = 'cover';
                  container[i].style.backgroundImage = 'url(' + imageSource + ')';
                  container[i].style.backgroundPosition = 'center center';
            }
      }
      else {
            console.log('No worries, your browser supports objectFit')
      }

      // Background color change
      var colors = new Array(
          [96,113,213],
          [84,72,189],
          [143,72,189],
          [189,72,177]);
      var step = 0;
      var colorIndices = [0,1,2,3];
      var gradientSpeed = 0.002;
      function updateGradient()
      {
          if ( $===undefined ) return;
          var c0_0 = colors[colorIndices[0]];
          var c0_1 = colors[colorIndices[1]];
          var c1_0 = colors[colorIndices[2]];
          var c1_1 = colors[colorIndices[3]];
          var istep = 1 - step;
          var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
          var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
          var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
          var color1 = "rgb("+r1+","+g1+","+b1+")";
          var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
          var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
          var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
          var color2 = "rgb("+r2+","+g2+","+b2+")";
          $('.bg-color').css({
               background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
               step += gradientSpeed;
               if ( step >= 1 )
               {
                    step %= 1;
                    colorIndices[0] = colorIndices[1];
                    colorIndices[2] = colorIndices[3];
                    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
              }}
              setInterval(updateGradient,10);

  // Isotope filtering
  jQuery( function() {
    var $container = jQuery('#portfolio');
    $container.imagesLoaded( function() {
        $container.isotope({
            itemSelector: '.portfolio-item',
            sortBy: 'date'
        });
    })
    $('#filters a').click(function(){
      var selector = $(this).attr('data-filter');
      $container.isotope({ filter: selector, animationEngine : "css" });
      $('#filters a.active').removeClass('active');
      $(this).addClass('active');
      return false;
    });
  });

});
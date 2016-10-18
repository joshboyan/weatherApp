function slideIn() {
	document.getElementById('mobileMenu').style.right="0";
}

function slideOut() {
	document.getElementById('mobileMenu').style.right="-120vw";
}

// The function actually applying the offset
function offsetAnchor() {
    if(location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 100);
    }
}

// This will capture hash changes while on the page
window.addEventListener("hashchange", offsetAnchor);

// This is here so that when you enter the page with a hash,
// it can provide the offset in that case too. Having a timeout
// seems necessary to allow the browser to jump to the anchor first.
window.setTimeout(offsetAnchor, 1); // The delay of 1 is arbitrary and may not always work right (although it did in my testing).

(function($) {
$(document).ready(function() {
	//Grab all the link elements in the secondary navigation aside
    var navChildren = $("aside li").children();
    var aArray = [];
    //Add each of the hrefs attributes to an array
    for (var i = 0; i < navChildren.length; i++) {
        var aChild = navChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    $(window).scroll(function() {
    	//Find browser window position on the page
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var secPosition = $(theID).offset().top;
            secPosition = secPosition - 185;
            var divHeight = $(theID).height();
            divHeight = divHeight + 90;
            //Change the class on the aside secondary navigation as we scroll through sections
            if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
                $("a[href='" + theID + "']").addClass("active");
            } else {
                $("a[href='" + theID + "']").removeClass("active");
                $("a[href='" + theID + "']:after").css({
                	background: '#000000'
                });
            }
        }
    });
 
});
})(jQuery);

$(function() {
  //Grab all page anchor links and on click...
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            //If we have a target
            if (target.length) {
            	//Animate the scrolling to the link
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
            }, 1000);
            return false;
            }
        }
    });
});

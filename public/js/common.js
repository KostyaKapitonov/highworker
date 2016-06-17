$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(document).ready(function(){
	// Промо-слайдер
	$(".Modern-Slider").slick({
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		dots: false,
		pauseOnDotsHover: true,
		cssEase: 'linear',
		fade: true,
		//   draggable: true,
		prevArrow: '<button class="PrevArrow"></button>',
		nextArrow: '<button class="NextArrow"></button>',
	});

	// Наши работы. слайдер
	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav',
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 600,
	});
	$('.slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 600,
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		prevArrow: '<button class="PrevArrow slick-arrow"><i class="icofont icofont-simple-left"></i></button>',
		nextArrow: '<button class="NextArrow slick-arrow"><i class="icofont icofont-simple-right"></i></button>',
	});


  //Форма заказать звонок в модальном окне
	$('.callme-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	//Плавающий маркер у меню
    $(".lavaLamp").lavaLamp({
        fx: "linear",
        speed: 300,
    });

    //Плавная прокрутка
    $("body").on('click', '[href*="#"]', function(e){
	  var fixed_offset = 220;
	  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
	  e.preventDefault();
	});
});

//Прилипающий хедер
$(window).scroll(function() {
	if ($(this).scrollTop() > 1){
		$('header').addClass("sticky");
	}
	else{
		$('header').removeClass("sticky");
	}
});

// RESPONSIVE MENU
$(window).load(function() {
    $('#mobnav-btn').click(
        function() {
            $('.nav').toggleClass("xactive");
        });
    $('.mobnav-subarrow').click(
        function() {
            $(this).parent().toggleClass("xpopdrop");
    });
});

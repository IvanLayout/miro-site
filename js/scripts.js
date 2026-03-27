// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {

	if ($('.main-slider').length) {
		new Swiper(".main-slider", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 1,
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.product-info').length) {
		galleryThumbs = new Swiper('.product-thumbs', {
			spaceBetween: 9,
			slidesPerView: 8,
			direction: 'vertical',
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'768': {
					spaceBetween: 10,
					slidesPerView: 5
				}
			}
		})

		new Swiper('.product-images__slider', {
			spaceBetween: 10,
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: galleryThumbs
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true,
			}
		})
	}

	//
	$('body').on('click', '.amount__btn_minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		if ( $(this).closest('.product-global-added').hasClass('product-global-added') ) {
			parent = $('.product-global-added')
		}

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let minimum = parseFloat(input.data('minimum'))
		let step = parseFloat(input.data('step'))

		if (inputVal > minimum) {
			input.val(inputVal - step)

			parent.find('.amount__btn_plus').prop("disabled", false)
		}

		if (inputVal-1 == minimum) {
			if ( !parent.hasClass('product__amount') && !parent.closest('.product-global-added').hasClass('product-global-added') ){
				$(this).prop("disabled", true)
			}
		}

		if (inputVal == minimum) {
			if ( parent.hasClass('product__amount') ){
				$(this).closest('.product').find('.product__added').removeClass('_show')
				$(this).closest('.product').find('.product__bot').removeClass('_hide')
			}

			if ( parent.closest('.product-global-added').hasClass('product-global-added') ){
				$('.product-global-added').removeClass('_show')
				$('.product-global-btns').removeClass('_hide')
			}
		}
	})
	
	$('body').on('click', '.amount__btn_plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		if ( $(this).closest('.product-global-added').hasClass('product-global-added') ) {
			parent = $('.product-global-added')
		}

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let maximum = parseFloat(input.data('maximum'))
		let step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)

			parent.find('.amount__btn_minus').prop("disabled", false)
		}

		if (inputVal+1 == maximum) {
			$(this).prop("disabled", true)
		}
	})

	$('.amount__input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	if ($('#datepicker').length) {
		new AirDatepicker('#datepicker', {
			container: '#datepicker-here1',
			autoClose: true,
			position: 'bottom left',
			range: true,
    		multipleDatesSeparator: '-'
		})
	}


	// commit
	// favorite
	$('body').on('click', '.product-favorite:not(.product-favorite_delete)', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.product-favorite_delete', function (e) {
		e.preventDefault()

		$(this).closest('.product').remove()
	})


	// compare
	$('body').on('click', '.product-compare:not(.product-favorite_delete)', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.product-compare_delete', function (e) {
		e.preventDefault()

		$(this).closest('.swiper-slide').remove()

		productsCompare.update()
	})

	if ($('.products__slider').length) {
		new Swiper(".products__slider", {
			loop: false,
			spaceBetween: 8,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 8,
					slidesPerView: 'auto',
				},
				'480': {
					spaceBetween: 8,
					slidesPerView: 'auto',
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3,
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4,
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 5,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')

					$(swiper.el).find('.product__box, .product__availability, .product__prices').height('auto')

					setHeight( $(swiper.el).find('.product__box') )
					setHeight( $(swiper.el).find('.product__availability') )
					setHeight( $(swiper.el).find('.product__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product__box, .product__availability, .product__prices').height('auto')

					// setTimeout(function(){
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__availability') )
						setHeight( $(swiper.el).find('.product__prices') )
					// }, 200)
				},
			}
		})
	}

	if ($('.main-action__slider').length) {
		new Swiper(".main-action__slider", {
			loop: false,
			spaceBetween: 8,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 8,
					slidesPerView: 'auto',
				},
				'480': {
					spaceBetween: 8,
					slidesPerView: 'auto',
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 2,
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}

	//Ползунки
	$priceRange = $("#price_range").ionRangeSlider({
		type     : 'double',
		min      : 1050,
		max      : 8000,
		from     : 1050,
		to       : 5000,
		step     : 1,
		onChange : function (data) {
			$('.price_range input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range .range__input').keyup(function() {
		$priceRange.update({
			from : $('.price_range input.ot').val().replace(/\s/g,''),
			to : $('.price_range input.do').val().replace(/\s/g,'')
		})
	})

	// Смена пароля
	$('body').on('submit', '.form_password', function (e) {
		e.preventDefault()

		$(this).addClass('_sended')
	})

	// Редактировать данные профиля
	$('body').on('click', '.personal-data__edit', function(e) {
    	e.preventDefault()

    	$(this).closest('.personal-data__item').addClass('_active')
    })

	$('body').on('click', '.personal-data__cancel', function(e) {
    	e.preventDefault()

    	$(this).closest('.personal-data__item').removeClass('_active')
    })

	$('body').on('submit', '.personal-data__item-form', function(e) {
    	e.preventDefault()

    	Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])

    	$(this).closest('.personal-data__item').removeClass('_active')
    })
});


$(window).on('load', () => {
	
	// commit
	if ($('.products__grid').length){
		$('.products .products__grid').each(function() {
			productsHeight($(this), parseInt($(this).css('--products_count')))
		})
	}
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}

		if ($('.products__grid').length){
			$('.products .products__grid').each(function() {
				productsHeight($(this), parseInt($(this).css('--products_count')))
			})
		}
	}

});


function productsHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product')

	products.find('.product__name').height('auto')
	products.find('.product__box').height('auto')
	products.find('.product__info').height('auto')
	products.find('.product__prices').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.product__name'))
		setHeight(products.slice(start, finish).find('.product__box'))
		setHeight(products.slice(start, finish).find('.product__info'))
		setHeight(products.slice(start, finish).find('.product__prices'))

		start  = start + step
		finish = finish + step
	}
}
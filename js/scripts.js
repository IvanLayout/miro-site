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
					spaceBetween: 9,
					slidesPerView: 8
				},
				'1024': {
					spaceBetween: 5,
					slidesPerView: 7
				},
				'1320': {
					spaceBetween: 8,
					slidesPerView: 5
				},
				'1760': {
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
			spaceBetween: 10,
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
					spaceBetween: 10,
					slidesPerView: 'auto',
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3,
				},
				'1024': {
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
			spaceBetween: 10,
			slidesPerView: 1,
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
					spaceBetween: 10,
					slidesPerView: 1,
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3,
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
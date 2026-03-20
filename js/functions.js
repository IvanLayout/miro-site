$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload, .production-process__flex')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}

			if (entry.intersectionRatio > 0 && entry.target.classList.contains('production-process__flex') && !entry.target.classList.contains('act')) {
				console.log(entry.target)
				tabsTimer()

				entry.target.classList.add('act')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	

	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	$('body').on('click', '.header-catalog__open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active') & !$(this).hasClass('_active-inner')) {
			$(this).removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		} else if ($(this).hasClass('_active-inner')){
			$(this).removeClass('_active-inner')
			$('.header-catalog__block').removeClass('_show-inner')
		} else {
			$(this).addClass('_active')
			$('.header-catalog__block').addClass('_show')
			$('.overlay-catalog').addClass('_show')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.header-catalog') && !e.target.closest('.header-catalog__open') ) {
			$('.header-catalog__open').removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		}
	})


	if ( $(window).width() > 1024 ) {
		$('body').on('mousemove', '.header-menu__link', function (e) {
			if( !$(this).hasClass('_active') ) {
				let parent = $(this).closest('.header-catalog__block')
				let subMenu = $(this).data('sub-menu')

				parent.find('.header-menu__link').removeClass('_active')
				parent.find('.header-submenu').removeClass('_active')

				if ( $(this).hasClass('open-sub-menu') ) {
					$(this).addClass('_active')
				}
				$(subMenu).addClass('_active')
			}
		});
	} else {
		$('body').on('click', '.open-sub-menu', function (e) {
			e.preventDefault()

			let parent = $(this).closest('.header-catalog__block')
			let subMenu = $(this).data('sub-menu')

			parent.addClass('_show-inner')
			$('.header-catalog__open').addClass('_active-inner')

			parent.find('.open-sub-menu').removeClass('_active')
			parent.find('.header-submenu').removeClass('_active')

			if ( $(this).hasClass('open-sub-menu') ) {
				$(this).addClass('_active')
			}
			$(subMenu).addClass('_active')
		});
	}
	

	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		let offsetTop = 10;

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - offsetTop }, 1000)
	})


	
	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button_js', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('_active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let activeTitle = $(this).data('content-title')
			let level = $(this).data('level')

			console.log(activeTitle)

			parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
			parent.find('.tab-content.' + level).removeClass('_active')

			if ( parent.hasClass('animated') ) {
				parent.removeClass('animated')

				setTimeout(function(){
					if ( !parent.hasClass('animated') ) {
						parent.addClass('animated')
					}
				},50)
			}

			$(this).addClass('_active')
			$(activeTab).addClass('_active')

			if( $(this).closest('.tabs__item').length ){
				parent.find('.tabs__item').removeClass('_active')
				$(this).closest('.tabs__item').addClass('_active')
			}

			if( activeTitle !== 'undefined' ){
				parent.find('.tabs__data').removeClass('_active')
				$(activeTitle).addClass('_active')
			}
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button_js[data-content="'+ locationHash +'"]')
		let parent = activeTab.closest('.tabs-container')
		let level = activeTab.data('level')

		parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
		parent.find('.tab-content.' + level).removeClass('_active')

		activeTab.addClass('_active')
		$(locationHash).addClass('_active')

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top - 120
		}, 1000)
	}

	// commit

	$('.form__input-anim').each(function(){
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})

	$('.form__input-anim').change(function() {
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})


	$('body').on('click', '[data-open-acc]', function (e) {
		e.preventDefault()

		if ($(this).closest('[data-item-acc]').hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).closest('[data-item-acc]').removeClass('_active')
			$(this).closest('[data-item-acc]').find('[data-data-acc]').slideUp(300)
		} else {
			$(this).closest('[data-items-acc]').find('[data-open-acc]').removeClass('_active')
			$(this).closest('[data-items-acc]').find('[data-item-acc]').removeClass('_active')
			$(this).closest('[data-items-acc]').find('[data-data-acc]').slideUp(300)

			$(this).addClass('_active')
			$(this).closest('[data-item-acc]').addClass('_active')
			$(this).closest('[data-item-acc]').find('[data-data-acc]').slideDown(300)
		}
	})

	$('body').on('click', '.aside-cats__menu-link._sub', function (e) {
		e.preventDefault()

		if ($(this).closest('.aside-cats__menu-item').hasClass('_active')) {
			$(this).closest('.aside-cats__menu-item').removeClass('_active')
			$(this).next().slideUp(300)
		} else {
			$(this).closest('.aside-cats__menu').find('.aside-cats__menu-item').removeClass('_active')
			$(this).closest('.aside-cats__menu').find('.aside-cats__submenu').slideUp(300)

			$(this).closest('.aside-cats__menu-item').addClass('_active')
			$(this).next().slideDown(300)
		}
	})


	$('.filter input').change(function() {
		const $input = $(this);
		let heigh = $input.height()
		let inputOffsetTop = 0;
		if ( $input.attr('type') === 'checkbox' || $input.attr('type') === 'radio' ) {
			inputOffsetTop = $input.closest('label').offset().top;

			heigh = $input.closest('label').height()
		} else {
			inputOffsetTop = $input.offset().top;
		}
		
		const containerOffsetTop = $input.closest('.filter').offset().top;

		const relativeOffset = inputOffsetTop - containerOffsetTop;

		console.log(containerOffsetTop)

		if( !$('.filter-show').hasClass('_show') ){
			$('.filter-show').addClass('_show')
		}

		$('.filter-show').css('top', relativeOffset + heigh/2)
	})

	// Кастомный select
	$('select').niceSelect()
})


$(window).on('load', () => {
	
	// commit
	
})


// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)
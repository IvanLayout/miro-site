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

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
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

	// $('.header-menu__item').hover(function() {
	// 	// $(this).addClass('_active');


	// 	if( !$(this).hasClass('_active') ) {
	// 		let parent = $(this).closest('.header-catalog__block')
	// 		let activeTab = $(this).data('content')

	// 		parent.find('.header-menu:first').find('.menu_js').removeClass('_active')

	// 		$(this).addClass('_active')
	// 		$(activeTab).addClass('_active')
	// 	}
	// }, function() {
	// 	$(this).removeClass('_active');
	// });


	// Табы
	// var locationHash = window.location.hash

	// $('body').on('click', '.tabs__button_js', function(e) {
	// 	e.preventDefault()

	// 	if( !$(this).hasClass('_active') ) {
	// 		let parent = $(this).closest('.tabs-container')
	// 		let activeTab = $(this).data('content')
	// 		let level = $(this).data('level')

	// 		parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
	// 		parent.find('.tab-content.' + level).removeClass('_active')

	// 		$(this).addClass('_active')
	// 		$(activeTab).addClass('_active')

	// 		if ( $(this).closest('.production-process').length ) {
	// 			clearTimeout($stopTimer);
	// 			$index = $(this).index();
	// 			$('.production-process .tabs').attr('class', '').addClass('tabs act' + $index);
	// 			tabsTimer();

	// 			return false
	// 		}
	// 	}
	// })

	// if( locationHash && $('.tabs-container').length ) {
	// 	let activeTab = $('.tabs__button_js[data-content="'+ locationHash +'"]')
	// 	let parent = activeTab.closest('.tabs-container')
	// 	let level = activeTab.data('level')

	// 	parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
	// 	parent.find('.tab-content.' + level).removeClass('_active')

	// 	activeTab.addClass('_active')
	// 	$(locationHash).addClass('_active')

	// 	$('html, body').stop().animate({
	// 		scrollTop: $(locationHash).offset().top - 120
	// 	}, 1000)
	// }

	// commit


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
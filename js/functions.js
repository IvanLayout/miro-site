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


	// Открываем меню в личном кабинете
	$('body').on('click', '.header-lk__open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')){
			$(this).removeClass('_active')
			$('.header-lk__links-wrap').removeClass('_show')
			$('body').removeClass('_lock-add')
		} else {
			$(this).addClass('_active')
			$('.header-lk__links-wrap').addClass('_show')
			$('body').addClass('_lock-add')
		}
	})


	// Открываем боковое меню
	$('body').on('click', '.aside-open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')){
			$(this).removeClass('_active')
			$('.aside-lk').removeClass('_show')
			$('body').removeClass('_lock-add')
		} else {
			$(this).addClass('_active')
			$('.aside-lk').addClass('_show')
			$('body').addClass('_lock-add')
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


	// Fancybox
	const myCloseBtn = '<button data-fancybox-close class="f-button is-close-button" title="Close"><svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L16 16" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M16 1L1 16" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg></button>';

	const commonOptions = {
		autoFocus: false,
		dragToClose: false,
		placeFocusBack: false,
		
		// Налаштування для інлайнового контенту (HTML модалки)
		Html: {
			// Замінюємо шаблон кнопки безпосередньо в модулі Html
			tpl: myCloseBtn
		},
		
		// Налаштування для галерей (зображення)
		Toolbar: {
			display: {
				right: ["close"],
			},
			items: {
				close: {
					tpl: myCloseBtn
				}
			}
		}
	};

	// Відкриття модалок
	$(document).on('click', '.modal-btn', function (e) {
		e.preventDefault();

		Fancybox.close();
	
		const target = $(this).attr('data-content');
		const isBig = $(this).attr('data-modal-big') !== undefined;

		setTimeout(() => {
			Fancybox.show([{
				src: target,
				type: 'inline'
			}], {
				...commonOptions,
				on: {
					reveal: () => {
						if (isBig) $('body').addClass('_big-modal');
					},
					destroy: () => {
						$('body').removeClass('_big-modal');
						$('.modal video').each(function () { this.pause(); });
					}
				}
			});
		}, 10);
	});

	// 2. Закриття через кнопку .modal-close
	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault();
		Fancybox.close();
	});

	// Для картинок
	Fancybox.bind('.fancy-img', {
		...commonOptions,
		Carousel: {
			Thumbs: false,
		},
	});


	// Аккордион простой моб
	$('body').on('click', '.tabs-accord__open', function(e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).next().slideUp(300)
		} else {
			$(this).closest('.tabs-accord').find('.tabs-accord__open').removeClass('_active')
			$(this).closest('.tabs-accord').find('.tabs-accord__data').slideUp(300)

			$(this).addClass('_active')
			$(this).next().slideDown(300)
		}
	})


	// Аккордион простой дичный кабинет
	$('body').on('click', '.aside-lk__open', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.aside-lk__item')

		if( parent.hasClass('_active') ) {
			parent.removeClass('_active')
			parent.find('.aside-lk__links').slideUp(300)
		} else {
			parent.addClass('_active')
			parent.find('.aside-lk__links').slideDown(300)
		}
	})


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if( $(this).hasClass('mini-modal__btn_look') ) {
				$('body').addClass('_lock-mini')
			}

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') || $(e.target).hasClass('mini-modal-notif') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.inner-search') ) {
			$('.inner-search__bord').removeClass('_show')
			$('.inner-search__input').val('')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header-catalog') && !e.target.closest('.header-catalog__open') ) {
			$('.header-catalog__open').removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		}

		if ( !e.target.closest('.header-lk__links-wrap') && !e.target.closest('.header-lk__open') ) {
			$('.header-lk__open').removeClass('_active')
			$('.header-lk__links-wrap').removeClass('_show')
		}

		if ( !e.target.closest('.aside-lk') && !e.target.closest('.aside-open') ) {
			$('.aside-open').removeClass('_active')
			$('.aside-lk').removeClass('_show')
		}
	})

	// Мини всплывающие окна
	$('.mini-modal-notif__close').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		parent.find('.mini-modal__btn').removeClass('_active')
		parent.find('.mini-modal__modal').removeClass('_active')
		$('body').removeClass('_lock-mini')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	$('body').on('click', '[data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})



	// Выпадающее меню в поиске
	$('body').on('focus', '.inner-search__input', function(e) {
		e.preventDefault()

		$('.inner-search__bord').addClass('_show')
	})


	$('.inner-search__input').keydown(function() {
		let thisEl = $(this)
		setTimeout( function() {
			let value = thisEl.val()

			if ( value != '' ) {
				$('.inner-search__bord').addClass('_show')
			} else {
				$('.inner-search__bord').removeClass('_show')
			}
		}, 10)
	})


	// Показать все
	$('body').on('click', '.lk-table__details-btn', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$(this).closest('.lk-table__details-td').find('._hide').removeClass('_show')
		} else {
			$(this).addClass('_active')

			$(this).closest('.lk-table__details-td').find('._hide').addClass('_show')
		}
	})

	// Показать все модальном окне
	$('body').on('click', '.modal-info__details-btn', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$(this).closest('.modal-info__item').find('._hide').removeClass('_show')
		} else {
			$(this).addClass('_active')

			$(this).closest('.modal-info__item').find('._hide').addClass('_show')
		}
	})

	// commit

	$('.form__input-anim, .form__textarea-anim').each(function(){
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})

	$('.form__input-anim, .form__textarea-anim').change(function() {
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

	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	$('input[type=decimal]').each(function(){
		$(this).inputmask(`decimal`, {
			alias: "numeric",
			radixPoint: "",
			placeholder: "",
			// groupSeparator: " ",
			// autoGroup: true,
			rightAlign: false,
			showMaskOnHover: false
		})
	})

	$('._datetime').each(function(){
		$(this).inputmask("datetime", {
			alias: "datetime",
			inputFormat: "dd.mm.yyyy",
			placeholder: "дд.мм.гггг",
			showMaskOnHover: false
		})
	})

	// Кастомный select
	$('select').niceSelect()

	$('body').on('click', '.aside-cats__title', function(e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).next().slideUp(300)
		} else {
			$(this).addClass('_active')
			$(this).next().slideDown(300)
		}
	})

	$('body').on('click', '.open-filter', function(e) {
		e.preventDefault()

		$('.aside').addClass('_show')

		$('body').addClass('_look-filter')
	})

	$('body').on('click', '.aside-top__close', function(e) {
		e.preventDefault()

		$('.aside').removeClass('_show')

		$('body').removeClass('_look-filter')
	})

	//Показать пароль
	$('body').on('click', '.view_pas', function(e) {
    	e.preventDefault()

    	if ($(this).hasClass('_active')) {
    		$(this).removeClass('_active')

			$(this).closest('.form__field').find('.form__input').prop('type', 'password')
    	} else {
    		$(this).addClass('_active')

			$(this).closest('.form__field').find('.form__input').prop('type', 'text')
    	}
    })

	// Выбор файла
	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).closest('.file-selection')

		parent.find('.file-selection__path-name').text(val)

		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path-name').text() == '') {
			let defoultText = parent.find('.file-selection__path-name').data('text')
			
			parent.find('.file-selection__path-name').html(defoultText)

			parent.find('.file-selection__path').removeClass('_active')
		}
	})

	// Выбор всех чекбоксов
	$(document).on('change', '.checkbox__label_all', function() {
		if ($(this).find('input[type="checkbox"]').prop('checked')) {
			$('.choice-action').addClass('_show')
			$('.content-lk__link_add').prop('disabled', true)
		} else {
			$('.choice-action').removeClass('_show')
			$('.content-lk__link_add').prop('disabled', false)
		}

		const isChecked = $(this).find('input[type="checkbox"]').prop('checked');
	
		const table = $(this).closest('.content-lk_check').find('.table-check');

		table.find('input[type="checkbox"]').not(this).prop('checked', isChecked);
	});

	$(document).on('change', '.table-check td input[type="checkbox"]', function() {
		const table = $(this).closest('.content-lk_check');

		const masterCheckbox = table.find('.checkbox__label_all input[type="checkbox"]');
		
		const rowCheckboxes = table.find('.table-check td input[type="checkbox"]');

		const totalCount = rowCheckboxes.length;
		const checkedCount = rowCheckboxes.filter(':checked').length;

		if (checkedCount > 0) {
			$('.choice-action').addClass('_show')
			$('.content-lk__link_add').prop('disabled', true)
		} else {
			$('.choice-action').removeClass('_show')
			$('.content-lk__link_add').prop('disabled', false)
		}

		if (totalCount === checkedCount) {
			masterCheckbox.prop('checked', true);
		} else {
			masterCheckbox.prop('checked', false);
		}
	});

	$('body').on('click', '.content-lk__link_clear', function() {
		const table = $(this).closest('.content-lk_check');
		const masterCheckbox = table.find('.checkbox__label_all input[type="checkbox"]');
		const tableChek = table.find('.table-check td input[type="checkbox"]');

		masterCheckbox.prop('checked', false);
		tableChek.prop('checked', false);

		$('.choice-action').removeClass('_show')
		$('.content-lk__link_add').prop('disabled', false)
	});


	$('body').on('click', '.mini-modal-notif__delete', function(e) {
		e.preventDefault()

		setTimeout(() => {
			$(this).closest('.mini-modal-notif__item').remove()
		}, 10);
	})
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
(() => {
	"use strict";
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image;
			webP.onload = webP.onerror = function () {
				callback(webP.height == 2);
			};
			webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		}
		testWebP((function (support) {
			let className = support === true ? "webp" : "no-webp";
			document.documentElement.classList.add(className);
		}));
	}
	let addWindowScrollEvent = false;
	setTimeout((() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", (function (e) {
				document.dispatchEvent(windowScroll);
			}));
		}
	}), 0);
	//Плавный скрол к блоку
	document.querySelectorAll("a[href^='#scroll']").forEach(link => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			let href = this.getAttribute("href").substring(1);
			const scrollTarget = document.getElementById(href);
			const topOffset = 0;
			// const topOffset = 0; // если не нужен отступ сверху
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;

			window.scrollBy({
				top: offsetPosition,
				behavior: "smooth"
			});
		});
	})

	//Меню бургер
	const menuBurger = document.querySelector('.icon-menu');
	const menuNav = document.querySelector('.menu__body');
	const menuBody = document.querySelector('body');
	if (menuBurger) {
		menuBurger.addEventListener("click", function (e) {
			menuBurger.classList.toggle('menu-open');
			menuNav.classList.toggle('body-active');
			menuBody.classList.toggle('lock');
			if (menuNav) {
				menuNav.addEventListener("click", function (e) {
					menuBurger.classList.remove('menu-open');
					menuNav.classList.remove('body-active');
					menuBody.classList.remove('lock');
				});
			}
		});

	}

	//анимация
	const animItems = document.querySelectorAll('.animation');//Класс по которуму сработает анимация
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 1; //анимация сработает когда 1\4 блока станет видна

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - innerHeight / animStart;
				}

				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('animation-active');
				} else {
					//отключем повтор анимации
					if (!animItem.classList.contains('animation-no-hide')) {
						animItem.classList.remove('animation-active');
					}
				}
			}
		}

		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		animOnScroll();
	}

	//Слайдер
	//<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"></script>
	//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"/>
	function initSliders() {
		// Перечень слайдеров
		// Проверяем, есть ли слайдер на стронице
		if (document.querySelector('.decisions__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.decisions__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				slidesPerView: 1,
				spaceBetween: 1110,
				// autoHeight: true,
				speed: 1100,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				// Кнопки "влево/вправо"
				navigation: {
					prevEl: '.decisions-button-prev',
					nextEl: '.decisions-button-next',
				},
				breakpoints: {
					320: {
						spaceBetween: 400,
					},
					992: {
						spaceBetween: 1110,
					},
				},
			});
		}

		// слайдер-таблица мобила
		if (document.querySelector('.header-table, .table__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.header-table, .table__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				slidesPerView: 3,
				spaceBetween: 0,
				allowTouchMove: false,
				// autoHeight: true,
				speed: 1100,
				// Кнопки "влево/вправо"
				navigation: {
					prevEl: '.table-button-prev',
					nextEl: '.table-button-next',
				},

				// Брейкпоинты
				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					992: {
						slidesPerView: 3,
					},
					1268: {
						slidesPerView: 3,
					},
				},
			});
		}

	}
	window.addEventListener("load", function (e) {
		// Запуск инициализации слайдеров
		initSliders();
	});

	//popup
	const videoContent = document.getElementById('popup-video-content');
	const popups = document.querySelectorAll('.popup');
	const popupButton = document.querySelectorAll('.button, .menu__link');
	const popupButtonVideo = document.querySelectorAll('.button-video');
	const body = document.body;
	//Скачок у попапа
	const popupWrapper = document.querySelectorAll('.popup__wrapper');
	//убрать скрол для фикс-блока
	const fixBlock = document.querySelectorAll('.fix-block');//класс для фиксблоков
	// убрать скрол
	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	let marginOffset = document.body.offsetWidth - window.innerWidth + 'px';

	function openPopup(elem) {
		elem.classList.add('popup-open');
		body.classList.add('lock');
		// убрать скрол
		document.body.style.paddingRight = paddingOffset;
		//убрать скрол для фикс-блока
		fixBlock.forEach((el) => {
			el.style.paddingRight = paddingOffset;
		})
		//Скачок у попапа
		popupWrapper.forEach((el) => {
			el.style.marginLeft = marginOffset;
		})
	}
	//закрытие
	function closePopup(e) {
		if (e.target.classList.contains('close-popup') || e.target.closest('.close-popup') || e.target.classList.contains('popup__wrapper')) {
			e.target.closest('.popup').classList.remove('popup-open');
			body.classList.remove('lock');

			videoContent.pause();
			// Вернуть скрол
			document.body.style.paddingRight = '0px';
			//убрать скрол для фикс-блока
			fixBlock.forEach((el) => {
				el.style.paddingRight = '0px';
			});
			//Скачок у попапа
			popupWrapper.forEach((el) => {
				el.style.marginLeft = 'auto';
			})
		}
	}
	//открытие попапа
	popupButton.forEach(btn => {
		btn.addEventListener('click', (e) => {
			let data = e.target.dataset.popupOpen;
			popups.forEach(popup => {
				if (popup.dataset.popup == data || popup.dataset.popup == e.target.closest('.button, .menu__link').dataset.popupOpen) {
					openPopup(popup);
				}
			})
		})
	});
	popupButtonVideo.forEach(btnVideo => {
		btnVideo.addEventListener('click', (e) => {
			let data = e.target.dataset.popupOpen;
			videoContent.play();
			popups.forEach(popup => {
				if (popup.dataset.popup == data || popup.dataset.popup == e.target.closest('.button-video').dataset.popupOpen) {
					openPopup(popup);
				}
			})
		})
	});

	popups.forEach(popup => {
		popup.addEventListener('click', e => closePopup(e))
	})

	// счетчик лого %
	function counter(ms) {
		let counter = 0;
		let interval = setInterval(() => {
			document.querySelector('.steps').innerHTML = ++counter + "%";
			counter === 100 ? clearInterval(interval) : false;
		}, ms)
	}
	counter(20, '.res')

	//показать еще
	document.querySelectorAll('.btn-more').forEach(item => {
		item.addEventListener('click', () => {
			const parent = item.parentNode;
			const initialText = '<span>Свернуть</span>';
			parent.classList.toggle('look-active');
			item.classList.toggle('active');
			if (item.innerHTML.toLowerCase().includes(initialText.toLowerCase())) {
				item.innerHTML = '<span>Ещё</span>';
			} else {
				item.innerHTML = initialText;
			}
		});
	})
	document.querySelectorAll('.btn-more').forEach((el) => (
		el.addEventListener('click', () => {
			let list = el.previousElementSibling;
			if (list.style.maxHeight === list.scrollHeight + 'px') {
				list.style.maxHeight = null
			} else {
				list.style.maxHeight = list.scrollHeight + 'px'
			}
		})
	));
	//показать еще - end
	
	window["FLS"] = true;
	isWebp();
})();
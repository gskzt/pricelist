// Замените этот номер на ваш реальный номер WhatsApp
// Формат: код страны + номер без пробелов и символов
// Например: для России +79001234567
const WHATSAPP_NUMBER = '+77477330414';

// Добавляем эффект ripple для кнопок
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Добавляем стили для ripple анимации
if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function orderVideo(videoType) {
    // Формируем сообщение для WhatsApp
    const message = encodeURIComponent(`Здравствуйте! Я хочу заказать: ${videoType}`);
    
    // Создаем ссылку на WhatsApp
    // Если номер начинается с +, убираем его для ссылки
    const phoneNumber = WHATSAPP_NUMBER.startsWith('+') 
        ? WHATSAPP_NUMBER.substring(1) 
        : WHATSAPP_NUMBER;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Показываем уведомление перед открытием
    showNotification(`Открываем WhatsApp для заказа "${videoType}"`, () => {
        // Открываем WhatsApp в новой вкладке
        window.open(whatsappUrl, '_blank');
    });
}

function showNotification(message, callback) {
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(n => n.remove());
    
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.95) 0%, rgba(56, 142, 60, 0.95) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        font-size: 1rem;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        font-family: 'Inter', sans-serif;
    `;
    
    // Добавляем иконку
    const icon = document.createElement('div');
    icon.innerHTML = '✓';
    icon.style.cssText = `
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 700;
        flex-shrink: 0;
    `;
    
    const text = document.createElement('div');
    text.textContent = message;
    text.style.flex = '1';
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    // Добавляем анимацию если её еще нет
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px) scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px) scale(0.8);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Вызываем callback если есть
    if (callback) {
        setTimeout(callback, 100);
    }
    
    // Удаляем уведомление через 4 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Добавляем плавную прокрутку при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем ripple эффект ко всем кнопкам заказа
    document.querySelectorAll('.order-btn').forEach(button => {
        addRippleEffect(button);
    });
    
    // Плавная прокрутка для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Добавляем эффект параллакса при скролле
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const speed = currentScroll * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
            hero.style.opacity = 1 - (currentScroll / 500);
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Добавляем анимацию появления карточек при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.video-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Автоматическое воспроизведение всех видимых видео одновременно
    const videos = document.querySelectorAll('.card-video');
    
    // Устанавливаем оптимизации для всех видео
    videos.forEach(video => {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.defaultPlaybackRate = 1.0;
        
        // Оптимизация производительности
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('x5-playsinline', 'true');
        
        // Принудительное аппаратное ускорение
        video.style.transform = 'translateZ(0)';
        video.style.willChange = 'auto';
        
        // Отключаем лишние эффекты
        video.style.filter = 'none';
    });
    
    // Оптимизированное воспроизведение всех видимых видео одновременно
    const videoObserver = new IntersectionObserver((entries) => {
        // Используем requestAnimationFrame для батчинга обновлений
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                const video = entry.target;
                
                if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                    // Видео видно на 15% или больше - начинаем воспроизведение
                    if (video.paused) {
                        video.play().catch(() => {
                            // Игнорируем ошибки автовоспроизведения
                        });
                    }
                } else {
                    // Видео не видно - останавливаем для экономии ресурсов
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        });
    }, {
        threshold: [0.15, 0.3, 0.5, 0.7, 1.0], // Оптимизированные пороги
        rootMargin: '0px'
    });
    
    // Наблюдаем за всеми видео
    videos.forEach(video => {
        videoObserver.observe(video);
    });
    
    // Автоматически воспроизводим все видимые видео при загрузке страницы
    window.addEventListener('load', () => {
        // Небольшая задержка для полной загрузки
        setTimeout(() => {
            requestAnimationFrame(() => {
                videos.forEach(video => {
                    const rect = video.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const isVisible = rect.top < viewportHeight && rect.bottom > 0;
                    
                    if (isVisible && video.paused) {
                        video.play().catch(() => {
                            // Игнорируем ошибки автовоспроизведения
                        });
                    }
                });
            });
        }, 500);
    });
    
    // Оптимизированная обработка прокрутки с debounce
    let scrollTimeout;
    let lastScrollTime = 0;
    const scrollThrottle = 150; // Минимальный интервал между проверками
    
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime < scrollThrottle) return;
        lastScrollTime = now;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                videos.forEach(video => {
                    const rect = video.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const isVisible = rect.top < viewportHeight && rect.bottom > 0;
                    
                    if (isVisible && video.paused) {
                        video.play().catch(() => {});
                    } else if (!isVisible && !video.paused) {
                        video.pause();
                    }
                });
            });
        }, 50);
    }, { passive: true });
});

// Добавляем легкий 3D tilt эффект для карточек (только для устройств с мышью)
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, есть ли поддержка hover (не touch-устройство)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // На touch-устройствах отключаем tilt эффект
        return;
    }
    
    const cards = document.querySelectorAll('.video-card');
    let ticking = false;
    
    // Throttle функция для оптимизации производительности
    function updateCardTransform(card, rotateX, rotateY) {
        if (!ticking) {
            requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
                ticking = false;
            });
            ticking = true;
        }
    }
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Ограничиваем углы для плавности и производительности
            const rotateX = Math.max(-5, Math.min(5, (y - centerY) / 30));
            const rotateY = Math.max(-5, Math.min(5, (centerX - x) / 30));
            
            updateCardTransform(card, rotateX, rotateY);
        });
        
        card.addEventListener('mouseleave', function() {
            requestAnimationFrame(() => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    });
    
    // Добавляем эффект курсора для интерактивных элементов
    const interactiveElements = document.querySelectorAll('.order-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
});

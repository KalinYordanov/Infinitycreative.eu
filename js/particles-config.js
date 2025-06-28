// Particles Configuration

/**
 * Инициализира анимираните частици за декоративни елементи
 */
function initParticles() {
    // Проверяваме дали particles.js е зареден
    if (typeof particlesJS === 'undefined') {
        console.error('particles.js не е зареден!');
        return;
    }

    // Конфигурация за частиците в Hero секцията
    const heroConfig = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#6419E6", "#D926AA", "#1FB2A5"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6419E6",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 6,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    // Конфигурация за частиците в другите секции (по-лека версия)
    const sectionConfig = {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#6419E6", "#D926AA", "#1FB2A5"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.2,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.3,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6419E6",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 200,
                    "size": 5,
                    "duration": 2,
                    "opacity": 0.5,
                    "speed": 3
                }
            }
        },
        "retina_detect": true
    };

    // Мобилна конфигурация (по-малко частици за по-добра производителност)
    const mobileConfig = {
        "particles": {
            "number": {
                "value": 20,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#6419E6", "#D926AA", "#1FB2A5"]
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.3,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    };

    // Определяме дали е мобилно устройство
    const isMobile = window.innerWidth < 768;

    // Инициализираме частиците за всички контейнери
    const particleContainers = document.querySelectorAll('.particles-container');
    
    particleContainers.forEach((container, index) => {
        const containerId = container.id;
        const isHero = container.classList.contains('hero-particles');
        
        // Избираме конфигурацията според типа на контейнера и устройството
        let config;
        if (isMobile) {
            config = mobileConfig;
        } else if (isHero) {
            config = heroConfig;
        } else {
            config = sectionConfig;
        }
        
        // Инициализираме частиците
        particlesJS(containerId, config);
    });
}

// Инициализираме частиците при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
    // Проверяваме дали particles.js е зареден
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    } else {
        console.warn('particles.js не е зареден. Ще опитаме отново след 1 секунда.');
        setTimeout(initParticles, 1000);
    }
    
    // Преинициализираме частиците при промяна на размера на прозореца
    window.addEventListener('resize', function() {
        // Използваме debounce за по-добра производителност
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            initParticles();
        }, 250);
    });
});

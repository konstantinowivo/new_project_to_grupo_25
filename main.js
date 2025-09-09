   // Carousel functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function showSlide(index) {
            const carouselInner = document.getElementById('carouselInner');
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            showSlide(currentSlideIndex);
        }

        function previousSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index - 1;
            showSlide(currentSlideIndex);
        }

        // Auto-slide functionality
        setInterval(nextSlide, 5000);

        // Smooth scrolling for navigation links
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

        // Add scroll effect to cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });

        // Formulario de contacto
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const btnText = document.querySelector('.btn-text');
            const btnLoading = document.querySelector('.btn-loading');
            
            // Mostrar estado de carga
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            // Simular envío del formulario
            setTimeout(() => {
                // Resetear formulario
                this.reset();
                
                // Restaurar botón
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                
                // Mostrar mensaje de éxito
                alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                
            }, 2000);
        });

        // Validación en tiempo real
        document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '#e1e5e9';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)' && this.value.trim()) {
                    this.style.borderColor = '#667eea';
                }
            });
        });

        // Toggle password visibility
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleButton = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleButton.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleButton.textContent = '👁️';
            }
        }

        // Form validation
        function validateForm() {
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            let isValid = true;

            // Reset errors
            email.classList.remove('error');
            password.classList.remove('error');
            emailError.classList.remove('show');
            passwordError.classList.remove('show');

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                emailError.classList.add('show');
                isValid = false;
            }

            // Validate password
            if (password.value.length < 6) {
                password.classList.add('error');
                passwordError.classList.add('show');
                isValid = false;
            }

            return isValid;
        }

        // Handle form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate login process
                const button = document.querySelector('.login-button');
                const originalText = button.textContent;
                
                button.textContent = 'Iniciando sesión...';
                button.style.opacity = '0.7';
                button.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert('¡Login exitoso! Redirigiendo...');
                    // Aquí normalmente harías la redirección
                    window.location.href = 'index.html';
                }, 2000);
            }
        });

        // Social login functions
        function socialLogin(provider) {
            alert(`Iniciando sesión con ${provider}... (Función de demostración)`);
        }

        function showForgotPassword() {
            alert('Función de recuperación de contraseña - Por implementar');
        }

        function showRegister() {
            alert('Redirigir a página de registro - Por implementar');
        }

        document.body.style.setProperty('--float-delay', Math.random() * 2 + 's');

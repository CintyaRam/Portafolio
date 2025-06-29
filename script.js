$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Evita el envío por defecto

        // Obtener valores
        const nombre = $('#nombre').val().trim();
        const correo = $('#correo').val().trim();
        const mensaje = $('#mensaje').val().trim();

        // Validar campos
        let esValido = true;

        // Limpiar mensajes anteriores
        $('#mensajeFormulario').addClass('d-none').removeClass('alert-success alert-danger');

        // Validar nombre
        if (nombre === '') {
            $('#mensajeFormulario')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('Por favor, ingresa tu nombre.')
                .removeClass('d-none');
            esValido = false;
        }

        // Validar correo
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo === '') {
            $('#mensajeFormulario')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('Por favor, ingresa tu correo.')
                .removeClass('d-none');
            esValido = false;
        } else if (!regexCorreo.test(correo)) {
            $('#mensajeFormulario')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('Por favor, ingresa un correo válido.')
                .removeClass('d-none');
            esValido = false;
        }

        // Validar mensaje
        if (mensaje === '') {
            $('#mensajeFormulario')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('Por favor, escribe un mensaje.')
                .removeClass('d-none');
            esValido = false;
        }

        // Si todo es válido
        if (esValido) {
            $('#mensajeFormulario')
                .removeClass('alert-danger')
                .addClass('alert-success')
                .text('Gracias por tu mensaje. Me pondré en contacto contigo pronto.')
                .removeClass('d-none');

            // Opcional: limpiar formulario
            $('#contactForm')[0].reset();
        }
    });
});
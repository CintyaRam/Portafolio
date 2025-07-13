$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Evitar envío tradicional

        const nombre = $('#nombre').val().trim();
        const correo = $('#correo').val().trim();
        const mensaje = $('#mensaje').val().trim();
        const mensajeDiv = $('#mensajeFormulario');
        const mensajeTexto = $('#mensajeTexto');

        // Limpiar mensajes anteriores
        mensajeDiv.removeClass('d-block alert-success alert-danger')
            .addClass('d-none')
            .removeClass('show'); // Elimina clase 'show' si existe
        mensajeTexto.text('');

        // Validar campos
        let esValido = true;
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre === '') {
            mensajeTexto.text('Por favor, ingresa tu nombre.');
            mensajeDiv.addClass('alert-danger d-block');
            esValido = false;
        }

        if (correo === '') {
            mensajeTexto.text('Por favor, ingresa tu correo.');
            mensajeDiv.addClass('alert-danger d-block');
            esValido = false;
        } else if (!regexCorreo.test(correo)) {
            mensajeTexto.text('Por favor, ingresa un correo válido.');
            mensajeDiv.addClass('alert-danger d-block');
            esValido = false;
        }

        if (mensaje === '') {
            mensajeTexto.text('Por favor, escribe un mensaje.');
            mensajeDiv.addClass('alert-danger d-block');
            esValido = false;
        }

        // Si todo está bien, enviar con AJAX
        if (esValido) {
            $.ajax({
                url: $('#contactForm').attr('action'),
                method: $('#contactForm').attr('method'),
                data: $('#contactForm').serialize(), // ✅ Aquí estaba el error
                dataType: 'json',
            })
                .done(function (response) {
                    console.log("✅ Enviado correctamente", response);

                    mensajeTexto.text('Gracias por tu mensaje. Me pondré en contacto contigo pronto.');
                    mensajeDiv.removeClass('alert-danger').addClass('alert-success d-block');

                    $('#contactForm')[0].reset();

                    setTimeout(() => {
                        mensajeDiv.removeClass('d-block alert-success');
                        mensajeTexto.text('');
                    }, 5000);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("❌ Error al enviar:", textStatus, errorThrown);
                    mensajeTexto.text('Hubo un error al enviar el mensaje. Inténtalo más tarde.');
                    mensajeDiv.addClass('alert-danger d-block');
                });
        }
    });
});
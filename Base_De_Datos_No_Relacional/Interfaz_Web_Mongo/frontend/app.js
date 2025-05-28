document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM para login
    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const logoutBtn = document.getElementById('logout-btn');
    const userWelcome = document.getElementById('user-welcome');
    const modal = document.getElementById('edit-modal');
    const modalTitle = document.getElementById('modal-title');
    const editForm = document.getElementById('edit-form');
    const formFields = document.getElementById('form-fields');
    const closeModalBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.cancel-btn');

    // Variables globales para edición
    let currentModel = '';
    let editingId = null;

    // Verificar si ya hay una sesión activa
    checkExistingSession();

    // Manejar envío del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const loginData = {
                usuario: formData.get('usuario'),
                clave: formData.get('clave')
            };

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });

                const result = await response.json();

                if (result.success) {
                    showMessage('Login exitoso. Accediendo...', 'success');
                    
                    // Guardar información del usuario en localStorage
                    localStorage.setItem('usuario', JSON.stringify(result.usuario));
                    
                    // Mostrar dashboard después de 1 segundo
                    setTimeout(() => {
                        showDashboard(result.usuario);
                    }, 1000);
                    
                } else {
                    showMessage(result.message, 'error');
                }

            } catch (error) {
                showMessage('Error de conexión. Intenta de nuevo.', 'error');
                console.error('Error:', error);
            }
        });
    }

    // Manejar logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }

    // Cerrar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Cancelar edición
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Manejar envío del formulario de edición
    if (editForm) {
        editForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            saveData();
        });
    }

    // Función para mostrar mensajes
    function showMessage(message, type) {
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            if (type === 'error') {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Función para mostrar el dashboard con animación de bienvenida
    function showDashboard(usuario) {
        showWelcomeAnimation().then(() => {
            if (loginScreen) loginScreen.style.display = 'none';
            if (dashboard) dashboard.style.display = 'flex';
            
            // Mostrar información del usuario
            if (userWelcome) {
                userWelcome.textContent = `Bienvenido Administrador: ${usuario.correo}`;
            }
            
            // Limpiar formulario
            if (loginForm) {
                loginForm.reset();
            }
            if (messageDiv) {
                messageDiv.style.display = 'none';
            }
        });
    }

    // Función para la animación de bienvenida
    function showWelcomeAnimation() {
        return new Promise(resolve => {
            const welcomeDiv = document.createElement('div');
            welcomeDiv.id = 'welcome-animation';
            welcomeDiv.className = 'welcome-animation';
            welcomeDiv.textContent = '¡Bienvenido!';
            document.body.appendChild(welcomeDiv);
            
            welcomeDiv.classList.add('animate');
            
            welcomeDiv.addEventListener('animationend', function handler() {
                welcomeDiv.removeEventListener('animationend', handler);
                welcomeDiv.remove();
                resolve();
            });
        });
    }

    // Función para verificar sesión existente
    function checkExistingSession() {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const userData = JSON.parse(usuario);
            showDashboard(userData);
        }
    }

    // Función para logout
    function logout() {
        localStorage.removeItem('usuario');
        if (dashboard) dashboard.style.display = 'none';
        if (loginScreen) loginScreen.style.display = 'flex';
        if (userWelcome) userWelcome.textContent = '';
    }

    // ==================== CARGAR DATOS DE LA BASE DE DATOS ====================

    // Elementos del menú
    const deportistasLink = document.getElementById('deportistas-link');
    const entrenadoresLink = document.getElementById('entrenadores-link');
    const eventosLink = document.getElementById('eventos-link');
    const horariosLink = document.getElementById('horarios-link');
    const usuariosLink = document.getElementById('usuarios-link');
    const mainContent = document.getElementById('main-content');
    const categoriasLink = document.getElementById('categorias-link');

    // ==================== DEFINICIÓN DE MODELOS ====================
    const models = {
        deportistas: {
            fields: [
                { name: 'id', label: 'Documento', type: 'text', required: true },
                { name: 'idUsuario', label: 'ID Usuario', type: 'text', required: true },
                { name: 'posicion', label: 'Posición', type: 'text' },
                { name: 'dorsal', label: 'Número Camiseta', type: 'number' },
                { name: 'direccion', label: 'Dirección', type: 'text' },
                { name: 'edad', label: 'Edad', type: 'number' },
                { name: 'estado', label: 'Estado', type: 'checkbox' },
                { name: 'nombreAcudiente', label: 'Acudiente', type: 'text' },
                { name: 'telefonoAcudiente', label: 'Teléfono Acudiente', type: 'text' },
                { name: 'eps', label: 'EPS', type: 'text' }
            ]
        },
        entrenadores: {
            fields: [
                { name: 'id', label: 'Documento', type: 'text', required: true },
                { name: 'idUsuario', label: 'ID Usuario', type: 'text', required: true },
                { name: 'categoria', label: 'Categoría', type: 'text' },
                { name: 'eps', label: 'EPS', type: 'text' },
                { name: 'salario', label: 'Salario', type: 'number' },
                { name: 'clave', label: 'Clave', type: 'password' }
            ]
        },
        eventos: {
            fields: [
                { name: 'idUsuario', label: 'ID Organizador', type: 'text', required: true },
                { name: 'tipo', label: 'Tipo de Evento', type: 'text', required: true },
                { name: 'descripcion', label: 'Descripción', type: 'textarea' },
                { name: 'idHorario', label: 'ID Horario', type: 'text' }
            ]
        },
        horarios: {
            fields: [
                { name: 'fecha', label: 'Fecha', type: 'date', required: true },
                { name: 'hora', label: 'Hora', type: 'time', required: true },
                { name: 'lugar', label: 'Lugar', type: 'text' }
            ]
        },
        usuarios: {
            fields: [
                { name: 'id', label: 'Documento', type: 'text', required: true },
                { name: 'tipo', label: 'Rol', type: 'select', required: true, 
                  options: ['Administrador', 'Entrenador', 'Deportista', 'Acudiente'] },
                { name: 'nombre', label: 'Nombre Completo', type: 'text', required: true }
            ]
        },
        // Añade esto dentro del objeto models
        categorias: {
            fields: [
                { name: 'id', label: 'ID Categoría', type: 'text', required: true },
                { name: 'nombre', label: 'Nombre de Categoría', type: 'text', required: true },
            ]
        }
        

    };

    // Función para cargar deportistas con nombres de usuario
    if (deportistasLink) {
        deportistasLink.addEventListener('click', async (e) => {
            e.preventDefault();
            currentModel = 'deportistas';
            try {
                // Cargar deportistas y usuarios en paralelo
                const [deportistasResponse, usuariosResponse] = await Promise.all([
                    fetch('/api/deportistas'),
                    fetch('/api/usuarios')
                ]);
                
                const deportistas = await deportistasResponse.json();
                const usuarios = await usuariosResponse.json();
                
                // Crear un mapa de usuarios para búsqueda rápida
                const usuariosMap = {};
                usuarios.forEach(usuario => {
                    usuariosMap[usuario.id] = usuario.nombre;
                });
                
                let html = '<h2>⚽ Registro de Deportistas del Club Lynx</h2>';
                
                // Agregar botón de búsqueda y agregar
                html += `
                <div class="crud-controls">
                    <input type="text" id="search-input" placeholder="Buscar deportista...">
                    <button id="search-btn">Buscar</button>
                    <button id="add-btn" class="add-btn">Agregar Nuevo Deportista</button>
                </div>`;
                
                if (deportistas.length === 0) {
                    html += '<p>📝 No hay deportistas registrados en el sistema.</p>';
                } else {
                    html += '<div class="table-container">';
                    html += '<table class="data-table">';
                    html += '<thead><tr>';
                    html += '<th>📄 Documento</th>';
                    html += '<th>👤 Nombre Completo</th>';
                    html += '<th>🎯 Posición de Juego</th>';
                    html += '<th>👕 Número de Camiseta</th>';
                    html += '<th>🏠 Dirección</th>';
                    html += '<th>🎂 Edad</th>';
                    html += '<th>📊 Estado Actual</th>';
                    html += '<th>👨‍👩‍👧 Nombre del Acudiente</th>';
                    html += '<th>📞 Teléfono de Contacto</th>';
                    html += '<th>🏥 EPS Afiliada</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    deportistas.forEach(deportista => {
                        const nombreUsuario = usuariosMap[deportista.idUsuario] || 'Sin nombre';
                        
                        html += `<tr>
                            <td>${deportista.id}</td>
                            <td><strong>${nombreUsuario}</strong></td>
                            <td>${deportista.posicion || 'Sin definir'}</td>
                            <td>${deportista.dorsal || 'Sin asignar'}</td>
                            <td>${deportista.direccion || 'No registrada'}</td>
                            <td>${deportista.edad || 'No especificada'} años</td>
                            <td>${deportista.estado ? '✅ Activo' : '❌ Inactivo'}</td>
                            <td>${deportista.nombreAcudiente || 'No registrado'}</td>
                            <td>${deportista.telefonoAcudiente || 'No disponible'}</td>
                            <td>${deportista.eps || 'Sin EPS'}</td>
                            <td>
                                <button class="edit-btn" data-id="${deportista._id || deportista.id}">Editar</button>
                                <button class="delete-btn" data-id="${deportista._id || deportista.id}">Eliminar</button>
                            </td>
                        </tr>`;
                    });
                    
                    html += '</tbody></table></div>';
                }
                
                mainContent.innerHTML = html;

                // Agregar event listeners a los botones
                setupButtonListeners();
                
            } catch (error) {
                mainContent.innerHTML = '<h2>❌ Error al cargar deportistas</h2><p>🔧 ' + error.message + '</p>';
            }
        });
    }

    


    // Función para cargar entrenadores con nombres de usuario
    if (entrenadoresLink) {
        entrenadoresLink.addEventListener('click', async (e) => {
            e.preventDefault();
            currentModel = 'entrenadores';
            try {
                const [entrenadoresResponse, usuariosResponse, categoriasResponse] = await Promise.all([
                    fetch('/api/entrenadores'),
                    fetch('/api/usuarios'),
                    fetch('/api/categorias')
                ]);
                
                const entrenadores = await entrenadoresResponse.json();
                const usuarios = await usuariosResponse.json();
                const categorias = await categoriasResponse.json();
                
                // Crear mapas para búsqueda rápida
                const usuariosMap = {};
                usuarios.forEach(usuario => {
                    usuariosMap[usuario.id] = usuario.nombre;
                });
                
                const categoriasMap = {};
                categorias.forEach(categoria => {
                    categoriasMap[categoria.id] = categoria.nombre;
                });
                
                let html = '<h2>🎯 Cuerpo Técnico - Entrenadores</h2>';
                
                // Agregar botón de búsqueda y agregar
                html += `
                <div class="crud-controls">
                    <input type="text" id="search-input" placeholder="Buscar entrenador...">
                    <button id="search-btn">Buscar</button>
                    <button id="add-btn" class="add-btn">Agregar Nuevo Entrenador</button>
                </div>`;
                
                if (entrenadores.length === 0) {
                    html += '<p>📝 No hay entrenadores registrados en el sistema.</p>';
                } else {
                    html += '<div class="table-container">';
                    html += '<table class="data-table">';
                    html += '<thead><tr>';
                    html += '<th>📄 Documento</th>';
                    html += '<th>👤 Nombre Completo</th>';
                    html += '<th>🏋️ Categoría que Entrena</th>';
                    html += '<th>🏥 EPS Afiliada</th>';
                    html += '<th>💰 Salario Mensual</th>';
                    html += '<th>🔑 Clave</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    entrenadores.forEach(entrenador => {
                        const nombreUsuario = usuariosMap[entrenador.idUsuario] || 'Sin nombre';
                        const nombreCategoria = categoriasMap[entrenador.categoria] || 'Sin categoría';
                        
                        html += `<tr>
                            <td>${entrenador.id}</td>
                            <td><strong>${nombreUsuario}</strong></td>
                            <td><span class="categoria-badge">${nombreCategoria}</span></td>
                            <td>${entrenador.eps || 'Sin EPS'}</td>
                            <td>💰 $${entrenador.salario ? entrenador.salario.toLocaleString() : 'No definido'}</td>
                            <td>*******</td>
                            <td>
                                <button class="edit-btn" data-id="${entrenador._id || entrenador.id}">Editar</button>
                                <button class="delete-btn" data-id="${entrenador._id || entrenador.id}">Eliminar</button>
                            </td>
                        </tr>`;
                    });
                    
                    html += '</tbody></table></div>';
                }
                
                mainContent.innerHTML = html;

                // Agregar event listeners a los botones
                setupButtonListeners();
                
            } catch (error) {
                mainContent.innerHTML = '<h2>❌ Error al cargar entrenadores</h2><p>🔧 ' + error.message + '</p>';
            }
        });
    }

    // Función para cargar eventos
    if (eventosLink) {
        eventosLink.addEventListener('click', async (e) => {
            e.preventDefault();
            currentModel = 'eventos';
            try {
                const [eventosResponse, usuariosResponse] = await Promise.all([
                    fetch('/api/eventos'),
                    fetch('/api/usuarios')
                ]);
                
                const eventos = await eventosResponse.json();
                const usuarios = await usuariosResponse.json();
                
                // Crear mapa de usuarios
                const usuariosMap = {};
                usuarios.forEach(usuario => {
                    usuariosMap[usuario.id] = usuario.nombre;
                });
                
                let html = '<h2>📅 Calendario de Eventos Deportivos</h2>';
                
                // Agregar botón de búsqueda y agregar
                html += `
                <div class="crud-controls">
                    <input type="text" id="search-input" placeholder="Buscar evento...">
                    <button id="search-btn">Buscar</button>
                    <button id="add-btn" class="add-btn">Agregar Nuevo Evento</button>
                </div>`;
                
                if (eventos.length === 0) {
                    html += '<p>📝 No hay eventos registrados en el sistema.</p>';
                } else {
                    html += '<div class="table-container">';
                    html += '<table class="data-table">';
                    html += '<thead><tr>';
                    html += '<th>👤 Organizador</th>';
                    html += '<th>🎯 Tipo de Evento</th>';
                    html += '<th>📝 Descripción del Evento</th>';
                    html += '<th>⏰ Horario Programado</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    eventos.forEach(evento => {
                        const nombreOrganizador = usuariosMap[evento.idUsuario] || 'Sin organizador';
                        
                        html += `<tr>
                            <td><strong>${nombreOrganizador}</strong></td>
                            <td>${evento.tipo || 'Sin tipo'}</td>
                            <td>${evento.descripcion || 'Sin descripción'}</td>
                            <td>${evento.idHorario || 'Sin horario'}</td>
                            <td>
                                <button class="edit-btn" data-id="${evento._id || evento.id}">Editar</button>
                                <button class="delete-btn" data-id="${evento._id || evento.id}">Eliminar</button>
                            </td>
                        </tr>`;
                    });
                    
                    html += '</tbody></table></div>';
                }
                
                mainContent.innerHTML = html;

                // Agregar event listeners a los botones
                setupButtonListeners();
                
            } catch (error) {
                mainContent.innerHTML = '<h2>❌ Error al cargar eventos</h2><p>🔧 ' + error.message + '</p>';
            }
        });
    }

    // Función para cargar horarios
    if (horariosLink) {
        horariosLink.addEventListener('click', async (e) => {
            e.preventDefault();
            currentModel = 'horarios';
            try {
                const response = await fetch('/api/horarios');
                const horarios = await response.json();
                
                let html = '<h2>🕐 Horarios de Entrenamiento</h2>';
                
                // Agregar botón de búsqueda y agregar
                html += `
                <div class="crud-controls">
                    <input type="text" id="search-input" placeholder="Buscar horario...">
                    <button id="search-btn">Buscar</button>
                    <button id="add-btn" class="add-btn">Agregar Nuevo Horario</button>
                </div>`;
                
                if (horarios.length === 0) {
                    html += '<p>📝 No hay horarios registrados en el sistema.</p>';
                } else {
                    html += '<div class="table-container">';
                    html += '<table class="data-table">';
                    html += '<thead><tr>';
                    html += '<th>📅 Fecha Programada</th>';
                    html += '<th>⏰ Hora de Entrenamiento</th>';
                    html += '<th>🏟️ Lugar de Práctica</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    horarios.forEach(horario => {
                        html += `<tr>
                            <td>${horario.fecha || 'Sin fecha'}</td>
                            <td>${horario.hora || 'Sin hora'}</td>
                            <td>${horario.lugar || 'Sin lugar'}</td>
                            <td>
                                <button class="edit-btn" data-id="${horario._id || horario.id}">Editar</button>
                                <button class="delete-btn" data-id="${horario._id || horario.id}">Eliminar</button>
                            </td>
                        </tr>`;
                    });
                    
                    html += '</tbody></table></div>';
                }
                
                mainContent.innerHTML = html;

                // Agregar event listeners a los botones
                setupButtonListeners();
                
            } catch (error) {
                mainContent.innerHTML = '<h2>❌ Error al cargar horarios</h2><p>🔧 ' + error.message + '</p>';
            }
        });
    }

    // Función para cargar usuarios
    if (usuariosLink) {
        usuariosLink.addEventListener('click', async (e) => {
            e.preventDefault();
            currentModel = 'usuarios';
            try {
                const response = await fetch('/api/usuarios');
                const usuarios = await response.json();
                
                let html = '<h2>👨‍👩‍👧‍👦 Miembros del Club Lynx</h2>';
                
                // Agregar botón de búsqueda y agregar
                html += `
                <div class="crud-controls">
                    <input type="text" id="search-input" placeholder="Buscar usuario...">
                    <button id="search-btn">Buscar</button>
                    <button id="add-btn" class="add-btn">Agregar Nuevo Usuario</button>
                </div>`;
                
                if (usuarios.length === 0) {
                    html += '<p>📝 No hay usuarios registrados en el sistema.</p>';
                } else {
                    html += '<div class="table-container">';
                    html += '<table class="data-table">';
                    html += '<thead><tr>';
                    html += '<th>📄 Documento</th>';
                    html += '<th>🎭 Rol en el Club</th>';
                    html += '<th>👤 Nombre</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    usuarios.forEach(usuario => {
                        html += `<tr>
                            <td>${usuario.id}</td>
                            <td><span class="badge-tipo">${usuario.tipo || 'Sin rol'}</span></td>
                            <td><strong>${usuario.nombre || 'Sin nombre'}</strong></td>
                            <td>
                                <button class="edit-btn" data-id="${usuario._id || usuario.id}">Editar</button>
                                <button class="delete-btn" data-id="${usuario._id || usuario.id}">Eliminar</button>
                            </td>
                        </tr>`;
                    });
                    
                    html += '</tbody></table></div>';
                }
                
                mainContent.innerHTML = html;

                // Agregar event listeners a los botones
                setupButtonListeners();
                
            } catch (error) {
                mainContent.innerHTML = '<h2>❌ Error al cargar usuarios</h2><p>🔧 ' + error.message + '</p>';
            }
        });
    }
    // Función para cargar categorías
    if (categoriasLink) {
        categoriasLink.addEventListener('click', async (e) => {
            e.preventDefault();
            currentModel = 'categorias';
            try {
                const response = await fetch('/api/categorias');
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                const categorias = await response.json();
                
                let html = '<h2>🏆 Categorías Deportivas</h2>';
                
                // Agregar botón de búsqueda y agregar
                html += `
                <div class="crud-controls">
                    <input type="text" id="search-input" placeholder="Buscar categoría...">
                    <button id="search-btn">Buscar</button>
                    <button id="add-btn" class="add-btn">Agregar Nueva Categoría</button>
                </div>`;
                
                if (categorias.length === 0) {
                    html += '<p>📝 No hay categorías registradas en el sistema.</p>';
                } else {
                    html += '<div class="table-container" data-model="categorias">';
                    html += '<table class="data-table">';
                    html += '<thead><tr>';
                    html += '<th>🔢 ID</th>';
                    html += '<th>📋 Nombre de Categoría</th>';
                    html += '<th>Acciones</th>';
                    html += '</tr></thead>';
                    html += '<tbody>';
                    
                    categorias.forEach(categoria => {
                        html += `<tr>
                            <td>${categoria.id || ''}</td>
                            <td><strong>${categoria.nombre || 'Sin nombre'}</strong></td>
                            <td>
                                <button class="edit-btn" data-id="${categoria._id || categoria.id}">Editar</button>
                                <button class="delete-btn" data-id="${categoria._id || categoria.id}">Eliminar</button>
                            </td>
                        </tr>`;
                    });
                    
                    html += '</tbody></table></div>';
                }
                
                mainContent.innerHTML = html;

                // Agregar event listeners a los botones
                setupButtonListeners();
                
            } catch (error) {
                console.error('Error al cargar categorías:', error);
                mainContent.innerHTML = '<h2>❌ Error al cargar categorías</h2><p>🔧 ' + error.message + '</p>';
            }
        });
    }

    // ==================== FUNCIONES CRUD ====================

    // Configurar listeners para botones de editar, eliminar, buscar y agregar
    // Configurar listeners para botones de editar, eliminar, buscar y agregar
    function setupButtonListeners() {
        // Botones de editar
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                console.log(`Botón editar clickeado, ID: ${id}`);
                
                // Verificar que tenemos un ID válido
                if (!id) {
                    alert('Error: No se pudo obtener el ID del registro');
                    return;
                }
                
                // Guardar información del botón para referencia
                const row = this.closest('tr');
                const cells = row.querySelectorAll('td');
                console.log(`Editando fila con ${cells.length} columnas`);
                
                // Extraer datos directamente de la fila para tener un respaldo
                const rowData = {};
                
                // Extraer datos según el modelo actual
                if (currentModel === 'deportistas') {
                    rowData.id = cells[0].textContent.trim();
                    rowData.idUsuario = cells[1].querySelector('strong') ? 
                        cells[1].querySelector('strong').textContent.trim() : 
                        cells[1].textContent.trim();
                    rowData.posicion = cells[2].textContent.trim();
                    rowData.dorsal = cells[3].textContent.trim().replace('Sin asignar', '');
                    rowData.direccion = cells[4].textContent.trim().replace('No registrada', '');
                    rowData.edad = cells[5].textContent.trim().replace(' años', '').replace('No especificada', '');
                    rowData.estado = cells[6].textContent.includes('✅');
                    rowData.nombreAcudiente = cells[7].textContent.trim().replace('No registrado', '');
                    rowData.telefonoAcudiente = cells[8].textContent.trim().replace('No disponible', '');
                    rowData.eps = cells[9].textContent.trim().replace('Sin EPS', '');
                } else if (currentModel === 'entrenadores') {
                    rowData.id = cells[0].textContent.trim();
                    rowData.idUsuario = cells[1].querySelector('strong') ? 
                        cells[1].querySelector('strong').textContent.trim() : 
                        cells[1].textContent.trim();
                    rowData.categoria = cells[2].textContent.trim().replace('Sin categoría', '');
                    rowData.eps = cells[3].textContent.trim().replace('Sin EPS', '');
                    rowData.salario = cells[4].textContent.trim().replace('💰 $', '').replace('No definido', '').replace(',', '');
                } else if (currentModel === 'eventos') {
                    rowData.idUsuario = cells[0].querySelector('strong') ? 
                        cells[0].querySelector('strong').textContent.trim() : 
                        cells[0].textContent.trim();
                    rowData.tipo = cells[1].textContent.trim().replace('Sin tipo', '');
                    rowData.descripcion = cells[2].textContent.trim().replace('Sin descripción', '');
                    rowData.idHorario = cells[3].textContent.trim().replace('Sin horario', '');
                } else if (currentModel === 'horarios') {
                    rowData.fecha = cells[0].textContent.trim().replace('Sin fecha', '');
                    rowData.hora = cells[1].textContent.trim().replace('Sin hora', '');
                    rowData.lugar = cells[2].textContent.trim().replace('Sin lugar', '');
                } else if (currentModel === 'usuarios') {
                    rowData.id = cells[0].textContent.trim();
                    rowData.tipo = cells[1].textContent.trim().replace('Sin rol', '');
                    rowData.nombre = cells[2].querySelector('strong') ? 
                        cells[2].querySelector('strong').textContent.trim() : 
                        cells[2].textContent.trim();
                }else if (currentModel === 'categorias') {
                    rowData.id = cells[0].textContent.trim();
                    rowData.nombre = cells[1].querySelector('strong') ? 
                        cells[1].querySelector('strong').textContent.trim() : 
                        cells[1].textContent.trim().replace('Sin nombre', '');
                }
                
                console.log('Datos extraídos de la fila:', rowData);
                
                // Iniciar proceso de edición
                editItem(id, rowData);
            });
        });

        // Botones de eliminar
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                console.log(`Botón eliminar clickeado, ID: ${id}`);
                
                // Verificar que tenemos un ID válido
                if (!id) {
                    alert('Error: No se pudo obtener el ID del registro');
                    return;
                }
                
                // Mostrar confirmación con información del elemento
                const row = this.closest('tr');
                const firstCell = row.querySelector('td');
                const itemName = firstCell ? firstCell.textContent.trim() : 'este registro';
                
                const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar ${itemName}? Esta acción no se puede deshacer.`);
                
                if (confirmDelete) {
                    deleteItem(id);
                }
            });
        });

        // Botón de búsqueda con capacidad de búsqueda por tecla Enter
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const searchTerm = this.value.trim();
                    console.log(`Búsqueda iniciada por Enter: "${searchTerm}"`);
                    searchItems(searchTerm);
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const searchTerm = document.getElementById('search-input').value.trim();
                console.log(`Búsqueda iniciada por botón: "${searchTerm}"`);
                searchItems(searchTerm);
            });
        }

        // Botón de agregar
        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                console.log(`Iniciando creación de nuevo ${currentModel.slice(0, -1)}`);
                addItem();
            });
        }
        
        // Añadir manejador para tecla Escape en todo el documento para cerrar modales
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                console.log('Modal cerrado con tecla Escape');
                closeModal();
            }
        });
        
        console.log('Listeners configurados correctamente');
    }

    // Función para abrir modal de edición
    // Función para abrir modal de edición - REEMPLAZA LA ACTUAL
    async function editItem(id, rowData) {
        try {
            console.log(`Intentando editar ${currentModel} con ID: ${id}`);
            console.log('Datos extraídos de la fila:', rowData);
            
            // Asegurarse de que el ID sea válido
            if (!id) {
                throw new Error('ID no válido');
            }
            
            // Si tenemos datos de la fila, usarlos directamente
            if (rowData && Object.keys(rowData).length > 0) {
                // Añadir el ID de MongoDB para la actualización
                rowData._id = id;
                console.log('Usando datos extraídos para edición:', rowData);
                openModal('Editar', rowData);
                return;
            }
            
            // Si no hay datos de fila, intentar obtenerlos del servidor
            console.log(`Consultando API para ${currentModel}/${id}`);
            const response = await fetch(`/api/${currentModel}/${id}`);
            
            // Verificar respuesta HTTP
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error HTTP ${response.status}: ${errorText}`);
                throw new Error(`Error al obtener datos (${response.status})`);
            }
            
            const item = await response.json();
            console.log('Datos obtenidos del servidor para editar:', item);
            
            // Verificar que el item tiene datos
            if (!item || Object.keys(item).length === 0) {
                throw new Error('No se recibieron datos válidos del servidor');
            }
            
            openModal('Editar', item);
        } catch (error) {
            console.error('Error al cargar item para editar:', error);
            alert(`Error al cargar datos: ${error.message}`);
        }
    }

    // Función para eliminar item
    async function deleteItem(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.')) {
            try {
                console.log(`Intentando eliminar ${currentModel} con ID: ${id}`);
                
                // Asegurarse de que el ID sea válido
                if (!id) {
                    throw new Error('ID no válido');
                }
                
                const response = await fetch(`/api/${currentModel}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                // Verificar respuesta HTTP y mostrar detalles
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error HTTP ${response.status}: ${errorText}`);
                    throw new Error(`Error al eliminar (${response.status})`);
                }
                
                console.log('Eliminación exitosa');
                
                // Recargar la lista después de eliminar
                const menuLink = document.getElementById(`${currentModel}-link`);
                if (menuLink) {
                    menuLink.click();
                }
                
                alert('✅ Registro eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert(`❌ Error al eliminar el registro: ${error.message}`);
            }
        }
    }

    // Función para buscar items
    async function searchItems(term) {
        if (!term) {
            // Si la búsqueda está vacía, recargar todos los datos
            const menuLink = document.getElementById(`${currentModel}-link`);
            if (menuLink) {
                menuLink.click();
            }
            return;
        }
        
        try {
            const response = await fetch(`/api/${currentModel}/search/${term}`);
            if (!response.ok) throw new Error('Error en la búsqueda');
            
            // Simular clic en el enlace actual pero con los datos filtrados
            const event = new Event('click');
            event.searchResults = await response.json();
            
            const menuLink = document.getElementById(`${currentModel}-link`);
            if (menuLink) {
                menuLink.dispatchEvent(event);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('❌ Error al realizar la búsqueda');
        }
    }

    // Función para abrir modal para agregar nuevo item
    function addItem() {
        openModal('Agregar', {});
    }


    // Función para abrir modal
    function openModal(action, data) {
        console.log(`Abriendo modal para ${action} con datos:`, data);
        modalTitle.textContent = `${action} ${currentModel.slice(0, -1)}`;
        formFields.innerHTML = '';
        
        const fields = models[currentModel].fields;
        fields.forEach(field => {
            let fieldHtml = `
                <div class="form-group">
                    <label for="${field.name}">${field.label}:</label>
            `;
            
            // Asegurar que data[field.name] no sea undefined
            const fieldValue = data[field.name] !== undefined ? data[field.name] : '';
            
            if (field.type === 'textarea') {
                fieldHtml += `
                    <textarea id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>${fieldValue}</textarea>
                `;
            } else if (field.type === 'checkbox') {
                fieldHtml += `
                    <input type="checkbox" id="${field.name}" name="${field.name}" ${fieldValue ? 'checked' : ''}>
                `;
            } else if (field.type === 'select' && field.options) {
                fieldHtml += `
                    <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                        <option value="">Seleccione...</option>
                        ${field.options.map(option => `
                            <option value="${option}" ${fieldValue === option ? 'selected' : ''}>${option}</option>
                        `).join('')}
                    </select>
                `;
            } else {
                fieldHtml += `
                    <input type="${field.type}" id="${field.name}" name="${field.name}" 
                        value="${fieldValue}" ${field.required ? 'required' : ''}>
                `;
            }
            
            fieldHtml += '</div>';
            formFields.innerHTML += fieldHtml;
        });
        
        // Guardar el ID que se está editando
        editingId = data._id || data.id || null;
        console.log(`ID establecido para edición: ${editingId}`);
        
        // Mostrar el modal
        modal.style.display = 'block';
    }

    // Función para cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        editingId = null;
    }


    // Función para guardar datos
    async function saveData() {
        try {
            const formData = new FormData(editForm);
            const data = {};
            
            // Recopilar datos del formulario
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Manejar checkboxes
            const checkboxes = editForm.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                data[checkbox.name] = checkbox.checked;
            });
            
            console.log(`Guardando datos para ${currentModel}:`, data);
            console.log(`ID de edición: ${editingId || 'nuevo registro'}`);
            
            let response;
            
            if (editingId) {
                // Actualizar existente
                response = await fetch(`/api/${currentModel}/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } else {
                // Crear nuevo
                response = await fetch(`/api/${currentModel}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            
            // Verificar respuesta HTTP
            if (!response.ok) {
                const errorData = await response.text();
                console.error(`Error HTTP ${response.status}:`, errorData);
                throw new Error(`Error al guardar (${response.status})`);
            }
            
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            
            // Cerrar modal y recargar datos
            closeModal();
            
            // Simular clic en el enlace actual para recargar datos
            const menuLink = document.getElementById(`${currentModel}-link`);
            if (menuLink) {
                menuLink.click();
            }
            
            alert(`✅ Registro ${editingId ? 'actualizado' : 'creado'} correctamente`);
            
        } catch (error) {
            console.error('Error al guardar:', error);
            alert(`❌ Error al ${editingId ? 'actualizar' : 'crear'} registro: ${error.message}`);
        }
    }
});
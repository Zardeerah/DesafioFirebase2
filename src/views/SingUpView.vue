<template>
    <div class="container-signup">
        <h2>Registro</h2>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <input type="email" v-model="email" placeholder="Correo Electrónico" required @input="clearError">

        <input type="password" v-model="password" placeholder="Contraseña" required minlength="6" @input="clearError">

        <button @click="register" :disabled="isSubmitting">
            {{ isSubmitting ? "Registrando..." : "Registrarse" }}
        </button>
    </div>
</template>

<script>
import { auth, createUserWithEmailAndPassword } from '../auth.js'

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: null,
            isSubmitting: false
        }
    },
    methods: {
        async register() {
            // Validar que los campos no estén vacíos
            if (!this.email || !this.password) {
                this.errorMessage = "Por favor, completa todos los campos.";
                return;
            }

            // Iniciar el estado de envío
            this.isSubmitting = true;

            try {
                // Crear nuevo usuario con el correo y la contraseña
                const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                console.log("Usuario creado", userCredential);

                // Limpiar los campos del formulario y error
                this.email = '';
                this.password = '';
                this.errorMessage = null;

                // Redirigir a la página de inicio después del registro exitoso
                this.$router.push('/');
            } catch (error) {
                // Manejo de errores en el registro
                if (error.code === 'auth/email-already-in-use') {
                    this.errorMessage = "El correo electrónico ya está en uso.";
                } else if (error.code === 'auth/invalid-email') {
                    this.errorMessage = "El correo electrónico no es válido.";
                } else if (error.code === 'auth/weak-password') {
                    this.errorMessage = "La contraseña debe tener al menos 6 caracteres.";
                } else {
                    this.errorMessage = "Ocurrió un error durante el registro.";
                }
                console.log("Error al crear el usuario:", error);
            } finally {
                // Restablecer el estado de envío
                this.isSubmitting = false;
            }
        },
        clearError() {
            this.errorMessage = null;
        }
    }
}
</script>

<style scoped>
.container-signup {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #94d3a2;
}

.error-message {
    color: red;
    margin-bottom: 10px;
    text-align: center;
}
</style>
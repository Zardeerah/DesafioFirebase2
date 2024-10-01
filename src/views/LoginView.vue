<template>
    <div class="container-login">
        <h2>Si quieres conocer la Bibliografía de Coldplay, inicia sesión</h2>

        <h3>¿Es tu primera vez? <router-link to="/singup">Regístrate</router-link></h3>

        <!-- Campo de correo electrónico -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <input type="email" v-model="email" placeholder="Correo Electrónico" required>

        <!-- Campo de contraseña -->
        <input type="password" v-model="password" placeholder="Contraseña" required @input="clearError">

        <!-- Botón para iniciar sesión -->
        <!-- Botón para iniciar sesión -->
        <button @click.prevent="signIn">Iniciar Sesión</button>
      
        
    </div>
</template>

<script>
import { auth, signInWithEmailAndPassword } from '../auth.js'

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        }
    },
    methods: {
        async signIn() {
            if (!this.email || !this.password) {
                this.errorMessage = 'Por favor, completa todos los campos.';
                return;
            }

            try {
                await signInWithEmailAndPassword(auth, this.email, this.password)
                const redirectPath = this.$route.query.redirect || '/';
                this.$router.push(redirectPath);
            } catch (error) {
                this.errorMessage = 'Error al iniciar sesión. Inténtalo nuevamente.';
            }
        }
    }
}
</script>

<style scoped>
.container-login {
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
    margin-bottom: 20px;
}

h3 {
    text-align: center;
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
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

.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}
</style>
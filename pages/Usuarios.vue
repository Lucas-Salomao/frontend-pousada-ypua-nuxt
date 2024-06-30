<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="pa-5">
                    <v-card-title class="headline text-center">
                        Registro de Usuário
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="nome" label="Nome Completo" :rules="nomeRules"
                                required></v-text-field>
                            <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>

                            <v-text-field v-model="senha" label="Senha" :rules="senhaRules" type="password"
                                required></v-text-field>

                            <v-text-field v-model="rg" label="RG" :rules="rgRules" required></v-text-field>

                            <v-text-field v-model="cpf" label="CPF" :rules="cpfRules" required></v-text-field>

                            <v-text-field v-model="rua" label="Rua" :rules="ruaRules" required></v-text-field>

                            <v-text-field v-model="numero" label="Número" :rules="numeroRules" required></v-text-field>

                            <v-text-field v-model="complemento" label="Complemento"></v-text-field>

                            <v-text-field v-model="bairro" label="Bairro" :rules="bairroRules" required></v-text-field>

                            <v-text-field v-model="cidade" label="Cidade" :rules="cidadeRules" required></v-text-field>

                            <v-text-field v-model="estado" label="Estado" :rules="estadoRules" required></v-text-field>

                            <v-text-field v-model="pais" label="País" :rules="paisRules" required></v-text-field>

                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="registrar">
                                Registrar
                            </v-btn>

                            <v-btn color="error" @click="limparFormulario"> Limpar </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        valid: false,
        nome: '',
        email: '',
        senha: '',
        rg: '',
        cpf: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: '',
        nomeRules: [(v) => !!v || 'Nome é obrigatório'],
        emailRules: [
            (v) => !!v || 'Email é obrigatório',
            (v) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
        ],
        senhaRules: [(v) => !!v || 'Senha é obrigatória'],
        rgRules: [(v) => !!v || 'RG é obrigatório'],
        cpfRules: [(v) => !!v || 'CPF é obrigatório'],
        ruaRules: [(v) => !!v || 'Rua é obrigatória'],
        numeroRules: [(v) => !!v || 'Número é obrigatório'],
        bairroRules: [(v) => !!v || 'Bairro é obrigatório'],
        cidadeRules: [(v) => !!v || 'Cidade é obrigatória'],
        estadoRules: [(v) => !!v || 'Estado é obrigatório'],
        paisRules: [(v) => !!v || 'País é obrigatório'],
    }),
    methods: {
        limparFormulario() {
            this.$refs.form.reset();
        },
        async registrar() {
            if (this.$refs.form.validate()) {
                try {
                    const response = await axios.post('http://localhost:3000/usuarios', {
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha,
                        rg: this.rg,
                        cpf: this.cpf,
                        rua: this.rua,
                        numero: this.numero,
                        complemento: this.complemento,
                        bairro: this.bairro,
                        cidade: this.cidade,
                        estado: this.estado,
                        pais: this.pais,
                        role: 'usuario', // Defina o papel padrão aqui
                    });
                    console.log('Usuário registrado:', response.data);
                    this.$router.push('/login'); // Redireciona para a página de login após o registro
                } catch (error) {
                    console.error('Erro ao registrar usuário:', error);
                    // Exiba uma mensagem de erro para o usuário
                }
            }
        },
    },
};
</script>
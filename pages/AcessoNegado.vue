<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Acesso Negado</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="pt-8">
                        <p>Você não tem permissão para acessar esta página.</p>
                        <p>Entre em contato com o administrador do sistema se precisar de acesso.</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="$router.push('/')">
                            Voltar para a página inicial
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
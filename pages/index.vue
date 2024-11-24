<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline">Bem-vindo à Pousada Ypuã</v-card-title>
                    <v-card-text>
                        <div>
                            <iframe width="100%" height="720" src="https://www.youtube.com/embed/I8iT0OJ7Zd4" title="Pousada Quinta do Ypuã" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
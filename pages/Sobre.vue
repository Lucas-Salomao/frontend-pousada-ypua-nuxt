<template>
  <v-container>
    <v-row>
      <!-- <v-col> -->
        <v-img
  max-height="300"
  max-width="300"
  src="https://static.wixstatic.com/media/b87f83_7d60555efc05456aacb2215e818c8021~mv2.jpg/v1/crop/x_0,y_1513,w_3648,h_3680/fill/w_301,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_1780.jpg"
></v-img>
      <!-- </v-col> -->
      <v-col>
        <v-card>
          <v-card-text>
            <p class="font-weight-regular">
              A pousada Quinta do Ypuã oferece ao seus clientes um recanto de
              aconchego e lazer, em ambiente rústico e agradável. Ideal para
              quem gosta de fugir da rotina e procura um local de paz para
              descansar e curtir a natureza.<br /><br />
            </p>
            <p class="font-italic">
              "O Ypuã tem tudo a ver com a natureza, dá para sentir a energia do
              lugar. Eu me preocupo se você vai comer bem, dormir bem e se vai
              se sentir em casa. Vou te mostrar onde encontrar os melhores
              frutos do mar, onde curtir a melhor praia e as melhores ondas. Mas
              se você não quiser fazer nada eu também conheço o melhor lugar."
            </p>
            <p class="font-weight-regular">HEITOR, Anfitrião da pousada</p>
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
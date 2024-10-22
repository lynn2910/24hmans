<template>
 <div class="tirage-au-sort">

  <!-- Titre de la page -->
  <h1>Tirage au sort</h1>

  <!-- Section des règles -->
  <section class="regles">
   <h2>Règles pour participer au tirage au sort</h2>
   <ul>
    <li>Le participant doit être majeur pour participer.</li>
    <li>Un seul billet par participant.</li>
    <li>Les informations fournies doivent être exactes et vérifiables.</li>
    <li>La participation au tirage au sort est ouverte jusqu'au <strong>25 juin 2025</strong>.</li>
    <li>Les gagnants seront informés par mail le <strong>26 juin 2025</strong></li>
   </ul>
  </section>

  <!-- Formulaire d'inscription -->
  <section class="inscription">
   <h2>Inscription au tirage au sort</h2>
   <form @submit.prevent="inscrire">
    <div>
     <label for="nom">Nom :</label>
     <input type="text" id="nom" v-model="form.nom" required />
    </div>

    <div>
     <label for="prenom">Prénom :</label>
     <input type="text" id="prenom" v-model="form.prenom" required />
    </div>

    <div>
     <label for="email">E-mail :</label>
     <input type="email" id="email" v-model="form.email" required />
    </div>

    <div>
     <label for="billet">Numéro de billet :</label>
     <input type="text" id="billet" v-model="form.billet" required />
    </div>

    <button type="submit">S'inscrire</button>
   </form>
  </section>

  <!-- Confirmation de participation -->
  <section v-if="messageConfirmation">
   <h2>Confirmation</h2>
   <p>{{ messageConfirmation }}</p>
  </section>

  <!-- Notification des gagnants par mail -->
 </div>
</template>!nb

<script>
export default {
 data() {
  return {
   form: {
    nom: '',
    prenom: '',
    email: '',
    billet: ''
   },
   messageConfirmation: ''
  };
 },
 methods: {
  inscrire() {
   // Simule l'envoi des données et la confirmation par mail
   // Dans une vraie application, ici, on enverrait les données à une API backend
   this.messageConfirmation = `Merci, ${this.form.prenom} ${this.form.nom}, pour votre inscription !
       Un e-mail de confirmation a été envoyé à ${this.form.email}.`;

   // Réinitialiser le formulaire après l'inscription
   this.form.nom = '';
   this.form.prenom = '';
   this.form.email = '';
   this.form.billet = '';
  }
 }
};
</script>

<style scoped>
.tirage-au-sort {
 margin-top: 200px; /* Augmente la marge pour abaisser le contenu */
 display: flex;
 flex-direction: column;
 align-items: center; /* Centre horizontalement le contenu */
}

form {
 margin-top: 20px;
 text-align: left;
 width: 300px; /* Maintient le formulaire plus petit pour qu'il soit centré */
}

h1, h2 {
 font-size: 32px;
 color: #333;
 text-align: center; /* Centre les titres */
}
.regles ul {
 list-style-type: disc;
 margin-left: 20px;
 font-size: 18px;
}

form div {
 margin-bottom: 10px;
}

label {
 display: inline-block;
 width: 100px;
}

input {
 padding: 5px;
 font-size: 16px;
}

button {
 display: block;
 margin: 20px auto; /* Centre le bouton d'inscription */
 background-color: #0D64FF;
 color: white;
 border: none;
 padding: 10px 20px;
 cursor: pointer;
}

button:hover {
 background-color: #07327F;
}
</style>

Dans Vue.js, les options `data`, `computed`, `methods` et `created` sont des parties essentielles du cycle de vie d'un
composant et de sa gestion d'état. Voici une explication de chacune de ces options et de leur rôle dans le code que vous
avez fourni :

### 1. **`data()`**

- **Rôle :** `data` est utilisé pour définir les propriétés réactives du composant. Ce sont des valeurs qui peuvent
  changer au cours de la vie du composant et qui, lorsqu'elles changent, provoquent une mise à jour de l'interface
  utilisateur.
- **Utilisation dans votre code :**
  ```javascript
  data() {
    return {
      selectedPrestataire: null,
    };
  }
  ```
  Ici, `selectedPrestataire` est défini comme une propriété réactive qui représente l'ID du prestataire actuellement
  sélectionné. Lorsque cette valeur change (par exemple, l'utilisateur sélectionne un autre prestataire), l'interface
  utilisateur est mise à jour en conséquence.

### 2. **`computed`**

- **Rôle :** `computed` est une propriété qui permet de définir des valeurs calculées basées sur les propriétés de
  données. Ces valeurs sont recalculées uniquement lorsque les dépendances de ces valeurs changent. Cela permet
  d'optimiser les performances en évitant des calculs inutiles.
- **Utilisation dans votre code :**
  ```javascript
  computed: {
    ...mapGetters("prestataire", ["prestataires"]),
    selectedPrestataireServices() {
      const prestataire = this.prestataires.find((p) => p.id === this.selectedPrestataire);
      return prestataire ? prestataire.services || [] : [];
    }
  }
  ```
    - `mapGetters("prestataire", ["prestataires"])` est utilisé pour lier les données du store Vuex, ce qui vous permet
      d'accéder à la liste des `prestataires` dans le store global.
    - `selectedPrestataireServices` est une valeur calculée qui retourne la liste des services associés au `prestataire`
      sélectionné. Dès que `selectedPrestataire` change, cette propriété sera recalculée pour afficher les services du
      prestataire actuel.

### 3. **`methods`**

- **Rôle :** `methods` contient les fonctions ou méthodes que vous souhaitez exécuter dans le composant. Ces méthodes
  peuvent être appelées par l'utilisateur (par exemple, lors d'un événement comme un clic) ou par d'autres parties de
  votre code.
- **Utilisation dans votre code :**
  ```javascript
  methods: {
    loadServices() {
      if (this.selectedPrestataire) {
        this.$store.dispatch("prestataires/loadServicesForPrestataire", this.selectedPrestataire);
      }
    }
  }
  ```
    - La méthode `loadServices()` est appelée pour charger les services du prestataire sélectionné. Elle vérifie d'abord
      si un prestataire a été sélectionné (`this.selectedPrestataire`), puis elle déclenche une action Vuex pour
      récupérer les services associés à ce prestataire. Cela peut être appelé, par exemple, lorsqu'un utilisateur change
      de prestataire.

### 4. **`created()`**

- **Rôle :** `created()` est un **hook de cycle de vie** dans Vue.js. Cette méthode est exécutée une fois que le
  composant est créé (c'est-à-dire après la phase d'initialisation des données et avant que le composant ne soit monté
  dans le DOM). Elle est souvent utilisée pour effectuer des actions initiales comme charger des données à partir d'une
  API ou configurer des valeurs de base.
- **Utilisation dans votre code :**
  ```javascript
  created() {
    this.$store.dispatch("prestataire/getAllPrestataires");
  }
  ```
    - Ici, la méthode `created()` est utilisée pour déclencher une action Vuex (`getAllPrestataires`) qui charge les
      prestataires depuis le store global dès que le composant est créé. Cela garantit que la liste des prestataires est
      récupérée et disponible dès le premier affichage du composant.

---

### Résumé des rôles :

- **`data` :** Déclare des variables réactives (comme l'ID du prestataire sélectionné).
- **`computed` :** Déclare des propriétés calculées, qui réagissent aux changements dans les propriétés de données ou
  les getters Vuex.
- **`methods` :** Contient les fonctions que vous pouvez appeler pour effectuer des actions (par exemple, charger des
  services pour un prestataire).
- **`created` :** Un hook de cycle de vie pour effectuer des actions après la création du composant, comme appeler des
  actions pour charger des données (ici, la liste des prestataires).

Ces options vous permettent de séparer la logique de gestion des données, de calculer des valeurs à la volée et de
réagir à des événements, tout en assurant que votre composant reste réactif aux changements d'état.
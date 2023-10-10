<template>
  <div class="px-10" style="display: flex;flex-direction: column;width: 100%" v-if="!screenIsMobile"> <!-- screenIsMobile from appMixin.js -->
    <!-- region Menu-Line -->
    <div style="display: flex;flex-direction: row;width: 100%">
      <v-card class="pa-2" width="100%">
        <v-btn @click="preView = !preView">{{ preView ? 'Előnézet' : 'Szerkesztő nézet' }}</v-btn>
      </v-card>
    </div>

    <!-- region Edit-Mode -->
    <div v-if="!preView" class="pa-2" style="display: flex;flex-direction: row;gap:10px;width: 100%">
      <div style="display: flex;flex-direction: column;width: 100%">
        <v-card class="pa-2 emailComponents" width="100%">
          <EmailComponents
              v-model="emailComponents"
          ></EmailComponents>
        </v-card>
      </div>
      <div style="display: flex;flex-direction: row;width: 40%">
        <ComponentList
            :components="components"
        />
      </div>
    </div>

    <!-- View-mode -->
    <div v-else>
      <v-card class="pa-2" width="100%">
        <v-card-title>
          Email tartalom
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" :disabled="!emailContent" @click="copyHtml" text>Copy HTML</v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="!preView" v-html="emailContent"></div>
          <EmailComponentsPreview
              v-else
              :components="emailComponents"
              v-on:html="emailContent = $event"
          />
        </v-card-text>
      </v-card>
    </div>

  </div>

  <v-card class="pa-2" v-else>
    <p>Feltételezzük hogy Mobile-ról látogatod az oldalt, kérlek látogasd meg asztali gépről vagy laptopról.<br>Előre is köszönjük!</p>
    <p>We assume you are visiting the site from Mobile, please visit from desktop or laptop.<br>Thank you in advance!</p>
  </v-card>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";
import Components from "@/components/Template";

export default {
  name: "index",
  async beforeMount() {
    const components = []
    let index = 0;
    Object.entries(Components).forEach(component => {
      const time = new Date().getTime();
      index++;
      if (component[1].component){
        components.push(component[1])
        /*components.push({
          name: 'Template'+component[0],
          component: component[1].component,
          props: component[1].defaultProps,
          id: component[0]+'-'+index
        })*/
      }
    });
    this.components = components;
    this.emailComponents = []; // JSON.parse(JSON.stringify(components));
  },
  data() {
    return {
      dragging: false,
      pageRowCount: 1,
      pageColCount: 1,
      pageWidth: 1024,
      pageHeight: 768,
      pageMarginTop: 100,

      newComponentDialog: null,
      newComponentDialogComponents: null,
      newComponentDialogType: null,
      newComponentDialogIndex: null,
      selectedComponent: null,

      preView: false,
      components: [],
      component: null,
      emailComponents: [],
      emailContent: '',
      selectOtions: {
        lay: [
          {text: 'Bal', value: 'left'},
          {text: 'Közép', value: 'center'},
          {text: 'Jobb', value: 'right'},
        ],
      },
    };
  },
  methods: {
    openNewComponentDialog(type){
      if (type === 'ADD'){
        this.selectedComponent = null;
        this.component = null;
      }

      this.newComponentDialogComponents = JSON.parse(JSON.stringify(this.components));
      this.newComponentDialogType = type;
      this.newComponentDialog = true;
    },
    addToEmailContent(component){
      if (this.newComponentDialogType === 'ADD'){
        this.emailComponents.push(component)
      } else {
        this.emailComponents[this.newComponentDialogIndex] = component;
      }

      //const comp = this.$refs.currComp.$el.outerHTML;
      //console.log(comp)
      this.newComponentDialog = false;
      this.newComponentDialogIndex = null;
      //this.emailContent += comp;
    },
    editComponentToEmailContent(comp, key){
      this.selectedComponent = comp.name;
      this.component = comp;
      this.newComponentDialogIndex = key;

      this.openNewComponentDialog('MODIFY')
    },
    copyHtml(){
      this.copyText(this.emailContent);
    }
  },
  watch: {
    selectedComponent(val){
      if (val){
        const component = JSON.parse(JSON.stringify(this.newComponentDialogComponents.find(component => component.name === val)))
        if (component){
          this.component = component;
        } else {
          this.component = null;
        }
      } else {
        this.component = null;
      }
    }
  }
}
</script>

<style scoped>
.form {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}

.emailComponents {
  height: 100%;
  width: 100%;
}
</style>

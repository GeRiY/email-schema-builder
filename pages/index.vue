<template>
  <div style="display: flex;flex-direction: column;width: 100%">
    <div class="pa-2" style="display: flex;flex-direction: row;width: 100%">
      <v-card width="100%">
        <v-btn @click="preView = !preView">{{ preView ? 'Előnézet' : 'Szerkesztő nézet' }}</v-btn>
      </v-card>
    </div>
    <div v-if="!preView" class="pa-2" style="display: flex;flex-direction: row;gap:10px;width: 100%">
      <div style="display: flex;flex-direction: column;width: 100%">
        <v-card class="pa-2 emailComponents" width="100%">
          <draggable
              v-model="emailComponents"
              class="mt-5 emailComponents"
              :group="{ name: 'emailComponents', pull: false, put: true }"
          >
            <v-card class="pa-2 mt-2"
                    width="100%%"
                    v-for="(comp, index) in emailComponents"
                    :key="comp.id"
                    :id="comp.id"
            >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" disabled @click="editComponentToEmailContent(comp,index)" text>Modify</v-btn>
                <v-btn color="blue darken-1" @click="emailComponents.splice(index, 1)" text>Remove</v-btn>
              </v-card-actions>
              <component
                  :is="'Template'+comp.component.name"
                  v-bind="comp.props"
                  :ref="`comp-${index}`"
              ></component>
            </v-card>
          </draggable>
        </v-card>
      </div>
      <div style="display: flex;flex-direction: row;width: 40%">
        <v-card width="100%">
          <v-card-title>
            Komponensek
          </v-card-title>
          <draggable
              v-model="components"
              class="mt-5 components"
              :sort="false"
              :group="{ name: 'emailComponents', pull: 'clone', put: false }"
              :clone="cloneItem"
          >
            <v-card class="pa-2 mt-2"
                    width="100%%"
                    v-for="comp in components"
                    :key="comp.id"
                    :id="comp.id"
            >
              <div>{{ comp.name }}</div>
            </v-card>
          </draggable>
        </v-card>
      </div>
    </div>

    <!-- preview -->
    <div v-else>
      <v-card class="pa-2" width="100%">
        <v-card-title>
          Email tartalom
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="copyHtml()" text>Copy HTML</v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="!preView" v-html="emailContent"></div>
          <div v-else>
            <div v-for="(comp, index) in emailComponents" :key="index">
              <component
                  :is="'Template'+comp.component.name"
                  v-bind="comp.props"
                  :ref="`comp-${index}`"
              ></component>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import {getToken} from "@/api/loginHelper";
import {APIGET} from "@/api/apiHelper";
import moment from "moment/moment";
import draggable from 'vuedraggable'
import Components from "@/components/Template";

export default {
  name: "index",
  components: {
    draggable
  },
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
    changeView(){
      let emailContent = '';
      if (!this.preView){
        this.emailComponents.forEach((comp,index) => {
          emailContent += this.$refs[`comp-${index}`][0].$el.outerHTML;
        })
        this.preView = true;
      } else {
        this.preView = false;
      }
      this.emailContent = emailContent;
    },
    /*onDragStart(evt) {

    },
    onDragEnd(evt) {

    },*/
    cloneItem(item) {
      const clonedItem = JSON.parse(JSON.stringify(item))
      const time = new Date().getTime();
      clonedItem.id += '_'+time;
      return clonedItem;
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

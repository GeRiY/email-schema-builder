<template>
  <div style="display: flex;flex-direction: column;width: 100%">
    <div class="pa-2" style="display: flex;flex-direction: row;width: 100%">
      <v-card width="100%">
        Menüsáv
      </v-card>
    </div>
    <div class="pa-2" style="display: flex;flex-direction: row;gap:10px;width: 100%">
      <div style="display: flex;flex-direction: column;width: 100%">
        <v-card width="100%">
          <draggable
              v-model="emailComponents"
              :list="emailComponents"
              class="mt-5"
              group="emailComponents"
              @start="onDragStart"
              @end="onDragEnd"
          >
            <v-card class="pa-2 mt-2"
                    width="100%%"
                    :key="'email-component-'+index"
                    v-for="(comp, index) in emailComponents"
            >
              <div>{{ comp.name }}</div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="editComponentToEmailContent(comp,key)" text>Modify</v-btn>
                <v-btn color="blue darken-1" @click="emailComponents.splice(key, 1)" text>Remove</v-btn>
              </v-card-actions>
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
              :list="components"
              class="mt-5"
              :sort="false"
              group="emailComponents"
              :options="{ name: 'emailComponents', pull: 'clone', put: false }"
              :clone="cloneItem"
              @start="onDragStart"
              @end="onDragEnd"
          >
            <v-card class="pa-2 mt-2"
                    width="100%%"
                    :key="'component-'+index"
                    v-for="(comp,index) in components"
            >
              <div>{{ comp.name }}</div>
            </v-card>
          </draggable>
        </v-card>
      </div>
    </div>
  </div>
<!--  <div class="pa-2 mx-2 my-2" style="background: #ffffff;width: 100%">
    <div></div>
    <p>View: {{ preView ? 'Előnézet' : 'Szerkesztő' }}</p>

    &lt;!&ndash; i want to a field to set page infos like page width and height &ndash;&gt;
    <div class="form">
      <v-text-field
          v-model="pageRowCount"
          label="Page Row count"
          type="number"
          :rules="[
            v => (parseInt(v) && v >= 0) || 'Must be greater than 0',
          ]"
      />
      <v-text-field
          v-model="pageColCount"
          label="Page Col count"
          type="number"
          :rules="[
            v => (parseInt(v) && v >= 0) || 'Must be greater than 0',
          ]"
      />
      <v-text-field
          v-model="pageWidth"
          label="Page width"
          type="number"
          :rules="[
            v => (parseInt(v) && v >= 0) || 'Must be greater than 0',
          ]"
      />
      <v-text-field
          v-model="pageHeight"
          label="Page height"
          type="number"
          :rules="[
            v => (parseInt(v) && v >= 0) || 'Must be greater than 0',
          ]"
      />
      <v-text-field
          v-model="pageMarginTop"
          label="Content margin top"
          type="number"
          :rules="[
            v => (parseInt(v) >= 0) || 'Must be greater than 0',
          ]"
      />
    </div>

    <div style="display: flex;flex-wrap: nowrap;justify-content: flex-start;gap: 10px;">
      <v-btn v-if="!preView" @click="openNewComponentDialog('ADD')">Add component</v-btn>
      <v-btn v-if="preView" @click="copyHtml">Copy HTML</v-btn>
      <v-btn @click="changeView">Change View</v-btn>
    </div>

    <div v-if="!preView">
      <table style="width: 100%;height: 100%;background: red">
        <tr v-for="r in pageRowCount" style="width: inherit">
          <td v-for="c in pageColCount" :style="{width: 100/pageColCount+'%'}">
            <draggable v-model="emailComponents"
                       group="group"
                       @start="dragging = true"
                       @end="dragging = false"
            >

            </draggable>
          </td>
        </tr>
      </table>
    </div>

&lt;!&ndash;    <div class="mt-5" v-if="!preView" :style="`width: ${pageWidth}px;height: ${pageHeight}px;margin-top: ${pageMarginTop}px`">
      <draggable v-model="emailComponents"
                 group="group"
                 @start="dragging = true"
                 @end="dragging = false"
      >
      <div v-for="(comp,key) in emailComponents" :key="key">
        <v-btn class="mb-2" @click="editComponentToEmailContent(comp,key)" color="warning">Modify</v-btn>
        <v-btn class="mb-2" @click="emailComponents.splice(key, 1)" color="error">Remove</v-btn>
        <component :is="comp.name" :ref="`comp-${key}`" v-bind="comp.props"/>
      </div>
      </draggable>
    </div>&ndash;&gt;

    <div v-else>
      <div v-html="emailContent" :style="`width: ${pageWidth}px;height: ${pageHeight}px;margin-top: ${pageMarginTop}px`"></div>
    </div>

    &lt;!&ndash; component editor dialog &ndash;&gt;
    <v-dialog :value="newComponentDialog">
      <v-card class="pa-2">
        <h3 v-if="newComponentDialogType === 'MODIFY'">
          Modify {{ component.name }} component
        </h3>
        <v-select
            v-else
            v-model="selectedComponent"
            :items="Array.isArray(components) ? components : []"
            label="Template"
            item-text="name"
            item-value="name"
        />

        <v-card class="pa-2 mb-2" color="lightgray" v-if="component">
          <div v-for="(prop, key) in component.props">
            <v-text-field
                v-if="['il'].includes(key.split('_')[0])"
                :key="key"
                :label="key.split('_')[1]"
                :value="prop"
                @input="component.props[key] = $event"
            />
            <v-text-field
                v-else-if="['s'].includes(key.split('_')[0])"
                :key="key"
                :label="key.split('_')[1]"
                :value="prop"
                @input="component.props[key] = $event"
            />
            <v-text-field
                v-else-if="['num'].includes(key.split('_')[0])"
                :key="key"
                :label="key.split('_')[1]"
                :rules="[
                    v => (v && v >= key.split('_')[2]) || 'Must be greater than '+key.split('_')[2],
                    v => (v && v <= key.split('_')[3]) || 'Must be smaller than '+key.split('_')[3]
                ]"
                :value="prop"
                type="number"
                @input="component.props[key] = $event"
            />
            <v-textarea
                v-else-if="['ts'].includes(key.split('_')[0])"
                :key="key"
                :label="key.split('_')[1]"
                :value="prop"
                @input="component.props[key] = $event"
            />
            <v-select
                v-else-if="['sel'].includes(key.split('_')[0])"
                :key="key"
                :label="key.split('_')[2]"
                :value="prop"
                :items="selectOtions[key.split('_')[1]] ?? []"
                @input="component.props[key] = $event"
            />
            <div v-else>
              <div v-if="Array.isArray(prop)" style="width: 100%">
                <h5>{{ key }}</h5>
                <div v-for="(item, index) in prop" style="display: flex;flex-wrap: nowrap;width: 100%">
                  <div v-for="(subItem, subKey) in item">
                    <v-text-field
                        v-if="['s'].includes(subKey.split('_')[0])"
                        :key="subKey"
                        :label="subKey.split('_')[1]"
                        :value="subItem"
                        @input="component.props[key][index][subKey] = $event"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>

        <component ref="currComp" v-if="component" :is="component.name" v-bind="component.props"/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" :disabled="!component" text @click="addToEmailContent(component)">{{ newComponentDialogType === 'ADD' ? 'Add' : 'Save' }}</v-btn>
          <v-btn color="blue darken-1" text @click="newComponentDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>-->
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
    Object.entries(Components).forEach(component => {
      if (component[1].component){
        components.push({
          name: 'Template'+component[0],
          component: component[1].component,
          props: component[1].defaultProps
        })
      }
    });
    this.components = components;
    this.emailComponents = JSON.parse(JSON.stringify(components));
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
    onDragStart(evt) {
      this.dragging = true;
      this.initialIndex = evt.oldIndex;
    },
    onDragEnd(evt) {
      console.log(evt.oldIndex,evt.newIndex)
      if (evt.oldIndex === evt.newIndex) {
        this.dragging = false;
        evt.preventDefault();
      }
    },
    cloneItem(item) {
      return JSON.parse(JSON.stringify(item));
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
</style>

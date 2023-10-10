import Contact from "@/components/Template/Contact.vue";
import Image from "@/components/Template/Image.vue";
import ImportantInfo from "@/components/Template/ImportantInfo.vue";
import Table from "@/components/Template/Table.vue";
import Welcome from "@/components/Template/Welcome.vue";

/*
* s = string
* ts = textarea string
* il = image link
* */

export default {
    'Image': {
        id: Image.name+'_'+1,
        name: "Kép",
        component: Image,
        props: {
            num_marginnLeft_0_500: 100,
            num_marginnRight_0_500: 0,
            sel_lay_layout: "center",
            num_logoWidth_0_500: 200,
            num_logoHeight_0_500: 200,
            il_logo: 'https://i.pinimg.com/originals/31/f6/e5/31f6e5988654e5e2a2cea626aa95650e.jpg',
        }
    },
    'Welcome': {
        id: Welcome.name+'_'+2,
        name: Welcome.name,
        component: Welcome,
        props: {
            num_marginnLeft_0_500: 300,
            num_marginnRight_0_500: 0,
            s_name: 'Nagy Pistike' ,
            ts_thankYou: 'Köszönjük, hogy velünk tartottál!',
        }
    },
    'Table': {
        id: Table.name+'_'+3,
        name: Table.name,
        component: Table,
        props: {
            num_marginnLeft_0_500: 300,
            num_marginnRight_0_500: 0,
            sel_lay_layout: "left",
            rows: [
                {s_title: 'Kor', s_value: 18},
                {s_title: 'Név', s_value: 'Pistike'}
            ]
        }
    },
    'ImportantInfo': {
        id: ImportantInfo.name+'_'+4,
        name: ImportantInfo.name,
        component: ImportantInfo,
        props: {
            num_marginnLeft_0_500: 300,
            num_marginnRight_0_500: 0,
            ts_importantInfoText: 'Itt van egy nagyon fontos szövegrész amit csak neked töltöttem ki :)',
        }
    },
    'Contact': {
        id: Contact.name+'_'+5,
        name: Contact.name,
        component: Contact,
        props: {
            num_marginnLeft_0_500: 300,
            num_marginnRight_0_500: 0,
            rows: [
                {s_title: 'Cím', s_value: 'Cím'},
                {s_title: 'Email', s_value: 'Email'}
            ]
        }
    },
}
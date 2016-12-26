import './index.css'
import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from "vuex"
import { routes } from "./router.config.js"
import XButton from './components/x-button.vue'
import html from './index.html'
Vue.use(VueRouter);
Vue.use(Vuex);
if (process.env.ENV === 'dev') {
	Vue.config.debug = true;
}
var store = new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			state.count++;
		}
	}
})
var InputComponent = {
	template: `
	<label>
	{{cLabel}}<input v-model="value" v-on:input="updateValue"/>
	</label>
	`,
	data: function() {
		return {
			value: this.input
		}
	},
	props: ['input', 'label'],
	computed: {
		cLabel: function() {
			return this.label + ":";
		}
	},
	watch: {
		input: function(cur) {
			this.value = cur;
		},
		value: function(cur, pre) {
			this.$store.commit('increment');
		}
	},
	methods: {
		updateValue: function() {
			this.$emit('input', this.value);
		}
	}
};
const router = new VueRouter({
	routes
});
router.beforeEach(function(to, from, next) {
	next();
});
Vue.use({
	install: function(vue) {
		vue.options = vue.util.mergeOptions(vue.options, {
			created: function() {
				console.log('component name is ', this.$options.name);
			}
		})
	}
})
let app = new Vue({
	router,
	store,
	data: function() {
		return {
			cls: "test",
			value: "test",
			transitionName: "fade",
			routes
		};
	},
	computed: {
		count() {
			return this.$store.state.count;
		}
	},
	components: { "input-x": InputComponent, XButton },
	methods: {
		change: function(event) {
			if (this.changeTime) {
				clearTimeout(this.changeTime);
			}
			this.changeTime = setTimeout(function() {
				delete this.changeTime;
				console.log(this.value);
			}.bind(this), 500);
		},
		inputXChange: function(value) {
			this.value = value;
		}
	},
	watch: {
		'$route' (to, from) {
			const toDepth = to.path.split('/').length;
			const fromDepth = from.path.split('/').length;
		}
	},
	template: html
}).$mount('#app');
window.app = app;
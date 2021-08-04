import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import * as originalRules from 'vee-validate/dist/rules';
const ja = {
  "code": "ja",
  "messages": {
    "email": "{_field_}は有効なメールアドレスではありません",
    "max": "{_field_}は{length}文字以内にしてください",
    "min": "{_field_}は{length}文字以上でなければなりません",
    "required": "{_field_}を入力してください",
  }
};
localize('ja', ja)

let rule;
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule],
  });
}

localize('ja', ja);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
import Vue from 'vue'
import Vuex from 'vuex'
import announcement from './announcement'
import article from './article'
import category from './category'
import comment from './comment'
import option from './option'
import project from './project'
import sitemap from './sitemap'
import tag from './tag'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        announcement,
        article,
        category,
        comment,
        option,
        project,
        sitemap,
        tag,
    }
})
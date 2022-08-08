import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemons/pages/ListPage')
    },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemons/pages/AboutPage')
    },
    {
        path: '/id',
        component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemons/pages/PokemonPage')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "NotPageFound" */ '@/modules/shared/pages/NotPageFound')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
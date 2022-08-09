import { createRouter, createWebHashHistory } from 'vue-router'

import isAuthenticatedGuard from './auth-guard'

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemons/layouts/PokemonLayout'),
        children: [
            {
                path: 'home',
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemons/pages/ListPage')
            },
            {
                path: 'about',
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemons/pages/AboutPage')
            },
            {
                path: 'pokemonid/:id',
                name: 'pokemon-id',
                props: ( route ) => {
                    const id = Number( route.params.id )
                    return isNaN( id ) ? { id: 1 } : { id }
                },
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemons/pages/PokemonPage')
            },
            {
                path: '',
                redirect: { name: 'pokemon-home' }
            }
        ]
    },
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticatedGuard ],
        component: import(/* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import(/* webpackChunkName: "CharactersPage" */ '@/modules/dbz/pages/CharactersPage')
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/dbz/pages/AboutPage')
            },
            {
                path: '',
                redirect: { name: 'dbz-characters' }
            }
        ]
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

// Guard global - sincrono
/* router.beforeEach((to, from, next) => {
    const random = Math.random() * 100

    if ( random > 50 ) {
        console.log('Autenticado')
        next()
    } else {
        console.log(random, 'Bloqueado por noob')
        next({ name: 'pokemon-home' })
    }
}) */

/* const canAccess = () => {
    return new Promise( resolve => {

        const random = Math.random() * 100

        if ( random > 50 ) {
            console.log('Autenticado - canAccess')
            resolve(true)
        } else {
            console.log(random, 'Bloqueado por noob - canAccess')
            resolve(false)
        }

    })
}

router.beforeEach( async (to, from, next) => {
    
    const autorized = await canAccess()

    autorized
        ? next()
        : next({ name: 'pokemon-home' })

} ) */

export default router
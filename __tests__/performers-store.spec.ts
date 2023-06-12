import {createPinia, setActivePinia} from 'pinia'
import {beforeEach, describe, expect, test} from 'vitest'
import {PerformersState} from "../../types/Performers";
import {usePerformersStore} from "../../stores/performers";
import {deepEqual} from "../../helpers/deepEqual";


describe('Performers store initial', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('Compare initial store with variable checkStore', async () => {
        const checkStore: PerformersState = {
            isModalOpen: false,
            activeFilterPerformers: localStorage.getItem('activeFilterPerformers') || 'All',
            performersArr: []
        }
        const objTest = usePerformersStore().$state
        expect(deepEqual(objTest, checkStore)).toBe(true)
        checkStore.isModalOpen = true
        expect(deepEqual(objTest, checkStore)).toBe(false)
    })
})

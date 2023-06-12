import {createPinia, setActivePinia} from 'pinia'
import {beforeEach, describe, expect, test} from 'vitest'
import {useClassificatorStore} from "../../stores/classificator";
import {ClassificatorState} from "../../types/Classificator";
import {deepEqual} from "../../helpers/deepEqual";

describe('Classificator store initial', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('Compare initial store with variable checkStore', async () => {
        const checkStore: ClassificatorState = {
            activeClassificator: '',
            activeList: [],
            activeItemTable: {},
            namesGroups: [],
            modalsTable: {
                editGroup: false,
                editFilter: false,
                addFilter: false,
                deleteFilter: false
            },
            countPage: 0,
            isModalOpen: false,
            statePayload: {
                element_title: '',
                group_title: '',
                limit: 10,
                order_by: '',
                order_sort: '',
                page: 1
            }
        }
        const objTest = useClassificatorStore().$state
        expect(deepEqual(objTest, checkStore)).toBe(true)
        checkStore.activeClassificator = 'someActive'
        expect(deepEqual(objTest, checkStore)).toBe(false)
    })
})

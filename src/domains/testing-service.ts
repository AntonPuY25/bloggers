import {testingRepository} from "../Repositories/testing-repository";

export const testingService = {
    allClear:async ()=> await testingRepository.allClear()
}
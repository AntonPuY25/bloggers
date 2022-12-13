import {testingRepository} from "../Repositories/testing-repository";

class TestingService {
    async allClear() {
        await testingRepository.allClear()
    }
}

export const testingService = new TestingService();
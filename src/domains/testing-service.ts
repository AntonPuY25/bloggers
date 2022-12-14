import {testingRepository} from "../Repositories/testing-repository";

class TestingService {
    async allClear() {
      return await testingRepository.allClear()
    }
}

export const testingService = new TestingService();
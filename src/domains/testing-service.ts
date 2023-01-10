import {TestingRepository} from "../Repositories/testing-repository";

export class TestingService {
    testingRepository: TestingRepository;

    constructor() {
        this.testingRepository = new TestingRepository();
    }

    async allClear() {
        return await this.testingRepository.allClear()
    }
}
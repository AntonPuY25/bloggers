import {TestingRepository} from "../Repositories/testing-repository";

export class TestingService {

    constructor(protected testingRepository: TestingRepository) {}

    async allClear() {
        return await this.testingRepository.allClear()
    }
}
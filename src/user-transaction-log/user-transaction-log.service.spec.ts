import {Test, TestingModule} from "@nestjs/testing";
import {UserTransactionLogService} from "./user-transaction-log.service";
import {UserTransactionLogEntity} from "./user-transaction-log.entity";

class ApiServiceMock {
    createUserLog(dto: UserTransactionLogEntity) {
        return [];
    }
    findUserLogCalendarMonth(userId: number) {
        return [];
    }
}
describe.only("UserLogService", () => {

    let userLogsService: UserTransactionLogService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UserTransactionLogService,
            useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserTransactionLogService, ApiServiceProvider
            ],
        }).compile();
        userLogsService = module.get<UserTransactionLogService>(UserTransactionLogService);
    })

    it('should call createUserLog method with expected params', async () => {
        const createMovieSpy = jest.spyOn(userLogsService, 'createUserLog');
        const dto = new UserTransactionLogEntity();
        userLogsService.createUserLog(dto);
        expect(createMovieSpy).toHaveBeenCalledWith(dto);
    });

    it('should call findUserLogCalendarMonth method with expected param', async () => {
        const findOneNoteSpy = jest.spyOn(userLogsService, 'findUserLogCalendarMonth');
        const userId = 123;
        userLogsService.findUserLogCalendarMonth(userId);
        expect(findOneNoteSpy).toHaveBeenCalledWith(userId);
    });
})

import {HttpModule, Module} from "@nestjs/common";
import {OmdbService} from "./omdb.service";
import {ConfigService} from "../config";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [OmdbService],
})
export class OmdbModule {}

import {HttpModule, Module} from "@nestjs/common";
import {OmdbService} from "./omdb.service";

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

import {HttpService, Injectable} from '@nestjs/common';
import {lastValueFrom, map, Observable} from "rxjs";
import {ConfigService} from "../config";
import {OmdbMovieDto} from "./dto/omdb-movie.dto";

@Injectable()
export class OmdbService {

    constructor(private http: HttpService) {
    }

    async getMovie(title): Promise<OmdbMovieDto> {
        const apiKey = process.env.OMDB_API_KEY;
        console.log(apiKey);
        return lastValueFrom(this.http.get(`http://www.omdbapi.com/?t=${title}&apikey=342e92c1`)
            .pipe(
                map(response => response.data))
        );
    }
}

import {HttpService, Injectable} from '@nestjs/common';
import {map} from "rxjs";

@Injectable()
export class OmdbService {
    constructor(private http: HttpService){}

    async getMovie(title){
        return this.http.get(`http://www.omdbapi.com/?t=${title}&apikey=342e92c1`).pipe(
            map(response => response.data)
        ).toPromise();
    }
}

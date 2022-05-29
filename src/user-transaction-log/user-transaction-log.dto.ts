import {ApiProperty} from "@nestjs/swagger";

export class UserTransactionLogDto {
    @ApiProperty({description: 'Primary Key'})
    id: number;
    @ApiProperty({description: 'Created At'})
    createdAt: string;
    @ApiProperty({description: 'MovieEntity ID'})
    movieId: number;
    @ApiProperty({description: 'User ID'})
    userId: number;
}

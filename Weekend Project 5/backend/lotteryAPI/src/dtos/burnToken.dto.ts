import { ApiProperty } from "@nestjs/swagger"

export class BurnTokenDto {
    @ApiProperty()
    readonly address: string
    @ApiProperty()
    readonly amount: number
}
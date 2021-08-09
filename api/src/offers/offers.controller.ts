import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {

    constructor(private service: OffersService) { }

    @Post()
    async create(@Body() data: any){
        const result = await this.service.create(data);
        return {
            data: result
        }
    }

    @Patch(':id')
    async patch(@Param('id') id: number, @Body() status: any){
        const result = await this.service.patchStatus(id, status);
        return {
            data: result
        }
    }

    @Put(':id')
    async update(@Body() data: any){
        const result = await this.service.update(data);
        return {
            data: result
        }
    }

    @Get()
    async getAll(@Query('q') filter: any = {}) {
        const result = await this.service.getAll(filter);
        return {
            data: result
        }
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        const result = await this.service.get(+id);
        return {
            data: result
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        const result = await this.service.delete(id);
        return {
            data: result
        }
    }
}

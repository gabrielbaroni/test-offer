import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { OffersRepository } from './offers.repository';
import * as moment from 'moment';
import { Offers } from './offers.entity';
import { plainToClass } from 'class-transformer';
moment.locale('pt-br');

@Injectable()
export class OffersService {
    private repository: OffersRepository;

    constructor(private readonly connection: Connection) {
        this.repository = this.connection.getCustomRepository(OffersRepository);
    }

    async getAll(filter: any = {}): Promise<any> {
        try {
            return this.repository.search(filter);
        } catch (e) {
            if (e.message) throw new BadRequestException(e.message);
            throw new BadRequestException('No records found.');
        }
    }

    async get(id: number): Promise<any> {
        try {
            const result = await this.repository.findOne(id);
            return {
                content: result
            }
        } catch (e) {
            if (e.message) throw new BadRequestException(e.message);
            throw new BadRequestException('No records found.');
        }
    }

    async create(data: Offers): Promise<any> {
        try {
            const offerName = await this.repository.findAdvertiserName(data.name);
            if (offerName) throw new BadRequestException('Advertiser name is already registered, choose other name.');

            const currentTime: any = moment(new Date()).format('DD/MM/YYYY')
            if (currentTime >= data.startsAt) data.status = true;
            if (currentTime <= data.endsAt) data.status = false;

            const result = await this.repository.save(data);
            return {
                content: result,
                message: 'Record created successfully'
            }
        } catch (e) {
            if (e.message) throw new BadRequestException(e.message);
            throw new BadRequestException('No records found.');
        }
    }

    async update(data: Offers): Promise<any> {
        try {
            let offer = await this.repository.findOne(data.id);
            if (!offer) throw new BadRequestException('No record found.');

            if (data.name != offer.name) {
                const isExists = await this.repository.findAdvertiserName(data.name);
                if (isExists) throw new BadRequestException(`Name ${data.name} is already registered.`);
            } else { delete data.name }

            data.id = offer.id;
            // data.startsAt = new Date(data.startsAt);
            // data.endsAt = new Date(data.startsAt);

            const validator = plainToClass(Offers, data);
            const result = await this.repository.save(validator);

            return {
                content: result,
                message: 'Record updated successfully'
            }
        } catch (e) {
            if (e.message) throw new BadRequestException(e.message);
            throw new BadRequestException('No records found.');
        }
    }

    async patchStatus(idOffer: number, status: any): Promise<any> {
        try {
            let offer = await this.repository.findOne(idOffer);
            if (!offer) throw new BadRequestException('No record found.');

            offer.status = status.status;

            const result = await this.repository.save(offer);
            return {
                content: result,
                message: 'Record status updated successfully'
            }
        } catch (e) {
            if (e.message) throw new BadRequestException(e.message);
            throw new BadRequestException('No records found.');
        }
    }

    async delete(idOffer: number): Promise<any> {
        try {
            let offer = await this.repository.findOne(idOffer);
            if (!offer) throw new BadRequestException('No record found.');

            const result = await this.repository.delete(offer.id);
            return {
                content: result,
                message: 'Record deleted successfully'
            }
        } catch (e) {
            if (e.message) throw new BadRequestException(e.message);
            throw new BadRequestException('No records found.');
        }
    }
}

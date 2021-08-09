import { EntityRepository, Repository } from "typeorm";
import { Offers } from "./offers.entity";

@EntityRepository(Offers)
export class OffersRepository extends Repository<Offers> {

    async search(filter: any = {}): Promise<any> {
        let whereClause = {};

        const [result, total] = await this.findAndCount({
            where: whereClause,
        });

        return {
            content: result,
            numberOfElements: total,
            totalElements: result.length,
        };
    }

    async findAdvertiserName(name: any): Promise<any> {
        return this.createQueryBuilder('offer')
            .where('offer.name like :name', { name: `%${name}%` })
            .getOne();
    }
}
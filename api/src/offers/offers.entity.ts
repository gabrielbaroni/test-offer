import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import {
    validate,
    validateOrReject,
    IsEmail,
    isDate,
} from 'class-validator';

@Entity('offers')
export class Offers {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'advertiser_name', length: 255, nullable: false, unique: true })
    name: string;

    @Column({ name: 'url', nullable: false })
    url: string;

    @Column({ name: 'premium', nullable: true })
    premium: boolean;

    @Column({ name: 'status', default: false, nullable: true })
    status: boolean;

    @Column({ name: 'description', length: 500, nullable: false })
    description: string;

    @Column({ type: 'datetime', name: 'starts_at', nullable: true, update: true })
    startsAt: Date;

    @Column({ type: 'datetime', name: 'ends_at', nullable: true, update: true })
    endsAt: Date;

}
import { MigrationInterface, QueryRunner } from "typeorm";

export class DateFix1736656554965 implements MigrationInterface {
    name = 'DateFix1736656554965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ADD "expense_date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "expense_date"`);
    }

}

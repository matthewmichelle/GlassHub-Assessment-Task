import { QueryRunner } from "typeorm";

module.exports = class Migrations1707582697831 {

    async up(queryRunner: QueryRunner) {
        await queryRunner.query(`INSERT INTO user (name, email) VALUES ('test', 'test@test.com');
        `);
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.query(`truncate table user`);
    }


}

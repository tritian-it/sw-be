import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateUsers1742395588890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "user" ("id", "name", "surname", "email") VALUES
            (1, "John", "Doe", "john.doe@example.com"),
            (2, "Jane", "Smith", "james.smith@example.com"),
            (3, "Robert", "Johnson", "robert.johnson@example.com"),
            (4, "Michael", "Williams", "michael.williams@example.com"),
            (5, "William", "Brown", "william.brown@example.com"),
            (6, "David", "Jones", "david.jones@example.com"),
            (7, "Richard", "Miller", "richard.miller@example.com"),
            (8, "Joseph", "Davis", "joseph.davis@example.com"),
            (9, "Thomas", "Garcia", "thomas.garcia@example.com"),
            (10, "Charles", "Martinez", "charles.martinez@example.com")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE "id" IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)`,
    );
  }
}

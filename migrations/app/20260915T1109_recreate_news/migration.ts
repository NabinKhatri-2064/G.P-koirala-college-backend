#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3b74b87f376c4fe8c0b96c024177074786ec21ee4536a9f3ca73f68b97319c48/contract';
import endContract from '../../snapshots/3b74b87f376c4fe8c0b96c024177074786ec21ee4536a9f3ca73f68b97319c48/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/98e88f0006c69e8d4b0ad9e98cdb0519bffb39a51875a78e0a66ed08386f3890/contract';
import startContract from '../../snapshots/98e88f0006c69e8d4b0ad9e98cdb0519bffb39a51875a78e0a66ed08386f3890/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'blanket' }),
      this.addColumn({
        schema: 'public',
        table: 'news',
        column: col('createdAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

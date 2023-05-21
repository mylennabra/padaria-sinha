<?php

namespace Tests\Traits;

trait WithDatabaseMany {
    public function assertDatabaseHasMany(string $table, array $collection): void
    {
        $this->assertDatabaseCount($table, count($collection));

        foreach ($collection as $data) {
            $this->assertDatabaseHas($table, $data);
        }
    }

    public function assertDatabaseHasOne(string $table, array $data): void
    {
        $this->assertDatabaseCount($table, 1);
        $this->assertDatabaseHas($table, $data);
    }
}

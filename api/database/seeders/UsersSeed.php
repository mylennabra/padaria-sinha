<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeed extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'email' => 'admin',
            'password' => 'admin',
            'context' => 'customer-employee'
        ]);
    }
}

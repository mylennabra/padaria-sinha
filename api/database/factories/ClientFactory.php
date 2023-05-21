<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->randomNumber(),
            'name' => $this->faker->name(),
            'primary_phone' => $this->faker->phoneNumber(),
            'cpf' => $this->faker->text(10),
        ];
    }

    public function withAddress(): self
    {
        return $this->state([
            'address' => $this->faker->address(),
        ]);
    }

    public function withSecondaryPhone(): self
    {
        return $this->state([
            'secondary_phone' => $this->faker->phoneNumber(),
        ]);
    }

    public function withObs(): self
    {
        return $this->state([
            'obs' => $this->faker->text(),
        ]);
    }
}

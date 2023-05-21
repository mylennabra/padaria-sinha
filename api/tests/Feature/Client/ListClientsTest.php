<?php

namespace Tests\Feature\Client;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

class ListClientsTest extends TestCase
{
    public function test_get_all_clients(): void
    {
        $clients = Client::factory(2)->create();

        $this->get($this->uri())
            ->assertJsonFragment($this->expectedJson($clients))
            ->assertOk();
    }

    private function uri(): string
    {
        return route('clients.get');
    }

    private function expectedJson(Collection $clients): array
    {
        return [
            'data' => ClientResource::collection($clients)->resolve()
        ];
    }
}

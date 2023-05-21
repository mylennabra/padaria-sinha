<?php

namespace Tests\Feature\Client;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use Tests\TestCase;

class ShowClientTest extends TestCase
{
    public function test_show_client(): void
    {
        $client = Client::factory()->create();

        $this->get($this->uri($client))
            ->assertJson($this->expectedJson($client))
            ->assertOk();
    }

    private function uri(Client $client): string
    {
        return route('clients.show', compact('client'));
    }

    private function expectedJson(Client $client): array
    {
        return [
            'data' => ClientResource::make($client)->resolve(),
        ];
    }
}

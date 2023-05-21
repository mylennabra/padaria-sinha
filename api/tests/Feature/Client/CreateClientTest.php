<?php

namespace Tests\Feature\Client;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;
use Tests\Traits\WithDatabaseMany;

class CreateClientTest extends TestCase
{
    use WithDatabaseMany;

    public function test_create_client(): void
    {
        $body = $this->body();
        $response = $this->post($this->uri(), $body->toArray());

        $response->assertJson($this->expectedJson($body, $response));
        $response->assertCreated();

        $this->assertDatabaseHasOne(Client::class, [
            ...$body->toArray(),
            'code' => $response->json('data.code'),
        ]);
    }

    private function body(): Client
    {
        return Client::factory()->make();
    }

    private function uri(): string
    {
        return route('clients.get');
    }

    private function expectedJson(Client $client, TestResponse $response): array
    {
        return [
            'data' => [
                ...ClientResource::make($client)->resolve(),
                'code' => $response->json('data.code'),
            ]
        ];
    }
}

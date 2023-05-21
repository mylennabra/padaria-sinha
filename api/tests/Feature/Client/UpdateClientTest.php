<?php

namespace Tests\Feature\Client;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;
use Tests\Traits\WithDatabaseMany;

class UpdateClientTest extends TestCase
{
    use WithDatabaseMany;

    public function test_update_client(): void
    {
        $body = $this->body();
        $client = Client::factory()
            ->withAddress()
            ->withObs()
            ->withSecondaryPhone()
            ->create();

        $response = $this->put($this->uri($client), $body->toArray());

        $expected_json = $this->expectedJson($body, $response);
        $response->assertJson($expected_json);
        $response->assertOk();

        $this->assertDatabaseHasOne(Client::class, [
            ...$body->toArray(),
            ...$expected_json['data']
        ]);
    }

    private function uri(Client $client): string
    {
        return route('clients.update', compact('client'));
    }

    private function body(): Client
    {
        return Client::factory()->make();
    }

    private function expectedJson(Client $client, TestResponse $response): array
    {
        return [
            'data' => [
                ...ClientResource::make($client)->resolve(),
                ...$response->json('data'),
            ]
        ];
    }
}

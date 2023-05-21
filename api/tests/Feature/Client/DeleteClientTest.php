<?php

namespace Tests\Feature\Client;

use App\Models\Client;
use Tests\TestCase;

class DeleteClientTest extends TestCase
{
    public function test_delete_client(): void
    {
        $client = Client::factory()->create();

        $this->delete($this->uri($client))->assertNoContent();

        $this->assertDatabaseEmpty(Client::class);
    }

    private function uri(Client $client): string
    {
        return route('clients.delete', compact('client'));
    }
}

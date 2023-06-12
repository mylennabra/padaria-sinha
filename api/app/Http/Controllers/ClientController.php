<?php

namespace App\Http\Controllers;

use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class ClientController extends Controller
{
    public function index(Request $request): JsonResource
    {
        $clients = Client::query()
            ->when($request->query('code'), fn ($query, $code) => $query->byCode($code))
            ->when($request->query('name'), fn ($query, $code) => $query->byName($code))
            ->when($request->query('cpf'), fn ($query, $code) => $query->byCpf($code))
            ->get();

        return ClientResource::collection($clients);
    }

    public function store(StoreClientRequest $request): JsonResource
    {
        return ClientResource::make(Client::create($request->all()));
    }

    public function show(Request $request, Client $client): JsonResource
    {
        return ClientResource::make($client);
    }

    public function update(UpdateClientRequest $request, Client $client): JsonResource
    {
        $client->update($request->all());
        return ClientResource::make($client->fresh());
    }

    public function delete(Request $request, Client $client): Response
    {
        $client->deleteOrFail();
        return response()->noContent();
    }
}

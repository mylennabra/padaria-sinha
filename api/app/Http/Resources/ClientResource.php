<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->resource->code,
            'name' => $this->resource->name,
            'cpf' => $this->resource->cpf,
            'address' => $this->resource->address,
            'primary_phone' => $this->resource->primary_phone,
            'secondary_phone' => $this->resource->secondary_phone,
        ];
    }
}

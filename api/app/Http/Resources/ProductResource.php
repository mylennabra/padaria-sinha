<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->resource->code,
            'description' => $this->resource->description,
            'group' => $this->resource->group,
            'price' => $this->resource->price,
            'stock' => $this->resource->stock,
            'unit' => $this->resource->unit,
            'obs' => $this->resource->obs,
        ];
    }
}

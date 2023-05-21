<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id('code');
            $table->string('name');
            $table->string('cpf')->unique();
            $table->timestamp('address')->nullable();
            $table->string('primary_phone')->unique();
            $table->string('secondary_phone')->nullable();
            $table->string('obs')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};

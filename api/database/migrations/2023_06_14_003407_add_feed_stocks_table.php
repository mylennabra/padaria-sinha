<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('feed_stocks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_code');
            $table->bigInteger('feed_stock_code');
            $table->float('amount');
            $table->string('unit');

            $table->foreign('product_code')->references('code')->on('products');
            $table->foreign('feed_stock_code')->references('code')->on('products');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feed_stocks');
    }
};

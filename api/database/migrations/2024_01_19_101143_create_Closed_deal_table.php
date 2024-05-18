<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Closed_deal', function (Blueprint $table) {
            $table->bigInteger('deal_id')->primary();
            $table->boolean('has_errors_on_sale')->nullable();
            $table->boolean('has_errors_on_return')->nullable();
            $table->tinyInteger('deal_status_id')->index('deal_status_id_idx');
            $table->dateTime('deal_closed_datetime')->nullable();
            $table->bigInteger('product_id')->index('product_id_idx');
            $table->bigInteger('buyer_id')->index('buyer_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Closed_deal');
    }
};

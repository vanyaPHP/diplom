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
        Schema::create('Deal', function (Blueprint $table) {
            $table->bigInteger('deal_id', true);
            $table->bigInteger('bet_id')->index('bet_id_idx');
            $table->dateTime('payment_datetime_start');
            $table->boolean('pay_ok')->nullable();
            $table->dateTime('check_datetime_start')->nullable();
            $table->string('product_received_confirm_code', 8)->nullable();
            $table->string('payback_confirm_code', 8)->nullable();
            $table->dateTime('product_returned_datetime')->nullable();
            $table->boolean('has_errors_on_sale')->nullable();
            $table->boolean('has_errors_on_return')->nullable();
            $table->tinyInteger('deal_status_id')->index('deal_status_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Deal');
    }
};

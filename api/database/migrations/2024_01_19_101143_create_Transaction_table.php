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
        Schema::create('Transaction', function (Blueprint $table) {
            $table->bigInteger('transaction_id', true);
            $table->bigInteger('source_card_id')->index('source_card_id_idx');
            $table->bigInteger('destination_card_id')->index('destination_card_id_idx');
            $table->tinyInteger('transaction_status_id')->index('transaction_status_id_idx');
            $table->bigInteger('deal_id')->index('deal_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Transaction');
    }
};

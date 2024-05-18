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
        Schema::create('archived_transactions', function (Blueprint $table) {
            $table->bigInteger('stored_transaction_id', true);
            $table->bigInteger('closed_deal_id')->index('closed_deal_idx');
            $table->bigInteger('destination_card_id')->index('destination_card_idx');
            $table->bigInteger('source_card_id')->index('source_card_idx');
            $table->bigInteger('transaction_status')->index('status_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Bet_status');
    }
};

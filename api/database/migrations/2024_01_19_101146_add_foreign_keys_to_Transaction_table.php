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
        Schema::table('Transaction', function (Blueprint $table) {
            $table->foreign(['deal_id'], 'deal_id')->references(['deal_id'])->on('Deal')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['destination_card_id'], 'destination_card_id')->references(['credit_card_id'])->on('Credit_card')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['source_card_id'], 'source_card_id')->references(['credit_card_id'])->on('Credit_card')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['transaction_status_id'], 'transaction_status_id')->references(['transaction_status_id'])->on('Transaction_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Transaction', function (Blueprint $table) {
            $table->dropForeign('deal_id');
            $table->dropForeign('destination_card_id');
            $table->dropForeign('source_card_id');
            $table->dropForeign('transaction_status_id');
        });
    }
};

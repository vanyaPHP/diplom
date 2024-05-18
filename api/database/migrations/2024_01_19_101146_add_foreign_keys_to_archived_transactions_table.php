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
        Schema::table('archived_transactions', function (Blueprint $table) {
            $table->foreign(['closed_deal_id'], 'closed_deal_fk')->references(['deal_id'])->on('Closed_deal')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['destination_card_id'], 'destination_card_fk')->references(['credit_card_id'])->on('Credit_card')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['source_card_id'], 'source_card_fk')->references(['credit_card_id'])->on('Credit_card')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['transaction_status'], 'status_fk')->references(['transaction_status_id'])->on('Transaction_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('table1', function (Blueprint $table) {
            $table->dropForeign('closed_deal_fk');
            $table->dropForeign('destination_card_fk');
            $table->dropForeign('source_card_fk');
            $table->dropForeign('status_fk');
        });
    }
};

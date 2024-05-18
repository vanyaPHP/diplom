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
        Schema::table('Deal', function (Blueprint $table) {
            $table->foreign(['bet_id'], 'bet_id')->references(['bet_id'])->on('Bet')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['deal_status_id'], 'deal_status_id')->references(['deal_status_id'])->on('Deal_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Deal', function (Blueprint $table) {
            $table->dropForeign('bet_id');
            $table->dropForeign('deal_status_id');
        });
    }
};

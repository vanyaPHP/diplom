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
        Schema::table('Report_message', function (Blueprint $table) {
            $table->foreign(['report_chat_id'], 'report_chat_fk')->references(['report_chat_id'])->on('Report_chat')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Report_message', function (Blueprint $table) {
            $table->dropForeign('report_chat_fk');
        });
    }
};

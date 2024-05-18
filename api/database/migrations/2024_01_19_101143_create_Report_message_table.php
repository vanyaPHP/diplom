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
        Schema::create('Report_message', function (Blueprint $table) {
            $table->bigInteger('report_message_id')->primary();
            $table->string('report_message_text');
            $table->boolean('is_admin_sender');
            $table->dateTime('report_message_datetime');
            $table->bigInteger('report_chat_id')->index('chat_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Report_message');
    }
};

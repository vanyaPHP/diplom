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
        Schema::create('Message', function (Blueprint $table) {
            $table->bigInteger('message_id', true);
            $table->string('message_text');
            $table->bigInteger('sender_id')->index('sender_id_idx');
            $table->bigInteger('chat_id')->index('chat_id_idx');
            $table->dateTime('message_datetime');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Message');
    }
};

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
        Schema::create('Report_chat', function (Blueprint $table) {
            $table->bigInteger('report_chat_id', true);
            $table->integer('admin_id')->index('admin_id_idx');
            $table->bigInteger('user_id')->index('user_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Report_chat');
    }
};

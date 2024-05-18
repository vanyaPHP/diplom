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
        Schema::create('Document', function (Blueprint $table) {
            $table->bigInteger('document_id', true);
            $table->bigInteger('deal_id');
            $table->string('document_name', 50);
            $table->bigInteger('document_owner')->index('document_owner_idx');
            $table->dateTime('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Document');
    }
};

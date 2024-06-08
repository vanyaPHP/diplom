<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotifyDealSuccefulMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        private readonly User $user,
        private readonly string $productName
    )
    {
     
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Обновление статуса сделки',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.deal_success',
            with: [
                'user' => $this->user->first_name . " " . $this->user->last_name,
                'product_name' => $this->productName
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

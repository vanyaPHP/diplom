<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NotifyDealFailureMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        private readonly User $user,
        private readonly string $productName,
        private readonly string $errorMsg
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
            view: 'emails.deal_failure',
            with: [
                'user' => $this->user->first_name . " " . $this->user->last_name,
                'product_name' => $this->productName,
                'status' => $this->errorMsg
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

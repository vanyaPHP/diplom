<?php

namespace App\Mail;

use App\Models\Product;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentErrorMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(private User $user, private Product $product) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Ошибка оплаты',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.payment_error',
            with: [
                'user' => $this->user->first_name . " " . $this->user->last_name,
                'product_name' => $this->product->product_name
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

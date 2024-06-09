<?php

enum DealStatusEnum: int
{
    case CLOSED_PAYMENT_ERROR = 1;
    case CLOSED_PRODUCT_NOT_PASSED = 2;
    case CLOSED_PRODUCT_HAS_ERRORS = 3;
    case CLOSED_PRODUCT_HAS_ERRORS_RETURN = 4;
    case CLOSED_PRODUCT_NO_RETURN = 5;
    case CLOSED_SUCCESFULLY = 6;
    case STARTED = 7;
}